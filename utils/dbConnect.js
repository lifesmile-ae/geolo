import mongoose from 'mongoose';

const dbConnect = () => {
  if (mongoose.connection.readyState > 1) {
    return;
  }

  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((con) => console.log('connected successfully'));
};

export default dbConnect;
