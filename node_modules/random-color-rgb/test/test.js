import {expect} from 'chai'
import getRandomColor from '../src/index'
// var getRandomColor = require('../build/dist')

describe('generate color', () => {
  it('return a random color', () => {

    let reg = /^rgb\(\d{1,3}\,\d{1,3}\,\d{1,3}\)$/
    let result = reg.test(getRandomColor())

    expect(result).to.be.true
  })

  it('return a random color with opacity', () => {
    let reg = /^rgba\(\d{1,3}\,\d{1,3}\,\d{1,3}\,1\)$/
    let result = reg.test(getRandomColor({opacity: 1}))

    expect(result).to.be.true
  })
})
