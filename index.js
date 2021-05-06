require("dotenv").config();
const fetch = require("node-fetch");
const accoundSid = process.env.SID;
const AT = process.env.AT;
const client = require("twilio")(accoundSid, AT);


const Main = () => {

    let etherPriceUSD;
    const fetchEtherPrice = async () => {
        try {
            const response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ES}`)
            const etherData = await response.json();
            etherPriceUSD = etherData.result.ethusd;
            console.log(etherPriceUSD)
        } catch (err) {
            console.log("[Ether ERROR]", err)
        }
    }
    fetchEtherPrice();

    // let dogePrice;

    // const fetchDogePrice = async () => {
    //     try {
    //         const getData = await fetch("https://sochain.com//api/v2/get_price/DOGE/USD");
    //         /*
    //             EJECT PRICE from response

    //             API returns price from two indices.
    //             Randomly one of these returns 0.0 
    //             while the other returns the actual price
    //         */
    //         const dogeObject = await getData.json();
    //         if(parseFloat(dogeObject.data.prices[0].price) !== 0.0) {
    //             dogePrice = dogeObject.data.prices[0].price
    //         } else {
    //             dogePrice = dogeObject.data.prices[1].price;
    //         };


    //         if(parseFloat(dogePrice) > 0.55) {
    //             sendSMSForHighPrice();
    //         } else if(parseFloat(dogePrice) < 0.55) {
    //             sendSMSForDropPrice();
    //         } else {
    //             console.log("climbing...")
    //         };
            
    //     } catch (err) {
    //         console.log("[ERROR]", err)
    //     }
    // }

    // // setInterval(fetchDogePrice); // one minute
    // fetchDogePrice();
    // const sendSMSForHighPrice = async () => {
    //     try {
    //         await client.messages
    //         .create({
    //             body: `***HIGH*** price has been met! The current Dogecoin price is at ${dogePrice}`,
    //             from: process.env.clientNum,
    //             to: process.env.myNum
    //         });
    //     } catch (err) {
    //         console.log("[SMS High Error]", err)
    //     };
    // };

    // const sendSMSForDropPrice = async () => {
    //     try {
    //         await client.messages
    //         .create({
    //             body: `###LOW### price has been met! The current Dogecoin price is at ${dogePrice}`,
    //             from: process.env.clientNum,
    //             to: process.env.myNum
    //         });
    //     } catch (err) {
    //         console.log("[SMS Drop Error]", err)
    //     }
    // };
};

Main();