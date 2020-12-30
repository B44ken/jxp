# jxp | json explorer
jxp is a simple tool for reading large json files in the command lime. it takes in a valid JSON object from STDIN and follows the path given. [./test.js]() contains usage examples. use flag `-j` to output valid JSON, or ask for `--help` or `-h`
```sh
$ echo "{'hello': 'world'}" | jxp hello
# "world"
$ curl https://jsonplaceholder.typicode.com/users | jxp 3.address.geo
# lat": "29.4572" 
# lng: "-163.2290"
```