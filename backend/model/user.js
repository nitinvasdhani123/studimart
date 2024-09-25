const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    collegeID: {
        type: Schema.Types.ObjectId,
        ref: 'college', 
        required: false
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: {
          validator: function(v) {
            return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(v);
          },
          message: props => `${props.value} is not a valid Email`
        },
        required: [true, 'User Email is required']
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    pic: {
        type: String,
        default:'upload\default-user-image.jpg',
        required: false,
    },
    otp: {
        type: String,
        trim: true,
        required: false,
        maxlength: 6
    },
    statusFlag : { 
        type: Number, 
        required: false,
        default: 1, // statusFlag: 1 = Active, 2 = Inactive
        maxlength: 1
    },
    role: {
        type: Number,
        required: false,
        default: 1, // statusFlag: 1 = User, 2 = Admin
        maxlength: 1
    },
    college: {
        type: String,
        trim: true,
        required: false
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
    token : {type: String}
},{timestamps:true});

exports.user = mongoose.model('user', userSchema);