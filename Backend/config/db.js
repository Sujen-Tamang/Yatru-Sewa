import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(process.cwd(), 'config.env') });

const connectDB = async () => {
  mongoose
      .connect(process.env.MONGO_URI, {
        dbName: "YatruSewa",
      })
      .then(() => {
        console.log("Connected to database.");
      })
      .catch((err) => {
        console.log(`Some error occured while connecting to database: ${err}`);
      });
};

export default connectDB;