
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
     */
    uploadData = (...filePaths) => {

        //create a path variable for the SH script to upload the data
        const scriptPath = "upload.sh"

        //ensure that there are file paths provided
        if(!filePaths.length) throw new Error("Please Provide [A] Valid File Path(s)");

            for(let i = 0; i < filePaths.length; ++i) {

                const path = filePaths[i];

                const stream = fs.createWriteStream("./upload.sh");

                const string = 'curl -X PUT -H "Content-Type: application/zip" --upload-file ' + path + ' "$(jq -r ".upload_url" <<< "$RESPONSE")"\n';

                stream.once('open', () => {
                    stream.write('RESPONSE=$(curl -X POST -H "Authorization: Token $REPLICATE_API_TOKEN" https://dreambooth-api-experimental.replicate.com/v1/upload/data.zip)\n');
                    stream.write(string);
                    stream.write('SERVING_URL=$(jq -r ".serving_url" <<< $RESPONSE)\n');
                })

            } //end for-loop 'i'
            
    } //end uploadData()

    /**
     * Make sure that the data provided is in a valid format
     * @param {string} filePath path to the data set file
     */
    #checkExtension(filePath) {

    } //end checkExtension()

} //end trainingModel

export default aiModel;
