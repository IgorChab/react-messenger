const multer  = require('multer');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname)
    }
})

// const fileTypes = ['image/png', 'image/svg', 'image/jpeg', 'image/jpg', 'image/gif']

const upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     if(fileTypes.includes(file.mimetype)){
    //         cb(null, true)
    //     } else {
    //         cb(null, false)
    //     }
    // }
})

module.exports = multer(upload);


