// 'use client';
// import React, { useContext, useEffect, useState } from 'react';
// import { CartContext } from '../context/CartContext';
// import Navbar from '../(Navbar)/page';
// import Footer from '../(Footer)/page';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Home = () => {
//   const { addToCart } = useContext(CartContext);
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/menu');
//         if (!response.ok) {
//           throw new Error('Failed to fetch car details');
//         }
//         const data = await response.json();
//         if (Array.isArray(data)) {
//           setCars(data);
//         } else {
//           console.error('API returned non-array data:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching car details:', error);
//         toast.error('Error loading car data. Please try again later.');
//       }
//     };

//     fetchCars();
//   }, []);

//   const handleAddToCart = (car) => {
//     console.log(car); // Check the car object structure
//     addToCart(car);
//     toast.success(`${car.model || car.name || 'Car'} added to the cart!`);
//   };
  

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />
//       <header className="bg-blue-500 text-white py-16 text-center">
//         <h1 className="text-4xl font-bold">Welcome to DriveEasy</h1>
//         <p className="mt-2 text-lg">Affordable and reliable car rentals at your service</p>
//       </header>
//       <section id="menu" className="cars-section">
//         <main className="container mx-auto px-4 py-10">
//           <h2 className="text-3xl font-bold text-center mb-8">Available Cars</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {cars.length > 0 ? (
//               cars.map((car, index) => (
//                 <div
//                   key={car.id || index}
//                   className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//                 >
//                   <img
//                     src={car.image || '/path/to/default-car.jpg'}
//                     alt={car.model}
//                     className="rounded-t-lg h-48 w-full object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold text-gray-800">{car.model}</h3>
//                     <p className="text-gray-600 text-sm mt-2">{car.details}</p>
//                     <div className="mt-4 flex justify-between items-center">
//                       <span className="text-blue-500 font-bold">
//                         ${car.rentalPrice ? car.rentalPrice.toFixed(2) : 'N/A'} / day
//                       </span>
//                       <button
//                         onClick={() => handleAddToCart(car)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                       >
//                         Rent Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No cars available</p>
//             )}
//           </div>
//         </main>
//       </section>
//       <Footer />
//       {/* Toast container for notifications */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Home;

'use client';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../(Navbar)/page';
import Footer from '../(Footer)/page';
import { Snackbar, Alert, Button, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Grow } from '@mui/material';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        const data = await response.json();
        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        setError('Error loading car data. Please try again later.');
        setOpen(true);
      }
    };

    fetchCars();
  }, []);

  const handleAddToCart = (car) => {
    addToCart(car);
    setSuccess(`${car.model || car.name || 'Car'} added to the cart!`);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome to DriveEasy
        </Typography>
        <Typography mt={2} variant="subtitle1">
          Affordable and reliable car rentals at your service
        </Typography>
      </Box>
      <Box id="menu" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Available Cars
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ px: { xs: 2, md: 4 } }}>
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <Grow in={true} timeout={500 + index * 100} key={car.id || index}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      '&:hover': { boxShadow: 6 },
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.image || '/path/to/default-car.jpg'}
                      alt={car.model || 'Car'}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {car.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {car.details}
                      </Typography>
                      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" color="primary">
                          ${car.rentalPrice ? car.rentalPrice.toFixed(2) : 'N/A'} / day
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddToCart(car)}
                        >
                          Rent Now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center" width="100%">
              No cars available
            </Typography>
          )}
        </Grid>
      </Box>
      <Footer />

      {/* Success Snackbar */}
      <Snackbar open={!!success && open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={!!error && open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
