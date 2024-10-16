// 引入 worker_threads 模块
const { Worker, isMainThread, parentPort } = require('worker_threads');

// 如果当前是主线程
if (isMainThread) {
  console.log('这是主线程。');
  
  // 创建一个新的工作线程
  const worker = new Worker(__filename); // __filename 是当前文件的路径
  
  // 当从工作线程接收到消息时，执行此回调函数
  worker.on('message', (message) => {
    console.log(`从工作线程接收到消息：${message}`);
  });

  // 向工作线程发送一条消息
  worker.postMessage('你好，工作线程！');
} else {
  // 这是工作线程的代码

  // 当从主线程接收到消息时，执行此回调函数
  parentPort.on('message', (message) => {
    console.log(`从主线程接收到消息：${message}`);

    // 执行一些计算任务（模拟耗时任务）
    const result = fibonacci(20); // 计算斐波那契数列第20项

    // 将结果发送回主线程
    parentPort.postMessage(`计算结果：${result}`);
  });

  // 简单的递归函数来计算斐波那契数列
  function fibonacci(n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
