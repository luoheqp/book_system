export interface IBookUploadInfo {
  name: string;
  author: string;
  press: string;
  pubdate: string;
  desc: string;
  catalog: ICatalog[];
  tag?: string[];
  cover: Blob;
}

export interface ICatalog {
  label: string;
  href: string;
  subitems?: ICatalog[];
}
