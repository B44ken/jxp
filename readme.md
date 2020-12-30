# jxp | json explorer
jxp is a simple tool for reading large json files in the command lime. it takes in a valid JSON object from STDIN and follows the path given. use flag `-j` to output valid JSON. see examples:
```sh
curl https://jsonplaceholder.typicode.com/users -o users.json
cat users.json | jxp
# Array[10]
cat users.json | jxp 3.address
# street: "Hoeger Mall"
# suite: "Apt. 692"
# city: "South Elvis"
# zipcode: "53919-4257"
# geo: Object{lat,lng}
cat users.json | jxp -j 3.address.geo
# {"lat":"29.4572","lng":"-164.2990"}
```