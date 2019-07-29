
let util = {
    startswith(string, prefix) {
        if (prefix.length > string.length) {
            return false
        }
        for (var i = 0; i < prefix.length; ++i) {
            if (string.charAt(i) != prefix.charAt(i)) {
                return false
            }
        }

        return true
    },

    randint(min, max) {
        return Math.floor(min + Math.random() * (max - min))
    },

    handlebarHelpers: {
        fixed(num, precision) {
            num = num || 0
            return num.toFixed(precision)
        },
        formatTime(time) {
            return new Date(time).toISOString().substring(0, 10)
        },
        json(context) {
            return JSON.stringify(context).replace(/"/g, '&quot;');
        },

        ifeq(conditional, options){
            if (conditional == options.hash.equals) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },

        ifnot(condition, then) {
            return !condition ? then : ""
        },

        disabledIfCond(condition) {
            return condition ? "disabled" : ""
        },
    },
}

/*
// tests
console.log(util.startswith('what', 'wh'))
console.log(util.startswith('what', 'wa'))
console.log(util.startswith('wh', 'what'))
console.log(util.startswith('', ''))
console.log(util.startswith('what', ''))
console.log(util.startswith('', 'wt'))
*/

module.exports = util
