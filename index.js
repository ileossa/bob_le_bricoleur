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
	
	if( text == "test"){
		res.send("tu as dis test");
		return;
	}
	if( text == "launch")
	{
		exec("sh scripts/launcher.sh", puts);
		res.send("Launch on <http://localhost:8080>");
		return;
	}
	if( text == "stop")
	{
		exec("sh scripts/stop.sh", puts);
		res.send("Stop docker");
		return;
	}
	if( text == "status")
	{
		exec("sh scripts/bob_healthCheck.sh", puts);
		res.send("none");
		return;
	}
	if( text == "update"){
		exec("sh scripts/update.sh", puts);
		res.send("update and relaunch");
		return;
	}



	else{
		let data = {
			response_type: 'ephemeral', // private message
			text: 'How to use /bob command:',
			attachments:[
			{
				text: 'mauvaise commande [launch, stop, status, update]',
			}
			]
		};
		res.json(data);
	}
}