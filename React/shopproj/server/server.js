const express = require("express");
const https = require('https');
const app = express();



const PRINTIFY_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImU1YzlkMDgyNTRiMWUyNmY2YzI4N2YyM2JmZDhhYWRmYzkzYWRlNDhjNDhiM2Q5YTI4YjM3YTYzZDliMDkwMWIxYzE2Yzk1YjFlOGZmZTM3IiwiaWF0IjoxNjg4NDY0OTY3LjYyNzk4NywibmJmIjoxNjg4NDY0OTY3LjYyNzk5MSwiZXhwIjoxNzIwMDg3MzY3LjYxNzM5NCwic3ViIjoiMTMyNjg2NDciLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AcYIBMLyyMlmu7PAtR_saw0B-C1egIQvu3u9I0Suk50c3g4qKmhQwtK8iVd5yMZCr4TKgPHaBb4Z3L5OBVk"
const port = 5000
// SU = standardURL
const SU = "/api"
const SID = 10429257;
let attempts = 0;

app.get(SU, (req, res) => {
   res.status(404).json({error: "could not find route..."})
})

app.get(`${SU}/getshops`, (req, res) => {

    const options = {
        hostname: "api.printify.com",
        path: "/v1/shops.json",
        headers: {
            "Authorization": `Bearer ${PRINTIFY_API_TOKEN}`
        }
    }

    https.get(options, res => {
        let data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : "no response date";
        console.log("status code: " + res.statusCode);
        console.log("Date in response-header: " + headerDate);

        res.on("data", chuck => {
            data.push(chuck);
        });

        res.on("end", () => {
            console.log('Response ended: ');
            const products = JSON.parse(Buffer.concat(data).toString());

            console.log(products)

        }).on('error', err => {
            console.log('Error: ', err.message);
        });

    })

})

app.get(`${SU}/getproducts`, (req, res) => {
    console.log("attempting get request " + attempts);
    attempts += 1;

    const options = {
        hostname: "api.printify.com",
        path: `/v1/shops/${SID}/products.json`,
        headers: {
            "Authorization": `Bearer ${PRINTIFY_API_TOKEN}`
        }
    }

    https.get(options, res => {
        let data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : "no response date";
        console.log("status code: " + res.statusCode);
        console.log("Date in response-header: " + headerDate);

        res.on("data", chuck => {
            data.push(chuck);
        });

        res.on("end", () => {
            console.log('Response ended: ');
            const products = JSON.parse(Buffer.concat(data).toString());

            console.log(products)

        }).on('error', err => {
            console.log('Error: ', err.message);
        });

    })

})

app.listen(port, () => {
    console.log("Server started on port: " + port)
})