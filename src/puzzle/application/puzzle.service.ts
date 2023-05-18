import {Inject, Injectable} from '@nestjs/common';
import {CreatePuzzleDto} from '../adapter/in/dto/create-puzzle.dto';
import {UpdatePuzzleDto} from '../adapter/in/dto/update-puzzle.dto';
import {StableDiffusionClient} from "../adapter/out/client/stableDiffusion.client";
import {Mask, Puzzle} from "../domain/puzzle.domain";
import {ImageBucketClient} from "../adapter/out/client/imageBucket.client";
import {ImgDownloadClient} from "../adapter/out/client/imgDownload.client";
import {from, of} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';


@Injectable()
export class PuzzleService {
  constructor(
      @Inject(StableDiffusionClient)
      private readonly stableDiffusionClient: StableDiffusionClient,
      @Inject(ImageBucketClient)
      private readonly imageBucketClient: ImageBucketClient,
      @Inject(ImgDownloadClient)
      private readonly imgDownloadClient: ImgDownloadClient,
  ) {
  }

  async create(createPuzzleDto: CreatePuzzleDto) {
      const puzzle = new Puzzle();
      puzzle.name = createPuzzleDto.name;
      puzzle.mask = createPuzzleDto.mask;
      puzzle.imgBase64 = createPuzzleDto.imgBase64;
      await puzzle.makeOriginalImgFromBase64();
      await puzzle.makeMaskImage();
      puzzle.setOriginalImageUrl(await this.imageBucketClient.uploadImage(puzzle.originalFileName));
      puzzle.setMaskImageUrl(await this.imageBucketClient.uploadImage(puzzle.maskFileName));


      const requestedPuzzle = await this.stableDiffusionClient.getPuzzleImage(puzzle.originalImageUrl, puzzle.maskImageUrl);



      // puzzle.setDiffImgFileName(downloadLocation);
      // puzzle.setDiffImageUrl(await this.imageBucketClient.uploadImage(downloadLocation));
      puzzle.removeFile();

      return {
          id : requestedPuzzle.id,
          originalUrl: puzzle.originalImageUrl,
          maskUrl: puzzle.maskImageUrl,
          // resultUrl: puzzle.diffImageUrl,
      };
  }


  async convertToCloudinary(url: string) {
      const downloadLocation = await this.imgDownloadClient.downloadImageAndSave(url);
      const cloudinaryUrl = await this.imageBucketClient.uploadImage(downloadLocation);
      return cloudinaryUrl;
  }

  async completion(imgUrl: string) {
  }

  uploadFile(fileMetadata) {

  }

  update(id: number, updatePuzzleDto: UpdatePuzzleDto) {
    return `This action updates a #${id} puzzle`;
  }
  test(file) {

  }

}
