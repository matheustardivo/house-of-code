var http = require('http');

http.get({
  hostname: 'localhost',
      port: 3000,
      path: '/products',
   headers: { 'Accept': 'application/json' }
}, (response) => {
  console.log("[DEBUG] Client response status code: ", response.statusCode);

  response.on('data', function(body) {
    console.log("Body: " + body);
  });
});
