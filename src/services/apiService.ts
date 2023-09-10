import axios from "axios";

export const fetchData = async () => {
  const response = await axios.get("/your_api_endpoint");
  return response.data;
};

export const saveData = async (data: any) => {
  const response = await axios.post("/your_save_data_endpoint", {
    CreateTime: new Date().toISOString(),
    Data: JSON.stringify(data),
  });
  return response.data;
};