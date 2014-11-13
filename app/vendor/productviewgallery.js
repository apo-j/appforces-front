/**
 * BelVG LLC.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://store.belvg.com/BelVG-LICENSE-COMMUNITY.txt
 *
 *******************************************************************
 * @category   Belvg
 * @package    Belvg_Productviewgallery
 * @version    1.0.1
 * @copyright  Copyright (c) 2010 - 2013 BelVG LLC. (http://www.belvg.com)
 * @license    http://store.belvg.com/BelVG-LICENSE-COMMUNITY.txt
 */
var jQblvg  = jQuery//jQuery.noConflict();
;function prodViewGalleryForm(data, id, element, galleryConf, elImage, elThumbs, playerUrl) {
    var here = this;
    this.prodId = id;
    this.images = [];
    this.video = false;
    this.elImage = elImage;
    this.currImage = 0;
    this.formConf = galleryConf;
    this.element = element;
    this.player = playerUrl;

    this.getImages = function(data) {
        for (var i in data) {
            if (i == this.prodId) {
                ind = 0;
                this.images[ind++] = data[i]['main'];
                for (var k in data[i]['gallery']) {
                    this.images[ind++] = data[i]['gallery'][k];
                }
            } else {
                for (var m in data[i]) {
                    if (m == this.prodId) {
                         ind = 0;
                         this.images[ind++] = data[i][m]['main'];
                         for (var l in data[i][m]['gallery']) {
                             this.images[ind++] = data[i][m]['gallery'][l];
                         }
                    }
                }
            }
        }
    }

    this.setImages = function() {
        this.element.find('#wrap').css('z-index', 0);
        tmp_el = this.element.find('.product-image');
        //ie8,7 vvv
        setTimeout( function() {
            here.element.find('.product-image img').attr('src', here.element.find('.product-image img').attr('src'));
        }, 200);
        //ie8,7 ^^^
        tmp_el.find('img').bind('load', function() {
            jQblvg(this).parent().parent().last().fadeIn(parseInt(here.formConf.animspeed));
            here.refreshCloudZoom();
        });
        tmp_el.find('img').parent().parent().last().hide();
        tmp_el.find('img').attr('src', '');
        tmp_el.find('img').attr('src', this.images[0].main);
        tmp_el.find('img').attr('title', this.images[0].label);
        tmp_el.find('img').attr('alt', this.images[0].label);
        tmp_el.find('a').attr('href', this.images[0].orig);
        tmp_el.find('a').attr('title', this.images[0].label);
        tmp_el.find('a').attr('alt', this.images[0].label);
        this.element.find('.more-views ul').html('');
        for (var i in this.images) {
            if (parseInt(i)>0) {
                this.element.find('.more-views ul').append('<li>'+this.formConf.moreviewitem+'</li>');
                tmp_el = this.element.find('.more-views li');
                this.element.find('.more-views ul').attr('style','height:'+tmp_el.height()+'px');
                if (i == 1) tmp_el.last().find('a').removeClass('cs-fancybox-thumbs');
                tmp_el.last().hide();
                tmp_el.last().find('img').bind('load', function() {
                    jQblvg(this).parent().parent().fadeIn(parseInt(here.formConf.animspeed));
                });
                tmp_el.last().find('a').attr('id', 'more_view_item_'+i);
                tmp_el.last().find('a').attr('href', this.images[i].orig);
                tmp_el.last().find('a').attr('title', this.images[i].label);
                tmp_el.last().find('a').attr('alt', this.images[i].label);
                tmp_el.last().find('img').attr('src', this.images[i].thumb);
                tmp_el.last().find('img').attr('src_main', this.images[i].main);
                tmp_el.last().find('img').attr('title', this.images[i].label);
                tmp_el.last().find('img').attr('alt', this.images[i].label);
            }
        }
    }

    this.initSwitch = function() {
        this.element.find('.more-views li').find('a').click( function() {
            if (here.video != false) {
                here.element.find(here.elImage).find('#vid_block_'+here.prodId).animate({opacity:0}, parseInt(here.formConf.animspeed), function() {
                    here.playerStop();
                });
            }
            tmp_el = here.element.find('.product-image');
            if (tmp_el.find('img').attr('src') != jQblvg(this).find('img').attr('src_main')) {
                jQblvg(this).parent().parent().find('a').addClass('cs-fancybox-thumbs');
                jQblvg(this).removeClass('cs-fancybox-thumbs');
                tmp_el.find('img').bind('load', function() {
                    jQblvg(this).parent().parent().last().fadeIn(parseInt(here.formConf.animspeed));
                    here.instance.destroy();
                    here.instance = new CloudZoom(jQblvg('img.cloudzoom'), options);
                });
                tmp_el.find('img').parent().parent().last().hide();
                tmp_el.find('img').attr('src', jQblvg(this).find('img').attr('src_main'));
                tmp_el.find('img').attr('title', jQblvg(this).find('img').attr('title'));
                tmp_el.find('img').attr('alt', jQblvg(this).find('img').attr('alt'));
                tmp_el.find('a').attr('href', jQblvg(this).attr('href'));
                tmp_el.find('a').attr('title', jQblvg(this).attr('title'));
                tmp_el.find('a').attr('alt', jQblvg(this).attr('alt'));
            }
            return false;
        });

    }

    this.refreshCloudZoom = function() {
        tmp = jQblvg('.mousetrap');
        if (tmp) {
            jQblvg('.mousetrap').remove();
        }
        if (jQblvg('.cloud-zoom').length) {
            jQblvg('.cloud-zoom').CloudZoom();
        }
    }

    this.getImages(data);
    this.setImages();
    this.initSwitch();
    var options = {
        zoomSizeMode:'image',
        autoInside:550,
        tintColor:'red'
    }
    here.instance = new CloudZoom(jQblvg('img.cloudzoom'), options);
};

/*------------------------------------------------------------------------------------------------------------------*/


/* (c) 2010-2012 by messer */
( function(jQblvg) {
    jQblvg.fn.elScroll = function(options) {

        var options = jQblvg.extend({
            type: 'horizontal',
            elqty: 4,
            up: '#cs_up',
            down: '#cs_down',
            left: '#cs_left',
            right: '#cs_right',
            rail_el: 'ul',
            element: 'li',
            btn_pos: 'inner',
            scroll_speed: 1000
        }, options);

        var container = jQblvg(this);
        var rail = container.find(options.rail_el);
        var current_pos = 0;
        var elmax = 0;
        var step = 0;
        var wait = false;

        var init = function() {
            container.parent().css('position','relative');
            elmax = rail.find(options.element).length;
            if (options.type == 'horizontal') {
                //step = parseInt(rail.find(options.element).css('width'))+2*parseInt(options.el_padding)+2*parseInt(options.el_margin);
                step = rail.children().first().outerWidth(true);
                rail.css('margin-left','0px').css('width',(parseInt(step)+1)*elmax+'px');
            } else {
                //step = parseInt(rail.find(options.element).css('height'))+2*parseInt(options.el_padding)+2*parseInt(options.el_margin);
                step = rail.children().first().outerHeight(true);
                rail.css('margin-top','0px');
                rail.css('margin-left','0px').css('height',(parseInt(step)+1)*elmax+'px');
            }
            //rail.find(options.element).css('margin', options.el_margin).css('padding', options.el_padding);
            rail.find(options.element).each( function(i) {
                if (i>options.elqty-1) {
                    jQblvg(this).hide();
                }
            });
            if (options.type == 'horizontal') {
                //rail.css('height', parseInt(rail.find(options.element))+2*parseInt(options.el_padding)+2*parseInt(options.el_margin));
                rail.css('height', rail.children().first().outerHeight(true));
                //container.attr('style','height:'+container.height()+'px;width:'+parseInt(step)*parseInt(options.elqty)+'px;overflow:hidden;position:relative;');
                container.attr('style','height:'+rail.children().first().outerHeight(true)+'px;width:'+parseInt(step)*parseInt(options.elqty)+'px;overflow:hidden;position:relative;');
            } else {
                //rail.css('width', parseInt(rail.find(options.element))+2*parseInt(options.el_padding)+2*parseInt(options.el_margin
                rail.css('width', rail.children().first().outerWidth(true));
                container.attr('style','width:'+rail.children().first().outerWidth(true)+'px;height:'+parseInt(step)*parseInt(options.elqty)+'px;overflow:hidden;position:relative;');
            }

            if (options.type == 'horizontal') {
                container.find('#cs_left').remove();
                container.find('#cs_right').remove();
                container.parent().append('<a id="cs_left" href="#" style="position:absolute;z-index:0;">&nbsp;</a><a id="cs_right" href="#" style="position:absolute;z-index:0;">&nbsp;</a>');
            } else {
                container.find('#cs_up').remove();
                container.find('#cs_down').remove();
                container.parent().append('<a id="cs_up" href="#" style="position:absolute;z-index:0;">&nbsp;</a><a id="cs_down" href="#" style="position:absolute;z-index:0;">&nbsp;</a>');
            }

            setButtonsPos();
            checkButtons();
            rail.find(options.element).show();

            if (options.type == 'horizontal') {
                tmp = options.left;
            } else {
                tmp = options.up;
            }
            jQblvg(tmp).click( function() {
                if ((current_pos > 0) && (wait == false)) {
                    scrollUp();
                }
                checkButtons();
                return false;
            });
            if (options.type == 'horizontal') {
                tmp = options.right;
            } else {
                tmp = options.down;
            }
            jQblvg(tmp).click( function() {
                if (((parseInt(current_pos) + parseInt(options.elqty)) < elmax) && (wait == false)) {
                    scrollDown();
                }
                checkButtons();
                return false;
            });
        };

        var setButtonsPos = function() {
            if (options.type == 'horizontal') {
                btn_top = parseInt( container.position().top + (container.height() / 2) - (jQblvg('#cs_left').height() / 2) );
                if (options.btn_pos == 'outer') {
                    btn_left_prev = parseInt( container.position().left - jQblvg('#cs_left').width() );
                    btn_left_next = parseInt( container.position().left + container.width() );
                } else if (options.btn_pos == 'border') {
                    btn_left_prev = parseInt( container.position().left - (jQblvg('#cs_left').width() / 2) );
                    btn_left_next = parseInt( container.position().left + container.width() - (jQblvg('#cs_right').width() / 2) );
                } else {
                    btn_left_prev = parseInt( container.position().left );
                    btn_left_next = parseInt( container.position().left + container.width() - jQblvg('#cs_right').width() );
                }

                container.parent().find('#cs_left').css('top', btn_top+'px').css('left', btn_left_prev+'px');
                container.parent().find('#cs_right').css('top', btn_top+'px').css('left', btn_left_next+'px');
            } else {
                btn_left = parseInt( container.position().left + (container.width() / 2) - (jQblvg('#cs_up').width() / 2) );
                if (options.btn_pos == 'outer') {
                    btn_top_up = parseInt( container.position().top - jQblvg('#cs_up').height() );
                    btn_top_down = parseInt( container.position().top + container.height() );
                } else if (options.btn_pos == 'border') {
                    btn_top_up = parseInt( container.position().top - (jQblvg('#cs_up').height() / 2) );
                    btn_top_down = parseInt( container.position().top + container.height() - (jQblvg('#cs_down').height() / 2) );
                } else {
                    btn_top_up = parseInt( container.position().top );
                    btn_top_down = parseInt( container.position().top + container.height() - jQblvg('#cs_down').height() );
                }

                container.parent().find('#cs_up').css('left', btn_left+'px').css('top', btn_top_up+'px');
                container.parent().find('#cs_down').css('left', btn_left+'px').css('top', btn_top_down+'px');
            }
        };

        var scrollDown = function() {
            wait = true;
            if (options.type == 'horizontal') {
                rail.animate( { "margin-left": (parseInt(rail.css('margin-left'))-parseInt(step))+"px" }, options.scroll_speed, function() { wait = false; });
            } else {
                rail.animate( { "margin-top": (parseInt(rail.css('margin-top'))-parseInt(step))+"px" }, options.scroll_speed, function() { wait = false; });
            }
            current_pos++;
        };
        var scrollUp = function() {
            current_pos--;
            wait = true;
            if (options.type == 'horizontal') {
                rail.animate( { "margin-left": (parseInt(rail.css('margin-left'))+parseInt(step))+"px" }, options.scroll_speed, function() { wait = false; });
            } else {
                rail.animate( { "margin-top": (parseInt(rail.css('margin-top'))+parseInt(step))+"px" }, options.scroll_speed, function() { wait = false; });
            }
        };
        var checkButtons = function() {
            if (current_pos == 0) {
                jQblvg(options.up).fadeOut(options.scroll_speed);
                jQblvg(options.left).fadeOut(options.scroll_speed);
            } else {
                jQblvg(options.up).fadeIn(options.scroll_speed);
                jQblvg(options.left).fadeIn(options.scroll_speed);
            };
            if ((parseInt(current_pos) + parseInt(options.elqty) >= elmax) || (parseInt(options.elqty) > elmax)) {
                jQblvg(options.down).fadeOut(options.scroll_speed);
                jQblvg(options.right).fadeOut(options.scroll_speed);
            } else {
                jQblvg(options.down).fadeIn(options.scroll_speed);
                jQblvg(options.right).fadeIn(options.scroll_speed);
            };

        };

        init();
        delete data;
    }
})(jQblvg);
