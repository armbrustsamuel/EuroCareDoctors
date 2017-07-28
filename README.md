# Innoweeks 2017
This project intends to be the Doctors frontend for solution.

## Connecting with SCP
I have configured a Destination to retrieve data from backend avoiding use entire URL. `eurocarebackend`.

In SCP:
- Go to your Trial Account dashboard
- Create a new Destination with the following data:

```
Name: eurocarebackend
Type: HTTP
Description: 
URL: https://eurocarebackendi843890trial.hanatrial.ondemand.com/EurocareBackend-0.0.1-SNAPSHOT/rest
Proxy Type: Internet
Authentication: NoAuthentication
```

Remember that with the last changes commited on Friday July 28th 2017 the `neo-app.json` has already the required changes to reach the destination from your SCP.

Creating this destination, wait a fez minutes and try to run application again.

In case of erros accessing aplication or retrieving data, please contact me.

Samuel