import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: String,
    passwordHash: String,
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        //password hash should be hidden!
        delete returnedObject.passwordHash;
    }
})


export default mongoose.model('User', schema)