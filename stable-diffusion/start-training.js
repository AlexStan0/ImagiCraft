
//import dependencies
import aiModel from "./aiModel.js";
import 'dotenv/config';

const apiKey = process.env.TOKEN;
const modelType = "stability-ai";
const modelCode = "stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const username = "alexstan0";

let model = new aiModel(apiKey, modelType, modelCode, username);

model.trainModel("/home/alexa/data/archive.zip", "photos of cjw people", "photos of people", 532);