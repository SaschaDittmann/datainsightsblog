!function(t){"use strict";t(document).ready(function(){t(".entry-content").fitVids(),t("#menu-toggle").click(function(){var e=t(this);e.toggleClass("toggled-on").attr("aria-expanded","false"===e.attr("aria-expanded")?"true":"false"),t(".nav-menu").slideToggle()}),t(window).bind("resize orientationchange",function(){t("#menu-toggle").is(":hidden")&&(t("#menu-toggle").removeClass("toggled-on").attr("aria-expanded","false"),t(".nav-menu").removeAttr("style"))}),t("#top-link").on("click",function(e){t("html, body").animate({scrollTop:0}),e.preventDefault()})});var e="https://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic";document.createStyleSheet?document.createStyleSheet(e):t("head").append(t("<link rel='stylesheet' href='"+e+"' type='text/css' media='screen' />"))}(jQuery),function(o){"use strict";o.fn.fitVids=function(e){var i={customSelector:null};if(!document.getElementById("fit-vids-style")){var t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("div");a.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',t.appendChild(a.childNodes[1])}return e&&o.extend(i,e),this.each(function(){var e=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];i.customSelector&&e.push(i.customSelector);var t=o(this).find(e.join(","));(t=t.not("object object")).each(function(){var e=o(this);if(!("embed"===this.tagName.toLowerCase()&&e.parent("object").length||e.parent(".fluid-width-video-wrapper").length)){var t=("object"===this.tagName.toLowerCase()||e.attr("height")&&!isNaN(parseInt(e.attr("height"),10))?parseInt(e.attr("height"),10):e.height())/(isNaN(parseInt(e.attr("width"),10))?e.width():parseInt(e.attr("width"),10));if(!e.attr("id")){var i="fitvid"+Math.floor(999999*Math.random());e.attr("id",i)}e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*t+"%"),e.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto);