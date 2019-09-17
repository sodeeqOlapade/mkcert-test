const express = require("express");
const bodyParser = require("body-parser");
const mkcert = require("mkcert");
const https = require("https");
const sn = require("serial-number");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use("/", (req, res) => {
  res.json({ msg: "welcome" });
});

const options = {
  key: fs.readFileSync("./keys/localhost+1-key.pem"),
  cert: fs.readFileSync("./keys/localhost+1.pem")
};

// async function genCert() {
//   try {
//     const ca = await mkcert.createCA({
//       organization: "Hello CA",
//       countryCode: "NP",
//       state: "Bagmati",
//       locality: "Kathmandu",
//       validityDays: 365
//     });

//     // console.log("KEY: ", ca.key);
//     // console.log("CERT: ", ca.cert);

//     const cert = await mkcert.createCert({
//       domains: ["127.0.0.1", "localhost"],
//       validityDays: 365,
//       caKey: ca.key,
//       caCert: ca.cert
//     });

//     const fullCertChain = `${cert.cert}\n${ca.cert}`;
//     const opt = {};

//     // console.log("key: ", cert.key);
//     // console.log("cert: ", cert.cert);

//     console.log(fullCertChain);
//     https.createServer(fullCertChain, app).listen(3000, (req, res) => {
//       console.log("app running on 3000");
//     });
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// }

// genCert();

sn((err, val) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log("SN: ", val);
});

https.createServer(options, app).listen(3000, (req, res) => {
  console.log("app running on 3000");
});
