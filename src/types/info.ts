// 书籍相关
export interface ILineListItem {
  id: number;
  name: string;
  bookGroup: IListItem[];
}

export interface ILineListSelected {
  activeSwiper: number;
  activeSlide: number;
}

export interface IListItem {
  id: number;
  picPath: string;
  name: string;
  author: string;
  date: string;
  press: string;
  desc: string;
  tag?: string[];
}

// 书评相关
export interface IArticleItem {
  id: number;
  book: string;
  author: string;
  time: string;
  tag: string[];
  title: string;
  like: number;
}
