import axios from "axios";

function toLocalISOString(date:Date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export const getParamHistory = async (param_name: string) => {

  // 计算180天前的日期
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 180);

  const startTimeStr = toLocalISOString(startDate);
  const endTimeStr = toLocalISOString(endDate);

  const response = await axios.post("/trpgapi/getParamHistoryByName", {
    team_uuid: "test-team",
    param_name: param_name
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.data.data.success === true) {
    return response.data.data.param_history;
  } else {
    return []
  }
};

export const insertParamHistory = async (param_name: string, param_value: string) => {
  await axios.post("/trpgapi/insertParamHistory", {
    team_uuid: "test-team",
    param_name: param_name,
    param_value: param_value,
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};