import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3, //TODO set valid regex for email  
    },
    name: String,
    passwordHash: String,
    createdAt:{ 
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
})

schema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        //password hash should be hidden!
        delete returnedObject.passwordHash;
    }
})


export default mongoose.model('User', schema)