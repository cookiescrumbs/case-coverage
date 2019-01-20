## random-color-rgb

[![Build Status](https://travis-ci.org/Riokai/random-color-rgb.svg?branch=master)](https://travis-ci.org/Riokai/random-color-rgb)

Package to generate random RGB colors

## Install

```bash
npm install random-color-rgb
```

## Usage

```js
var randomColorRGB = require('random-color-rgb')

// or ES2015(babel support)
import randomColorRGB from 'random-color-rgb'

randomColorRGB()
// return {String} rgb(100,100,100)

// set maximum
randomColorRGB({max: 100})
// return {String} rgb(90,80,60)

// set minimum
randomColorRGB({min: 20})
// return {String} rgb(145,118,172)

// set opacity
randomColorRGB({opacity: 0.5})
// return {String} rgba(123,182,123,0.5)
```

## Develop
```bash
npm run dev
```
