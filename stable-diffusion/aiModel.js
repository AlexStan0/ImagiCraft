
/*
* Name: Alexandru Stan
* Course ICS4U
* Teacher: Mrs. McCaffery
* Date: June 7th 2023
* Description: Generic class to create AI models to train
*/

//import dependencies
import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'node:child_process';
import fetch from 'node-fetch';

/**
 * Generic training class to train a custom AI Model
 * @author Alexandru Stan
 * @since June 2023
 */
class aiModel {

    //declare global variables for the class
    #apiKey;
    #model;
    #username;
    #modelVersion;
    #trainerVersion;
    #replicate;

    /**
     * Constructor for an AI class that allows the remote training of a model.
     * NOTE: The model provided must be a stable-diffusion model (1.5, or 2.1) to be 
     * able to use the dreambooth API calls;
     * 
     * 
     * @param {*} apiKey replicate.com auth token 
     * @param {*} model the name of the model that is being used
     * @param {*} username username of the account associated with the auth token
     * @param {*} modelVersion model version that will be used to run predictions with
     * @param {*} trainerVersion trainer version that will be used to train the model with
     */
    constructor(apiKey, model, username, modelVersion, trainerVersion) {

        //set the local attributes to the ones the user provided
        this.#apiKey = apiKey;
        this.#model = model;
        this.#username = username;
        this.#modelVersion = modelVersion;
        this.#trainerVersion = trainerVersion;

        //create the API Connection for the model
        this.#createReplicate();

    } //end constructor()

    //setter for the apiKey (a getter is not added as it has to remain private)
    setApiKey = newKey => this.#apiKey = newKey;
    
    //getter and setter for the ai-model
    setModel = newModel => this.#model = newModel;
    getModel = () => this.#model;

    //getter and setter for the username
    setUsername = newUsername => this.#username = newUsername;
    getUsername = () => this.#username;

    //getter and setter for the modelVersion
    setModelVersion = newVersion => this.#modelVersion = newVersion;
    getModeVersion = () => this.#modelVersion;

    //getter and setter for the trainerVersion
    setTrainerVersion = newTrainerVersion => this.#trainerVersion = newTrainerVersion;
    getTrainerVersion = () => this.trainerVersion;

    /**
     * Creates a connection to the replicate API
     */
    #createReplicate() {

        //create a new connection to the dreambooth API via replicate
        this.#replicate = new Replicate({
            auth: this.#apiKey,
            fetch: fetch
        });

    } //end createReplicate()

    /**
     * Uploads files using the Replicate API
     * @param {string} filePath paths to the zip files to be uploaded
     * @returns {string[]} serving data for the API 
     */
    uploadData = (filePath, instancePrompt, classPrompt) => {

        //create a variable that points to the sh script
        const scriptPath = 'upload.sh'

        //declare an empty array to store the serving urls for the uploaded files
        const servingData = [];

        //if the file is not a zip file, skip it
        if(path.extname(filePath) !== ".zip") throw new Error("Please provide valid data");

        //store the commands needed to upload the data
        const commands = [
            `RESPONSE=$(curl -X POST -H "Authorization: Token ${this.#apiKey}" https://dreambooth-api-experimental.replicate.com/v1/upload/data.zip)\n`,
            `curl -X PUT -H "Content-Type: application/zip" --upload-file ${filePath} "$(jq -r ".upload_url" <<< "$RESPONSE")"\n`,
            'SERVING_URL=$(jq -r ".serving_url" <<< $RESPONSE)\n',
            'echo $SERVING_URL'
        ];

        //write the array of commands to the script file
        this.#writeToFile(scriptPath, commands);

        //allocate executable permissions to the file
        this.#executeCommand('chmod +x upload.sh');

        //run the upload script
        let scriptOutput = this.#executeCommand("./upload.sh");

        //remove the '\n' from the end of the string
        scriptOutput = scriptOutput.replace(/^\s+|\s+$/g, '');

        //push the data to an array 
        servingData.push(scriptOutput);
        servingData.push(instancePrompt);
        servingData.push(classPrompt);

        return servingData;
            
    } //end uploadData()

    /**
     * Make a training call to the replicate dreambooth API
     * @param {number} maxTrainSteps the number of training iterations
     * @param {...string[]} servingData data to create a training call with
     */
    trainModel(maxTrainSteps = 2000, ...servingData) {

        //loop over all the data sets provided and train the model with them
        for(const data of servingData) {

            //make sure that the data set provided is valid. If it isn't, skip it
            if(!(servingData.length === 3)) continue;

            //store the data inside the array in an appropriate variable
            const servingUrl = data[0];
            const instancePrompt = data[1];
            const classPrompt = data[2];

            //create an object to store the input object located in the body of the API call
            const bodyInput = {
                "instance_prompt": instancePrompt,
                "class_prompt": classPrompt,
                "instance_data": servingUrl,
                "max_train_steps": maxTrainSteps
            };

            //create a training call to train the API using one of the provided data sets
            fetch('https://dreambooth-api-experimental.replicate.com/v1/trainings', {

                method: 'POST',

                headers: {
                    'Authorization': 'Token ' + this.#apiKey,
                    'Content-Type': 'application/json'
                },

                body: {
                    "input": bodyInput,
                    "model": `${this.username}/${this.model}`,
                    "trainer_version": `${this.#trainerVersion}`
                }

            });

        } //end for-loop
        
    } //end trainModel()

    /**
     * Executes a bash command 
     * @param {string} command what to execute
     * @returns {string} output of the command if there is any
     */
    #executeCommand(command) {

        //create an instance of the terminal and run the command provided
        const runable = spawnSync(command, {
            shell: true
        });

        //read the terminal Buffer output and convert it to a string
        if(runable.stdout) return runable.stdout.toString();

    } //end executeCommand()

    /**
     * Writes a message to a file
     * @param {string} path where the file is located
     * @param {string[]} messages what to write to the file
     */
    #writeToFile(path, messages) {

        //create a write stream for the file
        const stream = fs.createWriteStream(path);

        //wait for the stream to be open to start writing
        stream.once('open', () => {

            //loop through array and write everything in it to the file
            for(const message of messages) 
                stream.write(message);

        });

    } //end writeToFile()

} //end trainingModel

export default aiModel;
