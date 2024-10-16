const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// 如果当前是主线程，创建三个工作线程
if (isMainThread) {
  console.log('主线程启动，创建 3 个子线程。');

  for (let i = 1; i <= 3; i++) {
    // 创建工作线程并传递线程编号（i）
    const worker = new Worker(__filename, {
      workerData: { threadNumber: i }
    });

    // 监听子线程的消息
    worker.on('message', (message) => {
      console.log(`来自子线程 ${i} 的消息: ${message}`);
    });

    // 监听子线程结束的事件
    worker.on('exit', () => {
      console.log(`子线程 ${i} 已结束。`);
    });
  }
} else {
  // 如果是工作线程，执行此代码
  const { threadNumber } = workerData;

  // 让子线程每隔 1-3 秒执行一次任务，循环 3 次
  let count = 0;
  const interval = setInterval(() => {
    count++;
    parentPort.postMessage(`我是子线程 ${threadNumber}，这是我的第 ${count} 次输出。`);

    if (count >= 3) {
      clearInterval(interval); // 停止计时器
      process.exit(); // 结束线程
    }
  }, Math.random() * 2000 + 1000); // 1-3 秒的随机间隔
}
