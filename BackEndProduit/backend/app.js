const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/upload', express.static(__dirname + '/upload'));


app.post('/upload', (req, res, next) => {

// fs.readdir('./upload', function (err, files) {
//  if (err)
//     throw err;
//  for (var index in files) {
//  	if(files[index] === req.body.filename) {
//     	console.log(files[index]);
//  	}
//  }
//  });

	let imageFile = req.files.file;
	imageFile.mv(`${__dirname}/upload/${req.body.filename}.jpg`, function(err) {
	if (err) {
		return res.status(500).send(err);
	}
	
	console.log("get ???");
	res.json({file: `upload/${req.body.filename}.jpg`});
	console.log("get YES !!!");
});

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});

app.listen(8000, () => {
	console.log('Server running on http://localhost:8000');
});

module.exports = app;