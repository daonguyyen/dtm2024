import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "../slider/Slider";
import "./sliders.scss";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Fade from "react-reveal/Fade";

const Sliders = ({ refreshSliders, onDelete }) => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchSlider = async () => {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/sliders");
      setSliders(res.data);
    };
    fetchSlider();
  }, [refreshSliders]);

  //Owl Carousel Settings
  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: false,
    autoplayTimeout: 5500,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <Fade top cascade>
      <div id="customer-project">
        <OwlCarousel className="owl-carousel owl-theme" {...options}>
          {sliders.map((p, index) => (
            <Slider key={index} slider={p} onDelete={onDelete} />
          ))}
        </OwlCarousel>
      </div>
    </Fade>
  );
};

export default Sliders;
