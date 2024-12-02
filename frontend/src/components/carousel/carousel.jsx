import { useState, useEffect, lazy, Suspense } from "react";
import './carousel.css';

const Image1 = lazy(() => import("../../assets/images/Image1"));
const Image2 = lazy(() => import("../../assets/images/Image2"));
const Image3 = lazy(() => import("../../assets/images/Image3"));

const images = [
    <Image1 key="1" />,
    <Image2 key="2" />,
    <Image3 key="3" />
];

function Carousel() {
    const [count, setCount] = useState(0);

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
        <div className="carousel">
            <div className="carousel-inner" style={slideStyle}>
                {images.map((image, index) => (
                    <Suspense fallback={<div style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>Loading...</div>} key={index}>
                    <div className="carousel-item">
                        {image}
                    </div>
                </Suspense>
                ))}
            </div>
        </div>
    );
}

export default Carousel;