import multer, {diskStorage} from "multer"

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const fileFilter = (req,file, cb)=>{
    if(file.mimetype==='application/pdf' || file.mimetype==='application/msword'){
        cb(null, true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
})

export default upload