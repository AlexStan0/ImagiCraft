import Replicate from 'replicate';
import * as dotenv from 'dotenv';
dotenv.config();

const replicate = new Replicate({
    aut:process.env.REPLICATE_API_TOKEN
});