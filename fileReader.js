import { readFile, writeFile } from 'fs';

export const readFileFromPath = (filePath) => {
    readFile(filePath, (err, data) => {
        console.log(data)
    })
}