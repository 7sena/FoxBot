const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'hla') {
    	message.channel.send(':heart: هلا بيك منور سيرفرنا :heart:');
  	}
});
client.on('message', message => {
    if (message.content === '$help') {
    	message.channel.send('وصلت لك رساله على خاص :incoming_envelope: ');
  	}
});

client.on('message', message => {
    if (message.content === 'Back') {
    	message.reply(':heart: مرحبا واهلن فيك :heart:');
  	}
});
client.on('message', message => {
    if (message.content === '$server') {
    	message.reply('"SERVER BY" ,":heart: server by KillerFox :heart:"');
  	}
});
client.on('message' , message => {
if (message.content === '$help') {
              var embed  = new Discord.RichEmbed()
                .addField("LINKS" ,":no_entry_sign: تم اضافه منع الروابط :no_entry_sign: ")
                .addField("broadcast (bc)" ,"الاستخدام: $broadcast <الرساله> , $bc <الرساله>")
                .addField("BAN" ,"الاستخدام: $ban <المستخدم>")
                .addField("KICK" ,"الاستخدام: $kick <المستخدم>")
                .addField("ِAVATAR" ,"الاستخدام: $avatar")
                .addField("INFO", "الأستخدام : $info")
                .addField("SAY" ,"الاستخدام: $say <الرساله>")
                .addField("ID" ,"ال��ستخدام: $id")
                .addField("SERVER" ,"الاستخدام: $server")
                .addField("INVITE" ,"الاستخدام: $invite <لأضافه البوت لأى سيرفر>")
                .addField("SUPPORT" ,"الاستخدام: $suppport <سيرفر دعم الفنى>")
                .addField("QA" ,"الاستخدام: $qa <السؤال>  ")
                .addField("CLEAR" ,"الاستخدام: $clear <العدد>")
                .addField("PING", "الأستخدام: $ping")
                .addField("SERVERNAME", "الأستخدام: $servername")
                .addField("CUT_TWEET", "الاستخدام $ct")
                .addField("TWEET", "الاستخدام $tweet <الرساله>")
                .addField("NO INVITE LINKE","تم اضافة خاصية منع الانفيتات ")
                .addField("LOGIN" , " تم اضافة خاصية التفعيل لطلب تشغيلها في السيرفر كلم المبيرمجين ")
                .setColor('RANDOM')
.setColor('RANDOM')
  message.author.sendEmbed(embed);
    }
});
client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "$say") {
   message.channel.sendMessage(args.join("  "))
   message.delete()
  }
 });


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
