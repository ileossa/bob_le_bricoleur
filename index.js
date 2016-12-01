'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// standby du server
const server = app.listen(3000, () => {  
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);});

//
// config pour executer les scripts shell
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }


// 
//   COMMANDES FROM USER 
//
app.get('/', (req, res) => {
	handleQueries(req.query, res);
})

app.post('/', (req, res) => {
  handleQueries(req.body, res);
});


// traitement et reponse
function handleQueries(q, res){
	let text = q.text;
	
	if( text == "toto"){
		res.send("tu as dis toto");
		return;
	}
	if( text == "launch docker"){
		exec("sh scripts/launcher.sh");
		res.send("Launch on <http://localhost:8080>");
	}
	else{
		let data = {
			response_type: 'ephemeral', // private message
			text: 'How to use /httpstatus command:',
			attachments:[
			{
				text: 'Type a status code after the command, e.g. `/httpstatus 404`',
			}
			]
		};
		res.json(data);
	}
}