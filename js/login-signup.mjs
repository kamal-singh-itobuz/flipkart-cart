const registerHere = document.querySelector('.register-here');
const loginContainer = document.querySelector('.login-container');
const signupContainer = document.querySelector('.signup-container');
const generateOTPBtn = document.querySelector('.generate-otp-btn');
const fullName = document.querySelector('#full-name');
const emailId = document.querySelector('#email');
registerHere.addEventListener('click', () => {
    loginContainer.style.display = "none";
    signupContainer.style.display = "flex";
});

// document.getElementById("myForm")
//         .addEventListener("submit", function (event) {
//           event.preventDefault();

//           const serviceID = "service_3bfc5u8";
//           const templateID = "template_x481qkf";

//           emailjs.sendForm(serviceID, templateID, this).then(
//             (response) => {
//               console.log("SUCCESS!", response.status, response.text);
//               alert("SUCCESS!");
//             },
//             (error) => {
//               console.log("FAILED...", error);
//               alert("FAILED...", error);
//             }
//           );
//         });
