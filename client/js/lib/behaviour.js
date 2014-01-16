$(function() {
    // never focus button elements
    $(document).on('click', 'button', function() { $(this).blur() });
    $(document).on('click', '#js-main-navi-items a', function() { $(this).blur() });
});
