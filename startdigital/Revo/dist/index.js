(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/js-datepicker/dist/datepicker.min.js
  var require_datepicker_min = __commonJS({
    "node_modules/js-datepicker/dist/datepicker.min.js"(exports, module) {
      !function(e4, t4) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t4() : "function" == typeof define && define.amd ? define([], t4) : "object" == typeof exports ? exports.datepicker = t4() : e4.datepicker = t4();
      }(window, function() {
        return function(e4) {
          var t4 = {};
          function n3(a4) {
            if (t4[a4])
              return t4[a4].exports;
            var r4 = t4[a4] = { i: a4, l: false, exports: {} };
            return e4[a4].call(r4.exports, r4, r4.exports, n3), r4.l = true, r4.exports;
          }
          return n3.m = e4, n3.c = t4, n3.d = function(e5, t5, a4) {
            n3.o(e5, t5) || Object.defineProperty(e5, t5, { enumerable: true, get: a4 });
          }, n3.r = function(e5) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e5, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e5, "__esModule", { value: true });
          }, n3.t = function(e5, t5) {
            if (1 & t5 && (e5 = n3(e5)), 8 & t5)
              return e5;
            if (4 & t5 && "object" == typeof e5 && e5 && e5.__esModule)
              return e5;
            var a4 = /* @__PURE__ */ Object.create(null);
            if (n3.r(a4), Object.defineProperty(a4, "default", { enumerable: true, value: e5 }), 2 & t5 && "string" != typeof e5)
              for (var r4 in e5)
                n3.d(a4, r4, function(t6) {
                  return e5[t6];
                }.bind(null, r4));
            return a4;
          }, n3.n = function(e5) {
            var t5 = e5 && e5.__esModule ? function() {
              return e5.default;
            } : function() {
              return e5;
            };
            return n3.d(t5, "a", t5), t5;
          }, n3.o = function(e5, t5) {
            return Object.prototype.hasOwnProperty.call(e5, t5);
          }, n3.p = "", n3(n3.s = 0);
        }([function(e4, t4, n3) {
          "use strict";
          n3.r(t4);
          var a4 = [], r4 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], i4 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], o4 = { t: "top", r: "right", b: "bottom", l: "left", c: "centered" };
          function s5() {
          }
          var l5 = ["click", "focusin", "keydown", "input"];
          function d5(e5) {
            l5.forEach(function(t5) {
              e5.addEventListener(t5, e5 === document ? L2 : Y);
            });
          }
          function c5(e5) {
            return Array.isArray(e5) ? e5.map(c5) : "[object Object]" === x2(e5) ? Object.keys(e5).reduce(function(t5, n4) {
              return t5[n4] = c5(e5[n4]), t5;
            }, {}) : e5;
          }
          function u4(e5, t5) {
            var n4 = e5.calendar.querySelector(".qs-overlay"), a5 = n4 && !n4.classList.contains("qs-hidden");
            t5 = t5 || new Date(e5.currentYear, e5.currentMonth), e5.calendar.innerHTML = [h4(t5, e5, a5), f4(t5, e5, a5), v5(e5, a5)].join(""), a5 && window.requestAnimationFrame(function() {
              M2(true, e5);
            });
          }
          function h4(e5, t5, n4) {
            return ['<div class="qs-controls' + (n4 ? " qs-blur" : "") + '">', '<div class="qs-arrow qs-left"></div>', '<div class="qs-month-year' + (t5.disableYearOverlay ? " qs-disabled-year-overlay" : "") + '">', '<span class="qs-month">' + t5.months[e5.getMonth()] + "</span>", '<span class="qs-year">' + e5.getFullYear() + "</span>", "</div>", '<div class="qs-arrow qs-right"></div>', "</div>"].join("");
          }
          function f4(e5, t5, n4) {
            var a5 = t5.currentMonth, r5 = t5.currentYear, i5 = t5.dateSelected, o5 = t5.maxDate, s6 = t5.minDate, l6 = t5.showAllDates, d6 = t5.days, c6 = t5.disabledDates, u5 = t5.startDay, h5 = t5.weekendIndices, f5 = t5.events, v6 = t5.getRange ? t5.getRange() : {}, m3 = +v6.start, y4 = +v6.end, p5 = g3(new Date(e5).setDate(1)), w5 = p5.getDay() - u5, D2 = w5 < 0 ? 7 : 0;
            p5.setMonth(p5.getMonth() + 1), p5.setDate(0);
            var b4 = p5.getDate(), q4 = [], S3 = D2 + 7 * ((w5 + b4) / 7 | 0);
            S3 += (w5 + b4) % 7 ? 7 : 0;
            for (var M3 = 1; M3 <= S3; M3++) {
              var E2 = (M3 - 1) % 7, x3 = d6[E2], C4 = M3 - (w5 >= 0 ? w5 : 7 + w5), L3 = new Date(r5, a5, C4), Y2 = f5[+L3], j4 = C4 < 1 || C4 > b4, O3 = j4 ? C4 < 1 ? -1 : 1 : 0, P3 = j4 && !l6, k4 = P3 ? "" : L3.getDate(), N3 = +L3 == +i5, _4 = E2 === h5[0] || E2 === h5[1], I3 = m3 !== y4, A3 = "qs-square " + x3;
              Y2 && !P3 && (A3 += " qs-event"), j4 && (A3 += " qs-outside-current-month"), !l6 && j4 || (A3 += " qs-num"), N3 && (A3 += " qs-active"), (c6[+L3] || t5.disabler(L3) || _4 && t5.noWeekends || s6 && +L3 < +s6 || o5 && +L3 > +o5) && !P3 && (A3 += " qs-disabled"), +g3(/* @__PURE__ */ new Date()) == +L3 && (A3 += " qs-current"), +L3 === m3 && y4 && I3 && (A3 += " qs-range-start"), +L3 > m3 && +L3 < y4 && (A3 += " qs-range-middle"), +L3 === y4 && m3 && I3 && (A3 += " qs-range-end"), P3 && (A3 += " qs-empty", k4 = ""), q4.push('<div class="' + A3 + '" data-direction="' + O3 + '">' + k4 + "</div>");
            }
            var R2 = d6.map(function(e6) {
              return '<div class="qs-square qs-day">' + e6 + "</div>";
            }).concat(q4);
            return R2.unshift('<div class="qs-squares' + (n4 ? " qs-blur" : "") + '">'), R2.push("</div>"), R2.join("");
          }
          function v5(e5, t5) {
            var n4 = e5.overlayPlaceholder, a5 = e5.overlayButton;
            return ['<div class="qs-overlay' + (t5 ? "" : " qs-hidden") + '">', "<div>", '<input class="qs-overlay-year" placeholder="' + n4 + '" inputmode="numeric" />', '<div class="qs-close">&#10005;</div>', "</div>", '<div class="qs-overlay-month-container">' + e5.overlayMonths.map(function(e6, t6) {
              return '<div class="qs-overlay-month" data-month-num="' + t6 + '">' + e6 + "</div>";
            }).join("") + "</div>", '<div class="qs-submit qs-disabled">' + a5 + "</div>", "</div>"].join("");
          }
          function m2(e5, t5, n4) {
            var a5 = t5.el, r5 = t5.calendar.querySelector(".qs-active"), i5 = e5.textContent, o5 = t5.sibling;
            (a5.disabled || a5.readOnly) && t5.respectDisabledReadOnly || (t5.dateSelected = n4 ? void 0 : new Date(t5.currentYear, t5.currentMonth, i5), r5 && r5.classList.remove("qs-active"), n4 || e5.classList.add("qs-active"), p4(a5, t5, n4), n4 || q3(t5), o5 && (y3({ instance: t5, deselect: n4 }), t5.first && !o5.dateSelected && (o5.currentYear = t5.currentYear, o5.currentMonth = t5.currentMonth, o5.currentMonthName = t5.currentMonthName), u4(t5), u4(o5)), t5.onSelect(t5, n4 ? void 0 : new Date(t5.dateSelected)));
          }
          function y3(e5) {
            var t5 = e5.instance.first ? e5.instance : e5.instance.sibling, n4 = t5.sibling;
            t5 === e5.instance ? e5.deselect ? (t5.minDate = t5.originalMinDate, n4.minDate = n4.originalMinDate) : n4.minDate = t5.dateSelected : e5.deselect ? (n4.maxDate = n4.originalMaxDate, t5.maxDate = t5.originalMaxDate) : t5.maxDate = n4.dateSelected;
          }
          function p4(e5, t5, n4) {
            if (!t5.nonInput)
              return n4 ? e5.value = "" : t5.formatter !== s5 ? t5.formatter(e5, t5.dateSelected, t5) : void (e5.value = t5.dateSelected.toDateString());
          }
          function w4(e5, t5, n4, a5) {
            n4 || a5 ? (n4 && (t5.currentYear = +n4), a5 && (t5.currentMonth = +a5)) : (t5.currentMonth += e5.contains("qs-right") ? 1 : -1, 12 === t5.currentMonth ? (t5.currentMonth = 0, t5.currentYear++) : -1 === t5.currentMonth && (t5.currentMonth = 11, t5.currentYear--)), t5.currentMonthName = t5.months[t5.currentMonth], u4(t5), t5.onMonthChange(t5);
          }
          function D(e5) {
            if (!e5.noPosition) {
              var t5 = e5.position.top, n4 = e5.position.right;
              if (e5.position.centered)
                return e5.calendarContainer.classList.add("qs-centered");
              var a5 = e5.positionedEl.getBoundingClientRect(), r5 = e5.el.getBoundingClientRect(), i5 = e5.calendarContainer.getBoundingClientRect(), o5 = r5.top - a5.top + (t5 ? -1 * i5.height : r5.height) + "px", s6 = r5.left - a5.left + (n4 ? r5.width - i5.width : 0) + "px";
              e5.calendarContainer.style.setProperty("top", o5), e5.calendarContainer.style.setProperty("left", s6);
            }
          }
          function b3(e5) {
            return "[object Date]" === x2(e5) && "Invalid Date" !== e5.toString();
          }
          function g3(e5) {
            if (b3(e5) || "number" == typeof e5 && !isNaN(e5)) {
              var t5 = /* @__PURE__ */ new Date(+e5);
              return new Date(t5.getFullYear(), t5.getMonth(), t5.getDate());
            }
          }
          function q3(e5) {
            e5.disabled || !e5.calendarContainer.classList.contains("qs-hidden") && !e5.alwaysShow && ("overlay" !== e5.defaultView && M2(true, e5), e5.calendarContainer.classList.add("qs-hidden"), e5.onHide(e5));
          }
          function S2(e5) {
            e5.disabled || (e5.calendarContainer.classList.remove("qs-hidden"), "overlay" === e5.defaultView && M2(false, e5), D(e5), e5.onShow(e5));
          }
          function M2(e5, t5) {
            var n4 = t5.calendar, a5 = n4.querySelector(".qs-overlay"), r5 = a5.querySelector(".qs-overlay-year"), i5 = n4.querySelector(".qs-controls"), o5 = n4.querySelector(".qs-squares");
            e5 ? (a5.classList.add("qs-hidden"), i5.classList.remove("qs-blur"), o5.classList.remove("qs-blur"), r5.value = "") : (a5.classList.remove("qs-hidden"), i5.classList.add("qs-blur"), o5.classList.add("qs-blur"), r5.focus());
          }
          function E(e5, t5, n4, a5) {
            var r5 = isNaN(+(/* @__PURE__ */ new Date()).setFullYear(t5.value || void 0)), i5 = r5 ? null : t5.value;
            if (13 === e5.which || 13 === e5.keyCode || "click" === e5.type)
              a5 ? w4(null, n4, i5, a5) : r5 || t5.classList.contains("qs-disabled") || w4(null, n4, i5);
            else if (n4.calendar.contains(t5)) {
              n4.calendar.querySelector(".qs-submit").classList[r5 ? "add" : "remove"]("qs-disabled");
            }
          }
          function x2(e5) {
            return {}.toString.call(e5);
          }
          function C3(e5) {
            a4.forEach(function(t5) {
              t5 !== e5 && q3(t5);
            });
          }
          function L2(e5) {
            if (!e5.__qs_shadow_dom) {
              var t5 = e5.which || e5.keyCode, n4 = e5.type, r5 = e5.target, o5 = r5.classList, s6 = a4.filter(function(e6) {
                return e6.calendar.contains(r5) || e6.el === r5;
              })[0], l6 = s6 && s6.calendar.contains(r5);
              if (!(s6 && s6.isMobile && s6.disableMobile)) {
                if ("click" === n4) {
                  if (!s6)
                    return a4.forEach(q3);
                  if (s6.disabled)
                    return;
                  var d6 = s6.calendar, c6 = s6.calendarContainer, h5 = s6.disableYearOverlay, f5 = s6.nonInput, v6 = d6.querySelector(".qs-overlay-year"), y4 = !!d6.querySelector(".qs-hidden"), p5 = d6.querySelector(".qs-month-year").contains(r5), D2 = r5.dataset.monthNum;
                  if (s6.noPosition && !l6)
                    (c6.classList.contains("qs-hidden") ? S2 : q3)(s6);
                  else if (o5.contains("qs-arrow"))
                    w4(o5, s6);
                  else if (p5 || o5.contains("qs-close"))
                    h5 || M2(!y4, s6);
                  else if (D2)
                    E(e5, v6, s6, D2);
                  else {
                    if (o5.contains("qs-disabled"))
                      return;
                    if (o5.contains("qs-num")) {
                      var b4 = r5.textContent, g4 = +r5.dataset.direction, x3 = new Date(s6.currentYear, s6.currentMonth + g4, b4);
                      if (g4) {
                        s6.currentYear = x3.getFullYear(), s6.currentMonth = x3.getMonth(), s6.currentMonthName = i4[s6.currentMonth], u4(s6);
                        for (var L3, Y2 = s6.calendar.querySelectorAll('[data-direction="0"]'), j4 = 0; !L3; ) {
                          var O3 = Y2[j4];
                          O3.textContent === b4 && (L3 = O3), j4++;
                        }
                        r5 = L3;
                      }
                      return void (+x3 == +s6.dateSelected ? m2(r5, s6, true) : r5.classList.contains("qs-disabled") || m2(r5, s6));
                    }
                    o5.contains("qs-submit") ? E(e5, v6, s6) : f5 && r5 === s6.el && (S2(s6), C3(s6));
                  }
                } else if ("focusin" === n4 && s6)
                  S2(s6), C3(s6);
                else if ("keydown" === n4 && 9 === t5 && s6)
                  q3(s6);
                else if ("keydown" === n4 && s6 && !s6.disabled) {
                  var P3 = !s6.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");
                  13 === t5 && P3 && l6 ? E(e5, r5, s6) : 27 === t5 && P3 && l6 && M2(true, s6);
                } else if ("input" === n4) {
                  if (!s6 || !s6.calendar.contains(r5))
                    return;
                  var k4 = s6.calendar.querySelector(".qs-submit"), N3 = r5.value.split("").reduce(function(e6, t6) {
                    return e6 || "0" !== t6 ? e6 + (t6.match(/[0-9]/) ? t6 : "") : "";
                  }, "").slice(0, 4);
                  r5.value = N3, k4.classList[4 === N3.length ? "remove" : "add"]("qs-disabled");
                }
              }
            }
          }
          function Y(e5) {
            L2(e5), e5.__qs_shadow_dom = true;
          }
          function j3(e5, t5) {
            l5.forEach(function(n4) {
              e5.removeEventListener(n4, t5);
            });
          }
          function O2() {
            S2(this);
          }
          function P2() {
            q3(this);
          }
          function k3(e5, t5) {
            var n4 = g3(e5), a5 = this.currentYear, r5 = this.currentMonth, i5 = this.sibling;
            if (null == e5)
              return this.dateSelected = void 0, p4(this.el, this, true), i5 && (y3({ instance: this, deselect: true }), u4(i5)), u4(this), this;
            if (!b3(e5))
              throw new Error("`setDate` needs a JavaScript Date object.");
            if (this.disabledDates[+n4] || n4 < this.minDate || n4 > this.maxDate)
              throw new Error("You can't manually set a date that's disabled.");
            this.dateSelected = n4, t5 && (this.currentYear = n4.getFullYear(), this.currentMonth = n4.getMonth(), this.currentMonthName = this.months[n4.getMonth()]), p4(this.el, this), i5 && (y3({ instance: this }), u4(i5));
            var o5 = a5 === n4.getFullYear() && r5 === n4.getMonth();
            return o5 || t5 ? u4(this, n4) : o5 || u4(this, new Date(a5, r5, 1)), this;
          }
          function N2(e5) {
            return I2(this, e5, true);
          }
          function _3(e5) {
            return I2(this, e5);
          }
          function I2(e5, t5, n4) {
            var a5 = e5.dateSelected, r5 = e5.first, i5 = e5.sibling, o5 = e5.minDate, s6 = e5.maxDate, l6 = g3(t5), d6 = n4 ? "Min" : "Max";
            function c6() {
              return "original" + d6 + "Date";
            }
            function h5() {
              return d6.toLowerCase() + "Date";
            }
            function f5() {
              return "set" + d6;
            }
            function v6() {
              throw new Error("Out-of-range date passed to " + f5());
            }
            if (null == t5)
              e5[c6()] = void 0, i5 ? (i5[c6()] = void 0, n4 ? (r5 && !a5 || !r5 && !i5.dateSelected) && (e5.minDate = void 0, i5.minDate = void 0) : (r5 && !i5.dateSelected || !r5 && !a5) && (e5.maxDate = void 0, i5.maxDate = void 0)) : e5[h5()] = void 0;
            else {
              if (!b3(t5))
                throw new Error("Invalid date passed to " + f5());
              i5 ? ((r5 && n4 && l6 > (a5 || s6) || r5 && !n4 && l6 < (i5.dateSelected || o5) || !r5 && n4 && l6 > (i5.dateSelected || s6) || !r5 && !n4 && l6 < (a5 || o5)) && v6(), e5[c6()] = l6, i5[c6()] = l6, (n4 && (r5 && !a5 || !r5 && !i5.dateSelected) || !n4 && (r5 && !i5.dateSelected || !r5 && !a5)) && (e5[h5()] = l6, i5[h5()] = l6)) : ((n4 && l6 > (a5 || s6) || !n4 && l6 < (a5 || o5)) && v6(), e5[h5()] = l6);
            }
            return i5 && u4(i5), u4(e5), e5;
          }
          function A2() {
            var e5 = this.first ? this : this.sibling, t5 = e5.sibling;
            return { start: e5.dateSelected, end: t5.dateSelected };
          }
          function R() {
            var e5 = this.shadowDom, t5 = this.positionedEl, n4 = this.calendarContainer, r5 = this.sibling, i5 = this;
            this.inlinePosition && (a4.some(function(e6) {
              return e6 !== i5 && e6.positionedEl === t5;
            }) || t5.style.setProperty("position", null));
            n4.remove(), a4 = a4.filter(function(e6) {
              return e6 !== i5;
            }), r5 && delete r5.sibling, a4.length || j3(document, L2);
            var o5 = a4.some(function(t6) {
              return t6.shadowDom === e5;
            });
            for (var s6 in e5 && !o5 && j3(e5, Y), this)
              delete this[s6];
            a4.length || l5.forEach(function(e6) {
              document.removeEventListener(e6, L2);
            });
          }
          function F3(e5, t5) {
            var n4 = new Date(e5);
            if (!b3(n4))
              throw new Error("Invalid date passed to `navigate`");
            this.currentYear = n4.getFullYear(), this.currentMonth = n4.getMonth(), u4(this), t5 && this.onMonthChange(this);
          }
          function B2() {
            var e5 = !this.calendarContainer.classList.contains("qs-hidden"), t5 = !this.calendarContainer.querySelector(".qs-overlay").classList.contains("qs-hidden");
            e5 && M2(t5, this);
          }
          t4.default = function(e5, t5) {
            var n4 = function(e6, t6) {
              var n5, l7, d6 = function(e7) {
                var t7 = c5(e7);
                t7.events && (t7.events = t7.events.reduce(function(e8, t8) {
                  if (!b3(t8))
                    throw new Error('"options.events" must only contain valid JavaScript Date objects.');
                  return e8[+g3(t8)] = true, e8;
                }, {}));
                ["startDate", "dateSelected", "minDate", "maxDate"].forEach(function(e8) {
                  var n7 = t7[e8];
                  if (n7 && !b3(n7))
                    throw new Error('"options.' + e8 + '" needs to be a valid JavaScript Date object.');
                  t7[e8] = g3(n7);
                });
                var n6 = t7.position, i5 = t7.maxDate, l8 = t7.minDate, d7 = t7.dateSelected, u6 = t7.overlayPlaceholder, h6 = t7.overlayButton, f6 = t7.startDay, v7 = t7.id;
                if (t7.startDate = g3(t7.startDate || d7 || /* @__PURE__ */ new Date()), t7.disabledDates = (t7.disabledDates || []).reduce(function(e8, t8) {
                  var n7 = +g3(t8);
                  if (!b3(t8))
                    throw new Error('You supplied an invalid date to "options.disabledDates".');
                  if (n7 === +g3(d7))
                    throw new Error('"disabledDates" cannot contain the same date as "dateSelected".');
                  return e8[n7] = 1, e8;
                }, {}), t7.hasOwnProperty("id") && null == v7)
                  throw new Error("`id` cannot be `null` or `undefined`");
                if (null != v7) {
                  var m4 = a4.filter(function(e8) {
                    return e8.id === v7;
                  });
                  if (m4.length > 1)
                    throw new Error("Only two datepickers can share an id.");
                  m4.length ? (t7.second = true, t7.sibling = m4[0]) : t7.first = true;
                }
                var y5 = ["tr", "tl", "br", "bl", "c"].some(function(e8) {
                  return n6 === e8;
                });
                if (n6 && !y5)
                  throw new Error('"options.position" must be one of the following: tl, tr, bl, br, or c.');
                function p5(e8) {
                  throw new Error('"dateSelected" in options is ' + (e8 ? "less" : "greater") + ' than "' + (e8 || "max") + 'Date".');
                }
                if (t7.position = function(e8) {
                  var t8 = e8[0], n7 = e8[1], a5 = {};
                  a5[o4[t8]] = 1, n7 && (a5[o4[n7]] = 1);
                  return a5;
                }(n6 || "bl"), i5 < l8)
                  throw new Error('"maxDate" in options is less than "minDate".');
                d7 && (l8 > d7 && p5("min"), i5 < d7 && p5());
                if (["onSelect", "onShow", "onHide", "onMonthChange", "formatter", "disabler"].forEach(function(e8) {
                  "function" != typeof t7[e8] && (t7[e8] = s5);
                }), ["customDays", "customMonths", "customOverlayMonths"].forEach(function(e8, n7) {
                  var a5 = t7[e8], r5 = n7 ? 12 : 7;
                  if (a5) {
                    if (!Array.isArray(a5) || a5.length !== r5 || a5.some(function(e9) {
                      return "string" != typeof e9;
                    }))
                      throw new Error('"' + e8 + '" must be an array with ' + r5 + " strings.");
                    t7[n7 ? n7 < 2 ? "months" : "overlayMonths" : "days"] = a5;
                  }
                }), f6 && f6 > 0 && f6 < 7) {
                  var w6 = (t7.customDays || r4).slice(), D3 = w6.splice(0, f6);
                  t7.customDays = w6.concat(D3), t7.startDay = +f6, t7.weekendIndices = [w6.length - 1, w6.length];
                } else
                  t7.startDay = 0, t7.weekendIndices = [6, 0];
                "string" != typeof u6 && delete t7.overlayPlaceholder;
                "string" != typeof h6 && delete t7.overlayButton;
                var q5 = t7.defaultView;
                if (q5 && "calendar" !== q5 && "overlay" !== q5)
                  throw new Error('options.defaultView must either be "calendar" or "overlay".');
                return t7.defaultView = q5 || "calendar", t7;
              }(t6 || { startDate: g3(/* @__PURE__ */ new Date()), position: "bl", defaultView: "calendar" }), u5 = e6;
              if ("string" == typeof u5)
                u5 = "#" === u5[0] ? document.getElementById(u5.slice(1)) : document.querySelector(u5);
              else {
                if ("[object ShadowRoot]" === x2(u5))
                  throw new Error("Using a shadow DOM as your selector is not supported.");
                for (var h5, f5 = u5.parentNode; !h5; ) {
                  var v6 = x2(f5);
                  "[object HTMLDocument]" === v6 ? h5 = true : "[object ShadowRoot]" === v6 ? (h5 = true, n5 = f5, l7 = f5.host) : f5 = f5.parentNode;
                }
              }
              if (!u5)
                throw new Error("No selector / element found.");
              if (a4.some(function(e7) {
                return e7.el === u5;
              }))
                throw new Error("A datepicker already exists on that element.");
              var m3 = u5 === document.body, y4 = n5 ? u5.parentElement || n5 : m3 ? document.body : u5.parentElement, w5 = n5 ? u5.parentElement || l7 : y4, D2 = document.createElement("div"), q4 = document.createElement("div");
              D2.className = "qs-datepicker-container qs-hidden", q4.className = "qs-datepicker";
              var M3 = { shadowDom: n5, customElement: l7, positionedEl: w5, el: u5, parent: y4, nonInput: "INPUT" !== u5.nodeName, noPosition: m3, position: !m3 && d6.position, startDate: d6.startDate, dateSelected: d6.dateSelected, disabledDates: d6.disabledDates, minDate: d6.minDate, maxDate: d6.maxDate, noWeekends: !!d6.noWeekends, weekendIndices: d6.weekendIndices, calendarContainer: D2, calendar: q4, currentMonth: (d6.startDate || d6.dateSelected).getMonth(), currentMonthName: (d6.months || i4)[(d6.startDate || d6.dateSelected).getMonth()], currentYear: (d6.startDate || d6.dateSelected).getFullYear(), events: d6.events || {}, defaultView: d6.defaultView, setDate: k3, remove: R, setMin: N2, setMax: _3, show: O2, hide: P2, navigate: F3, toggleOverlay: B2, onSelect: d6.onSelect, onShow: d6.onShow, onHide: d6.onHide, onMonthChange: d6.onMonthChange, formatter: d6.formatter, disabler: d6.disabler, months: d6.months || i4, days: d6.customDays || r4, startDay: d6.startDay, overlayMonths: d6.overlayMonths || (d6.months || i4).map(function(e7) {
                return e7.slice(0, 3);
              }), overlayPlaceholder: d6.overlayPlaceholder || "4-digit year", overlayButton: d6.overlayButton || "Submit", disableYearOverlay: !!d6.disableYearOverlay, disableMobile: !!d6.disableMobile, isMobile: "ontouchstart" in window, alwaysShow: !!d6.alwaysShow, id: d6.id, showAllDates: !!d6.showAllDates, respectDisabledReadOnly: !!d6.respectDisabledReadOnly, first: d6.first, second: d6.second };
              if (d6.sibling) {
                var E2 = d6.sibling, C4 = M3, L3 = E2.minDate || C4.minDate, Y2 = E2.maxDate || C4.maxDate;
                C4.sibling = E2, E2.sibling = C4, E2.minDate = L3, E2.maxDate = Y2, C4.minDate = L3, C4.maxDate = Y2, E2.originalMinDate = L3, E2.originalMaxDate = Y2, C4.originalMinDate = L3, C4.originalMaxDate = Y2, E2.getRange = A2, C4.getRange = A2;
              }
              d6.dateSelected && p4(u5, M3);
              var j4 = getComputedStyle(w5).position;
              m3 || j4 && "static" !== j4 || (M3.inlinePosition = true, w5.style.setProperty("position", "relative"));
              var I3 = a4.filter(function(e7) {
                return e7.positionedEl === M3.positionedEl;
              });
              I3.some(function(e7) {
                return e7.inlinePosition;
              }) && (M3.inlinePosition = true, I3.forEach(function(e7) {
                e7.inlinePosition = true;
              }));
              D2.appendChild(q4), y4.appendChild(D2), M3.alwaysShow && S2(M3);
              return M3;
            }(e5, t5);
            if (a4.length || d5(document), n4.shadowDom && (a4.some(function(e6) {
              return e6.shadowDom === n4.shadowDom;
            }) || d5(n4.shadowDom)), a4.push(n4), n4.second) {
              var l6 = n4.sibling;
              y3({ instance: n4, deselect: !n4.dateSelected }), y3({ instance: l6, deselect: !l6.dateSelected }), u4(l6);
            }
            return u4(n4, n4.startDate || n4.dateSelected), n4.alwaysShow && D(n4), n4;
          };
        }]).default;
      });
    }
  });

  // Revo/js/SignUpForm.js
  var import_js_datepicker = __toESM(require_datepicker_min(), 1);

  // Revo/js/analytics.js
  var Analytics = class {
    constructor() {
      this.checkPartialFormComplete();
    }
    /**
     * Track when the user has partially completed the form (filled out all user details)
     */
    checkPartialFormComplete() {
      const customerDetails = document.querySelector("#customer-details");
      const requiredInputs = customerDetails.querySelectorAll("input[required]");
      let isValid = false;
      const onBlur = () => {
        isValid = this.validateInputs(requiredInputs);
        if (isValid) {
          this.sendPartialFormCompleteEvent();
          for (let index = 0; index < requiredInputs.length; index++) {
            const input = requiredInputs[index];
            input.removeEventListener("blur", onBlur);
          }
        }
      };
      for (let index = 0; index < requiredInputs.length; index++) {
        const input = requiredInputs[index];
        input.addEventListener("blur", onBlur);
        if (isValid) {
          break;
        }
      }
    }
    /**
     * @param {HTMLCollection} requiredInputs Required inputs
     * @returns {Bool} If the required inputs have been filled or not
     */
    validateInputs(requiredInputs) {
      let allInputsFilled = true;
      requiredInputs.forEach((input) => {
        if (input.value.trim() === "") {
          allInputsFilled = false;
        }
      });
      if (!allInputsFilled) {
        return false;
      }
      return true;
    }
    sendPartialFormCompleteEvent() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "SemiRegistrationComplete"
      });
    }
  };
  var analytics_default = Analytics;

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c;
  var s;
  var a;
  var h = {};
  var p = [];
  var v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var y = Array.isArray;
  function d(n3, l5) {
    for (var u4 in l5)
      n3[u4] = l5[u4];
    return n3;
  }
  function w(n3) {
    var l5 = n3.parentNode;
    l5 && l5.removeChild(n3);
  }
  function g(n3, t4, i4, o4, r4) {
    var f4 = { type: n3, props: t4, key: i4, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r4 ? ++u : r4, __i: -1, __u: 0 };
    return null == r4 && null != l.vnode && l.vnode(f4), f4;
  }
  function k(n3) {
    return n3.children;
  }
  function b(n3, l5) {
    this.props = n3, this.context = l5;
  }
  function x(n3, l5) {
    if (null == l5)
      return n3.__ ? x(n3.__, n3.__i + 1) : null;
    for (var u4; l5 < n3.__k.length; l5++)
      if (null != (u4 = n3.__k[l5]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n3.type ? x(n3) : null;
  }
  function C(n3) {
    var l5, u4;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l5 = 0; l5 < n3.__k.length; l5++)
        if (null != (u4 = n3.__k[l5]) && null != u4.__e) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return C(n3);
    }
  }
  function M(n3) {
    (!n3.__d && (n3.__d = true) && i.push(n3) && !P.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(P);
  }
  function P() {
    var n3, u4, t4, o4, r4, e4, c5, s5;
    for (i.sort(f); n3 = i.shift(); )
      n3.__d && (u4 = i.length, o4 = void 0, e4 = (r4 = (t4 = n3).__v).__e, c5 = [], s5 = [], t4.__P && ((o4 = d({}, r4)).__v = r4.__v + 1, l.vnode && l.vnode(o4), O(t4.__P, o4, r4, t4.__n, t4.__P.namespaceURI, 32 & r4.__u ? [e4] : null, c5, null == e4 ? x(r4) : e4, !!(32 & r4.__u), s5), o4.__v = r4.__v, o4.__.__k[o4.__i] = o4, j(c5, o4, s5), o4.__e != e4 && C(o4)), i.length > u4 && i.sort(f));
    P.__r = 0;
  }
  function S(n3, l5, u4, t4, i4, o4, r4, f4, e4, c5, s5) {
    var a4, v5, y3, d5, w4, _3 = t4 && t4.__k || p, g3 = l5.length;
    for (u4.__d = e4, $(u4, l5, _3), e4 = u4.__d, a4 = 0; a4 < g3; a4++)
      null != (y3 = u4.__k[a4]) && "boolean" != typeof y3 && "function" != typeof y3 && (v5 = -1 === y3.__i ? h : _3[y3.__i] || h, y3.__i = a4, O(n3, y3, v5, i4, o4, r4, f4, e4, c5, s5), d5 = y3.__e, y3.ref && v5.ref != y3.ref && (v5.ref && N(v5.ref, null, y3), s5.push(y3.ref, y3.__c || d5, y3)), null == w4 && null != d5 && (w4 = d5), 65536 & y3.__u || v5.__k === y3.__k ? (e4 && !e4.isConnected && (e4 = x(v5)), e4 = I(y3, e4, n3)) : "function" == typeof y3.type && void 0 !== y3.__d ? e4 = y3.__d : d5 && (e4 = d5.nextSibling), y3.__d = void 0, y3.__u &= -196609);
    u4.__d = e4, u4.__e = w4;
  }
  function $(n3, l5, u4) {
    var t4, i4, o4, r4, f4, e4 = l5.length, c5 = u4.length, s5 = c5, a4 = 0;
    for (n3.__k = [], t4 = 0; t4 < e4; t4++)
      r4 = t4 + a4, null != (i4 = n3.__k[t4] = null == (i4 = l5[t4]) || "boolean" == typeof i4 || "function" == typeof i4 ? null : "string" == typeof i4 || "number" == typeof i4 || "bigint" == typeof i4 || i4.constructor == String ? g(null, i4, null, null, null) : y(i4) ? g(k, { children: i4 }, null, null, null) : void 0 === i4.constructor && i4.__b > 0 ? g(i4.type, i4.props, i4.key, i4.ref ? i4.ref : null, i4.__v) : i4) ? (i4.__ = n3, i4.__b = n3.__b + 1, f4 = L(i4, u4, r4, s5), i4.__i = f4, o4 = null, -1 !== f4 && (s5--, (o4 = u4[f4]) && (o4.__u |= 131072)), null == o4 || null === o4.__v ? (-1 == f4 && a4--, "function" != typeof i4.type && (i4.__u |= 65536)) : f4 !== r4 && (f4 === r4 + 1 ? a4++ : f4 > r4 ? s5 > e4 - r4 ? a4 += f4 - r4 : a4-- : f4 < r4 ? f4 == r4 - 1 && (a4 = f4 - r4) : a4 = 0, f4 !== t4 + a4 && (i4.__u |= 65536))) : (o4 = u4[r4]) && null == o4.key && o4.__e && 0 == (131072 & o4.__u) && (o4.__e == n3.__d && (n3.__d = x(o4)), V(o4, o4, false), u4[r4] = null, s5--);
    if (s5)
      for (t4 = 0; t4 < c5; t4++)
        null != (o4 = u4[t4]) && 0 == (131072 & o4.__u) && (o4.__e == n3.__d && (n3.__d = x(o4)), V(o4, o4));
  }
  function I(n3, l5, u4) {
    var t4, i4;
    if ("function" == typeof n3.type) {
      for (t4 = n3.__k, i4 = 0; t4 && i4 < t4.length; i4++)
        t4[i4] && (t4[i4].__ = n3, l5 = I(t4[i4], l5, u4));
      return l5;
    }
    n3.__e != l5 && (u4.insertBefore(n3.__e, l5 || null), l5 = n3.__e);
    do {
      l5 = l5 && l5.nextSibling;
    } while (null != l5 && 8 === l5.nodeType);
    return l5;
  }
  function L(n3, l5, u4, t4) {
    var i4 = n3.key, o4 = n3.type, r4 = u4 - 1, f4 = u4 + 1, e4 = l5[u4];
    if (null === e4 || e4 && i4 == e4.key && o4 === e4.type && 0 == (131072 & e4.__u))
      return u4;
    if (t4 > (null != e4 && 0 == (131072 & e4.__u) ? 1 : 0))
      for (; r4 >= 0 || f4 < l5.length; ) {
        if (r4 >= 0) {
          if ((e4 = l5[r4]) && 0 == (131072 & e4.__u) && i4 == e4.key && o4 === e4.type)
            return r4;
          r4--;
        }
        if (f4 < l5.length) {
          if ((e4 = l5[f4]) && 0 == (131072 & e4.__u) && i4 == e4.key && o4 === e4.type)
            return f4;
          f4++;
        }
      }
    return -1;
  }
  function T(n3, l5, u4) {
    "-" === l5[0] ? n3.setProperty(l5, null == u4 ? "" : u4) : n3[l5] = null == u4 ? "" : "number" != typeof u4 || v.test(l5) ? u4 : u4 + "px";
  }
  function A(n3, l5, u4, t4, i4) {
    var o4;
    n:
      if ("style" === l5)
        if ("string" == typeof u4)
          n3.style.cssText = u4;
        else {
          if ("string" == typeof t4 && (n3.style.cssText = t4 = ""), t4)
            for (l5 in t4)
              u4 && l5 in u4 || T(n3.style, l5, "");
          if (u4)
            for (l5 in u4)
              t4 && u4[l5] === t4[l5] || T(n3.style, l5, u4[l5]);
        }
      else if ("o" === l5[0] && "n" === l5[1])
        o4 = l5 !== (l5 = l5.replace(/(PointerCapture)$|Capture$/i, "$1")), l5 = l5.toLowerCase() in n3 || "onFocusOut" === l5 || "onFocusIn" === l5 ? l5.toLowerCase().slice(2) : l5.slice(2), n3.l || (n3.l = {}), n3.l[l5 + o4] = u4, u4 ? t4 ? u4.u = t4.u : (u4.u = e, n3.addEventListener(l5, o4 ? s : c, o4)) : n3.removeEventListener(l5, o4 ? s : c, o4);
      else {
        if ("http://www.w3.org/2000/svg" == i4)
          l5 = l5.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" != l5 && "height" != l5 && "href" != l5 && "list" != l5 && "form" != l5 && "tabIndex" != l5 && "download" != l5 && "rowSpan" != l5 && "colSpan" != l5 && "role" != l5 && l5 in n3)
          try {
            n3[l5] = null == u4 ? "" : u4;
            break n;
          } catch (n4) {
          }
        "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l5[4] ? n3.removeAttribute(l5) : n3.setAttribute(l5, u4));
      }
  }
  function F(n3) {
    return function(u4) {
      if (this.l) {
        var t4 = this.l[u4.type + n3];
        if (null == u4.t)
          u4.t = e++;
        else if (u4.t < t4.u)
          return;
        return t4(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n3, u4, t4, i4, o4, r4, f4, e4, c5, s5) {
    var a4, h4, p4, v5, w4, _3, g3, m2, x2, C3, M2, P2, $2, I2, H, L2 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    128 & t4.__u && (c5 = !!(32 & t4.__u), r4 = [e4 = u4.__e = t4.__e]), (a4 = l.__b) && a4(u4);
    n:
      if ("function" == typeof L2)
        try {
          if (m2 = u4.props, x2 = (a4 = L2.contextType) && i4[a4.__c], C3 = a4 ? x2 ? x2.props.value : a4.__ : i4, t4.__c ? g3 = (h4 = u4.__c = t4.__c).__ = h4.__E : ("prototype" in L2 && L2.prototype.render ? u4.__c = h4 = new L2(m2, C3) : (u4.__c = h4 = new b(m2, C3), h4.constructor = L2, h4.render = q), x2 && x2.sub(h4), h4.props = m2, h4.state || (h4.state = {}), h4.context = C3, h4.__n = i4, p4 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != L2.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = d({}, h4.__s)), d(h4.__s, L2.getDerivedStateFromProps(m2, h4.__s))), v5 = h4.props, w4 = h4.state, h4.__v = u4, p4)
            null == L2.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
          else {
            if (null == L2.getDerivedStateFromProps && m2 !== v5 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(m2, C3), !h4.__e && (null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(m2, h4.__s, C3) || u4.__v === t4.__v)) {
              for (u4.__v !== t4.__v && (h4.props = m2, h4.state = h4.__s, h4.__d = false), u4.__e = t4.__e, u4.__k = t4.__k, u4.__k.forEach(function(n4) {
                n4 && (n4.__ = u4);
              }), M2 = 0; M2 < h4._sb.length; M2++)
                h4.__h.push(h4._sb[M2]);
              h4._sb = [], h4.__h.length && f4.push(h4);
              break n;
            }
            null != h4.componentWillUpdate && h4.componentWillUpdate(m2, h4.__s, C3), null != h4.componentDidUpdate && h4.__h.push(function() {
              h4.componentDidUpdate(v5, w4, _3);
            });
          }
          if (h4.context = C3, h4.props = m2, h4.__P = n3, h4.__e = false, P2 = l.__r, $2 = 0, "prototype" in L2 && L2.prototype.render) {
            for (h4.state = h4.__s, h4.__d = false, P2 && P2(u4), a4 = h4.render(h4.props, h4.state, h4.context), I2 = 0; I2 < h4._sb.length; I2++)
              h4.__h.push(h4._sb[I2]);
            h4._sb = [];
          } else
            do {
              h4.__d = false, P2 && P2(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
            } while (h4.__d && ++$2 < 25);
          h4.state = h4.__s, null != h4.getChildContext && (i4 = d(d({}, i4), h4.getChildContext())), p4 || null == h4.getSnapshotBeforeUpdate || (_3 = h4.getSnapshotBeforeUpdate(v5, w4)), S(n3, y(H = null != a4 && a4.type === k && null == a4.key ? a4.props.children : a4) ? H : [H], u4, t4, i4, o4, r4, f4, e4, c5, s5), h4.base = u4.__e, u4.__u &= -161, h4.__h.length && f4.push(h4), g3 && (h4.__E = h4.__ = null);
        } catch (n4) {
          u4.__v = null, c5 || null != r4 ? (u4.__e = e4, u4.__u |= c5 ? 160 : 32, r4[r4.indexOf(e4)] = null) : (u4.__e = t4.__e, u4.__k = t4.__k), l.__e(n4, u4, t4);
        }
      else
        null == r4 && u4.__v === t4.__v ? (u4.__k = t4.__k, u4.__e = t4.__e) : u4.__e = z(t4.__e, u4, t4, i4, o4, r4, f4, c5, s5);
    (a4 = l.diffed) && a4(u4);
  }
  function j(n3, u4, t4) {
    u4.__d = void 0;
    for (var i4 = 0; i4 < t4.length; i4++)
      N(t4[i4], t4[++i4], t4[++i4]);
    l.__c && l.__c(u4, n3), n3.some(function(u5) {
      try {
        n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
          n4.call(u5);
        });
      } catch (n4) {
        l.__e(n4, u5.__v);
      }
    });
  }
  function z(l5, u4, t4, i4, o4, r4, f4, e4, c5) {
    var s5, a4, p4, v5, d5, _3, g3, m2 = t4.props, k3 = u4.props, b3 = u4.type;
    if ("svg" === b3 ? o4 = "http://www.w3.org/2000/svg" : "math" === b3 ? o4 = "http://www.w3.org/1998/Math/MathML" : o4 || (o4 = "http://www.w3.org/1999/xhtml"), null != r4) {
      for (s5 = 0; s5 < r4.length; s5++)
        if ((d5 = r4[s5]) && "setAttribute" in d5 == !!b3 && (b3 ? d5.localName === b3 : 3 === d5.nodeType)) {
          l5 = d5, r4[s5] = null;
          break;
        }
    }
    if (null == l5) {
      if (null === b3)
        return document.createTextNode(k3);
      l5 = document.createElementNS(o4, b3, k3.is && k3), r4 = null, e4 = false;
    }
    if (null === b3)
      m2 === k3 || e4 && l5.data === k3 || (l5.data = k3);
    else {
      if (r4 = r4 && n.call(l5.childNodes), m2 = t4.props || h, !e4 && null != r4)
        for (m2 = {}, s5 = 0; s5 < l5.attributes.length; s5++)
          m2[(d5 = l5.attributes[s5]).name] = d5.value;
      for (s5 in m2)
        if (d5 = m2[s5], "children" == s5)
          ;
        else if ("dangerouslySetInnerHTML" == s5)
          p4 = d5;
        else if ("key" !== s5 && !(s5 in k3)) {
          if ("value" == s5 && "defaultValue" in k3 || "checked" == s5 && "defaultChecked" in k3)
            continue;
          A(l5, s5, null, d5, o4);
        }
      for (s5 in k3)
        d5 = k3[s5], "children" == s5 ? v5 = d5 : "dangerouslySetInnerHTML" == s5 ? a4 = d5 : "value" == s5 ? _3 = d5 : "checked" == s5 ? g3 = d5 : "key" === s5 || e4 && "function" != typeof d5 || m2[s5] === d5 || A(l5, s5, d5, m2[s5], o4);
      if (a4)
        e4 || p4 && (a4.__html === p4.__html || a4.__html === l5.innerHTML) || (l5.innerHTML = a4.__html), u4.__k = [];
      else if (p4 && (l5.innerHTML = ""), S(l5, y(v5) ? v5 : [v5], u4, t4, i4, "foreignObject" === b3 ? "http://www.w3.org/1999/xhtml" : o4, r4, f4, r4 ? r4[0] : t4.__k && x(t4, 0), e4, c5), null != r4)
        for (s5 = r4.length; s5--; )
          null != r4[s5] && w(r4[s5]);
      e4 || (s5 = "value", void 0 !== _3 && (_3 !== l5[s5] || "progress" === b3 && !_3 || "option" === b3 && _3 !== m2[s5]) && A(l5, s5, _3, m2[s5], o4), s5 = "checked", void 0 !== g3 && g3 !== l5[s5] && A(l5, s5, g3, m2[s5], o4));
    }
    return l5;
  }
  function N(n3, u4, t4) {
    try {
      "function" == typeof n3 ? n3(u4) : n3.current = u4;
    } catch (n4) {
      l.__e(n4, t4);
    }
  }
  function V(n3, u4, t4) {
    var i4, o4;
    if (l.unmount && l.unmount(n3), (i4 = n3.ref) && (i4.current && i4.current !== n3.__e || N(i4, null, u4)), null != (i4 = n3.__c)) {
      if (i4.componentWillUnmount)
        try {
          i4.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u4);
        }
      i4.base = i4.__P = null;
    }
    if (i4 = n3.__k)
      for (o4 = 0; o4 < i4.length; o4++)
        i4[o4] && V(i4[o4], u4, t4 || "function" != typeof n3.type);
    t4 || null == n3.__e || w(n3.__e), n3.__c = n3.__ = n3.__e = n3.__d = void 0;
  }
  function q(n3, l5, u4) {
    return this.constructor(n3, u4);
  }
  n = p.slice, l = { __e: function(n3, l5, u4, t4) {
    for (var i4, o4, r4; l5 = l5.__; )
      if ((i4 = l5.__c) && !i4.__)
        try {
          if ((o4 = i4.constructor) && null != o4.getDerivedStateFromError && (i4.setState(o4.getDerivedStateFromError(n3)), r4 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n3, t4 || {}), r4 = i4.__d), r4)
            return i4.__E = i4;
        } catch (l6) {
          n3 = l6;
        }
    throw n3;
  } }, u = 0, t = function(n3) {
    return null != n3 && null == n3.constructor;
  }, b.prototype.setState = function(n3, l5) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n3 && (n3 = n3(d({}, u4), this.props)), n3 && d(u4, n3), null != n3 && this.__v && (l5 && this._sb.push(l5), M(this));
  }, b.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), M(this));
  }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n3, l5) {
    return n3.__v.__b - l5.__v.__b;
  }, P.__r = 0, e = 0, c = F(false), s = F(true), a = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = [];
  var e2 = l;
  var a2 = e2.__b;
  var v2 = e2.__r;
  var l2 = e2.diffed;
  var m = e2.__c;
  var s2 = e2.unmount;
  var d2 = e2.__;
  function h2(n3, t4) {
    e2.__h && e2.__h(r2, n3, o2 || t4), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n3 >= u4.__.length && u4.__.push({ __V: c2 }), u4.__[n3];
  }
  function q2(n3, r4) {
    var u4 = h2(t2++, 7);
    return C2(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
  }
  function j2() {
    for (var n3; n3 = f2.shift(); )
      if (n3.__P && n3.__H)
        try {
          n3.__H.__h.forEach(z2), n3.__H.__h.forEach(B), n3.__H.__h = [];
        } catch (t4) {
          n3.__H.__h = [], e2.__e(t4, n3.__v);
        }
  }
  e2.__b = function(n3) {
    r2 = null, a2 && a2(n3);
  }, e2.__ = function(n3, t4) {
    n3 && t4.__k && t4.__k.__m && (n3.__m = t4.__k.__m), d2 && d2(n3, t4);
  }, e2.__r = function(n3) {
    v2 && v2(n3), t2 = 0;
    var i4 = (r2 = n3.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.__V = c2, n4.__N = n4.i = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B), i4.__h = [], t2 = 0)), u2 = r2;
  }, e2.diffed = function(n3) {
    l2 && l2(n3);
    var t4 = n3.__c;
    t4 && t4.__H && (t4.__H.__h.length && (1 !== f2.push(t4) && i2 === e2.requestAnimationFrame || ((i2 = e2.requestAnimationFrame) || w2)(j2)), t4.__H.__.forEach(function(n4) {
      n4.i && (n4.__H = n4.i), n4.__V !== c2 && (n4.__ = n4.__V), n4.i = void 0, n4.__V = c2;
    })), u2 = r2 = null;
  }, e2.__c = function(n3, t4) {
    t4.some(function(n4) {
      try {
        n4.__h.forEach(z2), n4.__h = n4.__h.filter(function(n5) {
          return !n5.__ || B(n5);
        });
      } catch (r4) {
        t4.some(function(n5) {
          n5.__h && (n5.__h = []);
        }), t4 = [], e2.__e(r4, n4.__v);
      }
    }), m && m(n3, t4);
  }, e2.unmount = function(n3) {
    s2 && s2(n3);
    var t4, r4 = n3.__c;
    r4 && r4.__H && (r4.__H.__.forEach(function(n4) {
      try {
        z2(n4);
      } catch (n5) {
        t4 = n5;
      }
    }), r4.__H = void 0, t4 && e2.__e(t4, r4.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n3) {
    var t4, r4 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u4 = setTimeout(r4, 100);
    k2 && (t4 = requestAnimationFrame(r4));
  }
  function z2(n3) {
    var t4 = r2, u4 = n3.__c;
    "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t4;
  }
  function B(n3) {
    var t4 = r2;
    n3.__c = n3.__(), r2 = t4;
  }
  function C2(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, r4) {
      return t5 !== n3[r4];
    });
  }

  // node_modules/@preact/signals-core/dist/signals-core.module.js
  function i3() {
    throw new Error("Cycle detected");
  }
  function t3() {
    if (!(h3 > 1)) {
      var i4, t4 = false;
      while (void 0 !== n2) {
        var o4 = n2;
        n2 = void 0;
        s3++;
        while (void 0 !== o4) {
          var r4 = o4.o;
          o4.o = void 0;
          o4.f &= -3;
          if (!(8 & o4.f) && c3(o4))
            try {
              o4.c();
            } catch (o5) {
              if (!t4) {
                i4 = o5;
                t4 = true;
              }
            }
          o4 = r4;
        }
      }
      s3 = 0;
      h3--;
      if (t4)
        throw i4;
    } else
      h3--;
  }
  var r3 = void 0;
  var n2 = void 0;
  var h3 = 0;
  var s3 = 0;
  var f3 = 0;
  function v3(i4) {
    if (void 0 !== r3) {
      var t4 = i4.n;
      if (void 0 === t4 || t4.t !== r3) {
        t4 = { i: 0, S: i4, p: r3.s, n: void 0, t: r3, e: void 0, x: void 0, r: t4 };
        if (void 0 !== r3.s)
          r3.s.n = t4;
        r3.s = t4;
        i4.n = t4;
        if (32 & r3.f)
          i4.S(t4);
        return t4;
      } else if (-1 === t4.i) {
        t4.i = 0;
        if (void 0 !== t4.n) {
          t4.n.p = t4.p;
          if (void 0 !== t4.p)
            t4.p.n = t4.n;
          t4.p = r3.s;
          t4.n = void 0;
          r3.s.n = t4;
          r3.s = t4;
        }
        return t4;
      }
    }
  }
  function e3(i4) {
    this.v = i4;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
  }
  e3.prototype.h = function() {
    return true;
  };
  e3.prototype.S = function(i4) {
    if (this.t !== i4 && void 0 === i4.e) {
      i4.x = this.t;
      if (void 0 !== this.t)
        this.t.e = i4;
      this.t = i4;
    }
  };
  e3.prototype.U = function(i4) {
    if (void 0 !== this.t) {
      var t4 = i4.e, o4 = i4.x;
      if (void 0 !== t4) {
        t4.x = o4;
        i4.e = void 0;
      }
      if (void 0 !== o4) {
        o4.e = t4;
        i4.x = void 0;
      }
      if (i4 === this.t)
        this.t = o4;
    }
  };
  e3.prototype.subscribe = function(i4) {
    var t4 = this;
    return b2(function() {
      var o4 = t4.value, r4 = 32 & this.f;
      this.f &= -33;
      try {
        i4(o4);
      } finally {
        this.f |= r4;
      }
    });
  };
  e3.prototype.valueOf = function() {
    return this.value;
  };
  e3.prototype.toString = function() {
    return this.value + "";
  };
  e3.prototype.toJSON = function() {
    return this.value;
  };
  e3.prototype.peek = function() {
    return this.v;
  };
  Object.defineProperty(e3.prototype, "value", { get: function() {
    var i4 = v3(this);
    if (void 0 !== i4)
      i4.i = this.i;
    return this.v;
  }, set: function(o4) {
    if (r3 instanceof l3)
      !function() {
        throw new Error("Computed cannot have side-effects");
      }();
    if (o4 !== this.v) {
      if (s3 > 100)
        i3();
      this.v = o4;
      this.i++;
      f3++;
      h3++;
      try {
        for (var n3 = this.t; void 0 !== n3; n3 = n3.x)
          n3.t.N();
      } finally {
        t3();
      }
    }
  } });
  function u3(i4) {
    return new e3(i4);
  }
  function c3(i4) {
    for (var t4 = i4.s; void 0 !== t4; t4 = t4.n)
      if (t4.S.i !== t4.i || !t4.S.h() || t4.S.i !== t4.i)
        return true;
    return false;
  }
  function d3(i4) {
    for (var t4 = i4.s; void 0 !== t4; t4 = t4.n) {
      var o4 = t4.S.n;
      if (void 0 !== o4)
        t4.r = o4;
      t4.S.n = t4;
      t4.i = -1;
      if (void 0 === t4.n) {
        i4.s = t4;
        break;
      }
    }
  }
  function a3(i4) {
    var t4 = i4.s, o4 = void 0;
    while (void 0 !== t4) {
      var r4 = t4.p;
      if (-1 === t4.i) {
        t4.S.U(t4);
        if (void 0 !== r4)
          r4.n = t4.n;
        if (void 0 !== t4.n)
          t4.n.p = r4;
      } else
        o4 = t4;
      t4.S.n = t4.r;
      if (void 0 !== t4.r)
        t4.r = void 0;
      t4 = r4;
    }
    i4.s = o4;
  }
  function l3(i4) {
    e3.call(this, void 0);
    this.x = i4;
    this.s = void 0;
    this.g = f3 - 1;
    this.f = 4;
  }
  (l3.prototype = new e3()).h = function() {
    this.f &= -3;
    if (1 & this.f)
      return false;
    if (32 == (36 & this.f))
      return true;
    this.f &= -5;
    if (this.g === f3)
      return true;
    this.g = f3;
    this.f |= 1;
    if (this.i > 0 && !c3(this)) {
      this.f &= -2;
      return true;
    }
    var i4 = r3;
    try {
      d3(this);
      r3 = this;
      var t4 = this.x();
      if (16 & this.f || this.v !== t4 || 0 === this.i) {
        this.v = t4;
        this.f &= -17;
        this.i++;
      }
    } catch (i5) {
      this.v = i5;
      this.f |= 16;
      this.i++;
    }
    r3 = i4;
    a3(this);
    this.f &= -2;
    return true;
  };
  l3.prototype.S = function(i4) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t4 = this.s; void 0 !== t4; t4 = t4.n)
        t4.S.S(t4);
    }
    e3.prototype.S.call(this, i4);
  };
  l3.prototype.U = function(i4) {
    if (void 0 !== this.t) {
      e3.prototype.U.call(this, i4);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t4 = this.s; void 0 !== t4; t4 = t4.n)
          t4.S.U(t4);
      }
    }
  };
  l3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i4 = this.t; void 0 !== i4; i4 = i4.x)
        i4.t.N();
    }
  };
  l3.prototype.peek = function() {
    if (!this.h())
      i3();
    if (16 & this.f)
      throw this.v;
    return this.v;
  };
  Object.defineProperty(l3.prototype, "value", { get: function() {
    if (1 & this.f)
      i3();
    var t4 = v3(this);
    this.h();
    if (void 0 !== t4)
      t4.i = this.i;
    if (16 & this.f)
      throw this.v;
    return this.v;
  } });
  function w3(i4) {
    return new l3(i4);
  }
  function y2(i4) {
    var o4 = i4.u;
    i4.u = void 0;
    if ("function" == typeof o4) {
      h3++;
      var n3 = r3;
      r3 = void 0;
      try {
        o4();
      } catch (t4) {
        i4.f &= -2;
        i4.f |= 8;
        _(i4);
        throw t4;
      } finally {
        r3 = n3;
        t3();
      }
    }
  }
  function _(i4) {
    for (var t4 = i4.s; void 0 !== t4; t4 = t4.n)
      t4.S.U(t4);
    i4.x = void 0;
    i4.s = void 0;
    y2(i4);
  }
  function p2(i4) {
    if (r3 !== this)
      throw new Error("Out-of-order effect");
    a3(this);
    r3 = i4;
    this.f &= -2;
    if (8 & this.f)
      _(this);
    t3();
  }
  function g2(i4) {
    this.x = i4;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
  }
  g2.prototype.c = function() {
    var i4 = this.S();
    try {
      if (8 & this.f)
        return;
      if (void 0 === this.x)
        return;
      var t4 = this.x();
      if ("function" == typeof t4)
        this.u = t4;
    } finally {
      i4();
    }
  };
  g2.prototype.S = function() {
    if (1 & this.f)
      i3();
    this.f |= 1;
    this.f &= -9;
    y2(this);
    d3(this);
    h3++;
    var t4 = r3;
    r3 = this;
    return p2.bind(this, t4);
  };
  g2.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = n2;
      n2 = this;
    }
  };
  g2.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f))
      _(this);
  };
  function b2(i4) {
    var t4 = new g2(i4);
    try {
      t4.c();
    } catch (i5) {
      t4.d();
      throw i5;
    }
    return t4.d.bind(t4);
  }

  // node_modules/@preact/signals/dist/signals.module.js
  var c4;
  var v4;
  function s4(n3, i4) {
    l[n3] = i4.bind(null, l[n3] || function() {
    });
  }
  function l4(n3) {
    if (v4)
      v4();
    v4 = n3 && n3.S();
  }
  function d4(n3) {
    var r4 = this, t4 = n3.data, f4 = useSignal(t4);
    f4.value = t4;
    var o4 = q2(function() {
      var n4 = r4.__v;
      while (n4 = n4.__)
        if (n4.__c) {
          n4.__c.__$f |= 4;
          break;
        }
      r4.__$u.c = function() {
        r4.base.data = o4.peek();
      };
      return w3(function() {
        var n5 = f4.value.value;
        return 0 === n5 ? 0 : true === n5 ? "" : n5 || "";
      });
    }, []);
    return o4.value;
  }
  d4.displayName = "_st";
  Object.defineProperties(e3.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: d4 }, props: { configurable: true, get: function() {
    return { data: this };
  } }, __b: { configurable: true, value: 1 } });
  s4("__b", function(n3, r4) {
    if ("string" == typeof r4.type) {
      var i4, t4 = r4.props;
      for (var f4 in t4)
        if ("children" !== f4) {
          var e4 = t4[f4];
          if (e4 instanceof e3) {
            if (!i4)
              r4.__np = i4 = {};
            i4[f4] = e4;
            t4[f4] = e4.peek();
          }
        }
    }
    n3(r4);
  });
  s4("__r", function(n3, r4) {
    l4();
    var i4, t4 = r4.__c;
    if (t4) {
      t4.__$f &= -2;
      if (void 0 === (i4 = t4.__$u))
        t4.__$u = i4 = function(n4) {
          var r5;
          b2(function() {
            r5 = this;
          });
          r5.c = function() {
            t4.__$f |= 1;
            t4.setState({});
          };
          return r5;
        }();
    }
    c4 = t4;
    l4(i4);
    n3(r4);
  });
  s4("__e", function(n3, r4, i4, t4) {
    l4();
    c4 = void 0;
    n3(r4, i4, t4);
  });
  s4("diffed", function(n3, r4) {
    l4();
    c4 = void 0;
    var i4;
    if ("string" == typeof r4.type && (i4 = r4.__e)) {
      var t4 = r4.__np, f4 = r4.props;
      if (t4) {
        var o4 = i4.U;
        if (o4)
          for (var e4 in o4) {
            var u4 = o4[e4];
            if (void 0 !== u4 && !(e4 in t4)) {
              u4.d();
              o4[e4] = void 0;
            }
          }
        else
          i4.U = o4 = {};
        for (var a4 in t4) {
          var v5 = o4[a4], s5 = t4[a4];
          if (void 0 === v5) {
            v5 = p3(i4, a4, s5, f4);
            o4[a4] = v5;
          } else
            v5.o(s5, f4);
        }
      }
    }
    n3(r4);
  });
  function p3(n3, r4, i4, t4) {
    var f4 = r4 in n3 && void 0 === n3.ownerSVGElement, o4 = u3(i4);
    return { o: function(n4, r5) {
      o4.value = n4;
      t4 = r5;
    }, d: b2(function() {
      var i5 = o4.value.value;
      if (t4[r4] !== i5) {
        t4[r4] = i5;
        if (f4)
          n3[r4] = i5;
        else if (i5)
          n3.setAttribute(r4, i5);
        else
          n3.removeAttribute(r4);
      }
    }) };
  }
  s4("unmount", function(n3, r4) {
    if ("string" == typeof r4.type) {
      var i4 = r4.__e;
      if (i4) {
        var t4 = i4.U;
        if (t4) {
          i4.U = void 0;
          for (var f4 in t4) {
            var o4 = t4[f4];
            if (o4)
              o4.d();
          }
        }
      }
    } else {
      var e4 = r4.__c;
      if (e4) {
        var u4 = e4.__$u;
        if (u4) {
          e4.__$u = void 0;
          u4.d();
        }
      }
    }
    n3(r4);
  });
  s4("__h", function(n3, r4, i4, t4) {
    if (t4 < 3)
      r4.__$f |= 2;
    n3(r4, i4, t4);
  });
  b.prototype.shouldComponentUpdate = function(n3, r4) {
    var i4 = this.__$u;
    if (!(i4 && void 0 !== i4.s || 4 & this.__$f))
      return true;
    if (3 & this.__$f)
      return true;
    for (var t4 in r4)
      return true;
    for (var f4 in n3)
      if ("__source" !== f4 && n3[f4] !== this.props[f4])
        return true;
    for (var o4 in this.props)
      if (!(o4 in n3))
        return true;
    return false;
  };
  function useSignal(n3) {
    return q2(function() {
      return u3(n3);
    }, []);
  }

  // Revo/js/PriceUpdater.js
  var PriceUpdater = class {
    constructor() {
      this.SURCHARGE;
      this.priceToggles = document.querySelectorAll("[data-price-toggle]");
    }
    /**
     * Wait the specified amount of time before continuing
     *
     * @param {Number} amount
     * @returns {Promise}
     */
    wait(amount = 0) {
      return new Promise((resolve, reject) => {
        this.timerId = setTimeout(resolve, amount);
        this.cancelPromise = reject;
      });
    }
    async setDefaultMembershipLevel() {
      const membershipTypes = document.querySelectorAll('[name="membershipType"]');
      const firstItem = membershipTypes[0];
      const lastItem = membershipTypes[membershipTypes.length - 1];
      const secondLastItem = membershipTypes[membershipTypes.length - 2];
      await this.wait(100);
      if (firstItem) {
        firstItem.checked = true;
      }
      this.calculateSurcharge();
      this.setPrice();
      this.addPriceToggleListener();
      return true;
    }
    setPrice() {
      if (document.querySelector('[name="discountCodeType"]')?.value === "free_level_two") {
        return;
      }
      const price = document.querySelector("[data-price]");
      if (!price) {
        return;
      }
      if (document.querySelector("[data-guest-sign-up]")) {
        price.textContent = 0;
        return;
      }
      if (document.querySelector('[name="membershipType"]:checked')?.value == "level-3") {
        price.textContent = 72.32;
      }
      if (document.querySelector("[data-five-week-membership]")) {
        if (document.querySelector('[name="membershipType"]:checked').value == "level-3") {
          price.textContent = 100;
        } else {
          price.textContent = document.querySelector('[name="membershipType"]:checked').value == "level-1" ? 60 : 85;
        }
        return;
      }
      const gyms = document.querySelector("#gymSelect");
      const level = document.querySelector(
        '[name="membershipType"]:checked'
      )?.value;
      let membershipType;
      if (level === "level-1") {
        membershipType = "data-level-one";
      } else if (level === "level-2") {
        membershipType = "data-level-two";
      } else {
        membershipType = "data-level-three";
      }
      let paymentAmount;
      if (gyms?.options[gyms.selectedIndex].value == "select-a-gym") {
        this.SURCHARGE = 2;
        paymentAmount = membershipType === "data-level-one" ? 42 : 55;
      } else if (membershipType === "data-level-three") {
        paymentAmount = 72.32;
      } else {
        paymentAmount = gyms?.options[gyms.selectedIndex].getAttribute(membershipType);
      }
      if (!gyms || document.querySelector("[data-guest-sign-up]") || document.querySelector("[data-five-week-membership]") || document.querySelector('[data-payment-type="bank"].isActive')) {
        this.SURCHARGE = 0;
      }
      price.textContent = (parseFloat(paymentAmount) + parseFloat(this.SURCHARGE)).toFixed(2);
    }
    calculateSurcharge() {
      const gyms = document.querySelector("#gymSelect");
      if (!gyms || document.querySelector("[data-guest-sign-up]") || document.querySelector("[data-five-week-membership]") || document.querySelector('[data-payment-type="bank"].isActive')) {
        this.SURCHARGE = 0;
        return;
      }
      const frequency = gyms.options[gyms.selectedIndex].getAttribute(
        "data-payment-frequency"
      );
      let membershipType;
      const level = document.querySelector('[name="membershipType"]:checked')?.value ?? "level-2";
      if (level === "level-1") {
        membershipType = "data-level-one";
      } else if (level === "level-2") {
        membershipType = "data-level-two";
      } else {
        membershipType = "data-level-three";
      }
      if (frequency == "monthly") {
        let paymentAmount;
        if (membershipType === "data-level-three") {
          paymentAmount = 72.32;
        } else {
          paymentAmount = gyms?.options[gyms.selectedIndex].getAttribute(membershipType);
        }
        const twoDollarsInCents = 2 * 100;
        const percentage = 0.018 * paymentAmount + 0.35 * 100;
        this.SURCHARGE = Math.max(twoDollarsInCents, percentage) / 100;
        return;
      }
      this.SURCHARGE = 0.61;
    }
    addPriceToggleListener() {
      this.priceToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
          this.calculateSurcharge();
          this.setPrice();
        });
      });
      document.querySelector("#stateSelect")?.addEventListener("change", () => {
        this.calculateSurcharge();
        this.setPrice();
      });
      document.querySelector("#gymSelect")?.addEventListener("change", () => {
        this.calculateSurcharge();
        this.setPrice();
      });
    }
    init() {
      this.setDefaultMembershipLevel();
    }
  };
  var PriceUpdater_default = PriceUpdater;

  // node_modules/signature_pad/dist/signature_pad.js
  var Point = class {
    constructor(x2, y3, pressure, time) {
      if (isNaN(x2) || isNaN(y3)) {
        throw new Error(`Point is invalid: (${x2}, ${y3})`);
      }
      this.x = +x2;
      this.y = +y3;
      this.pressure = pressure || 0;
      this.time = time || Date.now();
    }
    distanceTo(start) {
      return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
    }
    equals(other) {
      return this.x === other.x && this.y === other.y && this.pressure === other.pressure && this.time === other.time;
    }
    velocityFrom(start) {
      return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 0;
    }
  };
  var Bezier = class _Bezier {
    static fromPoints(points, widths) {
      const c22 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
      const c32 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
      return new _Bezier(points[1], c22, c32, points[2], widths.start, widths.end);
    }
    static calculateControlPoints(s1, s22, s32) {
      const dx1 = s1.x - s22.x;
      const dy1 = s1.y - s22.y;
      const dx2 = s22.x - s32.x;
      const dy2 = s22.y - s32.y;
      const m1 = { x: (s1.x + s22.x) / 2, y: (s1.y + s22.y) / 2 };
      const m2 = { x: (s22.x + s32.x) / 2, y: (s22.y + s32.y) / 2 };
      const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const l22 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      const dxm = m1.x - m2.x;
      const dym = m1.y - m2.y;
      const k3 = l22 / (l1 + l22);
      const cm = { x: m2.x + dxm * k3, y: m2.y + dym * k3 };
      const tx = s22.x - cm.x;
      const ty = s22.y - cm.y;
      return {
        c1: new Point(m1.x + tx, m1.y + ty),
        c2: new Point(m2.x + tx, m2.y + ty)
      };
    }
    constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
      this.startPoint = startPoint;
      this.control2 = control2;
      this.control1 = control1;
      this.endPoint = endPoint;
      this.startWidth = startWidth;
      this.endWidth = endWidth;
    }
    length() {
      const steps = 10;
      let length = 0;
      let px;
      let py;
      for (let i4 = 0; i4 <= steps; i4 += 1) {
        const t4 = i4 / steps;
        const cx = this.point(t4, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
        const cy = this.point(t4, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
        if (i4 > 0) {
          const xdiff = cx - px;
          const ydiff = cy - py;
          length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        }
        px = cx;
        py = cy;
      }
      return length;
    }
    point(t4, start, c1, c22, end) {
      return start * (1 - t4) * (1 - t4) * (1 - t4) + 3 * c1 * (1 - t4) * (1 - t4) * t4 + 3 * c22 * (1 - t4) * t4 * t4 + end * t4 * t4 * t4;
    }
  };
  var SignatureEventTarget = class {
    constructor() {
      try {
        this._et = new EventTarget();
      } catch (error) {
        this._et = document;
      }
    }
    addEventListener(type, listener, options) {
      this._et.addEventListener(type, listener, options);
    }
    dispatchEvent(event2) {
      return this._et.dispatchEvent(event2);
    }
    removeEventListener(type, callback, options) {
      this._et.removeEventListener(type, callback, options);
    }
  };
  function throttle(fn, wait = 250) {
    let previous = 0;
    let timeout = null;
    let result;
    let storedContext;
    let storedArgs;
    const later = () => {
      previous = Date.now();
      timeout = null;
      result = fn.apply(storedContext, storedArgs);
      if (!timeout) {
        storedContext = null;
        storedArgs = [];
      }
    };
    return function wrapper(...args) {
      const now2 = Date.now();
      const remaining = wait - (now2 - previous);
      storedContext = this;
      storedArgs = args;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now2;
        result = fn.apply(storedContext, storedArgs);
        if (!timeout) {
          storedContext = null;
          storedArgs = [];
        }
      } else if (!timeout) {
        timeout = window.setTimeout(later, remaining);
      }
      return result;
    };
  }
  var SignaturePad = class _SignaturePad extends SignatureEventTarget {
    constructor(canvas, options = {}) {
      super();
      this.canvas = canvas;
      this._drawingStroke = false;
      this._isEmpty = true;
      this._lastPoints = [];
      this._data = [];
      this._lastVelocity = 0;
      this._lastWidth = 0;
      this._handleMouseDown = (event2) => {
        if (event2.buttons === 1) {
          this._strokeBegin(event2);
        }
      };
      this._handleMouseMove = (event2) => {
        this._strokeMoveUpdate(event2);
      };
      this._handleMouseUp = (event2) => {
        if (event2.buttons === 1) {
          this._strokeEnd(event2);
        }
      };
      this._handleTouchStart = (event2) => {
        if (event2.cancelable) {
          event2.preventDefault();
        }
        if (event2.targetTouches.length === 1) {
          const touch = event2.changedTouches[0];
          this._strokeBegin(touch);
        }
      };
      this._handleTouchMove = (event2) => {
        if (event2.cancelable) {
          event2.preventDefault();
        }
        const touch = event2.targetTouches[0];
        this._strokeMoveUpdate(touch);
      };
      this._handleTouchEnd = (event2) => {
        const wasCanvasTouched = event2.target === this.canvas;
        if (wasCanvasTouched) {
          if (event2.cancelable) {
            event2.preventDefault();
          }
          const touch = event2.changedTouches[0];
          this._strokeEnd(touch);
        }
      };
      this._handlePointerStart = (event2) => {
        event2.preventDefault();
        this._strokeBegin(event2);
      };
      this._handlePointerMove = (event2) => {
        this._strokeMoveUpdate(event2);
      };
      this._handlePointerEnd = (event2) => {
        if (this._drawingStroke) {
          event2.preventDefault();
          this._strokeEnd(event2);
        }
      };
      this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
      this.minWidth = options.minWidth || 0.5;
      this.maxWidth = options.maxWidth || 2.5;
      this.throttle = "throttle" in options ? options.throttle : 16;
      this.minDistance = "minDistance" in options ? options.minDistance : 5;
      this.dotSize = options.dotSize || 0;
      this.penColor = options.penColor || "black";
      this.backgroundColor = options.backgroundColor || "rgba(0,0,0,0)";
      this.compositeOperation = options.compositeOperation || "source-over";
      this._strokeMoveUpdate = this.throttle ? throttle(_SignaturePad.prototype._strokeUpdate, this.throttle) : _SignaturePad.prototype._strokeUpdate;
      this._ctx = canvas.getContext("2d");
      this.clear();
      this.on();
    }
    clear() {
      const { _ctx: ctx, canvas } = this;
      ctx.fillStyle = this.backgroundColor;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this._data = [];
      this._reset(this._getPointGroupOptions());
      this._isEmpty = true;
    }
    fromDataURL(dataUrl, options = {}) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        const ratio = options.ratio || window.devicePixelRatio || 1;
        const width = options.width || this.canvas.width / ratio;
        const height = options.height || this.canvas.height / ratio;
        const xOffset = options.xOffset || 0;
        const yOffset = options.yOffset || 0;
        this._reset(this._getPointGroupOptions());
        image.onload = () => {
          this._ctx.drawImage(image, xOffset, yOffset, width, height);
          resolve();
        };
        image.onerror = (error) => {
          reject(error);
        };
        image.crossOrigin = "anonymous";
        image.src = dataUrl;
        this._isEmpty = false;
      });
    }
    toDataURL(type = "image/png", encoderOptions) {
      switch (type) {
        case "image/svg+xml":
          if (typeof encoderOptions !== "object") {
            encoderOptions = void 0;
          }
          return `data:image/svg+xml;base64,${btoa(this.toSVG(encoderOptions))}`;
        default:
          if (typeof encoderOptions !== "number") {
            encoderOptions = void 0;
          }
          return this.canvas.toDataURL(type, encoderOptions);
      }
    }
    on() {
      this.canvas.style.touchAction = "none";
      this.canvas.style.msTouchAction = "none";
      this.canvas.style.userSelect = "none";
      const isIOS = /Macintosh/.test(navigator.userAgent) && "ontouchstart" in document;
      if (window.PointerEvent && !isIOS) {
        this._handlePointerEvents();
      } else {
        this._handleMouseEvents();
        if ("ontouchstart" in window) {
          this._handleTouchEvents();
        }
      }
    }
    off() {
      this.canvas.style.touchAction = "auto";
      this.canvas.style.msTouchAction = "auto";
      this.canvas.style.userSelect = "auto";
      this.canvas.removeEventListener("pointerdown", this._handlePointerStart);
      this.canvas.removeEventListener("pointermove", this._handlePointerMove);
      this.canvas.ownerDocument.removeEventListener("pointerup", this._handlePointerEnd);
      this.canvas.removeEventListener("mousedown", this._handleMouseDown);
      this.canvas.removeEventListener("mousemove", this._handleMouseMove);
      this.canvas.ownerDocument.removeEventListener("mouseup", this._handleMouseUp);
      this.canvas.removeEventListener("touchstart", this._handleTouchStart);
      this.canvas.removeEventListener("touchmove", this._handleTouchMove);
      this.canvas.removeEventListener("touchend", this._handleTouchEnd);
    }
    isEmpty() {
      return this._isEmpty;
    }
    fromData(pointGroups, { clear = true } = {}) {
      if (clear) {
        this.clear();
      }
      this._fromData(pointGroups, this._drawCurve.bind(this), this._drawDot.bind(this));
      this._data = this._data.concat(pointGroups);
    }
    toData() {
      return this._data;
    }
    _getPointGroupOptions(group) {
      return {
        penColor: group && "penColor" in group ? group.penColor : this.penColor,
        dotSize: group && "dotSize" in group ? group.dotSize : this.dotSize,
        minWidth: group && "minWidth" in group ? group.minWidth : this.minWidth,
        maxWidth: group && "maxWidth" in group ? group.maxWidth : this.maxWidth,
        velocityFilterWeight: group && "velocityFilterWeight" in group ? group.velocityFilterWeight : this.velocityFilterWeight,
        compositeOperation: group && "compositeOperation" in group ? group.compositeOperation : this.compositeOperation
      };
    }
    _strokeBegin(event2) {
      const cancelled = !this.dispatchEvent(new CustomEvent("beginStroke", { detail: event2, cancelable: true }));
      if (cancelled) {
        return;
      }
      this._drawingStroke = true;
      const pointGroupOptions = this._getPointGroupOptions();
      const newPointGroup = Object.assign(Object.assign({}, pointGroupOptions), { points: [] });
      this._data.push(newPointGroup);
      this._reset(pointGroupOptions);
      this._strokeUpdate(event2);
    }
    _strokeUpdate(event2) {
      if (!this._drawingStroke) {
        return;
      }
      if (this._data.length === 0) {
        this._strokeBegin(event2);
        return;
      }
      this.dispatchEvent(new CustomEvent("beforeUpdateStroke", { detail: event2 }));
      const x2 = event2.clientX;
      const y3 = event2.clientY;
      const pressure = event2.pressure !== void 0 ? event2.pressure : event2.force !== void 0 ? event2.force : 0;
      const point = this._createPoint(x2, y3, pressure);
      const lastPointGroup = this._data[this._data.length - 1];
      const lastPoints = lastPointGroup.points;
      const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
      const isLastPointTooClose = lastPoint ? point.distanceTo(lastPoint) <= this.minDistance : false;
      const pointGroupOptions = this._getPointGroupOptions(lastPointGroup);
      if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
        const curve = this._addPoint(point, pointGroupOptions);
        if (!lastPoint) {
          this._drawDot(point, pointGroupOptions);
        } else if (curve) {
          this._drawCurve(curve, pointGroupOptions);
        }
        lastPoints.push({
          time: point.time,
          x: point.x,
          y: point.y,
          pressure: point.pressure
        });
      }
      this.dispatchEvent(new CustomEvent("afterUpdateStroke", { detail: event2 }));
    }
    _strokeEnd(event2) {
      if (!this._drawingStroke) {
        return;
      }
      this._strokeUpdate(event2);
      this._drawingStroke = false;
      this.dispatchEvent(new CustomEvent("endStroke", { detail: event2 }));
    }
    _handlePointerEvents() {
      this._drawingStroke = false;
      this.canvas.addEventListener("pointerdown", this._handlePointerStart);
      this.canvas.addEventListener("pointermove", this._handlePointerMove);
      this.canvas.ownerDocument.addEventListener("pointerup", this._handlePointerEnd);
    }
    _handleMouseEvents() {
      this._drawingStroke = false;
      this.canvas.addEventListener("mousedown", this._handleMouseDown);
      this.canvas.addEventListener("mousemove", this._handleMouseMove);
      this.canvas.ownerDocument.addEventListener("mouseup", this._handleMouseUp);
    }
    _handleTouchEvents() {
      this.canvas.addEventListener("touchstart", this._handleTouchStart);
      this.canvas.addEventListener("touchmove", this._handleTouchMove);
      this.canvas.addEventListener("touchend", this._handleTouchEnd);
    }
    _reset(options) {
      this._lastPoints = [];
      this._lastVelocity = 0;
      this._lastWidth = (options.minWidth + options.maxWidth) / 2;
      this._ctx.fillStyle = options.penColor;
      this._ctx.globalCompositeOperation = options.compositeOperation;
    }
    _createPoint(x2, y3, pressure) {
      const rect = this.canvas.getBoundingClientRect();
      return new Point(x2 - rect.left, y3 - rect.top, pressure, (/* @__PURE__ */ new Date()).getTime());
    }
    _addPoint(point, options) {
      const { _lastPoints } = this;
      _lastPoints.push(point);
      if (_lastPoints.length > 2) {
        if (_lastPoints.length === 3) {
          _lastPoints.unshift(_lastPoints[0]);
        }
        const widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2], options);
        const curve = Bezier.fromPoints(_lastPoints, widths);
        _lastPoints.shift();
        return curve;
      }
      return null;
    }
    _calculateCurveWidths(startPoint, endPoint, options) {
      const velocity = options.velocityFilterWeight * endPoint.velocityFrom(startPoint) + (1 - options.velocityFilterWeight) * this._lastVelocity;
      const newWidth = this._strokeWidth(velocity, options);
      const widths = {
        end: newWidth,
        start: this._lastWidth
      };
      this._lastVelocity = velocity;
      this._lastWidth = newWidth;
      return widths;
    }
    _strokeWidth(velocity, options) {
      return Math.max(options.maxWidth / (velocity + 1), options.minWidth);
    }
    _drawCurveSegment(x2, y3, width) {
      const ctx = this._ctx;
      ctx.moveTo(x2, y3);
      ctx.arc(x2, y3, width, 0, 2 * Math.PI, false);
      this._isEmpty = false;
    }
    _drawCurve(curve, options) {
      const ctx = this._ctx;
      const widthDelta = curve.endWidth - curve.startWidth;
      const drawSteps = Math.ceil(curve.length()) * 2;
      ctx.beginPath();
      ctx.fillStyle = options.penColor;
      for (let i4 = 0; i4 < drawSteps; i4 += 1) {
        const t4 = i4 / drawSteps;
        const tt = t4 * t4;
        const ttt = tt * t4;
        const u4 = 1 - t4;
        const uu = u4 * u4;
        const uuu = uu * u4;
        let x2 = uuu * curve.startPoint.x;
        x2 += 3 * uu * t4 * curve.control1.x;
        x2 += 3 * u4 * tt * curve.control2.x;
        x2 += ttt * curve.endPoint.x;
        let y3 = uuu * curve.startPoint.y;
        y3 += 3 * uu * t4 * curve.control1.y;
        y3 += 3 * u4 * tt * curve.control2.y;
        y3 += ttt * curve.endPoint.y;
        const width = Math.min(curve.startWidth + ttt * widthDelta, options.maxWidth);
        this._drawCurveSegment(x2, y3, width);
      }
      ctx.closePath();
      ctx.fill();
    }
    _drawDot(point, options) {
      const ctx = this._ctx;
      const width = options.dotSize > 0 ? options.dotSize : (options.minWidth + options.maxWidth) / 2;
      ctx.beginPath();
      this._drawCurveSegment(point.x, point.y, width);
      ctx.closePath();
      ctx.fillStyle = options.penColor;
      ctx.fill();
    }
    _fromData(pointGroups, drawCurve, drawDot) {
      for (const group of pointGroups) {
        const { points } = group;
        const pointGroupOptions = this._getPointGroupOptions(group);
        if (points.length > 1) {
          for (let j3 = 0; j3 < points.length; j3 += 1) {
            const basicPoint = points[j3];
            const point = new Point(basicPoint.x, basicPoint.y, basicPoint.pressure, basicPoint.time);
            if (j3 === 0) {
              this._reset(pointGroupOptions);
            }
            const curve = this._addPoint(point, pointGroupOptions);
            if (curve) {
              drawCurve(curve, pointGroupOptions);
            }
          }
        } else {
          this._reset(pointGroupOptions);
          drawDot(points[0], pointGroupOptions);
        }
      }
    }
    toSVG({ includeBackgroundColor = false } = {}) {
      const pointGroups = this._data;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const minX = 0;
      const minY = 0;
      const maxX = this.canvas.width / ratio;
      const maxY = this.canvas.height / ratio;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      svg.setAttribute("viewBox", `${minX} ${minY} ${maxX} ${maxY}`);
      svg.setAttribute("width", maxX.toString());
      svg.setAttribute("height", maxY.toString());
      if (includeBackgroundColor && this.backgroundColor) {
        const rect = document.createElement("rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", this.backgroundColor);
        svg.appendChild(rect);
      }
      this._fromData(pointGroups, (curve, { penColor }) => {
        const path = document.createElement("path");
        if (!isNaN(curve.control1.x) && !isNaN(curve.control1.y) && !isNaN(curve.control2.x) && !isNaN(curve.control2.y)) {
          const attr = `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(3)} C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} ${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} ${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;
          path.setAttribute("d", attr);
          path.setAttribute("stroke-width", (curve.endWidth * 2.25).toFixed(3));
          path.setAttribute("stroke", penColor);
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-linecap", "round");
          svg.appendChild(path);
        }
      }, (point, { penColor, dotSize, minWidth, maxWidth }) => {
        const circle = document.createElement("circle");
        const size = dotSize > 0 ? dotSize : (minWidth + maxWidth) / 2;
        circle.setAttribute("r", size.toString());
        circle.setAttribute("cx", point.x.toString());
        circle.setAttribute("cy", point.y.toString());
        circle.setAttribute("fill", penColor);
        svg.appendChild(circle);
      });
      return svg.outerHTML;
    }
  };

  // Revo/js/SignUpForm.js
  var SignUpForm = class {
    constructor() {
      this.dateOfBirth = (0, import_js_datepicker.default)("#dateOfBirth", {
        maxDate: this.minDateToBeAdult(),
        startDate: this.minDateToBeAdult(),
        formatter: (input, date) => {
          const value = date.toLocaleDateString();
          input.value = value;
        },
        onSelect: (instance, date) => {
          const isUnder18 = this.isUnder18(date);
          this.handleUnderageSubmissionUI(isUnder18);
        }
      });
      this.form = document.querySelector("#sign-up-form");
      this.validatePromoCode();
      this.togglePaymentTypes();
      this.updateStartDate();
      this.handleLevelThreeMembership();
      this.handlePaymentFrequency();
      this.handleGymSelect();
      this.handleOrientationModal();
      this.updateCardSurchargeTerms();
      const gymSelect = document.querySelector("#gymSelect");
      document.querySelector("#state").value = gymSelect.options[gymSelect.selectedIndex].dataset.state;
      if (document.querySelector("#signature")) {
        this.signaturePad = new SignaturePad(
          document.querySelector("#signature"),
          {
            minWidth: 1,
            maxWidth: 1,
            penColor: "#CB333B"
          }
        );
        this.signaturePad.addEventListener("endStroke", () => {
          const signed = document.querySelector('[name="signed"]');
          const signedPart2 = document.querySelector('[name="signedPart2"]');
          const base64Data = this.signaturePad.toDataURL();
          const splitIndex = Math.floor(base64Data.length / 2);
          const firstPart = base64Data.substring(0, splitIndex);
          const secondPart = base64Data.substring(splitIndex);
          signed.value = firstPart;
          signedPart2.value = secondPart;
          signed.dispatchEvent(new Event("change"));
          signedPart2.dispatchEvent(new Event("change"));
        });
        document.querySelector("[data-action=clear]").addEventListener("click", () => this.signaturePad.clear());
        window.addEventListener(
          "resize",
          () => this.resizeCanvas(this.signaturePad)
        );
        this.resizeCanvas(this.signaturePad);
      }
      const price = new PriceUpdater_default();
      price.init();
      new analytics_default();
      this.handleLevelTwoCampaign();
      this.prefillPromoCodeForPresaleGyms();
    }
    /**
     * Prefill the promo code for presale gyms if it's not already filled.
     *
     * This usually occurs if the user navigates back to the form after being redirected to a presale page
     * and the presale gym is still selected.
     */
    async prefillPromoCodeForPresaleGyms() {
      await this.wait(100);
      const discountInput = document.querySelector("#discountCode");
      const gymSelect = document.querySelector("#gymSelect");
      const selectedGym = gymSelect.selectedOptions[0];
      const checkDiscountButton = document.querySelector("[data-check-discount]");
      const isPresale = selectedGym?.classList.contains("is-presale");
      if (!discountInput || !selectedGym || !isPresale) {
        return;
      }
      const code = selectedGym.dataset.presaleCode;
      if (code && !discountInput.value) {
        if (checkDiscountButton) {
          checkDiscountButton.style.display = "none";
          discountInput.classList.remove(["!border-r-0", "!rounded-r-none"]);
        }
        discountInput.value = code;
        discountInput.setAttribute("readonly", "readonly");
      }
    }
    /**
     * Handle the UI when the user is underage
     */
    handleUnderageSubmissionUI(isUnder18) {
      const emergencyContactContainer = document.querySelector("#emergency-details");
      if (!emergencyContactContainer) {
        return;
      }
      const emergencyContactFields = emergencyContactContainer.querySelectorAll("input");
      if (isUnder18) {
        emergencyContactContainer.style.removeProperty("display");
        emergencyContactFields.forEach((field) => field.required = true);
        return;
      }
      emergencyContactFields.forEach((field) => {
        field.value = "";
        field.required = false;
      });
      emergencyContactContainer.style.display = "none";
    }
    /**
     * Returns true is the user is under 18 years old
     */
    isUnder18(date) {
      const eighteenYearsAgo = /* @__PURE__ */ new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      return date.getTime() > eighteenYearsAgo.getTime();
    }
    setupTestSubmissionDetails() {
      const requiredInputs = this.form.querySelectorAll("[required]");
      requiredInputs.forEach((input) => {
        if (input.name == "termsConditions" || input.name == "signed") {
          return;
        }
        input.value = "test";
        if (input.name == "postCode") {
          input.value = "1234";
        }
        if (input.name == "email") {
          let r4 = (Math.random() + 1).toString(36).substring(5);
          input.value = `contract@${r4}.com.au`;
        }
        if (input.name == "phoneNumber") {
          input.value = "0412345678";
        }
        if (input.name == "gender") {
          input.value = "Male";
        }
        if (input.name == "dateOfBirth") {
          input.value = "02/01/2006";
        }
      });
    }
    resizeCanvas(signaturePad) {
      const canvas = document.querySelector("#signature");
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      signaturePad.clear();
    }
    async handlePaymentFrequency() {
      await this.wait(500);
      const gymSelect = document.querySelector("#gymSelect");
      const stateSelect = document.querySelector("#stateSelect");
      let paymentFrequency = u3(
        document.querySelector(`option[value="${gymSelect.value}"]`)?.dataset.paymentFrequency
      );
      const paymentFrequencyInput = document.querySelector("#paymentFrequency");
      if (paymentFrequencyInput) {
        b2(
          () => paymentFrequencyInput.value = paymentFrequency.value ?? "Monthly"
        );
      }
      gymSelect.addEventListener("change", (e4) => {
        const selected = document.querySelector(
          `option[value="${e4.target.value}"]`
        );
        paymentFrequency.value = selected.dataset.paymentFrequency;
        document.querySelector("#state").value = selected.dataset.state;
        this.handleLevelTwoCampaign(selected);
      });
      stateSelect?.addEventListener("change", async (e4) => {
        await this.wait(100);
        const selected = gymSelect.options[gymSelect.selectedIndex];
        paymentFrequency.value = selected.dataset.paymentFrequency;
      });
    }
    updateCardSurchargeTerms() {
      const gymSelect = document.querySelector("#gymSelect");
      const stateSelect = document.querySelector("#stateSelect");
      if (!gymSelect || !stateSelect) {
        return;
      }
      const paymentFrequency = u3(
        document.querySelector(`option[value="${gymSelect.value}"]`)?.dataset.paymentFrequency
      );
      const toggleSurchargeText = () => {
        const gym = document.querySelector("#gymSelect").selectedOptions[0];
        const monthly = document.querySelectorAll("[data-monthly-surcharge]");
        const fortnightly = document.querySelectorAll(
          "[data-fortnightly-surcharge]"
        );
        const levelThree = document.querySelectorAll(
          "[data-level-three-surcharge]"
        );
        if (gym.dataset.hasLevelThree === "true") {
          monthly.forEach((item) => item.classList.add("hidden"));
          fortnightly.forEach((item) => item.classList.add("hidden"));
          levelThree.forEach((item) => item.classList.remove("hidden"));
        } else if (paymentFrequency.value === "monthly") {
          monthly.forEach((item) => item.classList.remove("hidden"));
          fortnightly.forEach((item) => item.classList.add("hidden"));
          levelThree.forEach((item) => item.classList.add("hidden"));
        } else {
          monthly.forEach((item) => item.classList.add("hidden"));
          fortnightly.forEach((item) => item.classList.remove("hidden"));
          levelThree.forEach((item) => item.classList.add("hidden"));
        }
      };
      gymSelect.addEventListener("change", (e4) => {
        const selected = document.querySelector(
          `option[value="${e4.target.value}"]`
        );
        paymentFrequency.value = selected.dataset.paymentFrequency;
        toggleSurchargeText();
        this.addPresaleDiscount(selected);
        this.setPossibleSignUpDates(selected.dataset.postId);
        if (selected.classList.contains("is-presale") && window.location.href.includes("join-now")) {
          const gymUrl = selected.getAttribute("data-url");
          const allowUnder18 = selected.getAttribute("data-allow-youths");
          if (allowUnder18) {
            return window.location.href = `${gymUrl}?under-18=true`;
          }
          window.location.href = gymUrl;
        }
      });
      stateSelect.addEventListener("change", (e4) => {
        const selected = document.querySelector("#gymSelect > option");
        paymentFrequency.value = selected.dataset.paymentFrequency;
        toggleSurchargeText();
      });
    }
    setPossibleSignUpDates(id) {
      jQuery.ajax({
        type: "get",
        dataType: "json",
        url: sd_ajax.ajax_url,
        data: {
          action: "get_possible_start_dates",
          id
        },
        success: (data) => {
          const select = document.querySelector("[data-start-date]");
          if (!select) {
            return;
          }
          select.innerHTML = "";
          data.forEach((date) => {
            const option = document.createElement("option");
            option.value = date;
            option.textContent = date;
            select.appendChild(option);
          });
          select.selected = select.options[0];
          this.updateStartDate();
        }
      });
    }
    addPresaleDiscount(element) {
      const discountInput = document.querySelector("#discountCode");
      const checkDiscountButton = document.querySelector("[data-check-discount]");
      const code = element.dataset.presaleCode;
      const isPresale = element.classList.contains("is-presale");
      const isFiveWeekMembership = document.querySelector(
        "[data-five-week-membership]"
      );
      const isSpecialCircumstances = document.querySelector(
        "[data-special-circumstances]"
      );
      const gymSelect = document.querySelector("#gymSelect").value;
      const priceToggles = document.querySelectorAll("[data-price-toggle]");
      if (!discountInput) {
        return;
      }
      if (!code || !isPresale || isFiveWeekMembership || isSpecialCircumstances) {
        discountInput.value = "";
        discountInput.removeAttribute("readonly");
        if (checkDiscountButton) {
          checkDiscountButton.style.display = "block";
        }
        return;
      }
      discountInput.value = code;
      discountInput.setAttribute("readonly", "readonly");
      if (!document.querySelector(".single-gyms") && !document.querySelector(".page-join-now") && gymSelect == "Beverley") {
        priceToggles.forEach((toggle) => {
          toggle.addEventListener("click", () => {
            if (toggle.querySelector("input").value == "level-1") {
              discountInput.value = "";
              discountInput.removeAttribute("readonly");
              checkDiscountButton.style.display = "block";
            } else {
              discountInput.value = code;
              discountInput.setAttribute("readonly", "readonly");
              checkDiscountButton.style.display = "none";
            }
          });
        });
      }
      if (checkDiscountButton) {
        checkDiscountButton.style.display = "none";
      }
    }
    /**
     * @returns {Date} Min required date for the user to be 18 years old
     */
    minDateToBeAdult() {
      const isAllowedToBeUnder18 = window.location.href.includes("in-club-registration-minor") || window.location.href.includes("guest-sign-up") || window.location.href.includes("?under-18=true");
      const today = /* @__PURE__ */ new Date();
      const age = isAllowedToBeUnder18 ? 14 : 18;
      const ageText = document.querySelector("[data-age]");
      ageText.textContent = age;
      return new Date(
        today.getFullYear() - age,
        today.getMonth(),
        today.getDate()
      );
    }
    /**
     * Toggle the payment type that is being displayed
     */
    togglePaymentTypes() {
      const paymentTypes = document.querySelectorAll('[name="paymentType"]');
      const paymentFields = document.querySelectorAll("[data-payment-type]");
      paymentTypes.forEach((type) => {
        type.addEventListener("click", (e4) => {
          const value = e4.target.value;
          paymentFields.forEach(
            (field) => field.getAttribute("data-payment-type") === value ? field.classList.remove("hidden") : field.classList.add("hidden")
          );
          const surchargeTerm = document.querySelector('[for="cardSurcharge"]');
          value === "direct-debit" ? surchargeTerm.classList.add("hidden") : surchargeTerm.classList.remove("hidden");
        });
      });
    }
    /**
     * Update the start date in the membership placeholder when the user changes their start date
     */
    updateStartDate() {
      const placeholderStartDates = document.querySelectorAll(
        "[data-start-date-placeholder]"
      );
      const startDateSelect = document.querySelector("[data-start-date]");
      if (!startDateSelect) {
        return;
      }
      const startDate = u3(startDateSelect.value);
      placeholderStartDates.forEach(
        (placeholder) => b2(() => placeholder.textContent = startDate.value)
      );
      startDateSelect.addEventListener(
        "change",
        (e4) => startDate.value = e4.target.value
      );
    }
    /**
     * Validate the user-entered promo code
     */
    validatePromoCode() {
      const discountCode = document.querySelector("#discountCode");
      const validateButton = document.querySelector("[data-check-discount]");
      if (!discountCode) {
        return;
      }
      if (discountCode.hasAttribute("readonly")) {
        return;
      }
      if (discountCode.value !== "") {
        this.ajaxValidatePromoCode(discountCode);
      }
      validateButton?.addEventListener(
        "click",
        () => this.ajaxValidatePromoCode(discountCode)
      );
    }
    ajaxValidatePromoCode(discountCode) {
      const validateText = document.querySelector("[data-promo-validation]");
      if (!validateText) {
        return;
      }
      const discountSummary = document.querySelector("[data-discount-summary]");
      const discountDetail = document.querySelector("[data-discount-detail]");
      const firstPayment = document.querySelector("[data-first-payment]");
      const firstPrice = document.querySelector("[data-first-price]");
      const validity = u3("");
      const discount = u3("");
      const first = u3("");
      const value = discountCode.value;
      const gym = document.querySelector("#gymSelect")?.value ?? "HIITFIT ON DEMAND";
      b2(() => validateText.textContent = validity);
      b2(() => discountDetail.textContent = discount);
      b2(() => firstPrice.textContent = first);
      jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: "/wp-admin/admin-ajax.php",
        data: {
          action: "validate_discount",
          security: ajax.nonce,
          code: value,
          gym
        },
        success: ({ data }) => {
          const { voucher } = data;
          if (data.voucher.free_level_two) {
            document.querySelector('[name="discountCodeType"]').value = "free_level_two";
            return this.setRevoCBADiscount(
              voucher,
              discountSummary,
              discount,
              validity,
              first
            );
          }
          discountSummary.style.display = null;
          firstPayment.style.display = null;
          firstPrice.parentElement.style.display = null;
          discount.value = voucher.description;
          validity.value = "";
          first.value = this.getFirstPaymentText(voucher);
        },
        error: (error) => {
          discountSummary.style.display = "none";
          firstPayment.style.display = "none";
          firstPrice.parentElement.style.display = "none";
          validity.value = error.responseJSON.data;
        }
      });
    }
    setRevoCBADiscount(voucher, discountSummary, discount, validity, first) {
      const price = document.querySelector("[data-price]");
      const membershipTypes = document.querySelectorAll(
        "[data-price-toggle] > input"
      );
      const gyms = document.querySelector("#gymSelect");
      const levelOnePrice = gyms?.options[gyms.selectedIndex].getAttribute("data-level-one");
      const levelTwo = Array.from(membershipTypes).find(
        (type) => type.value === "level-2"
      );
      levelTwo.click();
      discountSummary.style.display = null;
      discount.value = voucher.description;
      validity.value = "";
      function setPrice() {
        const isCardPaymentSelected = document.querySelector(
          '[data-payment-type="card"].isActive'
        ) ? true : false;
        first.value = Number(levelOnePrice).toFixed(2);
        price.textContent = Number(levelOnePrice).toFixed(2);
        if (isCardPaymentSelected) {
          first.value = (Number(levelOnePrice) + Number(2)).toFixed(2);
          price.textContent = (Number(levelOnePrice) + Number(2)).toFixed(2);
        }
      }
      setPrice();
      document.querySelectorAll("[data-payment-type]").forEach((item) => item.addEventListener("click", setPrice));
    }
    /**
     * Return the text to be displayed for the first payment
     *
     * @param {object} voucher
     * @returns {string} The text to be displayed for the first payment
     */
    getFirstPaymentText(voucher) {
      const price = Number(document.querySelector("[data-price]").textContent);
      const amount = voucher.amount;
      const type = voucher.type;
      if (type === "percentage") {
        const discountedPrice = (price * (100 - amount) / 100).toFixed(2);
        return String(discountedPrice);
      }
      return price.toFixed(2);
    }
    /**
     * Show the additional card if the gym supports level 3 memberships
     */
    handleLevelThreeMembership() {
      const gymSelect = document.querySelector("#gymSelect");
      const stateSelect = document.querySelector("#stateSelect");
      if ((!gymSelect || !stateSelect) && gymSelect.selectedOptions[0].dataset.hasLevelThree === "false") {
        return;
      }
      this.toggleCardVisibility();
      gymSelect?.addEventListener("change", () => this.toggleCardVisibility());
      stateSelect?.addEventListener("change", () => this.toggleCardVisibility());
    }
    handleGymSelect() {
      const stateSelect = document.querySelector("#stateSelect");
      if (!stateSelect) {
        return;
      }
      stateSelect.addEventListener("change", (e4) => {
        const gymSelect = document.querySelector("#gymSelect");
        for (let index = 0; index < gymSelect.options.length; index++) {
          const gym = gymSelect.options[index];
          const activeState = e4.target.value;
          gym.getAttribute("data-state") === activeState || activeState === "All" ? gym.classList.remove("hidden") : gym.classList.add("hidden");
        }
        gymSelect.querySelector(
          'option[disabled][value="select-a-gym"]'
        ).selected = true;
        document.querySelector("#state").value = gymSelect.options[gymSelect.selectedIndex].dataset.state;
      });
    }
    async toggleCardVisibility() {
      await this.wait(100);
      const gymSelect = document.querySelector("#gymSelect");
      const levelThreeCard = document.querySelector("#levelThreeMembership");
      this.glenelgLevelThreePreselect(gymSelect.selectedOptions[0].value);
      if (gymSelect.selectedOptions[0].dataset.hasLevelThree === "true") {
        levelThreeCard?.classList.remove("hidden");
        return;
      }
      this.pittStLevelTwoOnly(gymSelect.selectedOptions[0].value);
      if (levelThreeCard) {
        levelThreeCard.classList.add("hidden");
      }
    }
    /**
     * Preselect Level 3 membership for Glenelg and make the card appear first
     */
    glenelgLevelThreePreselect(gym) {
      const levelThreeCard = document.querySelector("#levelThreeMembership");
      const levelThreeInput = levelThreeCard?.querySelector("input");
      const levelTwoInput = document.querySelector(
        '[name="membershipType"][value="level-2"]'
      );
      const mostPopularSticker = document.querySelector("#mostPopular");
      if (!levelThreeCard) {
        return;
      }
      if (gym === "Glenelg") {
        levelThreeCard.style.order = -1;
        levelThreeCard.classList.remove("hidden");
        mostPopularSticker.classList.add("hidden");
        levelThreeInput?.click();
        return;
      }
      mostPopularSticker.classList.remove("hidden");
      levelThreeCard.style.removeProperty("order");
      levelTwoInput?.click();
    }
    /**
     * Temporarily make Pitt St a level 2 only gym
     *
     * @param {string} gym Gym Name
     * @returns {void}
     */
    pittStLevelTwoOnly(gym) {
      const goLiveTime = /* @__PURE__ */ new Date("2024-09-02T12:00:00Z");
      const perthTimeOptions = { timeZone: "Australia/Perth", hour12: false };
      const perthTargetTime = new Intl.DateTimeFormat(
        "en-US",
        perthTimeOptions
      ).format(goLiveTime);
      const perthTargetDateTime = /* @__PURE__ */ new Date(`${perthTargetTime}`);
      const currentDateTime = /* @__PURE__ */ new Date();
      const perthCurrentTime = new Intl.DateTimeFormat(
        "en-US",
        perthTimeOptions
      ).format(currentDateTime);
      const perthCurrentDateTime = /* @__PURE__ */ new Date(`${perthCurrentTime}`);
      if (perthCurrentDateTime < perthTargetDateTime) {
        return;
      }
      const levelOneCard = document.querySelector('[name="membershipType"][value="level-1"]')?.closest("[data-price-toggle]");
      const levelTwoInput = document.querySelector(
        '[name="membershipType"][value="level-2"]'
      );
      if (gym === "Pitt St") {
        levelTwoInput?.click();
        levelOneCard?.classList.add("hidden");
      } else {
        levelOneCard?.classList.remove("hidden");
      }
    }
    handleOrientationModal() {
      if (!document.querySelector("[data-orientation-video-container]")) {
        return;
      }
      const openTrigger = document.querySelector("[data-open-modal]");
      const container = document.querySelector(
        "[data-orientation-video-container]"
      );
      const closeModal = () => {
        container.classList.add("hidden");
        document.documentElement.classList.remove("overflow-y-hidden");
        const homeVideo = document.querySelector("[data-orientation-video]");
        homeVideo.pause();
        homeVideo.currentTime = 0;
      };
      openTrigger.addEventListener("click", () => {
        container.classList.remove("hidden");
        document.documentElement.classList.add("overflow-y-hidden");
      });
      const closeTrigger = document.querySelector("[data-close-video]");
      closeTrigger.addEventListener("click", closeModal);
      document.addEventListener(
        "keydown",
        (e4) => e4.key === "Escape" && !container.classList.contains("hidden") ? closeModal() : null
      );
    }
    async handleLevelTwoCampaign(selectedGym = null) {
      const gymSelect = document.querySelector("#gymSelect");
      const selectedOption = selectedGym || gymSelect.selectedOptions[0];
      if (selectedOption && selectedOption.classList.contains("is-presale") && selectedOption.dataset.presaleCode) {
        return;
      }
      await this.wait(100);
      const discountInput = document.querySelector("[data-level-two-campaign]");
      const levelTwoCampaign = discountInput?.dataset?.levelTwoCampaign ? true : false;
      const startDate = discountInput?.dataset?.levelTwoCampaignStart ? discountInput?.dataset?.levelTwoCampaignStart : false;
      const endDate = discountInput?.dataset?.levelTwoCampaignEnd ? discountInput?.dataset?.levelTwoCampaignEnd : false;
      const priceToggles = document.querySelectorAll("[data-price-toggle]");
      const checkDiscountButton = document.querySelector("[data-check-discount]");
      const firstPrice = document.querySelector("[data-first-price]");
      const firstPayment = document.querySelector("[data-first-payment]");
      const discountSummary = document.querySelector("[data-discount-summary]");
      const isLevelTwoCampaign = selectedGym?.hasAttribute(
        "data-is-active-level-two-campaign"
      );
      if (!discountInput) {
        return;
      }
      if (!document.body.classList.contains("single-gyms") && !isLevelTwoCampaign) {
        discountInput.value = "";
        discountInput.removeAttribute("readonly");
        if (checkDiscountButton) {
          checkDiscountButton.style.display = "block";
        }
        if (discountSummary) {
          discountSummary.style.display = "none";
        }
        return;
      }
      if (!discountInput || !levelTwoCampaign) {
        return;
      }
      setDiscountCode();
      priceToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => setDiscountCode());
      });
      function setDiscountCode() {
        const gymSelect2 = document.querySelector("#gymSelect");
        const selectedGym2 = gymSelect2.selectedOptions[0];
        const isLevelTwoCampaign2 = selectedGym2?.hasAttribute(
          "data-is-active-level-two-campaign"
        );
        const activePrice = document.querySelector(
          '[name="membershipType"]:checked'
        );
        firstPrice.parentElement.style.display = "none";
        firstPayment.style.display = "none";
        if (activePrice.value === "level-1" || !document.body.classList.contains("single-gyms") && !isLevelTwoCampaign2) {
          discountInput.value = "";
          discountInput.removeAttribute("readonly");
          checkDiscountButton.style.display = "block";
          discountSummary.style.display = "none";
          return;
        }
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "");
        if (startDate > today || endDate < today || !startDate || !endDate) {
          if (discountInput.dataset.discountCode) {
            discountInput.value = discountInput.dataset.discountCode;
          } else {
            discountInput.value = selectedGym2.dataset.presaleCode;
          }
          discountInput.setAttribute("readonly", true);
          checkDiscountButton.style.display = "none";
          discountSummary.style.display = "flex";
          return;
        }
        discountInput.value = discountInput.dataset.discountCode;
        discountInput.setAttribute("readonly", true);
        checkDiscountButton.style.display = "none";
        discountSummary.style.display = "flex";
        document.querySelector("[data-promo-validation]").textContent = "";
      }
    }
    /**
     * Wait the specified amount of time before continuing
     *
     * @param {Number} amount
     * @returns {Promise}
     */
    wait(amount = 0) {
      return new Promise((resolve, reject) => {
        this.timerId = setTimeout(resolve, amount);
        this.cancelPromise = reject;
      });
    }
  };
  var SignUpForm_default = SignUpForm;

  // js/utils/add-child-event-listener.js
  function addListenerToChildElements(parentSelector, childSelector, handler) {
    if (typeof handler !== "function") {
      console.error("Handler must be a function");
      return;
    }
    const parent = document.querySelector(parentSelector);
    if (!parent) {
      console.error("Parent element not found");
      return;
    }
    parent.addEventListener("click", function(event2) {
      let element = event2.target;
      while (element && element !== parent) {
        if (element.matches(childSelector)) {
          handler.call(element, event2);
          return;
        }
        element = element.parentElement;
      }
    });
  }

  // Revo/js/accordion.js
  function setupAccordions() {
    const parentSelector = "[data-accordion-container]";
    if (!document.querySelector(parentSelector)) {
      return;
    }
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach((header) => {
      const isActive = header.classList.contains("active");
      const accordionContent = header.nextElementSibling;
      accordionContent.style.maxHeight = isActive ? accordionContent.scrollHeight + "px" : 0;
      header.addEventListener("click", toggleAccordion);
    });
    addListenerToChildElements(
      parentSelector,
      ".accordion-header",
      toggleAccordion
    );
  }
  function toggleAccordion(e4) {
    const header = this;
    const content = header.nextElementSibling;
    header.classList.toggle("active");
    if (header.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = 0;
    }
  }

  // node_modules/@googlemaps/js-api-loader/dist/index.esm.js
  function __awaiter(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e4) {
          reject(e4);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e4) {
          reject(e4);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  var fastDeepEqual = function equal(a4, b3) {
    if (a4 === b3)
      return true;
    if (a4 && b3 && typeof a4 == "object" && typeof b3 == "object") {
      if (a4.constructor !== b3.constructor)
        return false;
      var length, i4, keys;
      if (Array.isArray(a4)) {
        length = a4.length;
        if (length != b3.length)
          return false;
        for (i4 = length; i4-- !== 0; )
          if (!equal(a4[i4], b3[i4]))
            return false;
        return true;
      }
      if (a4.constructor === RegExp)
        return a4.source === b3.source && a4.flags === b3.flags;
      if (a4.valueOf !== Object.prototype.valueOf)
        return a4.valueOf() === b3.valueOf();
      if (a4.toString !== Object.prototype.toString)
        return a4.toString() === b3.toString();
      keys = Object.keys(a4);
      length = keys.length;
      if (length !== Object.keys(b3).length)
        return false;
      for (i4 = length; i4-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b3, keys[i4]))
          return false;
      for (i4 = length; i4-- !== 0; ) {
        var key = keys[i4];
        if (!equal(a4[key], b3[key]))
          return false;
      }
      return true;
    }
    return a4 !== a4 && b3 !== b3;
  };
  var DEFAULT_ID = "__googleMapsScriptId";
  var LoaderStatus;
  (function(LoaderStatus2) {
    LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
    LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
  })(LoaderStatus || (LoaderStatus = {}));
  var Loader = class _Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version }) {
      this.callbacks = [];
      this.done = false;
      this.loading = false;
      this.errors = [];
      this.apiKey = apiKey;
      this.authReferrerPolicy = authReferrerPolicy;
      this.channel = channel;
      this.client = client;
      this.id = id || DEFAULT_ID;
      this.language = language;
      this.libraries = libraries;
      this.mapIds = mapIds;
      this.nonce = nonce;
      this.region = region;
      this.retries = retries;
      this.url = url;
      this.version = version;
      if (_Loader.instance) {
        if (!fastDeepEqual(this.options, _Loader.instance.options)) {
          throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(_Loader.instance.options)}`);
        }
        return _Loader.instance;
      }
      _Loader.instance = this;
    }
    get options() {
      return {
        version: this.version,
        apiKey: this.apiKey,
        channel: this.channel,
        client: this.client,
        id: this.id,
        libraries: this.libraries,
        language: this.language,
        region: this.region,
        mapIds: this.mapIds,
        nonce: this.nonce,
        url: this.url,
        authReferrerPolicy: this.authReferrerPolicy
      };
    }
    get status() {
      if (this.errors.length) {
        return LoaderStatus.FAILURE;
      }
      if (this.done) {
        return LoaderStatus.SUCCESS;
      }
      if (this.loading) {
        return LoaderStatus.LOADING;
      }
      return LoaderStatus.INITIALIZED;
    }
    get failed() {
      return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     * @deprecated
     */
    createUrl() {
      let url = this.url;
      url += `?callback=__googleMapsCallback`;
      if (this.apiKey) {
        url += `&key=${this.apiKey}`;
      }
      if (this.channel) {
        url += `&channel=${this.channel}`;
      }
      if (this.client) {
        url += `&client=${this.client}`;
      }
      if (this.libraries.length > 0) {
        url += `&libraries=${this.libraries.join(",")}`;
      }
      if (this.language) {
        url += `&language=${this.language}`;
      }
      if (this.region) {
        url += `&region=${this.region}`;
      }
      if (this.version) {
        url += `&v=${this.version}`;
      }
      if (this.mapIds) {
        url += `&map_ids=${this.mapIds.join(",")}`;
      }
      if (this.authReferrerPolicy) {
        url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
      }
      return url;
    }
    deleteScript() {
      const script = document.getElementById(this.id);
      if (script) {
        script.remove();
      }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     * @deprecated, use importLibrary() instead.
     */
    load() {
      return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     * @deprecated, use importLibrary() instead.
     */
    loadPromise() {
      return new Promise((resolve, reject) => {
        this.loadCallback((err) => {
          if (!err) {
            resolve(window.google);
          } else {
            reject(err.error);
          }
        });
      });
    }
    importLibrary(name) {
      this.execute();
      return google.maps.importLibrary(name);
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     * @deprecated, use importLibrary() instead.
     */
    loadCallback(fn) {
      this.callbacks.push(fn);
      this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
      var _a, _b;
      if (document.getElementById(this.id)) {
        this.callback();
        return;
      }
      const params = {
        key: this.apiKey,
        channel: this.channel,
        client: this.client,
        libraries: this.libraries,
        v: this.version,
        mapIds: this.mapIds,
        language: this.language,
        region: this.region,
        authReferrerPolicy: this.authReferrerPolicy
      };
      Object.keys(params).forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key) => !params[key] && delete params[key]
      );
      if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
        ((g3) => {
          let h4, a4, k3, p4 = "The Google Maps JavaScript API", c5 = "google", l5 = "importLibrary", q3 = "__ib__", m2 = document, b3 = window;
          b3 = b3[c5] || (b3[c5] = {});
          const d5 = b3.maps || (b3.maps = {}), r4 = /* @__PURE__ */ new Set(), e4 = new URLSearchParams(), u4 = () => (
            // @ts-ignore
            h4 || (h4 = new Promise((f4, n3) => __awaiter(this, void 0, void 0, function* () {
              var _a2;
              yield a4 = m2.createElement("script");
              a4.id = this.id;
              e4.set("libraries", [...r4] + "");
              for (k3 in g3)
                e4.set(k3.replace(/[A-Z]/g, (t4) => "_" + t4[0].toLowerCase()), g3[k3]);
              e4.set("callback", c5 + ".maps." + q3);
              a4.src = this.url + `?` + e4;
              d5[q3] = f4;
              a4.onerror = () => h4 = n3(Error(p4 + " could not load."));
              a4.nonce = this.nonce || ((_a2 = m2.querySelector("script[nonce]")) === null || _a2 === void 0 ? void 0 : _a2.nonce) || "";
              m2.head.append(a4);
            })))
          );
          d5[l5] ? console.warn(p4 + " only loads once. Ignoring:", g3) : d5[l5] = (f4, ...n3) => r4.add(f4) && u4().then(() => d5[l5](f4, ...n3));
        })(params);
      }
      this.importLibrary("core").then(() => this.callback(), (error) => {
        const event2 = new ErrorEvent("error", { error });
        this.loadErrorCallback(event2);
      });
    }
    /**
     * Reset the loader state.
     */
    reset() {
      this.deleteScript();
      this.done = false;
      this.loading = false;
      this.errors = [];
      this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
      if (this.failed) {
        this.reset();
      }
    }
    loadErrorCallback(e4) {
      this.errors.push(e4);
      if (this.errors.length <= this.retries) {
        const delay = this.errors.length * Math.pow(2, this.errors.length);
        console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
        setTimeout(() => {
          this.deleteScript();
          this.setScript();
        }, delay);
      } else {
        this.onerrorEvent = e4;
        this.callback();
      }
    }
    callback() {
      this.done = true;
      this.loading = false;
      this.callbacks.forEach((cb) => {
        cb(this.onerrorEvent);
      });
      this.callbacks = [];
    }
    execute() {
      this.resetIfRetryingFailed();
      if (this.done) {
        this.callback();
      } else {
        if (window.google && window.google.maps && window.google.maps.version) {
          console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match.");
          this.callback();
          return;
        }
        if (this.loading)
          ;
        else {
          this.loading = true;
          this.setScript();
        }
      }
    }
  };

  // Revo/js/gym-map.js
  async function initializeMap() {
    const loader = new Loader({
      apiKey: "AIzaSyD_d1JOhjTigBNWCsSCuhjyqmDeyBEinoU",
      version: "weekly",
      libraries: ["places"]
    });
    try {
      await loader.importLibrary("core");
      const { Map } = await google.maps.importLibrary("maps");
      const { Autocomplete } = await google.maps.importLibrary("places");
      window.map = new Map(document.getElementById("gymMap"), getMapOptions());
      document.querySelector('[data-state-buttons] [data-state="All"].isActive') ? window.map.setZoom(4) : null;
      window.geocoder = new google.maps.Geocoder();
      const input = document.querySelector("#addressAutocomplete");
      const options = {
        types: ["postal_code", "locality"],
        componentRestrictions: { country: "AU" },
        fields: ["address_components", "formatted_address"]
      };
      window.autocomplete = new Autocomplete(input, options);
      return window.map;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  function initializeGymMap() {
    if (!document.querySelector("#gymMap")) {
      return;
    }
    initializeMap().then(async () => {
      const { latitude, longitude } = await getLocationFromIP();
      const { gyms, markers } = await addGymsToMap();
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        arialLabel: ""
      });
      window.infoWindow = infoWindow;
      window.markers = markers;
      window.map.setCenter({ lat: latitude, lng: longitude });
      setupInfoWindows(infoWindow, markers);
      setupCardToMarkerAssociation();
      setupToggleState();
      setupAutocomplete();
      setupClearInput();
    }).catch((error) => {
      console.error("Failed to initialize map:", error);
    });
  }
  async function getLocationFromIP() {
    const storageKey = "userLocation";
    let location = localStorage.getItem(storageKey);
    if (location) {
      location = JSON.parse(location);
      if (!location.storedDate) {
        localStorage.removeItem(storageKey);
        location = null;
      }
    }
    if (location) {
      return location;
    }
    const response = await fetch(ajax.ajax_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        action: "get_user_location"
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    let { state, latitude, longitude } = data;
    latitude = Number(latitude);
    longitude = Number(longitude);
    const today = /* @__PURE__ */ new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;
    const locationData = {
      state,
      latitude,
      longitude,
      storedDate: formattedDate
      // Store the current date in Australian format
    };
    localStorage.setItem(storageKey, JSON.stringify(locationData));
    return locationData;
  }
  async function addGymsToMap() {
    const response = await fetch(ajax.ajax_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        action: "get_gyms"
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data: gyms } = await response.json();
    const markers = [];
    gyms.forEach((gym) => {
      const { latitude, longitude } = gym.fields;
      if (!latitude && !longitude) {
        return;
      }
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        },
        map: window.map,
        title: gym.post_title,
        icon: {
          anchor: new google.maps.Point(14, 36),
          // Change anchor to center the icon at the location
          url: 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="27.67" height="36.893" viewBox="0 0 27.67 36.893"><g><path fill="%23cb333b" d="M13.835 0A13.853 13.853 0 0 0 0 13.835c0 9.932 12.89 22.372 13.437 22.9a.571.571 0 0 0 .8 0c.548-.525 13.437-12.964 13.437-22.9A13.853 13.853 0 0 0 13.835 0Z" data-name="Path 5042"/><path fill="%23fff" d="M19.281 18.447h-3.913l-2.392-3.571h-1.27v3.572H8.391v-2.312l3.142-4.289h2.23c.923 0 1.452-.419 1.452-1.149v-.032c0-.688-.384-1.063-1.176-1.148l-.742-.079 2.1-2.863.288.084a3.806 3.806 0 0 1 2.877 3.88v.036a3.856 3.856 0 0 1-2.171 3.642Z" data-name="Path 5043"/></g></svg>'
        }
      });
      markers.push(marker);
    });
    return { gyms, markers };
  }
  function setupInfoWindows(infoWindow, markers) {
    markers.forEach(
      (marker) => google.maps.event.addListener(
        marker,
        "click",
        () => openInfoWindow(infoWindow, marker)
      )
    );
  }
  function openInfoWindow(infoWindow, marker) {
    const content = document.querySelector(
      `[data-info-window="${marker.title}"]`
    ).outerHTML;
    infoWindow.setContent(content);
    infoWindow.open({
      anchor: marker,
      map: window.map
    });
  }
  function setupCardToMarkerAssociation() {
    const gymCards = document.querySelectorAll("[data-gym-cards] [data-gym]");
    gymCards.forEach((card) => {
      const mapToggleButton = card.querySelector("[data-map-toggle-button]");
      mapToggleButton.addEventListener(
        "click",
        (e4) => toggleMarkerActiveState(e4, window.infoWindow, window.markers)
      );
    });
  }
  function toggleMarkerActiveState(e4, infoWindow, markers) {
    const gym = e4.target.closest("[data-gym") ?? e4.target;
    const gymCards = document.querySelectorAll("[data-gym]");
    const gymMarker = markers.filter(
      (m2) => m2.title === gym.getAttribute("data-gym")
    )?.[0];
    gymCards.forEach((gym2) => gym2.classList.remove("isActive"));
    gym.classList.add("isActive");
    if (!gymMarker.position.lat() || !gymMarker.position.lng()) {
      return;
    }
    openInfoWindow(infoWindow, gymMarker);
  }
  function setupToggleState() {
    const stateButtons = document.querySelectorAll(
      "[data-state-buttons] [data-state]"
    );
    const controlsContainer = document.querySelector("[data-controls]");
    const cardsContainer = document.querySelector("[data-gym-cards]");
    stateButtons.forEach((button) => {
      button.addEventListener("click", (e4) => {
        const state = e4.target.dataset.state;
        if (e4.target.classList.contains("isActive")) {
          return;
        }
        updateGymsWhereState(state);
        stateButtons.forEach((state2) => state2.classList.remove("isActive"));
        e4.target.classList.add("isActive");
        if (controlsContainer) {
          controlsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        if (cardsContainer) {
          cardsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      });
    });
  }
  function updateGymsWhereState(activeState, setCenter = true) {
    const controlsContainer = document.querySelector("[data-controls]");
    const cardsContainer = document.querySelector("[data-gym-cards]");
    cardsContainer.querySelectorAll("[data-gym]").forEach((gym) => {
      const state = gym.getAttribute("data-state");
      state === activeState || activeState === "All" ? gym.classList.remove("!hidden") : gym.classList.add("!hidden");
    });
    const center = getLocationByState(activeState);
    const { latitude, longitude } = center;
    if (setCenter) {
      window.map.setCenter({ lat: latitude, lng: longitude });
    }
    if (activeState === "All") {
      window.map.setZoom(4);
      return;
    }
    window.map.setZoom(10);
    if (controlsContainer) {
      controlsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (cardsContainer) {
      cardsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
  async function updateGymsByClosestToUser(state, latitude, longitude) {
    const controlsContainer = document.querySelector("[data-controls]");
    const cardsContainer = document.querySelector("[data-gym-cards]");
    const response = await fetch(ajax.ajax_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        action: "get_gyms_by_closest",
        state,
        latitude,
        longitude
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const {
      data: { html, closest }
    } = await response.json();
    cardsContainer.innerHTML = html;
    setupCardToMarkerAssociation();
    window.markers.forEach((marker) => {
      if (marker.title === closest.post_title) {
        window.map.setCenter(marker.position);
        window.map.setZoom(11);
        openInfoWindow(window.infoWindow, marker);
      }
    });
    if (controlsContainer) {
      controlsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (cardsContainer) {
      cardsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
  function getLocationByState(state) {
    const data = getLocationObject(state);
    let { city, latitude, longitude } = data;
    latitude = Number(latitude);
    longitude = Number(longitude);
    return { city, latitude, longitude };
  }
  function setupAutocomplete() {
    google.maps.event.addListener(
      window.autocomplete,
      "place_changed",
      () => updateMapWithAutocomplete(autocomplete)
    );
  }
  function updateMapWithAutocomplete(autocomplete2) {
    const place = autocomplete2.getPlace();
    const container = document.querySelector("[data-gym-cards]");
    if (!place.formatted_address) {
      return;
    }
    const address = document.querySelector("#addressAutocomplete").value;
    geocoder.geocode({ address }, (results, status) => {
      if (status !== "OK") {
        return;
      }
      if (this.marker) {
        this.marker.setMap(null);
      }
      const result = results[0];
      const state = result.address_components.filter(
        (address2) => address2.types.includes("administrative_area_level_1")
      )[0].short_name;
      const latitude = result.geometry.location.lat();
      const longitude = result.geometry.location.lng();
      const stateButtons = document.querySelectorAll(
        "[data-state-buttons] [data-state]"
      );
      updateGymsByClosestToUser(state, latitude, longitude);
      stateButtons.forEach(
        (button) => button.textContent === state ? button.classList.add("isActive") : button.classList.remove("isActive")
      );
      map.setCenter(result.geometry.location);
      this.marker = new google.maps.Marker({
        map: window.map,
        position: result.geometry.location
      });
    });
  }
  function getLocationObject(state) {
    const city = getCapitalCityByState(convertStateName(state));
    const latLng = getLatLongByCity(city);
    return {
      city,
      latitude: latLng[0],
      longitude: latLng[1]
    };
  }
  function convertStateName(name) {
    const states = {
      All: "All",
      NSW: "New South Wales",
      VIC: "Victoria",
      // QLD: 'Queensland',
      SA: "South Australia",
      WA: "Western Australia"
      // TAS: 'Tasmania',
      // NT: 'Northern Territory',
    };
    if (states[name]) {
      return states[name];
    } else {
      const reversedStates = Object.keys(states).reduce((obj, key) => {
        obj[states[key]] = key;
        return obj;
      }, {});
      return reversedStates[name];
    }
  }
  function getCapitalCityByState(state) {
    const australianStatesCapitals = {
      All: "All",
      "New South Wales": "Sydney",
      Victoria: "Melbourne",
      // Queensland: 'Brisbane',
      "South Australia": "Adelaide",
      "Western Australia": "Perth"
      // Tasmania: 'Hobart',
      // 'Northern Territory': 'Darwin',
    };
    return australianStatesCapitals[state] || "All";
  }
  function getLatLongByCity(city) {
    const citiesLatLong = {
      All: ["-25.274400", "133.775100"],
      Perth: ["-31.953512", "115.857048"],
      Sydney: ["-33.868820", "151.209290"],
      Melbourne: ["-37.813610", "144.963100"],
      // Brisbane: ['-27.469770', '153.025131'],
      Adelaide: ["-34.928490", "138.600740"]
      // Hobart: ['-42.882140', '147.327200'],
      // Canberra: ['-35.280937', '149.130009'],
      // Darwin: ['-12.463440', '130.845642'],
    };
    return citiesLatLong[city] || citiesLatLong["All"];
  }
  function setupClearInput() {
    const autocomplete2 = document.getElementById("addressAutocomplete");
    const reset = document.getElementById("resetAddressAutocomplete");
    const controlsContainer = document.querySelector("[data-controls]");
    const cardsContainer = document.querySelector("[data-gym-cards]");
    reset.addEventListener("click", async () => {
      if (autocomplete2.value === "") {
        return;
      }
      const state = document.querySelector("[data-state-buttons] [data-state].isActive")?.getAttribute("data-state") ?? "All";
      window.infoWindow.close();
      autocomplete2.value = "";
      updateGymsWhereState(state);
      const gyms = document.querySelectorAll("[data-gym-cards] [data-gym]");
      const sortedGyms = Array.from(gyms).sort((a4, b3) => {
        const nameA = a4.getAttribute("data-gym").toLowerCase();
        const nameB = b3.getAttribute("data-gym").toLowerCase();
        return nameA.localeCompare(nameB);
      });
      sortedGyms.forEach((item, index) => {
        item.style.order = index;
      });
      if (controlsContainer) {
        controlsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      if (cardsContainer) {
        cardsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    });
  }
  function getMapOptions() {
    return {
      zoom: 10,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: [
        {
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "landscape.man_made",
          stylers: [
            {
              color: "#eae7e1"
            }
          ]
        },
        {
          featureType: "landscape.man_made",
          elementType: "labels.icon",
          stylers: [
            {
              color: "#fcf9f1"
            }
          ]
        },
        {
          featureType: "poi.park",
          stylers: [
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#71ca82"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#357e58"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#fed133"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#6acff6"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text",
          stylers: [
            {
              color: "#0074bc"
            }
          ]
        }
      ]
    };
  }

  // node_modules/swiper/shared/ssr-window.esm.mjs
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend(target, src) {
    if (target === void 0) {
      target = {};
    }
    if (src === void 0) {
      src = {};
    }
    Object.keys(src).forEach((key) => {
      if (typeof target[key] === "undefined")
        target[key] = src[key];
      else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener() {
    },
    removeEventListener() {
    },
    activeElement: {
      blur() {
      },
      nodeName: ""
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {
        }
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {
      },
      pushState() {
      },
      go() {
      },
      back() {
      }
    },
    CustomEvent: function CustomEvent2() {
      return this;
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        }
      };
    },
    Image() {
    },
    Date() {
    },
    screen: {},
    setTimeout() {
    },
    clearTimeout() {
    },
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    }
  };
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  // node_modules/swiper/shared/utils.mjs
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e4) {
      }
      try {
        delete object[key];
      } catch (e4) {
      }
    });
  }
  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a4) => a4.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      else
        curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject2(o4) {
    return typeof o4 === "object" && o4 !== null && o4.constructor && Object.prototype.toString.call(o4).slice(8, -1) === "Object";
  }
  function isNode(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend2() {
    const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i4 = 1; i4 < arguments.length; i4 += 1) {
      const nextSource = i4 < 0 || arguments.length <= i4 ? void 0 : arguments[i4];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll(_ref) {
    let {
      swiper,
      targetPosition,
      side
    } = _ref;
    const window2 = getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = (/* @__PURE__ */ new Date()).getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }
      swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }
  function getSlideTransformEl(slideEl) {
    return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
  }
  function elementChildren(element, selector) {
    if (selector === void 0) {
      selector = "";
    }
    return [...element.children].filter((el) => el.matches(selector));
  }
  function createElement(tag, classes2) {
    if (classes2 === void 0) {
      classes2 = [];
    }
    const el = document.createElement(tag);
    el.classList.add(...Array.isArray(classes2) ? classes2 : [classes2]);
    return el;
  }
  function elementOffset(el) {
    const window2 = getWindow();
    const document2 = getDocument();
    const box = el.getBoundingClientRect();
    const body = document2.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window2 ? window2.scrollY : el.scrollTop;
    const scrollLeft = el === window2 ? window2.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }
  function elementPrevAll(el, selector) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if (prev.matches(selector))
          prevEls.push(prev);
      } else
        prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if (next.matches(selector))
          nextEls.push(next);
      } else
        nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window2 = getWindow();
    return window2.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function elementIndex(el) {
    let child = el;
    let i4;
    if (child) {
      i4 = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1)
          i4 += 1;
      }
      return i4;
    }
    return void 0;
  }
  function elementParents(el, selector) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector) {
        if (parent.matches(selector))
          parents.push(parent);
      } else {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementTransitionEnd(el, callback) {
    function fireCallBack(e4) {
      if (e4.target !== el)
        return;
      callback.call(el, e4);
      el.removeEventListener("transitionend", fireCallBack);
    }
    if (callback) {
      el.addEventListener("transitionend", fireCallBack);
    }
  }
  function elementOuterSize(el, size, includeMargins) {
    const window2 = getWindow();
    if (includeMargins) {
      return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
    }
    return el.offsetWidth;
  }

  // node_modules/swiper/shared/swiper-core.mjs
  var support;
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }
  var deviceCached;
  function calcDevice(_temp) {
    let {
      userAgent
    } = _temp === void 0 ? {} : _temp;
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad)
        ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }
  var browser;
  function calcBrowser() {
    const window2 = getWindow();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    if (isSafari()) {
      const ua = String(window2.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }
    return {
      isSafari: needPerspectiveFix || isSafari(),
      needPerspectiveFix,
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }
  function Resize(_ref) {
    let {
      swiper,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries.forEach((_ref2) => {
            let {
              contentBoxSize,
              contentRect,
              target
            } = _ref2;
            if (target && target !== swiper.el)
              return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("orientationchange");
    };
    on("init", () => {
      if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const observers = [];
    const window2 = getWindow();
    const attach = function(target, options) {
      if (options === void 0) {
        options = {};
      }
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper.__preventObserver__)
          return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: typeof options.childList === "undefined" ? true : options.childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper.params.observer)
        return;
      if (swiper.params.observeParents) {
        const containerParents = elementParents(swiper.el);
        for (let i4 = 0; i4 < containerParents.length; i4 += 1) {
          attach(containerParents[i4]);
        }
      }
      attach(swiper.el, {
        childList: swiper.params.observeSlideChildren
      });
      attach(swiper.wrapperEl, {
        attributes: false
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on("init", init);
    on("destroy", destroy);
  }
  var eventsEmitter = {
    on(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      events2.split(" ").forEach((event2) => {
        if (!self.eventsListeners[event2])
          self.eventsListeners[event2] = [];
        self.eventsListeners[event2][method](handler);
      });
      return self;
    },
    once(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      function onceHandler() {
        self.off(events2, onceHandler);
        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        handler.apply(self, args);
      }
      onceHandler.__emitterProxy = handler;
      return self.on(events2, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }
      return self;
    },
    offAny(handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsAnyListeners)
        return self;
      const index = self.eventsAnyListeners.indexOf(handler);
      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }
      return self;
    },
    off(events2, handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      events2.split(" ").forEach((event2) => {
        if (typeof handler === "undefined") {
          self.eventsListeners[event2] = [];
        } else if (self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler, index) => {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event2].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit() {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      let events2;
      let data;
      let context;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events2 = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events2 = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      data.unshift(context);
      const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
      eventsArray.forEach((event2) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event2, ...data]);
          });
        }
        if (self.eventsListeners && self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }
  };
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const el = swiper.el;
    if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = el.clientWidth;
    }
    if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
      height = swiper.params.height;
    } else {
      height = el.clientHeight;
    }
    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    }
    width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
    height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width))
      width = 0;
    if (Number.isNaN(height))
      height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height
    });
  }
  function updateSlides() {
    const swiper = this;
    function getDirectionLabel(property) {
      if (swiper.isHorizontal()) {
        return property;
      }
      return {
        "width": "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        "marginRight": "marginBottom"
      }[property];
    }
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
    }
    const params = swiper.params;
    const {
      wrapperEl,
      slidesEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
    const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }
    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    swiper.virtualSize = -spaceBetween;
    slides.forEach((slideEl) => {
      if (rtl) {
        slideEl.style.marginLeft = "";
      } else {
        slideEl.style.marginRight = "";
      }
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
    if (gridEnabled) {
      swiper.grid.initSlides(slidesLength);
    }
    let slideSize;
    const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i4 = 0; i4 < slidesLength; i4 += 1) {
      slideSize = 0;
      let slide2;
      if (slides[i4])
        slide2 = slides[i4];
      if (gridEnabled) {
        swiper.grid.updateSlide(i4, slide2, slidesLength, getDirectionLabel);
      }
      if (slides[i4] && elementStyle(slide2, "display") === "none")
        continue;
      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i4].style[getDirectionLabel("width")] = ``;
        }
        const slideStyles = getComputedStyle(slide2);
        const currentTransform = slide2.style.transform;
        const currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform) {
          slide2.style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = "none";
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide2.style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
        if (slides[i4]) {
          slides[i4].style[getDirectionLabel("width")] = `${slideSize}px`;
        }
      }
      if (slides[i4]) {
        slides[i4].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i4 !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i4 === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3)
          slidePosition = 0;
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
      wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (params.setWrapperSize) {
      wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
    }
    if (!params.centeredSlides) {
      const newSlidesGrid = [];
      for (let i4 = 0; i4 < snapGrid.length; i4 += 1) {
        let slidesGridItem = snapGrid[i4];
        if (params.roundLengths)
          slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i4] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (isVirtual && params.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params.slidesPerGroup > 1) {
        const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
        const groupSize = size * params.slidesPerGroup;
        for (let i4 = 0; i4 < groups; i4 += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }
      for (let i4 = 0; i4 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i4 += 1) {
        if (params.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper.virtualSize += size;
      }
    }
    if (snapGrid.length === 0)
      snapGrid = [0];
    if (spaceBetween !== 0) {
      const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
      slides.filter((_3, slideIndex) => {
        if (!params.cssMode || params.loop)
          return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).forEach((slideEl) => {
        slideEl.style[key] = `${spaceBetween}px`;
      });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map((snap) => {
        if (snap <= 0)
          return -offsetBefore;
        if (snap > maxSnap)
          return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v5) => v5 + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v5) => v5 + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow)
        swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.el.classList.remove(backFaceHiddenClass);
      }
    }
  }
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i4;
    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper.slides[swiper.getSlideIndexByData(index)];
      }
      return swiper.slides[index];
    };
    if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        (swiper.visibleSlides || []).forEach((slide2) => {
          activeSlides.push(slide2);
        });
      } else {
        for (i4 = 0; i4 < Math.ceil(swiper.params.slidesPerView); i4 += 1) {
          const index = swiper.activeIndex + i4;
          if (index > swiper.slides.length && !isVirtual)
            break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    }
    for (i4 = 0; i4 < activeSlides.length; i4 += 1) {
      if (typeof activeSlides[i4] !== "undefined") {
        const height = activeSlides[i4].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0)
      swiper.wrapperEl.style.height = `${newHeight}px`;
  }
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;
    const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
    for (let i4 = 0; i4 < slides.length; i4 += 1) {
      slides[i4].swiperSlideOffset = (swiper.isHorizontal() ? slides[i4].offsetLeft : slides[i4].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
  }
  function updateSlidesProgress(translate2) {
    if (translate2 === void 0) {
      translate2 = this && this.translate || 0;
    }
    const swiper = this;
    const params = swiper.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper;
    if (slides.length === 0)
      return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    let offsetCenter = -translate2;
    if (rtl)
      offsetCenter = translate2;
    slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideVisibleClass);
    });
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    let spaceBetween = params.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i4 = 0; i4 < slides.length; i4 += 1) {
      const slide2 = slides[i4];
      let slideOffset = slide2.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i4];
      const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        swiper.visibleSlides.push(slide2);
        swiper.visibleSlidesIndexes.push(i4);
        slides[i4].classList.add(params.slideVisibleClass);
      }
      slide2.progress = rtl ? -slideProgress : slideProgress;
      slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }
  function updateProgress(translate2) {
    const swiper = this;
    if (typeof translate2 === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1;
      translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }
    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd,
      progressLoop
    } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate2 - swiper.minTranslate()) / translatesDiff;
      const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded)
        progress = 0;
      if (isEndRounded)
        progress = 1;
    }
    if (params.loop) {
      const firstSlideIndex = swiper.getSlideIndexByData(0);
      const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
      const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
      const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate2);
      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }
      if (progressLoop > 1)
        progressLoop -= 1;
    }
    Object.assign(swiper, {
      progress,
      progressLoop,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
      swiper.updateSlidesProgress(translate2);
    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit("fromEdge");
    }
    swiper.emit("progress", progress);
  }
  function updateSlidesClasses() {
    const swiper = this;
    const {
      slides,
      params,
      slidesEl,
      activeIndex
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const getFilteredSlide = (selector) => {
      return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
    };
    slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
    });
    let activeSlide;
    if (isVirtual) {
      if (params.loop) {
        let slideIndex = activeIndex - swiper.virtual.slidesBefore;
        if (slideIndex < 0)
          slideIndex = swiper.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper.virtual.slides.length)
          slideIndex -= swiper.virtual.slides.length;
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
      } else {
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
      }
    } else {
      activeSlide = slides[activeIndex];
    }
    if (activeSlide) {
      activeSlide.classList.add(params.slideActiveClass);
      let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }
      if (nextSlide) {
        nextSlide.classList.add(params.slideNextClass);
      }
      let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
      if (prevSlide) {
        prevSlide.classList.add(params.slidePrevClass);
      }
    }
    swiper.emitSlidesClasses();
  }
  var processLazyPreloader = (swiper, imageEl) => {
    if (!swiper || swiper.destroyed || !swiper.params)
      return;
    const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
    const slideEl = imageEl.closest(slideSelector());
    if (slideEl) {
      const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      if (lazyEl)
        lazyEl.remove();
    }
  };
  var unlazy = (swiper, index) => {
    if (!swiper.slides[index])
      return;
    const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
    if (imageEl)
      imageEl.removeAttribute("loading");
  };
  var preload = (swiper) => {
    if (!swiper || swiper.destroyed || !swiper.params)
      return;
    let amount = swiper.params.lazyPreloadPrevNext;
    const len = swiper.slides.length;
    if (!len || !amount || amount < 0)
      return;
    amount = Math.min(amount, len);
    const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
    const activeIndex = swiper.activeIndex;
    if (swiper.params.grid && swiper.params.grid.rows > 1) {
      const activeColumn = activeIndex;
      const preloadColumns = [activeColumn - amount];
      preloadColumns.push(...Array.from({
        length: amount
      }).map((_3, i4) => {
        return activeColumn + slidesPerView + i4;
      }));
      swiper.slides.forEach((slideEl, i4) => {
        if (preloadColumns.includes(slideEl.column))
          unlazy(swiper, i4);
      });
      return;
    }
    const slideIndexLastInView = activeIndex + slidesPerView - 1;
    if (swiper.params.rewind || swiper.params.loop) {
      for (let i4 = activeIndex - amount; i4 <= slideIndexLastInView + amount; i4 += 1) {
        const realIndex = (i4 % len + len) % len;
        if (realIndex < activeIndex || realIndex > slideIndexLastInView)
          unlazy(swiper, realIndex);
      }
    } else {
      for (let i4 = Math.max(activeIndex - amount, 0); i4 <= Math.min(slideIndexLastInView + amount, len - 1); i4 += 1) {
        if (i4 !== activeIndex && (i4 > slideIndexLastInView || i4 < activeIndex)) {
          unlazy(swiper, i4);
        }
      }
    }
  };
  function getActiveIndexByTranslate(swiper) {
    const {
      slidesGrid,
      params
    } = swiper;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    let activeIndex;
    for (let i4 = 0; i4 < slidesGrid.length; i4 += 1) {
      if (typeof slidesGrid[i4 + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i4] && translate2 < slidesGrid[i4 + 1] - (slidesGrid[i4 + 1] - slidesGrid[i4]) / 2) {
          activeIndex = i4;
        } else if (translate2 >= slidesGrid[i4] && translate2 < slidesGrid[i4 + 1]) {
          activeIndex = i4 + 1;
        }
      } else if (translate2 >= slidesGrid[i4]) {
        activeIndex = i4;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    const {
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex2 = aIndex - swiper.virtual.slidesBefore;
      if (realIndex2 < 0) {
        realIndex2 = swiper.virtual.slides.length + realIndex2;
      }
      if (realIndex2 >= swiper.virtual.slides.length) {
        realIndex2 -= swiper.virtual.slides.length;
      }
      return realIndex2;
    };
    if (typeof activeIndex === "undefined") {
      activeIndex = getActiveIndexByTranslate(swiper);
    }
    if (snapGrid.indexOf(translate2) >= 0) {
      snapIndex = snapGrid.indexOf(translate2);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.realIndex = getVirtualRealIndex(activeIndex);
      }
      return;
    }
    let realIndex;
    if (swiper.virtual && params.virtual.enabled && params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else if (swiper.slides[activeIndex]) {
      realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10);
    } else {
      realIndex = activeIndex;
    }
    Object.assign(swiper, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    if (swiper.initialized) {
      preload(swiper);
    }
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");
    if (previousRealIndex !== realIndex) {
      swiper.emit("realIndexChange");
    }
    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit("slideChange");
    }
  }
  function updateClickedSlide(e4) {
    const swiper = this;
    const params = swiper.params;
    const slide2 = e4.closest(`.${params.slideClass}, swiper-slide`);
    let slideFound = false;
    let slideIndex;
    if (slide2) {
      for (let i4 = 0; i4 < swiper.slides.length; i4 += 1) {
        if (swiper.slides[i4] === slide2) {
          slideFound = true;
          slideIndex = i4;
          break;
        }
      }
    }
    if (slide2 && slideFound) {
      swiper.clickedSlide = slide2;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = void 0;
      swiper.clickedIndex = void 0;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }
  var update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };
  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }
    const swiper = this;
    const {
      params,
      rtlTranslate: rtl,
      translate: translate2,
      wrapperEl
    } = swiper;
    if (params.virtualTranslate) {
      return rtl ? -translate2 : translate2;
    }
    if (params.cssMode) {
      return translate2;
    }
    let currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper.cssOverflowAdjustment();
    if (rtl)
      currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate2, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params,
      wrapperEl,
      progress
    } = swiper;
    let x2 = 0;
    let y3 = 0;
    const z3 = 0;
    if (swiper.isHorizontal()) {
      x2 = rtl ? -translate2 : translate2;
    } else {
      y3 = translate2;
    }
    if (params.roundLengths) {
      x2 = Math.floor(x2);
      y3 = Math.floor(y3);
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x2 : y3;
    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x2 : -y3;
    } else if (!params.virtualTranslate) {
      if (swiper.isHorizontal()) {
        x2 -= swiper.cssOverflowAdjustment();
      } else {
        y3 -= swiper.cssOverflowAdjustment();
      }
      wrapperEl.style.transform = `translate3d(${x2}px, ${y3}px, ${z3}px)`;
    }
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate2);
    }
    swiper.emit("setTranslate", swiper.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
    if (translate2 === void 0) {
      translate2 = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (translateBounds === void 0) {
      translateBounds = true;
    }
    const swiper = this;
    const {
      params,
      wrapperEl
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper.minTranslate();
    const maxTranslate2 = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate2 > minTranslate2)
      newTranslate = minTranslate2;
    else if (translateBounds && translate2 < maxTranslate2)
      newTranslate = maxTranslate2;
    else
      newTranslate = translate2;
    swiper.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e4) {
            if (!swiper || swiper.destroyed)
              return;
            if (e4.target !== this)
              return;
            swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }
        swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }
  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo
  };
  function setTransition(duration, byController) {
    const swiper = this;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    }
    swiper.emit("setTransition", duration, byController);
  }
  function transitionEmit(_ref) {
    let {
      swiper,
      runCallbacks,
      direction,
      step
    } = _ref;
    const {
      activeIndex,
      previousIndex
    } = swiper;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex)
        dir = "next";
      else if (activeIndex < previousIndex)
        dir = "prev";
      else
        dir = "reset";
    }
    swiper.emit(`transition${step}`);
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit(`slideResetTransition${step}`);
        return;
      }
      swiper.emit(`slideChangeTransition${step}`);
      if (dir === "next") {
        swiper.emit(`slideNextTransition${step}`);
      } else {
        swiper.emit(`slidePrevTransition${step}`);
      }
    }
  }
  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params
    } = swiper;
    if (params.cssMode)
      return;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start"
    });
  }
  function transitionEnd(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.animating = false;
    if (params.cssMode)
      return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End"
    });
  }
  var transition = {
    setTransition,
    transitionStart,
    transitionEnd
  };
  function slideTo(index, speed, runCallbacks, internal, initial) {
    if (index === void 0) {
      index = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      index = parseInt(index, 10);
    }
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0)
      slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
      return false;
    }
    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    const translate2 = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex) {
      for (let i4 = 0; i4 < slidesGrid.length; i4 += 1) {
        const normalizedTranslate = -Math.floor(translate2 * 100);
        const normalizedGrid = Math.floor(slidesGrid[i4] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i4 + 1] * 100);
        if (typeof slidesGrid[i4 + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i4;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i4 + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i4;
        }
      }
    }
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper.emit("beforeSlideChangeStart");
    }
    swiper.updateProgress(translate2);
    let direction;
    if (slideIndex > activeIndex)
      direction = "next";
    else if (slideIndex < activeIndex)
      direction = "prev";
    else
      direction = "reset";
    if (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate) {
      swiper.updateActiveIndex(slideIndex);
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== "slide") {
        swiper.setTranslate(translate2);
      }
      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      const t4 = rtl ? translate2 : -translate2;
      if (speed === 0) {
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }
        if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
          swiper._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t4;
          });
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t4;
        }
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._immediateVirtual = false;
          });
        }
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t4,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t4,
          behavior: "smooth"
        });
      }
      return true;
    }
    swiper.setTransition(speed);
    swiper.setTranslate(translate2);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e4) {
          if (!swiper || swiper.destroyed)
            return;
          if (e4.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
    }
    return true;
  }
  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper = this;
    let newIndex = index;
    if (swiper.params.loop) {
      if (swiper.virtual && swiper.params.virtual.enabled) {
        newIndex = newIndex + swiper.virtual.slidesBefore;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }
  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      enabled,
      params,
      animating
    } = swiper;
    if (!enabled)
      return swiper;
    let perGroup = params.slidesPerGroup;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "next"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    if (params.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }
  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled,
      animating
    } = swiper;
    if (!enabled)
      return swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "prev"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0)
        return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate2);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && params.cssMode) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0)
        prevIndex = swiper.activeIndex - 1;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper.isBeginning) {
      const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (threshold === void 0) {
      threshold = 0.5;
    }
    const swiper = this;
    let index = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    if (translate2 >= swiper.snapGrid[snapIndex]) {
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];
      if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];
      if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper.clickedIndex;
    let realIndex;
    const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
    if (params.loop) {
      if (swiper.animating)
        return;
      realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  var slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };
  function loopCreate(slideRealIndex) {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
      return;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el, index) => {
      el.setAttribute("data-swiper-slide-index", index);
    });
    swiper.loopFix({
      slideRealIndex,
      direction: params.centeredSlides ? void 0 : "next"
    });
  }
  function loopFix(_temp) {
    let {
      slideRealIndex,
      slideTo: slideTo2 = true,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController,
      byMousewheel
    } = _temp === void 0 ? {} : _temp;
    const swiper = this;
    if (!swiper.params.loop)
      return;
    swiper.emit("beforeLoopFix");
    const {
      slides,
      allowSlidePrev,
      allowSlideNext,
      slidesEl,
      params
    } = swiper;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    if (swiper.virtual && params.virtual.enabled) {
      if (slideTo2) {
        if (!params.centeredSlides && swiper.snapIndex === 0) {
          swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
        } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
          swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
        } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
          swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit("loopFix");
      return;
    }
    const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
    let loopedSlides = params.loopedSlides || slidesPerView;
    if (loopedSlides % params.slidesPerGroup !== 0) {
      loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
    }
    swiper.loopedSlides = loopedSlides;
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    let activeIndex = swiper.activeIndex;
    if (typeof activeSlideIndex === "undefined") {
      activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
    } else {
      activeIndex = activeSlideIndex;
    }
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    if (activeSlideIndex < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
      for (let i4 = 0; i4 < loopedSlides - activeSlideIndex; i4 += 1) {
        const index = i4 - Math.floor(i4 / slides.length) * slides.length;
        prependSlidesIndexes.push(slides.length - index - 1);
      }
    } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
      slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
      for (let i4 = 0; i4 < slidesAppended; i4 += 1) {
        const index = i4 - Math.floor(i4 / slides.length) * slides.length;
        appendSlidesIndexes.push(index);
      }
    }
    if (isPrev) {
      prependSlidesIndexes.forEach((index) => {
        swiper.slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(swiper.slides[index]);
        swiper.slides[index].swiperLoopMoveDOM = false;
      });
    }
    if (isNext) {
      appendSlidesIndexes.forEach((index) => {
        swiper.slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(swiper.slides[index]);
        swiper.slides[index].swiperLoopMoveDOM = false;
      });
    }
    swiper.recalcSlides();
    if (params.slidesPerView === "auto") {
      swiper.updateSlides();
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    if (slideTo2) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
            if (setTranslate2) {
              swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            }
          }
        } else {
          if (setTranslate2) {
            swiper.slideToLoop(slideRealIndex, 0, false, true);
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate2) {
              swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            }
          }
        } else {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
        }
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.controller && swiper.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        slideTo: false,
        direction,
        setTranslate: setTranslate2,
        activeSlideIndex,
        byController: true
      };
      if (Array.isArray(swiper.controller.control)) {
        swiper.controller.control.forEach((c5) => {
          if (!c5.destroyed && c5.params.loop)
            c5.loopFix(loopParams);
        });
      } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
        swiper.controller.control.loopFix(loopParams);
      }
    }
    swiper.emit("loopFix");
  }
  function loopDestroy() {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
      return;
    swiper.recalcSlides();
    const newSlidesOrder = [];
    swiper.slides.forEach((slideEl) => {
      const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper.recalcSlides();
    swiper.slideTo(swiper.realIndex, 0);
  }
  var loop = {
    loopCreate,
    loopFix,
    loopDestroy
  };
  function setGrabCursor(moving) {
    const swiper = this;
    if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
      return;
    const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  function unsetGrabCursor() {
    const swiper = this;
    if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  var grabCursor = {
    setGrabCursor,
    unsetGrabCursor
  };
  function closestElement(selector, base) {
    if (base === void 0) {
      base = this;
    }
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow())
        return null;
      if (el.assignedSlot)
        el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function onTouchStart(event2) {
    const swiper = this;
    const document2 = getDocument();
    const window2 = getWindow();
    const data = swiper.touchEventsData;
    data.evCache.push(event2);
    const {
      params,
      touches,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && event2.pointerType === "mouse")
      return;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    if (!swiper.animating && params.cssMode && params.loop) {
      swiper.loopFix();
    }
    let e4 = event2;
    if (e4.originalEvent)
      e4 = e4.originalEvent;
    let targetEl = e4.target;
    if (params.touchEventsTarget === "wrapper") {
      if (!swiper.wrapperEl.contains(targetEl))
        return;
    }
    if ("which" in e4 && e4.which === 3)
      return;
    if ("button" in e4 && e4.button > 0)
      return;
    if (data.isTouched && data.isMoved)
      return;
    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = event2.composedPath ? event2.composedPath() : event2.path;
    if (swipingClassHasValue && e4.target && e4.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }
    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e4.target && e4.target.shadowRoot);
    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!targetEl.closest(params.swipeHandler))
        return;
    }
    touches.currentX = e4.pageX;
    touches.currentY = e4.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
      } else {
        return;
      }
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = void 0;
    if (params.threshold > 0)
      data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e4.preventDefault();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
      swiper.freeMode.onTouchStart();
    }
    swiper.emit("touchStart", e4);
  }
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && event2.pointerType === "mouse")
      return;
    let e4 = event2;
    if (e4.originalEvent)
      e4 = e4.originalEvent;
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e4);
      }
      return;
    }
    const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === e4.pointerId);
    if (pointerIndex >= 0)
      data.evCache[pointerIndex] = e4;
    const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e4;
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e4.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      if (!e4.target.matches(data.focusableElements)) {
        swiper.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          prevX: swiper.touches.currentX,
          prevY: swiper.touches.currentY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }
    if (document2.activeElement) {
      if (e4.target === document2.activeElement && e4.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e4);
    }
    if (e4.targetTouches && e4.targetTouches.length > 1)
      return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e4);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params.cssMode && e4.cancelable) {
      e4.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e4.stopPropagation();
    }
    let diff = swiper.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
    if (params.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper.touchesDirection;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper.params.loop && !params.cssMode;
    if (!data.isMoved) {
      if (isLoop) {
        swiper.loopFix({
          direction: swiper.swipeDirection
        });
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit("sliderFirstMove", e4);
    }
    let loopFixed;
    if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
      swiper.loopFix({
        direction: swiper.swipeDirection,
        setTranslate: true
      });
      loopFixed = true;
    }
    swiper.emit("sliderMove", e4);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0) {
      if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
        swiper.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0
        });
      }
      if (data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        }
      }
    } else if (diff < 0) {
      if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
        swiper.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
        });
      }
      if (data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
      }
    }
    if (disableParentSwiper) {
      e4.preventedByNestedSwiper = true;
    }
    if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params.followFinger || params.cssMode)
      return;
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    }
    swiper.updateProgress(data.currentTranslate);
    swiper.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event2) {
    const swiper = this;
    const data = swiper.touchEventsData;
    const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === event2.pointerId);
    if (pointerIndex >= 0) {
      data.evCache.splice(pointerIndex, 1);
    }
    if (["pointercancel", "pointerout", "pointerleave"].includes(event2.type)) {
      const proceed = event2.type === "pointercancel" && (swiper.browser.isSafari || swiper.browser.isWebView);
      if (!proceed) {
        return;
      }
    }
    const {
      params,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && event2.pointerType === "mouse")
      return;
    let e4 = event2;
    if (e4.originalEvent)
      e4 = e4.originalEvent;
    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e4);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper.allowClick) {
      const pathTree = e4.path || e4.composedPath && e4.composedPath();
      swiper.updateClickedSlide(pathTree && pathTree[0] || e4.target);
      swiper.emit("tap click", e4);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e4);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper.destroyed)
        swiper.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params.cssMode) {
      return;
    }
    if (params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];
    for (let i4 = 0; i4 < slidesGrid.length; i4 += i4 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      const increment2 = i4 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i4 + increment2] !== "undefined") {
        if (currentPos >= slidesGrid[i4] && currentPos < slidesGrid[i4 + increment2]) {
          stopIndex = i4;
          groupSize = slidesGrid[i4 + increment2] - slidesGrid[i4];
        }
      } else if (currentPos >= slidesGrid[i4]) {
        stopIndex = i4;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
        else
          swiper.slideTo(stopIndex);
      }
      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper.navigation && (e4.target === swiper.navigation.nextEl || e4.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e4.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }
  function onResize() {
    const swiper = this;
    const {
      params,
      el
    } = swiper;
    if (el && el.offsetWidth === 0)
      return;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper;
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params.loop;
    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      if (swiper.params.loop && !isVirtual) {
        swiper.slideToLoop(swiper.realIndex, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      clearTimeout(swiper.autoplay.resizeTimeout);
      swiper.autoplay.resizeTimeout = setTimeout(() => {
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
          swiper.autoplay.resume();
        }
      }, 500);
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }
  function onClick(e4) {
    const swiper = this;
    if (!swiper.enabled)
      return;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks)
        e4.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e4.stopPropagation();
        e4.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper;
    if (!enabled)
      return;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    }
    if (swiper.translate === 0)
      swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }
    swiper.emit("setTranslate", swiper.translate, false);
  }
  function onLoad(e4) {
    const swiper = this;
    processLazyPreloader(swiper, e4.target);
    if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
      return;
    }
    swiper.update();
  }
  var dummyEventAttached = false;
  function dummyEventListener() {
  }
  var events = (swiper, method) => {
    const document2 = getDocument();
    const {
      params,
      el,
      wrapperEl,
      device
    } = swiper;
    const capture = !!params.nested;
    const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    el[domMethod]("pointerdown", swiper.onTouchStart, {
      passive: false
    });
    document2[domMethod]("pointermove", swiper.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("pointerup", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointercancel", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerout", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerleave", swiper.onTouchEnd, {
      passive: true
    });
    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]("click", swiper.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl[domMethod]("scroll", swiper.onScroll);
    }
    if (params.updateOnWindowResize) {
      swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
    } else {
      swiper[swiperMethod]("observerUpdate", onResize, true);
    }
    el[domMethod]("load", swiper.onLoad, {
      capture: true
    });
  };
  function attachEvents() {
    const swiper = this;
    const document2 = getDocument();
    const {
      params
    } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    swiper.onLoad = onLoad.bind(swiper);
    if (!dummyEventAttached) {
      document2.addEventListener("touchstart", dummyEventListener);
      dummyEventAttached = true;
    }
    events(swiper, "on");
  }
  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }
  var events$1 = {
    attachEvents,
    detachEvents
  };
  var isGridEnabled = (swiper, params) => {
    return swiper.grid && params.grid && params.grid.rows > 1;
  };
  function setBreakpoint() {
    const swiper = this;
    const {
      realIndex,
      initialized,
      params,
      el
    } = swiper;
    const breakpoints2 = params.breakpoints;
    if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
      return;
    const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
    if (!breakpoint || swiper.currentBreakpoint === breakpoint)
      return;
    const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      if (typeof breakpointParams[prop] === "undefined")
        return;
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
    if (directionChanged && initialized) {
      swiper.changeDirection();
    }
    extend2(swiper.params, breakpointParams);
    const isEnabled = swiper.params.enabled;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper.enable();
    }
    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);
    if (needsReLoop && initialized) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    }
    swiper.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints2, base, containerEl) {
    if (base === void 0) {
      base = "window";
    }
    if (!breakpoints2 || base === "container" && !containerEl)
      return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints2).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a4, b3) => parseInt(a4.value, 10) - parseInt(b3.value, 10));
    for (let i4 = 0; i4 < points.length; i4 += 1) {
      const {
        point,
        value
      } = points[i4];
      if (base === "window") {
        if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }
  var breakpoints = {
    setBreakpoint,
    getBreakpoint
  };
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper = this;
    const {
      classNames,
      params,
      rtl,
      el,
      device
    } = swiper;
    const suffixes = prepareClasses(["initialized", params.direction, {
      "free-mode": swiper.params.freeMode && params.freeMode.enabled
    }, {
      "autoheight": params.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      "centered": params.cssMode && params.centeredSlides
    }, {
      "watch-progress": params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper.emitContainerClasses();
  }
  function removeClasses() {
    const swiper = this;
    const {
      el,
      classNames
    } = swiper;
    el.classList.remove(...classNames);
    swiper.emitContainerClasses();
  }
  var classes = {
    addClasses,
    removeClasses
  };
  function checkOverflow() {
    const swiper = this;
    const {
      isLocked: wasLocked,
      params
    } = swiper;
    const {
      slidesOffsetBefore
    } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }
    if (params.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }
    if (params.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }
    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }
    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
  }
  var checkOverflow$1 = {
    checkOverflow
  };
  var defaults = {
    init: true,
    direction: "horizontal",
    oneWayMovement: false,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: "slide",
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: void 0,
    breakpointsBase: "window",
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: true,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // loop
    loop: false,
    loopedSlides: null,
    loopPreventsSliding: true,
    // rewind
    rewind: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    // NS
    containerModifierClass: "swiper-",
    // NEW
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false
  };
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj) {
      if (obj === void 0) {
        obj = {};
      }
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend2(allModulesParams, obj);
        return;
      }
      if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
        params[moduleParamName] = {
          auto: true
        };
      }
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        extend2(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }
      if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }
      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false
        };
      extend2(allModulesParams, obj);
    };
  }
  var prototypes = {
    eventsEmitter,
    update,
    translate,
    transition,
    slide,
    loop,
    grabCursor,
    events: events$1,
    breakpoints,
    checkOverflow: checkOverflow$1,
    classes
  };
  var extendedDefaults = {};
  var Swiper = class _Swiper {
    constructor() {
      let el;
      let params;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
        params = args[0];
      } else {
        [el, params] = args;
      }
      if (!params)
        params = {};
      params = extend2({}, params);
      if (el && !params.el)
        params.el = el;
      const document2 = getDocument();
      if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
        const swipers = [];
        document2.querySelectorAll(params.el).forEach((containerEl) => {
          const newParams = extend2({}, params, {
            el: containerEl
          });
          swipers.push(new _Swiper(newParams));
        });
        return swipers;
      }
      const swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = [...swiper.__modules__];
      if (params.modules && Array.isArray(params.modules)) {
        swiper.modules.push(...params.modules);
      }
      const allModulesParams = {};
      swiper.modules.forEach((mod) => {
        mod({
          params,
          swiper,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper)
        });
      });
      const swiperParams = extend2({}, defaults, allModulesParams);
      swiper.params = extend2({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = extend2({}, swiper.params);
      swiper.passedParams = extend2({}, params);
      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach((eventName) => {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }
      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      }
      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el,
        // Classes
        classNames: [],
        // Slides
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal() {
          return swiper.params.direction === "horizontal";
        },
        isVertical() {
          return swiper.params.direction === "vertical";
        },
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          // Form elements to match
          focusableElements: swiper.params.focusableElements,
          // Last click time
          lastClickTime: 0,
          clickTimeout: void 0,
          // Velocities
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: []
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper.emit("_swiper");
      if (swiper.params.init) {
        swiper.init();
      }
      return swiper;
    }
    getSlideIndex(slideEl) {
      const {
        slidesEl,
        params
      } = this;
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      const firstSlideIndex = elementIndex(slides[0]);
      return elementIndex(slideEl) - firstSlideIndex;
    }
    getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
    }
    recalcSlides() {
      const swiper = this;
      const {
        slidesEl,
        params
      } = swiper;
      swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    }
    enable() {
      const swiper = this;
      if (swiper.enabled)
        return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit("enable");
    }
    disable() {
      const swiper = this;
      if (!swiper.enabled)
        return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper.minTranslate();
      const max = swiper.maxTranslate();
      const current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const cls = swiper.el.className.split(" ").filter((className) => {
        return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper = this;
      if (swiper.destroyed)
        return "";
      return slideEl.className.split(" ").filter((className) => {
        return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(" ");
    }
    emitSlidesClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const updates = [];
      swiper.slides.forEach((slideEl) => {
        const classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames
        });
        swiper.emit("_slideClass", slideEl, classNames);
      });
      swiper.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view, exact) {
      if (view === void 0) {
        view = "current";
      }
      if (exact === void 0) {
        exact = false;
      }
      const swiper = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex
      } = swiper;
      let spv = 1;
      if (params.centeredSlides) {
        let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
        let breakLoop;
        for (let i4 = activeIndex + 1; i4 < slides.length; i4 += 1) {
          if (slides[i4] && !breakLoop) {
            slideSize += slides[i4].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
        for (let i4 = activeIndex - 1; i4 >= 0; i4 -= 1) {
          if (slides[i4] && !breakLoop) {
            slideSize += slides[i4].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
      } else {
        if (view === "current") {
          for (let i4 = activeIndex + 1; i4 < slides.length; i4 += 1) {
            const slideInView = exact ? slidesGrid[i4] + slidesSizesGrid[i4] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i4] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          for (let i4 = activeIndex - 1; i4 >= 0; i4 -= 1) {
            const slideInView = slidesGrid[activeIndex] - slidesGrid[i4] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed)
        return;
      const {
        snapGrid,
        params
      } = swiper;
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        }
      });
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate2() {
        const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      let translated;
      if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
        setTranslate2();
        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
          const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
          translated = swiper.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate2();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit("update");
    }
    changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }
      const swiper = this;
      const currentDirection = swiper.params.direction;
      if (!newDirection) {
        newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
      }
      if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
        return swiper;
      }
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
      swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper.emit("changeDirection");
      if (needUpdate)
        swiper.update();
      return swiper;
    }
    changeLanguageDirection(direction) {
      const swiper = this;
      if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
        return;
      swiper.rtl = direction === "rtl";
      swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
      if (swiper.rtl) {
        swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "rtl";
      } else {
        swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "ltr";
      }
      swiper.update();
    }
    mount(element) {
      const swiper = this;
      if (swiper.mounted)
        return true;
      let el = element || swiper.params.el;
      if (typeof el === "string") {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper;
      if (el.parentNode && el.parentNode.host) {
        swiper.isElement = true;
      }
      const getWrapperSelector = () => {
        return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
      };
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = el.shadowRoot.querySelector(getWrapperSelector());
          return res;
        }
        return elementChildren(el, getWrapperSelector())[0];
      };
      let wrapperEl = getWrapper();
      if (!wrapperEl && swiper.params.createElements) {
        wrapperEl = createElement("div", swiper.params.wrapperClass);
        el.append(wrapperEl);
        elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper, {
        el,
        wrapperEl,
        slidesEl: swiper.isElement ? el.parentNode.host : wrapperEl,
        hostEl: swiper.isElement ? el.parentNode.host : el,
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
        rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
        wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
      });
      return true;
    }
    init(el) {
      const swiper = this;
      if (swiper.initialized)
        return swiper;
      const mounted = swiper.mount(el);
      if (mounted === false)
        return swiper;
      swiper.emit("beforeInit");
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.addClasses();
      swiper.updateSize();
      swiper.updateSlides();
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }
      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
      }
      if (swiper.params.loop) {
        swiper.loopCreate();
      }
      swiper.attachEvents();
      [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        } else {
          imageEl.addEventListener("load", (e4) => {
            processLazyPreloader(swiper, e4.target);
          });
        }
      });
      preload(swiper);
      swiper.initialized = true;
      preload(swiper);
      swiper.emit("init");
      swiper.emit("afterInit");
      return swiper;
    }
    destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }
      if (cleanStyles === void 0) {
        cleanStyles = true;
      }
      const swiper = this;
      const {
        params,
        el,
        wrapperEl,
        slides
      } = swiper;
      if (typeof swiper.params === "undefined" || swiper.destroyed) {
        return null;
      }
      swiper.emit("beforeDestroy");
      swiper.initialized = false;
      swiper.detachEvents();
      if (params.loop) {
        swiper.loopDestroy();
      }
      if (cleanStyles) {
        swiper.removeClasses();
        el.removeAttribute("style");
        wrapperEl.removeAttribute("style");
        if (slides && slides.length) {
          slides.forEach((slideEl) => {
            slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
            slideEl.removeAttribute("style");
            slideEl.removeAttribute("data-swiper-slide-index");
          });
        }
      }
      swiper.emit("destroy");
      Object.keys(swiper.eventsListeners).forEach((eventName) => {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        swiper.el.swiper = null;
        deleteProps(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      extend2(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults;
    }
    static installModule(mod) {
      if (!_Swiper.prototype.__modules__)
        _Swiper.prototype.__modules__ = [];
      const modules2 = _Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules2.indexOf(mod) < 0) {
        modules2.push(mod);
      }
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m2) => _Swiper.installModule(m2));
        return _Swiper;
      }
      _Swiper.installModule(module);
      return _Swiper;
    }
  };
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);

  // node_modules/swiper/modules/virtual.mjs
  function Virtual(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: true,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    });
    let cssModeTimeout;
    const document2 = getDocument();
    swiper.virtual = {
      cache: {},
      from: void 0,
      to: void 0,
      slides: [],
      offset: 0,
      slidesGrid: []
    };
    const tempDOM = document2.createElement("div");
    function renderSlide(slide2, index) {
      const params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }
      let slideEl;
      if (params.renderSlide) {
        slideEl = params.renderSlide.call(swiper, slide2, index);
        if (typeof slideEl === "string") {
          tempDOM.innerHTML = slideEl;
          slideEl = tempDOM.children[0];
        }
      } else if (swiper.isElement) {
        slideEl = createElement("swiper-slide");
      } else {
        slideEl = createElement("div", swiper.params.slideClass);
      }
      slideEl.setAttribute("data-swiper-slide-index", index);
      if (!params.renderSlide) {
        slideEl.innerHTML = slide2;
      }
      if (params.cache)
        swiper.virtual.cache[index] = slideEl;
      return slideEl;
    }
    function update2(force) {
      const {
        slidesPerView,
        slidesPerGroup,
        centeredSlides,
        loop: isLoop
      } = swiper.params;
      const {
        addSlidesBefore,
        addSlidesAfter
      } = swiper.params.virtual;
      const {
        from: previousFrom,
        to: previousTo,
        slides,
        slidesGrid: previousSlidesGrid,
        offset: previousOffset
      } = swiper.virtual;
      if (!swiper.params.cssMode) {
        swiper.updateActiveIndex();
      }
      const activeIndex = swiper.activeIndex || 0;
      let offsetProp;
      if (swiper.rtlTranslate)
        offsetProp = "right";
      else
        offsetProp = swiper.isHorizontal() ? "left" : "top";
      let slidesAfter;
      let slidesBefore;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
        slidesBefore = (isLoop ? slidesPerView : slidesPerGroup) + addSlidesBefore;
      }
      let from = activeIndex - slidesBefore;
      let to = activeIndex + slidesAfter;
      if (!isLoop) {
        from = Math.max(from, 0);
        to = Math.min(to, slides.length - 1);
      }
      let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
      if (isLoop && activeIndex >= slidesBefore) {
        from -= slidesBefore;
        if (!centeredSlides)
          offset += swiper.slidesGrid[0];
      } else if (isLoop && activeIndex < slidesBefore) {
        from = -slidesBefore;
        if (centeredSlides)
          offset += swiper.slidesGrid[0];
      }
      Object.assign(swiper.virtual, {
        from,
        to,
        offset,
        slidesGrid: swiper.slidesGrid,
        slidesBefore,
        slidesAfter
      });
      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        emit("virtualUpdate");
      }
      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.forEach((slideEl) => {
            slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
          });
        }
        swiper.updateProgress();
        emit("virtualUpdate");
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset,
          from,
          to,
          slides: function getSlides() {
            const slidesToRender = [];
            for (let i4 = from; i4 <= to; i4 += 1) {
              slidesToRender.push(slides[i4]);
            }
            return slidesToRender;
          }()
        });
        if (swiper.params.virtual.renderExternalUpdate) {
          onRendered();
        } else {
          emit("virtualUpdate");
        }
        return;
      }
      const prependIndexes = [];
      const appendIndexes = [];
      const getSlideIndex = (index) => {
        let slideIndex = index;
        if (index < 0) {
          slideIndex = slides.length + index;
        } else if (slideIndex >= slides.length) {
          slideIndex = slideIndex - slides.length;
        }
        return slideIndex;
      };
      if (force) {
        swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}, swiper-slide`).forEach((slideEl) => {
          slideEl.remove();
        });
      } else {
        for (let i4 = previousFrom; i4 <= previousTo; i4 += 1) {
          if (i4 < from || i4 > to) {
            const slideIndex = getSlideIndex(i4);
            swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`).forEach((slideEl) => {
              slideEl.remove();
            });
          }
        }
      }
      const loopFrom = isLoop ? -slides.length : 0;
      const loopTo = isLoop ? slides.length * 2 : slides.length;
      for (let i4 = loopFrom; i4 < loopTo; i4 += 1) {
        if (i4 >= from && i4 <= to) {
          const slideIndex = getSlideIndex(i4);
          if (typeof previousTo === "undefined" || force) {
            appendIndexes.push(slideIndex);
          } else {
            if (i4 > previousTo)
              appendIndexes.push(slideIndex);
            if (i4 < previousFrom)
              prependIndexes.push(slideIndex);
          }
        }
      }
      appendIndexes.forEach((index) => {
        swiper.slidesEl.append(renderSlide(slides[index], index));
      });
      if (isLoop) {
        for (let i4 = prependIndexes.length - 1; i4 >= 0; i4 -= 1) {
          const index = prependIndexes[i4];
          swiper.slidesEl.prepend(renderSlide(slides[index], index));
        }
      } else {
        prependIndexes.sort((a4, b3) => b3 - a4);
        prependIndexes.forEach((index) => {
          swiper.slidesEl.prepend(renderSlide(slides[index], index));
        });
      }
      elementChildren(swiper.slidesEl, ".swiper-slide, swiper-slide").forEach((slideEl) => {
        slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
      });
      onRendered();
    }
    function appendSlide2(slides) {
      if (typeof slides === "object" && "length" in slides) {
        for (let i4 = 0; i4 < slides.length; i4 += 1) {
          if (slides[i4])
            swiper.virtual.slides.push(slides[i4]);
        }
      } else {
        swiper.virtual.slides.push(slides);
      }
      update2(true);
    }
    function prependSlide2(slides) {
      const activeIndex = swiper.activeIndex;
      let newActiveIndex = activeIndex + 1;
      let numberOfNewSlides = 1;
      if (Array.isArray(slides)) {
        for (let i4 = 0; i4 < slides.length; i4 += 1) {
          if (slides[i4])
            swiper.virtual.slides.unshift(slides[i4]);
        }
        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }
      if (swiper.params.virtual.cache) {
        const cache = swiper.virtual.cache;
        const newCache = {};
        Object.keys(cache).forEach((cachedIndex) => {
          const cachedEl = cache[cachedIndex];
          const cachedElIndex = cachedEl.getAttribute("data-swiper-slide-index");
          if (cachedElIndex) {
            cachedEl.setAttribute("data-swiper-slide-index", parseInt(cachedElIndex, 10) + numberOfNewSlides);
          }
          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
        });
        swiper.virtual.cache = newCache;
      }
      update2(true);
      swiper.slideTo(newActiveIndex, 0);
    }
    function removeSlide2(slidesIndexes) {
      if (typeof slidesIndexes === "undefined" || slidesIndexes === null)
        return;
      let activeIndex = swiper.activeIndex;
      if (Array.isArray(slidesIndexes)) {
        for (let i4 = slidesIndexes.length - 1; i4 >= 0; i4 -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i4], 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i4]];
          }
          if (slidesIndexes[i4] < activeIndex)
            activeIndex -= 1;
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }
        if (slidesIndexes < activeIndex)
          activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
      update2(true);
      swiper.slideTo(activeIndex, 0);
    }
    function removeAllSlides2() {
      swiper.virtual.slides = [];
      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }
      update2(true);
      swiper.slideTo(0, 0);
    }
    on("beforeInit", () => {
      if (!swiper.params.virtual.enabled)
        return;
      let domSlidesAssigned;
      if (typeof swiper.passedParams.virtual.slides === "undefined") {
        const slides = [...swiper.slidesEl.children].filter((el) => el.matches(`.${swiper.params.slideClass}, swiper-slide`));
        if (slides && slides.length) {
          swiper.virtual.slides = [...slides];
          domSlidesAssigned = true;
          slides.forEach((slideEl, slideIndex) => {
            slideEl.setAttribute("data-swiper-slide-index", slideIndex);
            swiper.virtual.cache[slideIndex] = slideEl;
            slideEl.remove();
          });
        }
      }
      if (!domSlidesAssigned) {
        swiper.virtual.slides = swiper.params.virtual.slides;
      }
      swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
      if (!swiper.params.initialSlide) {
        update2();
      }
    });
    on("setTranslate", () => {
      if (!swiper.params.virtual.enabled)
        return;
      if (swiper.params.cssMode && !swiper._immediateVirtual) {
        clearTimeout(cssModeTimeout);
        cssModeTimeout = setTimeout(() => {
          update2();
        }, 100);
      } else {
        update2();
      }
    });
    on("init update resize", () => {
      if (!swiper.params.virtual.enabled)
        return;
      if (swiper.params.cssMode) {
        setCSSProperty(swiper.wrapperEl, "--swiper-virtual-size", `${swiper.virtualSize}px`);
      }
    });
    Object.assign(swiper.virtual, {
      appendSlide: appendSlide2,
      prependSlide: prependSlide2,
      removeSlide: removeSlide2,
      removeAllSlides: removeAllSlides2,
      update: update2
    });
  }

  // node_modules/swiper/modules/keyboard.mjs
  function Keyboard(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const document2 = getDocument();
    const window2 = getWindow();
    swiper.keyboard = {
      enabled: false
    };
    extendParams({
      keyboard: {
        enabled: false,
        onlyInViewport: true,
        pageUpDown: true
      }
    });
    function handle(event2) {
      if (!swiper.enabled)
        return;
      const {
        rtlTranslate: rtl
      } = swiper;
      let e4 = event2;
      if (e4.originalEvent)
        e4 = e4.originalEvent;
      const kc = e4.keyCode || e4.charCode;
      const pageUpDown = swiper.params.keyboard.pageUpDown;
      const isPageUp = pageUpDown && kc === 33;
      const isPageDown = pageUpDown && kc === 34;
      const isArrowLeft = kc === 37;
      const isArrowRight = kc === 39;
      const isArrowUp = kc === 38;
      const isArrowDown = kc === 40;
      if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
        return false;
      }
      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
        return false;
      }
      if (e4.shiftKey || e4.altKey || e4.ctrlKey || e4.metaKey) {
        return void 0;
      }
      if (document2.activeElement && document2.activeElement.nodeName && (document2.activeElement.nodeName.toLowerCase() === "input" || document2.activeElement.nodeName.toLowerCase() === "textarea")) {
        return void 0;
      }
      if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
        let inView = false;
        if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
          return void 0;
        }
        const el = swiper.el;
        const swiperWidth = el.clientWidth;
        const swiperHeight = el.clientHeight;
        const windowWidth = window2.innerWidth;
        const windowHeight = window2.innerHeight;
        const swiperOffset = elementOffset(el);
        if (rtl)
          swiperOffset.left -= el.scrollLeft;
        const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
        for (let i4 = 0; i4 < swiperCoord.length; i4 += 1) {
          const point = swiperCoord[i4];
          if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
            if (point[0] === 0 && point[1] === 0)
              continue;
            inView = true;
          }
        }
        if (!inView)
          return void 0;
      }
      if (swiper.isHorizontal()) {
        if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
          if (e4.preventDefault)
            e4.preventDefault();
          else
            e4.returnValue = false;
        }
        if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl)
          swiper.slideNext();
        if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl)
          swiper.slidePrev();
      } else {
        if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
          if (e4.preventDefault)
            e4.preventDefault();
          else
            e4.returnValue = false;
        }
        if (isPageDown || isArrowDown)
          swiper.slideNext();
        if (isPageUp || isArrowUp)
          swiper.slidePrev();
      }
      emit("keyPress", kc);
      return void 0;
    }
    function enable() {
      if (swiper.keyboard.enabled)
        return;
      document2.addEventListener("keydown", handle);
      swiper.keyboard.enabled = true;
    }
    function disable() {
      if (!swiper.keyboard.enabled)
        return;
      document2.removeEventListener("keydown", handle);
      swiper.keyboard.enabled = false;
    }
    on("init", () => {
      if (swiper.params.keyboard.enabled) {
        enable();
      }
    });
    on("destroy", () => {
      if (swiper.keyboard.enabled) {
        disable();
      }
    });
    Object.assign(swiper.keyboard, {
      enable,
      disable
    });
  }

  // node_modules/swiper/modules/mousewheel.mjs
  function Mousewheel(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    extendParams({
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null,
        noMousewheelClass: "swiper-no-mousewheel"
      }
    });
    swiper.mousewheel = {
      enabled: false
    };
    let timeout;
    let lastScrollTime = now();
    let lastEventBeforeSnap;
    const recentWheelEvents = [];
    function normalize(e4) {
      const PIXEL_STEP = 10;
      const LINE_HEIGHT = 40;
      const PAGE_HEIGHT = 800;
      let sX = 0;
      let sY = 0;
      let pX = 0;
      let pY = 0;
      if ("detail" in e4) {
        sY = e4.detail;
      }
      if ("wheelDelta" in e4) {
        sY = -e4.wheelDelta / 120;
      }
      if ("wheelDeltaY" in e4) {
        sY = -e4.wheelDeltaY / 120;
      }
      if ("wheelDeltaX" in e4) {
        sX = -e4.wheelDeltaX / 120;
      }
      if ("axis" in e4 && e4.axis === e4.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }
      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;
      if ("deltaY" in e4) {
        pY = e4.deltaY;
      }
      if ("deltaX" in e4) {
        pX = e4.deltaX;
      }
      if (e4.shiftKey && !pX) {
        pX = pY;
        pY = 0;
      }
      if ((pX || pY) && e4.deltaMode) {
        if (e4.deltaMode === 1) {
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }
      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }
      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }
      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }
    function handleMouseEnter() {
      if (!swiper.enabled)
        return;
      swiper.mouseEntered = true;
    }
    function handleMouseLeave() {
      if (!swiper.enabled)
        return;
      swiper.mouseEntered = false;
    }
    function animateSlider(newEvent) {
      if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
        return false;
      }
      if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
        return false;
      }
      if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
        return true;
      }
      if (newEvent.direction < 0) {
        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
          swiper.slideNext();
          emit("scroll", newEvent.raw);
        }
      } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
        swiper.slidePrev();
        emit("scroll", newEvent.raw);
      }
      lastScrollTime = new window2.Date().getTime();
      return false;
    }
    function releaseScroll(newEvent) {
      const params = swiper.params.mousewheel;
      if (newEvent.direction < 0) {
        if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
          return true;
        }
      } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
        return true;
      }
      return false;
    }
    function handle(event2) {
      let e4 = event2;
      let disableParentSwiper = true;
      if (!swiper.enabled)
        return;
      if (event2.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`))
        return;
      const params = swiper.params.mousewheel;
      if (swiper.params.cssMode) {
        e4.preventDefault();
      }
      let targetEl = swiper.el;
      if (swiper.params.mousewheel.eventsTarget !== "container") {
        targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
      }
      const targetElContainsTarget = targetEl && targetEl.contains(e4.target);
      if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges)
        return true;
      if (e4.originalEvent)
        e4 = e4.originalEvent;
      let delta = 0;
      const rtlFactor = swiper.rtlTranslate ? -1 : 1;
      const data = normalize(e4);
      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY))
            delta = -data.pixelX * rtlFactor;
          else
            return true;
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX))
          delta = -data.pixelY;
        else
          return true;
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }
      if (delta === 0)
        return true;
      if (params.invert)
        delta = -delta;
      let positions = swiper.getTranslate() + delta * params.sensitivity;
      if (positions >= swiper.minTranslate())
        positions = swiper.minTranslate();
      if (positions <= swiper.maxTranslate())
        positions = swiper.maxTranslate();
      disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
      if (disableParentSwiper && swiper.params.nested)
        e4.stopPropagation();
      if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
          raw: event2
        };
        if (recentWheelEvents.length >= 2) {
          recentWheelEvents.shift();
        }
        const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
        recentWheelEvents.push(newEvent);
        if (prevEvent) {
          if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
            animateSlider(newEvent);
          }
        } else {
          animateSlider(newEvent);
        }
        if (releaseScroll(newEvent)) {
          return true;
        }
      } else {
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta)
        };
        const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
        if (!ignoreWheelEvents) {
          lastEventBeforeSnap = void 0;
          let position = swiper.getTranslate() + delta * params.sensitivity;
          const wasBeginning = swiper.isBeginning;
          const wasEnd = swiper.isEnd;
          if (position >= swiper.minTranslate())
            position = swiper.minTranslate();
          if (position <= swiper.maxTranslate())
            position = swiper.maxTranslate();
          swiper.setTransition(0);
          swiper.setTranslate(position);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
          if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
            swiper.updateSlidesClasses();
          }
          if (swiper.params.loop) {
            swiper.loopFix({
              direction: newEvent.direction < 0 ? "next" : "prev",
              byMousewheel: true
            });
          }
          if (swiper.params.freeMode.sticky) {
            clearTimeout(timeout);
            timeout = void 0;
            if (recentWheelEvents.length >= 15) {
              recentWheelEvents.shift();
            }
            const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
            const firstEvent = recentWheelEvents[0];
            recentWheelEvents.push(newEvent);
            if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
              recentWheelEvents.splice(0);
            } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
              const snapToThreshold = delta > 0 ? 0.8 : 0.2;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              timeout = nextTick(() => {
                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
              }, 0);
            }
            if (!timeout) {
              timeout = nextTick(() => {
                const snapToThreshold = 0.5;
                lastEventBeforeSnap = newEvent;
                recentWheelEvents.splice(0);
                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
              }, 500);
            }
          }
          if (!ignoreWheelEvents)
            emit("scroll", e4);
          if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction)
            swiper.autoplay.stop();
          if (position === swiper.minTranslate() || position === swiper.maxTranslate())
            return true;
        }
      }
      if (e4.preventDefault)
        e4.preventDefault();
      else
        e4.returnValue = false;
      return false;
    }
    function events2(method) {
      let targetEl = swiper.el;
      if (swiper.params.mousewheel.eventsTarget !== "container") {
        targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
      }
      targetEl[method]("mouseenter", handleMouseEnter);
      targetEl[method]("mouseleave", handleMouseLeave);
      targetEl[method]("wheel", handle);
    }
    function enable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener("wheel", handle);
        return true;
      }
      if (swiper.mousewheel.enabled)
        return false;
      events2("addEventListener");
      swiper.mousewheel.enabled = true;
      return true;
    }
    function disable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, handle);
        return true;
      }
      if (!swiper.mousewheel.enabled)
        return false;
      events2("removeEventListener");
      swiper.mousewheel.enabled = false;
      return true;
    }
    on("init", () => {
      if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
        disable();
      }
      if (swiper.params.mousewheel.enabled)
        enable();
    });
    on("destroy", () => {
      if (swiper.params.cssMode) {
        enable();
      }
      if (swiper.mousewheel.enabled)
        disable();
    });
    Object.assign(swiper.mousewheel, {
      enable,
      disable
    });
  }

  // node_modules/swiper/shared/create-element-if-not-defined.mjs
  function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
    if (swiper.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
          if (!element) {
            element = createElement("div", checkProps[key]);
            element.className = checkProps[key];
            swiper.el.append(element);
          }
          params[key] = element;
          originalParams[key] = element;
        }
      });
    }
    return params;
  }

  // node_modules/swiper/modules/navigation.mjs
  function Navigation(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null
    };
    const makeElementsArray = (el) => {
      if (!Array.isArray(el))
        el = [el].filter((e4) => !!e4);
      return el;
    };
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper.isElement) {
        res = swiper.el.querySelector(el);
        if (res)
          return res;
      }
      if (el) {
        if (typeof el === "string")
          res = [...document.querySelectorAll(el)];
        if (swiper.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
          res = swiper.el.querySelector(el);
        }
      }
      if (el && !res)
        return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
          if (subEl.tagName === "BUTTON")
            subEl.disabled = disabled;
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
          }
        }
      });
    }
    function update2() {
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }
    function onPrevClick(e4) {
      e4.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e4) {
      e4.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slideNext();
      emit("navigationNext");
    }
    function init() {
      const params = swiper.params.navigation;
      swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      if (!(params.nextEl || params.prevEl))
        return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        }
        if (!swiper.enabled && el) {
          el.classList.add(...params.lockClass.split(" "));
        }
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper.params.navigation.enabled === false) {
        disable();
      } else {
        init();
        update2();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList[swiper.enabled ? "remove" : "add"](swiper.params.navigation.lockClass));
    });
    on("click", (_s, e4) => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e4.target;
      if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
        if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
          return;
        let isHidden;
        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        }
        if (isHidden === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
      init();
      update2();
    };
    const disable = () => {
      swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
      destroy();
    };
    Object.assign(swiper.navigation, {
      enable,
      disable,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/swiper/shared/classes-to-selector.mjs
  function classesToSelector(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
  }

  // node_modules/swiper/modules/pagination.mjs
  function Pagination(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const pfx = "swiper-pagination";
    extendParams({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: "bullets",
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: (number) => number,
        formatFractionTotal: (number) => number,
        bulletClass: `${pfx}-bullet`,
        bulletActiveClass: `${pfx}-bullet-active`,
        modifierClass: `${pfx}-`,
        currentClass: `${pfx}-current`,
        totalClass: `${pfx}-total`,
        hiddenClass: `${pfx}-hidden`,
        progressbarFillClass: `${pfx}-progressbar-fill`,
        progressbarOppositeClass: `${pfx}-progressbar-opposite`,
        clickableClass: `${pfx}-clickable`,
        lockClass: `${pfx}-lock`,
        horizontalClass: `${pfx}-horizontal`,
        verticalClass: `${pfx}-vertical`,
        paginationDisabledClass: `${pfx}-disabled`
      }
    });
    swiper.pagination = {
      el: null,
      bullets: []
    };
    let bulletSize;
    let dynamicBulletIndex = 0;
    const makeElementsArray = (el) => {
      if (!Array.isArray(el))
        el = [el].filter((e4) => !!e4);
      return el;
    };
    function isPaginationDisabled() {
      return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
    }
    function setSideBullets(bulletEl, position) {
      const {
        bulletActiveClass
      } = swiper.params.pagination;
      if (!bulletEl)
        return;
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}`);
        bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
        if (bulletEl) {
          bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
        }
      }
    }
    function onBulletClick(e4) {
      const bulletEl = e4.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
      if (!bulletEl) {
        return;
      }
      e4.preventDefault();
      const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
      if (swiper.params.loop) {
        if (swiper.realIndex === index)
          return;
        const newSlideIndex = swiper.getSlideIndexByData(index);
        const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
        if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
          swiper.loopFix({
            direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
            activeSlideIndex: newSlideIndex,
            slideTo: false
          });
        }
        swiper.slideToLoop(index);
      } else {
        swiper.slideTo(index);
      }
    }
    function update2() {
      const rtl = swiper.rtl;
      const params = swiper.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      let current;
      let previousIndex;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        previousIndex = swiper.previousRealIndex || 0;
        current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
      } else if (typeof swiper.snapIndex !== "undefined") {
        current = swiper.snapIndex;
        previousIndex = swiper.previousSnapIndex;
      } else {
        previousIndex = swiper.previousIndex || 0;
        current = swiper.activeIndex || 0;
      }
      if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        const bullets = swiper.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;
        if (params.dynamicBullets) {
          bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
          el.forEach((subEl) => {
            subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
          });
          if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
            dynamicBulletIndex += current - (previousIndex || 0);
            if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (dynamicBulletIndex < 0) {
              dynamicBulletIndex = 0;
            }
          }
          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.forEach((bulletEl) => {
          const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s5) => typeof s5 === "string" && s5.includes(" ") ? s5.split(" ") : s5).flat();
          bulletEl.classList.remove(...classesToRemove);
        });
        if (el.length > 1) {
          bullets.forEach((bullet) => {
            const bulletIndex = elementIndex(bullet);
            if (bulletIndex === current) {
              bullet.classList.add(...params.bulletActiveClass.split(" "));
            } else if (swiper.isElement) {
              bullet.setAttribute("part", "bullet");
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
              }
              if (bulletIndex === firstIndex) {
                setSideBullets(bullet, "prev");
              }
              if (bulletIndex === lastIndex) {
                setSideBullets(bullet, "next");
              }
            }
          });
        } else {
          const bullet = bullets[current];
          if (bullet) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          }
          if (swiper.isElement) {
            bullets.forEach((bulletEl, bulletIndex) => {
              bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
            });
          }
          if (params.dynamicBullets) {
            const firstDisplayedBullet = bullets[firstIndex];
            const lastDisplayedBullet = bullets[lastIndex];
            for (let i4 = firstIndex; i4 <= lastIndex; i4 += 1) {
              if (bullets[i4]) {
                bullets[i4].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
              }
            }
            setSideBullets(firstDisplayedBullet, "prev");
            setSideBullets(lastDisplayedBullet, "next");
          }
        }
        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
          const offsetProp = rtl ? "right" : "left";
          bullets.forEach((bullet) => {
            bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
          });
        }
      }
      el.forEach((subEl, subElIndex) => {
        if (params.type === "fraction") {
          subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
            fractionEl.textContent = params.formatFractionCurrent(current + 1);
          });
          subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
            totalEl.textContent = params.formatFractionTotal(total);
          });
        }
        if (params.type === "progressbar") {
          let progressbarDirection;
          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
          } else {
            progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
          }
          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;
          if (progressbarDirection === "horizontal") {
            scaleX = scale;
          } else {
            scaleY = scale;
          }
          subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
            progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
            progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
          });
        }
        if (params.type === "custom" && params.renderCustom) {
          subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
          if (subElIndex === 0)
            emit("paginationRender", subEl);
        } else {
          if (subElIndex === 0)
            emit("paginationRender", subEl);
          emit("paginationUpdate", subEl);
        }
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
        }
      });
    }
    function render() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled())
        return;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      let paginationHTML = "";
      if (params.type === "bullets") {
        let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
          numberOfBullets = slidesLength;
        }
        for (let i4 = 0; i4 < numberOfBullets; i4 += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i4, params.bulletClass);
          } else {
            paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
          }
        }
      }
      if (params.type === "fraction") {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
        }
      }
      if (params.type === "progressbar") {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        }
      }
      swiper.pagination.bullets = [];
      el.forEach((subEl) => {
        if (params.type !== "custom") {
          subEl.innerHTML = paginationHTML || "";
        }
        if (params.type === "bullets") {
          swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
        }
      });
      if (params.type !== "custom") {
        emit("paginationRender", el[0]);
      }
    }
    function init() {
      swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
        el: "swiper-pagination"
      });
      const params = swiper.params.pagination;
      if (!params.el)
        return;
      let el;
      if (typeof params.el === "string" && swiper.isElement) {
        el = swiper.el.querySelector(params.el);
      }
      if (!el && typeof params.el === "string") {
        el = [...document.querySelectorAll(params.el)];
      }
      if (!el) {
        el = params.el;
      }
      if (!el || el.length === 0)
        return;
      if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
        el = [...swiper.el.querySelectorAll(params.el)];
        if (el.length > 1) {
          el = el.filter((subEl) => {
            if (elementParents(subEl, ".swiper")[0] !== swiper.el)
              return false;
            return true;
          })[0];
        }
      }
      if (Array.isArray(el) && el.length === 1)
        el = el[0];
      Object.assign(swiper.pagination, {
        el
      });
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (params.type === "bullets" && params.clickable) {
          subEl.classList.add(params.clickableClass);
        }
        subEl.classList.add(params.modifierClass + params.type);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.type === "bullets" && params.dynamicBullets) {
          subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }
        if (params.type === "progressbar" && params.progressbarOpposite) {
          subEl.classList.add(params.progressbarOppositeClass);
        }
        if (params.clickable) {
          subEl.addEventListener("click", onBulletClick);
        }
        if (!swiper.enabled) {
          subEl.classList.add(params.lockClass);
        }
      });
    }
    function destroy() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper.pagination.el;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          subEl.classList.remove(params.hiddenClass);
          subEl.classList.remove(params.modifierClass + params.type);
          subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
          if (params.clickable) {
            subEl.removeEventListener("click", onBulletClick);
          }
        });
      }
      if (swiper.pagination.bullets)
        swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
    }
    on("changeDirection", () => {
      if (!swiper.pagination || !swiper.pagination.el)
        return;
      const params = swiper.params.pagination;
      let {
        el
      } = swiper.pagination;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params.horizontalClass, params.verticalClass);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      });
    });
    on("init", () => {
      if (swiper.params.pagination.enabled === false) {
        disable();
      } else {
        init();
        render();
        update2();
      }
    });
    on("activeIndexChange", () => {
      if (typeof swiper.snapIndex === "undefined") {
        update2();
      }
    });
    on("snapIndexChange", () => {
      update2();
    });
    on("snapGridLengthChange", () => {
      render();
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
      }
    });
    on("lock unlock", () => {
      update2();
    });
    on("click", (_s, e4) => {
      const targetEl = e4.target;
      const el = makeElementsArray(swiper.pagination.el);
      if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
        if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
          return;
        const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
        if (isHidden === true) {
          emit("paginationShow");
        } else {
          emit("paginationHide");
        }
        el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
      }
      init();
      render();
      update2();
    };
    const disable = () => {
      swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
      }
      destroy();
    };
    Object.assign(swiper.pagination, {
      enable,
      disable,
      render,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/swiper/modules/scrollbar.mjs
  function Scrollbar(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const document2 = getDocument();
    let isTouched = false;
    let timeout = null;
    let dragTimeout = null;
    let dragStartPos;
    let dragSize;
    let trackSize;
    let divider;
    extendParams({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: `swiper-scrollbar-horizontal`,
        verticalClass: `swiper-scrollbar-vertical`
      }
    });
    swiper.scrollbar = {
      el: null,
      dragEl: null
    };
    function setTranslate2() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper;
      const {
        dragEl,
        el
      } = scrollbar;
      const params = swiper.params.scrollbar;
      const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
      let newSize = dragSize;
      let newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
        dragEl.style.width = `${newSize}px`;
      } else {
        dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
        dragEl.style.height = `${newSize}px`;
      }
      if (params.hide) {
        clearTimeout(timeout);
        el.style.opacity = 1;
        timeout = setTimeout(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = "400ms";
        }, 1e3);
      }
    }
    function setTransition2(duration) {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
    }
    function updateSize2() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      const {
        scrollbar
      } = swiper;
      const {
        dragEl,
        el
      } = scrollbar;
      dragEl.style.width = "";
      dragEl.style.height = "";
      trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
      divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
      if (swiper.params.scrollbar.dragSize === "auto") {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }
      if (swiper.isHorizontal()) {
        dragEl.style.width = `${dragSize}px`;
      } else {
        dragEl.style.height = `${dragSize}px`;
      }
      if (divider >= 1) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
      if (swiper.params.scrollbar.hide) {
        el.style.opacity = 0;
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        scrollbar.el.classList[swiper.isLocked ? "add" : "remove"](swiper.params.scrollbar.lockClass);
      }
    }
    function getPointerPosition(e4) {
      return swiper.isHorizontal() ? e4.clientX : e4.clientY;
    }
    function setDragPosition(e4) {
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper;
      const {
        el
      } = scrollbar;
      let positionRatio;
      positionRatio = (getPointerPosition(e4) - elementOffset(el)[swiper.isHorizontal() ? "left" : "top"] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }
      const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    function onDragStart(e4) {
      const params = swiper.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el,
        dragEl
      } = scrollbar;
      isTouched = true;
      dragStartPos = e4.target === dragEl ? getPointerPosition(e4) - e4.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"] : null;
      e4.preventDefault();
      e4.stopPropagation();
      wrapperEl.style.transitionDuration = "100ms";
      dragEl.style.transitionDuration = "100ms";
      setDragPosition(e4);
      clearTimeout(dragTimeout);
      el.style.transitionDuration = "0ms";
      if (params.hide) {
        el.style.opacity = 1;
      }
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style["scroll-snap-type"] = "none";
      }
      emit("scrollbarDragStart", e4);
    }
    function onDragMove(e4) {
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el,
        dragEl
      } = scrollbar;
      if (!isTouched)
        return;
      if (e4.preventDefault)
        e4.preventDefault();
      else
        e4.returnValue = false;
      setDragPosition(e4);
      wrapperEl.style.transitionDuration = "0ms";
      el.style.transitionDuration = "0ms";
      dragEl.style.transitionDuration = "0ms";
      emit("scrollbarDragMove", e4);
    }
    function onDragEnd(e4) {
      const params = swiper.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el
      } = scrollbar;
      if (!isTouched)
        return;
      isTouched = false;
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style["scroll-snap-type"] = "";
        wrapperEl.style.transitionDuration = "";
      }
      if (params.hide) {
        clearTimeout(dragTimeout);
        dragTimeout = nextTick(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = "400ms";
        }, 1e3);
      }
      emit("scrollbarDragEnd", e4);
      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    }
    function events2(method) {
      const {
        scrollbar,
        params
      } = swiper;
      const el = scrollbar.el;
      if (!el)
        return;
      const target = el;
      const activeListener = params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      const passiveListener = params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      if (!target)
        return;
      const eventMethod = method === "on" ? "addEventListener" : "removeEventListener";
      target[eventMethod]("pointerdown", onDragStart, activeListener);
      document2[eventMethod]("pointermove", onDragMove, activeListener);
      document2[eventMethod]("pointerup", onDragEnd, passiveListener);
    }
    function enableDraggable() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      events2("on");
    }
    function disableDraggable() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el)
        return;
      events2("off");
    }
    function init() {
      const {
        scrollbar,
        el: swiperEl
      } = swiper;
      swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
        el: "swiper-scrollbar"
      });
      const params = swiper.params.scrollbar;
      if (!params.el)
        return;
      let el;
      if (typeof params.el === "string" && swiper.isElement) {
        el = swiper.el.querySelector(params.el);
      }
      if (!el && typeof params.el === "string") {
        el = document2.querySelectorAll(params.el);
      } else if (!el) {
        el = params.el;
      }
      if (swiper.params.uniqueNavElements && typeof params.el === "string" && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
        el = swiperEl.querySelector(params.el);
      }
      if (el.length > 0)
        el = el[0];
      el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      let dragEl;
      if (el) {
        dragEl = el.querySelector(`.${swiper.params.scrollbar.dragClass}`);
        if (!dragEl) {
          dragEl = createElement("div", swiper.params.scrollbar.dragClass);
          el.append(dragEl);
        }
      }
      Object.assign(scrollbar, {
        el,
        dragEl
      });
      if (params.draggable) {
        enableDraggable();
      }
      if (el) {
        el.classList[swiper.enabled ? "remove" : "add"](swiper.params.scrollbar.lockClass);
      }
    }
    function destroy() {
      const params = swiper.params.scrollbar;
      const el = swiper.scrollbar.el;
      if (el) {
        el.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      }
      disableDraggable();
    }
    on("init", () => {
      if (swiper.params.scrollbar.enabled === false) {
        disable();
      } else {
        init();
        updateSize2();
        setTranslate2();
      }
    });
    on("update resize observerUpdate lock unlock", () => {
      updateSize2();
    });
    on("setTranslate", () => {
      setTranslate2();
    });
    on("setTransition", (_s, duration) => {
      setTransition2(duration);
    });
    on("enable disable", () => {
      const {
        el
      } = swiper.scrollbar;
      if (el) {
        el.classList[swiper.enabled ? "remove" : "add"](swiper.params.scrollbar.lockClass);
      }
    });
    on("destroy", () => {
      destroy();
    });
    const enable = () => {
      swiper.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
      if (swiper.scrollbar.el) {
        swiper.scrollbar.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
      }
      init();
      updateSize2();
      setTranslate2();
    };
    const disable = () => {
      swiper.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
      if (swiper.scrollbar.el) {
        swiper.scrollbar.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
      }
      destroy();
    };
    Object.assign(swiper.scrollbar, {
      enable,
      disable,
      updateSize: updateSize2,
      setTranslate: setTranslate2,
      init,
      destroy
    });
  }

  // node_modules/swiper/modules/parallax.mjs
  function Parallax(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      parallax: {
        enabled: false
      }
    });
    const setTransform = (el, progress) => {
      const {
        rtl
      } = swiper;
      const rtlFactor = rtl ? -1 : 1;
      const p4 = el.getAttribute("data-swiper-parallax") || "0";
      let x2 = el.getAttribute("data-swiper-parallax-x");
      let y3 = el.getAttribute("data-swiper-parallax-y");
      const scale = el.getAttribute("data-swiper-parallax-scale");
      const opacity = el.getAttribute("data-swiper-parallax-opacity");
      const rotate = el.getAttribute("data-swiper-parallax-rotate");
      if (x2 || y3) {
        x2 = x2 || "0";
        y3 = y3 || "0";
      } else if (swiper.isHorizontal()) {
        x2 = p4;
        y3 = "0";
      } else {
        y3 = p4;
        x2 = "0";
      }
      if (x2.indexOf("%") >= 0) {
        x2 = `${parseInt(x2, 10) * progress * rtlFactor}%`;
      } else {
        x2 = `${x2 * progress * rtlFactor}px`;
      }
      if (y3.indexOf("%") >= 0) {
        y3 = `${parseInt(y3, 10) * progress}%`;
      } else {
        y3 = `${y3 * progress}px`;
      }
      if (typeof opacity !== "undefined" && opacity !== null) {
        const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
        el.style.opacity = currentOpacity;
      }
      let transform = `translate3d(${x2}, ${y3}, 0px)`;
      if (typeof scale !== "undefined" && scale !== null) {
        const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
        transform += ` scale(${currentScale})`;
      }
      if (rotate && typeof rotate !== "undefined" && rotate !== null) {
        const currentRotate = rotate * progress * -1;
        transform += ` rotate(${currentRotate}deg)`;
      }
      el.style.transform = transform;
    };
    const setTranslate2 = () => {
      const {
        el,
        slides,
        progress,
        snapGrid
      } = swiper;
      elementChildren(el, "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((subEl) => {
        setTransform(subEl, progress);
      });
      slides.forEach((slideEl, slideIndex) => {
        let slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== "auto") {
          slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        slideEl.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach((subEl) => {
          setTransform(subEl, slideProgress);
        });
      });
    };
    const setTransition2 = function(duration) {
      if (duration === void 0) {
        duration = swiper.params.speed;
      }
      const {
        el
      } = swiper;
      el.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((parallaxEl) => {
        let parallaxDuration = parseInt(parallaxEl.getAttribute("data-swiper-parallax-duration"), 10) || duration;
        if (duration === 0)
          parallaxDuration = 0;
        parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
      });
    };
    on("beforeInit", () => {
      if (!swiper.params.parallax.enabled)
        return;
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    });
    on("init", () => {
      if (!swiper.params.parallax.enabled)
        return;
      setTranslate2();
    });
    on("setTranslate", () => {
      if (!swiper.params.parallax.enabled)
        return;
      setTranslate2();
    });
    on("setTransition", (_swiper, duration) => {
      if (!swiper.params.parallax.enabled)
        return;
      setTransition2(duration);
    });
  }

  // node_modules/swiper/modules/zoom.mjs
  function Zoom(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    extendParams({
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed"
      }
    });
    swiper.zoom = {
      enabled: false
    };
    let currentScale = 1;
    let isScaling = false;
    let fakeGestureTouched;
    let fakeGestureMoved;
    const evCache = [];
    const gesture = {
      originX: 0,
      originY: 0,
      slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      imageEl: void 0,
      imageWrapEl: void 0,
      maxRatio: 3
    };
    const image = {
      isTouched: void 0,
      isMoved: void 0,
      currentX: void 0,
      currentY: void 0,
      minX: void 0,
      minY: void 0,
      maxX: void 0,
      maxY: void 0,
      width: void 0,
      height: void 0,
      startX: void 0,
      startY: void 0,
      touchesStart: {},
      touchesCurrent: {}
    };
    const velocity = {
      x: void 0,
      y: void 0,
      prevPositionX: void 0,
      prevPositionY: void 0,
      prevTime: void 0
    };
    let scale = 1;
    Object.defineProperty(swiper.zoom, "scale", {
      get() {
        return scale;
      },
      set(value) {
        if (scale !== value) {
          const imageEl = gesture.imageEl;
          const slideEl = gesture.slideEl;
          emit("zoomChange", value, imageEl, slideEl);
        }
        scale = value;
      }
    });
    function getDistanceBetweenTouches() {
      if (evCache.length < 2)
        return 1;
      const x1 = evCache[0].pageX;
      const y1 = evCache[0].pageY;
      const x2 = evCache[1].pageX;
      const y22 = evCache[1].pageY;
      const distance = Math.sqrt((x2 - x1) ** 2 + (y22 - y1) ** 2);
      return distance;
    }
    function getScaleOrigin() {
      if (evCache.length < 2)
        return {
          x: null,
          y: null
        };
      const box = gesture.imageEl.getBoundingClientRect();
      return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y) / currentScale];
    }
    function getSlideSelector() {
      return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
    }
    function eventWithinSlide(e4) {
      const slideSelector = getSlideSelector();
      if (e4.target.matches(slideSelector))
        return true;
      if (swiper.slides.filter((slideEl) => slideEl.contains(e4.target)).length > 0)
        return true;
      return false;
    }
    function eventWithinZoomContainer(e4) {
      const selector = `.${swiper.params.zoom.containerClass}`;
      if (e4.target.matches(selector))
        return true;
      if ([...swiper.el.querySelectorAll(selector)].filter((containerEl) => containerEl.contains(e4.target)).length > 0)
        return true;
      return false;
    }
    function onGestureStart(e4) {
      if (e4.pointerType === "mouse") {
        evCache.splice(0, evCache.length);
      }
      if (!eventWithinSlide(e4))
        return;
      const params = swiper.params.zoom;
      fakeGestureTouched = false;
      fakeGestureMoved = false;
      evCache.push(e4);
      if (evCache.length < 2) {
        return;
      }
      fakeGestureTouched = true;
      gesture.scaleStart = getDistanceBetweenTouches();
      if (!gesture.slideEl) {
        gesture.slideEl = e4.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
        if (!gesture.slideEl)
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
        if (imageEl) {
          imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
        }
        gesture.imageEl = imageEl;
        if (imageEl) {
          gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
        } else {
          gesture.imageWrapEl = void 0;
        }
        if (!gesture.imageWrapEl) {
          gesture.imageEl = void 0;
          return;
        }
        gesture.maxRatio = gesture.imageWrapEl.getAttribute("data-swiper-zoom") || params.maxRatio;
      }
      if (gesture.imageEl) {
        const [originX, originY] = getScaleOrigin();
        gesture.originX = originX;
        gesture.originY = originY;
        gesture.imageEl.style.transitionDuration = "0ms";
      }
      isScaling = true;
    }
    function onGestureChange(e4) {
      if (!eventWithinSlide(e4))
        return;
      const params = swiper.params.zoom;
      const zoom = swiper.zoom;
      const pointerIndex = evCache.findIndex((cachedEv) => cachedEv.pointerId === e4.pointerId);
      if (pointerIndex >= 0)
        evCache[pointerIndex] = e4;
      if (evCache.length < 2) {
        return;
      }
      fakeGestureMoved = true;
      gesture.scaleMove = getDistanceBetweenTouches();
      if (!gesture.imageEl) {
        return;
      }
      zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
      }
      gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    }
    function onGestureEnd(e4) {
      if (!eventWithinSlide(e4))
        return;
      if (e4.pointerType === "mouse" && e4.type === "pointerout")
        return;
      const params = swiper.params.zoom;
      const zoom = swiper.zoom;
      const pointerIndex = evCache.findIndex((cachedEv) => cachedEv.pointerId === e4.pointerId);
      if (pointerIndex >= 0)
        evCache.splice(pointerIndex, 1);
      if (!fakeGestureTouched || !fakeGestureMoved) {
        return;
      }
      fakeGestureTouched = false;
      fakeGestureMoved = false;
      if (!gesture.imageEl)
        return;
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
      gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
      currentScale = zoom.scale;
      isScaling = false;
      if (zoom.scale > 1 && gesture.slideEl) {
        gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
      } else if (zoom.scale <= 1 && gesture.slideEl) {
        gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
      }
      if (zoom.scale === 1) {
        gesture.originX = 0;
        gesture.originY = 0;
        gesture.slideEl = void 0;
      }
    }
    function onTouchStart2(e4) {
      const device = swiper.device;
      if (!gesture.imageEl)
        return;
      if (image.isTouched)
        return;
      if (device.android && e4.cancelable)
        e4.preventDefault();
      image.isTouched = true;
      const event2 = evCache.length > 0 ? evCache[0] : e4;
      image.touchesStart.x = event2.pageX;
      image.touchesStart.y = event2.pageY;
    }
    function onTouchMove2(e4) {
      if (!eventWithinSlide(e4) || !eventWithinZoomContainer(e4))
        return;
      const zoom = swiper.zoom;
      if (!gesture.imageEl)
        return;
      if (!image.isTouched || !gesture.slideEl)
        return;
      if (!image.isMoved) {
        image.width = gesture.imageEl.offsetWidth;
        image.height = gesture.imageEl.offsetHeight;
        image.startX = getTranslate(gesture.imageWrapEl, "x") || 0;
        image.startY = getTranslate(gesture.imageWrapEl, "y") || 0;
        gesture.slideWidth = gesture.slideEl.offsetWidth;
        gesture.slideHeight = gesture.slideEl.offsetHeight;
        gesture.imageWrapEl.style.transitionDuration = "0ms";
      }
      const scaledWidth = image.width * zoom.scale;
      const scaledHeight = image.height * zoom.scale;
      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight)
        return;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e4.pageX;
      image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e4.pageY;
      const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
      if (touchesDiff > 5) {
        swiper.allowClick = false;
      }
      if (!image.isMoved && !isScaling) {
        if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
          image.isTouched = false;
          return;
        }
        if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
          image.isTouched = false;
          return;
        }
      }
      if (e4.cancelable) {
        e4.preventDefault();
      }
      e4.stopPropagation();
      image.isMoved = true;
      const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
      const {
        originX,
        originY
      } = gesture;
      image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
      image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
      if (image.currentX < image.minX) {
        image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
      }
      if (image.currentX > image.maxX) {
        image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
      }
      if (image.currentY < image.minY) {
        image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
      }
      if (image.currentY > image.maxY) {
        image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
      }
      if (!velocity.prevPositionX)
        velocity.prevPositionX = image.touchesCurrent.x;
      if (!velocity.prevPositionY)
        velocity.prevPositionY = image.touchesCurrent.y;
      if (!velocity.prevTime)
        velocity.prevTime = Date.now();
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2)
        velocity.x = 0;
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2)
        velocity.y = 0;
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();
      gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
    }
    function onTouchEnd2() {
      const zoom = swiper.zoom;
      if (!gesture.imageEl)
        return;
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      let momentumDurationX = 300;
      let momentumDurationY = 300;
      const momentumDistanceX = velocity.x * momentumDurationX;
      const newPositionX = image.currentX + momentumDistanceX;
      const momentumDistanceY = velocity.y * momentumDurationY;
      const newPositionY = image.currentY + momentumDistanceY;
      if (velocity.x !== 0)
        momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
      if (velocity.y !== 0)
        momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
      const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
      image.currentX = newPositionX;
      image.currentY = newPositionY;
      const scaledWidth = image.width * zoom.scale;
      const scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
      gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
      gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
    }
    function onTransitionEnd() {
      const zoom = swiper.zoom;
      if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
        if (gesture.imageEl) {
          gesture.imageEl.style.transform = "translate3d(0,0,0) scale(1)";
        }
        if (gesture.imageWrapEl) {
          gesture.imageWrapEl.style.transform = "translate3d(0,0,0)";
        }
        gesture.slideEl.classList.remove(`${swiper.params.zoom.zoomedSlideClass}`);
        zoom.scale = 1;
        currentScale = 1;
        gesture.slideEl = void 0;
        gesture.imageEl = void 0;
        gesture.imageWrapEl = void 0;
        gesture.originX = 0;
        gesture.originY = 0;
      }
    }
    function zoomIn(e4) {
      const zoom = swiper.zoom;
      const params = swiper.params.zoom;
      if (!gesture.slideEl) {
        if (e4 && e4.target) {
          gesture.slideEl = e4.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
        }
        if (!gesture.slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
          } else {
            gesture.slideEl = swiper.slides[swiper.activeIndex];
          }
        }
        let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
        if (imageEl) {
          imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
        }
        gesture.imageEl = imageEl;
        if (imageEl) {
          gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
        } else {
          gesture.imageWrapEl = void 0;
        }
      }
      if (!gesture.imageEl || !gesture.imageWrapEl)
        return;
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.touchAction = "none";
      }
      gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
      let touchX;
      let touchY;
      let offsetX;
      let offsetY;
      let diffX;
      let diffY;
      let translateX;
      let translateY;
      let imageWidth;
      let imageHeight;
      let scaledWidth;
      let scaledHeight;
      let translateMinX;
      let translateMinY;
      let translateMaxX;
      let translateMaxY;
      let slideWidth;
      let slideHeight;
      if (typeof image.touchesStart.x === "undefined" && e4) {
        touchX = e4.pageX;
        touchY = e4.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }
      const forceZoomRatio = typeof e4 === "number" ? e4 : null;
      if (currentScale === 1 && forceZoomRatio) {
        touchX = void 0;
        touchY = void 0;
      }
      zoom.scale = forceZoomRatio || gesture.imageWrapEl.getAttribute("data-swiper-zoom") || params.maxRatio;
      currentScale = forceZoomRatio || gesture.imageWrapEl.getAttribute("data-swiper-zoom") || params.maxRatio;
      if (e4 && !(currentScale === 1 && forceZoomRatio)) {
        slideWidth = gesture.slideEl.offsetWidth;
        slideHeight = gesture.slideEl.offsetHeight;
        offsetX = elementOffset(gesture.slideEl).left + window2.scrollX;
        offsetY = elementOffset(gesture.slideEl).top + window2.scrollY;
        diffX = offsetX + slideWidth / 2 - touchX;
        diffY = offsetY + slideHeight / 2 - touchY;
        imageWidth = gesture.imageEl.offsetWidth;
        imageHeight = gesture.imageEl.offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;
        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;
        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }
        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      if (forceZoomRatio && zoom.scale === 1) {
        gesture.originX = 0;
        gesture.originY = 0;
      }
      gesture.imageWrapEl.style.transitionDuration = "300ms";
      gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
      gesture.imageEl.style.transitionDuration = "300ms";
      gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    }
    function zoomOut() {
      const zoom = swiper.zoom;
      const params = swiper.params.zoom;
      if (!gesture.slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
        } else {
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        }
        let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
        if (imageEl) {
          imageEl = imageEl.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0];
        }
        gesture.imageEl = imageEl;
        if (imageEl) {
          gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
        } else {
          gesture.imageWrapEl = void 0;
        }
      }
      if (!gesture.imageEl || !gesture.imageWrapEl)
        return;
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.style.touchAction = "";
      }
      zoom.scale = 1;
      currentScale = 1;
      gesture.imageWrapEl.style.transitionDuration = "300ms";
      gesture.imageWrapEl.style.transform = "translate3d(0,0,0)";
      gesture.imageEl.style.transitionDuration = "300ms";
      gesture.imageEl.style.transform = "translate3d(0,0,0) scale(1)";
      gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
      gesture.slideEl = void 0;
      gesture.originX = 0;
      gesture.originY = 0;
    }
    function zoomToggle(e4) {
      const zoom = swiper.zoom;
      if (zoom.scale && zoom.scale !== 1) {
        zoomOut();
      } else {
        zoomIn(e4);
      }
    }
    function getListeners() {
      const passiveListener = swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      const activeListenerWithCapture = swiper.params.passiveListeners ? {
        passive: false,
        capture: true
      } : true;
      return {
        passiveListener,
        activeListenerWithCapture
      };
    }
    function enable() {
      const zoom = swiper.zoom;
      if (zoom.enabled)
        return;
      zoom.enabled = true;
      const {
        passiveListener,
        activeListenerWithCapture
      } = getListeners();
      swiper.wrapperEl.addEventListener("pointerdown", onGestureStart, passiveListener);
      swiper.wrapperEl.addEventListener("pointermove", onGestureChange, activeListenerWithCapture);
      ["pointerup", "pointercancel", "pointerout"].forEach((eventName) => {
        swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
      });
      swiper.wrapperEl.addEventListener("pointermove", onTouchMove2, activeListenerWithCapture);
    }
    function disable() {
      const zoom = swiper.zoom;
      if (!zoom.enabled)
        return;
      zoom.enabled = false;
      const {
        passiveListener,
        activeListenerWithCapture
      } = getListeners();
      swiper.wrapperEl.removeEventListener("pointerdown", onGestureStart, passiveListener);
      swiper.wrapperEl.removeEventListener("pointermove", onGestureChange, activeListenerWithCapture);
      ["pointerup", "pointercancel", "pointerout"].forEach((eventName) => {
        swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
      });
      swiper.wrapperEl.removeEventListener("pointermove", onTouchMove2, activeListenerWithCapture);
    }
    on("init", () => {
      if (swiper.params.zoom.enabled) {
        enable();
      }
    });
    on("destroy", () => {
      disable();
    });
    on("touchStart", (_s, e4) => {
      if (!swiper.zoom.enabled)
        return;
      onTouchStart2(e4);
    });
    on("touchEnd", (_s, e4) => {
      if (!swiper.zoom.enabled)
        return;
      onTouchEnd2();
    });
    on("doubleTap", (_s, e4) => {
      if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
        zoomToggle(e4);
      }
    });
    on("transitionEnd", () => {
      if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
        onTransitionEnd();
      }
    });
    on("slideChange", () => {
      if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
        onTransitionEnd();
      }
    });
    Object.assign(swiper.zoom, {
      enable,
      disable,
      in: zoomIn,
      out: zoomOut,
      toggle: zoomToggle
    });
  }

  // node_modules/swiper/modules/controller.mjs
  function Controller(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      controller: {
        control: void 0,
        inverse: false,
        by: "slide"
        // or 'container'
      }
    });
    swiper.controller = {
      control: void 0
    };
    function LinearSpline(x2, y3) {
      const binarySearch = /* @__PURE__ */ function search() {
        let maxIndex;
        let minIndex;
        let guess;
        return (array, val) => {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }();
      this.x = x2;
      this.y = y3;
      this.lastIndex = x2.length - 1;
      let i1;
      let i32;
      this.interpolate = function interpolate(x22) {
        if (!x22)
          return 0;
        i32 = binarySearch(this.x, x22);
        i1 = i32 - 1;
        return (x22 - this.x[i1]) * (this.y[i32] - this.y[i1]) / (this.x[i32] - this.x[i1]) + this.y[i1];
      };
      return this;
    }
    function getInterpolateFunction(c5) {
      swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c5.slidesGrid) : new LinearSpline(swiper.snapGrid, c5.snapGrid);
    }
    function setTranslate2(_t, byController) {
      const controlled = swiper.controller.control;
      let multiplier;
      let controlledTranslate;
      const Swiper2 = swiper.constructor;
      function setControlledTranslate(c5) {
        if (c5.destroyed)
          return;
        const translate2 = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === "slide") {
          getInterpolateFunction(c5);
          controlledTranslate = -swiper.controller.spline.interpolate(-translate2);
        }
        if (!controlledTranslate || swiper.params.controller.by === "container") {
          multiplier = (c5.maxTranslate() - c5.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
            multiplier = 1;
          }
          controlledTranslate = (translate2 - swiper.minTranslate()) * multiplier + c5.minTranslate();
        }
        if (swiper.params.controller.inverse) {
          controlledTranslate = c5.maxTranslate() - controlledTranslate;
        }
        c5.updateProgress(controlledTranslate);
        c5.setTranslate(controlledTranslate, swiper);
        c5.updateActiveIndex();
        c5.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (let i4 = 0; i4 < controlled.length; i4 += 1) {
          if (controlled[i4] !== byController && controlled[i4] instanceof Swiper2) {
            setControlledTranslate(controlled[i4]);
          }
        }
      } else if (controlled instanceof Swiper2 && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    }
    function setTransition2(duration, byController) {
      const Swiper2 = swiper.constructor;
      const controlled = swiper.controller.control;
      let i4;
      function setControlledTransition(c5) {
        if (c5.destroyed)
          return;
        c5.setTransition(duration, swiper);
        if (duration !== 0) {
          c5.transitionStart();
          if (c5.params.autoHeight) {
            nextTick(() => {
              c5.updateAutoHeight();
            });
          }
          elementTransitionEnd(c5.wrapperEl, () => {
            if (!controlled)
              return;
            c5.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i4 = 0; i4 < controlled.length; i4 += 1) {
          if (controlled[i4] !== byController && controlled[i4] instanceof Swiper2) {
            setControlledTransition(controlled[i4]);
          }
        }
      } else if (controlled instanceof Swiper2 && byController !== controlled) {
        setControlledTransition(controlled);
      }
    }
    function removeSpline() {
      if (!swiper.controller.control)
        return;
      if (swiper.controller.spline) {
        swiper.controller.spline = void 0;
        delete swiper.controller.spline;
      }
    }
    on("beforeInit", () => {
      if (typeof window !== "undefined" && // eslint-disable-line
      (typeof swiper.params.controller.control === "string" || swiper.params.controller.control instanceof HTMLElement)) {
        const controlElement = document.querySelector(swiper.params.controller.control);
        if (controlElement && controlElement.swiper) {
          swiper.controller.control = controlElement.swiper;
        } else if (controlElement) {
          const onControllerSwiper = (e4) => {
            swiper.controller.control = e4.detail[0];
            swiper.update();
            controlElement.removeEventListener("init", onControllerSwiper);
          };
          controlElement.addEventListener("init", onControllerSwiper);
        }
        return;
      }
      swiper.controller.control = swiper.params.controller.control;
    });
    on("update", () => {
      removeSpline();
    });
    on("resize", () => {
      removeSpline();
    });
    on("observerUpdate", () => {
      removeSpline();
    });
    on("setTranslate", (_s, translate2, byController) => {
      if (!swiper.controller.control || swiper.controller.control.destroyed)
        return;
      swiper.controller.setTranslate(translate2, byController);
    });
    on("setTransition", (_s, duration, byController) => {
      if (!swiper.controller.control || swiper.controller.control.destroyed)
        return;
      swiper.controller.setTransition(duration, byController);
    });
    Object.assign(swiper.controller, {
      setTranslate: setTranslate2,
      setTransition: setTransition2
    });
  }

  // node_modules/swiper/modules/a11y.mjs
  function A11y(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      a11y: {
        enabled: true,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        slideLabelMessage: "{{index}} / {{slidesLength}}",
        containerMessage: null,
        containerRoleDescriptionMessage: null,
        itemRoleDescriptionMessage: null,
        slideRole: "group",
        id: null
      }
    });
    swiper.a11y = {
      clicked: false
    };
    let liveRegion = null;
    function notify(message) {
      const notification = liveRegion;
      if (notification.length === 0)
        return;
      notification.innerHTML = "";
      notification.innerHTML = message;
    }
    const makeElementsArray = (el) => {
      if (!Array.isArray(el))
        el = [el].filter((e4) => !!e4);
      return el;
    };
    function getRandomNumber(size) {
      if (size === void 0) {
        size = 16;
      }
      const randomChar = () => Math.round(16 * Math.random()).toString(16);
      return "x".repeat(size).replace(/x/g, randomChar);
    }
    function makeElFocusable(el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("tabIndex", "0");
      });
    }
    function makeElNotFocusable(el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("tabIndex", "-1");
      });
    }
    function addElRole(el, role) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("role", role);
      });
    }
    function addElRoleDescription(el, description) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("aria-roledescription", description);
      });
    }
    function addElControls(el, controls) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("aria-controls", controls);
      });
    }
    function addElLabel(el, label) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("aria-label", label);
      });
    }
    function addElId(el, id) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("id", id);
      });
    }
    function addElLive(el, live) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("aria-live", live);
      });
    }
    function disableEl(el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("aria-disabled", true);
      });
    }
    function enableEl(el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.setAttribute("aria-disabled", false);
      });
    }
    function onEnterOrSpaceKey(e4) {
      if (e4.keyCode !== 13 && e4.keyCode !== 32)
        return;
      const params = swiper.params.a11y;
      const targetEl = e4.target;
      if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e4.target))) {
        if (!e4.target.matches(classesToSelector(swiper.params.pagination.bulletClass)))
          return;
      }
      if (swiper.navigation && swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass))) {
        targetEl.click();
      }
    }
    function updateNavigation() {
      if (swiper.params.loop || swiper.params.rewind || !swiper.navigation)
        return;
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (prevEl) {
        if (swiper.isBeginning) {
          disableEl(prevEl);
          makeElNotFocusable(prevEl);
        } else {
          enableEl(prevEl);
          makeElFocusable(prevEl);
        }
      }
      if (nextEl) {
        if (swiper.isEnd) {
          disableEl(nextEl);
          makeElNotFocusable(nextEl);
        } else {
          enableEl(nextEl);
          makeElFocusable(nextEl);
        }
      }
    }
    function hasPagination() {
      return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
    }
    function hasClickablePagination() {
      return hasPagination() && swiper.params.pagination.clickable;
    }
    function updatePagination() {
      const params = swiper.params.a11y;
      if (!hasPagination())
        return;
      swiper.pagination.bullets.forEach((bulletEl) => {
        if (swiper.params.pagination.clickable) {
          makeElFocusable(bulletEl);
          if (!swiper.params.pagination.renderBullet) {
            addElRole(bulletEl, "button");
            addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1));
          }
        }
        if (bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass))) {
          bulletEl.setAttribute("aria-current", "true");
        } else {
          bulletEl.removeAttribute("aria-current");
        }
      });
    }
    const initNavEl = (el, wrapperId, message) => {
      makeElFocusable(el);
      if (el.tagName !== "BUTTON") {
        addElRole(el, "button");
        el.addEventListener("keydown", onEnterOrSpaceKey);
      }
      addElLabel(el, message);
      addElControls(el, wrapperId);
    };
    const handlePointerDown = () => {
      swiper.a11y.clicked = true;
    };
    const handlePointerUp = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!swiper.destroyed) {
            swiper.a11y.clicked = false;
          }
        });
      });
    };
    const handleFocus = (e4) => {
      if (swiper.a11y.clicked)
        return;
      const slideEl = e4.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      if (!slideEl || !swiper.slides.includes(slideEl))
        return;
      const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
      const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
      if (isActive || isVisible)
        return;
      if (e4.sourceCapabilities && e4.sourceCapabilities.firesTouchEvents)
        return;
      if (swiper.isHorizontal()) {
        swiper.el.scrollLeft = 0;
      } else {
        swiper.el.scrollTop = 0;
      }
      swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
    };
    const initSlides = () => {
      const params = swiper.params.a11y;
      if (params.itemRoleDescriptionMessage) {
        addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
      }
      if (params.slideRole) {
        addElRole(swiper.slides, params.slideRole);
      }
      const slidesLength = swiper.slides.length;
      if (params.slideLabelMessage) {
        swiper.slides.forEach((slideEl, index) => {
          const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10) : index;
          const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
          addElLabel(slideEl, ariaLabelMessage);
        });
      }
    };
    const init = () => {
      const params = swiper.params.a11y;
      swiper.el.append(liveRegion);
      const containerEl = swiper.el;
      if (params.containerRoleDescriptionMessage) {
        addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
      }
      if (params.containerMessage) {
        addElLabel(containerEl, params.containerMessage);
      }
      const wrapperEl = swiper.wrapperEl;
      const wrapperId = params.id || wrapperEl.getAttribute("id") || `swiper-wrapper-${getRandomNumber(16)}`;
      const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? "off" : "polite";
      addElId(wrapperEl, wrapperId);
      addElLive(wrapperEl, live);
      initSlides();
      let {
        nextEl,
        prevEl
      } = swiper.navigation ? swiper.navigation : {};
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (nextEl) {
        nextEl.forEach((el) => initNavEl(el, wrapperId, params.nextSlideMessage));
      }
      if (prevEl) {
        prevEl.forEach((el) => initNavEl(el, wrapperId, params.prevSlideMessage));
      }
      if (hasClickablePagination()) {
        const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
        paginationEl.forEach((el) => {
          el.addEventListener("keydown", onEnterOrSpaceKey);
        });
      }
      swiper.el.addEventListener("focus", handleFocus, true);
      swiper.el.addEventListener("pointerdown", handlePointerDown, true);
      swiper.el.addEventListener("pointerup", handlePointerUp, true);
    };
    function destroy() {
      if (liveRegion)
        liveRegion.remove();
      let {
        nextEl,
        prevEl
      } = swiper.navigation ? swiper.navigation : {};
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (nextEl) {
        nextEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey));
      }
      if (prevEl) {
        prevEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey));
      }
      if (hasClickablePagination()) {
        const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
        paginationEl.forEach((el) => {
          el.removeEventListener("keydown", onEnterOrSpaceKey);
        });
      }
      swiper.el.removeEventListener("focus", handleFocus, true);
      swiper.el.removeEventListener("pointerdown", handlePointerDown, true);
      swiper.el.removeEventListener("pointerup", handlePointerUp, true);
    }
    on("beforeInit", () => {
      liveRegion = createElement("span", swiper.params.a11y.notificationClass);
      liveRegion.setAttribute("aria-live", "assertive");
      liveRegion.setAttribute("aria-atomic", "true");
    });
    on("afterInit", () => {
      if (!swiper.params.a11y.enabled)
        return;
      init();
    });
    on("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
      if (!swiper.params.a11y.enabled)
        return;
      initSlides();
    });
    on("fromEdge toEdge afterInit lock unlock", () => {
      if (!swiper.params.a11y.enabled)
        return;
      updateNavigation();
    });
    on("paginationUpdate", () => {
      if (!swiper.params.a11y.enabled)
        return;
      updatePagination();
    });
    on("destroy", () => {
      if (!swiper.params.a11y.enabled)
        return;
      destroy();
    });
  }

  // node_modules/swiper/modules/history.mjs
  function History(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      history: {
        enabled: false,
        root: "",
        replaceState: false,
        key: "slides",
        keepQuery: false
      }
    });
    let initialized = false;
    let paths = {};
    const slugify = (text) => {
      return text.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    };
    const getPathValues = (urlOverride) => {
      const window2 = getWindow();
      let location;
      if (urlOverride) {
        location = new URL(urlOverride);
      } else {
        location = window2.location;
      }
      const pathArray = location.pathname.slice(1).split("/").filter((part) => part !== "");
      const total = pathArray.length;
      const key = pathArray[total - 2];
      const value = pathArray[total - 1];
      return {
        key,
        value
      };
    };
    const setHistory = (key, index) => {
      const window2 = getWindow();
      if (!initialized || !swiper.params.history.enabled)
        return;
      let location;
      if (swiper.params.url) {
        location = new URL(swiper.params.url);
      } else {
        location = window2.location;
      }
      const slide2 = swiper.slides[index];
      let value = slugify(slide2.getAttribute("data-history"));
      if (swiper.params.history.root.length > 0) {
        let root = swiper.params.history.root;
        if (root[root.length - 1] === "/")
          root = root.slice(0, root.length - 1);
        value = `${root}/${key ? `${key}/` : ""}${value}`;
      } else if (!location.pathname.includes(key)) {
        value = `${key ? `${key}/` : ""}${value}`;
      }
      if (swiper.params.history.keepQuery) {
        value += location.search;
      }
      const currentState = window2.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        window2.history.replaceState({
          value
        }, null, value);
      } else {
        window2.history.pushState({
          value
        }, null, value);
      }
    };
    const scrollToSlide = (speed, value, runCallbacks) => {
      if (value) {
        for (let i4 = 0, length = swiper.slides.length; i4 < length; i4 += 1) {
          const slide2 = swiper.slides[i4];
          const slideHistory = slugify(slide2.getAttribute("data-history"));
          if (slideHistory === value) {
            const index = swiper.getSlideIndex(slide2);
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    };
    const setHistoryPopState = () => {
      paths = getPathValues(swiper.params.url);
      scrollToSlide(swiper.params.speed, paths.value, false);
    };
    const init = () => {
      const window2 = getWindow();
      if (!swiper.params.history)
        return;
      if (!window2.history || !window2.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      initialized = true;
      paths = getPathValues(swiper.params.url);
      if (!paths.key && !paths.value) {
        if (!swiper.params.history.replaceState) {
          window2.addEventListener("popstate", setHistoryPopState);
        }
        return;
      }
      scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        window2.addEventListener("popstate", setHistoryPopState);
      }
    };
    const destroy = () => {
      const window2 = getWindow();
      if (!swiper.params.history.replaceState) {
        window2.removeEventListener("popstate", setHistoryPopState);
      }
    };
    on("init", () => {
      if (swiper.params.history.enabled) {
        init();
      }
    });
    on("destroy", () => {
      if (swiper.params.history.enabled) {
        destroy();
      }
    });
    on("transitionEnd _freeModeNoMomentumRelease", () => {
      if (initialized) {
        setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    });
    on("slideChange", () => {
      if (initialized && swiper.params.cssMode) {
        setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    });
  }

  // node_modules/swiper/modules/hash-navigation.mjs
  function HashNavigation(_ref) {
    let {
      swiper,
      extendParams,
      emit,
      on
    } = _ref;
    let initialized = false;
    const document2 = getDocument();
    const window2 = getWindow();
    extendParams({
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
        getSlideIndex(_s, hash) {
          if (swiper.virtual && swiper.params.virtual.enabled) {
            const slideWithHash = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-hash") === hash)[0];
            if (!slideWithHash)
              return 0;
            const index = parseInt(slideWithHash.getAttribute("data-swiper-slide-index"), 10);
            return index;
          }
          return swiper.getSlideIndex(elementChildren(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0]);
        }
      }
    });
    const onHashChange = () => {
      emit("hashChange");
      const newHash = document2.location.hash.replace("#", "");
      const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
      const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute("data-hash") : "";
      if (newHash !== activeSlideHash) {
        const newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
        if (typeof newIndex === "undefined" || Number.isNaN(newIndex))
          return;
        swiper.slideTo(newIndex);
      }
    };
    const setHash = () => {
      if (!initialized || !swiper.params.hashNavigation.enabled)
        return;
      const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
      const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute("data-hash") || activeSlideEl.getAttribute("data-history") : "";
      if (swiper.params.hashNavigation.replaceState && window2.history && window2.history.replaceState) {
        window2.history.replaceState(null, null, `#${activeSlideHash}` || "");
        emit("hashSet");
      } else {
        document2.location.hash = activeSlideHash || "";
        emit("hashSet");
      }
    };
    const init = () => {
      if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled)
        return;
      initialized = true;
      const hash = document2.location.hash.replace("#", "");
      if (hash) {
        const speed = 0;
        const index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
        swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
      }
      if (swiper.params.hashNavigation.watchState) {
        window2.addEventListener("hashchange", onHashChange);
      }
    };
    const destroy = () => {
      if (swiper.params.hashNavigation.watchState) {
        window2.removeEventListener("hashchange", onHashChange);
      }
    };
    on("init", () => {
      if (swiper.params.hashNavigation.enabled) {
        init();
      }
    });
    on("destroy", () => {
      if (swiper.params.hashNavigation.enabled) {
        destroy();
      }
    });
    on("transitionEnd _freeModeNoMomentumRelease", () => {
      if (initialized) {
        setHash();
      }
    });
    on("slideChange", () => {
      if (initialized && swiper.params.cssMode) {
        setHash();
      }
    });
  }

  // node_modules/swiper/modules/autoplay.mjs
  function Autoplay(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit,
      params
    } = _ref;
    swiper.autoplay = {
      running: false,
      paused: false,
      timeLeft: 0
    };
    extendParams({
      autoplay: {
        enabled: false,
        delay: 3e3,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
        pauseOnMouseEnter: false
      }
    });
    let timeout;
    let raf;
    let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
    let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
    let autoplayTimeLeft;
    let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime;
    let wasPaused;
    let isTouched;
    let pausedByTouch;
    let touchStartTimeout;
    let slideChanged;
    let pausedByInteraction;
    function onTransitionEnd(e4) {
      if (!swiper || swiper.destroyed || !swiper.wrapperEl)
        return;
      if (e4.target !== swiper.wrapperEl)
        return;
      swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
      resume();
    }
    const calcTimeLeft = () => {
      if (swiper.destroyed || !swiper.autoplay.running)
        return;
      if (swiper.autoplay.paused) {
        wasPaused = true;
      } else if (wasPaused) {
        autoplayDelayCurrent = autoplayTimeLeft;
        wasPaused = false;
      }
      const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
      swiper.autoplay.timeLeft = timeLeft;
      emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
      raf = requestAnimationFrame(() => {
        calcTimeLeft();
      });
    };
    const getSlideDelay = () => {
      let activeSlideEl;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        activeSlideEl = swiper.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
      } else {
        activeSlideEl = swiper.slides[swiper.activeIndex];
      }
      if (!activeSlideEl)
        return void 0;
      const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
      return currentSlideDelay;
    };
    const run = (delayForce) => {
      if (swiper.destroyed || !swiper.autoplay.running)
        return;
      cancelAnimationFrame(raf);
      calcTimeLeft();
      let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
      autoplayDelayTotal = swiper.params.autoplay.delay;
      autoplayDelayCurrent = swiper.params.autoplay.delay;
      const currentSlideDelay = getSlideDelay();
      if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
        delay = currentSlideDelay;
        autoplayDelayTotal = currentSlideDelay;
        autoplayDelayCurrent = currentSlideDelay;
      }
      autoplayTimeLeft = delay;
      const speed = swiper.params.speed;
      const proceed = () => {
        if (!swiper || swiper.destroyed)
          return;
        if (swiper.params.autoplay.reverseDirection) {
          if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
            swiper.slidePrev(speed, true, true);
            emit("autoplay");
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, speed, true, true);
            emit("autoplay");
          }
        } else {
          if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
            swiper.slideNext(speed, true, true);
            emit("autoplay");
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(0, speed, true, true);
            emit("autoplay");
          }
        }
        if (swiper.params.cssMode) {
          autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
          requestAnimationFrame(() => {
            run();
          });
        }
      };
      if (delay > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          proceed();
        }, delay);
      } else {
        requestAnimationFrame(() => {
          proceed();
        });
      }
      return delay;
    };
    const start = () => {
      swiper.autoplay.running = true;
      run();
      emit("autoplayStart");
    };
    const stop = () => {
      swiper.autoplay.running = false;
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      emit("autoplayStop");
    };
    const pause = (internal, reset) => {
      if (swiper.destroyed || !swiper.autoplay.running)
        return;
      clearTimeout(timeout);
      if (!internal) {
        pausedByInteraction = true;
      }
      const proceed = () => {
        emit("autoplayPause");
        if (swiper.params.autoplay.waitForTransition) {
          swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
        } else {
          resume();
        }
      };
      swiper.autoplay.paused = true;
      if (reset) {
        if (slideChanged) {
          autoplayTimeLeft = swiper.params.autoplay.delay;
        }
        slideChanged = false;
        proceed();
        return;
      }
      const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
      autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
      if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop)
        return;
      if (autoplayTimeLeft < 0)
        autoplayTimeLeft = 0;
      proceed();
    };
    const resume = () => {
      if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running)
        return;
      autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
      if (pausedByInteraction) {
        pausedByInteraction = false;
        run(autoplayTimeLeft);
      } else {
        run();
      }
      swiper.autoplay.paused = false;
      emit("autoplayResume");
    };
    const onVisibilityChange = () => {
      if (swiper.destroyed || !swiper.autoplay.running)
        return;
      const document2 = getDocument();
      if (document2.visibilityState === "hidden") {
        pausedByInteraction = true;
        pause(true);
      }
      if (document2.visibilityState === "visible") {
        resume();
      }
    };
    const onPointerEnter = (e4) => {
      if (e4.pointerType !== "mouse")
        return;
      pausedByInteraction = true;
      pause(true);
    };
    const onPointerLeave = (e4) => {
      if (e4.pointerType !== "mouse")
        return;
      if (swiper.autoplay.paused) {
        resume();
      }
    };
    const attachMouseEvents = () => {
      if (swiper.params.autoplay.pauseOnMouseEnter) {
        swiper.el.addEventListener("pointerenter", onPointerEnter);
        swiper.el.addEventListener("pointerleave", onPointerLeave);
      }
    };
    const detachMouseEvents = () => {
      swiper.el.removeEventListener("pointerenter", onPointerEnter);
      swiper.el.removeEventListener("pointerleave", onPointerLeave);
    };
    const attachDocumentEvents = () => {
      const document2 = getDocument();
      document2.addEventListener("visibilitychange", onVisibilityChange);
    };
    const detachDocumentEvents = () => {
      const document2 = getDocument();
      document2.removeEventListener("visibilitychange", onVisibilityChange);
    };
    on("init", () => {
      if (swiper.params.autoplay.enabled) {
        attachMouseEvents();
        attachDocumentEvents();
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        start();
      }
    });
    on("destroy", () => {
      detachMouseEvents();
      detachDocumentEvents();
      if (swiper.autoplay.running) {
        stop();
      }
    });
    on("beforeTransitionStart", (_s, speed, internal) => {
      if (swiper.destroyed || !swiper.autoplay.running)
        return;
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        pause(true, true);
      } else {
        stop();
      }
    });
    on("sliderFirstMove", () => {
      if (swiper.destroyed || !swiper.autoplay.running)
        return;
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
        return;
      }
      isTouched = true;
      pausedByTouch = false;
      pausedByInteraction = false;
      touchStartTimeout = setTimeout(() => {
        pausedByInteraction = true;
        pausedByTouch = true;
        pause(true);
      }, 200);
    });
    on("touchEnd", () => {
      if (swiper.destroyed || !swiper.autoplay.running || !isTouched)
        return;
      clearTimeout(touchStartTimeout);
      clearTimeout(timeout);
      if (swiper.params.autoplay.disableOnInteraction) {
        pausedByTouch = false;
        isTouched = false;
        return;
      }
      if (pausedByTouch && swiper.params.cssMode)
        resume();
      pausedByTouch = false;
      isTouched = false;
    });
    on("slideChange", () => {
      if (swiper.destroyed || !swiper.autoplay.running)
        return;
      slideChanged = true;
    });
    Object.assign(swiper.autoplay, {
      start,
      stop,
      pause,
      resume
    });
  }

  // node_modules/swiper/modules/thumbs.mjs
  function Thumb(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: true,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs"
      }
    });
    let initialized = false;
    let swiperCreated = false;
    swiper.thumbs = {
      swiper: null
    };
    function onThumbClick() {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed)
        return;
      const clickedIndex = thumbsSwiper.clickedIndex;
      const clickedSlide = thumbsSwiper.clickedSlide;
      if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass))
        return;
      if (typeof clickedIndex === "undefined" || clickedIndex === null)
        return;
      let slideToIndex;
      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      } else {
        slideToIndex = clickedIndex;
      }
      if (swiper.params.loop) {
        swiper.slideToLoop(slideToIndex);
      } else {
        swiper.slideTo(slideToIndex);
      }
    }
    function init() {
      const {
        thumbs: thumbsParams
      } = swiper.params;
      if (initialized)
        return false;
      initialized = true;
      const SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Object.assign(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        Object.assign(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        swiper.thumbs.swiper.update();
      } else if (isObject2(thumbsParams.swiper)) {
        const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
        Object.assign(thumbsSwiperParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
        swiperCreated = true;
      }
      swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on("tap", onThumbClick);
      return true;
    }
    function update2(initial) {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed)
        return;
      const slidesPerView = thumbsSwiper.params.slidesPerView === "auto" ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
      let thumbsToActivate = 1;
      const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }
      if (!swiper.params.thumbs.multipleActiveThumbs) {
        thumbsToActivate = 1;
      }
      thumbsToActivate = Math.floor(thumbsToActivate);
      thumbsSwiper.slides.forEach((slideEl) => slideEl.classList.remove(thumbActiveClass));
      if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
        for (let i4 = 0; i4 < thumbsToActivate; i4 += 1) {
          elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i4}"]`).forEach((slideEl) => {
            slideEl.classList.add(thumbActiveClass);
          });
        }
      } else {
        for (let i4 = 0; i4 < thumbsToActivate; i4 += 1) {
          if (thumbsSwiper.slides[swiper.realIndex + i4]) {
            thumbsSwiper.slides[swiper.realIndex + i4].classList.add(thumbActiveClass);
          }
        }
      }
      const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
      const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
      if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
        const currentThumbsIndex = thumbsSwiper.activeIndex;
        let newThumbsIndex;
        let direction;
        if (thumbsSwiper.params.loop) {
          const newThumbsSlide = thumbsSwiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") === `${swiper.realIndex}`)[0];
          newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
          direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
        } else {
          newThumbsIndex = swiper.realIndex;
          direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
        }
        if (useOffset) {
          newThumbsIndex += direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
        }
        if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1)
            ;
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
        }
      }
    }
    on("beforeInit", () => {
      const {
        thumbs
      } = swiper.params;
      if (!thumbs || !thumbs.swiper)
        return;
      if (typeof thumbs.swiper === "string" || thumbs.swiper instanceof HTMLElement) {
        const document2 = getDocument();
        const getThumbsElementAndInit = () => {
          const thumbsElement = typeof thumbs.swiper === "string" ? document2.querySelector(thumbs.swiper) : thumbs.swiper;
          if (thumbsElement && thumbsElement.swiper) {
            thumbs.swiper = thumbsElement.swiper;
            init();
            update2(true);
          } else if (thumbsElement) {
            const onThumbsSwiper = (e4) => {
              thumbs.swiper = e4.detail[0];
              thumbsElement.removeEventListener("init", onThumbsSwiper);
              init();
              update2(true);
              thumbs.swiper.update();
              swiper.update();
            };
            thumbsElement.addEventListener("init", onThumbsSwiper);
          }
          return thumbsElement;
        };
        const watchForThumbsToAppear = () => {
          if (swiper.destroyed)
            return;
          const thumbsElement = getThumbsElementAndInit();
          if (!thumbsElement) {
            requestAnimationFrame(watchForThumbsToAppear);
          }
        };
        requestAnimationFrame(watchForThumbsToAppear);
      } else {
        init();
        update2(true);
      }
    });
    on("slideChange update resize observerUpdate", () => {
      update2();
    });
    on("setTransition", (_s, duration) => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed)
        return;
      thumbsSwiper.setTransition(duration);
    });
    on("beforeDestroy", () => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed)
        return;
      if (swiperCreated) {
        thumbsSwiper.destroy();
      }
    });
    Object.assign(swiper.thumbs, {
      init,
      update: update2
    });
  }

  // node_modules/swiper/modules/free-mode.mjs
  function freeMode(_ref) {
    let {
      swiper,
      extendParams,
      emit,
      once
    } = _ref;
    extendParams({
      freeMode: {
        enabled: false,
        momentum: true,
        momentumRatio: 1,
        momentumBounce: true,
        momentumBounceRatio: 1,
        momentumVelocityRatio: 1,
        sticky: false,
        minimumVelocity: 0.02
      }
    });
    function onTouchStart2() {
      if (swiper.params.cssMode)
        return;
      const translate2 = swiper.getTranslate();
      swiper.setTranslate(translate2);
      swiper.setTransition(0);
      swiper.touchEventsData.velocities.length = 0;
      swiper.freeMode.onTouchEnd({
        currentPos: swiper.rtl ? swiper.translate : -swiper.translate
      });
    }
    function onTouchMove2() {
      if (swiper.params.cssMode)
        return;
      const {
        touchEventsData: data,
        touches
      } = swiper;
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? "startX" : "startY"],
          time: data.touchStartTime
        });
      }
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
        time: now()
      });
    }
    function onTouchEnd2(_ref2) {
      let {
        currentPos
      } = _ref2;
      if (swiper.params.cssMode)
        return;
      const {
        params,
        wrapperEl,
        rtlTranslate: rtl,
        snapGrid,
        touchEventsData: data
      } = swiper;
      const touchEndTime = now();
      const timeDiff = touchEndTime - data.touchStartTime;
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }
      if (params.freeMode.momentum) {
        if (data.velocities.length > 1) {
          const lastMoveEvent = data.velocities.pop();
          const velocityEvent = data.velocities.pop();
          const distance = lastMoveEvent.position - velocityEvent.position;
          const time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
            swiper.velocity = 0;
          }
          if (time > 150 || now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeMode.momentumVelocityRatio;
        data.velocities.length = 0;
        let momentumDuration = 1e3 * params.freeMode.momentumRatio;
        const momentumDistance = swiper.velocity * momentumDuration;
        let newPosition = swiper.translate + momentumDistance;
        if (rtl)
          newPosition = -newPosition;
        let doBounce = false;
        let afterBouncePosition;
        const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
        let needsLoopFix;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeMode.momentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
          if (params.loop && params.centeredSlides)
            needsLoopFix = true;
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeMode.momentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
          if (params.loop && params.centeredSlides)
            needsLoopFix = true;
        } else if (params.freeMode.sticky) {
          let nextSlide;
          for (let j3 = 0; j3 < snapGrid.length; j3 += 1) {
            if (snapGrid[j3] > -newPosition) {
              nextSlide = j3;
              break;
            }
          }
          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === "next") {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        if (needsLoopFix) {
          once("transitionEnd", () => {
            swiper.loopFix();
          });
        }
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
          if (params.freeMode.sticky) {
            const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
            const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
            if (moveDistance < currentSlideSize) {
              momentumDuration = params.speed;
            } else if (moveDistance < 2 * currentSlideSize) {
              momentumDuration = params.speed * 1.5;
            } else {
              momentumDuration = params.speed * 2.5;
            }
          }
        } else if (params.freeMode.sticky) {
          swiper.slideToClosest();
          return;
        }
        if (params.freeMode.momentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          elementTransitionEnd(wrapperEl, () => {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce)
              return;
            emit("momentumBounce");
            swiper.setTransition(params.speed);
            setTimeout(() => {
              swiper.setTranslate(afterBouncePosition);
              elementTransitionEnd(wrapperEl, () => {
                if (!swiper || swiper.destroyed)
                  return;
                swiper.transitionEnd();
              });
            }, 0);
          });
        } else if (swiper.velocity) {
          emit("_freeModeNoMomentumRelease");
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          if (!swiper.animating) {
            swiper.animating = true;
            elementTransitionEnd(wrapperEl, () => {
              if (!swiper || swiper.destroyed)
                return;
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      } else if (params.freeMode) {
        emit("_freeModeNoMomentumRelease");
      }
      if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
    }
    Object.assign(swiper, {
      freeMode: {
        onTouchStart: onTouchStart2,
        onTouchMove: onTouchMove2,
        onTouchEnd: onTouchEnd2
      }
    });
  }

  // node_modules/swiper/modules/grid.mjs
  function Grid(_ref) {
    let {
      swiper,
      extendParams
    } = _ref;
    extendParams({
      grid: {
        rows: 1,
        fill: "column"
      }
    });
    let slidesNumberEvenToRows;
    let slidesPerRow;
    let numFullColumns;
    const getSpaceBetween = () => {
      let spaceBetween = swiper.params.spaceBetween;
      if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
      } else if (typeof spaceBetween === "string") {
        spaceBetween = parseFloat(spaceBetween);
      }
      return spaceBetween;
    };
    const initSlides = (slidesLength) => {
      const {
        slidesPerView
      } = swiper.params;
      const {
        rows,
        fill
      } = swiper.params.grid;
      numFullColumns = Math.floor(slidesLength / rows);
      if (Math.floor(slidesLength / rows) === slidesLength / rows) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
      }
      if (slidesPerView !== "auto" && fill === "row") {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
      }
      slidesPerRow = slidesNumberEvenToRows / rows;
    };
    const updateSlide = (i4, slide2, slidesLength, getDirectionLabel) => {
      const {
        slidesPerGroup
      } = swiper.params;
      const spaceBetween = getSpaceBetween();
      const {
        rows,
        fill
      } = swiper.params.grid;
      let newSlideOrderIndex;
      let column;
      let row;
      if (fill === "row" && slidesPerGroup > 1) {
        const groupIndex = Math.floor(i4 / (slidesPerGroup * rows));
        const slideIndexInGroup = i4 - rows * slidesPerGroup * groupIndex;
        const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
        row = Math.floor(slideIndexInGroup / columnsInGroup);
        column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
        newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
        slide2.style.order = newSlideOrderIndex;
      } else if (fill === "column") {
        column = Math.floor(i4 / rows);
        row = i4 - column * rows;
        if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
          row += 1;
          if (row >= rows) {
            row = 0;
            column += 1;
          }
        }
      } else {
        row = Math.floor(i4 / slidesPerRow);
        column = i4 - row * slidesPerRow;
      }
      slide2.row = row;
      slide2.column = column;
      slide2.style[getDirectionLabel("margin-top")] = row !== 0 ? spaceBetween && `${spaceBetween}px` : "";
    };
    const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
      const {
        centeredSlides,
        roundLengths
      } = swiper.params;
      const spaceBetween = getSpaceBetween();
      const {
        rows
      } = swiper.params.grid;
      swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
      swiper.wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
      if (centeredSlides) {
        const newSlidesGrid = [];
        for (let i4 = 0; i4 < snapGrid.length; i4 += 1) {
          let slidesGridItem = snapGrid[i4];
          if (roundLengths)
            slidesGridItem = Math.floor(slidesGridItem);
          if (snapGrid[i4] < swiper.virtualSize + snapGrid[0])
            newSlidesGrid.push(slidesGridItem);
        }
        snapGrid.splice(0, snapGrid.length);
        snapGrid.push(...newSlidesGrid);
      }
    };
    swiper.grid = {
      initSlides,
      updateSlide,
      updateWrapperSize
    };
  }

  // node_modules/swiper/modules/manipulation.mjs
  function appendSlide(slides) {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (params.loop) {
      swiper.loopDestroy();
    }
    const appendElement = (slideEl) => {
      if (typeof slideEl === "string") {
        const tempDOM = document.createElement("div");
        tempDOM.innerHTML = slideEl;
        slidesEl.append(tempDOM.children[0]);
        tempDOM.innerHTML = "";
      } else {
        slidesEl.append(slideEl);
      }
    };
    if (typeof slides === "object" && "length" in slides) {
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        if (slides[i4])
          appendElement(slides[i4]);
      }
    } else {
      appendElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
  }
  function prependSlide(slides) {
    const swiper = this;
    const {
      params,
      activeIndex,
      slidesEl
    } = swiper;
    if (params.loop) {
      swiper.loopDestroy();
    }
    let newActiveIndex = activeIndex + 1;
    const prependElement = (slideEl) => {
      if (typeof slideEl === "string") {
        const tempDOM = document.createElement("div");
        tempDOM.innerHTML = slideEl;
        slidesEl.prepend(tempDOM.children[0]);
        tempDOM.innerHTML = "";
      } else {
        slidesEl.prepend(slideEl);
      }
    };
    if (typeof slides === "object" && "length" in slides) {
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        if (slides[i4])
          prependElement(slides[i4]);
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      prependElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }
  function addSlide(index, slides) {
    const swiper = this;
    const {
      params,
      activeIndex,
      slidesEl
    } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.recalcSlides();
    }
    const baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    const slidesBuffer = [];
    for (let i4 = baseLength - 1; i4 >= index; i4 -= 1) {
      const currentSlide = swiper.slides[i4];
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }
    if (typeof slides === "object" && "length" in slides) {
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        if (slides[i4])
          slidesEl.append(slides[i4]);
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      slidesEl.append(slides);
    }
    for (let i4 = 0; i4 < slidesBuffer.length; i4 += 1) {
      slidesEl.append(slidesBuffer[i4]);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }
  function removeSlide(slidesIndexes) {
    const swiper = this;
    const {
      params,
      activeIndex
    } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
    }
    let newActiveIndex = activeIndexBuffer;
    let indexToRemove;
    if (typeof slidesIndexes === "object" && "length" in slidesIndexes) {
      for (let i4 = 0; i4 < slidesIndexes.length; i4 += 1) {
        indexToRemove = slidesIndexes[i4];
        if (swiper.slides[indexToRemove])
          swiper.slides[indexToRemove].remove();
        if (indexToRemove < newActiveIndex)
          newActiveIndex -= 1;
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove])
        swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex)
        newActiveIndex -= 1;
      newActiveIndex = Math.max(newActiveIndex, 0);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }
  function removeAllSlides() {
    const swiper = this;
    const slidesIndexes = [];
    for (let i4 = 0; i4 < swiper.slides.length; i4 += 1) {
      slidesIndexes.push(i4);
    }
    swiper.removeSlide(slidesIndexes);
  }
  function Manipulation(_ref) {
    let {
      swiper
    } = _ref;
    Object.assign(swiper, {
      appendSlide: appendSlide.bind(swiper),
      prependSlide: prependSlide.bind(swiper),
      addSlide: addSlide.bind(swiper),
      removeSlide: removeSlide.bind(swiper),
      removeAllSlides: removeAllSlides.bind(swiper)
    });
  }

  // node_modules/swiper/shared/effect-init.mjs
  function effectInit(params) {
    const {
      effect,
      swiper,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      overwriteParams,
      perspective,
      recreateShadows,
      getEffectParams
    } = params;
    on("beforeInit", () => {
      if (swiper.params.effect !== effect)
        return;
      swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
      if (perspective && perspective()) {
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
      }
      const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
      Object.assign(swiper.params, overwriteParamsResult);
      Object.assign(swiper.originalParams, overwriteParamsResult);
    });
    on("setTranslate", () => {
      if (swiper.params.effect !== effect)
        return;
      setTranslate2();
    });
    on("setTransition", (_s, duration) => {
      if (swiper.params.effect !== effect)
        return;
      setTransition2(duration);
    });
    on("transitionEnd", () => {
      if (swiper.params.effect !== effect)
        return;
      if (recreateShadows) {
        if (!getEffectParams || !getEffectParams().slideShadows)
          return;
        swiper.slides.forEach((slideEl) => {
          slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
        });
        recreateShadows();
      }
    });
    let requireUpdateOnVirtual;
    on("virtualUpdate", () => {
      if (swiper.params.effect !== effect)
        return;
      if (!swiper.slides.length) {
        requireUpdateOnVirtual = true;
      }
      requestAnimationFrame(() => {
        if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
          setTranslate2();
          requireUpdateOnVirtual = false;
        }
      });
    });
  }

  // node_modules/swiper/shared/effect-target.mjs
  function effectTarget(effectParams, slideEl) {
    const transformEl = getSlideTransformEl(slideEl);
    if (transformEl !== slideEl) {
      transformEl.style.backfaceVisibility = "hidden";
      transformEl.style["-webkit-backface-visibility"] = "hidden";
    }
    return transformEl;
  }

  // node_modules/swiper/shared/effect-virtual-transition-end.mjs
  function effectVirtualTransitionEnd(_ref) {
    let {
      swiper,
      duration,
      transformElements,
      allSlides
    } = _ref;
    const {
      activeIndex
    } = swiper;
    const getSlide = (el) => {
      if (!el.parentElement) {
        const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode)[0];
        return slide2;
      }
      return el.parentElement;
    };
    if (swiper.params.virtualTranslate && duration !== 0) {
      let eventTriggered = false;
      let transitionEndTarget;
      if (allSlides) {
        transitionEndTarget = transformElements;
      } else {
        transitionEndTarget = transformElements.filter((transformEl) => {
          const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
          return swiper.getSlideIndex(el) === activeIndex;
        });
      }
      transitionEndTarget.forEach((el) => {
        elementTransitionEnd(el, () => {
          if (eventTriggered)
            return;
          if (!swiper || swiper.destroyed)
            return;
          eventTriggered = true;
          swiper.animating = false;
          const evt = new window.CustomEvent("transitionend", {
            bubbles: true,
            cancelable: true
          });
          swiper.wrapperEl.dispatchEvent(evt);
        });
      });
    }
  }

  // node_modules/swiper/modules/effect-fade.mjs
  function EffectFade(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      fadeEffect: {
        crossFade: false
      }
    });
    const setTranslate2 = () => {
      const {
        slides
      } = swiper;
      const params = swiper.params.fadeEffect;
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        const slideEl = swiper.slides[i4];
        const offset = slideEl.swiperSlideOffset;
        let tx = -offset;
        if (!swiper.params.virtualTranslate)
          tx -= swiper.translate;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.opacity = slideOpacity;
        targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
      }
    };
    const setTransition2 = (duration) => {
      const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
      transformElements.forEach((el) => {
        el.style.transitionDuration = `${duration}ms`;
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements,
        allSlides: true
      });
    };
    effectInit({
      effect: "fade",
      swiper,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  // node_modules/swiper/modules/effect-cube.mjs
  function EffectCube(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      }
    });
    const createSlideShadows = (slideEl, progress, isHorizontal) => {
      let shadowBefore = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
      let shadowAfter = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
      if (!shadowBefore) {
        shadowBefore = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "left" : "top"}`.split(" "));
        slideEl.append(shadowBefore);
      }
      if (!shadowAfter) {
        shadowAfter = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "right" : "bottom"}`.split(" "));
        slideEl.append(shadowAfter);
      }
      if (shadowBefore)
        shadowBefore.style.opacity = Math.max(-progress, 0);
      if (shadowAfter)
        shadowAfter.style.opacity = Math.max(progress, 0);
    };
    const recreateShadows = () => {
      const isHorizontal = swiper.isHorizontal();
      swiper.slides.forEach((slideEl) => {
        const progress = Math.max(Math.min(slideEl.progress, 1), -1);
        createSlideShadows(slideEl, progress, isHorizontal);
      });
    };
    const setTranslate2 = () => {
      const {
        el,
        wrapperEl,
        slides,
        width: swiperWidth,
        height: swiperHeight,
        rtlTranslate: rtl,
        size: swiperSize,
        browser: browser2
      } = swiper;
      const params = swiper.params.cubeEffect;
      const isHorizontal = swiper.isHorizontal();
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let wrapperRotate = 0;
      let cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          cubeShadowEl = swiper.wrapperEl.querySelector(".swiper-cube-shadow");
          if (!cubeShadowEl) {
            cubeShadowEl = createElement("div", "swiper-cube-shadow");
            swiper.wrapperEl.append(cubeShadowEl);
          }
          cubeShadowEl.style.height = `${swiperWidth}px`;
        } else {
          cubeShadowEl = el.querySelector(".swiper-cube-shadow");
          if (!cubeShadowEl) {
            cubeShadowEl = createElement("div", "swiper-cube-shadow");
            el.append(cubeShadowEl);
          }
        }
      }
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        const slideEl = slides[i4];
        let slideIndex = i4;
        if (isVirtual) {
          slideIndex = parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10);
        }
        let slideAngle = slideIndex * 90;
        let round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        const progress = Math.max(Math.min(slideEl.progress, 1), -1);
        let tx = 0;
        let ty = 0;
        let tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + round * 4 * swiperSize;
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = 3 * swiperSize + swiperSize * 4 * round;
        }
        if (rtl) {
          tx = -tx;
        }
        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }
        const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
        if (progress <= 1 && progress > -1) {
          wrapperRotate = slideIndex * 90 + progress * 90;
          if (rtl)
            wrapperRotate = -slideIndex * 90 - progress * 90;
        }
        slideEl.style.transform = transform;
        if (params.slideShadows) {
          createSlideShadows(slideEl, progress, isHorizontal);
        }
      }
      wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
      wrapperEl.style["-webkit-transform-origin"] = `50% 50% -${swiperSize / 2}px`;
      if (params.shadow) {
        if (isHorizontal) {
          cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`;
        } else {
          const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
          const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
          const scale1 = params.shadowScale;
          const scale2 = params.shadowScale / multiplier;
          const offset = params.shadowOffset;
          cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`;
        }
      }
      const zFactor = (browser2.isSafari || browser2.isWebView) && browser2.needPerspectiveFix ? -swiperSize / 2 : 0;
      wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`;
      wrapperEl.style.setProperty("--swiper-cube-translate-z", `${zFactor}px`);
    };
    const setTransition2 = (duration) => {
      const {
        el,
        slides
      } = swiper;
      slides.forEach((slideEl) => {
        slideEl.style.transitionDuration = `${duration}ms`;
        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((subEl) => {
          subEl.style.transitionDuration = `${duration}ms`;
        });
      });
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        const shadowEl = el.querySelector(".swiper-cube-shadow");
        if (shadowEl)
          shadowEl.style.transitionDuration = `${duration}ms`;
      }
    };
    effectInit({
      effect: "cube",
      swiper,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      recreateShadows,
      getEffectParams: () => swiper.params.cubeEffect,
      perspective: () => true,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true
      })
    });
  }

  // node_modules/swiper/shared/create-shadow.mjs
  function createShadow(suffix, slideEl, side) {
    const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}${suffix ? ` swiper-slide-shadow-${suffix}` : ""}`;
    const shadowContainer = getSlideTransformEl(slideEl);
    let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(" ").join(".")}`);
    if (!shadowEl) {
      shadowEl = createElement("div", shadowClass.split(" "));
      shadowContainer.append(shadowEl);
    }
    return shadowEl;
  }

  // node_modules/swiper/modules/effect-flip.mjs
  function EffectFlip(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      flipEffect: {
        slideShadows: true,
        limitRotation: true
      }
    });
    const createSlideShadows = (slideEl, progress) => {
      let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
      let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
      if (!shadowBefore) {
        shadowBefore = createShadow("flip", slideEl, swiper.isHorizontal() ? "left" : "top");
      }
      if (!shadowAfter) {
        shadowAfter = createShadow("flip", slideEl, swiper.isHorizontal() ? "right" : "bottom");
      }
      if (shadowBefore)
        shadowBefore.style.opacity = Math.max(-progress, 0);
      if (shadowAfter)
        shadowAfter.style.opacity = Math.max(progress, 0);
    };
    const recreateShadows = () => {
      swiper.params.flipEffect;
      swiper.slides.forEach((slideEl) => {
        let progress = slideEl.progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min(slideEl.progress, 1), -1);
        }
        createSlideShadows(slideEl, progress);
      });
    };
    const setTranslate2 = () => {
      const {
        slides,
        rtlTranslate: rtl
      } = swiper;
      const params = swiper.params.flipEffect;
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        const slideEl = slides[i4];
        let progress = slideEl.progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min(slideEl.progress, 1), -1);
        }
        const offset = slideEl.swiperSlideOffset;
        const rotate = -180 * progress;
        let rotateY = rotate;
        let rotateX = 0;
        let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }
        slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
        if (params.slideShadows) {
          createSlideShadows(slideEl, progress);
        }
        const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = transform;
      }
    };
    const setTransition2 = (duration) => {
      const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
      transformElements.forEach((el) => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements
      });
    };
    effectInit({
      effect: "flip",
      swiper,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      recreateShadows,
      getEffectParams: () => swiper.params.flipEffect,
      perspective: () => true,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  // node_modules/swiper/modules/effect-coverflow.mjs
  function EffectCoverflow(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: true
      }
    });
    const setTranslate2 = () => {
      const {
        width: swiperWidth,
        height: swiperHeight,
        slides,
        slidesSizesGrid
      } = swiper;
      const params = swiper.params.coverflowEffect;
      const isHorizontal = swiper.isHorizontal();
      const transform = swiper.translate;
      const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
      const rotate = isHorizontal ? params.rotate : -params.rotate;
      const translate2 = params.depth;
      for (let i4 = 0, length = slides.length; i4 < length; i4 += 1) {
        const slideEl = slides[i4];
        const slideSize = slidesSizesGrid[i4];
        const slideOffset = slideEl.swiperSlideOffset;
        const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
        const offsetMultiplier = typeof params.modifier === "function" ? params.modifier(centerOffset) : centerOffset * params.modifier;
        let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        let translateZ = -translate2 * Math.abs(offsetMultiplier);
        let stretch = params.stretch;
        if (typeof stretch === "string" && stretch.indexOf("%") !== -1) {
          stretch = parseFloat(params.stretch) / 100 * slideSize;
        }
        let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
        let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
        let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
        if (Math.abs(translateX) < 1e-3)
          translateX = 0;
        if (Math.abs(translateY) < 1e-3)
          translateY = 0;
        if (Math.abs(translateZ) < 1e-3)
          translateZ = 0;
        if (Math.abs(rotateY) < 1e-3)
          rotateY = 0;
        if (Math.abs(rotateX) < 1e-3)
          rotateX = 0;
        if (Math.abs(scale) < 1e-3)
          scale = 0;
        const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = slideTransform;
        slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          let shadowBeforeEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
          let shadowAfterEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
          if (!shadowBeforeEl) {
            shadowBeforeEl = createShadow("coverflow", slideEl, isHorizontal ? "left" : "top");
          }
          if (!shadowAfterEl) {
            shadowAfterEl = createShadow("coverflow", slideEl, isHorizontal ? "right" : "bottom");
          }
          if (shadowBeforeEl)
            shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          if (shadowAfterEl)
            shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
        }
      }
    };
    const setTransition2 = (duration) => {
      const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
      transformElements.forEach((el) => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
    };
    effectInit({
      effect: "coverflow",
      swiper,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      perspective: () => true,
      overwriteParams: () => ({
        watchSlidesProgress: true
      })
    });
  }

  // node_modules/swiper/modules/effect-creative.mjs
  function EffectCreative(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      creativeEffect: {
        limitProgress: 1,
        shadowPerProgress: false,
        progressMultiplier: 1,
        perspective: true,
        prev: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        },
        next: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        }
      }
    });
    const getTranslateValue = (value) => {
      if (typeof value === "string")
        return value;
      return `${value}px`;
    };
    const setTranslate2 = () => {
      const {
        slides,
        wrapperEl,
        slidesSizesGrid
      } = swiper;
      const params = swiper.params.creativeEffect;
      const {
        progressMultiplier: multiplier
      } = params;
      const isCenteredSlides = swiper.params.centeredSlides;
      if (isCenteredSlides) {
        const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
        wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
      }
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        const slideEl = slides[i4];
        const slideProgress = slideEl.progress;
        const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
        let originalProgress = progress;
        if (!isCenteredSlides) {
          originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
        }
        const offset = slideEl.swiperSlideOffset;
        const t4 = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
        const r4 = [0, 0, 0];
        let custom = false;
        if (!swiper.isHorizontal()) {
          t4[1] = t4[0];
          t4[0] = 0;
        }
        let data = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1
        };
        if (progress < 0) {
          data = params.next;
          custom = true;
        } else if (progress > 0) {
          data = params.prev;
          custom = true;
        }
        t4.forEach((value, index) => {
          t4[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
        });
        r4.forEach((value, index) => {
          r4[index] = data.rotate[index] * Math.abs(progress * multiplier);
        });
        slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
        const translateString = t4.join(", ");
        const rotateString = `rotateX(${r4[0]}deg) rotateY(${r4[1]}deg) rotateZ(${r4[2]}deg)`;
        const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
        const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
        const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;
        if (custom && data.shadow || !custom) {
          let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
          if (!shadowEl && data.shadow) {
            shadowEl = createShadow("creative", slideEl);
          }
          if (shadowEl) {
            const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
            shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
          }
        }
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = transform;
        targetEl.style.opacity = opacityString;
        if (data.origin) {
          targetEl.style.transformOrigin = data.origin;
        }
      }
    };
    const setTransition2 = (duration) => {
      const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
      transformElements.forEach((el) => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements,
        allSlides: true
      });
    };
    effectInit({
      effect: "creative",
      swiper,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      perspective: () => swiper.params.creativeEffect.perspective,
      overwriteParams: () => ({
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  // node_modules/swiper/modules/effect-cards.mjs
  function EffectCards(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      cardsEffect: {
        slideShadows: true,
        rotate: true,
        perSlideRotate: 2,
        perSlideOffset: 8
      }
    });
    const setTranslate2 = () => {
      const {
        slides,
        activeIndex,
        rtlTranslate: rtl
      } = swiper;
      const params = swiper.params.cardsEffect;
      const {
        startTranslate,
        isTouched
      } = swiper.touchEventsData;
      const currentTranslate = rtl ? -swiper.translate : swiper.translate;
      for (let i4 = 0; i4 < slides.length; i4 += 1) {
        const slideEl = slides[i4];
        const slideProgress = slideEl.progress;
        const progress = Math.min(Math.max(slideProgress, -4), 4);
        let offset = slideEl.swiperSlideOffset;
        if (swiper.params.centeredSlides && !swiper.params.cssMode) {
          swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
        }
        if (swiper.params.centeredSlides && swiper.params.cssMode) {
          offset -= slides[0].swiperSlideOffset;
        }
        let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
        let tY = 0;
        const tZ = -100 * Math.abs(progress);
        let scale = 1;
        let rotate = -params.perSlideRotate * progress;
        let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
        const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i4 : i4;
        const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
        const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
        if (isSwipeToNext || isSwipeToPrev) {
          const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
          rotate += -28 * progress * subProgress;
          scale += -0.5 * subProgress;
          tXAdd += 96 * subProgress;
          tY = `${-25 * subProgress * Math.abs(progress)}%`;
        }
        if (progress < 0) {
          tX = `calc(${tX}px ${rtl ? "-" : "+"} (${tXAdd * Math.abs(progress)}%))`;
        } else if (progress > 0) {
          tX = `calc(${tX}px ${rtl ? "-" : "+"} (-${tXAdd * Math.abs(progress)}%))`;
        } else {
          tX = `${tX}px`;
        }
        if (!swiper.isHorizontal()) {
          const prevY = tY;
          tY = tX;
          tX = prevY;
        }
        const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
        const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rtl ? -rotate : rotate : 0}deg)
        scale(${scaleString})
      `;
        if (params.slideShadows) {
          let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
          if (!shadowEl) {
            shadowEl = createShadow("cards", slideEl);
          }
          if (shadowEl)
            shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
        }
        slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = transform;
      }
    };
    const setTransition2 = (duration) => {
      const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
      transformElements.forEach((el) => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements
      });
    };
    effectInit({
      effect: "cards",
      swiper,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      perspective: () => true,
      overwriteParams: () => ({
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  // node_modules/swiper/swiper-bundle.mjs
  var modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
  Swiper.use(modules);

  // js/components/sliders.js
  function initSliders() {
    if (document.querySelector(".trainers-slider")) {
      document.querySelectorAll(".trainers-slider").forEach((slider) => {
        const trainersSlider = new Swiper(slider, {
          direction: "horizontal",
          loop: false,
          speed: 500,
          slidesPerView: 1.25,
          spaceBetween: 20,
          breakpoints: {
            520: {
              slidesPerView: 2.25
            },
            1024: {
              slidesPerView: 3.25
            }
          },
          scrollbar: {
            el: ".swiper-scrollbar"
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      });
    }
    if (document.querySelector(".app-slider")) {
      document.querySelectorAll(".app-slider").forEach((slider) => {
        const appSlider = new Swiper(slider, {
          direction: "horizontal",
          loop: false,
          speed: 500,
          slidesPerView: 1.25,
          spaceBetween: 20,
          breakpoints: {
            600: {
              slidesPerView: 2.25
            },
            1e3: {
              slidesPerView: 3.25
            },
            1200: {
              slidesPerView: 4
            }
          },
          scrollbar: {
            el: ".swiper-scrollbar"
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      });
    }
    if (document.querySelector(".tabs-slider")) {
      document.querySelectorAll(".tabs-slider").forEach((slider) => {
        const tabsSlider = new Swiper(slider, {
          direction: "horizontal",
          loop: false,
          speed: 500,
          slidesPerView: 1,
          spaceBetween: 40,
          scrollbar: {
            el: ".swiper-scrollbar"
          }
        });
      });
    }
    if (document.querySelector(".membership-cards-slider")) {
      document.querySelectorAll(".membership-cards-slider").forEach((slider) => {
        const membershipsSlider = new Swiper(slider, {
          direction: "horizontal",
          loop: false,
          speed: 500,
          slidesPerView: 1.01,
          spaceBetween: 10,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets"
          }
        });
      });
    }
    if (document.querySelector(".home-banner-slider")) {
      const homeBannerSlider = new Swiper(".home-banner-slider", {
        effect: "fade",
        loop: true,
        speed: 1500,
        autoplay: {
          delay: 4e3
        },
        allowTouchMove: false
      });
    }
    if (document.querySelector(".single-gym-slider")) {
      const singleGymSlider = new Swiper(".single-gym-slider", {
        effect: "fade",
        loop: true,
        speed: 1500,
        autoplay: {
          delay: 4e3
        },
        allowTouchMove: false
      });
    }
    if (document.querySelector(".gym-slider")) {
      document.querySelectorAll(".gym-slider").forEach((slider) => {
        const gymSlider = new Swiper(slider, {
          direction: "horizontal",
          loop: true,
          speed: 500,
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets"
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      });
    }
    if (document.querySelector("[data-presale-slider]")) {
      new Swiper("[data-presale-slider]", {
        direction: "horizontal",
        loop: false,
        speed: 500,
        slidesPerView: 1.25,
        spaceBetween: 16,
        breakpoints: {
          768: {
            slidesPerView: 2.25
          },
          1024: {
            slidesPerView: 3.25
          },
          1600: {
            slidesPerView: 4.25,
            spaceBetween: 24
          }
        },
        scrollbar: {
          el: ".swiper-scrollbar"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
    if (document.querySelector(".gallerySwiper")) {
      new Swiper(".gallerySwiper", {
        loop: true,
        speed: 500,
        centeredSlides: true,
        slidesPerView: 1.3,
        spaceBetween: 16,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
    if (document.querySelector(".card-slider")) {
      new Swiper(".card-slider", {
        effect: "cards",
        cardsEffect: {
          slideShadows: false,
          perSlideOffset: 4
        },
        loop: true,
        speed: 500,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 16,
        grabCursor: true
      });
    }
  }

  // Revo/js/TrainersFilter.js
  var TrainersFilter = class {
    constructor() {
      this.state = document.querySelector("#stateSelect").value;
      this.fetchGymsWhereState(this.state);
      this.setupUpdateState();
      this.setupUpdateGym();
    }
    setupUpdateState() {
      const stateSelect = document.querySelector("#stateSelect");
      stateSelect.addEventListener("change", (e4) => {
        const state = e4.target.value;
        this.fetchGymsWhereState(state);
        this.fetchGymsWhereStateHTML(state);
      });
    }
    setupUpdateGym() {
      const gymSelect = document.querySelector("#gymSelect");
      gymSelect.addEventListener("change", (e4) => {
        const gyms = document.querySelectorAll("[data-gym]");
        const gym = e4.target.value;
        gyms.forEach(
          (g3) => g3.getAttribute("data-gym") !== gym ? g3.classList.add("hidden") : g3.classList.remove("hidden")
        );
      });
    }
    /**
     * Get Gyms grouped by the state they're in
     */
    fetchGymsWhereState(state) {
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ajax.ajax_url,
        data: {
          action: "get_gyms_where_state",
          state,
          security: ajax.nonce
        },
        success: ({ data }) => {
          const gyms = data;
          const gymOptions = document.querySelector("#gymSelect");
          gymOptions.innerHTML = `<option disabled selected>Choose your gym</option>`;
          gyms.forEach((gym) => {
            gymOptions.innerHTML += `<option value="${gym.post_title}">${gym.post_title}</option>`;
          });
        }
      });
    }
    /**
     * Get Gyms grouped by the state they're in
     */
    fetchGymsWhereStateHTML(state) {
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ajax.ajax_url,
        data: {
          action: "get_gyms_where_state_html",
          state,
          template: "partial/trainers-loop.twig",
          security: ajax.nonce
        },
        success: ({ data }) => {
          const container = document.querySelector("[data-sliders-container]");
          container.innerHTML = data;
          container.style.scrollMarginTop = "100px";
          container.scrollIntoView({ behavior: "smooth" });
          initSliders();
        }
      });
    }
  };
  var TrainersFilter_default = TrainersFilter;

  // Revo/js/live-counter.js
  function initLiveCounter() {
    if (!document.querySelector("#liveCounter")) {
      return;
    }
    const gymSelect = document.querySelector("#liveCounter #gymSelect");
    gymSelect.addEventListener("change", (e4) => gymSelectChangeHandler(e4));
    const gymSelectChangeHandler = (e4) => {
      const gym = e4.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
      const card = document.querySelector(`[data-counter-card="${gym}"]`);
      const count = document.querySelector(`[data-live-count="${gym}"]`);
      console.log(card);
      document.querySelectorAll("[data-counter-card]")?.forEach((card2) => card2.classList.add("hidden"));
      document.querySelectorAll("[data-live-count]")?.forEach((count2) => count2.classList.add("hidden"));
      card?.classList.remove("hidden");
      count?.classList.remove("hidden");
    };
  }

  // Revo/js/index.js
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#sign-up-form")) {
      new SignUpForm_default();
    }
    if (document.querySelector("#gymFilters")) {
      new TrainersFilter_default();
    }
    initializeGymMap();
    initLiveCounter();
    setupAccordions();
    if (document.querySelector("[data-presale-form]")) {
      const presaleForm = document.querySelector("[data-presale-form]");
      const formContent = document.querySelector("[data-presale-form-content]");
      presaleForm.addEventListener(
        "click",
        () => formContent.classList.toggle("hidden")
      );
    }
  });
})();
/*! Bundled license information:

signature_pad/dist/signature_pad.js:
  (*!
   * Signature Pad v4.1.7 | https://github.com/szimek/signature_pad
   * (c) 2023 Szymon Nowak | Released under the MIT license
   *)

@googlemaps/js-api-loader/dist/index.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
