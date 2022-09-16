var appUtils = require('../utils/app_utils');
var logger = appUtils.getLogger(__filename);

exports.getData = (req, res, next) => {
    logger.info("sending a reply");
    return res.status(200).send("Done");
}