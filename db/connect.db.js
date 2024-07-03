import mongoose, { connect } from "mongoose";
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
};
export default connectToDb;
