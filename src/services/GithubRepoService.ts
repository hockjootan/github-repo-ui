import axios from "axios";

export const getGithubRepo = () => {
  return axios
    .get("https://api.github.com/repositories")
    .then((response) => response.data)
    .catch((error) => {
      // handle error
      return error;
    });
};
