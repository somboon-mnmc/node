import fs from 'fs';

const filePath = "./data.txt"

fs.writeFileSync(filePath, "Hello world!");
fs.appendFileSync(filePath, "\nSecond line")
fs.appendFileSync(filePath, "\nSecond line")

const content = fs.readFileSync(filePath);
console.log("complete");

