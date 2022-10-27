import axios from "axios";
  
  export const api = axios.create({

    //baseURL: "https://employee-information-1234.herokuapp.com/employee"
    baseURL: "https://employye-information-unique.herokuapp.com/api/"
    //baseURL: "http://localhost:3001/api/"
  })