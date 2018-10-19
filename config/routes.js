const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');

const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db('users') .insert(creds)
              .then(ids => {
                const id = ids[0];
                res.status(201).json({ newUserId: id });
            })
            .catch(err => {
                res.status(500).json(err);
            });
}

const jwtKey = require('../_secrets/keys').jwtKey;

// const jwtSecret = process.env.JWT_SECRET || 'add a secret to your .env file with this key';

function generateToken(user) {
  const jwtPayload = {
      ...user
      //,roles: ['admin', 'root']
  }
  const jwtOptions = {
      expiresIn: '1h'
  }
  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

function login(req, res) {
  // implement user login
  const credentials = req.body;
  db('users') .where({username: credentials.username})
              .first()
              .then(user =>{
                if (user && bcrypt.compareSync(credentials.password, user.password)){
                  const token = generateToken(user);
                  res.status(200).json({Welcome: user.username, token});
                } else if (user){
                  res.status(401).json({ message: 'Your password is incorrect.'})
                } else {
                  res.status(401).json({ message: 'Your username cannot be found.'})
                }
              })
              .catch(err =>{
                res.status(500).json({err});
              })
}

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
