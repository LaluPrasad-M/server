JSON.json_parse = (value) => {
    try {
        return JSON.parse(value)
    } catch (err) {
        return value
    }
}

JSON.json_stringify = (value) => {
    try {
        return JSON.stringify(value)
    } catch (err) {
        return value
    }
}

