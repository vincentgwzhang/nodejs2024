const mongoose = require('mongoose');

// 连接 MongoDB
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/crud_db');
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

// 定义数据模型
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});
const User = mongoose.model('User', UserSchema);

// 插入数据 (Insert)
async function insertRecord() {
    await connectDB();
    const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
    });
    const result = await user.save();
    console.log('Record inserted:', result);
    mongoose.connection.close();
}

// 读取数据 (Read)
async function readRecord() {
    await connectDB();
    const users = await User.find({name: 'John Doe', email: 'john@example.com',}); // 如果你只想读某个特定 ID，可以传递条件 { _id: 'id值' }
    console.log('Records found:', users);
    mongoose.connection.close();
}

// 更新数据 (Update)
async function updateRecord(id) {
    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(id, { age: 30 }, { new: true });// { new: true } 的意思是返回新的记录
    if (updatedUser) {
        console.log('Record updated:', updatedUser);
    } else {
        console.log('Record not found for update');
    }
    mongoose.connection.close();
}

// 删除数据 (Delete)
async function deleteRecord(id) {
    await connectDB();
    const result = await User.findByIdAndDelete(id);
    if (result) {
        console.log('Record deleted:', result);
    } else {
        console.log('Record not found for deletion');
    }
    mongoose.connection.close();
}

// 测试函数
// 你可以根据需要调用这些函数，比如读取记录
// insertRecord();   // 插入新数据
// readRecord();     // 读取所有数据
updateRecord('670d67f834fde61b1865fd49');  // 更新某个数据
// deleteRecord('670d324cd466ccbabba380c3');  // 删除某个数据
