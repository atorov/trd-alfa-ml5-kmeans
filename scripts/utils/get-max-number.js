function getMaxNumber(arr = []) {
    let len = arr.length
    let max = -Infinity
    while (len--) max = arr[len] > max ? arr[len] : max

    return max
}

module.exports = getMaxNumber
