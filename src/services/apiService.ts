import axios from "axios";

export const getParamHistory = async (param_name: string, team_uuid: string = "test-team") => {

  const response = await axios.post("/trpgapi/getParamHistoryByName", {
    team_uuid: team_uuid,
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

export const getSpeechLog = async (team_uuid: string = "test-team") => {
  const response = await axios.post("/trpgapi/getSpeechLog", {
    team_uuid: team_uuid,
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

export const getExecutionLog = async (team_uuid: string = "test-team") => {
  const response = await axios.post("/trpgapi/getExecutionLog", {
    team_uuid: team_uuid,
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.data.data.success === true) {
    return response.data.data.execution_log;
  } else {
    return []
  }
}

export const insertParamHistory = async (param_name: string, param_value: string, team_uuid: string = "test-team") => {
  await axios.post("/trpgapi/insertParamHistory", {
    team_uuid: team_uuid,
    param_name: param_name,
    param_value: param_value,
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};