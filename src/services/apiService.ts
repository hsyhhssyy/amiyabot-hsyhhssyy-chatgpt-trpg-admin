import axios from "axios";

export const getParamHistory = async (param_name: string) => {

  // 计算180天前的日期
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 180);

  // 转换日期为需要的格式（这里是ISO8601）
  const startTimeStr = startDate.toISOString();
  const endTimeStr = endDate.toISOString();

  var query= `/param_history_by_conditions?team_uuid=test-team&param_name=${param_name}&start_time=${startTimeStr}&end_time=${endTimeStr}`

  const response = await axios.post(query);

  if(response.data.data.success===true){
    return response.data.data.param_history;
  }else{
    return []
  }
};

export const saveData = async (data: any) => {
  const response = await axios.post("/your_save_data_endpoint", {
    CreateTime: new Date().toISOString(),
    Data: JSON.stringify(data),
  });
  return response.data;
};