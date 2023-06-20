
/**
 * Header component that contains a landscape work of art 
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 7th 2023
 */

//import dependencies
import React from 'react';

function Header({ imageUrl, websiteTitle, width, height }) {

    return (
        <>
            <p>{websiteTitle}</p>
            <div>
                <img url={imageUrl} width={width} height={height} />
                <div className="center-text">Generate Wonderful Art</div>
            </div>
        </>
    );

} //end Header()

export default Header