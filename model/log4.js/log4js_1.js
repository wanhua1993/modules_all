var log4js = require('log4js');
// 第一种配置方法 直接输出到文件中
log4js.configure({
    appenders: {
        out: { type: 'stdout' },//设置是否在控制台打印日志
        info: { type: 'file', filename: './logs/info.log' }
    },
    categories: {
        default: { appenders: ['out', 'info'], level: 'info' }//去掉'out'。控制台不打印日志
    }
});

var logger = log4js.getLogger('info');
logger.info("~~~info~~~~");

// log输出到文件中：多个文件，同一level
// 同一个level 选择不同的打印日志的目录
var log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'stdout' },//设置是否在控制台打印日志
        info: { type: 'file', filename: './logs/info.log' },
        info_2: { type: 'file', filename: './logs/info_2.log' }
    },
    categories: {
        default: { appenders: ['out', 'info', 'info_2'], level: 'info' }//去掉'out'。控制台不打印日志
    }
});

var logger = log4js.getLogger('info');
logger.info("~~~info~~~~");

var logger_2 = log4js.getLogger('info_2');
logger_2.info("~~~info~~~~");

// log输出到文件中：多个文件，不同level
// 不同的等级 输出到不同的 level 中
log4js.configure({
    appenders: {
        out: { type: 'stdout' },//设置是否在控制台打印日志
        info: { type: 'file', filename: './logs/info.log' },
        just_errors: { type: 'file', filename: './logs/error.log' },
        'error': { type: 'logLevelFilter', appender: 'just-errors', level: 'error' }
    },
    categories: {
        default: { appenders: ['out', 'info', 'error'], level: 'info' }//去掉'out'。控制台不打印日志
    }
});

var LogFile = log4js.getLogger();
LogFile.info('You can find logs-files in the log-dir');


var LogFile_info = log4js.getLogger('info');
LogFile_info.info('~~~~~~~info log~~~~~~~~~');

var LogFile_just_errors = log4js.getLogger('error');
LogFile_just.error('~~~~~~~error log~~~~~~~~~');

console.log("log_start end!"); 
/*
    log4js的输出级别6个: trace, debug, info, warn, error, fatal
    logger.trace(‘Entering cheese testing’);
    logger.debug(‘Got cheese.’);
    logger.info(‘Cheese is Gouda.’);
    logger.warn(‘Cheese is quite smelly.’);
    logger.error(‘Cheese is too ripe!’);
    logger.fatal(‘Cheese was breeding ground for listeria.’);

    如果输出级别是INFO，则不会打印出低于info级别的日志 trace, debug，只打印 info, warn, error, fatal。
    这样做的好处在于，在生产环境中我们可能只关心异常和错误，并不关心调试信息。从而大大减少日志的输出，能减少磁盘写入。
    而在开发环境中，我们可以需要打印非常多的信息，帮助开发人员定位错误，调试代码。
    还有一个好处就是，代码中可以混有各种的日志打印代码。我们只要在一个配置文件中，修改输出级别，日志输出就会发生变化，不用修改所有的代码。
    如果所有地方都是 console.log()，那么上线的时候，改动这个东西就要花很多时间。
*/