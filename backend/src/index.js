/*
	Backend application
*/
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes");
const { setupSocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(router);

mongoose.connect(`mongodb+srv://omnistack:DgF6v1VgN2DzVS9D@lorenz-app-qcefj.gcp.mongodb.net/semana-omnistack-10?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

server.listen(8000, "0.0.0.0");
