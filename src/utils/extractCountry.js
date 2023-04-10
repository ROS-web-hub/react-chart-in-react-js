const extractCountry = (arrayData) => {
  const Country = [];
  const Data = [];

  const rowCount = arrayData.Meta[0].DimensionValues.length;
  for (let i = 0; i < rowCount; i++) {
    Country.push(arrayData.Meta[0].DimensionValues[i]);
  }
  const row1 = arrayData.Data.length;

  for (let i = 0; i < row1; i++) {
    const _data = arrayData.Data[i][2][0];
    _data ? Data.push(_data) : Data.push(0);
  }
  return { Data, Country };
};

export default extractCountry;
