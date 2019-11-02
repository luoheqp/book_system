import { IThemeItem } from "@/types/read";

// 文字大小列表
export const fontSizeList: Object[] = [
  { fontSize: 24 },
  { fontSize: 22 },
  { fontSize: 20 },
  { fontSize: 18 },
  { fontSize: 16 },
  { fontSize: 14 },
  { fontSize: 12 }
];

// 阅读样式
export const themeList: IThemeItem[] = [
  {
    name: "default",
    style: { body: { color: "#000", background: "#fff" } }
  },
  {
    name: "green",
    style: { body: { color: "#000", background: "#ceeaba" } }
  },
  {
    name: "night",
    style: { body: { color: "#fff", background: "#000" } }
  }
];
