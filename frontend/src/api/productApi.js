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

export const getSingleProduct = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/all-products/${id}`
  );
  return res.data.product;
};

export const updateProduct = async ({ id, formData, token }) => {
  const data = new FormData();
  for (const key in formData) {
    if (formData[key]) data.append(key, formData[key]);
  }
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/products/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
