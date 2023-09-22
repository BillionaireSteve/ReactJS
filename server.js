const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 4001;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost_9090',
  user: 'root',
  password: '@#l@#90sa#03#02@)#)_@#$',
  database: '',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.post('/api/reg', (request, response) => {
  const {fname, lname, dob, gender, contact, membershipStatus, baptismStatus, residentialAddress, digitalAddress, occupation, maritalStatus, emergencyContact, emergencyContactNumber, disabilityType, others } = request.body;
  console.log(request.body.fName);

  const query = 'INSERT INTO reg (fname, lname, dob, gender, contact, membership_status, baptism_status, residential_address, digital_address, occupation, marital_status, emergency_contact, emergency_contact_num, disability, others) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [fname, lname, dob, gender, contact, membershipStatus, baptismStatus, residentialAddress, digitalAddress, occupation, maritalStatus, emergencyContact, emergencyContactNumber, disabilityType, others];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err);
      response.status(500).json({ error: 'Failed to register member' });
    } else {
      console.log('Inserted into MySQL:', results);
      response.status(200).json({ success: 'Registration successful' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection: ' + err);
    }
    process.exit(0);
  });
});
