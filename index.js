const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sparkPost = require('sparkpost');
const client = new sparkPost('1acfc7ba0b22d375b42ff58125373eb4a723a445')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/email', (req, res) => {
  client.transmissions.send({

    content: {
      from: 'nickmckendry@nmdev.software',
      subject: `New message from ${req.body.name}`,
      html:`<html>
              <body>
                <p>Email: ${req.body.email}</p>
                <p>Name: ${req.body.name}</p>
                <p>Message: ${req.body.message}</p>
              </body>
            </html>`
    },
    recipients: [
      {address: 'nickmckendry@gmail.com'}
    ]
  })
  .then(data => {
    res.json({message: 'Success', data: data});
    console.log(data);
  })
  .catch(err => {
    res.json({message: 'Error', data: data});
    console.log(data);
  });
});



app.listen(port);
console.log(`app listening on ${port}`);
