const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const i18n = require("../util/i18n");
const getArtistTitle = require('get-artist-title')

const Genius = require("genius-lyrics")
const Client = new Genius.Client("bL3hg_iUNFVu2ZbA-aWIdDk71cvclyS0T_wius9w2bJoaf30XcoZ7rystCLtcRBA")

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: i18n.__("lyrics.description"),
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(i18n.__("lyrics.errorNotQueue")).catch(console.error);
    var lyrics = null;
    let [artist, title] = getArtistTitle(queue.songs[0].title)
    for(let i = 0; i < 5; i++){
      try{ 
        const searches = await Client.songs.search(title);
        console.log(searches);
    
        const song = searches[0];
        console.log(song);
        lyrics = await song.lyrics(); 
        break
      } catch (error){
        console.log(error)
        if(i != 4){
        console.log("error");
        continue
        } else{
          lyrics = "No lyrics were found"
        }
      }
    }
    
    

    

    // try {
      
    //   if (!lyrics) lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    // } catch (error) {
    //   lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    // }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("lyrics.embedTitle", { title: title }))
      .setDescription(lyrics)
      .setColor("#FFF")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    lyrics = null;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
