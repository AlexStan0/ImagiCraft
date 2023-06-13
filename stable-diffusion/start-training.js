
//import dependencies
import aiModel from "./aiModel.js";
import 'dotenv/config';

const apiKey = process.env.TOKEN;
const username = "alexstan0";
const model = "kadinsky-2";
const trainerVersion = "183eb80e7e10b93653f09c909ea0b762b6aef17c36b82165a01bdd42dc309c06";

const myModel = new aiModel(apiKey, model, username, trainerVersion);


let arr = myModel.uploadData("/home/alexa/Downloads/archive.zip", "/home/alexa/Downloads/cars.zip");
console.log(arr);