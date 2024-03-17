import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import Carousel from './Carousel/Carousel';
import { Link } from 'wouter';
import './Body.css'; // Importa los estilos CSS

const Body = () => {
  const [showForm, setShowForm] = React.useState(false); // Estado para controlar la visibilidad del formulario

  const handleButtonClick = () => {
    setShowForm(true); // Cuando se hace clic en el botón, muestra el formulario
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
      {/* Usar un botón dentro de un componente Link */}
      {/* Utiliza la propiedad "to" en lugar de "href" */}
      <Link to="/formulario-citas" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Reservar Cita
        </Button>
      </Link>
    </div>
  </div>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <div className="carousel-container"> {/* Utiliza la clase CSS para el contenedor del Carousel */}
            <Carousel />
          </div>
        </Grid>
      </Grid>
      
    </Container>
  );
};

export default Body;