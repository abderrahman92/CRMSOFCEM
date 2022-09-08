//variable d'environement
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST 
const db = require("./models");


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//route front end
require('./routes/front-end.js')(app) 

// routes back end 
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/societes')(app);
require('./routes/action')(app);
require('./routes/interlocuteur')(app);


//listen port 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${HOST}.`);
});



//syncroniser la base de donner 

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

//insert role user 
const initial = require('./models/role-user')

