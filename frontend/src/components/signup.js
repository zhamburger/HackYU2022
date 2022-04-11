import React, { Component } from "react";
const axios = require('axios');

const addHospital = async () => {
    await axios.post(`10.145.18.64:3000/hospitals/addHospital`, {
        "name" : document.getElementById('hn').value, 
        "email" : document.getElementById('email').value,
        "location" : document.getElementById('address').value,
        "phone" : document.getElementById('phone').value,
        "amountSaved": 0,
        "equipment": []
    }).then(res => {
        alert(res);
    }).catch(err => {
        alert(err);
    })
}


export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Hospital Name</label>
                    <input type="text" id='hn' className="form-control" placeholder="Enter hospital name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" id='email' className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" id='phone' className="form-control" placeholder="Enter phone number" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="address" id='address' className="form-control" placeholder="Enter address" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password"className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" id="subbtn" onClick={addHospital}
                className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}