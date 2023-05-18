import {Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors} from "@nestjs/common";
import { PuzzleService } from "../../application/puzzle.service";
import { CreatePuzzleDto } from "./dto/create-puzzle.dto";
import { FileMetadata } from "./dto/fileMetadata.dto";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Response } from 'express';

@Controller('puzzle')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService,
              ) {}
  private clients: Response[] = [];

  @Post()
  async create(@Body() createPuzzleDto: CreatePuzzleDto) {
    return await this.puzzleService.create(createPuzzleDto);
  }


  @Get('event')
  sendEvents( @Res() res: Response) {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
    });
    res.flushHeaders();

    // 클라이언트를 배열에 추가합니다.
    this.clients.push(res);

    // 클라이언트 연결이 끊어지면 배열에서 제거합니다.
    res.on('close', () => {
      this.clients = this.clients.filter(client => client !== res);
    });

  }

  sendToAllClients(data: string) {
    for (const client of this.clients) {
      client.write(`data: ${data}\n\n`);
    }
  }

  @Post('completion')
  async completion(@Req() req) {
    //{
    //   id: 'ioehiri3urcthf5b4enhz2rvne',
    //   version: 'c28b92a7ecd66eee4aefcd8a94eb9e7f6c3805d5f06038165407fb5cb355ba67',
    //   input: {
    //     guidance_scale: 7.5,
    //     image: 'http://res.cloudinary.com/dpyp2ng96/image/upload/v1683789169/pldgbcqmge3o0q71gfry.png',
    //     mask: 'http://res.cloudinary.com/dpyp2ng96/image/upload/v1683789170/hsnt4ndsedsdzdf09z7p.png',
    //     num_inference_steps: 25,
    //     num_outputs: 1,
    //     prompt: 'Face of a yellow cat, high resolution, sitting on a park bench'
    //   },
    //   logs: 'Using seed: 32120\n' +
    //     '  0%|          | 0/26 [00:00<?, ?it/s]\n' +
    //     '  8%|▊         | 2/26 [00:00<00:01, 15.19it/s]\n' +
    //     ' 15%|█▌        | 4/26 [00:00<00:01, 14.55it/s]\n' +
    //     ' 23%|██▎       | 6/26 [00:00<00:01, 14.38it/s]\n' +
    //     ' 31%|███       | 8/26 [00:00<00:01, 14.14it/s]\n' +
    //     ' 38%|███▊      | 10/26 [00:00<00:01, 13.68it/s]\n' +
    //     ' 46%|████▌     | 12/26 [00:00<00:01, 13.78it/s]\n' +
    //     ' 54%|█████▍    | 14/26 [00:00<00:00, 13.90it/s]\n' +
    //     ' 62%|██████▏   | 16/26 [00:01<00:00, 13.73it/s]\n' +
    //     ' 69%|██████▉   | 18/26 [00:01<00:00, 13.81it/s]\n' +
    //     ' 77%|███████▋  | 20/26 [00:01<00:00, 13.84it/s]\n' +
    //     ' 85%|████████▍ | 22/26 [00:01<00:00, 13.92it/s]\n' +
    //     ' 92%|█████████▏| 24/26 [00:01<00:00, 13.72it/s]\n' +
    //     '100%|██████████| 26/26 [00:01<00:00, 14.26it/s]\n' +
    //     '100%|██████████| 26/26 [00:01<00:00, 14.02it/s]\n',
    //   output: [
    //     'https://replicate.delivery/pbxt/OETst8heSJ20RaFge7Iso4x39RWATpbe2nPRvgpuXWS27I1hA/out-0.png'
    //   ],
    //   error: null,
    //   status: 'succeeded',
    //   created_at: '2023-05-11T07:12:51.101756Z',
    //   started_at: '2023-05-11T07:12:56.568931Z',
    //   completed_at: '2023-05-11T07:12:59.585314Z',
    //   webhook: 'https://port-0-doodledetective-1maxx2algqdy9pu.sel3.cloudtype.app/puzzle/completion',
    //   webhook_events_filter: [ 'completed' ],
    //   metrics: { predict_time: 3.016383 },
    //   urls: {
    //     cancel: 'https://api.replicate.com/v1/predictions/ioehiri3urcthf5b4enhz2rvne/cancel',
    //     get: 'https://api.replicate.com/v1/predictions/ioehiri3urcthf5b4enhz2rvne'
    //   }
    // }

    // const outputImgUrl = req.body['output'][0];

    this.sendToAllClients(req.body['output'][0]);

    // return await this.puzzleService.completion(outputImgUrl);
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

      return response.status(201).send(await this.puzzleService.uploadFile(fileMetadata));
    } catch (e) {
      return response.status(400).send({ status: 'upload failed', message: e.message });
    }
  }


}
