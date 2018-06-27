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
client.on('ready', function() {
	console.log(`i am ready ${client.user.username}`);
});








/*
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
*/
var servers = [];
var queue = [];
var guilds = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];
var now_playing = [];
/*
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
*/
client.on('ready', () => {});
console.log("Logged")
var download = function(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

client.on('message', function(message) {
	const member = message.member;
	const mess = message.content.toLowerCase();
	const args = message.content.split(' ').slice(1).join(' ');

	if (mess.startsWith('-play')) {
		if (!message.member.voiceChannel) return message.reply('** You Are Not In VoiceChannel **');
		// if user is not insert the URL or song title
		if (args.length == 0) {
			let play_info = new Discord.RichEmbed()
				.setAuthor(client.user.username, client.user.avatarURL)
				.setDescription('**قم بوضع الرابط , او  الاسم**')
			message.channel.sendEmbed(play_info)
			return;
		}
		if (queue.length > 0 || isPlaying) {
			getID(args, function(id) {
				add_to_queue(id);
				fetchVideoInfo(id, function(err, videoInfo) {
					if (err) throw new Error(err);
					let play_info = new Discord.RichEmbed()
						.setAuthor("أضيف إلى قائمة الانتظار", message.author.avatarURL)
						.setDescription(`**${videoInfo.title}**`)
						.setColor("RANDOM")
						.setFooter('Requested By:' + message.author.tag)
						.setImage(videoInfo.thumbnailUrl)
					//.setDescription('?')
					message.channel.sendEmbed(play_info);
					queueNames.push(videoInfo.title);
					// let now_playing = videoInfo.title;
					now_playing.push(videoInfo.title);

				});
			});
		}
		else {

			isPlaying = true;
			getID(args, function(id) {
				queue.push('placeholder');
				playMusic(id, message);
				fetchVideoInfo(id, function(err, videoInfo) {
					if (err) throw new Error(err);
					let play_info = new Discord.RichEmbed()
						.setAuthor(`Added To Queue`, message.author.avatarURL)
						.setDescription(`**${videoInfo.title}**`)
						.setColor("RANDOM")
						.setFooter('بطلب من: ' + message.author.tag)
						.setThumbnail(videoInfo.thumbnailUrl)
					//.setDescription('?')
					message.channel.sendEmbed(play_info);
				});
			});
		}
	}
	else if (mess.startsWith('-skip')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':gear: **تم التخطي**').then(() => {
			skip_song(message);
			var server = server = servers[message.guild.id];
			if (message.guild.voiceConnection) message.guild.voiceConnection.end();
		});
	}
	else if (message.content.startsWith('-vol')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		// console.log(args)
		if (args > 100) return message.reply(':x: **100**');
		if (args < 1) return message.reply(":x: **1**");
		dispatcher.setVolume(1 * args / 50);
		message.channel.sendMessage(`Volume Updated To: **${dispatcher.volume*50}**`);
	}
	else if (mess.startsWith('-pause')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':gear: **تم الايقاف مؤقت**').then(() => {
			dispatcher.pause();
		});
	}
	else if (mess.startsWith('-unpause')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':gear: **تم اعاده التشغيل**').then(() => {
			dispatcher.resume();
		});
	}
	else if (mess.startsWith('-stop')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':name_badge: **تم الايقاف**');
		var server = server = servers[message.guild.id];
		if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
	}
	else if (mess.startsWith('-join')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.member.voiceChannel.join().then(message.react('✅'));
	}
	else if (mess.startsWith('-play')) {
		getID(args, function(id) {
			add_to_queue(id);
			fetchVideoInfo(id, function(err, videoInfo) {
				if (err) throw new Error(err);
				if (!message.member.voiceChannel) return message.reply('**عفوا, انت غير موجود في روم صوتي**');
				if (isPlaying == false) return message.reply(':x:');
				let playing_now_info = new Discord.RichEmbed()
					.setAuthor(client.user.username, client.user.avatarURL)
					.setDescription(`**${videoInfo.title}**`)
					.setColor("RANDOM")
					.setFooter('Requested By:' + message.author.tag)
					.setImage(videoInfo.thumbnailUrl)
				message.channel.sendEmbed(playing_now_info);
				queueNames.push(videoInfo.title);
				// let now_playing = videoInfo.title;
				now_playing.push(videoInfo.title);

			});

		});
	}

	function skip_song(message) {
		if (!message.member.voiceChannel) return message.reply('**عفوا, انت غير موجود في روم صوتي**');
		dispatcher.end();
	}

	function playMusic(id, message) {
		voiceChannel = message.member.voiceChannel;


		voiceChannel.join().then(function(connectoin) {
			let stream = ytdl('https://www.youtube.com/watch?v=' + id, {
				filter: 'audioonly'
			});
			skipReq = 0;
			skippers = [];

			dispatcher = connectoin.playStream(stream);
			dispatcher.on('end', function() {
				skipReq = 0;
				skippers = [];
				queue.shift();
				queueNames.shift();
				if (queue.length === 0) {
					queue = [];
					queueNames = [];
					isPlaying = false;
				}
				else {
					setTimeout(function() {
						playMusic(queue[0], message);
					}, 500);
				}
			});
		});
	}

	function getID(str, cb) {
		if (isYoutube(str)) {
			cb(getYoutubeID(str));
		}
		else {
			search_video(str, function(id) {
				cb(id);
			});
		}
	}

	function add_to_queue(strID) {
		if (isYoutube(strID)) {
			queue.push(getYoutubeID(strID));
		}
		else {
			queue.push(strID);
		}
	}

	function search_video(query, cb) {
		request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
			var json = JSON.parse(body);
			cb(json.items[0].id.videoId);
		});
	}


	function isYoutube(str) {
		return str.toLowerCase().indexOf('youtube.com') > -1;
	}
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
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'هلا') {
              message.channel.send(':heart: هلا فيك :heart:');
              message.channel.sendFile("./photoshop.PNG");
               

            }
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === '~server') {
              message.channel.send('***:heart:*** **Server By KillerFox** ***:heart:***');
              message.channel.sendFile("./photoshop.PNG");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'hla') {
              message.channel.send('**:heart: hla fek :heart:**');
              message.channel.sendFile("./photoshop.PNG");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === '~bot') {
              message.channel.send('***:heart:*** **Bot By KillerFox** ***:heart:***');
              message.channel.sendFile("./photoshop.PNG");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'KillerFox_') {
              message.channel.send('**:heart: حالين مشغول بس يكمل يرد:heart:** ');
              message.channel.sendFile("./photoshop.PNG");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'السلام عليكم ') {
              message.channel.send('**:heart: وعليكم السلام حبي:heart:**');
              message.channel.sendFile("./photoshop.PNG");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'باي') {
              message.channel.send('**:heart: لله معاك :heart:**');
              message.channel.sendFile("https://lyrics-words.co/wp-content/uploads/2016/07/20160727-179.gif");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'برب') {
              message.channel.send('**:heart: الله معاك :heart:** ');
              message.channel.sendFile("https://lyrics-words.co/wp-content/uploads/2016/07/20160727-179.gif");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'brb') {
              message.channel.send('**:heart: الله معاك :heart:**');
              message.channel.sendFile("https://lyrics-words.co/wp-content/uploads/2016/07/20160727-179.gif");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'hi') {
              message.channel.send('**:heart: Welcome :heart:**');
              message.channel.sendFile("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KNSG9XDY6qOJ8G8IRcLiIUDD-dCY7wCzKwIs8Idi5Y55qOxGgg");
               

            }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === '~Dev') {
              message.channel.send('***:heart:*** **Dev Server KillerFox** ***:heart:***');
              message.channel.sendFile("./photoshop.PNG");
               

            }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
