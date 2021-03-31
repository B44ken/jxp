# json explorer | jxp

jxp is a simple tool for reading large json files in the command lime. it takes in a valid JSON object from STDIN and follows the path given, then prints out a human-readable summary. see examples:
```sh
curl https://jsonplaceholder.typicode.com/users -o usr.json
cat usr.json | jxp
# Array[10]
cat usr.json | jxp 3.address
# street: Hoeger Mall
# suite: Apt. 692
# city: South Elvis
# zipcode: 53919-4257
# geo: Object{lat,lng}
```

## installing
clone the repo then `sudo npm link`

## flags
use flag `-j` to output valid json
```sh
cat usr.json | jxp -j 3.address.geo
# {"lat":"29.4572","lng":"-164.2990"}
```
use flag `-r` to output multiple paths unformatted
```sh
cat usr.json | jxp -r {0..2}.username
# Bret
# Antonette
# Samantha
```
