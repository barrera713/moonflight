const accoundSid = process.env.SID;
const AT = process.env.AT;
const client = require("twilio")(accoundSid, AT);


exports.sendSMSForHighPrice = async (payload) => {
    try {
        await client.messages
        .create({
            body: `***HIGH*** price has been met! The current Ethereum price is at ${payload}`,
            from: process.env.clientNum,
            to: process.env.myNum
        });
    } catch (err) {
        console.log("[SMS High Error]", err)
    };
};

exports.sendSMSForDropPrice = async (payload) => {
    try {
        await client.messages
        .create({
            body: `###LOW### price has been met! The current Ethereum price is at ${payload}`,
            from: process.env.clientNum,
            to: process.env.myNum
        });
    } catch (err) {
        console.log("[SMS Drop Error]", err)
    };
};
