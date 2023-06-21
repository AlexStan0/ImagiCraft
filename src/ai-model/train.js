
/**
 * Uploads data from a certain location and creates a training 
 * call for said data
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import fs from 'fs';
import path from 'path';
import Model from "./Model.js";
import 'dotenv/config';

//declare the needed variables for the AI Model
const apiKey = process.env.TOKEN;
const username = "alexstan0";
const modelName = "stable-diffusion-4";
const modelVersion = "187d2ae3532a4991def03d0abadfe2dab60f8f07e8fe1a9cd13be58300a5d878";
const trainerVersion = "d5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb";

//create an instance of the model
const model = new Model(apiKey, modelName, username, modelVersion, trainerVersion);

//create an array to store oibjects containing the file path, instance prompt, and class prompt for a data set
const trainingData = []

//create an array to store the data from uploading the files
const servingData = [];

//store the path to the directory where the training data is stored
const dataDirectory = "/mnt/c/Users/alexa/Documents/Data";

//read the names of the files in the specified directory
fs.readdir(dataDirectory, (err, files) => {

    //throw the error if it occurs
    if(err) throw err;

    //push each file name to the file name array
    files.forEach(file => {

        //create an object to store the instance prompts, class prompts, and file path
        const dataObj = {};

        //remove the file extension from the file string
        file = path.parse(file).name;

        //insert the rare token 'slw' infront of the descriptor name
        dataObj.instancePrompt = `photo of slw ${file}`;

        //create the class prompt (same thing as the instance prompt without the rare token)
        dataObj.classPrompt = `photo of ${file}`;
        
        //create a string that holds the complete file path to the data file
        dataObj.filePath = `${dataDirectory}/${file}.zip`;

        //push the data to the array for the information
        trainingData.push(dataObj);

    });

    //loop over the data upload the files and their instance/class prompts
    trainingData.forEach(data => servingData.push(model.uploadData(data.filePath, data.instancePrompt, data.classPrompt)));

    //loop over the set of training data and train the model
    servingData.forEach(data => model.train(2000, data));

});