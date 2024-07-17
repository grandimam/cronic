import {readFile, writeFile} from 'fs/promises'

export class File {

    constructor(filePath, outputPath) {
        this.filePath = filePath
        this.outputPath = outputPath
    }

    async readContentFromPath() {
        try {
            return await readFile(this.filePath, "utf-8")
        } catch(err) {
            console.error('Error reading file:', error);
        }
    }

    async writeContentToPath(fileContent) {
        try {
            await writeFile(this.outputPath, fileContent)
            console.log("Successfully completed writing data to file")
        } catch (err) {
            console.error('Error while handling write', err)
        }
    }
}