const express = require('express')
const bodyParser = require('body-parser')
const ReviewData = require('../models/review-data.js')
const UserData = require('../models/user-data.js')
const constants = require('../constants.js')

const {OAuth2Client} = require('google-auth-library');

let DEFAULT_QUERY_COUNT = 10
let MAX_QUERY_COUNT = 100

class APIRouter {

    constructor(dataModel) {
        this.client = new OAuth2Client(constants.GOOGLE_CREDENTIALS.client_id)

        let router = express.Router()

        router.use(bodyParser.json())

        router.get('/courses', (req, res) => {
            let query = req.query.query || ''
            let start = req.query.start || 0
            let count = Math.min(
                req.query.count || DEFAULT_QUERY_COUNT,
                MAX_QUERY_COUNT
            )
            dataModel.getCourses(query, start, count)
                .then((result) => {
                    res.send(JSON.stringify(result))
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        router.get('/courses/:id', (req, res) => {
            dataModel.getCourseData(req.params.id)
                .then((result) => {
                    res.send(JSON.stringify(result))
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        router.get('/users/:id', (req, res) => {
            dataModel.getUserData(req.params.id)
                .then((result) => {
                    res.send(JSON.stringify(result))
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        router.get('/course-reviews/:id', (req, res) => {
            let start = req.query.start || 0
            let count = Math.min(
                req.query.count || DEFAULT_QUERY_COUNT,
                MAX_QUERY_COUNT
            )
            dataModel.getReviews(req.params.id, start, count)
                .then((result) => {
                    res.send(JSON.stringify(result))
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        router.post('/like', (req, res) => {
            let data = req.body.body
            let reviewID = data.reviewID

            dataModel.voteUpReview(reviewID)
                .then((result) => {
                    res.send('null')
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        router.post('/dislike', (req, res) => {
            let data = req.body.body
            let reviewID = data.reviewID;

            dataModel.voteDownReview(reviewID)
                .then((result) => {
                    res.send('null')
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        router.post('/reviews', (req, res) => {
            let data = req.body.body
            let reviewData = Object.assign(new ReviewData(), data)
            let userToken = req.body.userToken
            this.getGoogleUserProfile(userToken)
                .then((profile) => {
                    reviewData.userID = profile.userID
                    reviewData.userName = profile.name
                    reviewData.userPicture = profile.picture
                    return dataModel.addUser(profile)
                })
                .then(() => {
                    return dataModel.addReview(reviewData)
                })
                .then((result) => {
                    res.send('null')
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        router.post('/users', (req, res) => {
            let data = req.body.body
            let userData = Object.assign(new UserData(), data)
            dataModel.addUser(userData)
                .then((result) => {
                    res.send('null')
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
        })

        this.router = router
    }

    getGoogleUserProfile(token) {
        if (!token) {
            return Promise.reject(null)
        }
        
        return this.client.verifyIdToken({
            idToken: token,
            audience: constants.GOOGLE_CREDENTIALS.client_id,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
            .then((ticket) => {
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                // If request specified a G Suite domain:
                //const domain = payload['hd'];

                return Object.assign(new UserData(), {
                    userID: payload['sub'],
                    email: payload['email'],
                    name: payload['name'],
                    picture: payload['picture'],
                })
            })
    }

    getRouter() {
        return this.router
    }

}

module.exports = APIRouter
