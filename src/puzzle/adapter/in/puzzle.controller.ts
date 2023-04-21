import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { PuzzleService } from '../../application/puzzle.service';
import { CreatePuzzleDto } from './dto/create-puzzle.dto';
import {FileMetadata} from "./dto/fileMetadata.dto";
import { ApiBody, ApiConsumes, ApiOperation} from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import axios from "axios";

@Controller('puzzle')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Post()
  async create(@Body() createPuzzleDto: CreatePuzzleDto) {
    return await this.puzzleService.create(createPuzzleDto);
  }

  @Post('completion')
  async completion(@Req() req) {
    const APIKEY  = '0e970ee481286709f9e3f84e8085e0892520bcd0';
    console.log(req.body);
  }
  @ApiOperation({ summary: '프로젝트의 썸네일 등록' })
  // @ApiBearerAuth('accessToken')
  // @UseGuards(AccessTokenGuard)
  @Post('/thumbnail/upload/:projectId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const dateTime = new Date().getTime();
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${dateTime}_${file.originalname}`);
          },
        }),
      }),
  )
  async uploadFile(
      @Req() req,
      @UploadedFile() file: FileMetadata,
      @Param('projectId') projectId: string,
      @Res() response,
  ) {
    try {
      const fileMetadata: FileMetadata = new FileMetadata(file);
      fileMetadata.setOwner(req.user.sub);
      return response.status(201).send(await this.puzzleService.uploadFile());
    } catch (e) {
      return response.status(400).send({ status: 'upload failed', message: e.message });
    }
  }


}
