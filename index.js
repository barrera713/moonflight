const fetch = require("node-fetch");

const Main = () => {


    const fetchDogePrice = async () => {

        let dogePrice = Number;

        try {
            const getData = await fetch("https://sochain.com//api/v2/get_price/DOGE/USD");
            /*
                API returns price from two indices
                randomly one of these returns 0.0 
                while the other returns the actual price
            */

            const dogeObject = await getData.json();

            console.log(dogeObject.data.prices[0].price)

            if(parseFloat(dogeObject.data.prices[0].price) !== 0.0) {
                dogePrice = dogeObject.data.prices[0].price
            } else {
                dogePrice = dogeObject.data.prices[1].price;
            };
            
            console.log("[PRICE] => ", parseFloat(dogePrice));

        } catch (err) {
            console.log("[ERROR]", err)
        }
    }

    setInterval(fetchDogePrice, 60000); // one minute
};

Main();