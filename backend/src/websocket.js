const socketio = require("socket.io");

const parseStringArray = require("./utils/parseStringArray");

const calculateDistace = require("./utils/calculateDistance");

const connections = [];

let io;

const setupSocket = (server) => {
    io = socketio(server);
    io.on("connection", s => {
        const { latitude, longitude, techs = [""] } = s.handshake.query;
        connections.push({
            id: s.id,
            coordinates: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            },
            techs: parseStringArray(techs)
        })
    });
};
const findConnections = (coordinates, techs) =>
    connections.filter(con => calculateDistace(coordinates, con.coordinates) <= 10
        && (techs.length > 0 ? checkTechs = connection.techs.some(item =>
            techs.includes(item)) : true));

const sendMessage = (to, msg, data) => {
    io.emit("dev-new", "aaa");
}
// to.forEach(element => io.to(element.id).emit(msg, data))

module.exports = {
    setupSocket,
    findConnections,
    sendMessage,
    connections
};