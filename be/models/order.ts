import mongoose from 'mongoose';
//TODO unique validator
const schema = new mongoose.Schema({
    pricePaidInCents: {
        type: Number,
        required: true
    },
    createdAt:{ 
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

schema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})


export default mongoose.model('Order', schema)