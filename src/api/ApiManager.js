import axios from 'axios';

const GetAPI = async (authToken, url) => {
  return await axios.get(url, {
    headers: {authorization: authToken},
  });
};

const PostAPI = async (authToken, mplayload, url) => {
  return await axios.post(url, mplayload, {
    headers: {authorization: authToken},
  });
};

const PutAPI = async (authToken, mplayload, url) => {
  return await axios.put(url, mplayload, {
    headers: {authorization: authToken},
  });
};

export default {GetAPI, PostAPI, PutAPI};
