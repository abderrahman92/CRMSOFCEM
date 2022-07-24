//variable d'environement
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'google';
const db = require("./models");
const { user } = require("./models");
const Role = db.role;
const User = db.user;
const Societe = db.societe;
const path = require("path");
var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../client/build')));
//all routes react 
app.get('/register', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/login', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/Societes', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/Societe/:id', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/Societe/test/', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/Interlocuteur/:id', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/Interlocuteur/:id', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/ajouter/', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
app.get('/Interlocuteur', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/societes')(app);
require('./routes/action')(app);
require('./routes/interlocuteur')(app);
/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/


//role insert data en dure 
function initial() {
  Role.create({
    id: 1,
    name: "cemeca"
  });
 
  Role.create({
    id: 2,
    name: "sofitech"
  });
 
  Role.create({
    id: 3,
    name: "admin_cemaca"
  });
  Role.create({
    id: 4,
    name: "admin_sofitech"
  });
  Role.create({
    id: 5,
    name: "super_cemeca"
  });
  Role.create({
    id: 6,
    name: "super_sofitech"
  });
  Role.create({
    id: 7,
    name: "super_admin1"
  });
  Role.create({
    id: 8,
    name: "super_admin"
  });
}



//listen port 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${HOST}.`);
});


