import socketio from 'socket.io-client';

const socket = socketio('http://192.168.100.8:8000', {
	autoConnect: false,
});

export function connect(latitude, longitude, techs) {
	socket.io.opts.query = {
		latitude,
		longitude,
		techs,
	};
	socket.connect();
	setupEvents();
}

function setupEvents() {
	socket.on('dev-new', _ => {
		console.log('NEW DEVELOPER');
	});
}

export function disconnect() {
	if (socket.connected) {
		socket.disconnect();
	}
}
