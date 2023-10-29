import fs from 'fs';


const filePath = "data.txt"
const option = process.argv[2]
const input = process.argv[3]


if (option === "w") {
    fs.appendFileSync(filePath, input + "\n")
    console.log(`${input} was written to ${filePath}`)
}
else if (option === "r") {

    const readText = fs.readFileSync(filePath, "utf8")
    console.log(readText)
} else if (option === "c") {
    const clearAll = fs.writeFileSync(filePath, "")
    console.log('all files has been cleared')
} else if (option === "d") {
    const dulicate = fs.readFileSync(filePath)
    fs.appendFileSync(filePath, dulicate)
    console.log(`${dulicate} was written to ${filePath}`)
}









// import fs from 'fs';

// const filePath = "data.txt"

// const options = process.argv[2]
// const input = process.argv[3]

// if (options === "w") {
//     fs.appendFileSync(filePath, input + '\n');
//     console.log("File: " + input)
// }

// else if (options === "r") {
//     const content = fs.readFileSync(filePath,"utf8")
//     console.log(content)
// }
// else if (options === "c") {
//     fs.writeFileSync(filePath, " ")
//     console.log("File have clear")
// }

// else if (options === "d") {
//     const content = fs.readFileSync(filePath,"utf8")
//     fs.appendFileSync(filePath, content)
// }

// else {
//     console.log("invild please try again")
