
/**
 * Generic template to display an image and the prompt used to make it
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import '../style/ImageShowcase.css'

/**
 * 
 * @param {object} props props passed through as HTMl name:value pairs
 */
function ImageShowcase(props) {

    //store the information for the 
    const { imageSrc, imagePrompt, imageNegativePrompt } = props;

    return (

        <div className="gallery">

            <img src={imageSrc} alt="gallery-piece" className="showcase_image" />

            <div className="prompt_container">

                <span className="prompt top">Prompt: {imagePrompt}</span><br /><br /> 
                <span className="prompt bottom">Negative Prompt: {imageNegativePrompt}</span>

            </div>

        </div>

    );


} //end GeneratedImage

export default ImageShowcase