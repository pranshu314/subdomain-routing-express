# Implementatoin of Subdomain Routing

- Uses the [vhost](https://github.com/expressjs/vhost) (Virtual domain hosting) to route the client to a different page according to the request.
- The app stores the data about the new subdomain and the backgroundColor of the said subdomain using a in memory array, for the sake of simplicity. It can be easily replaced with any database be it SQL or MongoDB
- The server gives the cliend static webpages (html and css files), which are displayed based on the route. There is no separate frontend app.

## Different possible approaches

- Using a custom middleware to conver each subdomain route (abc.domain.com) to domain.com/abc route.
- Using a reverse proxy in the form of nginx.

## Demo Video

[![Watch Video](https://img.youtube.com/vi/1CXi2Nhov58/maxresdefault.jpg)](https://youtu.be/1CXi2Nhov58)
