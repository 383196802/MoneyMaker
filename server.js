const express = require('express')
const express_hbs = require('express-handlebars')
const SimpleDataModel = require('./models/simple-data-model.js')
const path = require('path')
const APIRouter = require('./routers/api-router.js')
const AppRouter = require('./routers/app-router.js')
const constants = require('./constants.js')
const util = require('./util.js')
const MongoDBDataModel = require('./models/mongodb-data-model.js')

// singleton app
let app = express()

// singleton data model
// let simpleDataModel = new SimpleDataModel(constants.LOCAL_DATA_FILE)
let mongoDBDataModel = new  MongoDBDataModel();

// routers
let api_router = new APIRouter(mongoDBDataModel).getRouter()
let app_router = new AppRouter(mongoDBDataModel).getRouter()

/* // tests
let CourseData = require('./models/course-data.js')
let courseData = new CourseData()
courseData.courseID = "csc108"
let ReviewData = require('./models/review-data.js')
let reviewData = new ReviewData()
reviewData.courseID = "csc108"
simpleDataModel.addCourse(courseData)
simpleDataModel.addReview(reviewData)
*/ 

app.engine('hbs', express_hbs({defaultLayout: 'main', extname: '.hbs', helpers: util.handlebarHelpers}))
app.set('view engine', 'hbs')

app.use('/api', api_router)
app.use('/', app_router)

let port = process.env.PORT || constants.PORT

app.listen(port, function () {
    console.log("server started.")
})
