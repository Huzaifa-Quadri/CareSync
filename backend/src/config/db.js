// import mongoose from "mongoose";

// const connectDB = async () => {
//   mongoose.connection.on("connected", () => console.log("Database Connected!"));
//   await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
// };

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      minPoolSize: 5,
    });

    console.log("✅ MongoDB Connected Successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("✅ MongoDB Disconnected");
  } catch (error) {
    console.error("❌ Disconnect Error:", error.message);
    process.exit(1);
  }
};

export { connectDB, disconnectDB };
