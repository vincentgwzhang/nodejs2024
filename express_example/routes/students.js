var express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const multer = require('multer');

const StudentDto = require('../dto/StudentDto');
const StudentInsertDto = require('../dto/StudentInsertDto');

var router = express.Router();

router.get('/', (req, res) => {
    const student = new StudentDto(1, 'John Doe', 20);
    res.json(student);
    // res.send('Hello, World!');
});

router.get('/picture', (req, res) => {
    const url = 'http://localhost:3000/students/display_picture';
    downloadImage(url);
});

router.get('/download_picture', (req, res) => {
    const filePath = path.resolve(__dirname, '../public/images/F22.jpg');
    res.download(filePath, 'F22.jpg', (err) => {// keyword: download
        if (err) {
            console.error('Error during file download:', err);
            res.status(500).send('Error downloading the file.');
        }
    });
});

router.get('/display_picture', (req, res) => {
    const filePath = path.resolve(__dirname, '../public/images/F22.jpg');
    res.sendFile(filePath, 'F22.jpg', (err) => {// keyword: sendFile
        if (err) {
            console.error('Error during file download:', err);
            res.status(500).send('Error downloading the file.');
        }
    });
});

router.post('/', (req, res) => {
    const { name, age } = req.body;
    const studentInsertDto = new StudentInsertDto(name, age);
    res.status(201).json({ message: 'Student created successfully', student: studentInsertDto });
});

router.get('/users/:userId/books/:bookId', (req, res) => {
    console.log(req.params['userId']);
    res.send(req.params);
});

// http://localhost:3000/students/query?name=vincent&userId=40
router.get('/query', (req, res) => {
    console.log(req.query['userId']);
    res.send(req.query);
});

// This route path will match acd and abcd.
router.get('/ab?cd', (req, res) => {
    res.send('ab?cd')
});

// This route path will match abcd, abbcd, abbbcd, and so on.
router.get('/ab+cd', (req, res) => {
    res.send('ab+cd')
});

// This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
router.get('/ab*cd', (req, res) => {
    res.send('ab*cd')
});

// This route path will match /abe and /abcde.
router.get('/ab(cd)?e', (req, res) => {
    res.send('ab(cd)?e')
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp'); // 保存到 /tmp 目录
    },
    filename: function (req, file, cb) {
        // 使用上传文件的原始名称
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // 文件上传成功
    res.send(`File uploaded successfully! Stored as: ${req.file.path}`);
});



const downloadImage = async (url) => {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        // 将返回的二进制数据转换为 Buffer
        const buffer = Buffer.from(response.data, 'binary');

        // 定义保存图片的路径
        const filePath = path.join('/tmp', 'downloaded_image.jpg');

        // 将 Buffer 中的数据写入到文件
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Image saved to', filePath);
            }
        });

    } catch (error) {
        console.error('Error downloading the image:', error);
    }
};

module.exports = router;
