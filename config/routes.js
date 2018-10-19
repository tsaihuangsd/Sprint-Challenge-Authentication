const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import middleware
const { authenticate } = require('./middlewares');

const db = require('../database/dbConfig.js');

//export endpoints
module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

//define register function
function register(req, res) {
  const creds = req.body;
  //create password hash
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  //store user info and hash in database
  db('users') .insert(creds)
              .then(ids => {
                const id = ids[0];
                res.status(201).json({ newUserId: id });
            })
            .catch(err => {
                res.status(500).json(err);
            });
}

//import secret key
const jwtKey = require('../_secrets/keys').jwtKey;

//define function to generate token
function generateToken(user) {
  const jwtPayload = {
      ...user
  }
  const jwtOptions = {
      expiresIn: '1h'
  }
  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

//define login function
function login(req, res) {
  const credentials = req.body;
  db('users') .where({username: credentials.username})
              .first()
              .then(user =>{
                //compare password entered and stored password
                if (user && bcrypt.compareSync(credentials.password, user.password)){//if user found and password matched
                  const token = generateToken(user);
                  res.status(200).json({Welcome: user.username, token});
                } else if (user){//condition: user found but password not matching
                  res.status(401).json({ message: 'Your password is incorrect.'})
                } else {//no match found for user name
                  res.status(401).json({ message: 'Your username is not found in database.'})
                }
              })
              .catch(err =>{
                res.status(500).json({err});
              })
}

//define function to retreive jokes
function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
