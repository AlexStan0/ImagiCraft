
/*
* Name: Alexandru Stan
* Course ICS4U
* Teacher: Mrs. McCaffery
* Date: June 7th 2023
* Description: Generic class to create AI models to train
*/

//import dependencies
import Replicate from 'replicate';
import fileUrl from 'file-url';
import fs from 'fs';

/**
 * Generic training class to train the AI
 * @author Alexandru Stan
 * @since June 2023
 */
class aiModel {

    //declare global variables for the class
    #apiKey;
    #model;
    #trainerVersion;
    #username;
    #replicate;

    /**
     * Constructor for the AI training model
     * @param {string} apiKey API key for the dreambooth/replicate API
     * @param {string} model name of stable-diffusion model that is going to be used
     * @param {string} modelCode special serial code for each model
     */
    constructor(apiKey, model, username) {

        //set the local attributes to the ones the user provided
        this.#apiKey = apiKey;
        this.#model = model;
        this.#username = username;

        //create the API Connection for the model
        this.#createReplicate();

    } //end constructor()

    //create a setter for the apiKey (a getter is not added as it has to remain private)
    setApiKey = newKey => this.#apiKey = newKey;
    
    //create a getter and setter for the ai-model
    setModel = newModel => this.#model = newModel;
    getModel = () => this.#model;

    //create a getter and setter for the username
    setUsername = newUsername => this.#username = newUsername;
    getUsername = () => this.#username;

    /**
     * @private 
     * Creates a connection to the replicate API
     */
    #createReplicate() {

        //declare a new connection to the dreambooth API via replicate
        this.#replicate = new Replicate({
            auth: this.#apiKey
        });

    } //end createReplicate()

    getData = (filePath, instance_prompt, class_prompt) => {


        //TODO: create urls for the filePaths and ship them out in an object
        //ensure that the filePath is valid 


        //create file URL based on the file path provided

    } //end getData()

    trainModel = (options) => {

        this.#replicate();

    } //end trainModel()

    isFile = async path => {

        //TODO: ensure that provided filePaths are valid and return it

    } //end isFile()

} //end trainingModel

export default aiModel;
