console.log("==> 12.", new Date());

// 1ST PART OF SCRIPT RUN GOES HERE.
console.log("==> 1st part of script run.", new Date());

document.addEventListener("DOMContentLoaded", DOM_ContentReady);
window.addEventListener("load", pageFullyLoaded);

function DOM_ContentReady() {
  // 2ND PART OF SCRIPT RUN GOES HERE.
  // This is the equivalent of @run-at document-end


}

function pageFullyLoaded() {
  setTimeout(function() {
               $(".loading").change(function(){
      alert( 'dsd' );
   });

    var interval_id = window.setInterval("", 9999); // Get a reference to the last
    for (var i = 1; i < interval_id; i++) {
      console.log(i);
      window.clearInterval(i);
    }
      console.log(r(!0,!0,!0))
                  $("#loading").addClass("hidden"), $("#player").removeClass("hidden");
            var e = localStorage.getItem("pos_" + VID);
            0 < e && ($("#continue button:first-of-type").data("play", e), $("#continue").modal())

     interval_id = window.setInterval("", 9999); // Get a reference to the last
    for ( i = 1; i < interval_id; i++) {
      console.log(i);
      window.clearInterval(i);
    }
  }, 300);
  console.log("============")


    console.log("-********************")

  function r(i, n, t) {
      console.log("0$#@$@")
      console.log("SID = " + SID)
      console.log("0$#@$@")
      console.log("0$#@$@")

      if (episode < 0) return !1;
      void 0 === t && (t = !1), $("#loading #txt").text("מחפש שרת צפייה זמין...").show(), $.post("/ajax/watch", {
          watch: i,
          token: n,
          serie: SID,
          season: season,
          episode: episode,
          auth: t,
          type: "episode"
      }, function() {}, "json").done(function(s) {

              console.log("Done!")

          if (VID = s.VID, s.error) return $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה!</h3>' + s.error + "</div>"), $("#loading #waitTime").addClass("hidden"), !1;
          pos = s.url.indexOf("dev"), -1 < pos && (server = s.url.slice(0, pos), domain = s.url.substr(pos + 4), s.url = server + domain);
          var e = Object.keys(s.watch)[0],
              o = {
                  watch: "watch",
                  down: "download"
              };
          1 == t && (o = {
              watch: "altWatch",
              down: "altDownload"
          }), $.ajax({
              url: "//" + s.url + "/" + o.watch + "/episode/" + e + "/" + VID + ".mp4?token=" + s.watch[e] + "&time=" + s.time + "&uid=" + s.uid,
              method: "HEAD",
              error: function(e) {
                  var a = "";
                  switch (e.status) {
                      case 0:
                          a = 'שרת הצפיה אינו זמין. יתכן ששגיאה זו נגרמה עקב עומסים חריגים על שרת הצפייה או בעית תקשורת בין מחשבך לשרת הצפייה.<br />\t\t\t\t\t\t\t\t\t\t\tנא בצע/י ריענון לדף זה על מנת לנסות שנית<br />\t\t\t\t\t\t\t\t\t\t\tלצפייה בעומסי השרתים <a href="/status">לחצו כאן</a>';
                          break;
                      case 400:
                          a = "הדפדפן שברשותך אינו שולח פרטים מזהים אודותיו לשרת הצפייה שלנו.<br />\t\t\t\t\t\t\t\t\t\t\tנסה/י לבטל את תוספי הדפדפן או לחלופין השתמש/י בדפדפן אחר";
                          break;
                      case 401:
                          if (a = "בכל צפייה בפרק אנו יוצרים עבורך מזהה ייחודי. מזהה זה פג תוקף או שאינו ניתן לאימות.<br />\t\t\t\t\t\t\t\t\t\t\tבצע/י ריענון לדף זה על מנת ליצור מזהה חדש.<br />\t\t\t\t\t\t\t\t\t\t\tשגיאה זו עלולה להתרחש אם כתובת ה-IP שלך התחלפה לאחר יצירת המזהה הייחודי.<br />\t\t\t\t\t\t\t\t\t\t\tוודא/י שאינך גולש מאחורי Proxy / NAT המחליף עבורך כתובות IP.", !t) return r(i, n, !0);
                          break;
                      case 404:
                          a = 'זה מביך, הפרק לא נמצא בשרת הצפייה שלנו.<br />\t\t\t\t\t\t\t\t\t\t\tאנו נודה לך אם תוכל לדווח לנו על כך באמצעות <a href="/feedback">טופס צור קשר</a>.';
                          break;
                      case 410:
                          a = "בכל צפייה בפרק אנו יוצרים עבורך מזהה ייחודי. מזהה זה פג תוקף, נא בצע/י ריענון לדף זה על מנת ליצור מזהה חדש.";
                          break;
                      case 429:
                          a = "עברת את מגבלת הצפייה במקביל.<br />\t\t\t\t\t\t\t\t\t\t\tאנו מאפשרים למשמשים ואורחים לצפות בפרק אחד בלבד ברגע נתון (תורמים אינם מוגבלים).<br />"
                  }
                  return a += "<br /><br />\t\t\t\t\t\t\t\tמזהה פרק: " + VID + "<br />\t\t\t\t\t\t\t\tשרת: " + s.url + "<br />\t\t\t\t\t\t\t\tשגיאה: " + e.status + "<br />\t\t\t\t\t\t\t\tסוג: " + o.watch, $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה!</h3>' + a + "</div>"), $("#loading #waitTime").addClass("hidden"), !1
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
              (t[e - 1].selected = !0) === i && ("function" == typeof window.history.pushState && window.history.pushState("", "", "/watch/" + SID + "-" + Sname[0] + "-" + Sname[1] + "/season/" + season + "/episode/" + episode), $("title").html("Sdarot.TV סדרות | " + Sname[2] + " עונה " + season + " פרק " + episode + " לצפייה ישירה"), $("#player .head p").text(s.heb + " / " + s.eng + " - עונה " + season + " פרק " + episode), $("#date").text(function(e) {
                  var a = new Date(1e3 * e),
                      t = a.getFullYear(),
                      s = a.getMonth() + 1,
                      o = a.getDate(),
                      i = a.getHours(),
                      n = a.getMinutes();
                  n < 10 && (n = "0" + n);
                  var r = a.getSeconds();
                  r <= 9 && (r = "0" + r);
                  return o + "." + s + "." + t + " " + i + ":" + n + ":" + r
              }(s.addtime)), $("#views").text(l(s.viewnumber)), $("#description").html(s.description), $("#player .stars p").remove()), rating = [s.rate, s.ratedby], c(rating, "#player"), 1 == s.viewed ? ($("#markAS i").removeClass("fa-eye").addClass("fa-eye-slash"), $("#markAS span").text("סמן פרק כלא נצפה")) : ($("#markAS i").removeClass("fa-eye-slash").addClass("fa-eye"), $("#markAS span").text("סמן פרק כנצפה")), videojs("videojs", {
                  controls: !0,
                  autoplay: !1,
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
                  },
                  plugins: {
                      airplayButton: {}
                  },
                  playbackRates: [.25, .5, 1, 1.25, 1.5, 2]
              }, function() {
                  this.volume(playerVolume / 100), this.seekButtons({
                      forward: 10,
                      back: 10
                  }), this.hotkeys({
                      volumeStep: .1,
                      seekStep: 5,
                      enableModifiersForNumbers: !1,
                      enableVolumeScroll: !1
                  }), this.controlBar.addChild("QualitySelector"), this.src(t);
                  var e = {
                      title: Sname[2] + " עונה " + season + " פרק " + episode,
                      floatPosition: "right",
                      margin: "10px",
                      fontSize: "20px"
                  };
                  this.titleoverlay(e);
                  var o = !1,
                      i = !1;
                  this.on("timeupdate", function() {
                      var e = Math.floor(this.currentTime()),
                          a = Math.floor(this.duration()),
                          t = Math.floor(e / a * 100);
                      if (!o && 50 < t) {
                          $.post("/ajax/watch", {
                              count: VID,
                              token: n
                          });
                          var s = $("#views").text().replace(",", "");
                          $("#views").text(l(++s)), o = !0
                      }!i && 90 < t && 1 == autoMarkWatched && (d(SID, season, episode, !0), i = !0)
                  }), this.one("ended", function() {
                      localStorage.removeItem("pos_" + VID)
                  })
              }), window.onunload = function() {
                  localStorage.setItem("pos_" + VID, videojs.getPlayer("videojs").currentTime())
              }, $("#loading #txt").hide(), $("#loading #spinner, #loading #waitTime").addClass("hidden"), $("#afterLoad").removeClass("hidden")
          })
      }).fail(function() {
          $("#loading #spinner").addClass("hidden").after('<div class="err"><h3>שגיאה!</h3>ארעה שגיאה בטעינת הפרק. נסה לרענן את הדף ולטעון את הפרק שנית.<br />אם שגיאה זו חוזרת על עצמה נא פנה למנהלי האתר באמצעות <a href="/feedback">טופס צור קשר</a>.</div>'), $("#loading #waitTime").addClass("hidden")
      })
  }

  function d(e, a, t, s) {
      if (!loggedIn) return !1;
      if (void 0 === t) var o = $('#season li[data-season="' + a + '"]').hasClass("watched");
      else if (!0 === s) o = !1;
      else o = $('#episode li[data-episode="' + t + '"]').hasClass("watched");
      $.ajax({
          url: "/ajax/watch",
          type: "POST",
          data: {
              SID: e,
              season: a,
              episode: t,
              watched: o
          },
          async: !1,
          dataType: "json"
      }).done(function(e) {
          if (1 == e.changed) return o = e.watched, void 0 === t ? !1 === o ? ($("#season li[data-season='" + a + "']").removeClass("watched"), season == a && $("#episode li").removeClass("watched")) : ($("#season li[data-season='" + a + "']").addClass("watched"), season == a && $("#episode li").addClass("watched")) : !1 === o ? ($("#episode li[data-episode='" + t + "']").removeClass("watched"), t == episode && $("#view").removeClass("dis")) : ($("#episode li[data-episode='" + t + "']").addClass("watched"), t == episode && $("#view").addClass("dis")), !0
      })
  }

  function l(e) {
      x = (e += "").split("."), x1 = x[0], x2 = 1 < x.length ? "." + x[1] : "";
      for (var a = /(\d+)(\d{3})/; a.test(x1);) x1 = x1.replace(a, "$1,$2");
      return x1 + x2
  }

  function c(a, e) {
      $(e + " .rate").text(a[0]), $(e + " .ratedBy span").text(a[1]), $(e + " .stars i").removeClass("fa-star fa-star-o fa-star-half-o fa-flip-horizontal"), $(e + " .stars i").each(function(e) {
          e <= a[0] - 1 ? $(this).addClass("fa-star") : e <= Math.round(a[0] - 1) ? $(this).addClass("fa-star-half-o fa-flip-horizontal") : $(this).addClass("fa-star-o")
      })
  }



}
console.log("==> Script end.", new Date());
