import mongoose from "mongoose";


const connectDB = async () => {

  if (mongoose.connections[0].readyState) {

    return;

  }

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {

    throw new Error('Invalid MongoDB connection string');

  }

  await mongoose.connect(mongoURI, {

    useNewUrlParser: true,

    useUnifiedTopology: true,

  });

};


export default connectDB;