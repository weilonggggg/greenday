const express = require("express")
var request = require("request");
const app = express();
const port = 5000;

app.get('/productdetails', (req,res) => {
  request(
    "https://my-json-server.typicode.com/weilonggggg/reactdatabase/db",
    function(error,response,body) {
    if(!error && response.statusCode == 200) {
      var parsedBody = JSON.parse(body);
      res.write(JSON.stringify({
        parsedBody
      }));
      res.end();

    }
  }
);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})