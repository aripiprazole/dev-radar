const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const developerSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    local: {
        type: PointSchema,
        index: "2dsphere"
    }
});

module.exports = mongoose.model("Developer", developerSchema);