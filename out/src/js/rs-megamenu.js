"use strict";

var rs_megamenu_settings = {
    navBarTravelling: false,
    navBarDirection: "",
    navBarTravelDistance: 150,
    navBarSize:'large'
};
var rs_megamenu_last_known_scroll_position = 0;
var rs_megamenu_ticking = false;

var rs_megamenu_wrapper = document.getElementById("rs-megamenu-wrapper");
var rs_megamenu_nav = document.getElementById("rs-megamenu");
var rs_megamenu_row_close = document.getElementById("rs-megamenu-close");
var rs_megamenu_row = document.getElementById("rs-megamenu-row");
var rs_megamenu_nav_prev = document.getElementById("rs-megamenu-prev");
var rs_megamenu_nav_next = document.getElementById("rs-megamenu-next");
var rs_megamenu_menu = document.getElementById('rs-megamenu-menu');
var rs_megamenu_shadow = document.getElementById('rs-megamenu-shadow');
rs_megamenu_wrapper.setAttribute("data-rs-megamenu-overflowing", rs_megamenu_determineOverflow(rs_megamenu_row, rs_megamenu_nav));















/**
 * normal view, small view
 */
function rs_megamenu_calculate_viewport() {
    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    let html = document.getElementsByTagName('html')[0];
    if(viewportWidth<600)
    {
        html.classList.remove('rs-megamenu-large');
        html.classList.add('rs-megamenu-small');
        rs_megamenu_settings.navBarSize='small';
    }
    else
    {
        html.classList.remove('rs-megamenu-small');
        html.classList.add('rs-megamenu-large');
        rs_megamenu_settings.navBarSize='large';
    }
}
rs_megamenu_calculate_viewport();

















/**
 * on which side the items overflow in the navigation root row?
 *
 * @param content
 * @param container
 * @returns {string}
 */
function rs_megamenu_determineOverflow(content, container) {
    var containerMetrics = container.getBoundingClientRect();
    var containerMetricsRight = Math.floor(containerMetrics.right);
    var containerMetricsLeft = Math.floor(containerMetrics.left);
    var contentMetrics = content.getBoundingClientRect();
    var contentMetricsRight = Math.floor(contentMetrics.right);
    var contentMetricsLeft = Math.floor(contentMetrics.left);
    if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
    } else if (contentMetricsRight > containerMetricsRight) {
        return "right";
    } else {
        return "none";
    }
}



/**
Handle the scroll of the horizontal container
*/
function rs_megamenu_nav_requestAnimationFrame(scroll_pos) {
    rs_megamenu_wrapper.setAttribute("data-rs-megamenu-overflowing",
        rs_megamenu_determineOverflow(rs_megamenu_row, rs_megamenu_nav)
    );
}

rs_megamenu_nav.addEventListener("scroll", function() {
    rs_megamenu_last_known_scroll_position = window.scrollY;
    if (!rs_megamenu_ticking) {
        window.requestAnimationFrame(function() {
            rs_megamenu_nav_requestAnimationFrame(rs_megamenu_last_known_scroll_position);
            rs_megamenu_ticking = false;
        });
    }
    rs_megamenu_ticking = true;
});



/**
Handle prev, next buttons
*/
rs_megamenu_nav_prev.addEventListener("click", function() {
    // If in the middle of a move return
    if (rs_megamenu_settings.navBarTravelling === true) {
        return;
    }
    // If we have content overflowing both sides or on the left
    let overflow = rs_megamenu_determineOverflow(rs_megamenu_row, rs_megamenu_nav);
    if (overflow === "left" || overflow === "both") {
        // Find how far this panel has been scrolled
        var availableScrollLeft = rs_megamenu_nav.scrollLeft;
        // If the space available is less than two lots of our desired distance, just move the whole amount
        // otherwise, move by the amount in the settings
        if (availableScrollLeft < rs_megamenu_settings.navBarTravelDistance * 2) {
            rs_megamenu_row.style.transform = "translateX(" + availableScrollLeft + "px)";
        } else {
            rs_megamenu_row.style.transform = "translateX(" + rs_megamenu_settings.navBarTravelDistance + "px)";
        }
        // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
        rs_megamenu_row.classList.remove("no-transition");
        // Update our settings
        rs_megamenu_settings.navBarTravelDirection = "left";
        rs_megamenu_settings.navBarTravelling = true;
    }
    // Now update the attribute in the DOM
    rs_megamenu_nav_requestAnimationFrame(0);
});

rs_megamenu_nav_next.addEventListener("click", function() {
    // If in the middle of a move return
    if (rs_megamenu_settings.navBarTravelling === true) {
        return;
    }
    // If we have content overflowing both sides or on the right
    let overflow = rs_megamenu_determineOverflow(rs_megamenu_row, rs_megamenu_nav);
    if (overflow === "right" || overflow === "both") {
        // Get the right edge of the container and content
        var navBarRightEdge = rs_megamenu_row.getBoundingClientRect().right;
        var navBarScrollerRightEdge = rs_megamenu_nav.getBoundingClientRect().right;
        // Now we know how much space we have available to scroll
        var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
        // If the space available is less than two lots of our desired distance, just move the whole amount
        // otherwise, move by the amount in the settings
        if (availableScrollRight < rs_megamenu_settings.navBarTravelDistance * 2) {
            rs_megamenu_row.style.transform = "translateX(-" + availableScrollRight + "px)";
        } else {
            rs_megamenu_row.style.transform = "translateX(-" + rs_megamenu_settings.navBarTravelDistance + "px)";
        }
        // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
        rs_megamenu_row.classList.remove("no-transition");
        // Update our settings
        rs_megamenu_settings.navBarTravelDirection = "right";
        rs_megamenu_settings.navBarTravelling = true;
    }
    // Now update the attribute in the DOM
    rs_megamenu_nav_requestAnimationFrame(0);
});

rs_megamenu_row.addEventListener(
    "transitionend",
    function() {
        // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
        var styleOfTransform = window.getComputedStyle(rs_megamenu_row, null);
        var tr = styleOfTransform.getPropertyValue("-webkit-transform")
            || styleOfTransform.getPropertyValue("transform");
        // If there is no transition we want to default to 0 and not null
        var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
        rs_megamenu_row.style.transform = "none";
        rs_megamenu_row.classList.add("no-transition");
        // Now lets set the scroll position
        if (rs_megamenu_settings.navBarTravelDirection === "left") {
            rs_megamenu_nav.scrollLeft = rs_megamenu_nav.scrollLeft - amount;
        } else {
            rs_megamenu_nav.scrollLeft = rs_megamenu_nav.scrollLeft + amount;
        }
        rs_megamenu_settings.navBarTravelling = false;
    },
    false
);

window.addEventListener("resize", function(){
    rs_megamenu_nav_requestAnimationFrame(0);
    rs_megamenu_calculate_viewport();
});
rs_megamenu_nav_requestAnimationFrame(0);



/**
 * open/close sub menu
 */
var list = rs_megamenu_row.getElementsByClassName('rs-megamenu-item-root');
var rs_megamenu_timeout = null;
function rs_megamenu_remove_hover()
{
    if(rs_megamenu_timeout!==null)
    {
        clearTimeout(rs_megamenu_timeout);
        rs_megamenu_timeout=null;
    }

    for(var i = 0; i < list.length; i++) {
        let self = list[i];
        self.classList.remove('hover');
    }
}

for(var i = 0; i < list.length; i++) {
    let self = list[i];
    if(typeof self === "object")
    {
        self.addEventListener('mouseover', function() {
            rs_megamenu_remove_hover();
            this.classList.add('hover');
        });
        self.addEventListener('mouseout', function() {
            rs_megamenu_timeout = setTimeout(function(){ rs_megamenu_remove_hover(); }, 2000);
        });
        self.addEventListener('click', function(event) {

            let bContinue = true;
            if(rs_megamenu_settings.navBarSize==='small')
            {
                bContinue=false;
                if(this.classList.contains('rs-megamenu-item-root-has-sub'))
                {
                    let children = this.children;
                    let found = false;
                    for (i = 0; i < children.length; i++) {
                        if(children[i]===event.srcElement)
                        {
                            found=true;
                            break;
                        }
                    }
                    if(found)
                    {
                        event.preventDefault();
                        bContinue=true;
                    }
                }
            }
            if(bContinue)
            {
                if(this.classList.contains('open'))
                    this.classList.remove('open');
                else
                    this.classList.add('open');
            }
        });
    }
}



//small version
function rs_megamenu_small_open()
{
    rs_megamenu_nav.classList.add("open");
    document.body.classList.add('rs-megamenu-small-open');
    rs_megamenu_menu.setAttribute("data-rs-megamenu-open",'y');
}
function rs_megamenu_small_close()
{
    rs_megamenu_nav.classList.remove("open");
    document.body.classList.remove('rs-megamenu-small-open');
    rs_megamenu_menu.setAttribute("data-rs-megamenu-open",'n');
}
rs_megamenu_menu.addEventListener('click', function() {
    let open = this.getAttribute("data-rs-megamenu-open");
    if(open!="y")
    {
        rs_megamenu_small_open();
    }
    else
    {
        rs_megamenu_small_close();
    }

});





//close all menus if clone elsewhere
document.addEventListener('click', function (event) {
    if(!rs_megamenu_nav.contains(event.target)
        || rs_megamenu_shadow.id === event.target.id
        || rs_megamenu_row_close.id === event.target.id
    )
    {
        if(event.target.id!=="rs-megamenu-menu")
        {
            rs_megamenu_remove_hover();
            rs_megamenu_small_close();
        }
    }
});
