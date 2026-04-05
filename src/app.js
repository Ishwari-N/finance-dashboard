const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import Routes and Middleware
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');
const errorHandler = require('./middlewares/errorHandler'); 

const app = express();

// 2. Standard Middleware
app.use(cors());
app.use(express.json());

// 3. API Routes (The Order Matters!)
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);

// 4. Default Root Route
app.get('/', (req, res) => {
  res.send('Finance API is running...');
});

// 5. Global Error Handler (MUST BE LAST)
app.use(errorHandler); 

module.exports = app;