import {type UrlAndInputs} from  './main.js';
const tests:UrlAndInputs[]=[
    {
        baseURL: 'https://leetcode.com',
        method: "GET",
        queryParams: [],
        headers: {},
        body: "",
    },
    {
        baseURL: 'http://localhost:3000',
        method: "GET",
        queryParams: [],
        headers: {},
        body: "",
    },
    {
        baseURL: 'http://localhost:3000/api/v1/mentor/login',
        method: "POST",
        queryParams: [],
        headers: {
            'Content-Type':'application/json'
        },
        body:{
            "name":"XYZ",
            "email":"xyz@gmail.com",
            "empId":"JCE100"
        },
    },
    {
        baseURL: 'http://localhost:3000/api/v1/mentor/login',
        method: "POST",
        queryParams: [],
        headers: {
            'Content-Type':'application/json'
        },
        body:{
            "name":"XYZ",
        },
    },
    {
        baseURL: 'http://localhost:3000/api/v1/mentor/getAllDetails/CA210001',
        method: "GET",
        queryParams: [],
        headers: {},
        body: "",
    },
    {
        baseURL: 'http://localhost:3000/api/v1/mentor/',
        method: "GET",
        queryParams: [],
        headers: {},
        body: "",
    },

]

export default tests;