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
import Footer from './Footer.jsx'

//import assets
import banner from '../assets/banner.jpg';
import gallery_image_one from '../assets/gallery_image_one.jpg';
import gallery_image_two from '../assets/gallery_image_two.jpg';
import gallery_image_three from '../assets/gallery_image_three.jpg';

/**
 * Stitches all of the components of the website to send to the DOM to render
 * @returns a render of all the website components
 */
function App() {

    //store the title of the website
    const websiteTitle = "ImageCraft";

    //store the sources for the images
    const gallerySources = [
        gallery_image_one,
        gallery_image_two,
        gallery_image_three
    ]

    const imageTitles = [
        'mountain on ocean, 4k, waterfall, beautiful, sunset, dock',
        'Dark sunset over stormy cloudy ocean in style of Pointillism is a technique of painting in which small, distinct dots of colour',
        'Ruined Castle in Valley, Medieval, Elden Ring Look  alike, dead bush, trees, wind blowing leaves',
    ]

    return (

        <>

            <Header imageSrc={banner} websiteTitle={websiteTitle} />
            <Gallery imageSrcs={gallerySources} imagePrompts={imageTitles} />
            <Generate />
            <Footer />
        
        </>

    );

} //end App()

export default App;
