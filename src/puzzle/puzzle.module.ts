import { Module } from '@nestjs/common';
import { PuzzleService } from './application/puzzle.service';
import { PuzzleController } from './adapter/in/puzzle.controller';
import {StableDiffusionClient} from "./adapter/out/stableDiffusion.client";

@Module({
  controllers: [PuzzleController],
  providers: [PuzzleService, StableDiffusionClient]
})
export class PuzzleModule {}
