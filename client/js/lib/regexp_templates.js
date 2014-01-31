define({
    // only non-digits (two or more)
    street: /^[\D]{2,}$/,

    // only digits (one to six), optionally tailed by affix (up to three letters)
    house_number: /^\d{1,6}\s?[a-zA-Z]{0,3}$/,

    // german zip code format. stolen from http://www.fadoe.de/blog/archives/262-Regulaerer-Ausdruck-fuer-Deutsche-Postleitzahlen.html
    zip: /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/,

    // very basic validation, non-whitespace characters must contain an at-char and one dot
    email: /^\S+@\S+\.\S+$/,

    // requires leading http(s)://, top-level-domain can have two to five chars, url may be followed by file path and get params
    url: /^http[s]?:\/\/[\.a-zA-ZäöüßAÖÜ0-9_-]+\.[a-zA-Z]{2,5}(\/.*)?$/,

    // requires leading +, followed be digits, whitespace or dash (min length: seven)
    phone: /^\+[\d\s-]{7,}$/
});
