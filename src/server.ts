import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./swagger.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
connectDB();


// Routes






// Error handling middleware
app.use(errorHandler);


app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});


export default app;