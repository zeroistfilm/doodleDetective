import { Injectable } from '@nestjs/common';
import axios from 'axios';
import https from "https";
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

@Injectable()
export class StableDiffusionClient {
    // instance = axios.create({
    //     baseURL: process.env.INTERNAL_REQUEST_BASE_URL,
    //     timeout: 120000,
    //     httpsAgent: new https.Agent({
    //         rejectUnauthorized: false,
    //     }),
    // });


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

