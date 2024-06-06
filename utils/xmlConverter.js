
const js2xmlparser = require("js2xmlparser");

const convertJsonToXml = (json) => {
    return js2xmlparser.parse("movie", json);
};

module.exports = {
    convertJsonToXml
};
