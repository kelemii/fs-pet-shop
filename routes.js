import fs from 'fs';

fs.readFile('./pets.json', (err, data) => {
    let count = 1;
    let parsepets = JSON.parse(data);
    routes
     
} )

routes = {
    '/1': function(req, res) {
      res.end("");
    },
  
    '/2': function(req, res) {
      res.end("");
    }
  };
  
  module.exports = routes;