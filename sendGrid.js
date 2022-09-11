const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    to: "test@example.com",
    from: "katotoka1985@gmail.com",
    subject: "Sending with sendGrid is fun",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};
console.log(email);
sgMail.send(email)
  .then(() => console.log("Email was sending with success"))
  .catch(error => console.error(error));