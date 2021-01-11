const Clarifai = require('clarifai');
const dotenv = require('dotenv').config();


const app = new Clarifai.App({
    apiKey: process.env.ClarifAI_API_KEY
   });

   const handleApiCall = (req, res) => {
       app.models.predict(
           'f950c58836faebadfdd44d709fb7cef6',req.body.input)
           .then(data => {
             res.json(data);
           })
           .catch(err => res.status(400).json('unable to work with API'))
   }

const handleImage = (req, res, db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('carCounter', 1)
    .returning('carCounter')
    .then(carCounter=>{
        return res.json(carCounter[0]);
    })
    .catch(err => res.status(400).json(err))
    }

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}