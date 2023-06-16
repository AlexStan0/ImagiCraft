
//import dependencies
import aiModel from "./aiModel.js";
import Replicate from 'replicate';
import 'dotenv/config';
import fetch from 'node-fetch';

const apiKey = process.env.TOKEN;
const username = "alexstan0";
const model = "stable-diffusion-4";
const modelVersion = "187d2ae3532a4991def03d0abadfe2dab60f8f07e8fe1a9cd13be58300a5d878";
const trainerVersion = "d5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb";

const myModel = new aiModel(apiKey, model, username, modelVersion, trainerVersion);
let link = await myModel.generate("an old japanise car drifting on a raceway", "monkeys dancing");
console.log(link);

// let cityscape = myModel.uploadData("/mnt/c/Users/alexa/Documents/Data/Cityscape.zip", "photos of slw city skylines", "photos of city skylines");
// let landscape = myModel.uploadData("/mnt/c/Users/alexa/Documents/Data/LandscapeSet.zip", "photos of slw city skylines", "photos of city skylines");

// console.log(cityscape);
// console.log(landscape);

// let idArr = myModel.trainModel(2000, cityscape, landscape);
//myModel.checkTrainingStatus(...idArr);