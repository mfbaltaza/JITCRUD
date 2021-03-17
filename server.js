// Here we require express
const express = require('express');

const bodyParser = require('body-parser');

// Now here we use it
const app = express();

// Here we connect to MongoDB through MongoClient

const MongoClient = require('mongodb').MongoClient;
const { ResumeToken } = require('mongodb');

MongoClient.connect('mongodb+srv://BaltaZa:gangties@gangwe.9rs06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
	.then(client => {
		console.log('Connected to Database')
		const db = client.db('star-wars-quotes')
		const quotesCollection = db.collection('quotes')

		// Here we set Embedded JavaScript as our Template Engine
		app.set('view engine', 'ejs');

		app.use(bodyParser.urlencoded({ extended: true }))

		// READ here we use the get request with the get method
		// that needs an endpoint and a callback

		app.get('/', (req, res) => {
			// We no longer send back the html file because we using EJS now
			// res.sendFile(__dirname + '/index.html');
			const cursor = db.collection('quotes').find().toArray()
				.then(results => {
					res.render('index.ejs', { quotes: results})
				})
				.catch(error => console.error(error))

		})

		// CREATE 

		app.post('/quotes', (req, res) => {
			quotesCollection.insertOne(req.body)
				.then(result => {
					res.redirect('/')
				})
				.catch(error => console.error(error))
		})

		app.listen(3000, function () {
			console.log('Listening on 3000');
		});
	})
	.catch(error => console.error(error))
