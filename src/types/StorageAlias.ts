export type StorageAlias = {
  "1": string[]
, "8": string[]
, "16": string[]
, "32": string[]
, "1024": string[]
}

export const StorageSeps = [ 1, 8, 16, 32, 1024 ]

export const numberToStorageKey: Record<number, keyof StorageAlias> = {
    1: "1"
  , 8: "8"
  , 16: "16"
  , 32: "32"
  , 1024: "1024"
}

export const mergeStorages = (sa1: StorageAlias, sa2: StorageAlias): StorageAlias => {
  let key: keyof StorageAlias;
  for (key in sa1) {
    sa2[key] = sa1[key].concat(sa2[key])
  }
  return sa2
}
