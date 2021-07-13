import mongoose from 'mongoose';
import { MONGO_URI } from './index.js';

export const connectDB = async () => {

    const connectTOMongoDB = await mongoose.connect(`${MONGO_URI}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });


    console.log(`MongoDB connected ${connectTOMongoDB.connection.host}`.bgCyan)
};