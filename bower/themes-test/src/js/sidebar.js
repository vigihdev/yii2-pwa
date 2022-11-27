// @ts-nocheck
(function ($) {
    "use strict";
    const ClassName = {
        OPEN: 'sidebar-open',
        ACTIVE: 'active',
        CURRENT: 'current',
        SLIDE_PUSH: 'sidebar-slide-push',
        LEFT_HIDE: 'sidebar-left-hide',
    };

    const Selector = {
        BODY: 'body',
        COLLAPSE: '.collapse',
        NAV_ITEM: '.nav-item',
        OVERLAY: '.sidebar-overlay',
        SIDEBAR: '.sidebar',
        SIDEBAR_OPEN: '#sidebar-open',
    };


    class Sidebar {

        constructor(element) {
            this.$element = $(element);
            const self = this;

            $(window).resize(function(e){
                self.#handleWindowWidth($(this).width())
            });

            this.#handleWindowWidth($(window).width());
            this.#handleCLickOverlay();
            this.#handleClickSidebarOpen();
            this.#handleCollapse();
            this.#handleLinkCurrentDocument();
        }

        #handleLinkCurrentDocument(){
            let [pathname] = [document.location.pathname];
            const collapse = (element) => $(element).closest(Selector.COLLAPSE);

            this.$element.find('a[href]').each(function(i,element){
                let href = $(element).attr('href');
                    href = href.endsWith('/') ? href.substr(0,(href.length - 1)) : href;

                $(element).closest('.nav-item').removeClass(ClassName.CURRENT);
                if(pathname === href){
                    $(element).closest(Selector.NAV_ITEM).addClass(ClassName.CURRENT);
                    if(collapse(element).length > 0){
                        collapse(element).collapse('show')
                    }
                }
            });
        }

        #handleCollapse(){
            const collapse = (id) => this.$element.find('a[data-target="#'+id+'"]' );
            this.$element.find(Selector.COLLAPSE).each(function(i,element){
                $(element).on('show.bs.collapse',function(e){
                    collapse($(e.target).attr('id')).closest('.nav-item').addClass(ClassName.ACTIVE);
                }).on('hide.bs.collapse',function(e,a,b){
                    collapse($(e.target).attr('id')).closest('.nav-item').removeClass(ClassName.ACTIVE);
                });

                if($(element).hasClass('show')){
                    $(element).trigger('show.bs.collapse');
                }
            });
        }

        #handleCLickOverlay(){
            $(Selector.BODY).find(Selector.OVERLAY).on('click',function(e){
                e.preventDefault();
                $(Selector.BODY).removeClass(ClassName.SLIDE_PUSH)
                $(Selector.BODY).find(Selector.OVERLAY).removeClass(ClassName.ACTIVE)
            });
        }

        #handleClickSidebarOpen(){
            $(Selector.BODY).find(Selector.SIDEBAR_OPEN).on('click',function(e){
                e.preventDefault();
                $(Selector.BODY).addClass(ClassName.SLIDE_PUSH)
                $(Selector.BODY).find(Selector.OVERLAY).addClass(ClassName.ACTIVE)
            });
        }

        #handleWindowWidth(width){
            if (width < 800) {
                $(Selector.BODY).addClass(ClassName.LEFT_HIDE)
            }
            else
            {
                $(Selector.BODY).removeClass(ClassName.LEFT_HIDE)
            }
        }

        static validate() {
            return $(Selector.SIDEBAR).length > 0;
        }

        static instance() {
            if (Sidebar.validate()) {
                new Sidebar($(Selector.SIDEBAR).get(0))
            }
        }
    }
    Sidebar.instance();
})(jQuery); 