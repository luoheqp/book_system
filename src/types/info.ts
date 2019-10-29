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
