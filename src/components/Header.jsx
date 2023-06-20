
/**
 * Header component of the website
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import React from 'react';
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

        <div className="global_header">
            <h2>{websiteTitle}</h2>
            <div>
                <img src={imageSrc} alt="banner" className="banner_image" />
                <div className="center-text">Generate Wonderful Art</div>
            </div>
        </div>

    );

} //end Header()

export default Header