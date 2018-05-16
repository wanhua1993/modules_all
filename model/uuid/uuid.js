var UUID = require('uuid');
var ID_1 = UUID.v1(); // 这是通过时间戳形成的uuid
var ID_4 = UUID.v4(); // 这是通过随机数产生的uuid，有一定的重复几率

// var ID_3 = UUID.v3();
// var ID_5 = UUID.v5();
module.exports = {
    ID_1: ID_1,
    ID_4: ID_4,
    // ID_5: ID_5,
    // ID_3: ID_3
}
/*
 *  const uuidv3 = require('uuid/v3');
    uuidv3('hello.example.com', uuidv3.DNS); // ⇨ '9125a8dc-52ee-365b-a5aa-81b0b3681cf6'
    uuidv3('http://example.com/hello', uuidv3.URL); // ⇨ 'c6235813-3ba4-3801-ae84-e0a6ebb7d138'
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    uuidv3('Hello, World!', MY_NAMESPACE); // ⇨ 'e8b5a51d-11c8-3310-a6ab-367563f20686' 
 */

/*
    const uuidv5 = require('uuid/v5');
    uuidv5('hello.example.com', uuidv5.DNS); // ⇨ 'fdda765f-fc57-5604-a269-52a7df8164ec'
    uuidv5('http://example.com/hello', uuidv5.URL); // ⇨ '3bbcee75-cecc-5b56-8031-b6641c1ed1f1'
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'
*/  