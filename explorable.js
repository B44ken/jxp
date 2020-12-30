class Explorable {
    constructor(object, useJSON) {
        this.object = object
        this.useJSON = useJSON
    }
    delve(path) {
        var inDelve = this.object
        for(var key of path.split('.')) {
            if(key == '-') break
            if(key == '%')
                return this.formatObject(inDelve)
            if(!inDelve[key])
                return 'error: could not find key ' + key
            inDelve = inDelve[key]
        }
        if(this.useJSON)
            return JSON.stringify(inDelve)
        else return this.formatObject(inDelve)
    }
    formatObject(object) {
        if(Array.isArray(object))
            return 'Array[' + object.length + ']'
        if(typeof object != 'object')
            return JSON.stringify(object)
        var keyList = []
        for(var key of Object.keys(object)) { 
            if(Array.isArray(object[key]))
                var value = 'Array[' + object[key].length + ']'
            else if(typeof object[key] == 'object')
                var value = 'Object{' + Object.keys(object[key]) + '}'
            else var value = JSON.stringify(object[key])
            keyList.push(key + ': ' + value)
        }
        return keyList.join('\n')
    }
}

module.exports.Explorable = Explorable