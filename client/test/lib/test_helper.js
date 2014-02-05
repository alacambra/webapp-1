function find_missing_translation($view) {
    var match = $view.text().match(/missing \"([\w\.]+)\" translation/);
    return match ? match[1] : undefined;
}
