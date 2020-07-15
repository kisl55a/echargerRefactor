(window.webpackJsonptemplate=window.webpackJsonptemplate||[]).push([[0],{1:function(e,t,a){e.exports={map:"Main_map__2A5Ok",mapBlured:"Main_mapBlured__1vMs5",mainInfo:"Main_mainInfo__HfHzs",generalGrid:"Main_generalGrid__2Aljb",registration:"Main_registration__9PmD5",gridForMenu:"Main_gridForMenu__t4NZs","post-1":"Main_post-1__20N_-","post-2":"Main_post-2__1L0in","post-3":"Main_post-3__1aiSU",da:"Main_da__192AR",searchRes:"Main_searchRes__uCSW3",searchResTaken:"Main_searchResTaken___mryC",station:"Main_station__Eh8No",stationTaken:"Main_stationTaken__3w6ty",logo:"Main_logo__Nqnmz",buttonGreen:"Main_buttonGreen__2t2go",buttonBlue:"Main_buttonBlue__2ejNs",proceedButton:"Main_proceedButton__3c4Vx",cancelButton:"Main_cancelButton__25PgW",cancelButtonMainPage:"Main_cancelButtonMainPage__doyqb",zebra:"Main_zebra__Yj0hC",infoHeader:"Main_infoHeader__28sSP",stationInfo:"Main_stationInfo__SiEFV",property:"Main_property__Mtkn0",chargingInfo:"Main_chargingInfo__3CoSJ",loader:"Main_loader__3bmMG"}},109:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(12),o=a.n(c),i=(a(47),a(37)),s=a(7),l=a.n(s),u=a(14),m=a(5),g=a(15),p=a(3),h=a(38),f=a.n(h),d=a(1),E=a.n(d);function b(e){return r.a.createElement("div",null,"fast"===e.type.toLowerCase()?0===e.isTaken?r.a.createElement("img",{className:E.a.station,alt:"fastCharge",src:"/images/Charging.png"}):r.a.createElement("img",{className:E.a.stationTaken,alt:"fastCharge",src:"/images/Charging.png"}):0===e.isTaken?r.a.createElement("img",{className:E.a.station,alt:"slowCharge",src:"/images/slow.png"}):r.a.createElement("img",{className:E.a.stationTaken,alt:"slowCharge",src:"/images/slow.png"}))}var v=a(13),_=a.n(v),O=function(e){return r.a.createElement("div",{className:E.a.stationInfo},r.a.createElement("h4",{className:E.a.infoHeader},e.stationName),r.a.createElement("div",null,"Status: ",1===e.isTaken?"Taken":" Free"),r.a.createElement("div",null,"Address: ",e.address),r.a.createElement("div",null,"Type: ",e.type),r.a.createElement("div",null,"Power: ",e.power," ",r.a.createElement("sup",null,"kWh")),r.a.createElement("div",null,"Price: ",e.price,r.a.createElement("sup",null,e.measure)),e.isLoggedIn?r.a.createElement("div",null,"  Identifier: ",e.UUID):r.a.createElement("div",null),r.a.createElement("div",null," ",r.a.createElement("button",{className:E.a.cancelButtonMainPage,onClick:function(){e.setCurrentStationToNull()}}," Back ")))},k=function(e){function t(){e.setStation(e.info)}return 1!==e.info.isTaken?r.a.createElement("div",{className:E.a.zebra},r.a.createElement("div",{className:E.a.searchRes,onClick:t},e.info.stationName)):r.a.createElement("div",{className:E.a.zebra},r.a.createElement("div",{className:E.a.searchResTaken,onClick:t},e.info.stationName))};function y(e){return r.a.createElement("div",null,e.isCharging?r.a.createElement("div",{className:E.a.chargingInfo},r.a.createElement("h5",{className:E.a.infoHeader}," Station UUID:",e.UUID.toUpperCase()," "),r.a.createElement("div",null,"The price:",e.currentCharge.cost," ",r.a.createElement("sup",null,"EUR")," "),r.a.createElement("div",null," Your time:",e.currentCharge.timeOfUsage," ",r.a.createElement("sup",null,"min")," "),"Your energy:",e.currentCharge.energy," ",r.a.createElement("sup",null,"kWh"),r.a.createElement("br",null),r.a.createElement("button",{className:E.a.cancelButtonMainPage,onClick:e.stopCharging}," Stop charging")):r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.startCharging(t.target.identifier.value)}},r.a.createElement("div",null,"Enter the Identifier"),r.a.createElement("div",null," ",e.noChargerNotification),r.a.createElement("input",{type:"text",name:"identifier"}),r.a.createElement("button",{type:"submit",className:E.a.buttonGreen}," Start charging")))}function w(e){return r.a.createElement("div",{className:E.a.gridForMenu},r.a.createElement("div",{className:E.a.post1},r.a.createElement("img",{className:E.a.logo,alt:"logo",src:"images/logo.png"}),r.a.createElement("br",null),!0!==e.isLoggedIn?r.a.createElement("div",null,r.a.createElement("div",null," ",e.message),r.a.createElement(g.b,{to:"/login"},r.a.createElement("button",{className:E.a.buttonGreen}," Login ")),r.a.createElement(g.b,{to:"/registration"},r.a.createElement("button",{className:E.a.buttonGreen},"Registration"))):r.a.createElement("div",null,r.a.createElement(g.b,{to:"/profile"},r.a.createElement("button",{className:E.a.buttonGreen},"Profile")),r.a.createElement("button",{className:E.a.buttonBlue,onClick:e.logout},"Logout"))),r.a.createElement("div",{id:"mainInfo",className:E.a.post2},r.a.createElement("div",{id:"infoAboutStation"},r.a.createElement("h3",null," Choose station on the map/list or search"),r.a.createElement("input",{type:"search",placeholder:"Search ",onChange:function(t){e.onSearchFilterUpdate(t.target.value)}})," ",r.a.createElement("br",null),e.currentMarker.stationName?r.a.createElement(O,Object.assign({},e.currentMarker,{setCurrentStationToNull:e.setCurrentStationToNull,isLoggedIn:e.isLoggedIn})):0===e.resultArray.length?" No results":e.resultArray.map((function(t,a){return r.a.createElement(k,{key:a,setStation:e.setStation,setCurrentStationToNull:e.setCurrentStationToNull,info:t})}))),r.a.createElement("br",null)),r.a.createElement("div",{className:E.a.post3},e.isLoggedIn?r.a.createElement(y,{startCharging:e.startCharging,noChargerNotification:e.noChargerNotification,isCharging:e.isCharging,idCharging:e.idCharging,UUID:e.UUID,currentCharge:e.currentCharge,stopCharging:e.stopCharging}):"You can start charging when you are logged in"))}function j(e){return r.a.createElement("div",{className:(E.a.generalGrid,E.a.registration)},r.a.createElement("h2",null," Login "),r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.login(t.target.name.value,t.target.password.value),e.history.goBack()}},r.a.createElement("div",null,"Nickname"),r.a.createElement("input",{type:"text",name:"name"}),r.a.createElement("div",null,"Password"),r.a.createElement("input",{type:"password",name:"password"}),r.a.createElement("button",{className:E.a.cancelButton,onClick:function(t){t.preventDefault(),e.history.goBack()}},"Cancel"),r.a.createElement("button",{className:E.a.proceedButton,type:"submit"},"Login")))}function N(e){return r.a.createElement("div",{className:(E.a.generalGrid,E.a.registration)},r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),t.target.password.value!==t.target.password1.value||(e.register(t.target.username.value,t.target.email.value,t.target.password.value),"Created"===e.message&&e.history.goBack())}},r.a.createElement("h2",null,"Registration"),r.a.createElement("div",null,"Username"),r.a.createElement("input",{type:"text",name:"username"}),r.a.createElement("div",null,"Email"),r.a.createElement("input",{type:"text",name:"email"}),r.a.createElement("div",null,"Password"),r.a.createElement("input",{type:"password",name:"password"}),r.a.createElement("div",null,"Password"),r.a.createElement("input",{type:"password",name:"password1"}),r.a.createElement("br",null),r.a.createElement("button",{className:E.a.cancelButton,onClick:function(t){t.preventDefault(),e.history.goBack(),e.setMessageToNull()}},"Back"),r.a.createElement("button",{className:E.a.proceedButton,type:"submit"},"Register"),r.a.createElement("div",{id:"message"}," ","Incorrect username or password"===e.message?"":e.message," ")))}function C(e){return r.a.createElement("tr",null,r.a.createElement("th",null,e.UUID),r.a.createElement("th",null,e.timeOfStart.substr(0,9)),r.a.createElement("th",null," ",e.energy),r.a.createElement("th",null,e.timeOfUsage," "),r.a.createElement("th",null,e.cost," "))}function S(e){return console.log(e.userHistory),r.a.createElement("div",null,0!==e.userHistory.length?r.a.createElement("table",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Station Number"),r.a.createElement("th",null,"Date"),r.a.createElement("th",null,"Energy(kWt)"),r.a.createElement("th",null,"Time of usage(min)"),r.a.createElement("th",null,"Cost(EUR)")),r.a.createElement("tbody",null,e.userHistory.filter((function(e){return 0!==e.timeOfUsage})).map((function(e,t){return r.a.createElement(C,Object.assign({key:t},e))})))):"You have no charges",r.a.createElement("button",{className:E.a.cancelButton,onClick:function(t){t.preventDefault(),e.history.goBack()}},"Back"),r.a.createElement("div",{id:"message",className:E.a.hidden}," ",e.message," "))}var M=a(40),I=a.n(M),B=a(16);function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function T(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(a,!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var U=a(41),P={position:B.b.TOP_RIGHT,timeout:5e3,offset:"30px",transition:B.c.SCALE};o.a.render(r.a.createElement(B.a,Object.assign({template:U.a},P),r.a.createElement((function(e){var t=this,a=Object(n.useState)(!1),c=Object(m.a)(a,2),o=c[0],i=c[1],s=Object(n.useState)([]),h=Object(m.a)(s,2),d=h[0],v=h[1],k=Object(n.useState)(""),y=Object(m.a)(k,2),C=y[0],M=y[1],x=Object(n.useState)(!1),U=Object(m.a)(x,2),P=U[0],D=U[1],A=Object(n.useState)(""),L=Object(m.a)(A,2),R=L[0],z=L[1],G=Object(n.useState)(""),H=Object(m.a)(G,2),F=(H[0],H[1]),W=Object(n.useState)(""),Y=Object(m.a)(W,2),J=Y[0],q=Y[1],V=Object(n.useState)([]),X=Object(m.a)(V,2),K=X[0],Q=X[1],Z=Object(n.useState)({lat:65.01,lng:25.49}),$=Object(m.a)(Z,2),ee=$[0],te=$[1],ae=Object(n.useState)(13),ne=Object(m.a)(ae,2),re=ne[0],ce=ne[1],oe=Object(n.useState)([]),ie=Object(m.a)(oe,2),se=ie[0],le=ie[1],ue=Object(n.useState)([]),me=Object(m.a)(ue,2),ge=me[0],pe=me[1],he=Object(n.useState)(!1),fe=Object(m.a)(he,2),de=fe[0],Ee=fe[1],be=Object(n.useState)(""),ve=Object(m.a)(be,2),_e=ve[0],Oe=ve[1],ke=Object(n.useState)(""),ye=Object(m.a)(ke,2),we=ye[0],je=ye[1],Ne=Object(n.useState)(""),Ce=Object(m.a)(Ne,2),Se=Ce[0],Me=Ce[1],Ie=Object(n.useState)({}),Be=Object(m.a)(Ie,2),xe=Be[0],Te=Be[1],Ue=Object(B.d)();Object(n.useEffect)((function(){_.a.get("".concat("https://echarger-backend.herokuapp.com","/v1/stations/getAllStations")).then((function(e){le(e.data.rows),pe(e.data.rows)})).catch((function(e){console.error(e)}))}),[]),Object(n.useEffect)((function(){_.a.get("".concat("https://echarger-backend.herokuapp.com","/v1/stations/getAllStations")).then((function(e){le(e.data.rows),pe(e.data.rows)})).catch((function(e){console.error(e)})),""!==J&&Fe()}),[o,J]),Object(n.useEffect)((function(){if(we&&de){var e=setInterval((function(){He()}),5e3);return function(){return clearInterval(e)}}}),[we]);var Pe=function(){We(),D(!1),z(""),F(""),Oe(""),q(""),M("")},De=function(e,t){_.a.post("".concat("https://echarger-backend.herokuapp.com","/v1/users/login"),{},{auth:{username:e,password:t}}).then(function(){var a=Object(u.a)(l.a.mark((function a(n){return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:D(!0),z(e),F(t),q(n.data.token),Ue.success("Succesfully logged in",{timeout:3e3});case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()).catch((function(e){Ue.error("Incorrect username or password",{timeout:3e3})}))},Ae=function(e,t,a){_.a.post("".concat("https://echarger-backend.herokuapp.com","/v1/users/register"),{username:e,email:t,password:a}).then((function(e){Ue.success("Succesfully created",{timeout:3e3})})).catch((function(e){Ue.error("An error occured",{timeout:3e3})}))},Le=function(){return M("")},Re=function(e){pe(se.filter((function(t){return t.stationName.toLowerCase().indexOf(e.toLowerCase())>=0}))),Q({})},ze=function(e){Q(e),te({lat:e.lat,lng:e.lng}),ce(16)},Ge=function(){Q({})},He=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _.a.put("".concat("https://echarger-backend.herokuapp.com","/v1/stations/chargingProcess/").concat(we),{},{headers:{Authorization:"Bearer ".concat(J)}}).then((function(e){Te(T({},e.data.rows[0]))})).catch(),e.next=3,Fe();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Fe=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("".concat("https://echarger-backend.herokuapp.com","/v1/users/history/userHistory"),{headers:{Authorization:"Bearer ".concat(J)}}).then((function(e){v(e.data.rows)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),We=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Ee(!1),!we){e.next=4;break}return e.next=4,_.a.put("".concat("https://echarger-backend.herokuapp.com","/v1/stations/stopCharging/").concat(we),{},{headers:{Authorization:"Bearer ".concat(J)}}).then(function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(!o),Ue.info("Stopped charging",{timeout:3e3});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return console.log(e)}));case 4:je(0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ye=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return""===t&&(t=0),e.next=3,_.a.post("".concat("https://echarger-backend.herokuapp.com","/v1/stations/startCharging/").concat(t),{},{headers:{Authorization:"Bearer ".concat(J)}}).then(function(){var e=Object(u.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:!1!==a.data?(Ee(!0),Oe(t),je(a.data.rows[0].id),Me(""),Te({cost:0,timeOfUsage:0,energy:0}),i(!o),Ue.success("Started charging",{timeout:3e3})):Ue.info("No charger with such ID or it's taken already",{timeout:6e3});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){Ue.info("No charger with such ID or it's taken already",{timeout:3e3}),console.error(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:E.a.generalGrid},r.a.createElement("main",null,r.a.createElement(g.a,null,r.a.createElement(p.a,{path:"/station/:id",exact:!0,render:function(e){return r.a.createElement(O,Object.assign({},e,{getInfoAboutStation:t.getInfoAboutStation}))}}),r.a.createElement(p.a,{path:"/login",exact:!0,render:function(e){return r.a.createElement(j,Object.assign({login:De},e,{username:R,message:C,setMessageToNull:Le}))}}),r.a.createElement(p.a,{path:"/profile",exact:!0,render:function(e){return r.a.createElement(S,Object.assign({userHistory:d},e))}}),r.a.createElement(p.a,{path:"/registration",exact:!0,render:function(e){return r.a.createElement(N,Object.assign({},e,{register:Ae,message:C,setMessageToNull:Le}))}}),r.a.createElement(p.a,{path:"/",exact:!0,render:function(e){return r.a.createElement(w,{logout:Pe,message:C,currentMarker:K,isLoggedIn:P,onSearchFilterUpdate:Re,resultArray:ge.slice(0,7),setStation:ze,setCurrentStationToNull:Ge,startCharging:Ye,noChargerNotification:Se,isCharging:de,UUID:_e,idCharging:we,currentCharge:xe,stopCharging:We})}}))),r.a.createElement(I.a,{className:E.a.loader,type:"Oval",color:"#00BFFF",height:"10rem",width:"10rem",timeout:1e6,visible:0===se.length}),r.a.createElement("div",{className:0===se.length?E.a.mapBlured:E.a.map},r.a.createElement(f.a,{center:ee,bootstrapURLKeys:{key:"AIzaSyBQc4fDzvIrxXU2Md73EjyY6oXWspFCMSY"},zoom:re,onChildClick:function(e,t){var a;se.forEach((function(e){e.stationName===t.text&&(a=e)})),te({lat:t.lat,lng:t.lng}),ce(16),Q(a)}},se.map((function(e,t){return r.a.createElement(b,{key:t,lat:e.lat,lng:e.lng,isTaken:e.isTaken,type:e.type,text:e.stationName})})))))}),null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},42:function(e,t,a){e.exports=a(109)},47:function(e,t,a){}},[[42,1,2]]]);
//# sourceMappingURL=main.ab46c3b0.chunk.js.map