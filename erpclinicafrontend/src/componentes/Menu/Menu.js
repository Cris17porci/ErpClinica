import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useQuery, gql } from '@apollo/client';
import { AppBar, Button } from '@mui/material';
import './Menu.css';

// Definir la consulta GraphQL para obtener los elementos del menú
const GET_MENU_ITEMS = gql`
  query {
    menuItems {
      id
      title
      url
    }
  }
`;

const Menu = ({ onAppointmentButtonClick }) => { 
  const [isFixed, setIsFixed] = useState(false); // Declarar estado para determinar si el menú está fijo

  const { loading, error, data } = useQuery(GET_MENU_ITEMS);
  const dummyData = [
    { id: 1, title: "Inicio", url: "/inicio" },
    { id: 2, title: "Acerca de", url: "#about-us" }, // Cambiar URL para desplazarse hasta la sección correspondiente
    { id: 3, title: "Servicios", url: "#" },
    { id: 4, title: "Contacto", url: "#" },
    { id: 4, title: "Reservar Cita", url: "/inicio/formulario-citas" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 50); // Actualizar el estado según la posición de desplazamiento
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickAboutUs = (e) => {
    e.preventDefault(); // Evitar la acción predeterminada del enlace
    const aboutUsSection = document.getElementById('about-us');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' }); // Desplazarse suavemente hasta la sección "Acerca de nosotros"
    }
  };
  const handleClickInicio = (e) => {
    e.preventDefault(); // Evitar la acción predeterminada del enlace
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse suavemente hasta arriba
  };
  
  if (loading) return <p>Cargando...</p>;
  if (error) return (
    <AppBar position={isFixed ? 'fixed' : 'static'} className="appBar">
      <div className="menuButtons">
        {dummyData.map(item => (
          <Button key={item.id} onClick={item.title === "Acerca de" ? handleClickAboutUs : item.title === "Inicio" ? handleClickInicio : null} color="inherit">
            {item.title}
          </Button>
        ))}
      </div>
    </AppBar>
  );

  const menuItems = data.menuItems.length > 0 ? data.menuItems : dummyData;

  return (
    <AppBar position={isFixed ? 'fixed' : 'static'} className="appBar">
      <div className="menuButtons">
        {menuItems.map(item => (
          <Link key={item.id} href={item.url} className="link">
            <Button color="inherit">
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </AppBar>
  );
};

export default Menu;
