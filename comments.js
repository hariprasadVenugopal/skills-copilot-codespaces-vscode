// Create web server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const commentsPath = path.join(__dirname, 'comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred. Please try again later.');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred. Please try again later.');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments), err => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred. Please try again later.');
        return;
      }
      res.status(201).send('Comment added successfully!');
    });
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});