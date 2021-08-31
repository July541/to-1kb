import { StorageAlias } from "../types/StorageAlias"
import { alias } from "./zh-CN"

export enum Lang {
  EN
, zhCN
}

export const storageInfo = (lang: Lang): StorageAlias => {
  switch(lang) {
    case Lang.EN:
      return alias
    case Lang.zhCN:
      return alias
  }
}
