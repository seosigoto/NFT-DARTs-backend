const moment = require("moment");
const ethers = require("ethers");

const abi = require("../artifacts/DARTsERC1155.json").abi;
const db = require("../models");
const {checkPC, checkAll} = require("./nmap.controller");
const { BAN_COUNT, BAN_TIMER } = require("../config/global.config");
const {Sequelize} = require("sequelize");
const Monitors = db.monitors;
const Configs = db.configs;

// Accept request and compare with current Machine Status
exports.statusChange = async (req, res) => {
    // Validate request
    if (!req.body.data) {
        res.status(400).send({
            message: "Data can not be empty!"
        });
        return;
    }

    try {
        const data = JSON.parse(req.body.data);
        await Promise.all(
            data.map(async (item) => {
                try {
                    await checkIfStatusDiff(item)
                } catch (err) {
                    console.log(err)
                }
            })
        )

        // Check all the active ip address
        /*if (data.length > 1) {
            const activeIPs = await checkAll();
            let unexpectedIPs = [];
            await Promise.all(
                activeIPs.map(async (ip) => {
                    const row = await Monitors.findOne({
                        where: {ip: ip}
                    });
                    if (!row) {
                        unexpectedIPs.push(ip);
                    }
                })
            )
            const exist = await Configs.findOne({
                where: {
                    name: 'unexpected_ips'
                }
            });
            if (exist) {
                await Configs.update(
                    {value: JSON.stringify(unexpectedIPs)},
                    {where: {id: exist.id}}
                )
            } else {
                await Configs.create({
                    value: JSON.stringify(unexpectedIPs),
                    name: 'unexpected_ips'
                })
            }
        }*/

        return res.status(200).send({
            status: true
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            err: err
        })
    }
};

exports.dashboard = async (req, res) => {
    const contractAddress = "0xd59C8060AaE114ff8e0f00142c46F364058973F6";
    const INFURA_API_KEY = "a4c90e6009f9479589039f807486082c";
    const infuraURL = `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`;

    const provider = new ethers.providers.WebSocketProvider(infuraURL, "rinkeby");
    const contract = new ethers.Contract(contractAddress, abi, provider);

    contract.on("TransferSingle", (operator, from, to, id, amount) => {
        console.log(operator, from, to, id, amount)
    });

    res.render('index', {
        data: ''
    })
};
