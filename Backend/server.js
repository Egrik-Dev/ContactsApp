const bodyParser = require("body-parser");
const jsonServer = require("json-server");

const routes = require("./routes");

const server = jsonServer.create();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

server.use(routes);

server.listen(5001, () => {
  console.log("Server working");
});
