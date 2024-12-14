import "./AutoPlay.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  margin: "0 auto",
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

export default Slideshow;
