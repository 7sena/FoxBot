const Discord = require('discord.js');
const client = new Discord.Client();








const yt = require('ytdl-core');
const ytdl = require('ytdl-core');
const request = require('request');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const fs = require("fs");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";//لا تغيره


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
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
