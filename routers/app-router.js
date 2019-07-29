const express = require('express')
const bodyParser = require('body-parser')
const appRoot = require('app-root-path')
const constants = require('../constants.js')

let NUM_COURSES_PER_PAGE = 20
let NUM_REVIEWS_PER_PAGE = 5

class AppRouter {

    constructor(dataModel) {
        let router = express.Router()

        router.use(bodyParser.json())

        router.get('/', function (req, res) {
            res.render('index', {
                constants: constants,
            })
        })

        router.get('/course-list/', function(req, res) {
            let query = req.query.query || ''
            let page = req.query.page ? parseInt(req.query.page) : 1
            let start = (req.query.page - 1) * NUM_COURSES_PER_PAGE
            let count = NUM_COURSES_PER_PAGE
            dataModel.getCourses(query, start, count)
                .then((result) => {
                    let total = result.count
                    let totalPages = Math.ceil(total / count)
                    let currentPage = Math.min(Math.max(page, 1), totalPages + 1)
                    res.render('course-list', {
                        constants: constants,
                        query: query,
                        courses: result.data,
                        currentPage: currentPage,
                        previousPage: currentPage - 1,
                        nextPage: currentPage + 1,
                        atMinPage: currentPage <= 1,
                        atMaxPage: currentPage >= totalPages,
                        firstPage: 1,
                        totalPages: totalPages,
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.sendStatus(500)
                })
        })
        
        router.get('/course', function(req, res) {
            let courseID = req.query.id

            let courseData = null
            
            let reviewPage = req.query.reviewPage ? parseInt(req.query.reviewPage) : 1
            let reviewStart = (req.query.reviewPage - 1) * NUM_REVIEWS_PER_PAGE
            let reviewCount = NUM_REVIEWS_PER_PAGE

            dataModel.getCourseData(courseID)
                .then((result) => {
                    courseData = result
                    return dataModel.getReviews(courseID, reviewStart, reviewCount)
                })
                .then((reviews) => {
                    if (courseData) {
                        let total = reviews.count
                        console.log(total);
                        let totalPages = Math.ceil(total / reviewCount)
                        let currentPage = Math.min(Math.max(reviewPage, 1), totalPages + 1)
                        res.render('course', {
                            constants: constants,
                            data: courseData,
                            reviews: reviews.data,
                            currentPage: currentPage,
                            previousPage: currentPage - 1,
                            nextPage: currentPage + 1,
                            atMinPage: currentPage <= 1,
                            atMaxPage: currentPage >= totalPages,
                            firstPage: 1,
                            totalPages: totalPages,
                        })
                        
                        // res.render('course', {
                        //     constants: constants,
                        //     data: courseData,
                        //     reviews: reviews
                        // })
                    }
                    else {
                        res.sendStatus(404)
                    }
                })
                .catch((err) => {
                    console.log("error")
                    res.sendStatus(500)
                })
        })

        // router.get('/like', function(req,res){
        //     let courseID = req.query.courseID;
        //     let reviewID = req.query.reviewID;
        //     console.log(courseID)
        //     console.log(reviewID)

        //     dataModel.voteUpReview(courseID, reviewID, function(voteUp){
        //         console.log(voteUp)
        //     })
        // })

        router.use(express.static(appRoot + '/static'))

        this.router = router
    }

    getRouter() {
        return this.router
    }
    
}

module.exports = AppRouter
