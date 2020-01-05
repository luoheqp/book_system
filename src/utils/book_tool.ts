import { ICatalog } from "../types/book";

export function dealBookChapter(chapter: ICatalog[]) {
  let res: ICatalog[] = [];
  let len: number = chapter.length;

  for (let i = 0; i < len; i++) {
    let { href, label, subitems } = chapter[i];

    label = label.replace("/\n/g", ""); // 去除换行符
    label = label.replace(/^\s*|\s*$/g, ""); // 去除字符串两端空格

    if (subitems) {
      subitems = dealBookChapter(subitems);
      res.push({ href, label, subitems });
    } else {
      res.push({ href, label });
    }
  }

  return res;
}
