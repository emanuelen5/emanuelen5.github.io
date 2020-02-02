# Getting started with Conbee II

This page shows you how to get started with Conbee together with Home assistant: [deCONZ with home assistant]

[deCONZ with home assistant]: https://www.youtube.com/watch?v=F9SKRksA3Es


## Using REST API

Request:
```bash
curl -X POST -i 'http://192.168.56.1:80/api' --data '{"devicetype": "test"}'
```

Response:
```json
[{"success":{"username":"B5681A53A9"}}]
```
