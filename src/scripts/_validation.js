import { all as rules } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'

import { taxValid, unicodLength } from '@js/_prototype.js'

const replaceMessage = (elem, object) => {
  let message = object.errorMessage || object[0]

  if (object.value !== null) {
    const regex = /{\s?.*\s?}/

    message = message.replace(regex, object.value)
  } else {
    const attributes = document.querySelector(`[name="${elem.name}"]`).attributes

    for (let i = 0; i < attributes.length; i += 1) {
      const { nodeName, nodeValue } = attributes[i]
      const regex = new RegExp(`{\\s?${nodeName}\\s?}`)

      message = message.replace(regex, nodeValue)
    }
  }

  return message
}

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule])
})

// 必填
defineRule('required', (value, object, elem) => {
  return value === null || value === undefined || value.length === 0
    ? replaceMessage(elem, object)
    : true
})

// 勾選
defineRule('checked', (value, object, elem) => {
  return value ? true : replaceMessage(elem, object)
})

// 最大字元長度
defineRule('maxlength', (value, object, elem) => {
  const maxlength =
    object.value ||
    Number(document.querySelector(`[name="${elem.name}"]`).getAttribute('maxlength'))

  // 計算字串長度：全形字 (charCode > 255) 算 2，其他算 1
  const getLength = (str) => {
    return Array.from(str).reduce((sum, ch) => {
      return sum + (ch.charCodeAt(0) > 255 ? 2 : 1)
    }, 0)
  }

  return value && unicodLength(value) && getLength(value) > maxlength
    ? replaceMessage(elem, object)
    : true
})

// 最小字元長度
defineRule('minlength', (value, object, elem) => {
  const minlength =
    object.value ||
    Number(document.querySelector(`[name="${elem.name}"]`).getAttribute('minlength'))

  return value && unicodLength(value) < minlength ? replaceMessage(elem, object) : true
})

defineRule('range', (value, object) => {
  const type = object.type || 'number'
  const max = type === 'date' ? +new Date(object.max) : object.max
  const min = type === 'date' ? +new Date(object.min) : object.min
  const val = type === 'date' ? +new Date(value) : value
  const errorMessage = object.message
    .replace(/{\s?max\s?}/, object.max)
    .replace(/{\s?min\s?}/, object.min)

  return min > val || val > max ? errorMessage : true
})

// 比對是某一樣的值
defineRule('same', (value, object) => {
  return value && value !== object.compare ? object.message : true
})

// 身分證驗證
defineRule('idcard', (value, message) => {
  const county = [
    1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12,
    30,
  ]
  const operator = [1, 2, 1, 2, 1, 2, 4, 1]
  const idcard = value.toUpperCase()
  const idList = '00000000, 11111111'

  if (!idcard.match(/^[A-Z]\d{9}$/) && (!/^\d{8}$/.test(value) || idList.indexOf(value) !== -1)) {
    return message[0]
  } else {
    if (!idcard.match(/^[A-Z]\d{9}$/)) {
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

      return !(sum % 10 === 0 || (value[6] === '7' && (sum + 1) % 10 === 0)) ? message[0] : true
    } else {
      let sum = 0
      const idcardArray = idcard.split('')

      // 計算總分
      sum = county[idcardArray[0].charCodeAt(0) - 65]

      for (let i = 1; i <= 8; i += 1) {
        sum += (idcardArray[i] | 0) * (9 - i)
      }

      sum += idcardArray[9] | 0

      return sum % 10 !== 0 ? message[0] : true
    }
  }
})

// 日期格式
defineRule('date', (value, message, elem) => {
  const symbol = !+new Date('1911-01-01 00:00:00') ? '/' : '-'
  const format = document.querySelector(`[name="${elem.name}"]`).getAttribute('format')
  const hasSymbol = /\W/.test(format)
  const isFormat = hasSymbol ? /^\d{8}$/.test(value.replace(/\W/g, '')) : /^\d{8}$/.test(value)
  const YYYY = isFormat ? /\d{4}/.exec(value)[0] : null
  const MM = isFormat
    ? hasSymbol
      ? /\W(\d{2})/.exec(value)[1]
      : /\d{4}(\d{2})/.exec(value)[1]
    : null
  const DD = isFormat ? /\d{2}$/.exec(value)[0] : null
  const isDate = isFormat ? !isNaN(new Date(`${YYYY}${symbol}${MM}${symbol}${DD} 00:00:00`)) : false

  return value && !isDate ? message[0] : true
})

// 是否成年
defineRule('adult', (value, message, elem) => {
  const symbol = !+new Date('1911-01-01 00:00:00') ? '/' : '-'
  const format = document.querySelector(`[name="${elem.name}"]`).getAttribute('format')
  const hasSymbol = /\W/.test(format)
  const isFormat = hasSymbol ? /^\d{8}$/.test(value.replace(/\W/g, '')) : /^\d{8}$/.test(value)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const YYYY = isFormat ? /\d{4}/.exec(value)[0] : null
  const MM = isFormat
    ? hasSymbol
      ? /\W(\d{2})/.exec(value)[1]
      : /\d{4}(\d{2})/.exec(value)[1]
    : null
  const DD = isFormat ? /\d{2}$/.exec(value)[0] : null
  const formatDate = isFormat ? +new Date(`${year}${symbol}${month}${symbol}${date} 00:00:00`) : 0
  const formatValue = isFormat ? +new Date(`${YYYY}${symbol}${MM}${symbol}${DD} 00:00:00`) : 0
  const age = new Date(formatDate - formatValue)

  return value && age.getFullYear() - 1970 < 18 ? message[0] : true
})

// 電話格式
defineRule('phone', (value, message) => {
  return value && !/^0?9\d{8}$/.test(value) ? message[0] : true
})

// 中文格式
defineRule('chinese', (value, message) => {
  return value && !/^[\u4e00-\u9fa5]+$/.test(value) ? message[0] : true
})

// 數字格式
defineRule('number', (value, message) => {
  return value && !/^\d+$/.test(value) ? message[0] : true
})

// email 格式
defineRule('email', (value, message) => {
  return value && !/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value)
    ? message[0]
    : true
})

// 半形字元
defineRule('halfWidth', (value, object) => {
  const isObject = !!object.exception
  const exception = isObject ? value.replace(new RegExp(`\\${object.exception}`, 'g', '')) : value

  return value && /[^x00-xff]/g.test(exception) ? (isObject ? object.message : object[0]) : true
})

defineRule('creditcard', (value, message) => {
  const valueNoSpace = value.replace(/\s/g, '')
  const creditcardValid = () => {
    const regex = /^[0-9]{13,19}$/

    if (regex.test(valueNoSpace)) {
      let checksum = 0
      let j = 1

      for (let i = valueNoSpace.length - 1; i >= 0; i--) {
        let calc = 0
        calc = Number(valueNoSpace.charAt(i)) * j

        if (calc > 9) {
          checksum = checksum + 1
          calc = calc - 10
        }

        checksum = checksum + calc

        if (j === 1) {
          j = 2
        } else {
          j = 1
        }
      }

      return checksum % 10 === 0
    } else {
      return false
    }
  }

  return value && !creditcardValid() ? message[0] : true
})

defineRule('tax', (value, message) => {
  return value && !taxValid(value) ? message[0] : true
})

defineRule('ajaxError', (value, object, elem) => {
  const name = elem.name
  const isExistData = object.find((item) => item.fieldName === name)

  return !isExistData ? true : isExistData.message
})
