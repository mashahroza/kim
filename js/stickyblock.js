(function(d){"function"===typeof define&&define.amd?define(["jquery"],d):"object"===typeof module&&module.exports?module.exports=d(require("jquery")):d(jQuery)})(function(d){var p=Array.prototype.slice,t=Array.prototype.splice,m={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:"",widthFromWrapper:!0,responsiveWidth:!1,zIndex:"inherit"},n=d(window),u=d(document),l=[],q=n.height(),k=function(){var b=n.scrollTop(),f=u.height(),c=f-q;c=b>c?c-
    b:0;for(var e=0,g=l.length;e<g;e++){var a=l[e],h=a.stickyWrapper.offset().top-a.topSpacing-c;a.stickyWrapper.css("height",a.stickyElement.outerHeight());if(b<=h)null!==a.currentTop&&(a.stickyElement.css({width:"",position:"",top:"","z-index":""}),a.stickyElement.parent().removeClass(a.className),a.stickyElement.trigger("sticky-end",[a]),a.currentTop=null);else{h=f-a.stickyElement.outerHeight()-a.topSpacing-a.bottomSpacing-b-c;h=0>h?h+a.topSpacing:a.topSpacing;if(a.currentTop!==h){if(a.getWidthFrom){padding=
    a.stickyElement.innerWidth()-a.stickyElement.width();var k=d(a.getWidthFrom).width()-padding||null}else a.widthFromWrapper&&(k=a.stickyWrapper.width());null==k&&(k=a.stickyElement.width());a.stickyElement.css("width",k).css("position","fixed").css("top",h).css("z-index",a.zIndex);a.stickyElement.parent().addClass(a.className);null===a.currentTop?a.stickyElement.trigger("sticky-start",[a]):a.stickyElement.trigger("sticky-update",[a]);a.currentTop===a.topSpacing&&a.currentTop>h||null===a.currentTop&&
h<a.topSpacing?a.stickyElement.trigger("sticky-bottom-reached",[a]):null!==a.currentTop&&h===a.topSpacing&&a.currentTop<h&&a.stickyElement.trigger("sticky-bottom-unreached",[a]);a.currentTop=h}var m=a.stickyWrapper.parent();a.stickyElement.offset().top+a.stickyElement.outerHeight()>=m.offset().top+m.outerHeight()&&a.stickyElement.offset().top<=a.topSpacing?a.stickyElement.css("position","absolute").css("top","").css("bottom",0).css("z-index",""):a.stickyElement.css("position","fixed").css("top",h).css("bottom",
    "").css("z-index",a.zIndex)}}},r=function(){q=n.height();for(var b=0,f=l.length;b<f;b++){var c=l[b],e=null;c.getWidthFrom?c.responsiveWidth&&(e=d(c.getWidthFrom).width()):c.widthFromWrapper&&(e=c.stickyWrapper.width());null!=e&&c.stickyElement.css("width",e)}},g={init:function(b){return this.each(function(){var f=d.extend({},m,b),c=d(this),e=c.attr("id"),k=e?e+"-"+m.wrapperClassName:m.wrapperClassName,a=d("<div></div>").attr("id",k).addClass(f.wrapperClassName);c.wrapAll(function(){if(0==d(this).parent("#"+
        k).length)return a});e=c.parent();f.center&&e.css({width:c.outerWidth(),marginLeft:"auto",marginRight:"auto"});"right"===c.css("float")&&c.css({"float":"none"}).parent().css({"float":"right"});f.stickyElement=c;f.stickyWrapper=e;f.currentTop=null;l.push(f);g.setWrapperHeight(this);g.setupChangeListeners(this)})},setWrapperHeight:function(b){b=d(b);var f=b.parent();f&&f.css("height",b.outerHeight())},setupChangeListeners:function(b){window.MutationObserver?(new window.MutationObserver(function(f){(f[0].addedNodes.length||
        f[0].removedNodes.length)&&g.setWrapperHeight(b)})).observe(b,{subtree:!0,childList:!0}):window.addEventListener?(b.addEventListener("DOMNodeInserted",function(){g.setWrapperHeight(b)},!1),b.addEventListener("DOMNodeRemoved",function(){g.setWrapperHeight(b)},!1)):window.attachEvent&&(b.attachEvent("onDOMNodeInserted",function(){g.setWrapperHeight(b)}),b.attachEvent("onDOMNodeRemoved",function(){g.setWrapperHeight(b)}))},update:k,unstick:function(b){return this.each(function(){for(var b=d(this),c=
        -1,e=l.length;0<e--;)l[e].stickyElement.get(0)===this&&(t.call(l,e,1),c=e);-1!==c&&(b.unwrap(),b.css({width:"",position:"",top:"","float":"","z-index":""}))})}};window.addEventListener?(window.addEventListener("scroll",k,!1),window.addEventListener("resize",r,!1)):window.attachEvent&&(window.attachEvent("onscroll",k),window.attachEvent("onresize",r));d.fn.sticky=function(b){if(g[b])return g[b].apply(this,p.call(arguments,1));if("object"!==typeof b&&b)d.error("Method "+b+" does not exist on jQuery.sticky");
else return g.init.apply(this,arguments)};d.fn.unstick=function(b){if(g[b])return g[b].apply(this,p.call(arguments,1));if("object"!==typeof b&&b)d.error("Method "+b+" does not exist on jQuery.sticky");else return g.unstick.apply(this,arguments)};d(function(){setTimeout(k,0)})});


// jQuery(document).ready(function($){
//     $("#sticky_block").sticky({topSpacing:60});
// });

// (function(){
// 		var a = document.querySelector('#sticky_block'),
// 		b = null, P = 100;
// 		window.addEventListener('scroll', Ascroll, false);
// 		document.body.addEventListener('scroll', Ascroll, false);
// 		function Ascroll() {
// 		  if (b == null) {
// 		    var Sa = getComputedStyle(a, ''), s = '';
// 		    for (var i = 0; i < Sa.length; i++) {
// 		      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
// 			s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
// 		      }
// 		    }
// 		    b = document.createElement('div');
// 		    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
// 		    a.insertBefore(b, a.firstChild);
// 		    var l = a.childNodes.length;
// 		    for (var i = 1; i < l; i++) {
// 		      b.appendChild(a.childNodes[1]);
// 		    }
// 		    a.style.height = b.getBoundingClientRect().height + 'px';
// 		    a.style.padding = '0';
// 		    a.style.border = '0';
// 		  }
// 		  var Ra = a.getBoundingClientRect(),
// 		      R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('#secondary').getBoundingClientRect().top + 0);
// 		  if ((Ra.top - P) <= 0) {
// 		    if ((Ra.top - P) <= R - 200) {
// 		      b.className = 'stop';
// 		      b.style.top = - R +'px';
// 		    } else {
// 		      b.className = 'stickytop';
// 		      b.style.top = P + 'px';
// 		    }
// 		  } else {
// 		    b.className = '';
// 		    b.style.top = '';
// 		  }
// 		  window.addEventListener('resize', function() {
// 		    a.children[0].style.width = getComputedStyle(a, '').width
// 		  }, false);
// 		}
// 		})()
