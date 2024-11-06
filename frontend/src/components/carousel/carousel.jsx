import image1 from "../../assets/fitness.jpg";
import image2 from "../../assets/dumbbell.jpg";
import image3 from "../../assets/work-out.jpg";
import { useState, useEffect } from "react";
import './carousel.css';

function Carousel() {
    const [count, setCount] = useState(0);

    const images = [image1, image2, image3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => (prevCount + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, [images.length]);

    
    const slideStyle = {
        transform: `translateX(-${count * 100}%)`,
    };

    return (
        <div className="carousel-container">
            <div className="images-container" style={slideStyle}>
                <div className="image">
                    <img src={image1} alt="image 1" />
                </div>
                <div className="image">
                    <img src={image2} alt="image 2" />
                </div>
                <div className="image">
                    <img src={image3} alt="image 3" />
                </div>
            </div>
        </div>
    );
}

export default Carousel;
