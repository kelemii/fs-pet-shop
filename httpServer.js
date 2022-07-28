import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    if (req.url === "/pets" && req.method === "GET")
      fs.readFile("./pets.json", (err, data) => {
        res.end(data);
      });
    else if (req.url && req.method === "GET")
      fs.readFile("./pets.json", (err, data) => {
        let urlNum = req.url.split("/");
        let information = JSON.parse(data);
        let numPets = JSON.parse(data).length;
        if (urlNum > numPets - 1 || urlNum < 0) {
          res.statusCode = 404;
          res.writeHead(404, { "Content-Type": "application/my-data" });
          res.end("response");
          console.log("invalid");
        } else {
          const output = JSON.stringify(information[urlNum[2]]);
          res.setHeader("content-type", "application/json");
          res.end(output);
        }
      });
    else if (req.url === '/pets' && req.method === 'POST') {
      let body = "";
      //read body
          fs.readFile("pets.json", "utf-8", (err, data) => {
            console.log(body);
            const dataPets = JSON.parse(data);
            const currentPets = JSON.parse(data).push(dataPets);
            fs.writeFile('./pets', JSON.stringify(currentPets), (err) => {
              res.end(JSON.stringify(dataPets));
            });
          });
    }
    else {
      res.writeHead(404);
      res.end();
    }
  });
});

server.listen(8000, () => {
  console.log("listening on port 8000");
});
