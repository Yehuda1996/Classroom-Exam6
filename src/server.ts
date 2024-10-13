import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./swagger";
import authRouter from "./routes/authRoute"


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
connectDB();


// Routes
app.use('/auth', authRouter);





// Error handling middleware
app.use(errorHandler);


app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});


export default app;