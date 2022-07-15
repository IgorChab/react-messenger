const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileTypes = ['image/png', 'image/svg', 'image/jpeg', 'image/jpg']

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(fileTypes.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

module.exports = multer(upload);


