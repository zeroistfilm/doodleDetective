import { Test, TestingModule } from '@nestjs/testing';
import { PuzzleController } from './puzzle.controller';
import { PuzzleService } from '../../application/puzzle.service';

describe('PuzzleController', () => {
  let controller: PuzzleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuzzleController],
      providers: [PuzzleService],
    }).compile();

    controller = module.get<PuzzleController>(PuzzleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
