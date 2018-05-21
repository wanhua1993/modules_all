1、一个异步I/O操作的基本流程
    javascript会调用 node 的核心模块，将参数和回调函数传入到核心模块中，这个核心模块会将参数和回调函数封装成一个请求对象，并将这个请求对象推入到I/O线程池中等待执行；
    I/O操作完成以后 会取出之前封装的请求对象 执行回调函数 以达到javascript异步回调的目的；
    javascript是单线程，指的是当前主运行环境是单线程，而同时存在的有I/O线程；
2、
    event loop是一个执行模型，在不同的地方有不同的实现。浏览器和nodejs基于不同的技术实现了各自的event loop。
    简单来说：
    nodejs的event是基于libuv，而浏览器的event loop则在html5的规范中明确定义。
    libuv已经对event loop作出了实现，而html5规范中只是定义了浏览器中event loop的模型，具体实现留给了浏览器厂商。

    我们上面提到了libuv接过了js传递过来的 I/O请求，那么何时来处理回调呢？

    libuv有一个事件循环(event loop)的机制，来接受和管理回调函数的执行。
    event loop是libuv的核心所在，上面我们提到 js 会把回调和任务交给libuv，libuv何时来调用回调就是 event loop 来控制的。event loop 首先会在内部维持多个事件队列（或者叫做观察者 watcher），比如 时间队列、网络队列等等，使用者可以在watcher中注册回调，当事件发生时事件转入pending状态，再下一次循环的时候按顺序取出来执行，而libuv会执行一个相当于 while true的无限循环，不断的检查各个watcher上面是否有需要处理的pending状态事件，如果有则按顺序去触发队列里面保存的事件，同时由于libuv的事件循环每次只会执行一个回调，从而避免了竞争的发生。    
 3、
    Node.js 通过 libuv 来处理与操作系统的交互，并且因此具备了异步、非阻塞、事件驱动的能力。因此，NodeJS能响应大量的并发请求。所以，NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景。
    上面提到，如果是 I/O 任务，Node.js 就把任务交给线程池来异步处理，高效简单，因此 Node.js 适合处理I/O密集型任务。但不是所有的任务都是 I/O 密集型任务，当碰到CPU密集型任务时，即只用CPU计算的操作，比如要对数据加解密(node.bcrypt.js)，数据压缩和解压(node-tar)，这时 Node.js 就会亲自处理，一个一个的计算，前面的任务没有执行完，后面的任务就只能干等着 。我们看如下代码：
    var start = Date.now();//获取当前时间戳
    setTimeout(function () {
        console.log(Date.now() - start);
        for (var i = 0; i < 1000000000; i++){//执行长循环
        }
    }, 1000);
    setTimeout(function () {
        console.log(Date.now() - start);
    }, 2000);
    最终我们的打印结果是：（结果可能因为你的机器而不同）
    1000
    3738
    对于我们期望2秒后执行的setTimeout函数其实经过了3738毫秒之后才执行，换而言之，因为执行了一个很长的for循环，所以我们整个Node.js主线程被阻塞了，如果在我们处理100个用户请求中，其中第一个有需要这样大量的计算，那么其余99个就都会被延迟执行。如果操作系统本身就是单核，那也就算了，但现在大部分服务器都是多 CPU 或多核的，而 Node.js 只有一个 EventLoop，也就是只占用一个 CPU 内核，当 Node.js 被CPU 密集型任务占用，导致其他任务被阻塞时，却还有 CPU 内核处于闲置状态，造成资源浪费。
    其实虽然Node.js可以处理数以千记的并发，但是一个Node.js进程在某一时刻其实只是在处理一个请求。
    因此，Node.js 并不适合 CPU 密集型任务。   