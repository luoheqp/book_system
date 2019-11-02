export interface IThemeItem {
  name: string;
  style: IThemeStyle;
}

export interface IThemeStyle {
  body: object;
}

export interface IEbookSet {
  fontSize: number;
  theme: string;
  isFull: boolean;
}
