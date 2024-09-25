const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    categoryID: {
        type: Schema.Types.ObjectId,
        ref: 'category',  
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user',  
        required: true
    },
    productName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    productPrice: {
        type: Number,
        trim: true,
        required: true,
        unique: true
    },
    statusFlag: { 
        type: Number, 
        required: false,
        default: 1, // statusFlag: 1 = unsold, 2 = sold
        maxlength: 1
    },
    adminStatusFlag: { 
        type: Number, 
        required: false,
        default: 2, // statusFlag: 1 = approved, 2 = reject
        maxlength: 1
    },
}, { timestamps: true });

exports.product = mongoose.model('product', productSchema);