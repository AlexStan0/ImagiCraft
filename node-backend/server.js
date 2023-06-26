/**
 * Backend server for the website to generate the images
 * without interfering with react
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import Model from './Model.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {} from 'dotenv/config';

//create a new express app and set the port
const app = express();
const port = 8000;

//allow the app to use cors and the body-parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//listen for any requests to generate an image
app.post('/generate', async (req, res) => {

    //declare the needed variables for the AI Model
    const apiKey = process.env.TOKEN;
    const username = "alexstan0";
    const modelName = "stable-diffusion-4";
    const modelVersion = "187d2ae3532a4991def03d0abadfe2dab60f8f07e8fe1a9cd13be58300a5d878";
    const trainerVersion = "d5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb";

    //create a new model
    const model = new Model(
        apiKey,
        modelName,
        username,
        modelVersion,
        trainerVersion
    );

    //set all the variables needed to generate an image
    const {

        prompt,
        negativePrompt,
        width,
        height

    } = req.body;

    //generate an image
    const generatedImage = await model.generate(prompt, negativePrompt, width, height);

    //respond with the generated object
    res.json(generatedImage);

})

//open the server to listen for requests
app.listen(port, () => {
    console.log("Server running successfully on Port 8000");
})