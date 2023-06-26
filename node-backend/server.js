/**
 * Backend server for the website to generate the images
 * without interfering with react
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import Model from './Model.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//create a new express app and set the port
const app = express();
const port = 8000;

//allow the app to use cors and the body-parser
app.use(cors());
app.use(bodyParser.json());

app.get('/generate', (req, res) => {

    //store all of the information needed for the request
    const data = req.body;
    console.log(data);
    res.send(data);

})

app.listen(port, () => {
    console.log("Server running successfully on Port 8000");
})