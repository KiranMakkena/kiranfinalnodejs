const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');  
const session = require('express-session');// which is npm module
const flash = require('connect-flash');
const path = require('path')

    

const app = express();

// Passport Config
require('./models/passport')(passport);





// DB Config
const db = require('./config/keys').MongoURI;



// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log("kiran u got errorr", err));

// EJS 1
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({ 
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());



// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use( express.static(path.join(__dirname, 'public'))) //// this for insert image

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, console.log(`Server started on port ${PORT}`));