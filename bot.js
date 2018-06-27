const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});
client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Desert Bot- Scrpit By ┃ KillerFox`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Bot By ┃ KillerFox ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(` Bot By KillerFox | ~help `,"http://twitch.tv/S-F")
client.user.setStatus("dnd")
});

client.on('message', message => {
     if (message.content === "~servers") {
     let embed = new Discord.RichEmbed()
  .setColor("#0000FF")
  .addField("**Server: **" , client.guilds.size)
  message.channel.sendEmbed(embed);
    }
if (message.content === '~help') {
              var embed  = new Discord.RichEmbed()
                .addField("**LINKS**" ,":no_entry_sign: تم اضافه منع الروابط :no_entry_sign: ")
				.addField("**Bot**" ," :heart: Bot By KillerFox_:heart: ")
                .addField("broadcast (bc)" ,"**الاستخدام:** ``~broadcast <الرساله> , $bc <الرساله>``")
                .addField("**BAN**" ,"**الاستخدام:** ``~ban <المستخدم>``")
                .addField("**KICK**" ,"**الاستخدام:** ``~kick <المستخدم> ``")
                .addField("**ِAVATAR**" ,"**الاستخدام:** ``~avatar``")
                .addField("**INFO**", "**الأستخدام :** ``~info``")
                .addField("**SAY**" ,"**الاستخدام:** ``~say <الرساله>``")
                .addField("**ID**" ,"**ال��ستخدام:** ``~id``")
                .addField("**SERVER**" ,"**الاستخدام:** ``~server``")
                .addField("**INVITE**" ,"**الاستخدام:** ``~invite <لأضافه البوت لأى سيرفر>``")
                .addField("**SUPPORT**" ,"**الاستخدام:** ``~suppport <سيرفر دعم الفنى>``")
                .addField("**QA**" ,"**الاستخدام:** ``~qa <السؤال>``  ")
                .addField("**CLEAR**" ,"**الاستخدام:** ``~clear <العدد>``")
                .addField("**PING**", "**الأستخدام:** ``~ping``")
                .addField("**SERVERNAME**", "**الأستخدام:** ``~servername``")
                .addField("**CUT_TWEET**", "**الاستخدام** ``~ct``")
                .addField("**TWEET**", "**الاستخدام** ``~tweet <الرساله>``")
                .addField("**NO INVITE LINKE**","تم اضافة خاصية منع الانفيتات ")
                .addField("**LOGIN**" , " تم اضافة خاصية التفعيل لطلب تشغيلها في السيرفر كلم المبيرمجين ")
                .setColor('RANDOM')
.setColor('RANDOM')
  message.author.sendEmbed(embed);
    }
});
client.on('message', message => {
  if(message.content === ('clear')) {
  let modRole = message.guild.roles.find("name", "Admin");
  if (!modRole) return message.reply('You do not have Admin Role'); {
    }
  const params = message.content.split(" ").slice(1)
    let messagecount = parseInt(params[0]);
    message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages));
  }
});
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('discord.gg')){
      if(!message.member.hasPermission('ADMINISTRATOR'))
        message.delete()
    return message.reply(`** No Invite Links :angry: ! **`)
    }
});
client.on('message', msg => {
  if (msg.content === '~invite') {
    msg.reply('https://discordapp.com/api/oauth2/authorize?client_id=460797113643696129&permissions=8&scope=bot');
  }
});
client.on('message', msg => {
  if (msg.content === '~help') {
    msg.reply('**:incoming_envelope: وصلت لك رساله على الخاص**');
  }
});
client.on("message", message => {
    var prefix = "~";
 
            var args = message.content.substring(prefix.length).split(" ");
            if (message.content.startsWith(prefix + "~clear")) {
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('⚠ | ** ما عندك صلاحيه **');
        var msg;
        msg = parseInt();
      
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "Done | تــم",
        color: 0x06DF00,
        description: "تم ازالة جميع رساىل",
        footer: {
          text: "ٍSroryCRaft."
        }
      }}).then(msg => {msg.delete(3000)});
                          }

     
});
// Your Avatar URL!
client.on('message', message => {
    if (message.content === "-Avatar") {
    message.reply(message.author.avatarURL); 
    }
});
client.on('message', msg => {
  if (msg.content === '~suppport') {
    msg.reply('السيرفر للمساعده,https://discord.gg/a5T4zQ');
  }
});
client.on("message", message => {
      if (message.content === "~ping") {
      const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('**Ping:**' , `${Date.now() - message.createdTimestamp}` + ' ms')
  message.channel.send
