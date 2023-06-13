
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

/**
 * Generic training class to train the AI
 * @author Alexandru Stan
 * @since June 2023
 */
class aiModel {

    //declare global variables for the class
    #apiKey;
    #model;
    #model_version;
    #username;
    #replicate;

    /**
     * Constructor for the AI training model
     * @param {string} apiKey API key for the dreambooth/replicate API
     * @param {string} model name of stable-diffusion model that is going to be used
     * @param {string} username username for the 
     * 
     */
    constructor(apiKey, model, username, model_version) {

        //set the local attributes to the ones the user provided
        this.#apiKey = apiKey;
        this.#model = model;
        this.#username = username;
        this.#model_version = model_version;

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
     * Uploads files using the Replicate API
     * @param {...string} filePaths paths to the zip files to be uploaded
     * @returns {string[]} serving URLs for the API 
     */
    uploadData = (...filePaths) => {

        //create a variable that points to the sh script
        const scriptPath = 'upload.sh'

        //declare an empty array to store the serving urls for the uploaded files
        const servingUrls = [];

        //ensure that there are file paths provided
        if(!filePaths.length) throw new Error("Please Provide [A] Valid File Path(s)");

            //loop through the filePaths provided and upload them
            for(const filePath of filePaths) {

                //if the file is not a zip file, skip it
                if(path.extname(filePath) != ".zip") continue;

                //store the commands needed to upload the data
                const commands = [
                    'RESPONSE=$(curl -X POST -H "Authorization: Token ' + this.#apiKey + '" https://dreambooth-api-experimental.replicate.com/v1/upload/data.zip)\n',
                    'curl -X PUT -H "Content-Type: application/zip" --upload-file ' + filePath + ' "$(jq -r ".upload_url" <<< "$RESPONSE")"\n',
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

                //add the serving url to the array of serving URLS
                servingUrls.push(scriptOutput);

            } //end for-loop 'i'

            return servingUrls;
            
    } //end uploadData()

    /**
     * Executes a bash command 
     * @param {string} command what to execute
     * @returns {string} output of the command if there is any
     */
    #executeCommand(command) {

        //create an instance of the terminal and run the command provided
        const runable = spawnSync(command);

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
