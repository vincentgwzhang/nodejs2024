const fs = require('fs');

// 使用流逐块读取文件内容
const readableStream = fs.createReadStream('largefile.txt');

// 当有新数据块时触发 'data' 事件
readableStream.on('data', (chunk) => {
    console.log('Received a chunk of data:');
    console.log(chunk.toString());
});

// 文件读取结束时触发 'end' 事件
readableStream.on('end', () => {
    console.log('Finished reading the file.');
});
