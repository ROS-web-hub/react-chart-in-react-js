const extractData = (arrayData) => {
  const data1 = [];
  const Time = [];

  const rowCount = arrayData.Meta[0].DimensionValues.length;

  for (let i = 0; i < rowCount; i++) {
    const val = arrayData.Meta[0].DimensionValues[i].DisplayName;
    Time.push(val);
  }

  const row1 = arrayData.Data.length;

  const FSRaw = [];

  for (let i = 0; i < row1; i++) {
    arrayData.Data[i][1][0]
      ? FSRaw.push(arrayData.Data[i][1][0])
      : FSRaw.push(0);
  }

  for (let i = 0; i < Time.length; i++) {
    if (FSRaw[i] !== 0) {
      data1.push({
        date: new Date(Time[i]),
        FSRaw: +FSRaw[i],
      });
    }
  }

  return data1;
};

export default extractData;
