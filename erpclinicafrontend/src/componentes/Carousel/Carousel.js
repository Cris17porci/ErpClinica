import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css'; // Importa el archivo CSS para estilos personalizados

// Consulta GraphQL para obtener las imágenes
const GET_IMAGES = gql`
  query {
    images {
      id
      url
      alt
    }
  }
`;

const CarouselComponent = () => {
  // Realizar la consulta GraphQL para obtener las imágenes
  const { loading, error, data } = useQuery(GET_IMAGES);

  // Datos dummy de imágenes en caso de error o carga
  const dummyImages = [
    { id: 1, url: '/imagenes/image1.jpg', alt: 'Imagen 1' },
    { id: 2, url: '/imagenes/image2.jpg', alt: 'Imagen 2' },
    { id: 3, url: '/imagenes/image3.jpg', alt: 'Imagen 3' },
    // Agregar más imágenes dummy según sea necesario
  ];

  // Función para renderizar las imágenes
  const renderImages = () => {
    if (loading || error || !data.images || data.images.length === 0) {
      return dummyImages.map(image => (
        <div key={image.id}>
          <img src={image.url} alt={image.alt} />
        </div>
      ));
    }

    return data.images.map(image => (
      <div key={image.id}>
        <img src={image.url} alt={image.alt} />
      </div>
    ));
  };

  return (
    <div className="carousel-container">
      <Carousel
        autoPlay={true} // Hacer que el Carousel avance automáticamente
        interval={7000} // Definir el intervalo de tiempo en milisegundos
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        dynamicHeight={true}
        infiniteLoop={true} // Permite el bucle infinito entre las imágenes
        className="carousel"
      >
        {renderImages()}
      </Carousel>
      
    <div></div>
    </div>
  );
};

export default CarouselComponent;