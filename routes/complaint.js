var express = require('express');
var complaintRouter = express.Router();
var Complaint = require('../models/complaint');

// get - lists all the complaints available
complaintRouter.route('/')
    .get((req, res, next) => {
        Complaint.find({})
            .then((complaint) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, complaint })
            });
    });

// get - returns list of complaints for the user concerned
// post - new complaint created for the user concerned
complaintRouter.route('/:userId')
    .get((req, res, next) => {
        Complaint.find({ user: req.params.userId })
            .then((complaint) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, complaint: complaint });
            });
    })
    .post((req, res, next) => {
        let newComplaint = new Complaint(req.body);

        newComplaint.save()
            .then((complaint) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, complaint, message: 'New complaint created.' })
            });
    });

// get - fetch a single complaint for a user
// put - edit the comment in question


module.exports = complaintRouter;