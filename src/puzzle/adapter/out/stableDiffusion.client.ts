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



    async getPuzzleImage() {
        const APIKEY = '0e970ee481286709f9e3f84e8085e0892520bcd0';

        const res = await axios.post('https://api.replicate.com/v1/predictions', {
                "version": "c28b92a7ecd66eee4aefcd8a94eb9e7f6c3805d5f06038165407fb5cb355ba67",
                input: {
                    image: "https://replicate.delivery/pbxt/HtGQBfA5TrqFYZBf0UL18NTqHrzt8UiSIsAkUuMHtjvFDO6p/overture-creations-5sI6fQgYIuo.png",
                    mask: "https://replicate.delivery/pbxt/HtGQBqO9MtVbPm0G0K43nsvvjBB0E0PaWOhuNRrRBBT4ttbf/mask.png",
                    //"prompt": "Face of a yellow cat, high resolution, sitting on a park bench",
                    "num_outputs": 1,
                    "guidance_scale": 7.5,
                    "num_inference_steps": 25,
                }
            }
            , {
                headers: {
                    'Authorization': `TOKEN ${APIKEY}`,
                }
            })
        console.log(res)
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log(`https://api.replicate.com/v1/predictions/${res.data.uuid}`)
        const res2 = await axios.get(`https://api.replicate.com/v1/predictions/${res.data.id}`, {
            headers: {
                'authorization': `TOKEN ${APIKEY}`,
            }
        });
        console.log(res2.data)
        // const replicate = new Replicate({
        //     auth: APIKEY,
        // });
        // let prediction = await replicate.predictions.create({
        //     version: "27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
        //     input: {
        //         prompt: "I couldn't find information on the specific image you mentioned, but I'll use my imagination to describe it for you. The floating cheesecake island seems to have come straight from a fantastical world. This small island, composed of a giant cheesecake, hovers among the blue sky and white clouds.\n" +
        //             "\n" +
        //             "The surface of the island is made up of a smooth cream cheese and a golden brown butter base, while around the island, various fruits form a garden-like border along its edge. Fruits such as strawberries, blueberries, and raspberries adorn small trees and vines that line the island's perimeter, blending beautifully with the delicious cheesecake to create a dreamy landscape.\n" +
        //             "\n" +
        //             "In the center of the island, a small waterfall cascades, with the stream consisting of melted cream cheese and fruit juices. Curious animals that visit this delicious island drink the melted fruit juices, fly around, or happily play on the island's surface.\n" +
        //             "\n" +
        //             "What's amazing about this island is that the harmony of fruits and cheesecake naturally blends, blurring the boundaries between the real world and the fairy-tale world. This place is a floating cheesecake island filled with enchanting beauty and delicious scents, offering a view that one would expect to find only in a fairy tale.",
        //     },
        //     webhook: "http://localhost:3000/puzzle/completion",
        // });
        // console.log(prediction)
        //
        //
        // const response = await replicate.predictions.get(prediction.id);
        // console.log(response)
        //zz4ibbonubfz7carwiefibzgga
        // //time sleep 10s
        // await new Promise(resolve => setTimeout(resolve, 10000));
        //
        // const image = await axios.get(response.urls.get, {
        //   headers: {
        //     'Authorization': 'TOKEN ' + APIKEY,
        //   }
        // })
        // return image.data.output[0]
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

