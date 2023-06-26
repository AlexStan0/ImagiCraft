/**
 * Stores the image generation and the prompt holder to generate the image
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import { useState } from 'react';
import Filter from 'bad-words';
import '../style/Generate.css';

//import assets
import placeholder from '../assets/placeholder.jpg';

/**
 * Generates AI art based on user input and displays it
 * @returns the generated image and the prompts/interaction that allow the user to create it
 */
function Generate() {

    //create the state for the prompt and negative prompt
    const [ prompt, setPrompt ] = useState('');
    const [ negativePrompt, setNegativePrompt ] = useState('');

    //set the default state of the image source to a blank string
    const [ imageSrc, setImageSrc ] = useState(placeholder);

    //set the default state for the button style
    const [ buttonStyle, setStyle ] = useState({});

    //create a new Filter to check for profanity
    const filter = new Filter();

    //create function to deal with the change of the prompt and negative prompt
    const handlePrompt = event => {

        //check to see if there is profanity in the text field
        const isBad = filter.isProfane(event.target.value);

        //if there is, turn the button red to indicate that the request can not be processed
        if(isBad) {

            //set the style color of the button red to indicate that the request cannot go through
            setStyle({'background-color': '#C21807'});

            //exit the function
            return;

        } else {

            //reset the style if no profanity is found
            setStyle({});

        } //end if-else

        //set the value of the promtp variable
        setPrompt(event.target.value);

    } //end handlePromptChange()

    //create function to deal with the change of the prompt and negative prompt
    const handleNegativePrompt = event => {

        //check to see if there is profanity in the text field
        const isBad = filter.isProfane(event.target.value);

        //if there is, turn the button red to mark that the request can not go through
        if(isBad) {

            //set the style color of the button red to indicate that the request cannot go through
            setStyle({'background-color': '#C21807'});

            //exit the function
            return;

        } else {

            //reset the style if no profanity is found
            setStyle({});

        } //end if-else

        //set the value of the promtp variable
        setNegativePrompt(event.target.value);

    } //end handlePromptChange()

    //create a function to submit the request to the router
    const handleSubmit = event => {

        //ensure that clicking the button does not refresh the page
        event.preventDefault();

        //store the options for the POST call to generate the imaghe
        const fetchOptions = {

            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                prompt: prompt,
                negativePrompt: negativePrompt,
                width: 512,
                height: 512 

            })

        }

        //request that an image be generated
        fetch('http://localhost:8000/generate', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                prompt: prompt,
                negativePrompt: negativePrompt,
                width: 512,
                height: 512 

            })

        }).then(response => response.json())
          .then(data => setImageSrc(data.imageLink));

    } //end handleSumbit()

    return (

        <div className="generate_parent">

            <img src={imageSrc} alt="generated image" className="generated_image" />

            <div className="generate_menu">

                <p id="title_text">Try It Yourself!</p>
                <p className="explanation_text">Enter what you want (and don't want) and let the AI </p>
                <p className="explanation_text">generate an image for you!</p>

                <form id="generate_form">

                    <input type="search" id="include" name="prompt" onChange={handlePrompt} placeholder="Include" autocomplete="off" />
                    <input type="search" id="exclude" name="prompt" onChange={handleNegativePrompt} placeholder="Exclude" autocomplete="off"/>
                    <button className="generate_button" style={buttonStyle} onClick={handleSubmit}>Generate</button>

                </form>

            </div>

        </div>

    );

} //end Generate()

export default Generate;