import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js'; // Assuming you have a db.js file for MongoDB connection
import reportRoutes from './routes/reportRoutes.js'; // Assuming you have a reportRoutes.js file for handling routes
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  console.log(req.url);
  next();
})

// Routes
app.use('/api', reportRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Lost and Found API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});