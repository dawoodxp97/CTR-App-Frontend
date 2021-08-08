import axios from "axios";

const instance = axios.create({
  baseURL: "https://ctr-backend.herokuapp.com/",
});

export default instance;
