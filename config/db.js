import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    // only fields specified in schema are allowed to be saved
    mongoose.set('strictQuery', true);

    // If DB is already connected, return
    if (connected) {
        console.log('MongoDB already connected...');
        return;
    }

    // Connect to MongoDB
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDB connected...');
    } catch (err) {
        console.log(err.message);
    }
};

export default connectDB;