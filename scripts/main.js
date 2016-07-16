"use strict";
var mainPage=new Vue( {
    el:"body", data: {
        active: "org", openPhones: !1, orgCatalog: !1, advCatalog: !1, catalogLetters: ["А", "Б", "В", "Г", "Д", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ш", "Э", "Ю"], activeOrgLetter: "А", orgItems: [], activeAdvLetter: "А", advItems: [], orgCarousel: ".org-carousel", advCarousel: ".adv-carousel"
    }
    , methods: {
        makeActive:function(e) {
            this.active=e
        }
        , makeOrgLetterActive:function(e) {
            var t=this;
            t.activeOrgLetter=e, t.initCarousel("activeOrgLetter", "orgCarousel", "orgItems")
        }
        , makeAdvLetterActive:function(e) {
            var t=this;
            t.activeAdvLetter=e, t.initCarousel("activeAdvLetter", "advCarousel", "advItems")
        }
        , initCarousel:function(e, t, r) {
            var a=this;
            $.ajax( {
                url:"orgs.json", dataType:"json", data:a[e], success:function(e) {
                    $(a[t]).trigger("destroy.owl.carousel"), a[r]=[];
                    for(var o=0;
                    o<e.length;
                    o+=10)a[r].push(e.slice(o, o+10));
                    Vue.nextTick(function() {
                        $(a[t]).owlCarousel( {
                            items:"2", nav:!1, loop:!0, responsiveRefreshRate:20, responsive: {
                                0: {
                                    items: 1
                                }
                                , 767: {
                                    items: 2
                                }
                            }
                        }
                        )
                    }
                    )
                }
            }
            )
        }
        , prevSlide:function(e) {
            $(this[e]).trigger("prev.owl.carousel")
        }
        , nextSlide:function(e) {
            $(this[e]).trigger("next.owl.carousel")
        }
    }
    , ready:function() {
        console.log("test");
        var e=this;
        $(".custom-select").styler( {
            selectSmartPositioning: !1
        }
        ), e.initCarousel("activeOrgLetter", "orgCarousel", "orgItems"), e.initCarousel("activeAdvLetter", "advCarousel", "advItems")
    }
}

);