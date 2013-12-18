$(function() {
    // never focus button elements
    $(document).on('click', 'button', function() { $(this).blur() });
});
