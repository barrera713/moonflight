require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const fetch = require("node-fetch");
const SMS = require("./SMS.js");


const Main = async () => {

    let etherUSD;
    let highLimit;
    let lowLimit;
    const fetchEtherPrice = async () => {
        try {
            const response = await fetch(`${process.env.ETH_API}&apikey=${process.env.ES}`)
            const etherData = await response.json();
            etherUSD = etherData.result.ethusd;
        } catch (err) {
            console.log("[Ether ERROR]", err);
        }
    }

    const listenForHighLimit = (etherUSD, highLimit) => {
        // Watch price and send SMS if it meets High or Low price
        if(highLimit !== undefined && parseFloat(etherUSD) >= parseFloat(highLimit)) {
            SMS.sendSMSForHighPrice("Ethereum", etherUSD);
        };
    };

    const listenForLowLimit = (etherUSD, lowLimit) => {
        if(lowLimit !== undefined && parseFloat(etherUSD) <= parseFloat(lowLimit)) {
            SMS.sendSMSForDropPrice("Ethereum", etherUSD);
        };
    };


    setInterval( async () => {
        await fetchEtherPrice();
        listenForHighLimit(etherUSD, highLimit);
        listenForLowLimit(etherUSD, lowLimit);
    
        app.post("/sms", (req, res) => {
            const twiml = new MessagingResponse();
            let responsePrice = req.body.Body.trim().toLowerCase();

            if(responsePrice.indexOf("high") !== -1) {
                console.log("BODY", req.body.Body);
                let sliceAfterHigh = req.body.Body.lastIndexOf("h");
                highLimit = req.body.Body.slice(sliceAfterHigh + 1).trim();
                console.log("HIGH limit", highLimit);
            } else if(responsePrice.indexOf("low") !== -1) {
                let sliceAfterLow = req.body.Body.lastIndexOf("w");
                lowLimit = req.body.Body.slice(sliceAfterLow + 1).trim();
            } else {
                console.log("Reading price...")
            }

            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        });
    
    }, 3000);

    
    http.createServer(app).listen(1337, () => {
        console.log("Express server listening on port 1337");
    });
};

Main();