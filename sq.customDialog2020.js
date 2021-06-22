/**
 * SQ dialog @VERSION@
 * @author  modified by hanzh
 * @date 2015-10-14
 *
 * @Depends:
 *   jquery
 *   sq.core
 *
 *
 * @Options
 *  {
 *      title: null,
 *      buttons: null,
 *      mask: true,
 *      type: "html", // html/iframe/ajax
 *      content: "",
 *      width: 600,
 *      height: auto,
 *      appendTo: "body",
 *      autoShow: true,
 *      drag:true,	     //是否能拖动
 *      classStyle: ""  //皮肤的class名
 *   }
    @Options.buttons 可以为以下值：
        string,      //链接地址
        function,
        object:{
            cls     //自定义的样式名
            fn      //按钮的function
            href    //可选，a标签的链接
            target  //可选，a标签是否新窗口
        }
 */


(function( $, win, SQ ) {

    var Dialog = new SQ.Class( SQ.Widget );

    Dialog.include({
        init: function( options ) {
            this.setting = {
                title: null,
                buttons: null,
                mask: true,
                type: "html", // html/iframe/ajax
                content: "",
                width: 600,
                height: 'auto',
                appendTo: document.body,
                autoShow: true,
                drag:true,
                classStyle: ""
            };
            $.extend( this.setting, options );
            this.render();
            this.events();
            if ( this.setting.autoShow ) {
                this.show();
            }
            this.drag();
        },
        events: function() {
            $( window ).resize( this.proxy(this.position) );
            this.el
                .on( "click.sq.dialog", ".sq-dialog-btn[href^=javascript]", this.proxy(this._buttonsHandler) )
                .on( "click.sq.dialog", ".sq-dialog-close", this.proxy(this.hide) );
        },

        _buttonsHandler: function( e ) {
            e.preventDefault();
            var target = $( e.target ),
                name = target.attr( "data-name" ),
                btn = this.setting.buttons[ name ];

            if ( btn ) {
                if ( typeof btn === "function" ) {
                    btn( e, this, name );
                }
                if ( btn.fn && typeof btn.fn === "function" ) {
                    btn.fn( e, this, name );
                }
            }
        },

        render: function() {
            if ( !this.el ) {
                var div = '<div style="display:none;"></div>';
                this.el = $( div );
                this.el.appendTo( $(this.setting.appendTo) );
                this.el.attr( "data-kid", this.id );
            }

            var maskTpl = '<div class="sq-dialog-masking" style="height:{$docHeight}px;"></div>',
                dialogTpl = '<div class="sq-dialog {classStyle}" style="width:{$width}px;left:{$left}px;top:{$top}px;">\
                                <div class="sq-dialog-avatar"></div>\
                                <div style="position:relative;">\
                                    <div class="sq-dialog-body">\
                                        <div class="sq-dialog-titlebar {$notitle}">\
                                            <span class="sq-dialog-titlebar-text">{$title}</span>\
                                            <a href="javascript:void(0);" title="关闭" class="sq-dialog-close">关闭</a>\
                                        </div>\
                                        <div class="sq-dialog-client">\
                                            <div class="sq-dialog-content" style="height:{$contentHeight};">\
                                                {%=content%}\
                                            </div>\
                                        </div>\
                                        <div class="sq-dialog-buttons {$nobutton}">\
                                           {%=buttons%}\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';

            dialogTpl = dialogTpl.replace( "{classStyle}", this.setting.classStyle );
            var html = SQ.template( (this.setting.mask?maskTpl:"") + dialogTpl, this._renderObj() );
            this.el.html( html );
            this.position();
        },

        position: function() {

            var mask = $( ".sq-dialog-masking", this.el ),
                dialog = $( ".sq-dialog", this.el ),
                titleBar = $( ".sq-dialog-titlebar", this.el ),
                buttons = $( ".sq-dialog-buttons", this.el ),
                win = $( window ),
                w = dialog.width(),
                h = buttons.outerHeight(true) + titleBar.outerHeight(true) + 100,
                W = win.width(),
                H = win.height(),
                t = document.documentElement.scrollTop || document.body.scrollTop;
            h = ($.isNumeric(this.setting.height) ? this.setting.height : this.el.find('div.sq-dialog-content').outerHeight(true)) + h;
            mask.height( $(document).height() );
            dialog.css({
                left: Math.abs( W - w ) / 2,
                top: Math.abs( H - h ) / 2 + t
            });
        },

        _buttons: function() {
            var html = [];
            if ( this.setting.buttons && SQ.isObject(this.setting.buttons) ) {
                var tpl = '<a class="sq-dialog-btn btn btn-s-1 {$cls}" {$target} href="{$href}" data-name="{$name}">{$name}</a>';
                for ( var i in this.setting.buttons ) {
                    var item = this.setting.buttons[i],
                        href = "javascript:;",
                        target = "";

                    if ( typeof item === "string" ) {
                        href = item;
                        target = "target='_blank'";
                    }

                    html.push( SQ.template(tpl, {
                        cls: item.cls || "",
                        name: i,
                        href: item.href || href,
                        target: item.target || target
                    }) );
                }
            }
            return html.join( "" );
        },

        _renderObj: function() {
            var win = $( window ),
                w = this.setting.width,
                h = this.setting.height || 400,
                W = win.width(),
                H = win.height();

            return {
                docHeight: $( document ).height(),
                width: this.setting.width,
                contentHeight: $.isNumeric(h) ? h+'px' : h,
                left: ( W - w ) / 2,
                top: ( H - h ) / 2,
                title: this.setting.title || "",
                notitle: this.setting.title ? "" : "sq-dialog-notitle",
                nobutton: SQ.isObject(this.setting.buttons) ? "" : "sq-dialog-nobutton",
                content: this._getContent(),
                buttons: this._buttons()
            };
        },

        _getContent: function () {
            var cnt = this.setting.content,
                result = "";

            switch ( this.setting.type ) {
                case "html":
                    if ( typeof cnt == 'object' ) {
                        result = $( cnt ).html();
                        $( cnt ).empty();
                    } else {
                        result = cnt;
                    }
                    break;
                case "iframe":
                    result = '<iframe allowtransparency="true" frameborder="0" src="' + cnt + '" width="100%" height="' + (this.setting.height - 10) + '"></iframe>';
                    break;
                case 'ajax':
                    result = '<div class="sq-dialog-loading"><p>正在努力加载...</p></div>';
                    $.get( cnt, this.proxy(this.setContent) );
                    break;
            }
            return result;
        },

        setContent: function( cnt ) {
            var content = $( ".sq-dialog-content", this.el );
            content.html( cnt );
        },

        show: function ( title ) {
            if ( title ) {
                this.el.find( ".sq-dialog-titlebar-text" ).text( title );
            }
            this.el.show();
            this.position();
            this.trigger( "show", this );
        },

        hide: function () {
            this.el.hide();
            this.trigger( "hide", this );
        },

        _destroying: function () {
            $( ".sq-dialog-btn", this.el ).unbind();
            this.el.remove();
        },

        drag:function(){
            var $title = this.el.find('.sq-dialog-titlebar'),
                $target = this.el.children('.sq-dialog');
            if(!this.setting.drag || !SQ.Drag){
                return;
            }
            this.dragObj = new SQ.Drag({
                el: $target, 
                locked: "",
                handle: $title
            });

            /*this.dragObj = new Dragdrop({
                target : $target[0],
                bridge : $title[0],
                // area : [0,maxX,0,maxY],
                callback : function(obj){

                }
            });*/         
        }
    });

    SQ.Dialog = Dialog;

    SQ.alert = function( msg, callback, title ) {
        return new SQ.Dialog({
            title: title || "提示信息",
            buttons: {
                "确定": {
                    cls: "btn-s-140",
                    fn: function( name, obj ) {
                        callback && callback();
                        obj.destroy();
                    }
                }
            },
            content: "<div class='sq-dialog-alert'>" + msg + "</div>",
            type: "html",
            width: 400,
            height: 100
        });
    };

    SQ.confirm = function( msg, yes, no ) {
        return new SQ.Dialog({
            title: "提示信息",
            buttons: {
                "取消": {
                    cls: "btn-s-w",
                    fn: function( name, obj ) {
                        no && no();
                        obj.destroy();
                    }
                },
                "确定": {
                    cls: "btn-s-140",
                    fn: function( name, obj ) {
                        yes && yes();
                        obj.destroy();
                    }
                }
            },
            content: msg,
            type: "html",
            width: 400,
            height: 100
        });
    };

    SQ.tip = function( msg ) {
        var d = new SQ.Dialog({
            title: null,
            buttons: null,
            content: msg,
            type: "html",
            width: 400,
            height: 40,
            mask: false
        });

        setTimeout( function () {
            d.destroy();
        }, 3000 );

        return d;
    };

    SQ.loading = function( content, hideEvent ) {
        hideEvent = hideEvent || $.noop;
        content = content || "正在加载数据，请稍后...";

        if ( typeof content === "function" ) {
            hideEvent = content;
            content = "正在加载数据，请稍后...";
        }

        var d = new SQ.Dialog({
            title: "提示信息",
            buttons: {
                "取消加载": function( name, obj ) {
                    obj.hide();
                }
            },
            content: '<div class="sq-dialog-loading"><span>' + content + '</span></div>',
            type: "html",
            width: 400,
            height: 60
        });

        d.bind( "hide", function() {
            hideEvent.call( d );
            d.destroy();
        });

        return d;
    };

    SQ.customDialog = function(options){
        var type = options.type;
            
    }

})( jQuery, window, SQ );