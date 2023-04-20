import {Mask} from "../../../domain/puzzle.domain";
import {ApiProperty} from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class CreatePuzzleDto {
    @ApiProperty({ example: 'title' })
    @IsString()
    name: string;

    @ApiProperty({ example: {
            width: 200,
            height: 200,
            mask: [
                {x: 10, y: 10, radius: 10},
                {x: 20, y: 20, radius: 10},
                {x: 30, y: 30, radius: 10},
                {x: 40, y: 40, radius: 10},
                {x: 50, y: 50, radius: 10},
                {x: 60, y: 60, radius: 10},
                {x: 70, y: 70, radius: 10},
                {x: 80, y: 80, radius: 10},
                {x: 90, y: 90, radius: 10},
                {x: 100, y: 100, radius: 10},


                ]
        } })
    mask: Mask;
    // imageURL: string;
}
