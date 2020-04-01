"use strict";

(function () {

  // 变量
  var timeline = document.querySelector(".timeline ol"),
      elH = document.querySelectorAll(".timeline li > div"),
      arrows = document.querySelectorAll(".timeline .arrows .arrow"),
      arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
      arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
      firstItem = document.querySelector(".timeline li:first-child"),
      lastItem = document.querySelector(".timeline li:last-child"),
      xScrolling = 490,
      disabledClass = "disabled";

  // 开始
  window.addEventListener("load", init);

  function init() {
    setEqualHeights(elH);
    animateTl(xScrolling, arrows, timeline);
    setSwipeFn(timeline, arrowPrev, arrowNext);
    setKeyboardFn(arrowPrev, arrowNext);
  }

  // 设置相等高度
  function setEqualHeights(el) {
    var counter = 0;
    for (var i = 0; i < el.length; i++) {
      var singleHeight = el[i].offsetHeight;

      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }

    for (var i = 0; i < el.length; i++) {
      el[i].style.height = counter + "px";
    }
  }

  // 检查元素是否在视区中
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 
    && rect.left >= 0 
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) 
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  // 设置上一个/下一个箭头的状态 
  function setBtnState(el) {
    var flag = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    if (flag) {
      el.classList.add(disabledClass);
    } else {
      if (el.classList.contains(disabledClass)) {
        el.classList.remove(disabledClass);
      }
      el.disabled = false;
    }
  }

  // 动画时间线
  function animateTl(scrolling, el, tl) {
    var counter = 0;
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener("click", function () {
        if (!arrowPrev.disabled) {
          arrowPrev.disabled = true;
        }
        if (!arrowNext.disabled) {
          arrowNext.disabled = true;
        }
        var sign = this.classList.contains("arrow__prev") ? "" : "-";
        if (counter === 0) {
          tl.style.transform = "translateX(-" + scrolling + "px)";
        } else {
          var tlStyle = getComputedStyle(tl);
          // add more browser prefixes if needed here
          var tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
          var values = parseInt(tlTransform.split(",")[4]) + parseInt("" + sign + scrolling);
          tl.style.transform = "translateX(" + values + "px)";
        }

        setTimeout(function () {
          isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
          isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
        }, 1100);

        counter++;
      });
    }
  }


  // 添加对触摸设备的滑动支持
  function setSwipeFn(tl, prev, next) {
    var hammer = new Hammer(tl);
    hammer.on("swipeleft", function () {
      return next.click();
    });
    hammer.on("swiperight", function () {
      return prev.click();
    });
  }

  // 添加基本键盘功能
  function setKeyboardFn(prev, next) {
    document.addEventListener("keydown", function (e) {
      if (e.which === 37 || e.which === 39) {
        var timelineOfTop = timeline.offsetTop;
        var y = window.pageYOffset;
        if (timelineOfTop !== y) {
          window.scrollTo(0, timelineOfTop);
        }
        if (e.which === 37) {
          prev.click();
        } else if (e.which === 39) {
          next.click();
        }
      }
    });
  }
})();



