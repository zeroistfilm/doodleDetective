import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import * as fs from "fs";

export class circle {
    x: number;
    y: number;
    radius: number;
}

export class Mask {
    width: number;
    height: number;
    mask: circle[];
}

export class Puzzle {
    id: number;
    name: string;
    mask: Mask;
    imgBase64: string;
    originalFileName: string;
    maskFileName: string;
    diffFileName: string;

    originalImageUrl: string;
    maskImageUrl: string;
    diffImageUrl: string;
    setOriginalImageUrl(originalFileName: string) {
        this.originalImageUrl = originalFileName;
    }
    setMaskImageUrl(maskFileName: string) {
        this.maskImageUrl = maskFileName;
    }
    setDiffImageUrl(diffImageUrl: string) {
        this.diffImageUrl = diffImageUrl;
    }

    setDiffImgFileName(diffFileName: string) {
        this.diffFileName = diffFileName;
    }

    getRandomFileName() {
        return  Math.random().toString(36).substring(7);
    }

    async makeOriginalImgFromBase64() {
        const buffer = Buffer.from(this.imgBase64, 'base64');
        const randomFileName = this.getRandomFileName();
        fs.writeFile(`./${randomFileName}.jpg`, buffer, (err)=>{console.log(err)});
        this.originalFileName= `${randomFileName}.jpg`
    }

    async makeMaskImage() {
        const { width, height, mask } = this.mask;
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

        const imageBuffer = canvas.toBuffer('image/png');
        const randomFileName = this.getRandomFileName();
        writeFileSync(`${randomFileName}.png`, imageBuffer);
        this.maskFileName = `${randomFileName}.png`;
    }

    removeFile() {
        console.log(this.originalFileName)
        console.log(this.maskFileName)
        // fs.unlinkSync(this.originalFileName);
        // fs.unlinkSync(this.maskFileName);
        // fs.unlinkSync(this.diffFileName);
    }
}