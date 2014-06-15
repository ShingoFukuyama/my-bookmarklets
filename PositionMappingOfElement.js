(function(fn, d) {

  var css = d.createElement('link');
  css.rel = 'stylesheet';
  css.href = '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css';
  d.body.appendChild(css);

  var jq = d.createElement('script');
  jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
  jq.onload = function() {
    var ui = d.createElement('script');
    ui.src = '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js';
    ui.onload = function() {
      fn(jQuery.noConflict(true));
    };
    d.body.appendChild(ui);
  };
  d.body.appendChild(jq);


})(function($) {

  $.fn.flexibleElem = function() {
    return '<div class="flexibleElem" style="width:60px;height:60px;z-index:999999;position:absolute;background:rgba(255,0,0,0.2);cursor:move;display:none;">'+ '' +'</div>';
  };

  var $body = $('body');
  var $elem = $('div,section,article,aside,header,footer,p');
  $body.append('<style type="text/css">.mouseOn{ background:#ffa !important; }</style>'
               +'<div id="flexibleController" style="width:130px;height:150px;border:1px solid #999;border-radius:15px;z-index:1000000;position:fixed;bottom:0;left:0;background:#fff;padding:15px;cursor:move;">'
               +'<div><textarea style="display:block;width:120px;height:80px;margin:0 auto 15px;padding:5px;"></textarea></div>'
               +'<div><button id="flexibleAdd" style="color:#999;font-size:13px;margin:0 auto;line-height:14px;text-align:center;width:40px;height:40px;padding:5px;border-radius:40px;background:none;display:none;">+Add New</button></div>'
               +'</div>');
  var $flexibleController = $body.find('#flexibleController');
  var $flexibleAdd = $flexibleController.find('#flexibleAdd');
  $flexibleController.draggable();

  $flexibleAdd.on('mouseup', function() {
    $.fn.addNew();
  });

  $.fn.targetAction = function() {
    var _position = this.css('position');
    if (_position == 'static') {
      this.css('position', 'relative');
    }
    this.prepend($.fn.flexibleElem());
    this.children('.flexibleElem').draggable().resizable().show(300);
  };

  var addFlexibleElem = function(e) {
    var $t = $(this);
    e.stopPropagation();
    e.type === 'mouseover' ? $t.css({
      outline: "2px solid rgb(30, 90, 255)"
    }).addClass('mouseOn') : $elem.css({
      outline: 'none'
    }).removeClass('mouseOn');
    if (e.type === 'click') {
      if ($flexibleAdd.css('display') == 'none') $flexibleAdd.show(300);
      e.preventDefault();
      $('mouseOn').css({
        outline: 'none'
      }).removeClass('mouseOn');
      $elem.off('mouseover.r mouseout.r click.r');
      $t.targetAction();
    }
  };
  $elem.on('mouseover.r mouseout.r click.r', addFlexibleElem);

  $.fn.addNew = function() {
    $elem.on('mouseover.r mouseout.r click.r', addFlexibleElem);
  };

  var $textarea = $flexibleController.find('textarea');
  $(document).on('drag.r dragstart.r dragstop.r', '.flexibleElem', function(e, ui) {
    var $t = $(this);
    var $p = $t.parent();
    var _top = Math.round(ui.position.top);
    var _left = Math.round(ui.position.left);
    var _width = $t.width();
    var _height = $t.height();
    $textarea.val('top: '+_top+'px;\nleft: '+_left+'px;\n'+'width: '+_width+'px;\nheight: '+_height+';');
    if (e.type === 'dragstart') $p.css({outline: '1px solid #f90'});
    if (e.type === 'dragstop')  $p.css({outline: 'none'});
  }).on('resize.r resizestart.r resizestop.r', function(e, ui) {
    var $t = ui.element;
    var $p = $t.parent();
    console.log($t[0].tagName);
    var _top = ui.position.top;
    var _left = ui.position.left;
    var _width = ui.size.width;
    var _height = ui.size.height;
    $textarea.val('top: '+_top+'px;\nleft: '+_left+'px;\n'+'width: '+_width+'px;\nheight: '+_height+';');
    if (e.type === 'resizestart') $p.css({outline: '1px solid #f90'});
    if (e.type === 'resizestop')  $p.css({outline: 'none'});
  });



}, document);
