
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
     * @param {string} username username for the 
     * 
     */
    constructor(apiKey, model, username, trainerVersion) {

        //set the local attributes to the ones the user provided
        this.#apiKey = apiKey;
        this.#model = model;
        this.#username = username;
        this.#trainerVersion = trainerVersion

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
     * Creates a connection to the replicate API
     */
    #createReplicate() {

        //declare a new connection to the dreambooth API via replicate
        this.#replicate = new Replicate({
            auth: this.#apiKey
        });

    } //end createReplicate()

    /**
     * Generates the proper training options to pass to the 
     * @param {string} filePath path to the training data
     * @param {string} instancePrompt descriptor of the data set with a rare token (i.e: cjw)
     * @param {string} classPrompt descriptor of the data set
     * @param  {...number} maxTrainSteps max number of training steps
     * @throws Error when file path or file extension are invalid
     * @returns object with training options
     */
    #createTrainingOptions(filePath, instancePrompt, classPrompt, ...maxTrainSteps) {

        //create a JS object to store the training options
        let trainingOptions = {
            "instance_prompt": instancePrompt,
            "class_prompt": classPrompt,
            "instance_data": "",
            "max_train_steps": 500
        }

        //check that there is only one parameter in the optional max_train_steps var arg
        if(maxTrainSteps.length == 1) trainingOptions['max_train_steps'] = maxTrainSteps[0]

        //get the file extension of the file
        const ext = filePath
            .split('.')
            .filter(Boolean)
            .slice(1)
            .join('.')

        //throw exception if the file is invalid
        if(ext != "zip") throw Error("Invalid File Path/File Extension");

        //create a fileURL for the data set 
        let fUrl = fileUrl(filePath);

        //append the fileURL to the training options
        trainingOptions["instance_data"] = fUrl;

        return trainingOptions;

    } //end getData()

    trainModel = (filePath, instancePrompt, classPrompt, ...maxTrainSteps) => {

        //create the training options for the training call
        this.#createTrainingOptions(filePath, instancePrompt, classPrompt, ...maxTrainSteps);

        

    } //end trainModel()

} //end trainingModel

export default aiModel;
