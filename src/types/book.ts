export interface IBook {
  name: string;
  author: string;
  press: string;
  pubdate: string;
  desc: string;
  catalog: string[];
  tag: string[];
  like: number;
  collect: number;
  cover: string;
  path: string;
  md5: string;
  isCollect?: boolean;
  isLike?: boolean;
}

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

export interface IReaderSet {
  fontSize: number;
  theme: string;
}

export interface IReadBookInfo {
  bookId: string;
  userId: string;
  navigation: any;
  isCollect: boolean;
  isLike: boolean;
}
