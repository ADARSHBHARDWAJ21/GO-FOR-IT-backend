const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors'); // 1. Make sure this is imported
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const flightRoutes = require('./routes/flightRoutes');
const clerkWebhookRoutes = require('./routes/clerkWebhookRoutes');

// Connect to MongoDB (non-blocking - server will run even if connection fails)
connectDB().catch((err) => {
  console.warn('MongoDB connection failed. Server will continue running.');
  console.warn('To fix: Update MONGO_URI in your .env file with valid MongoDB credentials.');
});

const app = express();

// 2. THIS IS THE MOST IMPORTANT LINE
// It must be placed here, before any routes.
app.use(cors()); 

app.use(express.json()); // For parsing JSON bodies

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes); // Your user routes
app.use('/api/itinerary', itineraryRoutes); // AI itinerary routes
app.use('/api/hotels', hotelRoutes); // Hotel search routes
app.use('/api/flights', flightRoutes); // Flight search routes
app.use('/api/clerk', clerkWebhookRoutes); // Clerk webhook routes

// Global error handler middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));