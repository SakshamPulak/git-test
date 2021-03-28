const path=require('path');
const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app = express();

const port=process.env.PORT || 3000;
const pubpath=path.join(__dirname,'./public');
const pathl=path.join(__dirname,'./tempelate/views');
const path2=path.join(__dirname,'./tempelate/partials');

app.set('view engine','hbs');

app.set('views',pathl);

hbs.registerPartials(path2);

app.use (express.static (pubpath));

app.use ((req,res,next) =>
{
	var log=`${req.method} ${req.url}`;
	console.log (log);
	fs.appendFile('somefile.log',log+'\n', (err)=>
	{
		if(err)
		{
			console.log("Some Problem");
		}
	});
	next();
});

app.use (express.static(__dirname + '/public'));
hbs.registerHelper ('getCurrentYear', () =>
{
	return new Date().getFullYear()
});

hbs.registerHelper('Capt', (text) =>
{
	return text.toUpperCase();
});

app.get('/', (req, res) =>
{
	res.render('index',
	{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website!'
	});
});

app.get('/instruction', (req, res) =>
{
	res.render ('instruction',
	{
		pageTitle: 'instruction'
	});
});

app.get('/shedule', (req, res) =>
{
	res.render('shedule',
	{
		pageTitle: 'shedule'
	});
});

app.get('/checklist', (req, res) =>
{
	res.render('checklist',
	{
		pageTitle: 'checklist'
	});
});

app.get('/register', (req, res) =>
{
	res.render('register',
	{
		pageTitle: 'register'
	});
});

app.get('/bad', (req, res) =>
{
	res.send
	({
		errorMessage: 'Unable to handle request'
	});
});



app.listen (port, () =>
{
	console.log(`server is up on port ${port}`);
});



