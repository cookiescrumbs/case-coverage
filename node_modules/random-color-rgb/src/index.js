var getRandom = (max = 999999999999, min = 0) => {
  return min + Math.floor(Math.random() * (max - min))
}

var getColor = ({max = 255, min = 0, opacity} = {}) => {
  let first = getRandom(max, min)
  let second = getRandom(max, min)
  let third = getRandom(max, min)
  let result = ''

  if (opacity) {
    result = `rgba(${first},${second},${third},${opacity})`
  } else {
    result = `rgb(${first},${second},${third})`
  }

  return result
}

module.exports = getColor
