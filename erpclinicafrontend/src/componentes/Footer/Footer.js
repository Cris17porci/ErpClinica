// Footer.js
import React from 'react';
import { Typography, Container } from '@mui/material';
import './Footer.css'; // Importa el archivo CSS

function Footer() {
  return (
    <footer className="footer-container"> {/* Aplica la clase footer-container */}
      <Container>
        <Typography variant="body2" color="text.secondary" align="center" className="footer-text"> {/* Aplica la clase footer-text */}
          © {new Date().getFullYear()} Clínica Dental MUR. Todos los derechos reservados.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;