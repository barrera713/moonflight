require("dotenv").config();
const fetch = require("node-fetch");
const accoundSid = process.env.SID;
const AT = process.env.AT;
const client = require("twilio")(accoundSid, AT);


const Main = () => {

    let dogePrice = Number;

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
            
        } catch (err) {
            console.log("[ERROR]", err)
        }
    }
    
    setInterval(fetchDogePrice); // one minute



    const sendSMSForHighPrice = async () => {
        await client.messages
        .create({
            body: `***HIGH price has been met! The current Dogecoin price is at ${dogePrice}`,
            from: '+14053745065',
            to: '+17133736474'
        });
    };

    const sendSMSForDropPrice = async () => {
        await client.messages
        .create({
            body: `###LOW price has been met! The current Dogecoin price is at ${dogePrice}`,
            from: '+14053745065',
            to: '+17133736474'
        });
    };


    if(parseFloat(dogePrice) < 0.55) {
        console.log("less than .5", parseFloat(dogePrice))
        sendSMSForHighPrice();
    } else if(parseFloat(dogePrice) > 0.58) {
        console.log(parseFloat(dogePrice))
        sendSMSForDropPrice();
    } else {
        console.log("climbing or dropping...")
    }
    

};

Main();