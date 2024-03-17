// Menu.js

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
  // Recibe onAppointmentButtonClick como prop
  const { loading, error, data } = useQuery(GET_MENU_ITEMS);

  // Datos dummy en caso de que no haya resultados o esté cargando
  const dummyData = [
    { id: 1, title: "Inicio", url: "/" },
    { id: 2, title: "Acerca de", url: "#" },
    { id: 3, title: "Servicios", url: "#" },
    { id: 4, title: "Contacto", url: "#" },
  ];
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 50); // Cambia el valor según la altura de tu encabezado
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (loading) return <p>Cargando...</p>;
  if (error) return (
    <AppBar position={isFixed ? 'fixed' : 'static'} className="appBar">
      <div className="menuButtons">
        {dummyData.map(item => (
            <Link key={item.id} href={item.url} className="link"> {/* Utiliza Link en lugar de Button */}
              <Button color="inherit">
                {item.title}
              </Button>
            </Link>
        ))}
        {/* Botón para acceder al formulario de cita */}
        <Link href="/formulario-citas" className="link">
          <Button color="inherit">Reservar Cita</Button>
        </Link>
      </div>
    </AppBar>
  );

  // Obtener los elementos del menú de la consulta o usar los datos dummy si no hay resultados
  const menuItems = data.menuItems.length > 0 ? data.menuItems : dummyData;

  return (
    <AppBar position={isFixed ? 'fixed' : 'static'} className="appBar">
      <div className="menuButtons">
        {menuItems.map(item => (
          <Link key={item.id} href={item.url} className="link"> {/* Utiliza Link en lugar de Button */}
            <Button color="inherit">
              {item.title}
            </Button>
          </Link>
        ))}
        {/* Botón para acceder al formulario de cita */}
        <Link href="/formulario-citas" className="link">
          <Button color="inherit">Reservar Cita</Button>
        </Link>
      </div>
    </AppBar>
  );
};

export default Menu;