import axios from "axios";

export const listParam = async (team_uuid: string = "test-team") => {
  
    const response = await axios.post("/trpgapi/listParam", {
      team_uuid: team_uuid
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.data.data.success === true) {
      return response.data.data.param_list;
    } else {
      return []
    }
  }

export const listTeam = async () => {
    
    const response = await axios.post("/trpgapi/listTeam", {
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.data.data.success === true) {
      return response.data.data.team_list;
    } else {
      return []
    }
  }

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

export const insertExecutionLog = async (dataJson: string, template_name:string, template_value:string, model:string, team_uuid: string = "test-team") => {
  await axios.post("/trpgapi/insertExecutionLog", {
    team_uuid: team_uuid,
    channel_id:"test-channel",
    channel_name:"test-channel-name",
    template_name:template_name,
    template_value: template_value,
    data: dataJson,
    model:model,
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}