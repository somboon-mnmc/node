import fs from 'fs';

const filePath = "data.txt"

const options = process.argv[2]
const input = process.argv[3]

if(options === "w") {
    fs.writeFileSync(filePath, input)
    console.log(` ${input} was successfully written `)
} else {
    console.log("error message")
}





















// import fs from 'fs';

// const filePath = "data.txt";

// const options = process.argv[2]
// const input = process.argv[3]

// if (options === "w") {
//     fs.appendFileSync(filePath , input +"\n")
//     console.log("append: " + input)
// }

