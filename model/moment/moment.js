var moment = require('moment');
日期格式化
moment().format('MMMM Do YYYY, h:mm:ss a'); // 二月 5日 2017, 12:09:10 中午
moment().format('dddd');                    // 星期日
moment().format("MMM Do YY");               // 2月 5日 17
moment().format('YYYY [escaped] YYYY');     // 2017 escaped 2017
moment().format();                          // 2017-02-05T12:09:10+08:00
相对时间
moment("20111031", "YYYYMMDD").fromNow(); // 5 年前
moment("20120620", "YYYYMMDD").fromNow(); // 5 年前
moment().startOf('day').fromNow();        // 12 小时前
moment().endOf('day').fromNow();          // 12 小时内
moment().startOf('hour').fromNow();       // 9 分钟前
日历时间
moment().subtract(10, 'days').calendar(); // 2017年1月26日
moment().subtract(6, 'days').calendar();  // 本周一中午12点09
moment().subtract(3, 'days').calendar();  // 本周四中午12点09
moment().subtract(1, 'days').calendar();  // 昨天中午12点09分
moment().calendar();                      // 今天中午12点09分
moment().add(1, 'days').calendar();       // 明天中午12点09分
moment().add(3, 'days').calendar();       // 下周三中午12点09
moment().add(10, 'days').calendar();      // 2017年2月15日
多语言支持
moment().format('L');    // 2017-02-05
moment().format('l');    // 2017-02-05
moment().format('LL');   // 2017年2月5日
moment().format('ll');   // 2017年2月5日
moment().format('LLL');  // 2017年2月5日中午12点09分
moment().format('lll');  // 2017年2月5日中午12点09分
moment().format('LLLL'); // 2017年2月5日星期日中午12点09分
moment().format('llll'); // 2017年2月5日星期日中午12点09分