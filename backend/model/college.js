const mongoose = require('mongoose');
const { Schema } = mongoose;

const collegeSchema = new Schema({
    collegeName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    address: {
        type: String,
        trim: true,
        required: false
    },
    state: {
        type: String,
        trim: true,
        required: false
    },
    city: {
        type: String,
        trim: true,
        required: false
    },
    region: {
        type: String,
        trim: true,
        required: false
    },
    latitude: {
        type: String,
        trim: true,
        required: false
    },
    longitude: {
        type: String,
        trim: true,
        required: false
    },
    postalCode: {
        type: String,
        trim: true,
        required: false
    },
    statusFlag: { 
        type: Number, 
        required: false,
        default: 1, // statusFlag: 1 = Active, 2 = Inactive
        maxlength: 1
    },
}, { timestamps: true });

exports.college = mongoose.model('college', collegeSchema);