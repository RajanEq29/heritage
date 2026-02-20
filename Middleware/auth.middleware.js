const twilio = require("twilio");



const client = twilio(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);



exports.sendOTP = async (phone) => {
  return client.verify.v2.services(process.env.VERIFY_SERVICE_SID)
    .verifications.create({
      to: phone,
      channel: "sms"
    });
};

exports.checkOTP = async (phone, code) => {
  return client.verify.v2.services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: phone,
      code: code
    });
};