/**
 * Uploads data from a certain location and creates a training 
 * call for said data
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependecies
import assert from 'assert';
import Model from './Model';

//declare the needed variables for the AI Model
const apiKey = process.env.TOKEN;
const username = "alexstan0";
const modelName = "stable-diffusion-4";
const modelVersion = "187d2ae3532a4991def03d0abadfe2dab60f8f07e8fe1a9cd13be58300a5d878";
const trainerVersion = "d5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb";

/**
 * Runs assert testing on the Model.js class
 */
async function runTests() {
    
  try {

    // Create an instance of the Model class with the required parameters
    const model = new Model(
        apiKey,
        modelName,
        username,
        modelVersion,
        trainerVersion
    );

    // Test the uploadData method
    const servingData = model.uploadData('/Users/alexa/Documents/Data/Anime.zip', 'instancePrompt', 'classPrompt');
    assert.strictEqual(typeof servingData, 'object', 'uploadData should return an object');
    assert.strictEqual(typeof servingData.servingUrl, 'string', 'servingUrl should be a string');
    assert.strictEqual(typeof servingData.instancePrompt, 'string', 'instancePrompt should be a string');
    assert.strictEqual(typeof servingData.classPrompt, 'string', 'classPrompt should be a string');

    // Test the train method
    const trainingIds = model.train(2000, servingData);
    assert.strictEqual(Array.isArray(trainingIds), true, 'train should return an array');

    // Test the checkTrainingStatus method
    const trainingStatus = model.checkTrainingStatus(...trainingIds);
    assert.strictEqual(typeof trainingStatus, 'object', 'checkTrainingStatus should return an object');

    // Test the generate method
    const generatedImage = await model.generate('prompt', 'negativePrompt', 500, 500);
    assert.strictEqual(typeof generatedImage, 'object', 'generate should return an object');
    assert.strictEqual(typeof generatedImage.imageLink, 'string', 'imageLink should be a string');
    assert.strictEqual(typeof generatedImage.prompt, 'string', 'prompt should be a string');
    assert.strictEqual(typeof generatedImage.negativePrompt, 'string', 'negativePrompt should be a string');
    assert.strictEqual(typeof generatedImage.height, 'number', 'height should be a number');
    assert.strictEqual(typeof generatedImage.width, 'number', 'width should be a number');

    // Test the setter and getter methods
    model.setApiKey('new-api-key');
    assert.strictEqual(model.getApiKey(), 'new-api-key', 'setApiKey and getApiKey should work correctly');

    model.setModel('new-model');
    assert.strictEqual(model.getModel(), 'new-model', 'setModel and getModel should work correctly');

    model.setUsername('new-username');
    assert.strictEqual(model.getUsername(), 'new-username', 'setUsername and getUsername should work correctly');

    model.setModelVersion('new-model-version');
    assert.strictEqual(model.getModelVersion(), 'new-model-version', 'setModelVersion and getModelVersion should work correctly');

    model.setTrainerVersion('new-trainer-version');
    assert.strictEqual(model.getTrainerVersion(), 'new-trainer-version', 'setTrainerVersion and getTrainerVersion should work correctly');

    console.log('All tests passed!');

  } catch (error) { console.error('Test failed:', error); }

} //end runTests()

runTests();