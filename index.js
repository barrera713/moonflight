require("dotenv").config();
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

    await fetchEtherPrice();

    if(parseFloat(etherUSD) > 3400) {
        SMS.sendSMSForHighPrice("Ethereum", etherUSD);
    } else if(parseFloat(etherUSD) < 3400) {
        SMS.sendSMSForDropPrice("Ethereum", etherUSD);
    } else {
        console.log("climbing...")
    };    

};

Main();