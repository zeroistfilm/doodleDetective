import * as moment from 'moment/moment';

export class FileMetadata {
  owner: string;
  fieldname?: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;

  constructor(data) {
    this.fieldname = data.fieldname;
    this.originalname = moment().utc().format('YYYYMMDDHHmmss') + 'Z_' + data.originalname;
    this.encoding = data.encoding;
    this.mimetype = data.mimetype;
    this.destination = data.destination;
    this.filename = data.filename;
    this.path = data.path;
    this.size = data.size;
  }

  setOwner(owner: string) {
    this.owner = owner;
  }
}
