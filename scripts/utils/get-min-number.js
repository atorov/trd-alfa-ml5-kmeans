function getMinNumber(arr = []) {
    let len = arr.length
    let min = Infinity
    while (len--) min = arr[len] < min ? arr[len] : min

    return min
}

module.exports = getMinNumber
