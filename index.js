'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, () => {  
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);});

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
	let data = 
	{
		response_type: 'in_channel',
		text: '302: Found',
		attachments:[
			{
				image_url: 'https://http.cat/302.jpg'
			}
		]
	};
	res.json(data);


	
}

