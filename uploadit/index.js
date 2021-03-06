const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors');

const uploadImage = require('./helpers/helpers')

const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than.
    fileSize: 5 * 6080 * 6080,
  },
});

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());

app.post('/uploads', async (req, res, next) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)
    
    res
      .status(200)
      .json({
        code : 1,
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    res
    .json({
      code : -1,
      message: "Upload Falied",
      data: ""
    })
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})

app.listen(9001, () => {
  console.log('API RUN IN PORT 9001');
})

