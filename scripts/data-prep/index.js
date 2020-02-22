const RAW_FILES = [
    './in/DAT_ASCII_EURUSD_T_201901.csv',
    './in/DAT_ASCII_EURUSD_T_201902.csv',
    './in/DAT_ASCII_EURUSD_T_201903.csv',
    './in/DAT_ASCII_EURUSD_T_201904.csv',
    './in/DAT_ASCII_EURUSD_T_201905.csv',
    './in/DAT_ASCII_EURUSD_T_201906.csv',
    './in/DAT_ASCII_EURUSD_T_201907.csv',
    './in/DAT_ASCII_EURUSD_T_201908.csv',
    './in/DAT_ASCII_EURUSD_T_201909.csv',
    './in/DAT_ASCII_EURUSD_T_201910.csv',
    './in/DAT_ASCII_EURUSD_T_201911.csv',
    './in/DAT_ASCII_EURUSD_T_201912.csv',
]
const ROW_LENGTH = 5

const fs = require('fs')

const checkNumber = require('../utils/check-number')

let collection = []
let extracted = 0

console.log('::: ========= ')

RAW_FILES.forEach((rawFile) => {
    console.log('::: rawFile:', rawFile)

    // extract
    let data = fs.readFileSync(rawFile, 'utf8')
        .split('\n')
        .map((row) => row.split(','))
        .map(([dt, bid, ask]) => [...dt.split(' '), bid, ask])
    // .splice(0, 1500)
        .filter(([, , bid, ask]) => checkNumber(+bid) && checkNumber(+ask))
    console.log('::: [extract]:', data.length)
    extracted += data.length

    // process
    data = data
        .filter(([, time], index) => time.charAt(1) !== `${(data[index + 1] || [])[1]}`.charAt(1))
        .map(([date, time, bid, ask]) => [date, time, (Number(bid) + Number(ask)) / 2])
    console.log('::: [process]:', data.length)

    // collect
    collection = [...collection, ...data]
    console.log('::: [collect]:', collection.length)
    console.log('::: --------- ')
})

// format
const _collection = []
while (collection.length) _collection.push(collection.splice(0, ROW_LENGTH))
collection = _collection
    .filter((row) => row
        .map(([date]) => date)
        .reduce((acc, date, index, arr) => (index ? acc && date === arr[index - 1] : true), true))
    .map((row) => row.map(([, , mid]) => mid))
    .filter((row) => row.length === ROW_LENGTH)
console.log('::: [format   ]:', collection.length, collection[collection.length - 1])

// normalize
const mids = collection.reduce((acc, row) => [...acc, ...row], [])
const min = Math.min(...mids)
const max = Math.max(...mids)

collection = collection.map((row) => row.map((mid) => ((max - min) ? (mid - min) / (max - min) : 0.5)))
console.log('::: [normalize]:', collection.length, min, max, collection[collection.length - 1])
console.log('::: --------- ')

// check
const midsCheck = collection.reduce((acc, row) => [...acc, ...row], [])
const minCheck = Math.min(...midsCheck)
const maxCheck = Math.max(...midsCheck)
console.log('::: [check]:', minCheck, !minCheck, maxCheck, maxCheck === 1)

// save
const result = {
    min,
    max,
    data: (() => collection.map((row) => row.reduce((acc, mid, index) => {
        acc[`x${index + 1}`] = mid
        return acc
    }, {})))(),
}
const content = JSON.stringify(result)
fs.writeFileSync('./out/data.json', content, 'utf8')
console.log('::: [save]:', result.data.length, result.data[result.data.length - 1], Object.keys(result))
console.log('::: --------- ')

// end
console.log('::: extracted:', extracted)
console.log('::: collected:', collection.length)
console.log('::: Done!')
console.log('::: ========= ')
