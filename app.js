var latex = require('latex');
var fs = require('fs');
var fetchUrl = require("fetch").fetchUrl;
var http = require('http');
	//var request = require("request");
var logger = require('morgan');
var express = require('express');
var app = express();
var curl = require('node-curl');





app.use(logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

// /files/* is accessed via req.params[0]
// but here we name it :file
app.get('/files/:file(*)', function (req, res, next) {
    var file = req.params.file;
    var path = __dirname + '/files/' + file;

    res.download(path);
	console.log("fff");
});

/*

app.post('/test', function (req, res) {
	
	var fullText;


	//  curl('https://archive.org/stream/yellowwallpaper00gilmgoog/yellowwallpaper00gilmgoog_djvu.txt', function(err) {
	    console.info(this.status);
	    console.info('-----');
	    console.info(this.body);
	    console.info('-----');
	    console.info(this.info('SIZE_DOWNLOAD'));
		fullText = this.body;
	  });
	
    var response = {
        fullText: fullText,
		foo: "bar"
    };
    res.send(response);
});

*/












app.post('/createPDF', function (req, res) {

	var text;
	fs.readFile("temp.txt", function(err, f){
	    text = f.toString();
	
	});
	
    var name = req.body.name.replace(/ /g, '_');
    var input = req.body.text;
    if (!input | !name) res.send('Expected .text and .name');

    // name the PDF with a timestamp, and stash in the /files/
    // directory where it can be retrieved in browser.
    var link = name + '-' + Date.now() + '.pdf';
    var file_path = __dirname + link;

    var pdf = fs.createWriteStream(file_path);
     latex([
	  "\\documentclass[11pt]{book}",
	  "\\parindent0pt  \\parskip10pt",
	  "\\raggedright",
	  "\\begin{document}",
	  "text2",
	  "\\end{document}"
	]).pipe(pdf);

    var response = {
        link: link,
		text: text
    };
    res.send(response);
});

// error handling middleware. Because
// its below our routes, you will be
// able to "intercept" errors, otherwise
// Connect will respond with 500
app.use(function (err, req, res, next) {
    // special-case 404s,
    if (404 == err.status) {
        res.statusCode = 404;
        res.send('Cant find that file.');
    } else {
        next(err);
    }
});

app.listen(3000);
console.log('Listening on port 3000');