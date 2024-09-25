const mongoose = require('mongoose');
const { Schema } = mongoose;

const productImagesSchema = new Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'product',  
        required: true
    },
    productImage: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
}, { timestamps: true });

exports.productImage = mongoose.model('productImage', productImagesSchema);