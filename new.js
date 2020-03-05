function recaptchaSubmit(e) {
    $("form").submit()
}
function getCookie(e) {
    e += "=";
    for (var a = decodeURIComponent(document.cookie).split(";"), t = 0; t < a.length; t++) {
        for (var s = a[t]; " " == s.charAt(0); )
            s = s.substring(1);
        if (0 == s.indexOf(e))
            return s.substring(e.length, s.length)
    }
    return ""
}
$(function() {
    if (0 < $("#tracking").length && ($(".nav").on("click", "li:not(.active)", function() {
        switch ($(".nav li").removeClass("active").addClass("pointer"),
        $(this).addClass("active").removeClass("pointer"),
        $("#no_series_error").addClass("hidden"),
        $(this).data("type")) {
        case "all":
            $(".row").removeClass("hidden");
            break;
        case "unseen":
            $(".row.seen").addClass("hidden"),
            $(".row:not(.seen)").removeClass("hidden");
            break;
        case "seen":
            $(".row:not(.seen)").addClass("hidden"),
            $(".row.seen").removeClass("hidden")
        }
        $(".row:not(.hidden)").length < 1 && $("#no_series_error").removeClass("hidden")
    }),
    $("button[data-remove]").click(function() {
        var e = $(this).data("remove")
          , a = $('.row[data-serie="' + e + '"]').find("h4").text();
        $("#titleName").text(a),
        $("#stopTracking #confirm").data("del", e),
        $("#stopTracking").modal()
    }),
    $("#stopTracking").on("click", "#confirm", function() {
        var a = $(this).data("del");
        $.post("/ajax/tracking", {
            delete: a
        }, function(e) {
            if (void 0 !== e && "1" == e)
                return $('.row[data-serie="' + a + '"]').remove();
            alert("שגיאה: לא הצלחנו להסיר את הסדרה ממעקב הסדרות שלך.\nאם הבעיה נמשכת, אנא דווח/י לנו.")
        })
    })),
    0 < $("#faq").length && ($(".nav li a[data-cat]").click(function() {
        var e = $(this).data("cat");
        $("#jscontent").html(""),
        $.get("/ajax/faq", {
            catID: e
        }, function(e) {
            $("#jscontent").append('<ul class="list-unstyled"></ul>'),
            $.each(e, function(e, a) {
                $("#jscontent ul").append('<li><h4 data-qid="' + a.id + '">' + a.question + "</h4></li>")
            })
        }, "json")
    }),
    $("#jscontent").on("click", "h4[data-qid]", function() {
        if (1 == $(this).data("expended"))
            return !1;
        var a = $(this).data("qid")
          , t = $(this);
        $.get("/ajax/faq", {
            qID: a
        }, function(e) {
            $('#jscontent h4[data-qid="' + a + '"]').after(e),
            $(t).data("expended", !0)
        })
    })),
    0 < $("#signup").length && ($("#username input").blur(function() {
        var e = $(this).val();
        $.get("/ajax/signup", {
            username: e
        }, function(e) {
            "1" == e ? ($("#username").addClass("has-success").removeClass("has-error"),
            $("#username i").addClass("fa-check").removeClass("fa-times")) : ($("#username").removeClass("has-success").addClass("has-error"),
            $("#username i").addClass("fa-times").removeClass("fa-check"))
        })
    }),
    $("#email input").blur(function() {
        var e = $(this).val();
        $.get("/ajax/signup", {
            email: e
        }, function(e) {
            "1" == e ? ($("#email").addClass("has-success").removeClass("has-error"),
            $("#email i").addClass("fa-check").removeClass("fa-times")) : ($("#email").removeClass("has-success").addClass("has-error"),
            $("#email i").addClass("fa-times").removeClass("fa-check"))
        })
    }),
    $("#email2").on("paste", "input", function(e) {
        e.preventDefault(),
        alert("נא הזן כתובת אימייל באופן ידני לצורך אימות נכונות כתובת האימייל")
    })),
    0 < $("#feedback").length && $("#feedback").on("change", 'select[name="department"]', function() {
        console.log("department change"),
        "requests" == $(this).val() && ($("form").hide(),
        $("#forum").removeClass("hidden"))
    }),
    0 < $("#seriesList").length && "number" == typeof load && load == loaded) {
        var t = !1;
        $(document).scroll(function() {
            "undefined" == typeof scrollMaxY && (scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight),
            600 < scrollMaxY - scrollY || t || (t = !0,
            $.ajax({
                url: "ajax/series",
                data: {
                    loadMore: load,
                    start: loaded,
                    search: search
                },
                method: "GET",
                dataType: "html"
            }).done(function(e) {
                t = !1,
                $("#seriesList .content").append(e);
                var a = $(e).find("img").length;
                loaded += a,
                a < load && $(document).unbind("scroll")
            }))
        })
    }
    if (0 < $("#watchEpisode").length) {
        function c(a) {
            $("#loading").removeClass("hidden"),
            $("#loading h2").text("טוען את עונה " + season + " פרק " + episode),
            $("#player, #loading #afterLoad, #reportVideo").addClass("hidden"),
            $("#loading .err, #reportVideo .alert").remove(),
            $("#submitReport").removeClass("disabled");
            var e = videojs.getPlayer("videojs");
            void 0 !== e && (e.currentTime() < e.duration() && localStorage.setItem("pos_" + VID, e.currentTime()),
            videojs("videojs").dispose(),
            $("#playerDiv").html('<video id="videojs" class="embed-responsive-item video-js vjs-big-play-centered"></video>')),
            $("#videojs").bind("contextmenu", function() {
                return !1
            }),
            $.post("/ajax/watch", {
                preWatch: !0,
                SID: SID,
                season: season,
                ep: episode
            }, function() {}).done(function(e) {
                if ("undefined" != typeof counter && !1 !== counter && clearInterval(counter),
                "donor" == e)
                    return s(a);
                timeout = 1,
                $("#loading #txt").text("נא להמתין...").show(),
                $("#loading #spinner, #loading #waitTime").removeClass("hidden"),
                counter = setInterval(function() {
                    !function(e, a) {
                        timeout -= .1;
                        var t = 1 / 30 * (30 - timeout);
                        $("#spinner").circleProgress({
                            value: t
                        }),
                        timeout = function(e, a) {
                            return Number(Math.round(e + "e" + a) + "e-" + a)
                        }(timeout, 2),
                        $("#waitTime span").text(timeout),
                        timeout <= 0 && (clearInterval(counter),
                        counter = !1,
                        s(e, a))
                    }(a, e)
                }, 100)
            }).fail(function() {
                $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה 1!</h3>ארעה שגיאה בטעינת הפרק. נסה לרענן את הדף ולטעון את הפרק שנית.<br />אם שגיאה זו חוזרת על עצמה נא פנה למנהלי האתר באמצעות <a href="/feedback">טופס צור קשר</a>.</div>'),
                $("#loading #waitTime").addClass("hidden")
            })
        }
        function s(l, e) {
            if (episode < 0)
                return !1;
            $("#loading #txt").text("מחפש שרת צפייה זמין...").show();
            var a = !0;
            $.get("https://vast.adxoo.com/vast.xml?pageurl=" + window.location, function() {}).fail(function() {
                a = !1
            }),
            $.get("https://an.facebook.com/v1/instream/vast.xml", function() {}).fail(function() {
                a = !1
            }),
            $.post("/ajax/watch", {
                vast: !0
            }, function() {}).done(function(r) {
                if (0 < r.length && (adblock || !a))
                    return $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה 4!</h3>\t\t\t\t\tזיהינו שימוש בחוסם פרסומות בדפדפן שלך.<br />\t\t\t\t\tההכנסות מפרסומות מאפשרות לנו לממן את פעילות האתר.<br />\t\t\t\t\tאם ברצונך להמשיך לצפות באתר, נא לבטל את חוסם הפרסומות ולבצע ריענון לעמוד.<br />\t\t\t\t\tלחלופין, באפשרותך <a href="/donate">לרכוש מנוי</a> ולהנות מצפייה ללא פרסומות.</div>'),
                    $("#loading #waitTime").addClass("hidden"),
                    !1;
                $.post("/ajax/watch", {
                    watch: l,
                    token: e,
                    serie: SID,
                    season: season,
                    episode: episode,
                    type: "episode"
                }, function() {}, "json").done(function(i) {
                    if (VID = i.VID,
                    i.error)
                        return $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה 2!</h3>' + i.error + "</div>"),
                        $("#loading #waitTime").addClass("hidden"),
                        !1;
                    pos = i.url.indexOf("dev"),
                    -1 < pos && (server = i.url.slice(0, pos),
                    domain = i.url.substr(pos + 4),
                    i.url = server + domain);
                    var e = Object.keys(i.watch)[Object.keys(i.watch).length - 1]
                      , n = "w"
                      , d = "d";
                    $.ajax({
                        url: "//" + i.url + "/" + n + "/episode/" + e + "/" + VID + ".mp4?token=" + i.watch[e] + "&time=" + i.time + "&uid=" + i.uid,
                        method: "HEAD",
                        error: function(e) {
                            var a = "";
                            switch (e.status) {
                            case 0:
                                a = 'שרת הצפיה אינו זמין. יתכן ששגיאה זו נגרמה עקב עומסים חריגים על שרת הצפייה או בעית תקשורת בין מחשבך לשרת הצפייה.<br />\t\t\t\t\t\t\t\t\t\t\t\tנא בצע/י ריענון לדף זה על מנת לנסות שנית<br />\t\t\t\t\t\t\t\t\t\t\t\tלצפייה בעומסי השרתים <a href="/status">לחצו כאן</a>';
                                break;
                            case 400:
                                a = "הדפדפן שברשותך אינו שולח פרטים מזהים אודותיו לשרת הצפייה שלנו.<br />\t\t\t\t\t\t\t\t\t\t\t\tנסה/י לבטל את תוספי הדפדפן או לחלופין השתמש/י בדפדפן אחר";
                                break;
                            case 401:
                                a = "בכל צפייה בפרק אנו יוצרים עבורך מזהה ייחודי. מזהה זה פג תוקף או שאינו ניתן לאימות.<br />\t\t\t\t\t\t\t\t\t\t\t\tבצע/י ריענון לדף זה על מנת ליצור מזהה חדש.";
                                break;
                            case 404:
                                a = 'זה מביך, הפרק לא נמצא בשרת הצפייה שלנו.<br />\t\t\t\t\t\t\t\t\t\t\t\tאנו נודה לך אם תוכל לדווח לנו על כך באמצעות <a href="/feedback">טופס צור קשר</a>.';
                                break;
                            case 410:
                                a = "בכל צפייה בפרק אנו יוצרים עבורך מזהה ייחודי. מזהה זה פג תוקף, נא בצע/י ריענון לדף זה על מנת ליצור מזהה חדש.";
                                break;
                            case 429:
                                a = "עברת את מגבלת הצפייה במקביל.<br />\t\t\t\t\t\t\t\t\t\t\t\tאנו מאפשרים למשמשים ואורחים לצפות בפרק אחד בלבד ברגע נתון (תורמים אינם מוגבלים).<br />"
                            }
                            return a += "<br /><br />\t\t\t\t\t\t\t\t\tמזהה פרק: " + VID + "<br />\t\t\t\t\t\t\t\t\tשרת: " + i.url + "<br />\t\t\t\t\t\t\t\t\tשגיאה: " + e.status + "<br />\t\t\t\t\t\t\t\t\tסוג: " + n,
                            $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה!</h3>' + a + "</div>"),
                            $("#loading #waitTime").addClass("hidden"),
                            !1
                        },
                        crossDomain: !0,
                        xhrFields: {
                            withCredentials: !0
                        }
                    }).done(function() {
                        void 0 === i.download ? ($(".download").addClass("disabled"),
                        $("#fakeDL").removeClass("hidden")) : ($('#afterLoad .download:not("#fakeDL")').remove(),
                        $.each(i.download, function(e, a) {
                            download[e] = "//" + i.url + "/" + d + "/episode/" + e + "/" + Sname[1] + ".S" + season + "E" + episode + "_" + e + "P/" + VID + ".mp4?token=" + a + "&time=" + i.time + "&uid=" + i.uid,
                            $newBtn = $("#fakeDL").clone().removeAttr("id").removeClass("hidden").insertAfter("#fakeDL"),
                            $($newBtn).attr("href", download[e]).find("span").text("הורדת הפרק באיכות " + e + "p"),
                            $("#player .download").attr("href", download[e])
                        }),
                        $("#fakeDL").addClass("hidden"));
                        var t = []
                          , s = encodeURIComponent(getCookie("Sdarot"))
                          , o = /playstation/i.test(window.navigator.userAgent);
                        $.each(i.watch, function(e, a) {
                            surl = "//" + i.url + "/" + n + "/episode/" + e + "/" + VID + ".mp4?token=" + a + "&time=" + i.time + "&uid=" + i.uid,
                            o && (surl += "&cookie=" + s),
                            t.push({
                                src: surl,
                                type: "video/mp4",
                                label: e + "P"
                            })
                        });
                        var e = t.length;
                        (t[e - 1].selected = !0) === l && ("function" == typeof window.history.pushState && window.history.pushState("", "", "/watch/" + SID + "-" + Sname[0] + "-" + Sname[1] + "/season/" + season + "/episode/" + episode),
                        $("title").html("Sdarot.TV סדרות | " + Sname[2] + " עונה " + season + " פרק " + episode + " לצפייה ישירה"),
                        $("#player .head p").text(i.heb + " / " + i.eng + " - עונה " + season + " פרק " + episode),
                        $("#date").text(function(e) {
                            var a = new Date(1e3 * e)
                              , t = a.getFullYear()
                              , s = a.getMonth() + 1
                              , o = a.getDate()
                              , i = a.getHours()
                              , n = a.getMinutes();
                            n < 10 && (n = "0" + n);
                            var d = a.getSeconds();
                            d <= 9 && (d = "0" + d);
                            return o + "." + s + "." + t + " " + i + ":" + n + ":" + d
                        }(i.addtime)),
                        $("#views").text(function(e) {
                            x = (e += "").split("."),
                            x1 = x[0],
                            x2 = 1 < x.length ? "." + x[1] : "";
                            var a = /(\d+)(\d{3})/;
                            for (; a.test(x1); )
                                x1 = x1.replace(a, "$1,$2");
                            return x1 + x2
                        }(i.viewnumber)),
                        $("#description").html(i.description),
                        $("#player .stars p").remove()),
                        rating = [i.rate, i.ratedby],
                        u(rating, "#player"),
                        1 == i.viewed ? ($("#markAS i").removeClass("fa-eye").addClass("fa-eye-slash"),
                        $("#markAS span").text("סמן פרק כלא נצפה")) : ($("#markAS i").removeClass("fa-eye-slash").addClass("fa-eye"),
                        $("#markAS span").text("סמן פרק כנצפה"));
                        var a = !1;
                        endlessPlay && !firstRun && (a = !0),
                        videojs("videojs", {
                            controls: !0,
                            autoplay: a,
                            preload: "auto",
                            loop: !1,
                            language: "he",
                            languages: {
                                he: {
                                    "Seek forward {{seconds}} seconds": "דלג {{seconds}} שניות קדימה",
                                    "Seek back {{seconds}} seconds": "חזור {{seconds}} שניות לאחור"
                                }
                            },
                            options: {
                                chromecast: {
                                    appId: "DC149BE9",
                                    metadata: {
                                        title: Sname[2] + " עונה " + season + " פרק " + episode,
                                        subtitle: "by Sdarot.tv"
                                    }
                                }
                            }
                        }, function() {
                            var e = this;
                            e.controlBar.playbackRateMenuButton = e.controlBar.addChild("PlaybackRateMenuButton", {
                                playbackRates: [.25, .5, 1, 1.25, 1.5, 2]
                            }),
                            e.volume(playerVolume / 100),
                            e.seekButtons({
                                forward: 10,
                                back: 10
                            }),
                            e.hotkeys({
                                volumeStep: .1,
                                seekStep: 5,
                                enableModifiersForNumbers: !1,
                                enableVolumeScroll: !1
                            }),
                            e.src(t),
                            0 < r.length && (console.log("init ads"),
                            e.vastWaterfall({
                                preroll: [{
                                    ads: [r]
                                }],
                                midroll: [{
                                    time: 900,
                                    ads: [r]
                                }]
                            })),
                            e.controlBar.addChild("QualitySelector"),
                            e.airPlay();
                            var s = !1;
                            e.on("timeupdate", function() {
                                var e = Math.floor(this.currentTime())
                                  , a = Math.floor(this.duration())
                                  , t = Math.floor(e / a * 100);
                                !s && 90 < t && 1 == autoMarkWatched && (p(SID, season, episode, !0),
                                s = !0)
                            }),
                            e.on("loadeddata", function() {
                                this.userActive(!1),
                                this.options_.inactivityTimeout = 2e3
                            }),
                            e.on("error", function() {
                                var e = this.error().code
                                  , a = this.error().message
                                  , t = this.error().status
                                  , s = this.src()
                                  , o = this.currentTime();
                                $.post("/ajax/watch", {
                                    incReport: !0,
                                    code: e,
                                    msg: a,
                                    status: t,
                                    source: s,
                                    position: o
                                }, function() {}),
                                localStorage.setItem("pos_" + VID, o)
                            }),
                            e.on("aderror", function() {
                                console.log("Can't play AD, restart player")
                            }),
                            e.one("ended", function() {
                                if (localStorage.removeItem("pos_" + VID),
                                endlessPlay) {
                                    firstRun = !1;
                                    var e = $("#episode li.active").next().data("episode");
                                    if ("number" == typeof e)
                                        episode = e;
                                    else {
                                        var a = $("#season li.active").next().data("season");
                                        if (void 0 === a)
                                            return;
                                        $('#season li[data-season="' + a + '"]').trigger("click"),
                                        episode = $("#episode li:first").data("episode")
                                    }
                                    console.log("load season: " + season + " episode: " + episode),
                                    $("#episode li.active, #season li.active").removeClass("active"),
                                    $('#episode li[data-episode="' + episode + '"], #season li[data-season="' + season + '"]').addClass("active"),
                                    c(!0)
                                }
                            });
                            var a = [{
                                start: "pause",
                                end: "playing",
                                content: Sname[2] + " עונה " + season + " פרק " + episode,
                                align: "top-right",
                                class: "videoTitle"
                            }, {
                                start: "loadstart",
                                end: "playing",
                                content: Sname[2] + " עונה " + season + " פרק " + episode,
                                align: "top-right",
                                class: "videoTitle"
                            }];
                            e.overlay({
                                overlays: a
                            })
                        }),
                        endlessPlay && !firstRun && ($("#loading").addClass("hidden"),
                        $("#player").removeClass("hidden"),
                        $("html, body").animate({
                            scrollTop: $("#videojs").offset().top
                        }, 2e3)),
                        window.onunload = function() {
                            localStorage.setItem("pos_" + VID, videojs.getPlayer("videojs").currentTime())
                        }
                        ,
                        $("#loading #txt").hide(),
                        $("#loading #spinner, #loading #waitTime").addClass("hidden"),
                        $("#afterLoad").removeClass("hidden")
                    })
                }).fail(function() {
                    $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה 3!</h3>ארעה שגיאה בטעינת הפרק. נסה לרענן את הדף ולטעון את הפרק שנית.<br />אם שגיאה זו חוזרת על עצמה נא פנה למנהלי האתר באמצעות <a href="/feedback">טופס צור קשר</a>.</div>'),
                    $("#loading #waitTime").addClass("hidden")
                })
            })
        }
        function e() {
            $("#lights i").hasClass("fa-moon-o") ? ($("body").css("background-color", "#212121"),
            $("section").addClass("dark"),
            $("#lights span").text("האר מסך"),
            $("#lights i").removeClass("fa-moon-o").addClass("fa-sun-o")) : ($("body").css("background-color", "inherit"),
            $("section:not(#loading)").removeClass("dark"),
            $("#lights span").text("החשך מסך"),
            $("#lights i").removeClass("fa-sun-o").addClass("fa-moon-o"))
        }
        function p(e, s, a, t) {
            if ("undefined" == typeof watched)
                return !1;
            if (void 0 === a)
                var o = $('#season li[data-season="' + s + '"]').hasClass("watched");
            else if (!0 === t)
                o = !1;
            else
                o = $('#episode li[data-episode="' + a + '"]').hasClass("watched");
            $.ajax({
                url: "/ajax/watch",
                type: "POST",
                data: {
                    SID: e,
                    season: s,
                    episode: a,
                    watched: o
                },
                async: !1,
                dataType: "json"
            }).done(function(e) {
                if (1 == e.changed) {
                    if (o = e.watched,
                    void 0 === a)
                        !1 === o ? ($("#season li[data-season='" + s + "']").removeClass("watched"),
                        season == s && $("#episode li").removeClass("watched"),
                        delete watched[s]) : ($("#season li[data-season='" + s + "']").addClass("watched"),
                        season == s && $("#episode li").addClass("watched"),
                        e.episodes && (console.log("season: " + season),
                        watched[s] = {},
                        $.each(e.episodes, function(e, a) {
                            console.log(e, a),
                            watched[s][a] = !0
                        })));
                    else if (!1 === o)
                        $("#episode li[data-episode='" + a + "']").removeClass("watched"),
                        $("#season li[data-season='" + s + "']").removeClass("watched"),
                        watched[s][a] = !1;
                    else {
                        $("#episode li[data-episode='" + a + "']").addClass("watched"),
                        void 0 === watched[s] && (watched[s] = {});
                        var t = watched[s][a] = !0;
                        $("#episode li").each(function(e, a) {
                            void 0 !== watched[s][$(a).data("episode")] && 0 != watched[s][$(a).data("episode")] || (t = !1)
                        }),
                        t && $("#season li[data-season='" + s + "']").addClass("watched")
                    }
                    return !0
                }
            })
        }
        function u(a, e) {
            $(e + " .rate").text(a[0]),
            $(e + " .ratedBy span").text(a[1]),
            $(e + " .stars i").removeClass("fa-star fa-star-o fa-star-half-o fa-flip-horizontal"),
            $(e + " .stars i").each(function(e) {
                e <= a[0] - 1 ? $(this).addClass("fa-star") : e <= Math.round(a[0] - 1) ? $(this).addClass("fa-star-half-o fa-flip-horizontal") : $(this).addClass("fa-star-o")
            })
        }
        $('[data-toggle="tooltip"]').tooltip(),
        $("#warning button").click(function() {
            !function(e, a, t) {
                var s = new Date;
                s.setTime(s.getTime() + 24 * t * 60 * 60 * 1e3);
                var o = "expires=" + s.toUTCString();
                document.cookie = e + "=" + a + ";" + o + ";path=/"
            }("warn_" + SID, !0, 365),
            $("#warning").remove()
        }),
        $("#season li").click(function(e) {
            e.preventDefault(),
            season != $(this).data("season") && (season = $(this).data("season"),
            $("#season li.active").removeClass("active"),
            $(this).addClass("active"),
            "function" == typeof window.history.pushState && window.history.pushState("", "", $(this).children().attr("href")),
            $.ajax({
                method: "GET",
                url: "/ajax/watch",
                async: !1,
                data: {
                    episodeList: SID,
                    season: season
                }
            }).done(function(e) {
                $("#episode").html(e),
                "object" == typeof watched[season] && $("#episode li").each(function(e, a) {
                    !0 === watched[season][$(a).data("episode")] && $(this).addClass("watched")
                }),
                $('[data-toggle="tooltip"]').tooltip()
            }))
        }),
        $("#episode").on("click", "li", function(e) {
            return e.preventDefault(),
            firstRun = !0,
            episode = $(this).data("episode"),
            $("#episode li.active").removeClass("active"),
            $(this).addClass("active"),
            c(!0)
        }),
        $("#spinner").circleProgress({
            value: 0,
            startAngle: 4.695,
            size: 200,
            fill: "#95cc00",
            emptyFill: "#7a7a7a",
            animation: !1
        }),
        $("#season li i").click(function(e) {
            e.stopPropagation();
            var a = $(this).parent().data("season");
            return p(SID, a)
        }),
        $("#episode").on("click", "li i", function(e) {
            e.stopPropagation();
            var a = $(this).parent().data("episode");
            return p(SID, season, a)
        }),
        $("#markAS").click(function() {
            !1 !== p(SID, season, episode) && (!0 === $("#markAS i").hasClass("fa-eye") ? ($("#markAS i").removeClass("fa-eye").addClass("fa-eye-slash"),
            $("#markAS span").text("סמן פרק כלא נצפה")) : ($("#markAS i").removeClass("fa-eye-slash").addClass("fa-eye"),
            $("#markAS span").text("סמן פרק כנצפה")))
        }),
        $("#lights").click(function() {
            return e()
        }),
        $("#report").click(function() {
            $("#reportVideo").hasClass("hidden") ? ($("#reportVideo").removeClass("hidden"),
            $("html, body").animate({
                scrollTop: $("#reportVideo").offset().top
            }, 2e3)) : $("#reportVideo").addClass("hidden")
        }),
        $("#submitReport").click(function(e) {
            e.preventDefault(),
            $(this).addClass("disabled");
            var a = $("#report_message").val();
            $.post("/ajax/flag_video", {
                vid: VID,
                msg: a
            }, function(e) {
                $("#reportVideo .content").prepend('<div class="alert alert-success">' + e + "</div>")
            })
        }),
        1 == cinemaMode && e(),
        $("#watchEpisode .stars i").click(function() {
            var e = $(this).data("star");
            $.post("/ajax/rate", {
                SID: SID,
                rating: e
            }, function(e) {
                $("#seMsg").remove(),
                e.msg ? $("#watchEpisode .stars").append('<p id="seMsg">שגיאה בדירוג הסדרה: ' + e.msg + "</p>") : (sRating = [e.rate, e.ratedby],
                u(sRating, "#watchEpisode"),
                $("#watchEpisode .stars").append('<p id="seMsg">הסדרה דורגה בהצלחה!</p>'))
            }, "json")
        }),
        $("#watchEpisode .stars i").mouseover(function() {
            var t = $(this).data("star");
            $("#watchEpisode .stars i").each(function(e, a) {
                e + 1 <= t ? $(a).removeClass("fa-star-half-o fa-star-o").addClass("hover fa-star") : $(a).removeClass("hover fa-star fa-star-half-o").addClass("fa-star-o")
            })
        }),
        $("#watchEpisode .stars").mouseleave(function() {
            return $("#player .stars i").removeClass("hover"),
            u(sRating, "#watchEpisode")
        }),
        $("#player .stars i").click(function() {
            var e = $(this).data("star");
            $.post("/ajax/rate", {
                VID: VID,
                rating: e
            }, function(e) {
                $("#erMsg").remove(),
                e.msg ? $("#player .stars").append('<p id="erMsg">שגיאה בדירוג הפרק: ' + e.msg + "</p>") : (rating = [e.rate, e.ratedby],
                u(rating, "#playyer"),
                $("#player .stars").append('<p id="erMsg">הפרק דורג בהצלחה!</p>'))
            }, "json")
        }),
        $("#player .stars i").mouseover(function() {
            var t = $(this).data("star");
            $("#player .stars i").each(function(e, a) {
                e + 1 <= t ? $(a).removeClass("fa-star-half-o fa-star-o").addClass("hover fa-star") : $(a).removeClass("hover fa-star fa-star-half-o").addClass("fa-star-o")
            })
        }),
        $("#player .stars").mouseleave(function() {
            return $("#player .stars i").removeClass("hover"),
            u(rating, "#player")
        }),
        $("#loading").on("click", "#proceed", function() {
            $("#loading").addClass("hidden"),
            $("#player").removeClass("hidden");
            var e = localStorage.getItem("pos_" + VID);
            0 < e && ($("#continue button:first-of-type").data("play", e),
            $("#continue").modal()),
            $("html, body").animate({
                scrollTop: $("#videojs").offset().top
            }, 2e3)
        }),
        $("#continue").on("click", "#confirm", function() {
            var e = $(this).data("play");
            videojs.getPlayer("videojs").currentTime(e)
        }),
        0 < season.length && 0 < episode.length && c(!1)
    }
    $("#liveSearch").typeahead({
        minLength: 3,
        delay: 300,
        items: "all",
        source: function(e, a) {
            $.get("/ajax/index", {
                search: e
            }, function(e) {
                a(e)
            }, "json")
        },
        afterSelect: function(e) {
            window.location = "/watch/" + e.id
        }
    }),
    $("#newSeries, #seriesList").on("mouseenter", "img", function() {
        $(this).parent().find(".sInfo").stop().slideDown().animate({
            opacity: 1
        }, {
            queue: !1
        })
    }),
    $("#newSeries, #seriesList").on("mouseleave", ".sInfo", function() {
        $(".sInfo").stop().slideUp().animate({
            opacity: 0
        }, {
            queue: !1
        })
    }),
    $("input[name='player_volume']").change(function() {
        $("#volume").text($("input[name='player_volume']").val() + "%")
    }),
    $(".progress-bar").each(function() {
        var e = $(this).attr("aria-valuenow");
        $(this).animate({
            width: e + "%"
        }, 1500)
    }),
    $("#newEpisodes").on("click", "button:not(.disabled)", function() {
        var e = $(this).data("action")
          , a = $(this);
        $(a).addClass("disabled"),
        "next" == e ? ++ep_page : --ep_page,
        ep_page <= 1 ? $('#newEpisodes button[data-action="prev"]').addClass("disabled") : $('#newEpisodes button[data-action="prev"]').removeClass("disabled");
        $.get("/ajax/index", {
            episodes: ep_page
        }, function() {}).done(function(e) {
            $("#newEpisodes .content").html(e),
            $("html, body").animate({
                scrollTop: $("#newEpisodes").offset().top
            }, 2e3)
        }).fail(function() {
            $("#newEpisodes .content").html("<p>אופס! לא הצלחנו לטעון סדרות נוספות. רענן את העמוד ונסה שנית</p>")
        }).always(function() {
            "prev" != e && 1 < ep_page && $(a).removeClass("disabled")
        })
    }),
    $("#newSeries").on("click", "button:not(.disabled), ul li:not(.active)", function() {
        var e = $(this).data("action");
        void 0 === e && ($("#newSeries ul li").removeClass("active").addClass("pointer"),
        $(this).addClass("active").removeClass("pointer"),
        serie_page = 1);
        var a = $("#newSeries ul li.active").data("type");
        void 0 === a && (a = "topnew");
        var t = $(this);
        $(t).addClass("disabled"),
        "next" == e ? ++serie_page : "prev" == e && --serie_page,
        serie_page <= 1 ? $('#newSeries button[data-action="prev"]').addClass("disabled") : $('#newSeries button[data-action="prev"]').removeClass("disabled");
        $.get("/ajax/index", {
            tab: a,
            page: serie_page
        }, function() {}).done(function(e) {
            $("#newSeries .content .row").html(e),
            "function" == typeof window.history.pushState && window.history.pushState("", "", "?tab=" + a + "&page=" + serie_page)
        }).fail(function() {
            $("#newSeries .content").html("<p>אופס! לא הצלחנו לטעון פרקים נוספים. רענן את העמוד ונסה שנית</p>")
        }).always(function() {
            "prev" != e && 1 < serie_page && $(t).removeClass("disabled")
        })
    }),
    setInterval(function() {
        $.post("/ajax/index", {
            keepAlive: !0
        }, function(e) {})
    }, 9e5)
});
