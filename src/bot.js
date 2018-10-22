/*
* Oliy Simulator
* A quick, five minute gimmick put together by Blake.

* This code is absolutely attrocious.
* If someone is looking through my GitHub profile or stumbled upon this somehow, please venture carefully 
* and know that I do in fact write better code than this.
*/

const Discord = require('discord.js');
const events = ['MESSAGE_CREATE', 'READY', 'GUILD_CREATE', 'GUILD_DELETE']
const disabledEvents = Object.keys(Discord.Constants.WSEvents).filter(i => !events.includes(i))
const client = new Discord.Client({
	messageCacheMaxSize: 0,
	messageCacheLifetime: 0,
	messageSweepInterval: 60,
	disableEveryone: true,
	disabledEvents
});
const config = require('./config.json')
const { inspect } = require('util')

const OLIY_RESPONSES = [
	`I love you {author}`,
	'I\'ll have you know that was very legal',
	`You meme, get out of {channelname}`,
	`Certification Warning\n{author} - Violating certification requirements \`Informative use of the short and long description\`. 1/3`,
	'kk',
	'dumb',
	'not accurate',
	'Please email business@discordbots.org.',
	'https://imgur.com/1w9N5ni',
	'What the fuck',
	'We\'ve decided to put a very minimal amount of ads on the site to make up for that.',
	'I am a busy man',
	'Please report that to the issues repo',
	`Yea I'll give it a {random}/10, losing {remainder} points for wasting your life`,
	'Don\'t bother e-mailing me about it, do you know many many e-mails I get? :triumph:',
	'ye',
	'nah',
	'Russians ruin everything',
	'heck',
	`{author} you're right`,
	'Yea it\'s weird',
	'hmmmm',
	'this ain\'t it chief',
	'k',
	'it\'s not math',
	'You\'re probably just doing it wrong',
	'okay i have noted down your opinion in depth',
	'thats been noted',
	'mhm',
	'read it yourself kiddo',
	'you\'re going down the right route for a mute sir',
	'I already service discord running dbl probably more than I would if I was employed at discord',
	'So many discordians rely on DBL as a service',
	'complain to my tour manager',
	'android is better',
	'that sounds expensive and not that fun',
	'idk if you like my taste',
	`Do I see shitpost in {channelname}`,
	'Hello I have been summoned',
	'Can we turn the toxicity down thank you xoxo',
	'I\'ll remove your cert'
]
const FEELINGS = [
	'bad',
	'not so good',
	'better',
	'pretty shit',
	'like it needs more OOMPH',
	'like it needs more BUSINESS',
	'pretty bland, needs more ads',
	'bad, but adding a donate button might help that',
	'alright',
	'good',
	'not shit',
	'not worth my time'
]
const PREFIX = 'oliy';

client.login(config.token)
	.then(() => {
		client.users.sweep(u => u);
		setInterval(() => client.users.sweep(u => u), 5e5);
	});

client.on('message', (msg) => {
	if (msg.author.bot) return;
	if (msg.content.startsWith('<@500954344510980136>')) return msg.channel.send('don\'t tag me for that please');
	if (msg.content.toLowerCase().startsWith(PREFIX) || msg.content.startsWith('oily')) {
		let random = Math.floor(Math.random() * 10);
		let obj = {
			author: msg.author,
			channelname: msg.channel.name,
			random,
			remainder: 10-random
		}
		
		let args = msg.content.split(' ')
		args.splice(0, 1);
		
		if (args.toString().endsWith('?')) return msg.channel.send('I\'m a busy man so I don\'t have time to answer your question thank you');
		if (args.toString().length < 2) return

		switch (args[0]) {
			case 'eval':
				if (msg.author.id !== config.owner) return msg.channel.send('you are not the real G');
				try {
					msg.channel.send(`\`\`\`js\n${inspect(eval(args.slice(1).join(' ')))}\`\`\``)
				} catch (err) {
					msg.channel.send(`\`\`\`js\n${err}\`\`\``)
				}			
				break;
			case 'ping':
				return msg.channel.send('ping diddly ding brother');
				break;
			case 'help':
				return msg.channel.send(`fuckin oath g'day ${msg.author.username}, it's looking pretty bleak today\nBUT not anymore\nnow that you've added the almighty Oliy Simulator, we can finally enjoy what's left of our miserable lives.\
\n\njust do \`${PREFIX} [what you want to say to oliy]\` (such as \`oliy how is DBL's business going\`) and have the incredible man speak some words of wisdom to you\n\nyeah there's some other shit too like \`${PREFIX} serverinfo\` and \
\`${PREFIX} business\` but that shit's boring what you really wanna do is SPEAK TO THE LEGEND`)
				break;
			case 'serverinfo':
				return msg.channel.send(`my name's oliy and this server named ${msg.guild.name} is looking ${FEELINGS[Math.floor(Math.random()*FEELINGS.length)]}\nyeah it's got around ${msg.guild.members.size} members but \
it's only got **${msg.guild.members.filter(m => m.user.bot).size} bots** and i mean that's just not good enough, we all know more bots means more BUSINESS`)
				break;
			case 'business':
				return msg.channel.send(`now you're speaking my language ${msg.author.username}, +${Math.floor(Math.random() * 100)}% business`)
				break;
			case 'fix':
				return msg.channel.send(`I'll have you know that ${args.slice(1).join(' ').replace('my', 'your')} ${args.slice(1).join(' ').endsWith('s') ? 'are' : 'is'} working just fine thank you`)
			default:
				let txt = OLIY_RESPONSES[Math.floor(Math.random()*OLIY_RESPONSES.length)];
				for (let key in obj) {
					txt = txt.replace(new RegExp(`{${key}}`, "ig"), obj[key])
				}
				return msg.channel.send(`${txt} ${Math.random() > 0.7 ? `l${Math.random() > 0.5 ? 'o': 'u'}l` : ''}`);
		}
	}
})
