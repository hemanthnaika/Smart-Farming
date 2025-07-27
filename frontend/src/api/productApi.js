import axios from "axios";

export const addProduct = async ({ formData, token }) => {
  const formPayload = new FormData();
  for (const key in formData) {
    formPayload.append(key, formData[key]);
  }

  const response = await axios.post(
    "http://localhost:5000/add-product", // change if needed
    formPayload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
