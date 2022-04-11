import React, { Component } from "react";

const axios = require('axios');

const getHospital = async (i) => {
    console.log("hello");
    try {
        return await axios.get(`10.145.18.64:3000/hospitals/getEmail?email=${i}`);
    } catch(err) {
        console.error(err);
    }
}

export default class Home extends Component {
    render() {
        return (<h1>HospiPAL</h1>);
    }
}
