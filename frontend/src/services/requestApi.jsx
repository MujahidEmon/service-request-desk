import api from "@/lib/axios";

export const getRequests = async (page = 1, limit = 10) => {
  const response = await api.get("/api/requests", {
    params: {
      page,
      limit
    }
  });
  return response.data;
};

export const getRequestById = async (id) => {
  const response = await api.get(`/api/requests/${id}`);

  return response.data;
};
export const getRequestByStatus = async (status) => {
  const response = await api.get(`/api/requests/`,{params: {status}});

  return response.data;
};


export const updateRequest = async ({ id, data }) => {
  const response = await api.patch(
    `/api/requests/${id}`,
    data
  );

  return response.data;
};


// Add internal note
export const addNote = async ({ id, note }) => {
  const response = await api.post(
    `/api/requests/${id}/notes`,
    {
      note,
    }
  );

  return response.data;
};