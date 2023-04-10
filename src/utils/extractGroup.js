const extractGroup = (arrayData) => {
  var measure_group_list = arrayData.Data[0][0][0].split(",");
  var measures_LS = arrayData.Data[0][1][0].split(",");
  var measures_groups_API = arrayData.Data[0][2][0].split(",");
  var measures_URL = arrayData.Data[0][3][0].split(",");

  let measure_group = {};
  let URL_map = {};
  let measures_map = {};
  let MG = [];

  for (let i = 0; i < measures_LS.length; i++) {
    measures_map[measures_groups_API[i]] = measures_LS[i];
  }

  for (let i = 0; i < measures_groups_API.length; i++) {
    URL_map[measures_groups_API[i]] = measures_URL[i];
  }

  for (let i = 0; i < measure_group_list.length; i++) {
    if (!measure_group[measure_group_list[i]]) {
      measure_group[measure_group_list[i]] = [];
    }
    measure_group[measure_group_list[i]].push(measures_groups_API[i]);
  }

  Object.keys(measure_group).forEach((key) => {
    let options = [];
    for (let i = 0; i < measure_group[key].length; i++) {
      options.push({
        value: i,
        label: measure_group[key][i],
        url: URL_map[measure_group[key]],
      });
    }
    MG.push({
      label: key,
      options: options,
    });
  });
  return MG;
};

export default extractGroup;
