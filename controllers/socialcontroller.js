var mongoose = require('mongoose');
var user = mongoose.model('ga_user');

// to Fetch people that haven't logged in Socially
module.exports = {
    isloggedin: function (req, res) {
        console.log("In get details");
        var offset; //offset
        var limit = 10; // limit
        var page = 1; //page value
        if (parseInt(req.query.no_paging) == 1) {
            offset = 0; 
            dataretrieve(offset, limit, res , req)
        }
        else if (parseInt(req.query.no_paging) == 2) {
            offset = 10;
            dataretrieve(offset, limit, res , req)
        }
        else if (parseInt(req.query.no_paging) == 3) {
            offset = 20;
            dataretrieve(offset, limit, res , req)
        }
        else if (parseInt(req.query.no_paging) == 4) {
            offset = 30;
            dataretrieve(offset, limit, res , req)
        }
        else if (parseInt(req.query.no_paging) == 5){
            offset = 40;
            dataretrieve(offset, limit, res , req)
        }

    }
}
//====================Helper Function============================
dataretrieve = function (offset, limit, res, req) {
    page = req.query.no_paging;
    console.log(page);
    user.find({ 
        $and: [
            { 'twitter': false },
            { 'facebook': false },
            { 'google': false }
        ]
    }, { _id: 1, first_name: 1, last_name: 1, user_email: 1 },
        function (error, result) {
            if (error) {
                res.json(error);
            }
            else if (!result) {
                return res.status(400).json([]);
            }
            else {
                return res.status(200).render('display', { datas: result, pg: page});
            }
        }).skip(offset).limit(limit);
}