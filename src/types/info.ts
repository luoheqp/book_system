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
