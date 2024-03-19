
import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import Carousel from './Carousel/Carousel';
import AboutUs from './AboutUs/AboutUs';
import { Link } from 'wouter';
import './Body.css'; // Importa los estilos CSS

const Body = () => {
  const [setShowForm] = React.useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Bienvenido a nuestra Clínica Dental MUR
      </Typography>
      <div className="body-container">
        <Typography variant="body1" align="center" gutterBottom>
          Ofrecemos servicios de alta calidad para tu salud bucal.
        </Typography>
        <div className="button-container">
          <Link to="/formulario-citas" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Reservar Cita
            </Button>
          </Link>
        </div>
      </div>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <div className="carousel-container">
            <Carousel />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <div className="about-us-container">
            <AboutUs />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Body;