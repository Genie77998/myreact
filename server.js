var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var roundNum =function(start, end) {
        var total = end - start + 1;
        return Math.floor(Math.random() * total + start);
    }
var app = express();
var compiler = webpack(config);
var port = roundNum(3000,9999)
var PORT = 9998
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:'+PORT);
});
