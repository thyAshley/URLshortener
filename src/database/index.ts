import mongoose from "mongoose";

console.log(process.env.MONGO_URI);

const db = () =>
  mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

export default db;
