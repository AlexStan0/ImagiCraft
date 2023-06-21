/**
 * Brings together all of the components to render in a single component
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import React from 'react';
import Header from './Header.jsx';

//import assets
import banner from '../assets/banner.jpg'

function App() {

    //store the title of the website
    const title = "ImageCraft";

    return (
        <>
            <Header imageSrc={banner} websiteTitle={title} />
        </>
    )

} //end App()

export default App;
