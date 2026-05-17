// import dns from "dns";
// dns.setServers(["8.8.8.8", "8.8.4.4"]); // breaks Docker DNS — Docker has its own resolver
import "dotenv/config";
import app from "./src/app.js";
import {connectDB} from "./src/config/db.js";
import connectCloudinary from "./src/config/cloudinary.js";

const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.listen(port, () => 
    console.log(`Server running on PORT ${port}`
));


