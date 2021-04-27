const fetch = require("node-fetch");

const testing = async () => {

    try {
        const getData = await fetch("https://sochain.com//api/v2/get_price/DOGE/USD");
        const json = await getData.json();
        console.log(json.data.prices[0].price)
    } catch (err) {
        console.log(err)
    }
};

testing();