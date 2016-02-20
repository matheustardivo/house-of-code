var http = require('http');

var config = {
  hostname: 'localhost',
      port: 3000,
      path: '/products',
    method: 'post',
   headers: {
           'Accept': 'application/json',
     'Content-Type': 'application/json'
   }
};

var client = http.request(config, function(response) {
  console.log("[DEBUG] Client response status code: ", response.statusCode);

  response.on('data', function(body) {
    console.log("Body: " + body);
  });
});

var product = {
        title: '',
  description: 'Description from importer',
        price: '19,99'
};

client.end(JSON.stringify(product));
