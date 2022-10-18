import axios from "axios";
  export const api = axios.create({
    //baseURL: "https://appin-nimi.herokuapp.com/employee"
    baseURL: "http://localhost:3001/employee"
  })