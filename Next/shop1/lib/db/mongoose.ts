const mongoose = require("mongoose");

mongooseConnect().catch((err:any) => console.log(err));

export function mongooseConnect() {
    if (mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    } else {
        const uri = process.env.MONGODB_URI;
        return mongoose.connect(uri);
    }
}