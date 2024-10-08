import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    priceInCents: {
        type: Number,
        required: true
    },
    filePath: String,
    imagePath: String,
    description: String,
    isAvailableForPurchase: {
        type: Boolean,
        default: true
    },
    createdAt:{ 
        type: Date,
        default: Date.now
    },
    updatedAt: Date
    //TODO add orders (maybe?!)
})

schema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})


export default mongoose.model('Product', schema)