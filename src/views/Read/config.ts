import { IThemeItem } from "@/types/read";

// 文字大小列表
export const fontSizeList: object[] = [
  { fontSize: 24 },
  { fontSize: 22 },
  { fontSize: 20 },
  { fontSize: 18 },
  { fontSize: 16 },
  { fontSize: 14 },
  { fontSize: 12 }
];

// 文字字体列表
export const fontFamily: object[] = [
  { font: "Default" },
  { font: "Cabin" },
  { font: "Days One" },
  { font: "Montserrat" },
  { font: "Tangerine" }
];

// 阅读样式
export const themeList: any[] = [
  {
    name: "default",
    style: {
      body: {
        color: "#000",
        background: "#fff"
      },
      img: {
        width: "100%"
      },
      ".epubjs-hl": {
        fill: "red",
        "fill-opacity": "0.3",
        "mix-blend-mode": "multiply"
      }
    }
  },
  {
    name: "green",
    style: {
      body: {
        color: "#000",
        background: "#ceeaba"
      },
      img: {
        width: "100%"
      },
      ".epubjs-hl": {
        fill: "red",
        "fill-opacity": "0.3",
        "mix-blend-mode": "multiply"
      }
    }
  },
  {
    name: "night",
    style: {
      body: {
        color: "#fff",
        background: "#000"
      },
      img: {
        width: "100%"
      },
      ".epubjs-hl": {
        fill: "red",
        "fill-opacity": "0.3",
        "mix-blend-mode": "multiply"
      }
    }
  }
];
