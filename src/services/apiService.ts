import axios from "axios";

export const getParamHistory = async (param_name: string) => {

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

export const getSpeechLog = async () => {
  const response = await axios.post("/trpgapi/getSpeechLog", {
    team_uuid: "test-team",
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.data.data.success === true) {
    return response.data.data.speech_log;
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