import { Module } from '@nestjs/common';
import { PuzzleService } from './application/puzzle.service';
import { PuzzleController } from './adapter/in/puzzle.controller';
import {StableDiffusionClient} from "./adapter/out/client/stableDiffusion.client";
import { ImageBucketClient } from "./adapter/out/client/imageBucket.client";
import {ImgDownloadClient} from "./adapter/out/client/imgDownload.client";

@Module({
  controllers: [PuzzleController],
  providers: [PuzzleService, StableDiffusionClient,ImageBucketClient, ImgDownloadClient]
})
export class PuzzleModule {}
