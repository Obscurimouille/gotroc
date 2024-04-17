import path from 'path';

export class FileRef {
  public filename: string;
  public extension: string;
  public absolutePath: string;

  constructor(absolutePath: string) {
    this.absolutePath = path.normalize(absolutePath);
    this.filename = path.basename(this.absolutePath);
    this.extension = path.extname(this.filename).slice(1);
  }
}