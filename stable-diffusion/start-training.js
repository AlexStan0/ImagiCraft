
//import dependencies
import aiModel from "./aiModel.js";
import 'dotenv/config';

const apiKey = process.env.TOKEN;
const username = "alexstan0";
const model = "stable-diffusion-4";
const modelVersion = "ecefcd352be5d778ed0d79b4a96f95bf543418d1c6979220753330529e4773fe";
const trainerVersion = "d5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb";

const myModel = new aiModel(apiKey, model, username, modelVersion, trainerVersion);


let cityscape = myModel.uploadData("/mnt/c/Users/alexa/Documents/Data/Cityscape.zip", "photos of slw city skylines", "photos of city skylines");
let landscape = myModel.uploadData("/mnt/c/Users/alexa/Documents/Data/LandscapeSet.zip", "photos of slw city skylines", "photos of city skylines");

console.log(cityscape);
console.log(landscape);

//myModel.trainModel(2000, cityscape, landscape);