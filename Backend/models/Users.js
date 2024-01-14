const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surename: {
        type: String,
        required: true,
    },
    
   
    email:{
        type: String,
        required:true,
        unique:true,
    },
    role:{
        type:Number,//0-superadmin;1-admin;2-user
        default:2,
        required:true,
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking', // Reference to the Booking model
      }],  
    password:{
        type:String,
        required:true,
    },
    newletter:{
        type:Boolean,
        default:false,
    },
    profilePic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
    
});

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;