(this["webpackJsonp01-firsr-project"]=this["webpackJsonp01-firsr-project"]||[]).push([[4],{313:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__3bZI5",dialogsItems:"Dialogs_dialogsItems__2llPa",dialog:"Dialogs_dialog__1tH9j",active:"Dialogs_active__1plan",messages:"Dialogs_messages__2aytv",message:"Dialogs_message__1XOAi"}},314:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var n=t(83),s=t(0),i=t.n(s),c=t(11),r=t(9),l=function(e){return{isAuth:e.auth.isAuth}};function o(e){return Object(r.b)(l,{})((function(a){a.isAuth;var t=Object(n.a)(a,["isAuth"]);return a.isAuth?i.a.createElement(e,t):i.a.createElement(c.a,{to:"/login"})}))}},319:function(e,a,t){"use strict";t.r(a);var n=t(4),s=t(0),i=t.n(s),c=t(313),r=t.n(c),l=t(18),o=function(e){var a="/dialogs/"+e.id;return i.a.createElement("div",{className:"".concat(r.a.dialog," ").concat(r.a.active)},i.a.createElement(l.b,{to:a},e.name))},m=function(e){return i.a.createElement("div",{className:r.a.message},e.message)},u=t(142),g=t(30),d=t(56),b=Object(d.a)(50),f=Object(u.a)({form:"dialogAddMessageForm"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit},i.a.createElement("div",null,Object(g.c)("Enter your message","newMessageBody",g.b,[d.b,b])),i.a.createElement("div",null,i.a.createElement("button",null,"Send")))})),_=function(e){var a=e.dialogsPage,t=a.dialogs.map((function(e){return i.a.createElement(o,{name:e.name,key:e.id,id:e.id})})),n=a.messages.map((function(e){return i.a.createElement(m,{message:e.message,key:e.id})}));return i.a.createElement("div",{className:r.a.dialogs},i.a.createElement("div",{className:r.a.dialogsItems},t),i.a.createElement("div",{className:r.a.messages},i.a.createElement("div",null,n)),i.a.createElement(f,{onSubmit:function(a){e.sendMessage(a.newMessageBody)}}))},v=t(119),E=t(9),j=t(314),p=t(10);a.default=Object(p.d)(Object(E.b)((function(e){return{dialogsPage:e.dialogsPage}}),Object(n.a)({},v.a)),j.a)(_)}}]);
//# sourceMappingURL=4.20f960f0.chunk.js.map