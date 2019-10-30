export interface ILineListItem {
  id: number;
  name: string;
  bookGroup: IListItem[];
  // isShowDetail: boolean;
  // detail: IListItem;
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

export interface ILineListSelected {
  activeSwiper: number;
  activeSlide: number;
}
