const express = require('express');
const {database} = require('./database.js');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres',
      database : 'vechicle-detector'
    }
  });
// show all
 // db.select('*').from('users').then(data => {console.log(data);});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let isValid = false;
    let user = {};
    // foreach not nessesary, DB will take care of it
    database.users.forEach((element)=>{
        if (email === element.email &&
            password === element.password) {
                isValid=true;
                user = element;
            }
    })
    isValid ? res.json(user) : res.status(400).json('email or password not valid');
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
        db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('unable to register'));
})

app.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    db.select('*').from('users').where({
        id: id
    })
    .then(user=>{
        if (user.length){
            res.json(user[0])
        } else {
            res.status(404).json('not found')
        }
        })
        .catch(err => res.status(400).json(err));
    })

app.put('/image', (req, res)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('carcount', 1)
    .returning('carcount')
    .then(carcount=>{
        return res.json(carcount[0]);
    })
    .catch(err => res.status(400).json(err))
    })


// ///
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

// // Load hash from your password DB.
// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//     // res === true
// });
// bcrypt.compare("not_bacon", hash, function(err, res) {
//     // res === false
// });

// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0/\/", hash).then((res) => {
//     // res === true
// });
// ///

app.listen(3000, ()=>{
    console.log('app is listening on port 3000');
})
