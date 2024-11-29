import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AutoPlay.css";

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="/assets/0.jpg" />
        </div>
        <div>
          <img src="/assets/1.jpg" />
        </div>
        <div>
          <img src="/assets/2.jpg" />
        </div>
        <div>
          <img src="/assets/3.jpg" />
        </div>
        <div>
          <img src="/assets/4.jpg" />
        </div>
        <div>
          <img src="/assets/5.jpg" />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
