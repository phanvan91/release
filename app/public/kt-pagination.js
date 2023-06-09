"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($) {
  $.fn.ktpagination = function (config) {
    var params = {};
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }

    var defaultConfig = {
      data: {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "per_page": "1",
        "to": 1,
        "total": 1
      },
      step: 10,
      show: 5,
      beforeRedirect: false,
      onClickHandler: "redirect",
      nextLabel: "Next",
      prevLabel: "Prev",
      urlPath: window.location.origin + window.location.pathname
    };

    var c = _objectSpread(_objectSpread({}, defaultConfig), config);

    function redirect(page) {
      params.page = page;
      var _url = [];
      Object.keys(params).forEach(function (key) {
        _url.push(key + "=" + params[key]);
      });
      window.location.href = c.urlPath + "?" + _url.join("&");
    }

    if (c.data.last_page > 1) {
      var rootEl = this;
      var first = {},
          prev10 = {},
          prev = {},
          next = {},
          next10 = {},
          last = {},
          displayFrom = false,
          displayTo = false,
          dotBefore = false,
          dotAfter = false,
          pagiContent = [];
      var itemHtml = "<li class=\"page-item kt-pagi-item {ITEM_CSS}\"><a class=\"page-link\" data-page=\"{NUMBER}\">{NUMBER}</a></li>";
      var dotHtml = "<li class=\"page-item disabled\"><a class=\"page-link\">...</a></li>";
      var wrapperHtml = "<nav aria-label=\"Page navigation example\">\n                <ul class=\"pagination\">\n                <li class=\"page-item {FIRST_CSS}\">\n                    <a class=\"kt-pagi-first page-link\" data-page=\"1\" href=\"#\" aria-label=\"Previous\">\n                        <i class=\"fa fa-angle-double-left\" data-page=\"1\"></i>\n                    </a>\n                </li>\n                <li class=\"page-item {PREV10_CSS}\">\n                    <a class=\"kt-pagi-prev10 page-link\" data-page=\"{PREV10_NUMBER}\" href=\"#\" aria-label=\"Previous\">\n                        <i class=\"fa fa-angle-left\" data-page=\"{PREV10_NUMBER}\"></i>\n                    </a>\n                </li>\n                <li class=\"page-item {PREV_CSS}\">\n                    <a class=\"kt-pagi-prev page-link\" data-page=\"{PREV_NUMBER}\" href=\"#\" aria-label=\"Previous\">\n                        {PREV_TEXT}\n                    </a>\n                </li>\n\n                {PAGICONTENT}\n\n                <li class=\"page-item {NEXT_CSS}\">\n                    <a class=\"kt-pagi-next page-link\" data-page=\"{NEXT_NUMBER}\" href=\"#\" aria-label=\"Previous\">\n                        {NEXT_TEXT}\n                    </a>\n                </li>\n                <li class=\"page-item {NEXT10_CSS}\">\n                    <a class=\"kt-pagi-next10 page-link\" data-page=\"{NEXT10_NUMBER}\" href=\"#\" aria-label=\"Next\">\n                        <i class=\"fa fa-angle-right\" data-page=\"{NEXT10_NUMBER}\"></i>\n                    </a>\n                </li>\n                <li class=\"page-item {LAST_CSS}\">\n                    <a class=\"kt-pagi-last page-link\" data-page=\"{LAST_NUMBER}\" href=\"#\" aria-label=\"Next\">\n                        <i class=\"fa fa-angle-double-right\" data-page=\"{LAST_NUMBER}\"></i>\n                    </a>\n                </li>\n                </ul>\n            </nav>"; //Fist

      if (c.data.current_page == 1) first.css = "disabled"; //Prev10

      if (c.data.current_page == 1) prev10.css = "disabled"; //prev

      if (c.data.current_page == 1) prev.css = "disabled"; //next

      if (c.data.current_page == c.data.last_page) next.css = "disabled"; //next10

      if (c.data.current_page == c.data.last_page) next10.css = "disabled"; //last

      if (c.data.current_page == c.data.last_page) last.css = "disabled";
      if (c.data.current_page > 1) prev.num = parseInt(c.data.current_page) - 1;
      if (c.data.current_page < c.data.last_page) next.num = parseInt(c.data.current_page) + 1;

      if (parseInt(c.data.current_page) + parseInt(c.step) > c.data.last_page) {
        next10.num = c.data.last_page;
      } else {
        next10.num = parseInt(c.data.current_page) + parseInt(c.step);
      }

      if (parseInt(c.data.current_page) - parseInt(c.step) < 1) {
        prev10.num = 1;
      } else {
        prev10.num = parseInt(c.data.current_page) - parseInt(c.step);
      }

      last.num = c.data.last_page;

      // if (c.data.last_page > c.show) {
      //   if (c.data.current_page > c.show) {
      //     dotBefore = true;
      //
      //     if (c.data.current_page > parseInt(c.data.last_page) - parseInt(c.show)) {
      //       dotAfter = false;
      //     } else {
      //       dotAfter = true;
      //     }
      //   } else {
      //     dotAfter = true;
      //   }
      // }

      // if (c.data.current_page <= c.show && c.show <= c.data.last_page) {
      //   displayFrom = 1;
      //   displayTo = c.show;
      // }
      //
      // if (c.data.current_page <= c.show && c.show > c.data.last_page) {
      //   displayFrom = 1;
      //   displayTo = c.data.last_page;
      // }
      //
      // if (c.data.current_page > c.show && c.show <= c.data.last_page) {
      //   displayFrom = parseInt(c.data.current_page) - Math.round(parseInt(c.show) / 2);
      //   displayTo =  parseInt(c.data.current_page) + parseInt(c.show) >=  parseInt(c.data.last_page) ?  c.data.last_page :   parseInt(c.data.current_page) + Math.round(parseInt(c.show) / 2);
      // }



      // if (dotBefore) {
      //   pagiContent.push(dotHtml);
      // }
      // for (var _i = displayFrom; _i <= displayTo; _i++) {
      //   var html = itemHtml.replace(/{NUMBER}/g, _i);
      //   html = html.replace(/{ITEM_CSS}/g, _i == c.data.current_page ? 'active' : '');
      //   pagiContent.push(html);
      // }
      // if (dotAfter) {
      //   pagiContent.push(dotHtml);
      // }

        if(c.data.last_page > 1){ // first page
            let html = itemHtml.replace(/{NUMBER}/g, 1);
            html = html.replace(/{ITEM_CSS}/g, 1 == c.data.current_page ? 'active' : '');
            pagiContent.push(html);
        }
        if(c.data.current_page > 4) pagiContent.push(dotHtml)
        for (let _i = 2; _i < c.data.last_page; _i++) {
            if(_i >= c.data.current_page - 2 && _i <= c.data.current_page + 2){
                let htmlPA = itemHtml.replace(/{NUMBER}/g, _i);
                htmlPA = htmlPA.replace(/{ITEM_CSS}/g, _i == c.data.current_page ? 'active' : '');
                pagiContent.push(htmlPA);
            }
        }
        if(c.data.current_page < c.data.last_page - 3) pagiContent.push(dotHtml)
        // last page
        let html = itemHtml.replace(/{NUMBER}/g, c.data.last_page);
        html = html.replace(/{ITEM_CSS}/g, c.data.last_page == c.data.current_page ? 'active' : '');
        pagiContent.push(html);

      wrapperHtml = wrapperHtml.replace(/{FIRST_CSS}/g, first.css);
      wrapperHtml = wrapperHtml.replace(/{PREV10_CSS}/g, prev10.css);
      wrapperHtml = wrapperHtml.replace(/{PREV_CSS}/g, prev.css);
      wrapperHtml = wrapperHtml.replace(/{NEXT_CSS}/g, next.css);
      wrapperHtml = wrapperHtml.replace(/{NEXT10_CSS}/g, next10.css);
      wrapperHtml = wrapperHtml.replace(/{LAST_CSS}/g, last.css);
      wrapperHtml = wrapperHtml.replace(/{NEXT10_NUMBER}/g, next10.num);
      wrapperHtml = wrapperHtml.replace(/{PREV10_NUMBER}/g, prev10.num);
      wrapperHtml = wrapperHtml.replace(/{PREV_NUMBER}/g, prev.num);
      wrapperHtml = wrapperHtml.replace(/{NEXT_NUMBER}/g, next.num);
      wrapperHtml = wrapperHtml.replace(/{LAST_NUMBER}/g, last.num);
      wrapperHtml = wrapperHtml.replace(/{PREV_TEXT}/g, c.prevLabel);
      wrapperHtml = wrapperHtml.replace(/{NEXT_TEXT}/g, c.nextLabel);
      wrapperHtml = wrapperHtml.replace(/{PAGICONTENT}/g, pagiContent.join(''));
      rootEl.html(wrapperHtml);
      rootEl.on('click', '.kt-pagi-item', function (e) {
        // console.log("ITEM", $(e.target).data('page'));
        eval(c.onClickHandler)($(e.target).data('page'));
      });
      rootEl.on('click', '.kt-pagi-first', function (e) {
        // console.log("FIRST", $(e.target).data('page'));
        eval(c.onClickHandler)($(e.target).data('page'));
      });
      rootEl.on('click', '.kt-pagi-prev10', function (e) {
        // console.log("PREV10", $(e.target).data('page'));
        eval(c.onClickHandler)($(e.target).data('page'));
      });
      rootEl.on('click', '.kt-pagi-prev', function (e) {
        // console.log("PREV", $(e.target).data('page'));
        eval(c.onClickHandler)($(e.target).data('page'));
      });
      rootEl.on('click', '.kt-pagi-next', function (e) {
        // console.log("NEXT", $(e.target).data('page'));
        eval(c.onClickHandler)($(e.target).data('page'));
      });
      rootEl.on('click', '.kt-pagi-next10', function (e) {
        // console.log("NEXT10", $(e.target).data('page'));
        eval(c.onClickHandler)($(e.target).data('page'));
      });
      rootEl.on('click', '.kt-pagi-last', function (e) {
        // console.log("LAST", $(e.target).data('page'));
        eval(c.onClickHandler)($(e.target).data('page'));
      });
    }
    else{
        var rootEl = this;
        rootEl.html("");
    }
  };
})(jQuery);
