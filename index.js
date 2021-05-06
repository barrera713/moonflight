require("dotenv").config();
const fetch = require("node-fetch");
const SMS = require("./SMS.js");


const Main = () => {

    let etherPriceUSD;
    const fetchEtherPrice = async () => {
        try {
            const response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ES}`)
            const etherData = await response.json();
            etherPriceUSD = etherData.result.ethusd;

            console.log(etherPriceUSD)

            if(parseFloat(etherPriceUSD) > 3600) {
                SMS.sendSMSForHighPrice(etherPriceUSD);
            } else if(parseFloat(etherPriceUSD) < 3500) {
                SMS.sendSMSForDropPrice(etherPriceUSD);
            } else {
                console.log("Scanning...")
            };

        } catch (err) {
            console.log("[Ether ERROR]", err)
        }
    }

    fetchEtherPrice();
};

Main();