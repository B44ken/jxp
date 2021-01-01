const execSync = require('child_process').execSync;
const cp = require('child_process')
const fs = require('fs')
const colours = require('./colours')

const shell = c => cp.execSync(c, {'encoding': 'utf-8'})
const file = f => fs.readFileSync(f, {'encoding': 'utf8'})

var anyTestFailed = false
const test = (msg, val, func) => {
    var log = colours.FgWhite + msg + '\n'
    try {
        if(typeof func == 'string')
            var output = shell(func)
        if(typeof func == 'function')
            var output = func()
        var result = output == val
        anyTestFailed = anyTestFailed | !result
        
    } catch(err) {
        log += colours.FgRed + err
        var result = false
        anyTestFailed = true
    }
    var passFail = result?colours.FgGreen+'test passed':colours.FgRed+'test failed: '+output
    log += passFail + '\n'
    console.log(log)
    return result
}

shell('curl -s jsonplaceholder.typicode.com/users > test/usr.json')

test('object root', 'Array[10]\n', 'cat test/usr.json | jxp')
test('third address object', file('test/3adr.txt'), 'cat test/usr.json | jxp 3.address')
test('third address geo as json', '{"lat":"29.4572","lng":"-164.2990"}\n', 
    'cat test/usr.json | jxp -j 3.address.geo')
test('throws error on nonexistent value', 'error: could not find key null\n', 
    'cat test/usr.json | jxp -j 3.null')
test('2-4th users geo (multiple paths)', file('test/24glob.txt'), 'cat test/usr.json | jxp 2.address.geo 3.address.geo 4.address.geo')
// stest('fail!', 3, ()=>{})

if(!anyTestFailed)
    console.log(colours.FgBlue+'--------------\nall tests passed #pog')
