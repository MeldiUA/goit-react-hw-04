import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com';


export const fetchPhotos = async (searchQuery = "cat", page = 1) => {
  const response = await axios.get('/search/photos',  {
    params: {
      query: searchQuery,
      hitsPerPage: 40,
      page,
    },
    headers: {
      Authorization: `Client-ID ${'1UvsKddDZDxM7tNbfsbsuVD6qLPhsx2sWn6Dwvd2CpY'}`
    }
  });
  return response.data.results;
};