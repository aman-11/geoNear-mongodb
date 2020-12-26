const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geolocationschema

const geoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const NinjaSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name field is required'],

    },

    rank: {
        type: String,
    },

    available: {
        type: Boolean,
        default: false
    },
    //add in geo location
    geometry: geoSchema
})

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;