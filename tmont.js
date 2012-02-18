(function(window){

    function loadScript(url, callback) {
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        var done = false;
        script.type = 'text/javascript';
        script.src = url;
        body.appendChild(script);
        script.onload = script.onreadystatechange = function() {
            var isReady = !this.readyState ||
                this.readyState === 'loaded' ||
                this.readyState === 'complete';

            if (!done && isReady) {
                done = true;
                callback();
                script.onload = script.onreadystatechange = null;
                body.removeChild(script);
            }
        };
    }

    var embedString = '<iframe width="560" height="315" src="http://www.youtube.com/embed/t1kApnsayeQ?autoplay=1" frameborder="0" allowfullscreen></iframe>';
    window.tmont = function() {
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', function() {
            var left = $(window).width() / 2 - 280;
            var top = $(window).height() / 2 - 167.5;

            var zIndex = 1000000;
            $('<div/>').css({
                left: 0,
                top: 0,
                position: 'fixed',
                width: '100%',
                height: '100%',
                backgroundColor: '#000000',
                opacity: 0,
                zIndex: zIndex
            }).appendTo('body').fadeTo(0.8);

            $('<div/>').css({
                left: -100000,
                top: top,
                position: 'fixed',
                zIndex: zIndex + 1,
                width: 560,
                height: 315,
                padding: 10px;
                boxShadow: '0 2px 5px rgba(9, 0, 0, 0.8)'
            }).html(embedString).appendTo('body').animate({
                left: left
            }, 1000, 'swing');
        });
    };

    var interval = window.setInterval(function() {
        if (document.getElementsByTagName('body')[0]) {
            window.clearInterval(interval);
            window.tmont();
        }
    }, 100);
}(window));
