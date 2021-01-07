const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
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

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'));
        } else{
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res)=>
{register.handleRegister(req,res,db,bcrypt)})


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
    .increment('carCounter', 1)
    .returning('carCounter')
    .then(carCounter=>{
        return res.json(carCounter[0]);
    })
    .catch(err => res.status(400).json(err))
    })


app.listen(3000, ()=>{
    console.log('app is listening on port 3000');
})
