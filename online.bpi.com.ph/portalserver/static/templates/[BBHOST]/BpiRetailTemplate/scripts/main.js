(function() {
    if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) {
        document.addEventListener('contextmenu', function(event) {
            alert('Right click is disabled.');
            event.preventDefault();
        });
    }

    if (window.location.host === '') {
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'interactive' || document.readyState === 'complete') {
                document.body.innerHTML = '';
            }
        });
    }

    // Prevent auto-execution of scripts when no explicit dataType was provided (See https://github.com/jquery/jquery/issues/2432)
    jQuery.ajaxPrefilter(function(s) {
        if (s.crossDomain) {
            s.contents.script = false;
        }
    });
})();
