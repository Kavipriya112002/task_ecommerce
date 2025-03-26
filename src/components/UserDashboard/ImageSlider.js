import React,{useState, useEffect} from 'react'
import "./ImageSlider.css"; // Add CSS for styling

const ImageSlider =({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImage((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 1500);
  
      return () => clearInterval(intervalId);
    }, [images.length]);
  
    return (
      <div className="slider">
        <img
          src={images[currentImage]}
          alt={`Slide ${currentImage}`}
          className='slider_image' height="350" width="90%"
          
        />
      </div>
    );
}
export default ImageSlider;