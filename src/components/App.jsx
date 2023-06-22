/**
 * Brings together all of the components to render in a single component
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import Header from './Header.jsx';
import ImageShowcase from './ImageShowcase.jsx';

//import assets
import banner from '../assets/banner.jpg';

function App() {

    //store the title of the website
    const websiteTitle = "ImageCraft";

    return (

        <>

            <Header imageSrc={banner} websiteTitle={websiteTitle} />
            <ImageShowcase imageSrc={banner} imagePrompt={'width: 21vw ;'} imageNegativePrompt="negative prompt" />
            

        </>

    );

} //end App()

export default App;
