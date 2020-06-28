const axios = require("axios");
const Developer = require("../models/Developer");
const parseStringArray = require("../utils/parseStringArray");

module.exports = {
    index: async (req, res) => {
        const { techs, longitude, latitude } = req.query;
        const techsArray = parseStringArray(techs);
        console.log(techsArray);
        const query = {
            local: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        };
        if (techsArray.length > 0) {
            query.techs = {
                $in: techsArray
            };
        }
        const devs = await Developer.find(query);
        return res.json({ ok: true, devs });
    }
}