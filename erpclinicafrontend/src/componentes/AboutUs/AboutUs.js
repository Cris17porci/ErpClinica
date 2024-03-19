import React from 'react';
import { useQuery, gql } from '@apollo/client';
import dummyImage from './imagenes/image1.jpeg'; // Importa la imagen dummy
import './AboutUs.css'; // Importa el archivo CSS para estilos personalizados

// Consulta GraphQL para obtener la imagen del equipo dental
const GET_DENTAL_TEAM_IMAGE = gql`
  query {
    dentalTeamImage {
      url
    }
  }
`;

const AboutUs = () => {
  // Realizar la consulta GraphQL para obtener la imagen del equipo dental
  const { loading, error, data } = useQuery(GET_DENTAL_TEAM_IMAGE);

  // Renderizar la imagen del equipo dental o la imagen dummy en caso de error o carga
  const renderImage = () => {
    if (loading || error || !data.dentalTeamImage) {
      return <img src={dummyImage} alt="Equipo Dental" className="dental-team-image" />; // Usa la imagen dummy
    }
    return <img src={data.dentalTeamImage.url} alt="Equipo Dental" className="dental-team-image" />; // Usa la imagen del servidor GraphQL
  };

  return (
    <div id="about-us" className="about-us-container"> {/* Aplica la clase para el contenedor */}
      <h2>Acerca de nosotros</h2>
      <div className="about-us-content"> {/* Aplica la clase para el contenido */}
        {renderImage()}
        <p>
          Clínica Dental MUR es una institución con más de 5 años de experiencia en el mercado, comprometida con la excelencia y el servicio de alta calidad. Nuestro equipo de profesionales altamente capacitados se esfuerza continuamente por mejorar y superar las expectativas de nuestros pacientes.
          <br /><br />
          Con más de 10 años de experiencia en diversas clínicas dentales, nuestros profesionales están dedicados a brindar atención de primera clase en todas las áreas de la odontología. Su vasto conocimiento y habilidades técnicas garantizan resultados excepcionales para cada paciente que confía en nosotros.
          <br /><br />
          Nuestra misión es hacer que la atención dental de calidad sea accesible para todas las personas, ofreciendo precios competitivos en el mercado. Creemos que una sonrisa saludable y radiante no debería ser un lujo, sino un derecho para todos.
          <br /><br />
          Nos esforzamos por cumplir nuestra visión de proporcionar atención dental de calidad a precios asequibles para mejorar la salud bucal de nuestra comunidad. Nuestro equipo está constantemente comprometido con el aprendizaje y la mejora continua para garantizar que cada paciente reciba el mejor tratamiento posible.
          <br /><br />
          En Clínica Dental MUR, estamos aquí para cuidar de tu salud dental y brindarte una sonrisa radiante que te enorgullezca. ¡Confía en nosotros para tu bienestar bucal!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;