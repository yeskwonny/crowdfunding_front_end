import "./AutoPlay.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  margin: "0 auto",
  // alignItems: "center",
  // justifyContent: "center",
  width: "90%",
  backgroundSize: "cover",
  height: "600px",
};

const slideImages = [
  {
    url: "/assets/2.jpg",
    caption: "Slide 1",
  },
  {
    url: "/assets/4.jpg",
    caption: "Slide 2",
  },
  {
    url: "/assets/1.jpg",
    caption: "Slide 3",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide duration={4000}>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
/*function AutoPlay() {
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
*/

export default Slideshow;
