import mongoose from 'mongoose'

const registrationSchema = new mongoose.Schema({

    username: {
        type:String,
        required:true,
        unique: true,
        trim: true,
        minlength: 2
    },
     email: {
        type:String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
      password: {
        type:String,
        required:true,
        minlength: 6
    }


});

export default mongoose.model("Users" , registrationSchema)