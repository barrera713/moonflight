require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const fetch = require("node-fetch");
const SMS = require("./SMS.js");


const Main = async () => {

    let etherUSD;
    const fetchEtherPrice = async () => {
        try {
            const response = await fetch(`${process.env.ETH_API}&apikey=${process.env.ES}`)
            const etherData = await response.json();
            etherUSD = etherData.result.ethusd;
        } catch (err) {
            console.log("[Ether ERROR]", err)
        }
    }
    await fetchEtherPrice(); // GET Etheruem USD price

    // Watch price and send SMS if it meets High or Low price
    if(parseFloat(etherUSD) > 3400) {
        SMS.sendSMSForHighPrice("Ethereum", etherUSD);
    } else if(parseFloat(etherUSD) < 3400) {
        SMS.sendSMSForDropPrice("Ethereum", etherUSD);
    } else {
        console.log("climbing...")
    };
    
    
    app.post("/sms", (req, res) => {
        const twiml = new MessagingResponse();
        twiml.message("The Robots are coming! Head for the hills!");

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    });
    
    http.createServer(app).listen(1337, () => {
        console.log("Express server listening on port 1337");
    });
};

Main();