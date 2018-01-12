var mongoose = require('mongoose');
var user = mongoose.model('ga_user');

// to Fetch people that haven't logged in Socially
module.exports = {
    isloggedin: function (req, res) {
        console.log("In get details");
        var offset; //offset
        var limit = 10; // limit
        var page = parseInt(req.query.no_paging);
        if (page == 1) {
            offset = 0;
            dataretrieve(offset, limit, res, page)
        }
        else if (page == 2) {
            offset = 10;
            dataretrieve(offset, limit, res, page)
        }
        else if (page == 3) {
            offset = 20;
            dataretrieve(offset, limit, res, page)
        }
        else if (page == 4) {
            offset = 30;
            dataretrieve(offset, limit, res, page)
        }
        else if (page == 5){
            offset = 40;
            dataretrieve(offset, limit, res, page)
        }

    },
    login:function(req,res){
        return res.status(200).render('customer')
    }
}
//====================Helper Function============================
dataretrieve = function (offset, limit, res ,page) {
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
                return res.status(200).render('display', { datas: result,pg: page });
            }
        }).skip(offset).limit(limit);
}