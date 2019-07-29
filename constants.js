const appRoot = require('app-root-path')

module.exports = {
    PORT: 8000,
    LOCAL_DATA_FILE: appRoot + '/data/data.json',
    LOCAL_FAKE_DATA_FILE: appRoot + '/data/fake-data.json',
    COBALT_API_KEY: 'yOm6EunUkWMKPJw2NBCYtbclohWSkHqp',
    COBALT_COURSES_URL: 'https://cobalt.qas.im/api/1.0/courses/filter',
    COBALT_DATA_FILE: appRoot + '/data/cobalt-data.json',
    TEMP_FILE: appRoot + '/data/temp.json',
    DB_URL: "mongodb://csc301:csc123456@ds023530.mlab.com:23530/csc301",
    GOOGLE_CREDENTIALS: {
        "client_id":"1056206965224-vkspntrskm8v7eng1r5khvan4h8vsh98.apps.googleusercontent.com",
        "project_id":"uoft-course-copi-1543460601802",
        "auth_uri":"https://accounts.google.com/o/oauth2/auth",
        "token_uri":"https://www.googleapis.com/oauth2/v3/token",
        "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
        "client_secret":"VbkZpSgnRRdNd0FxMq4u_0Bm",
        "javascript_origins":["https://uoft-course-copilot.herokuapp.com"]
    }
}
