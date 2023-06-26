/**
 * Brings together all of the components to render in a single component
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import Header from './Header.jsx';
import Gallery from './Gallery.jsx';
import Generate from './Generate.jsx';

//import assets
import banner from '../assets/banner.jpg';

/**
 * Stitches all of the components of the website to send to the DOM to render
 * @returns a render of all the website components
 */
function App() {

    //store the title of the website
    const websiteTitle = "ImageCraft";

    //store the sources for the images
    const gallerySources = [
        banner,
        banner,
        banner
    ]

    const imageTitles = [
        'medieval, cool, scary',
        'medieval, cool, scary',
        'medieval, cool, scary',
    ]

    return (

        <>

            <Header imageSrc={banner} websiteTitle={websiteTitle} />
            <Gallery imageSrcs={gallerySources} imagePrompts={imageTitles} />
            <Generate />
        
        </>

    );

} //end App()

export default App;
