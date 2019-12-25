export interface IBookUploadInfo {
  name: string;
  author: string;
  press: string;
  pubdate: string;
  desc: string;
  catalog: string[];
  tag?: string[];
  cover: Blob;
}
