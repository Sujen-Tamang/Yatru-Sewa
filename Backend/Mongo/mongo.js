import mongoose from "mongoose";

const connectDB=async()=>{
  mongoose.connection.on('connected',()=>{
    console.log('Mongo connected successfuly !')
  })
  await mongoose.connect(`${process.env.MONGODB_URL}/rachael`)

}
export  {connectDB}