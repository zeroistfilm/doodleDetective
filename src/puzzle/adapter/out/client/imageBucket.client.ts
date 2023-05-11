import {v2 as cloudinary } from 'cloudinary';
import { Injectable } from "@nestjs/common";

@Injectable()
export class ImageBucketClient{

  private cloud_name: string;
  private api_key: string;
  private api_secret: string;

  constructor() {
    // this.cldInstance = new Cloudinary({cloud: {cloudName: 'dpyp2ng96'}});
    this.cloud_name="dpyp2ng96"
    this.api_key= "841314469258899"
    this.api_secret= "h1Zq6Jfnlq-BXp9wJqDljBpInTc"
    cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    })
  }


  public async uploadImage(fileName: string)  {
    const res = await cloudinary.uploader.upload(fileName, {resource_type : 'image'} );
    return res.url
  }

  public async resizeImage(image) {
    // const myImage = this.cldInstance
    //   .image('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg')
    //   .setDeliveryType('fetch')
    //   .resize(Resize.fill().width(100).height(150))
    //
    // console.log(myImage.toURL());
    // return myImage.toURL();
  }

}