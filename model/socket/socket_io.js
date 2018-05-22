// 用于 与 前端 建立长链接
// 实现 客户端 与 服务端 的简单通讯

exports.get_socket = function (server) {
    const io = require('socket.io')(server);
    // 建立连接
    var users = [];
    io.on('connection', function (socket) {
        
        // 该 news 是客户端监听的事件，后面的对象是发送给客户端的消息体
        // 这里的监听事件 是监听客户端触发的事件，，回调函数中得到的是客户端发送过来的数据
        // socket.on('my other event', function (data) {
        //     for(var i = 0; i < users.length; i ++) {
        //         if(users[i].id == data.id) {
        //              users[i].socket = socket;
        //         } 
        //     }
        // });
        socket.on('getId', function (data){
            users.push({
                id: data.id,
                socket: socket
            });
            // console.log(users);
        });
        socket.on('private', function (data) {
            var id = data.id;
            // console.log(data);
            users[0].socket.emit('news', data);
            // for(var i = 0; i < users[i].length; i ++) {
            //     if(users[i].id == id) {
            //         console.log(id);
            //         users[0].socket.emit('news', data);
            //     }
            // }
            // socket.broadcast.emit('news', data);
        })
        // 用户离线
        socket.on('disconnect', function (){

        });
    });
}
/*
    当一个用户进入聊天界面的时候 会将该用户的 id 和 形成的 socket 对象存储起来！其实也不用存储 socket ！
    当对方用户不在线的时候！一个发送过来消息的时候，检查该用户的id是否存在，如果存在，则直接获取id 和 socket并发送消息
    如果不存在，先将该消息存储到 对方用的消息列表中，如果该用户上线，则首先去查询自己的未读消息列表是否存在消息 有则拿取！

    大体上来说 其实就是 利用不同用户的 socket 进行消息的发送！

    这里也可以 自己设置 在线人数 ！ 
*/ 