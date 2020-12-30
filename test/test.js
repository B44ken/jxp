const execSync = require('child_process').execSync;
const cp = require('child_process')
const shell = (cmd) => cp.execSync(cmd, {'encoding': 'utf-8'})

const test = (msg, val, func) => {
    console.log(msg)
    try {
        var output = func()
        var result = output == val
    } catch(err) {
        console.error(err)
        result = false
    }
    var passFail = result?'test passed':'test failed: '+output
    console.log(passFail + '\n')
    return result
}

shell('curl jsonplaceholder.typicode.com/users > users.json')

test('get string 1 deep', 'Array[10]', () => 
    shell('cat users.json | jxp'))