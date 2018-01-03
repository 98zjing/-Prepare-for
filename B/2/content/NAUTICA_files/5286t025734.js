(function(){var a=function(){var m=this;var v="tracker.marinsm.com";var E="5286t025734";
var F=365;var x=[];var n=false;var l=function(){var H=["mkwid","pcrid"];return H};
this.setClientId=function(H){E=H};this.activateAnonymizeIp=function(){n=true};var C=function(){return E
};this.setHost=function(H){v=H};var e=function(){return v};this.setExpires=function(H){F=H
};var i=function(){var H=new Date();H.setTime(H.getTime()+(F*24*60*60*1000));return"; expires="+H.toUTCString()
};var B=function(){var H=new Date();return H.getTimezoneOffset()/60};var c=function(H){return(typeof H==="function")||(!!H&&typeof H!="string"&&!H.nodeName&&H.constructor!=Array&&/^[\s[]?function/.test(H+""))
};var d=function(I,H){if(!I){return""}var J=encodeURIComponent;if(c(J)){return H?encodeURI(I):J(I)
}return escape(I)};this.trackPage=function(){if(s()){var H=window.location.protocol+"//"+e()+"/tp?act=1&cid="+d(C())+"&tz="+d(B())+"&ref="+d(document.referrer)+"&page="+d(window.location);
if(t()){H+="&uuid="+d(w())}else{H+="&uuid="+d(G())}if(n){H+="&anonymizeIp=set"}g(H)
}};var s=function(){var H=p(window.location.toString())||p(document.referrer)||!r(document.referrer,window.location.toString());
if(!t()){u("_msuuid",G())}return H};var r=function(I,H){var K=/^([^:]*:\/\/)?([^:]*:[^@]*@)?([^\/:\?]*\.[^\/:\?]*)?(:[^\/]*)?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i;
try{return I.match(K)[3]==H.match(K)[3]}catch(J){}return false};var j=function(H){var I=H.indexOf("/","https://".length);
var J=H.indexOf("?","https://".length);if(I>=0){return H.substring(I+1)}else{if(J>=0){return H.substring(J+1)
}}return""};var f=function(H,I){var J=j(I);if(J.length>0){var K=new RegExp("\\W"+H+"\\W");
return K.test(J)}return false};var p=function(K){if(K==null||K==""){return false}var I=l();
for(var J=0,H=I.length;J<H;J++){if(f(I[J],K)){return true}}return false};this.addTrans=function(H){if(H!=null){x.push(H)
}};this.processOrders=function(){for(var I=0;I<x.length;++I){var H=k(x[I]);g(H)}};
var k=function(K){var J=q(K);var I=window.location.protocol+"//"+e()+"/tp?act=2&cid="+d(C())+"&tz="+d(B())+"&trans="+d(J)+"&ref="+d(document.referrer)+"&page="+d(window.location);
var H=h(K);if(H!=null){I=I+"&currency="+d(H)}if(t()){I+="&uuid="+d(w())}else{I+="&uuid="+d(G())
}if(n){I+="&anonymizeIp=set"}return I};var q=function(O){var M="";var J=O.orderId;
if(typeof O.items!="undefined"){var K=O.items;try{for(var L=0,I=K.length;L<I;++L){M+=D(K[L],J)
}}catch(N){}}var H=(M==="");M=A(O,H)+M;return M};var A=function(M,I){var H=["orderId","affiliation","total","tax","shipping","city","state","country"];
var J=["UTM:T"];var L=false;for(var K=0;K<H.length;++K){if(typeof M[H[K]]!="undefined"){J.push(M[H[K]]);
L=true}else{J.push("")}}return(L||I)?J.join("|")+"\n":""};var D=function(L,H){var N=["convType","product","category","price","quantity"];
var I=["UTM:I"];var K=L.orderId||H||"";I.push(K);var M=false;for(var J=0;J<N.length;
++J){if(typeof L[N[J]]!="undefined"){I.push(L[N[J]]);M=true}else{I.push("")}}return M?I.join("|")+"\n":""
};var h=function(H){if(typeof H.currency=="undefined"){return null}return H.currency
};var z=function(H){var M=null;if(document.cookie&&document.cookie!=""){var K=document.cookie.split(";");
for(var J=0;J<K.length;J++){var I=K[J];I=I.replace(/^\s+/,"");var L=H+"_"+C();if((I.substring(0,L.length+1))==(L+"=")){M=decodeURIComponent(I.substring(L.length+1));
break}}}return M};var u=function(H,I){if(I!=null&&I!=""){document.cookie=H+"_"+C()+"="+d(I)+"; path=/"+i()
}};var o=function(){};this.registerCallback=function(H){if(typeof H==="function"){o=H
}};var g=function(H){var J=H+"&rnd="+Math.round(Math.random()*2147483647);var I=new Image(1,1);
I.src=J;I.onload=function(){I.onload=null;o(this)}};var w=function(){return z("_msuuid")
};var t=function(){var H=w();return(H!=null&&H.length>0)};var G=function(){var N="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var M=N,K=[],I=Math.random;var J=M.length;var L;K[8]=K[13]=K[18]=K[23]="-";K[14]="4";
for(var H=0;H<36;H++){if(!K[H]){L=0|I()*16;K[H]=M[(H==19)?(L&3)|8:L&15]}}return K.join("")
};var y=function(H){try{return m[H[0]].apply(m,H.slice(1))}catch(I){}};this.execQueue=function(){var H=window._mTrack||[];
while(H.length>0){var I=H.shift();y(I)}};return this};var b=new a();if(typeof window._mTrack=="undefined"){window._mTrack=[]
}window._mTrack.push=function(c){Array.prototype.push.apply(window._mTrack,arguments);
b.execQueue()};b.execQueue()})();