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
    handleImage: handleImage
}