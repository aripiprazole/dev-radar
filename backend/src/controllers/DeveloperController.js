const axios = require("axios");
const Developer = require("../models/Developer");
const parseStringArray = require("../utils/parseStringArray");

const { findConnections, sendMessage } = require("../websocket");
// index, show, store, update, destroy

module.exports = {
    store: async (req, res) => {
        const { github_username, techs = "", longitude, latitude } = req.body;
        let developer = await Developer.findOne({ github_username });
        if (!developer) {
            const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
            console.log(apiRes);
            if (apiRes.status === 200) {
                const apiReposRes = await axios.get(`https://api.github.com/users/${github_username}/repos`);
                const data = apiRes.data;
                const reposData = apiReposRes.data;
                let { name = login, avatar_url, bio } = data;
                let techsArray = parseStringArray(techs);
                techsArray = [...techsArray, ...reposData.map(a => a.language)];
                techsArray = techsArray.filter((a, i) => a && techsArray.indexOf(a) === i)
                developer = await Developer.create({
                    github_username,
                    techs: techsArray,
                    name,
                    avatar_url,
                    bio,
                    local: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    }
                });
                const connections = findConnections({
                    latitude,
                    longitude,
                    techs: techsArray
                });
                sendMessage(connections, "dev-new", dev);
            } else {
                return res.status(404).json({
                    ok: false,
                    response: "Do not found developer in github",
                });
            }
        }
        return res.json({
            ok: true,
            response: "Got developer",
            developer
        });
    },
    index: async (req, res) => {
        return res.json({
            ok: true,
            response: "Got all Developers",
            devs: await Developer.find()
        });
    },
    update: async (req, res) => {
        // const { id } = req.

        Developer.updateOne({ _id: { $oid: "" } })
    },
    show: async (req, res) => {

    },
    destroy: async (req, res) => {

    }
};