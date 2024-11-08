import image1 from "../../assets/workout-tips.jpg";
import image2 from "../../assets/notes.jpg";
import './DisplayPicture.css';


function DisplayPicture() {
    return (
      <div className="display-picture-container">
        <div className="image">
          <img src={image1} alt="Workout Tips" />
          <span className="overlay-text">Workout Tips</span> {/* Text for first image */}
        </div>
        <div className="image">
          <img src={image2} alt="Notes" />
          <span className="overlay-text">Notes</span> {/* Text for second image */}
        </div>
      </div>
    );
  }
  
  export default DisplayPicture;
