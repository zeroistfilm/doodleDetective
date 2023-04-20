import {Inject, Injectable} from '@nestjs/common';
import { CreatePuzzleDto } from '../adapter/in/dto/create-puzzle.dto';
import { UpdatePuzzleDto } from '../adapter/in/dto/update-puzzle.dto';
import {StableDiffusionClient} from "../adapter/out/stableDiffusion.client";
import {Mask, Puzzle} from "../domain/puzzle.domain";

@Injectable()
export class PuzzleService {
  constructor(
      @Inject(StableDiffusionClient)
    private readonly stableDiffusionClient: StableDiffusionClient,
  ) {
  }
  create(createPuzzleDto: CreatePuzzleDto) {
    const puzzle = new Puzzle();
    puzzle.name = createPuzzleDto.name;
    puzzle.mask = createPuzzleDto.mask;

    return this.stableDiffusionClient.makeMaskImage(puzzle.mask);
  }

  uploadFile() {
    return 'This action uploads a file';
  }

  update(id: number, updatePuzzleDto: UpdatePuzzleDto) {
    return `This action updates a #${id} puzzle`;
  }


}
