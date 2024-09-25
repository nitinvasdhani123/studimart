const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    statusFlag: { 
        type: Number, 
        required: false,
        default: 1, // statusFlag: 1 = Active, 2 = Inactive
        maxlength: 1
    },
}, { timestamps: true });

exports.category = mongoose.model('category', categorySchema);