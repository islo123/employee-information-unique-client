import axios from "axios";
  export const api = axios.create({
    baseURL: "https://employee-information-1234.herokuapp.com/employee"
    //baseURL: "http://localhost:3001/employee"
  })