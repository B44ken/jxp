export class Explorable {
    constructor(object, useJSON, debug) {
        this.object = object
        this.useJSON = useJSON | false
        this.debug = debug
    }
    delve(path) {
        var inDelve = this.object
        for(var key of path.split('.')) {
            if(key == '-') break
            if(!inDelve[key])
                return 'error: could not find key ' + key
            inDelve = inDelve[key]
        }
        if(this.useJSON)
            return JSON.stringify(inDelve)
        else return this.formatObject(inDelve)
    }
    formatObject(object) {
        if(Array.isArray(object) | typeof object != 'object')
            return this.formatValue(object)

        var keyList = []
        for(var key of Object.keys(object))  
                keyList.push(key + ': ' + this.formatValue(object[key]))
        return keyList.join('\n')
    }
    formatValue(object) {
        if(object == null)
            return null

        else if(Array.isArray(object))
            return 'Array[' + object.length + ']'

        else if(typeof object == 'object')
            return 'Object{' + Object.keys(object) + '}'

        return String(object)
    }
}