const express = require('express');
const {database} = require('./database.js');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let isValid = false;
    // foreach not nessesary, DB will take care of it
    database.users.forEach((element)=>{
        if (email === element.email &&
            password === element.password) {
                isValid=true;
            }
    })
    isValid ? res.json('success') : res.status(400).json('email or password not valid');
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: '12345',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
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
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!foundUser) {
        res.status(404).json('no such user');
    }
})

app.listen(3000, ()=>{
    console.log('app is listening on port 3000');
})
