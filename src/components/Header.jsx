
/**
 * Header component of the website
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import '../style/Header.css';

/**
 * Renders the header part of the website using provided props
 * @param {object} props options passed through in named arguments
 * @param {string} [props.imageSrc] REQUIRED path (either link of file) to the banner image
 * @param {string} [props.websiteTitle] REQUIRED title of the website, will be displayed in the top left corner
 * @returns the HTML code for the header
 */
function Header(props) {

    //destructure the props object into its seperate variables
    const { imageSrc, websiteTitle } = props;

    return (

        //store the lower elements in a global header div
        <div className="header">

            {/* Website title extracted from the props */}
            <h1 id="title">{websiteTitle}</h1>

            {/* Root element that hold the header banner and the text it contains */}
            <div className="banner_container">

                <img src={imageSrc} alt="banner" className="banner_image" />
                <div className="center_text">Generate Wonderful Art</div>

            </div>

        </div>

    );

} //end Header()

export default Header