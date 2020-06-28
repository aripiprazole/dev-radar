module.exports = (arrayAsString) => {
    return (arrayAsString).split(",").map(tech => tech.trim()).filter(tech => tech.toString().length > 0);
};