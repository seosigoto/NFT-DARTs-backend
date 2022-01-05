const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const ethers = require("ethers");
const {abi} = require("./app/artifacts/DARTsERC1155.json");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'))
/*const db = require("./app/models");

db.sequelize.sync();*/
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/routes")(app);

const contractAddress = "0xd59C8060AaE114ff8e0f00142c46F364058973F6";
const INFURA_API_KEY = "a4c90e6009f9479589039f807486082c";
const infuraURL = `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`;

const provider = new ethers.providers.InfuraProvider( "rinkeby", INFURA_API_KEY);
const contract = new ethers.Contract(contractAddress, abi, provider);

contract.on("TransferSingle", (operator, from, to, id, amount) => {
  console.log(operator, from, to, id, amount)
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
