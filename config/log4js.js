const configure = require("log4js").configure;

configure({
    appenders: {
        out: { type: "stdout", },
        logger_file: { type: "file", filename: __dirname + "/../../logs/logger_info.log", maxLogSize: 10485760, compress: true },
        api_logger: { type: "file", filename: __dirname + "/../../logs/api_logs.log", maxLogSize: 10485760, compress: true },
    },
    categories: {
        default: {
            appenders: ["out","logger_file"],
            level: "all"
        },
        api: {
            appenders: ["api_logger", "out"],
            level: "all"
        }
    }
})
