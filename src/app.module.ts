import { Module } from '@nestjs/common';
import {PuzzleModule} from "./puzzle/puzzle.module";


@Module({
  imports: [PuzzleModule],
})
export class AppModule {}