const i18n = require("../util/i18n");


module.exports = {
    name:"leave",
    description: i18n.__("leave.description"),
    aliases: ["le"],
    execute(message){
        try{
            const {channel } = message.member.voice
            channel.leave();
        } catch (error){
            message.channel.send(i18n.__mf("leave.errorNotInVC", { author: message.author}));
        }   
    }
}