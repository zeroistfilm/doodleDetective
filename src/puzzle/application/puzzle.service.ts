import {Inject, Injectable} from '@nestjs/common';
import { CreatePuzzleDto } from '../adapter/in/dto/create-puzzle.dto';
import { UpdatePuzzleDto } from '../adapter/in/dto/update-puzzle.dto';
import {StableDiffusionClient} from "../adapter/out/client/stableDiffusion.client";
import {Mask, Puzzle} from "../domain/puzzle.domain";
import { ImageBucketClient } from "../adapter/out/client/imageBucket.client";

@Injectable()
export class PuzzleService {
  constructor(
    @Inject(StableDiffusionClient)
    private readonly stableDiffusionClient: StableDiffusionClient,
    @Inject(ImageBucketClient)
    private readonly imageBucketClient: ImageBucketClient,
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
    puzzle.removeFile();

    const resultUrl = await this.stableDiffusionClient.getPuzzleImage(puzzle.originalImageUrl, puzzle.maskImageUrl);

    return {
      originalUrl: puzzle.originalImageUrl,
      maskUrl: puzzle.maskImageUrl,
      resultUrl: resultUrl
    };
  }

  uploadFile(fileMetadata) {

  }

  update(id: number, updatePuzzleDto: UpdatePuzzleDto) {
    return `This action updates a #${id} puzzle`;
  }
  test(file) {

  }

}
