/**
 * ReminderController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {




    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ReminderController)
     */
    _config: {},

    find: function (req, res, next) {
        var user = req.session.user,
            id = user.id;
        Reminder.find({or: [
            {to: id},
            {from: id}
        ]}).done(function (err, data) {
            if (err) {
                console.error(err);
                res.send(500);
            } else {
                console.log(data);
                res.format({
                    html: function () {
                        res.view({items: data});
                    },
                    json: function () {
                        res.send(data);
                    }
                });
            }
        });
    }


};
