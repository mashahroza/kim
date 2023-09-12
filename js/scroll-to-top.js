!(function(win){
    var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.msRequestAnimationFrame || function (cb) {
        return setTimeout(cb, 16);
    };

    jQuery(function ($) {
        'use strict';
        var w = window,  d = document;

        var topBtn = d.getElementById('scroll-top'),
        topBtnVisible = false,
        topBtnReverse = false,
        topBtnVisibleOffset = 1300,
        topBtnVisibleCls = 'visible',
        topBtnReverseCls = 'reverse',
        showbutton       = jQuery(w).height() * 2,
        stopScrollMobileCls = 'noscroll-mobile';

        if (topBtn === null) {
          return;
        }
        function checkTbState() {
          var yOffset = w.pageYOffset;
          if (topBtn) {
            if (yOffset > topBtnVisibleOffset) {
              if (!topBtnVisible && topBtnReverse) {
                raf(function () { $(topBtn).removeClass(topBtnReverseCls);});
                topBtnReverse = false;
              }
              if (!topBtnVisible) {
                raf(function () { $(topBtn).addClass(topBtnVisibleCls); });
                topBtnVisible = true;
              }
            } else {
              if (topBtnVisible) {
                raf(function () { $(topBtn).removeClass(topBtnVisibleCls);});
                topBtnVisible = false;
              }
            }
          }
        }

        raf(checkTbState);
        var checkTbStateScheduled = false;

        w.addEventListener('scroll', function () {

          if (checkTbStateScheduled) {
            return true;
          }
          checkTbStateScheduled = true;
          raf(function () {
            checkTbState();
            if ( topBtn && jQuery(w).scrollTop() >= showbutton ) {
              jQuery(topBtn).show(300);
            }
            checkTbStateScheduled = false;
          });
        });

        if (topBtn) {
          topBtn.onclick = function (ev) {
            if ($(this).hasClass(topBtnReverseCls)) {
              if (!$(this).hasClass(topBtnVisibleCls)) {
                $(this).addClass(topBtnVisibleCls);
                topBtnVisible = true;
              }
              topBtnReverse = false;
              $(this).removeClass(topBtnReverseCls);
              $([d.documentElement, d.body]).animate({scrollTop: $(this).data('reverse')}, 300)
              return;
            }
            topBtnReverse = true;
            $(this).addClass(topBtnReverseCls);
            $(this).data('reverse', w.pageYOffset);
            $([d.documentElement, d.body]).animate({scrollTop: 0}, 300);
          };
        }    
    });

})(window);
