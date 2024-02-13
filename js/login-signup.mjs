const registerHere = document.querySelector(".register-here");
const loginHere = document.querySelector(".login-here");
const loginContainer = document.querySelector(".login-container");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginBtn = document.querySelector("#login-btn");
const signupContainer = document.querySelector(".signup-container");
const generateOTPBtn = document.querySelector(".generate-otp-btn");
const fullName = document.querySelector("#full-name");
const emailId = document.querySelector("#email");
const passWord = document.querySelector("#password");
const enterOTP = document.querySelector("#enter-otp");
const otpVerifyBtn = document.querySelector("#otp-verify");
const registerBtn = document.querySelector("#register-btn");
let generatedOtp = "";
registerHere.addEventListener("click", () => {
  loginContainer.style.display = "none";
  signupContainer.style.display = "flex";
});
loginHere.addEventListener('click', () => {
    loginContainer.style.display = "flex";
    signupContainer.style.display = "none";
})
generateOTPBtn.addEventListener("click", () => {
  const digits = "0123456789";
  generatedOtp = "";
  for (let i = 0; i < 4; i++)
    generatedOtp += digits[Math.floor(Math.random() * 10)];
  let params = {
    email: emailId.value,
    name: fullName.value,
    otp: generatedOtp,
  };
  emailjs
    .send("service_3bfc5u8", "template_x481qkf", params)
    .then(alert("OTP Sent!"));
});

otpVerifyBtn.addEventListener("click", () => {
  if (generatedOtp === enterOTP.value) {
    otpVerifyBtn.innerText = "Verified";
    otpVerifyBtn.style.backgroundColor = "#65B741";
    otpVerifyBtn.style.color = "#ffffff";
    registerBtn.disabled = false;
  } else {
    alert("Invalid OTP, Enter correct OTP");
    registerBtn.disabled = true;
  }
});

registerBtn.addEventListener("click", () => {
  let obj = {
    name: fullName.value,
    email: emailId.value,
    password: passWord.value,
  };
  let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  registeredUsers.push(obj);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  alert("Registration Successful!");
  signupContainer.style.display = "none";
  loginContainer.style.display = "flex";
});

loginBtn.addEventListener("click", () => {
  let emailId = loginEmail.value;
  let pass = loginPassword.value;
  let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  const index = registeredUsers.findIndex(element => element.email === emailId && element.password === pass);

  if (index >= 0) {
    // let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
    // currentUser[0] = {userEmail: emailId,
    // userName: registeredUsers[index].name};
    localStorage.setItem("currentUser", JSON.stringify([{userEmail: emailId,
      userName: registeredUsers[index].name}]));
    location.href = "../index.html";
  } else alert("Email or Password is wrong...");
  loginEmail.value = '';
  loginPassword.value = '';
});

