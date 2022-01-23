
const app = require("./index");
const connect = require("./configs/db");
const port = process.env.PORT || 3000;

const start = async () => {
    try{
        await connect();
    }catch(err){
        console.log(err.message)
    }

    app.listen(port, () => {
        console.log("Listening on port ", port);
    });
};
start();