Buffer:
当你读取文件时，Buffer 会将整个文件读取到内存中的一个连续区域。你可以像数组一样访问文件的内容，读取、修改，或者将其转化为其他形式（如字符串）。
例如，如果你读取一个 100MB 的文件，Buffer 会一次性加载整个 100MB 文件到内存中，然后你才能对文件的内容进行操作。



Stream:
当你读取文件时，Stream 会逐块读取文件。你不需要等待文件的所有内容都加载到内存中，可以在数据块到达时立即处理它。Stream 会一边读取，一边处理数据，直到数据流结束。
例如，读取同样的 100MB 文件时，Stream 会读取小块数据（如 64KB 一次），你可以在每个数据块被读取时进行操作，而不需要将 100MB 全部加载到内存中。




What is buffer in Node.js?
Answer: A buffer is a temporary storage space for binary data, allowing Node.js to handle raw data directly.

What are streams in Node.js?
Answer: Streams are objects used to handle continuous data flows, allowing for efficient reading and writing of data