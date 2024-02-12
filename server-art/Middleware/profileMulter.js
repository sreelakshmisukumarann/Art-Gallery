//import multer
const multer = require('multer')

//storage - diskstorage
const storage = multer.diskStorage({
    //where the file is stored
    destination:(req,file,callback)=>{
       callback(null,'./profileuploads')    
    },
    //filename
    filename:(req,file,callback)=>{
      const filename = `image-${Date.now()}-${file.originalname}`
      callback(null,filename)
    }
})

//filefilter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error ("only png,jpg and jpeg files will be allowed !!!"))
    }
}

//create multerconfiguration
const multerConfig = multer({
    storage,
    fileFilter
})

//export multer
module.exports = multerConfig