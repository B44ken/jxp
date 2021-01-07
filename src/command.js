#!/usr/bin/node

const fs = require('fs')
const Explorable = require('./explorable.js').Explorable
try { var stdin = fs.readFileSync(0).toString() }
catch {
    console.log('error: no stdin (should be json)')
    process.exit(1)
}
try { var input = JSON.parse(stdin) }
catch { 
    console.log('error: could not parse json')
    process.exit(1)
}

const getFlags = () => {
    var flags = []
    for(const item of process.argv) {
        if(item.startsWith('-'))
            flags += item
    }
    return flags
}
var flags = getFlags()
const useJSON = flags.includes('-j')
const debug = flags.includes('-d')
if(debug) console.log({ flags, argv: process.argv })

const getPath = () => {
    const noNode = process.argv
        .filter(e => !e.endsWith('/node'))
        .filter(e => !e.endsWith('/node.exe'))
        .filter(e => !e.endsWith('command.js'))
        .filter(e => !e.startsWith('-'))
        .filter(e => e != '/usr/local/bin/jxp')
    if(noNode.length < 1) {
        return '-'
    }
    return noNode
}


const prepend = (string, pre) => {
    return string.split('\n').map(s=>pre+s).join('\n')
}

const exp = new Explorable(input, useJSON, debug)

if(debug) console.log({ path: getPath(), pathZero: getPath()[0] })

if(getPath().length > 1 && !flags.includes('-r')) {
    for(const path of getPath()) {
        const d = exp.delve(path)
        console.log(path + ': \n' + prepend(d, '  '))
    }
}
else {
    var out = exp.delve(getPath()[0])
    for(const path of getPath()) {
        console.log(exp.delve(path))
    }
}
process.exit(0)
