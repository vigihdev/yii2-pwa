// @ts-nocheck
(function ($) {
    "use strict";
    const ClassName = {
        OPEN: 'sidebar-open',
        ACTIVE: 'active',
        SLIDE_PUSH: 'sidebar-slide-push',
        RIGHT_FIXED: 'sidebar-right-fixed',
        LEFT_FIXED: 'sidebar-left-fixed',
        LEFT_HIDE: 'sidebar-left-hide',
        OVERLAY_ACTIVE: 'sidebar-overlay-active',
        BODY_OPEN: 'body-open',
        RIGHT: 'sidebar-right',
        NAVBAR_SIDEBAR: 'navbar-sidebar',
        LEFT: 'sidebar-left',
        PM_INI: ".pm-ini",
        IS_SLIDEPUSH: "is-slidepush"
    };

    const Selector = {
        BODY: 'body',
        PARENT_SELECTOR: '',
        OVERLAY: '.sidebar-overlay',
        SIDEBAR: '.sidebar',
        SIDEBAR_OPEN: '#sidebar-open',
        LEFT: '.' + ClassName.LEFT,
        RIGHT_FIXED: '.' + ClassName.RIGHT_FIXED,
        NAVBAR_SIDEBAR: '.' + ClassName.NAVBAR_SIDEBAR,
        SIDEBAR_HEADER: '#sidebar .sidebar-header',
        TOGGLE: '.sidebar-toggle',
        TOPBAR_FIXED: '.topbar-fixed',
        SIDEBAR_DROPDOWN: '.sidebar-nav .dropdown-menu',
        TOGGLE_RIGHT: '.sidebar-toggle-right',
        TOPBAR_TOGGLE: '.topbar-toggle',
        TOPBAR_CLOSE: '.topbar-close',
        NAVBAR_TOGGLE: '.navbar-toggle',
        PM_INI: ".pm-ini",
        IS_SLIDEPUSH: '.' + ClassName.IS_SLIDEPUSH
    };

    var Event = {
        CLICK: 'click'
    };

    // Left sidebar toggle
    function onSidebarToggle(e) {
        var dataTarget = "#" + $(e.currentTarget).attr("data-target");
        $(dataTarget).toggleClass(ClassName.OPEN);
        if (($(dataTarget).hasClass(ClassName.LEFT_FIXED) || $(dataTarget).hasClass(ClassName.RIGHT_FIXED)) && $(dataTarget).hasClass(ClassName.OPEN)) {
            $(Selector.OVERLAY).addClass(ClassName.OVERLAY_ACTIVE);
            $(Selector.BODY).addClass(ClassName.BODY_OPEN);
        } else {
            $(Selector.OVERLAY).removeClass(ClassName.OVERLAY_ACTIVE);
            $(Selector.BODY).removeClass(ClassName.BODY_OPEN);
        }
    }

    // Nave bar in Sidebar
    function onNavBarToggle() {
        $(Selector.NAVBAR_SIDEBAR).toggleClass(ClassName.OPEN);
        if (($(Selector.NAVBAR_SIDEBAR).hasClass(ClassName.NAVBAR_SIDEBAR)) && $(Selector.NAVBAR_SIDEBAR).hasClass(ClassName.OPEN)) {
            $(Selector.OVERLAY).addClass(ClassName.OVERLAY_ACTIVE);
            $(Selector.BODY).addClass(ClassName.BODY_OPEN);
        } else {
            $(Selector.OVERLAY).removeClass(ClassName.OVERLAY_ACTIVE);
            $(Selector.BODY).addClass(ClassName.BODY_OPEN);
        }
    }

    // Overlay
    function onOverlayClick(event) {
        var $this = $(event.currentTarget);
        $this.removeClass(ClassName.OVERLAY_ACTIVE);
        $(Selector.SIDEBAR).removeClass(ClassName.OPEN);
        $(Selector.NAVBAR_SIDEBAR).removeClass(ClassName.OPEN);
        $(Selector.BODY).removeClass(ClassName.BODY_OPEN);
        event.stopPropagation();
    }

    // On Window Resize
    function onResizeWindow(e) {
    }

    class Sidebar {

        constructor(element) {
            this.$element = $(element);
            const self = this;

            $(window).resize(function(e){
                self.#handleWindowWidth($(this).width())
            });

            this.#handleWindowWidth($(window).width());
            this.#handleCLickOverlay();
            this.#handleCLickSidebarOpen();
        }

        #handleCLickOverlay(){
            $(Selector.BODY).find(Selector.OVERLAY).on('click',function(e){
                e.preventDefault();
                $(Selector.BODY).removeClass(ClassName.SLIDE_PUSH)
                $(Selector.BODY).find(Selector.OVERLAY).removeClass(ClassName.ACTIVE)
            });
        }

        #handleCLickSidebarOpen(){
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