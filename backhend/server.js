const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menuRoutes');
const contactRoutes = require('./routes/ContactRoute'); 
const cartRoutes = require('./routes/CartRoute'); 
const Buy = require('./models/buycar')

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for frontend requests
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend

// Base Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes); 
app.use('/api/cart', cartRoutes);


app.post('/api/buy', async (req, res) => {
  try {
    const { name, price, quantity, image } = req.body;

    // Create a new Buy record in the database
    const newBuy = new Buy({
      name,
      price,
      quantity,
      image,
    });

    await newBuy.save();
    res.status(201).json({ message: 'Item purchased successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the purchase' });
  }
});
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
