const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
/**
 * @returns {boolean}
 */
const checkEmpty = (checkArr) => {
  for (const key in checkArr) {
    if (Object.hasOwnProperty.call(checkArr, key)) {
      const element = checkArr[key];
      console.log(element);
      if (!element.value) {
        wx.showToast({
          title: element.message,
          icon: "none"
        })
        return true
      }
    }
  }
  return false
}
/**
 * 检查是否从login页来
 * @param {Function} cb 
 */
const isFromLogin = (cb) => {
  if (typeof cb !== 'function') {
    throw new Error("cb为函数")
  }
  const pages = getCurrentPages()
  //const page = pages[pages.length - 1]
  //const isFromLogin = page.__displayReporter.showReferpagepath.includes("pages/login/login")
  //if (isFromLogin) {
    //cb()
  //}
}

module.exports = {
  formatTime,
  checkEmpty,
  isFromLogin
}