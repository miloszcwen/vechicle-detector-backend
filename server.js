const express = require('express');
const {database} = require('./database.js');
const bcrypt = require('bcryptjs');
const cors = require('cors');

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
    try{
        database.users.push({
        id: '12345',
        name: name,
        email: email,
        carCounter: 0,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
    } catch(err) {
        console.log("error",err);
        res.status(400).json('error');
    }
})

app.get('/profile/:id', (req, res) => {
    const userId = req.params.id;
    let foundUser = false;
    // change to filter!!
    database.users.forEach(user => {
        if (user.id === userId){
            foundUser = true;
            return res.json(user);
        }
    })
    if (!foundUser) {
        res.status(404).json('no such user');
    }
})

app.put('/image', (req, res)=>{
    const {id} = req.body;
    let foundUser = false;
    // change to filter!!
    // extract to function
    database.users.forEach(user => {
        if (user.id === id){
            foundUser = true;
            user.carCounter++;
            return res.json(user.carCounter);
        }
    })
    if (!foundUser) {
        res.status(404).json('no such user');
    }
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
