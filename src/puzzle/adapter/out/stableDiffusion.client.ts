import { Injectable } from '@nestjs/common';
import axios from 'axios';
import https from "https";
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
const Replicate = require("replicate");
@Injectable()
export class StableDiffusionClient {
    // instance = axios.create({
    //     baseURL: process.env.INTERNAL_REQUEST_BASE_URL,
    //     timeout: 120000,
    //     // httpsAgent: new https.Agent({
    //     //     rejectUnauthorized: false,
    //     // }),
    // });



    async getPuzzleImage() {
        const APIKEY  = '0e970ee481286709f9e3f84e8085e0892520bcd0';
        const replicate = new Replicate({
            auth: APIKEY,
        });
        let prediction = await replicate.predictions.create({
            version: "27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
            input: {
                prompt: "draw of a whale by realistic",
            },
            webhook: "http://localhost:3000/puzzle/completion",
        });
        const response = await replicate.predictions.get(prediction.id);
        console.log(response)

        //time sleep 10s
        await new Promise(resolve => setTimeout(resolve, 10000));

        const image = await axios.get(response.urls.get, {
          headers: {
            'Authorization': 'TOKEN ' + APIKEY,
          }
        })
        return image.data.output[0]
    }

    async makeMaskImage(maskData) {
        const { width, height, mask } = maskData;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'white';
        for (const circle of mask) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // const imageStream = canvas.createPNGStream();
        // res.setHeader('Content-Type', 'image/png');
        // imageStream.pipe(res);

        const imageBuffer = canvas.toBuffer('image/png');
        writeFileSync('mask_image.png', imageBuffer);
    }

}

