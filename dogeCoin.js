require("dotenv").config();
const fetch = require("node-fetch");
const SMS = require("./SMS.js");


const Main = () => {

    let dogePrice;
    const fetchDogePrice = async () => {
        try {
            const getData = await fetch("https://sochain.com//api/v2/get_price/DOGE/USD");
            /*
                EJECT PRICE from response

                API returns price from two indices.
                Randomly one of these returns 0.0 
                while the other returns the actual price
            */
            const dogeObject = await getData.json();
            if(parseFloat(dogeObject.data.prices[0].price) !== 0.0) {
                dogePrice = dogeObject.data.prices[0].price
            } else {
                dogePrice = dogeObject.data.prices[1].price;
            };


            if(parseFloat(dogePrice) > 0.55) {
                SMS.sendSMSForHighPrice("Dogecoin", dogePrice);
            } else if(parseFloat(dogePrice) < 0.55) {
                SMS.sendSMSForDropPrice("Dogecoin", dogePrice);
            } else {
                console.log("climbing...")
            };
            
        } catch (err) {
            console.log("[ERROR]", err)
        }
    }
    fetchDogePrice();
};

Main();