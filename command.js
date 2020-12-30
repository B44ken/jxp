#!/usr/bin/node1

const fs = require('fs')
const Explorable = require('./explorable.js').Explorable
var stdin
try { stdin = fs.readFileSync(0).toString() }
catch {
    console.log('error: no stdin (should be json)')
    process.exit(1)
}
const getPath = () => {
    var noNode = process.argv
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
    for(var item of process.argv) {
        if(item.startsWith('-'))
            flags += item
    }
    return flags
}
var flags = getFlags()
if(flags.includes('--help') || flags.includes('-h')) {
    var helpFile = fs.readFileSync('readme.md').toString()
    console.log(helpFile)
    process.exit(0)
}

try { var input = JSON.parse(stdin) }
catch { 
    console.log('error: could not make json')
    process.exit(1)
}
var useJSON = flags.includes('-j')
var exp = new Explorable(input, useJSON)
var out = exp.delve(getPath())
console.log(out)