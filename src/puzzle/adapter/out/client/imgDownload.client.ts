import {Injectable} from "@nestjs/common";
import axios from 'axios';
import * as fs from "fs";

@Injectable()
export class ImgDownloadClient {

    getRandomFileName() {
        return './' + Math.random().toString(36).substring(7) + '.png';
    }

    async downloadImageAndSave(url: string) {
        const response = await axios.get(url, {responseType: 'arraybuffer'});
        const randomFileName = this.getRandomFileName();
        fs.writeFileSync(randomFileName, response.data);
        return randomFileName;
    }

}