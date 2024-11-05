
import image1 from "./assets/gym2.avif"
import image2 from "./assets/gym3.avif"
import image3 from "./assets/workout1.avif"
import './carousel.css'
function carousel() {
  return (
    <div className="carousel-container">
        <div className="images-container">
            <div className="image">
                <img src={image1} alt="image 1"/>
            </div>
            <div className="image">
                <img src={image2} alt="image 2"/>
            </div>
            <div className="image">
                <img src={image3} alt="image 3"/>
            </div>
        </div>
    </div>
  )
}

export default carousel