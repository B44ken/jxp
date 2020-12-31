#!/usr/bin/node

const fs = require('fs')
const Explorable = require('./explorable.js').Explorable
var stdin
try { stdin = fs.readFileSync(0).toString() }
catch {
    console.log('error: no stdin (should be json)')
    process.exit(1)
}
const getPath = () => {
    const noNode = process.argv
        .filter(e => !e.endsWith('node'))
        .filter(e => !e.endsWith('node.exe'))
        .filter(e => !e.startsWith('-'))
    if(noNode.length < 2) {
        return '-'
    }
    return noNode[1]
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
try { var input = JSON.parse(stdin) }
catch { 
    console.log('error: could not parse json')
    process.exit(1)
}
const useJSON = flags.includes('-j')
const debug = flags.includes('-d')
const exp = new Explorable(input, useJSON)
const output = exp.delve(getPath())
console.log(output)