import { Explorable } from './explorable.js' 

const check = (msg, test) => {
    if(test || test == undefined) {
        console.log('error: ' + msg)
        Deno.exit(1)
    }
    return true
}

const processArgs = (argv) => {
    var flags = []
    var paths = []
    for(const arg of argv) {
        if (arg.endsWith('/deno.exe')
         || arg.endsWith('/deno')
         || arg.endsWith('command_deno.js'))
            continue
        if (arg.startsWith('-'))
            flags.push(arg)
        else
            paths.push(arg)
        
    }
    return {flags, paths}
}

const denoStdin = async () => {
    var stdin = new Uint8Array(1024**2)
    const bufLen = await Deno.stdin.read(stdin)
    stdin = stdin.subarray(0, bufLen)
    stdin = new TextDecoder().decode(stdin)
    return stdin
}
const {flags, paths} = processArgs(Deno.args)
if(paths.length == 0) paths[0] = '-'

var stdin = await denoStdin()
check('no stdin (should be json)', stdin.length <= 1) 

var exp
try {
    var input = JSON.parse(stdin)
    var exp = new Explorable(input)
} catch {
    check('error: could not parse json')
}

const prepend = (string, pre) =>
    string.split('\n').map(s=>pre+s).join('\n')

var output = ''
if (flags.includes('-j')) {
    var list = []
    for(const path of paths)
        list.push(exp.delve(path))
    if(list.length > 1)
        output += JSON.stringify(list)
    else
        output += JSON.stringify(list[0])
}
else if(!flags.includes('-r') && paths.length > 1) {
    for(const path of paths) {
        const d = exp.delve(path)
        output += path + ': \n' + prepend(d, '  ')
    }
}
else {
    for(const path of paths)
        output += exp.delve(path)
}

console.log(output)