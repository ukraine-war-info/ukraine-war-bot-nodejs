const news = require('../ukraine-news/news.js');

async function thingy(client, status) {
    var set = status[Math.floor(Math.random() * status.length)];
    client.user.setActivity(set, { type: "WATCHING" });
    news.getData().then(data => {
        console.log(data);
    });
}

module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        const { status } = require("../config.json");
        //every 1 minute change the status to a random one
        thingy(client, status);
        setInterval(() => {
            thingy(client, status);
        }, 60000);
    },
};

