var expressFunction = require("express");
const router = expressFunction.Router();

let location = require("../data/location_data");
const authorization = require("../config/authorize");

router.route('/location')
.get(authorization, (req, res) => {
    res.status(200).json(location);
})

module.exports = router
