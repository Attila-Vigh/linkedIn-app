import multer from 'multer'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export const publicFolderPath = join(dirname(fileURLToPath(
    import.meta.url)), '../services/profile/uploads')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/services/profile/uploads')
    },
    filename: (req, file, cb) => {
        console.log(file.fieldname + '-' + Date.now())
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

const upload = multer({ storage: storage });

export default upload