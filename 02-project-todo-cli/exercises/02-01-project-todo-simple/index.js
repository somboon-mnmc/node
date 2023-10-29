import fs from 'fs';
import {home} from './utils.js'
import clc from 'cli-color'

const todo  = "todo.txt"

const options = process.argv[2]
const input = process.argv[3]

if  (options === "list") {
    home();
    const lists = fs.readFileSync(todo, 'utf8')
    console.log(lists)
    const text = lists.trim().split("\n")
    console.log(text)
    const num = text.length
    
    console.log(clc.green("Total ") + clc.green("todo: ") + num + clc.green(" items."))
    text.map((items, index) => {
        console.log(`${index +1}. ${items}`)
    })
    
}

else if  (options === "add") {
    home();
    fs.appendFileSync(todo, input + "\n")
    console.log(clc.green("Todo: ") + input + clc.green(" was added.") +"\n")
}

else if(options === "clear") {
    home();
    fs.writeFileSync(todo,"")
    console.log("todo is cleared")
}

else {
    console.log("invalid options")
}

