const fs = require('fs');

// 读取整个文件内容到 Buffer
fs.readFile('largefile.txt', (err, data) => {
    if (err) throw err;
    
    // data 是一个 Buffer
    console.log('File data loaded into buffer:');
    console.log(data.toString());
});
