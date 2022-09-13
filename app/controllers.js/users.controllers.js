var appUtils = require('../utils/app_utils');
var logger = appUtils.getLogger(__filename);
var responseStatus = require('../libs/responseStatus');

exports.getData = (req, res, next) => {
    logger.info("sending a reply");
    return res.status(responseStatus.OK).send("Done");
}