const express = require("express");
const cors = require("cors");
const https = require('https');
const app = express();

const PRINTIFY_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImNkYzdiZGZjNDYxMDg4OWE3OWM3NzU2ODA0MDUxZjljMjU3OWQwOTdiMTM2NTk5YjY2OTFmZDg2M2EzNDhlOTE2MThjMjY2MDcxMDc1ODVkIiwiaWF0IjoxNjk1MTUwOTY5LjIwMDcxNywibmJmIjoxNjk1MTUwOTY5LjIwMDcyMSwiZXhwIjoxNzI2NzczMzY5LjE3NjA1OSwic3ViIjoiMTMyNjg2NDciLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AMjsPiCzxEwCU8lbQJmlzwzaji8-IiBb4xHZLsr2zYH_h3ecEtpjLkoG0MCvZlBENN3V75-r_V15Q-3Her8"
const port = 5000
// server_url_starter = standardURL
const server_url_starter = "/api"
const shop_id = 10429257;
let attempts = 0;

let lastUpdate;
let lastContent;

/* 
    What we need here
    1. Push function
    2. Error function (products that are not properly responding)
*/

app.use(cors());

app.get(server_url_starter, (req, res) => {
   res.status(404).json({error: "could not find route..."})
})

app.get(`${server_url_starter}/getshops`, (req, res) => {

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

app.get(`${server_url_starter}/getproducts`, (req, response) => {
    console.log("attempting get request " + attempts);
    attempts += 1;
    
    console.log(lastUpdate)

    const today = new Date();
    const diffTime = Math.abs(today - lastUpdate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
   
    console.log(diffDays)

    if (diffDays > 1 || lastUpdate == undefined) {
        const options = {
            hostname: "api.printify.com",
            path: `/v1/shops/${shop_id}/products.json`,
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
                console.log('Responded with: new');
                console.log('Response ended: ');
                const products = JSON.parse(Buffer.concat(data).toString());
                
                lastContent = products;
                lastUpdate = today;
                response.status(200).json({message: "api successfully retrieved products", body: products})
    
            }).on('error', err => {
                console.log('Error: ', err.message);
            });
    
        })
    } else {
        console.log('Responded with: old');
        console.log('Response ended: ');
        response.status(200).json({message: "server_url_starterccessfully retrieved products", body: lastContent})
    }   

})

app.get(`${server_url_starter}/getproduct/:id`, (req, response) => {
    console.log("attempting get request on ID: " + req.url.split("/")[3]);
    
        const options = {
            hostname: "api.printify.com",
            path: `/v1/shops/${shop_id}/products/${req.url.split("/")[3]}.json`,
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
                console.log('Responded with: new');
                console.log('Response ended: ');
                const product = JSON.parse(Buffer.concat(data).toString());
                
                response.status(200).json({message: "api successfully retrieved product: " + req.url.split("/")[3], body: product})
    
            }).on('error', err => {
                console.log('Error: ', err.message);
            });
    
        })
})

// Temporary to get them colors
app.get(`${server_url_starter}/getcolors`, (req, response) => {
    console.log("attempting get request " + attempts);
    attempts += 1;

    const options = {
        hostname: "api.printify.com",
        path: `/v1/shops/13430543/products.json`,
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
            console.log('Responded with: new');
            console.log('Response ended: ');
            const products = JSON.parse(Buffer.concat(data).toString());
            
            response.status(200).json({message: "api successfully retrieved products", body: products})
    
        }).on('error', err => {
            console.log('Error: ', err.message);
        });
    
    })

})

app.get(`${server_url_starter}/getcolor/:id`, (req, response) => {
    console.log("attempting get request on ID: " + req.url.split("/")[3]);
    
        const options = {
            hostname: "api.printify.com",
            path: `/v1/shops/13430543/products/${req.url.split("/")[3]}.json`,
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
                console.log('Responded with: new');
                console.log('Response ended: ');
                const product = JSON.parse(Buffer.concat(data).toString());
                
                response.status(200).json({message: "api successfully retrieved product: " + req.url.split("/")[3], body: product})
    
            }).on('error', err => {
                console.log('Error: ', err.message);
            });
    
        })
})
// Temporary End

app.get(`${server_url_starter}/getprovider/:id`, (req, response) => {
    console.log("attempting get request on ID: " + req.url.split("/")[3]);
    
        const options = {
            hostname: "api.printify.com",
            path: `/v1/catalog/print_providers/${req.url.split("/")[3]}.json`,
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
                console.log('Responded with: new');
                console.log('Response ended: ');
                const product = JSON.parse(Buffer.concat(data).toString());
                
                response.status(200).json({message: "api successfully retrieved product: " + req.url.split("/")[3], body: product})
    
            }).on('error', err => {
                console.log('Error: ', err.message);
            });
    
        })

})

app.get(`${server_url_starter}/getblueprint/:bid/:pid`, (req, response) => {
    console.log("attempting get request on ID: " + req.url.split("/")[3]);
        console.log(req.url.split("/")[4])
        const options = {
            hostname: "api.printify.com",
            path: `/v1/catalog/blueprints/${req.url.split("/")[3]}/print_providers/${req.url.split("/")[4]}/variants.json`,
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
                console.log('Responded with: new');
                console.log('Response ended: ');
                const product = JSON.parse(Buffer.concat(data).toString());
                
                response.status(200).json({message: "api successfully retrieved product: " + req.url.split("/")[3], body: product})
    
            }).on('error', err => {
                console.log('Error: ', err.message);
            });
    
        })

})

app.get(`${server_url_starter}/getproviders`, (req, response) => {
    console.log("attempting get request on ID: " + req.url.split("/")[3]);
    
        const options = {
            hostname: "api.printify.com",
            path: `/v1/catalog/print_providers.json`,
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
                console.log('Responded with: new');
                console.log('Response ended: ');
                const product = JSON.parse(Buffer.concat(data).toString());
                
                response.status(200).json({message: "api successfully retrieved product: " + req.url.split("/")[3], body: product})
    
            }).on('error', err => {
                console.log('Error: ', err.message);
            });
    
        })
})

app.listen(port, () => {
    console.log("Server started on port: " + port)
})