export interface ICreateArticleInfo {
  title: string;
  author: string;
  desc?: string;
  tag: string[];
  cover?: File;
}

export interface IArticleInfo {
  title: string;
  author: string;
  desc: string;
  tag: string[];
  like: number;
  collect: number;
  cover: string;
  book: string;
  bookId: string;
  content: string;
  time: string;
}
