
/**
 * Generic template to display an image and the prompt used to make it
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import '../style/Footer.css';

//import assets
import github from '../assets/github.png'

/**
 * Is the bottom of the page, links to the project's github page
 * @returns a clickable icon that routes the user to the github page of the website/model
 */
function Footer() {

    return (

        <div className="footer">
            
            {/* reroutes user to github page */}
            <a href="https://github.com/AlexStan0/forknife-v5" target="_blank" >

                {/* make the link an image */}
                <img src={github} className="image" alt="link_to_code" />

            </a>

        </div>

    )

} //end Footer()

export default Footer;