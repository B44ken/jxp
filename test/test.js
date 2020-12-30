const execSync = require('child_process').execSync;
const cp = require('child_process')
const colours = require('./colours')

const shell = cmd => cp.execSync(cmd, {'encoding': 'utf-8'})

var anyTestFailed = false
const test = (msg, val, func) => {
    console.log(colours.FgWhite + msg)
    try {
        if(typeof func == 'string')
            var output = shell(func)
        if(typeof func == 'function')
            var output = func()
        var result = output == val
        anyTestFailed = anyTestFailed | !result
        
    } catch(err) {
        console.log(colours.FgRed + err)
        result = false
        anyTestFailed = true
    }
    var passFail = result?colours.FgGreen+'test passed':colours.FgRed+'test failed: '+output
    console.log(passFail + '\n')
    return result
}

shell('curl -s jsonplaceholder.typicode.com/users > test/usr.json')

test('object root', 'Array[10]\n', 'cat usr.json | jxp')
test('third address', `street: "Hoeger Mall"
suite: "Apt. 692"
city: "South Elvis"
zipcode: "53919-4257"
geo: Object{lat,lng}
`, 'cat usr.json | jxp 3.address')
test('third address geo as json', '{"lat":"29.4572","lng":"-164.2990"}\n', 
    'cat test/usr.json | jxp -j 3.address.geo')
test('throws error on nonexistent value', 'error: could not find key null\n', 
    'cat test/usr.json | jxp -j 3.null')
// stest('fail!', 3, ()=>{})

if(!anyTestFailed)
    console.log(colours.FgBlue+'--------------\nall tests passed #pog')
