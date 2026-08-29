import api from "@/lib/axios";

export const getRequests = async (page = 1, limit = 10, filters = {}) => {
  console.log("🔥 getRequests CALLED");
  console.log("PAGE:", page);
  console.log("LIMIT:", limit);
  console.log("FILTERS:", filters);

  const response = await api.get("/api/requests", {
    params: {
      page,
      limit,
      ...filters,
    },
  });

  console.log("🔥 API RESPONSE:", response.data);

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


export const createRequest = async(data) => {
  const response = await api.post('/api/requests',data)
  return response.data;
}

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