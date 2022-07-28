import fs from 'fs';
import { exit } from 'process';
import { readFile, writeFile } from 'fs';
const subcommand = process.argv[2];
const input = process.argv[3];
const subinput = process.argv[4];
const subsubinput = process.argv[5];

switch(subcommand) {
    case 'read': {
        fs.readFile('./pets.json', 'utf-8', (err, str) => {
        const data = JSON.parse(str);
        if (input > data.length){
            console.error(`Usage node pets.js read [0-${data.length}]`);
            process.exit(1);
        } else if (input < 0){
            console.error(`Usage node pets.js read [0-${data.length}]`);
            process.exit(1);
        } else if (!input){
            console.log(data);
        } else 
        console.log(data[input], 'data');
        });
        break;
    }
    case "create": {
        fs.readFile('./pets.json', 'utf-8', (err,str) => {
            const data = JSON.parse(str);
            data.push({ age: parseInt(input), kind: subinput, name: subsubinput });
            console.log(data);
            fs.writeFile('./pets.json', JSON.stringify(data), (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                } console.log('File Written')
            });
        })
    }
    case "update":
    case "destroy":
        fs.readFile('./pets.json', 'utf-8', (err,str) => {
            const data = JSON.parse(str);
            data.splice(input, 1);
            fs.writeFile('./pets.json', JSON.stringify(data), (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                } console.log('File Written')
            });
        })
    default: {
        console.error('Usage node pets.js [read | create | update | destroy]')
    }
}
