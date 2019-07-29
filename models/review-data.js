
class ReviewData {
    constructor () {
        this.reviewID = ""
        this.courseID = ""
        this.body = "" // empty means rating only
        this.likes = 0
        this.dislikes = 0
        this.userID = ""
        this.userName = "John Smith"
        this.userPicture = ""
        this.difficultyRating = 0
        this.qualityRating = 0
        this.time = 0
    }
}

module.exports = ReviewData
