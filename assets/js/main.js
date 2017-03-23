var APP = {};

  APP.loadModule = (function () {
    var bindings = {};

    function setupBindings() {
      bindings.head = document.getElementsByTagName('head')[0];
      bindings.maincss = document.createElement('link'); bindings.maincss.rel = 'stylesheet';
      bindings.toptextbox = document.getElementById('top-text-box');

      bindings.fouc = document.getElementById("fouc");
      bindings.loading = document.getElementById("loading");
    };

    function createLinks() {
      //bindings.maincss.href = 'assets/css/main.css';
      //bindings.head.appendChild(bindings.maincss);

    }

    function show_fouc() {
      bindings.fouc.style.display="block";
      return true;
    }

    function init() {
      setupBindings();
      createLinks();
      if (bindings.loading) {
        show_fouc();
        setTimeout(function() {
          bindings.loading.className="visuallyhidden";
          bindings.loading.addEventListener('transitionend', function(e) {
            bindings.loading.className="hidden";
          });
        }, 300);
      }
    }

    return {
      init: init
    }
  }());

  APP.utilityModule = (function () {
    var scrollToSection = function(element, to, duration) {
      if (duration <= 0) return;
      var difference = to - element.scrollTop;
      var perTick = difference / duration * 10;

      setTimeout(function() {
          element.scrollTop = element.scrollTop + perTick;
          if (element.scrollTop === to) return;
          scrollToSection(element, to, duration - 10);
      }, 10);
    }

    return {
      scrollToSection: scrollToSection
    }
  }());

  APP.navigationModule = (function () {
    var bindings = {};

    function setupBindings() {
    bindings.navbtn = document.getElementById('navbtn');
    bindings.mobilenav = document.getElementById('mobile-nav');
    }

    function addToggleEvent(element, myEvent, fnc) {
      element.addEventListener(myEvent, fnc, false);;
    };

    function toggleFunction() {

        if (bindings.mobilenav.className == "mobile-menu is-open") {
          bindings.mobilenav.className = "mobile-menu is-closed";
          }
        else {
          bindings.mobilenav.className = "mobile-menu is-open";
        }
    };

    function init() {
      setupBindings();
      addToggleEvent(bindings.navbtn, 'click', toggleFunction);
    };

    return {
      init: init
    }
  }());


  APP.goToTopModule = (function(){
    var bindings = {};

    function setupBindings() {
      bindings.goToTopButton = document.getElementById('go-to-top');
    };

    function addOnClickEvent(element, myEvent, fnc) {
      element.addEventListener(myEvent, fnc, false);
    };

    function scrollFunction() {
      APP.utilityModule.scrollToSection(document.body, document.body.offsetTop, 600);
    };

    function init() {
      setupBindings();
      addOnClickEvent(bindings.goToTopButton, 'click', scrollFunction);
    };

    return {
      init: init
    }
  })();

  APP.loadModule.init();
  APP.navigationModule.init();
  APP.goToTopModule.init();
