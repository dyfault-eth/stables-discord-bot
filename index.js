const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const token = process.env.TOKEN
const chanID = process.env.CHANID

var lastModifiedSell = "2023-04-06T11:42:04Z"
var lastModifiedList = "2023-04-06T11:42:04Z"
var lastModifiedCancelList = "2023-04-06T11:42:04Z"

async function fetchSell() {
    try {
        const response = await fetch("https://api.rarible.org/v0.1/activities/byCollection?collection=TEZOS:KT1MQL8VjVQckk5A6uBfN9Qv2YUVJstG1CyH&type=SELL")
        const data = await response.json()
        const lastSell = data.activities[0]

        console.log(lastSell.date, "last sell date")

        if (lastSell.date > lastModifiedSell) {
            lastModifiedSell = lastSell.date
            console.log("last sell date :", lastModifiedSell)

            let mdate = new Date(lastSell.date).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

            let tokenId = lastSell.nft.type.tokenId
            let imgUrl = `https://nft-picture.playstables.io/nft/collection/001/horse/${tokenId}.jpg`

            let embed = new EmbedBuilder()
                .setColor('#24B600')
                .setTitle('New Sales')
                .setDescription('Sales details')
                .addFields(
                    { name: '** **', value: `[Go to marketplace](https://rarible.com/collection/tezos/KT1MQL8VjVQckk5A6uBfN9Qv2YUVJstG1CyH/items)` }, 
                )
                .addFields(
                    { name: 'tx : ', value: `[${lastSell.transactionHash}](https://tzstats.com/${lastSell.transactionHash})` },

                    { name: `from : ${lastSell.seller.substring(6, 11)}...${lastSell.seller.substring(37, 42)}`, value: '** **', inline: true }, 
                    { name: `to : ${lastSell.buyer.substring(6, 11)}...${lastSell.buyer.substring(37, 42)}`, value: '** **', inline: true },

                    { name: `token id : ${tokenId}`, value: '** **' },

                    { name: `Tezos price : ${lastSell.price}xtz`, value: '** **', inline: true }, 
                    { name: `USD price : ${Number(lastSell.priceUsd).toFixed(2)}$`, value: '** **', inline: true },
                )
                .setThumbnail(imgUrl)
                .setFooter({ text: mdate })

            bot.channels.cache.get(chanID).send({
                embeds: [embed]
            })

            console.log("successfully send last sale ---------------------------------------------")

        }
    } catch (error) {
        console.log(error)
    }
}

async function fetchList() {
    try {
        const response = await fetch("https://api.rarible.org/v0.1/activities/byCollection?collection=TEZOS:KT1MQL8VjVQckk5A6uBfN9Qv2YUVJstG1CyH&type=LIST")
        const data = await response.json()
        const lastList = data.activities[0]

        console.log(lastList.date, "last list date")

        if (lastList.date > lastModifiedList) {
            lastModifiedList = lastList.date
            console.log("last list date :", lastModifiedList)

            let mdate = new Date(lastList.date).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

            let tokenId = lastList.make.type.tokenId
            let imgUrl = `https://nft-picture.playstables.io/nft/collection/001/horse/${tokenId}.jpg`

            let embed = new EmbedBuilder()
                .setColor('#CCF000')
                .setTitle('Listing')
                .setDescription('List details')
                .addFields(
                    { name: '** **', value: `[Go to listing](https://rarible.com/collection/tezos/KT1MQL8VjVQckk5A6uBfN9Qv2YUVJstG1CyH/activity?types[]=listing)` }, 
                )
                .addFields(
                    { name: 'tx : ', value: `[${lastList.hash}](https://tzstats.com/${lastList.transactionHash})` }, 
                    { name: `token id : ${tokenId}`, value: '\u200B', inline: true },

                    { name: `maker : ${lastList.maker.substring(6, 11)}...${lastList.maker.substring(37, 42)}`, value: '\u200B', inline: true }, 
                    { name: '\u200B', value: '\u200B', inline: true },

                    { name: `Tezos price : ${lastList.price}xtz`, value: '\u200B', inline: true },
                )
                .setThumbnail(imgUrl)
                .setFooter({ text: mdate })

            bot.channels.cache.get(chanID).send({
                embeds: [embed]
            })

            console.log("successfully send last list ---------------------------------------------")

        }
    } catch (error) {
        console.log(error)
    }
}

/** async function fetchCancelList() {
    try {
        const response = await fetch("https://api.rarible.org/v0.1/activities/byCollection?collection=TEZOS:KT1MQL8VjVQckk5A6uBfN9Qv2YUVJstG1CyH&type=LIST")
        const data = await response.json()
        const lastCancelList = data.activities[0]

        console.log(lastCancelList.date, "last cancel list date")

        if (lastCancelList.date > lastModifiedCancelList) {
            lastModifiedCancelList = lastCancelList.date
            console.log("last cancel list date :", lastModifiedCancelList)

            let mdate = new Date(lastCancelList.date).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

            let tokenId = lastCancelList.make.type.tokenId
            let imgUrl = `https://nft-picture.playstables.io/nft/collection/001/horse/${tokenId}.jpg`

            let embed = new EmbedBuilder()
                .setColor('#DD0000')
                .setTitle('Cancel Listing')
                .setDescription('Cancel List details')
                .addFields(
                    { name: 'tx : ', value: `[${lastCancelList.hash}](https://tzstats.com/${lastCancelList.transactionHash})` }, 
                    { name: `token id : ${tokenId}`, value: '** **', inline: true },

                    { name: `maker : ${lastCancelList.maker.substring(6, 11)}...${lastCancelList.maker.substring(37, 42)}`, value: '** **', inline: true },
                )
                .setThumbnail(imgUrl)
                .setFooter({ text: mdate })

            bot.channels.cache.get(chanID).send({
                embeds: [embed]
            })

            console.log("successfully send last cancel list ---------------------------------------------")

        }
    } catch (error) {
        console.log(error)
    }
} **/

bot.on('ready', async() => {


    setInterval(async function() {
        try {

            console.log("verify last sell stables")
            fetchSell()
            fetchList()
                // fetchCancelList()

        } catch (err) {
            console.log(err);
        }
    }, 60000);

    console.log("discord bot ready");
});

bot.login(token);