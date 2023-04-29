import { Module } from '@nestjs/common';
import { PuzzleService } from './application/puzzle.service';
import { PuzzleController } from './adapter/in/puzzle.controller';
import {StableDiffusionClient} from "./adapter/out/client/stableDiffusion.client";
import { ImageBucketClient } from "./adapter/out/client/imageBucket.client";

@Module({
  controllers: [PuzzleController],
  providers: [PuzzleService, StableDiffusionClient,ImageBucketClient]
})
export class PuzzleModule {}
