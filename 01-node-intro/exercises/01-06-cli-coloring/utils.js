import fs from "fs";

import clc from 'cli-color'

const filePath = "data.txt";

export function write(input) {
  fs.appendFileSync(filePath, clc.red(input) + "\n");
  console.log(clc.blue.bold.underline("appended:"), input);
}

export function read() {
  const content = fs.readFileSync(filePath);
  console.log("file content:");
  console.log(content.toString());
}

export function clear() {
  fs.writeFileSync(filePath, "");
  console.log("the file has been clear");
}
