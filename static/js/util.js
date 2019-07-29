var currentGoogleUser = null

/**
 * Make AJAX request. Requires jQuery to work.
 * @param {string} url Url to make request.
 * @param {string} type Type of request to make, 'GET', 'POST', etc.
 * @param {object} body Object to send (will pass through JSON.stringify)
 * @param {function} callback Called when response comes back.
 *     Parameters for callback: (err, data).
 *     Data will be passed through JSON.parse.
 */
function request(url, type, body, callback) {
    $.ajax({
        url: url,
        type: type,
        data: JSON.stringify(body),
        dataType: 'json', // parse returned json automatically
        contentType: 'application/json; charset=utf-8',
        success: function (data, textStatus, jqXHR) {
            callback(null, data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            callback(errorThrown, null)
        }
    });
}

function apiRequest(endpoint, type, body, callback) {
    request(
        "api/" + endpoint,
        type,
        {
            userToken: currentGoogleUser ?
                currentGoogleUser.getAuthResponse().id_token : null,
            body: body
        },
        callback
    )
}

function onSignIn(googleUser) {
    currentGoogleUser = googleUser
    var profile = googleUser.getBasicProfile();
    console.log("User logged in.");
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $('#sign-in-button').addClass('hidden')
    $('#sign-out-button').removeClass('hidden')
    setUserPicture(profile.getImageUrl())
}

function signOut() {
    if (currentGoogleUser) {
        currentGoogleUser.disconnect()
        refresh()
    }

    $('#sign-in-button').removeClass('hidden')
    $('#sign-out-button').addClass('hidden')
    setUserPicture(null)
}

function setUserPicture(img) {
    var el = $('#user-picture')
    if (!img) {
        el.addClass('hidden')
        return
    }

    el.removeClass('hidden')
    el.attr('src', img)
}

function refresh() {
    location.reload(true)
}

// https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
function updateURLQuery(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function gotoCoursePage(queryParam, page, disabled) {
    if (disabled) {
        return
    }
    window.location.href = updateURLQuery(window.location.href, queryParam, page.toString())
}
