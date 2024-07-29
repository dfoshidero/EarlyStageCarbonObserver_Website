// utils.js
export const mapExtractedDataToOptions = (extractedData, optionsJson) => {
  const mappedData = {};

  Object.keys(optionsJson.materials).forEach((category) => {
    Object.keys(optionsJson.materials[category]).forEach((subcategory) => {
      const { name } = optionsJson.materials[category][subcategory];
      mappedData[name] = extractedData[name];
    });
  });

  // Map sectors and sub-sectors
  mappedData[optionsJson.sectors.name] =
    extractedData[optionsJson.sectors.name];
  mappedData[optionsJson.subSectors.name] =
    extractedData[optionsJson.subSectors.name];

  // Map numerical options
  optionsJson.numericalOptions.forEach((option) => {
    mappedData[option] = extractedData[option];
  });

  return mappedData;
};
