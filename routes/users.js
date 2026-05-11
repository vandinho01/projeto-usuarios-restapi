let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
})

module.exports = (app) => {

    let route = app.route('/users')

    app.get((req, res) => {

        db.find({}).sort({ name: 1 }).exec((err, users) => {

            if (err) {
                app.utils.error.send(err, req, res);

            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }

        })

    });

    route.post((req, res) => {
        console.log(req.body);

        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        })

    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {

        db.findOne({ _id: request.paramns.id }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });

    });

    routeId.put((req, res) => {

        db.update({ _id: request.paramns.id }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.paramns, req.body));
            }
        });

    });

};