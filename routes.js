const fs = require('fs');

const requestListener = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>My First Server</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<form action="/message" method="POST"><input type="text" name="input-form"><button type="submit">Submit</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    })

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('data.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader = ('Location', '/hello');
        return res.end();
      });
    })
  }
}

module.exports = requestListener;