// 遞迴
export const recursive = (obj, key, exec, finish) => {
  let recursiveIndex = 0
  const arrayWithoutHoles = (arr) => {
    const toArray = () => {
      const len = arr.length
      const arr2 = new Array(len)

      for (let i = 0; i < len; i += 1) {
        arr2[i] = arr[i]
      }

      return arr2
    }

    if (Array.isArray(arr)) {
      return toArray()
    }
  }
  const foeEach = (object, parentPath) => {
    recursiveIndex++

    // console.log(object.constructor)

    if (object.constructor === Object) {
      const path = parentPath ? [].concat(arrayWithoutHoles(parentPath), [0]) : []

      exec(object, path)

      if (object[key]) {
        foeEach(object[key], path)
      }
    } else {
      for (let i = 0; i < object.length; i += 1) {
        const item = object[i]
        const index = i
        const path = parentPath ? [].concat(arrayWithoutHoles(parentPath), [index]) : []

        exec(item, path)

        if (item[key]) {
          foeEach(item[key], path)
        }
      }
    }

    if (--recursiveIndex === 0 && finish) {
      finish(object)
    }

    return object
  }

  foeEach(obj, [])
}

// 深度複製
export const deepClone = (obj, callback) => {
  let object = null

  if (obj == null || typeof obj !== 'object') return obj
  if (obj.constructor !== Object && obj.constructor !== Array) return obj
  if (
    obj.constructor === Date ||
    obj.constructor === RegExp ||
    obj.constructor === Function ||
    obj.constructor === String ||
    obj.constructor === Number ||
    obj.constructor === Boolean
  )
    return new obj.constructor(obj)

  object = object || new obj.constructor()

  for (const name in obj) {
    object[name] = typeof object[name] === 'undefined' ? deepClone(obj[name]) : object[name]
  }

  if (callback) {
    callback(object)
  }

  return object
}

// 深度合併
export const deepMerge = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()
  const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item)
  }
  const isShallow = (item) => {
    return !(Array.isArray(item) && item.find((item) => typeof item === 'object'))
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        // console.log(key)
        // console.log(source[key])
        // console.log(target[key])
        // console.log('------------------')

        if (!target[key]) Object.assign(target, { [key]: {} })
        // Object.assign(target, { [key]: source[key].map((item, index) => deepMerge(target[key][index] || item, item)) });

        deepMerge(target[key], source[key])
      } else {
        if (isShallow(source[key])) {
          Object.assign(target, { [key]: source[key] })
        } else {
          if (!target[key]) Object.assign(target, { [key]: [] })
          Object.assign(target, {
            [key]: source[key].map((item, index) => deepMerge(target[key][index] || item, item)),
          })
        }
      }
    }
  }

  return deepMerge(target, ...sources)
}

// 清空物件資料
export const emptyData = (obj) => {
  return deepClone(obj, (data) => {
    for (const key in obj) {
      if (data[key]) {
        if (typeof data[key] === 'string') {
          data[key] = ''
        } else if (typeof data[key] === 'number') {
          data[key] = null
        } else {
          if (Array.isArray(data[key])) {
            data[key] = []
          } else if (typeof data[key] !== 'boolean') {
            data[key] = {}
          }
        }
      }
    }
  })
}

// 小數點設定
export const toFixed = (number, fixed) => {
  const length = number && /\./.test(number) ? (number + '').split('.')[1].length : 0
  const fix = fixed !== undefined ? fixed : length
  let result = +(Math.round(number + `e+${fix}`) + `e-${fix}`) || 0
  const pointNumber = /\./.test(result) ? result.toString().split('.')[1] : []

  if (fix && pointNumber.length < fix) {
    for (let i = 0; i < fix - pointNumber.length; i += 1) {
      if (/\./.test(result)) {
        result = `${result}0`
      } else {
        if (i === 0) {
          result = `${result}.0`
        } else {
          result = `${result}0`
        }
      }
    }
  }

  // console.log(/\./.test(result))
  // console.log(pointNumber)

  return number || number === 0 ? result : null
}

// 千分位設定
export const numberComma = (number) => {
  const amount = number ? (typeof number === 'number' ? number + '' : number) : null
  const comma = /\B(?=(\d{3})+(?!\d))/g

  return amount ? amount.replace(comma, ',') : null
}

// 日期轉換 顯示用
export const ISOFormatDate = (date, format) => {
  const hh =
    /hh/.test(format) && /.*\d+(?=(T|\s).*)/.test(date) && /\d{2}:\d{2}:\d{2}/.test(date)
      ? /^\d{2}/.exec(/\d{2}:\d{2}:\d{2}/.exec(date)[0])[0]
      : /hh/.test(format)
        ? '00'
        : ''
  const mm =
    /mm/.test(format) && /.*\d+(?=(T|\s).*)/.test(date) && /\d{2}:\d{2}:\d{2}/.test(date)
      ? /:(\d{2})/.exec(/\d{2}:\d{2}:\d{2}/.exec(date)[0])[1]
      : /mm/.test(format)
        ? '00'
        : ''
  const ss =
    /ss/.test(format) && /.*\d+(?=(T|\s).*)/.test(date) && /\d{2}:\d{2}:\d{2}/.test(date)
      ? /\d{2}$/.exec(/\d{2}:\d{2}:\d{2}/.exec(date)[0])[0]
      : /ss/.test(format)
        ? '00'
        : ''
  const getDay = date
    ? /^\/Date/.test(date)
      ? Number(/\((.*)(-|\+)/.exec(date)[1])
      : +new Date(date)
    : ''
  const areaTime = 1000 * 60 * 60 * 8
  // const millisecomd = (1000 * 60 * 60 * 24)
  // const days = typeof day === 'number' ? Number(/(?:\w).*/.exec(day)[0]) : 0
  // const calcDay = ((millisecomd * days) * (/^-/.test(day) ? -1 : 1))
  const calcDay = getDay ? getDay + areaTime : ''

  const symbol = {
    data: format ? /\W/.exec(format)[0] : '',
  }
  let formatDate = calcDay ? /.*(?=T)/.exec(new Date(calcDay).toISOString())[0] : ''
  const YYYY = /YYYY/.test(format) ? /^\d{4}/.exec(formatDate)[0] : ''
  const MM = /MM/.test(format) ? /\W(\d{2})/.exec(formatDate)[1] : ''
  const DD = /DD/.test(format) ? /\d{2}$/.exec(formatDate)[0] : ''
  let formatTimes = ''

  // console.log(dateGet)
  // console.log(calcDay)
  // console.log((dateGet + calcDay))

  // symbol.data =
  //   symbol.data === '-' && +new Date('1911-01-01 00:00:00') ? symbol.data : '/'

  // console.log(getDay)

  if (YYYY) {
    formatDate = YYYY
  }

  if (MM) {
    formatDate = `${formatDate}${symbol.data}${MM}`
  }

  if (DD) {
    formatDate = `${formatDate}${symbol.data}${DD}`
  }

  if (hh) {
    formatTimes = ` ${format.replace('hh', hh)}`
  }

  if (mm) {
    formatTimes = formatTimes.replace('mm', mm)
  }

  if (ss) {
    formatTimes = formatTimes.replace('ss', ss)
  }

  // console.log(formatDate)

  return `${formatDate}${formatTimes}`
}

// 日期轉換 計算用 (IOS - 會有問題)
export const dateFormat = (date, type, reset) => {
  const support = !!+new Date('1911-01-01 00:00:00')
  const symbol = support ? '-' : '/'
  const supportDate = /T/.test(date) ? date.replace(/T/, ' ') : date
  const replaceDate =
    typeof supportDate !== 'number'
      ? support
        ? supportDate
        : supportDate.replace(/-/g, symbol)
      : supportDate
  const resetTime = reset
    ? `${new Date(replaceDate).getFullYear()}${symbol}${addZero(
        new Date(replaceDate).getMonth() + 1
      )}${symbol}${addZero(new Date(replaceDate).getDate())} 00:00:00`
    : replaceDate

  return type !== 'time' ? new Date(resetTime) : +new Date(resetTime)
}

// 取得裝置
export const onDevice = () => {
  const angle = window.screen.orientation ? window.screen.orientation.angle : 0
  const PCMinWidth = 1024
  const mobileWidth = 740
  const userAgent = navigator.userAgent
  const isPCPad = angle === 0 && window.innerWidth > mobileWidth && window.innerWidth < PCMinWidth // 在桌機時 resize 模擬 Pad 的尺寸
  const isAndroidPad = /Android|webOS|BlackBerry/i.test(userAgent)
  const is16BelowPad = /iPad/i.test(userAgent) // ios 16 以下的系統
  const is17AbovePad = angle !== 0 && /Mac OS X/i.test(userAgent) // iso 17 以上的系統
  const isAndroidMobile = /Android|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isIPhoneMobile =
    (angle !== 0 && window.innerWidth > 730 && window.innerWidth < 815) || /iPhone/i.test(userAgent)

  if (window.innerWidth <= mobileWidth || isAndroidMobile || isIPhoneMobile) {
    return 'm'
  }
  if (isPCPad || isAndroidPad || is16BelowPad || is17AbovePad) {
    return 't'
  }

  return 'p'
}

// 不到 10 位數補 0
export const addZero = (value) => {
  const numberValue = typeof value !== 'number' ? Number(value) : value
  return numberValue < 10 ? `0${numberValue}` : numberValue
}

export const keyDownLockNumber = (e, inputType) => {
  const type = e.target.type
  const isLock = type === 'tel' || type === 'number'
  const ASCIICode = e.keyCode || e.which
  const isShift = !!e.shiftKey
  const isCtrl = !!e.ctrlKey
  const addNumberCode = !inputType ? (type === 'number' ? 110 : 109) : ''
  const addTelCode = !inputType ? type === 'tel' && isShift && ASCIICode !== 51 : true
  const isNumber =
    ASCIICode === 8 ||
    ASCIICode === 9 ||
    ASCIICode === 13 ||
    ASCIICode === 46 ||
    ASCIICode === addNumberCode ||
    ASCIICode === 190 ||
    (ASCIICode >= 35 && ASCIICode <= 40) ||
    (!isShift && ASCIICode >= 48 && ASCIICode <= 57) ||
    (ASCIICode >= 96 && ASCIICode <= 105) ||
    (isCtrl && (ASCIICode === 86 || ASCIICode === 90))
  const isNumberANDEn =
    (isNumber ||
      (ASCIICode >= 65 && ASCIICode <= 90) ||
      (isShift && ASCIICode >= 65 && ASCIICode <= 90) ||
      (ASCIICode >= 35 && ASCIICode <= 40) ||
      (isShift && ASCIICode >= 35 && ASCIICode <= 40)) &&
    addTelCode

  if (isLock && !isNumber) {
    e.preventDefault()
  } else if (/number|EN/.test(inputType) && !isNumberANDEn) {
    e.preventDefault()
  }
}

export const toLocaleUpperCase = (value) => {
  return value.toLocaleUpperCase()
}

export const scrollTo = (obj) => {
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style
  const element = obj.elem ? obj.elem : document.scrollingElement || document.documentElement
  const start = supportsNativeSmoothScroll ? element.scrollTop : null
  const startDate = +new Date()

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t -= 1
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  const animateScroll = () => {
    const top = obj.top ? obj.top : 0
    const change = top - start
    const currentDate = +new Date()
    const currentTime = currentDate - startDate
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, 600), 10)

    if (currentTime < 600) {
      requestAnimationFrame(animateScroll)
    } else {
      element.scrollTop = top
      if (obj.callback) {
        obj.callback()
      }
    }
  }

  animateScroll()
}

export const dateValid = (value, type) => {
  const date =
    type === 'date'
      ? /(\d{4})(\d{2})(\d{2})/.exec(value)
      : type === 'creditcard'
        ? /(\d{2})(\d{2})/.exec(value)
        : null
  const year = date ? date[1] : null
  const month = date ? date[2] : null
  const day = date ? date[3] : null
  let isExistDate = null

  if (type === 'date') {
    isExistDate = () => {
      const limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      const theYear = parseInt(year, 10)
      const theMonth = parseInt(month, 10)
      const theDay = parseInt(day, 10)
      const isLeap = new Date(theYear, 1, 29).getDate() === 29

      if (isLeap) {
        limitInMonth[1] = 29
      }

      return theDay <= limitInMonth[theMonth - 1]
    }
  } else if (type === 'creditcard') {
    isExistDate = () => {
      const theYear = parseInt(year, 10)
      const theMonth = parseInt(month, 10)

      return theYear && theMonth <= 12
    }
  }

  return isExistDate ? isExistDate() : true
}

export const taxValid = (value) => {
  const idList = '00000000, 11111111'

  if (!/^\d{8}$/.test(value) || idList.indexOf(value) !== -1) {
    return false
  }

  const operator = [1, 2, 1, 2, 1, 2, 4, 1]
  let sum = 0
  const calculate = (product) => {
    // 個位數 + 十位數
    const ones = product % 10
    const tens = (product - ones) / 10

    return ones + tens
  }

  for (let i = 0; i < operator.length; i += 1) {
    sum += calculate(value[i] * operator[i])
  }

  return !!(sum % 5 === 0 || (value[6] === '7' && (sum + 1) % 5 === 0))
}

// 轉換顏色
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null
}

// device() 方法遺失
// 故註解該函式
//
// export const invalidFieldScrollIntoView = (returnDevice, defaultHeight) => {
//   let matchElems = null
//   const $header =
//     document.querySelector('.l-header') &&
//     getComputedStyle(document.querySelector('.l-header')).position === 'fixed'
//   const $refHeader = $header ? document.querySelector('.l-header') : null
//   const refHeaderHeight = $refHeader
//     ? $refHeader.innerHeight ||
//       $refHeader.offsetHeight ||
//       $refHeader.scrollHeight ||
//       $refHeader.clientHeight
//     : 0
//   const $refForm = document.querySelector('form')
//   const $currentMatchesQuery = $refForm.querySelectorAll('input, select, textarea')
//   const currentMatches = Array.prototype.slice.call($currentMatchesQuery)
//   const parents = ($target, className) => {
//     let $targetElem = $target
//     let $parents = null

//     while ($targetElem.parentNode !== null && $targetElem.parentNode !== document.documentElement) {
//       if ($targetElem.matches) {
//         if ($targetElem.matches(className)) {
//           $parents = $targetElem
//           break
//         }
//       }
//       $targetElem = $targetElem.parentNode
//     }
//     return $parents
//   }
//   const offset = ($el) => {
//     const windowScroll = {
//       y: /iPhone\sOS\s12_/.test(navigator.userAgent) ? window.scrollY : 0,
//     }
//     let $elem = $el
//     let top = 0
//     let left = 0
//     const defaultSet = {
//       Height: defaultHeight || 0,
//     }

//     while ($elem && !Number.isNaN($elem.offsetLeft) && !Number.isNaN($elem.offsetTop)) {
//       top += $elem.offsetTop - $elem.scrollTop + $elem.clientTop
//       left += $elem.offsetLeft - $elem.scrollLeft + $elem.clientLeft

//       $elem = $elem.offsetParent
//     }

//     return {
//       top: top + windowScroll.y - (refHeaderHeight + defaultSet.Height),
//       left,
//     }
//   }

//   currentMatches.forEach((match) => {
//     const $matchParent = parents(match, '.jFormValid')
//     // match.type === 'checkbox' || match.type === 'radio'
//     //   ? match.parentElement.parentElement
//     //   : match.parentElement

//     if (!matchElems && $matchParent && $matchParent.className.indexOf('--error') !== -1) {
//       matchElems = match.parentElement
//     }
//   })

//   if (!returnDevice || returnDevice === device()) {
//     scrollTo({
//       top: offset(matchElems).top,
//     })
//   }
// }

export const deleteCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Sun, 01 Jan 1911 00:00:00 GMT;'
}

// 單位轉換
export const numberFormatNotation = (number) => {
  const int = Number(number)
  const isNegative = int < 0
  const suffixes = ['k', 'm', 'b', 't']
  let value = isNegative ? int * -1 : int

  switch (true) {
    case value >= 1e3 && value < 1e6:
      value = `${+(value / 1e3)} ${suffixes[0]}`
      break
    case value >= 1e6 && value < 1e9:
      value = `${+(value / 1e6)} ${suffixes[1]}`
      break
    case value >= 1e9 && value < 1e12:
      value = `${+(value / 1e9)} ${suffixes[2]}`
      break
    case value >= 1e12:
      value = `${+(value / 1e12)} ${suffixes[3]}`
      break

    default:
      break
  }

  return isNegative ? `-${value}` : value
}

export const unicodLength = (text) => {
  const regexUnicode =
    // eslint-disable-next-line no-misleading-character-class
    /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?)*/g
  // const hasEmoji = regex.test(text)
  // let value = text

  // if (hasEmoji) {
  //   const emojis = text.match(regex)

  //   for (let i = 0; i < emojis.length; i += 1) {
  //     const emoji = emojis[i]

  //     value = value.replace(emoji, 'E')
  //   }
  // }

  return text ? text.match(regexUnicode).length : 0
}

// 同時執行多支 api，會等全部回傳
export const awaitAllApi = async (apis) => {
  try {
    await Promise.all(apis)
  } catch (error) {
    console.log(error)
  }
}

// 取得裝置
export const getOS = () => {
  let userAgent = navigator.userAgent.toLocaleLowerCase()
  let osName = null

  switch (true) {
    case /android/.test(userAgent):
      osName = 'Android'
      break
    case /iphone|ipad/.test(userAgent):
      osName = 'IOS'
      break
    default:
      osName = 'Unknown'
      break
  }

  return osName
}

export const isFacebookApp = () => {
  const useragent = navigator.userAgent || navigator.vendor || window.opera
  return useragent.indexOf('FBAN') > -1 || useragent.indexOf('FBAV') > -1
}

/**
 * 替換空白格式
 * @param {string} text 傳入文字
 */
export const replaceNewLine = (text) => {
  // 移除包含逃逸字元的換行符號
  return text ? text.replace(/\r\n|\\r\\n/g, '<br />') : ''
}
