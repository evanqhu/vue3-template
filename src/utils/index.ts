// 工具函数

/** 将单词首字母变为大写 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}
