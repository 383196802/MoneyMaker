

var newReview = {
    reviewID: "",
    courseID: courseID,
    body: "",
    likes: 0,
    dislikes: 0,
    userID: "",
    difficultyRating: 0,
    qualityRating: 0,
    time: 0
}

var submitting = false

function showNewCommentContainer() {
    $('#new-comment-container').removeClass('hidden')
    setQualityRating(5)
    setDifficultyRating(5)
}

function setRating(textID, starIDPrefix, reviewDataProp, rating) {
    for (var i = 1; i <= 5; ++i) {
        var element = $('#' + starIDPrefix + i)
        if (i <= rating) {
            element.addClass('checked')
        }
        else {
            element.removeClass('checked')
        }
    }
    newReview[reviewDataProp] = rating
    $('#' + textID).text(rating)
}

function setQualityRating(rating) {
    setRating('new-comment-q-rating-text', 'new-comment-q-rating-star-', 'qualityRating', rating)
}

function setDifficultyRating(rating) {
    setRating('new-comment-d-rating-text', 'new-comment-d-rating-star-', 'difficultyRating', rating)
}

function submitReview() {
    if (submitting) {
        return
    }

    if (currentGoogleUser == null) {
        alert('You must log in to post reviews.')
        return
    }
    
    newReview.body = $('#new-comment-editor').val()
    submitting = true
    apiRequest(
        'reviews',
        'POST',
        newReview,
        function (err, data) {
            if (err) {
                console.log(err);
            }
            refresh()
        }
    )
}

function updateLike(reviewID) {
    if (submitting) {
        return
    }

    submitting = true
    apiRequest(
        'like',
        'POST',
        {"reviewID": reviewID},
        function (err, data) {
            refresh()
        }
    )
}

function updateDisLike(reviewID) {
    if (submitting) {
        return
    }

    submitting = true
    apiRequest(
        'dislike',
        'POST',
        {"reviewID": reviewID},
        function (err, data) {
            refresh()
        }
    )
}
