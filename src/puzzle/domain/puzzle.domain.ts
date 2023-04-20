export class circle {
    x: number;
    y: number;
    radius: number;
}

export class Mask {
    width: number;
    height: number;
    mask: circle[];
}

export class Puzzle {
    id: number;
    name: string;
    mask: Mask;
    imageURL: string;
}