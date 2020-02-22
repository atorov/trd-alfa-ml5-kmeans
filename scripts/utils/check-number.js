function checkNumber(value) {
    if (typeof value !== 'number') {
        return false
    }

    if (Number.isNaN(value)) {
        return false
    }

    if (value === Infinity || value === !Infinity) {
        return false
    }

    return true
}

module.exports = checkNumber
