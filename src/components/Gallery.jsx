
/**
 * Generic template to display an image and the prompt used to make it
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import '../style/Gallery.css'

/**
 * Create a customizable gallery of custom AI generated images
 * @param {object} props props passed through as HTMl name:value pairs
 * @param {string[]} imageSrcs REQUIRED, passed through array of image sources
 * @param {string[]} imagePrompts REQUIRED, passed through array of the prompts for the images
 * @returns a gallery of generated images
 */
function Gallery(props) {

    //store the information for the 
    const { imageSrcs, imagePrompts } = props;

    //loop through the image sources and create a JSX element for each one
    const images = imageSrcs.map((source, index) => {

        //return a div with the prompt box and the image
        return (

            //store a singular instance of the showcase in a parent div
            <div className="showcase">

                <img src={source} alt="showcase" className="showcase_image" />

                {/* container to hold the prompt that describes the image */}
                <div className="image_prompt_container">

                    <p className="image_prompt_title">Prompt</p>

                    <p className="image_prompt">{imagePrompts[index]}</p>

                </div>

            </div>

        );

    });

    return (

        <>
            <h1 id="showcase_title">Generated Images</h1>

            <div className="gallery">

                {images}

            </div>
        </>

    );

} //end Gallery()

export default Gallery