import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

@Injectable()
export class StableDiffusionClient {
    // instance = axios.create({
    //     baseURL: process.env.INTERNAL_REQUEST_BASE_URL,
    //     timeout: 120000,
    //     // httpsAgent: new https.Agent({
    //     //     rejectUnauthorized: false,
    //     // }),
    // });



    async getPuzzleImage(originalUrl, maskUrl) {
        const APIKEY = '0e970ee481286709f9e3f84e8085e0892520bcd0';

        const res = await axios.post('https://api.replicate.com/v1/predictions', {
                "version": "c28b92a7ecd66eee4aefcd8a94eb9e7f6c3805d5f06038165407fb5cb355ba67",
                input: {
                    image: originalUrl,
                    mask: maskUrl,
                    "prompt": "Face of a yellow cat, high resolution, sitting on a park bench",
                    "num_outputs": 1,
                    "guidance_scale": 7.5,
                    "num_inference_steps": 25,
                },
                webhook: "https://port-0-doodledetective-1maxx2algqdy9pu.sel3.cloudtype.app/puzzle/completion",
                webhook_events_filter: ["completed"]
            }
            , {
                headers: {
                    'Authorization': `TOKEN ${APIKEY}`,
                }
            })

        await new Promise(resolve => setTimeout(resolve, 7000));
        const res2 = await axios.get(`https://api.replicate.com/v1/predictions/${res.data.id}`, {
            headers: {
                'authorization': `TOKEN ${APIKEY}`,
            }
        });

        return res2.data.output[0];
    }



}

