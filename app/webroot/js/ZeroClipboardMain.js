  jQuery(document).ready(function() {
    
    var clip = new ZeroClipboard(jQuery("#copy_link"), {
      moviePath: "/js/ZeroClipboard.swf"
    });

    clip.on('load', function (client) {
      debugstr("Flash movie loaded and ready.");
    });

    clip.on('noFlash', function (client) {
      jQuery(".demo-area").hide();
      debugstr("Your browser has no Flash.");
    });

    clip.on('wrongFlash', function (client, args) {
      jQuery(".demo-area").hide();
      debugstr("Flash 10.0.0+ is required but you are running Flash " + args.flashVersion.replace(/,/g, "."));
    });

    clip.on('complete', function (client, args) {
      debugstr("Copied text to clipboard: " + args.text);
    });

    var clip1 = new ZeroClipboard(jQuery("#copy_career_link"), {
      moviePath: "/js/ZeroClipboard.swf"
    });

    clip1.on('load', function (client) {
      debugstr("Flash movie loaded and ready.");
    });

    clip1.on('noFlash', function (client) {
      jQuery(".demo-area").hide();
      debugstr("Your browser has no Flash.");
    });

    clip1.on('wrongFlash', function (client, args) {
      jQuery(".demo-area").hide();
      debugstr("Flash 10.0.0+ is required but you are running Flash " + args.flashVersion.replace(/,/g, "."));
    });

    clip1.on('complete', function (client, args) {
      debugstr("Copied text to clipboard: " + args.text);
    });

    // jquery stuff (optional)
    function debugstr(text) {
      jQuery("#d_debug").append(jQuery("<p>").text(text));
    }

  });

  var _gauges = _gauges || [];
  (function() {
    var t   = document.createElement('script');
    t.type  = 'text/javascript';
    t.async = true;
    t.id    = 'gauges-tracker';
    t.setAttribute('data-site-id', '501d5697f5a1f502f2000057');
    t.src = '//secure.gaug.es/track.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s);
  })();
