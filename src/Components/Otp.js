import React from 'react';



const Otp = ({ verifyNo, otpSubmit, viewOtpForm}) => {
 
    return (<div>
         {!viewOtpForm ? (
        <div className="form-wrapper">
          <form id="loginForm" onSubmit={verifyNo}>
            <div className="input-field">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                autoComplete="false"
              />
            </div>
            <button className="main-button" type="submit" id="sign-in-button">
              Verify Mobile Number
            </button>
          </form>
        </div>
      ) : (
        <div className="form-wrapper" onSubmit={otpSubmit}>
          <form id="otpForm">
            <div className="input-field">
              <label>Enter OTP</label>
              <input
                type="number"
                placeholder="One time password"
                name="otp_value"
                autoComplete="false"
              />
            </div>
            <button className="main-button" type="submit">
              Verify OTP
            </button>
          </form>
        </div>
      )}
    </div>);
}


export default Otp;