import dayjs from 'dayjs'

export const isISODateString = (dateString: string) => {
  if (!dateString) {
    return false
  }
  // 正则表达式匹配 ISO 8601 日期格式
  const isoDatePattern =
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)|(\d{4}-\d{2}-\d{2})$/
  return isoDatePattern.test(dateString)
}
export const formatZoneTime = (
  time: string | number | Date,
  template: string = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!time) {
    return ''
  }

  return isISODateString(time as string)
    ? dayjs((time as string).replace(/T|Z/g, ' ')).format(template)
    : dayjs(new Date(time)).format(template)
}

/**
 * @name 生成时间历史
 * @returns "今天" | "昨天" | "7天内" | "30天内" | "YYYY-MM"
 * **/
export const genDateTitle = (time: string | number | Date): string => {
  const nowDate = new Date()
  const prevDate = new Date(time)

  if (nowDate.getMonth() === prevDate.getMonth()) {
    const diffDate = nowDate.getDate() - prevDate.getDate()
    if (diffDate === 0) {
      return '今天'
    } else if (diffDate === 1) {
      return '昨天'
    } else if (diffDate > 1 && diffDate < 7) {
      return '7天内'
    } else {
      return '30天内'
    }
  } else {
    return formatZoneTime(prevDate, 'YYYY-MM')
  }
}
