import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagen1 from '../assets/1.png';
import imagen2 from '../assets/2.png';
import imagen3 from '../assets/3.png';
import imagen4 from '../assets/Promo1.png';
import imagen5 from '../assets/Promo2.png';

function Carrusel() {
  return (
    <div className="carrusel-container mb-4">
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    interval={5000}
  >
    <div>
      <img src={imagen4} alt="Imagen 1" />
    </div>
    <div>
      <img src={imagen5} alt="Imagen 2" />
    </div>
    <div>
      <img src={imagen3} alt="Imagen 3" />
    </div>
  </Carousel>
</div>

  );
}

export default Carrusel;
