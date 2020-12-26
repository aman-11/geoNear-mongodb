const express = require('express');
const router = express.Router();
const Ninja = require('../model/ninja');
const mongoose = require('mongoose');


//get the list of name in database
router.get('/ninjas', function (req, res) {
    Ninja.aggregate([
        {
            $geoNear: {

                near: { type: "point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
                distanceField: "dist.calculated",
                includeLocs: "dist.location",
                maxDistance: 1000000,
                spherical: true
            }
        },
        {
            $sort: {
                name: 1
            }
        }
    ]).then(function (ninjas) {
        res.send(ninjas);
    })
    //    .catch(err => res.status(400).json(err));

    /*Ninja.find()
        .then(ninjas => res.json(ninjas))
        .catch(err => res.status(400).json(err));*/


});


//Add the name in db
router.post('/ninjas', function (req, res, next) {
    /* var ninja = new Ninja(req.body); //new instance
     ninja.save();*/
    //shorthand
    Ninja.create(req.body).then(function (ninja) {
        res.send(ninja);//return the promise no need to Post method as the url itself ask for it 
    }).catch(next);
});


//update the name db]
router.put('/ninjas/:id', function (req, res) {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (ninja) {
        Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
            res.send(ninja);
        });
    });
});

//delete the name in the db
router.delete('/ninjas/:id', function (req, res) {
    Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);

    });
})

module.exports = router;