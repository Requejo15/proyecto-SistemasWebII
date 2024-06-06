const xmlbuilder = require("xmlbuilder");

function convertJsonToXml(jsonData) {
  // Crear un nuevo documento XML
  const root = xmlbuilder.create("data");

  // Función recursiva para manejar los valores anidados
  const addElement = (parent, key, value) => {
    if (Array.isArray(value)) {
      const arrayElement = parent.ele(key);
      value.forEach((item) => {
        addElement(arrayElement, "item", item);
      });
    } else if (typeof value === "object") {
      const objectElement = parent.ele(key);
      for (const innerKey in value) {
        if (value.hasOwnProperty(innerKey)) {
          addElement(objectElement, innerKey, value[innerKey]);
        }
      }
    } else {
      parent.ele(key, value);
    }
  };

  // Recorrer el objeto JSON y agregar elementos al documento XML
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      addElement(root, key, jsonData[key]);
    }
  }

  // Finalizar y obtener el XML como cadena
  const xmlString = root.end({ pretty: true });

  return xmlString;
}

module.exports = { convertJsonToXml };
