"format amd";!function(e){function t(e){throw RangeError(T[e])}function r(e,t){for(var r=e.length;r--;)e[r]=t(e[r]);return e}function n(e,t){return r(e.split(A),t).join(".")}function i(e){for(var t,r,n=[],i=0,o=e.length;o>i;)t=e.charCodeAt(i++),t>=55296&&56319>=t&&o>i?(r=e.charCodeAt(i++),56320==(64512&r)?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),i--)):n.push(t);return n}function o(e){return r(e,function(e){var t="";return e>65535&&(e-=65536,t+=N(e>>>10&1023|55296),e=56320|1023&e),t+=N(e)}).join("")}function s(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:m}function a(e,t){return e+22+75*(26>e)-((0!=t)<<5)}function u(e,t,r){var n=0;for(e=r?U(e/S):e>>1,e+=U(e/t);e>R*E>>1;n+=m)e=U(e/R);return U(n+(R+1)*e/(e+_))}function f(e){var r,n,i,a,f,l,c,h,d,p,g=[],y=e.length,v=0,_=I,S=L;for(n=e.lastIndexOf(O),0>n&&(n=0),i=0;n>i;++i)e.charCodeAt(i)>=128&&t("not-basic"),g.push(e.charCodeAt(i));for(a=n>0?n+1:0;y>a;){for(f=v,l=1,c=m;a>=y&&t("invalid-input"),h=s(e.charCodeAt(a++)),(h>=m||h>U((b-v)/l))&&t("overflow"),v+=h*l,d=S>=c?w:c>=S+E?E:c-S,!(d>h);c+=m)p=m-d,l>U(b/p)&&t("overflow"),l*=p;r=g.length+1,S=u(v-f,r,0==f),U(v/r)>b-_&&t("overflow"),_+=U(v/r),v%=r,g.splice(v++,0,_)}return o(g)}function l(e){var r,n,o,s,f,l,c,h,d,p,g,y,v,_,S,B=[];for(e=i(e),y=e.length,r=I,n=0,f=L,l=0;y>l;++l)g=e[l],128>g&&B.push(N(g));for(o=s=B.length,s&&B.push(O);y>o;){for(c=b,l=0;y>l;++l)g=e[l],g>=r&&c>g&&(c=g);for(v=o+1,c-r>U((b-n)/v)&&t("overflow"),n+=(c-r)*v,r=c,l=0;y>l;++l)if(g=e[l],r>g&&++n>b&&t("overflow"),g==r){for(h=n,d=m;p=f>=d?w:d>=f+E?E:d-f,!(p>h);d+=m)S=h-p,_=m-p,B.push(N(a(p+S%_,0))),h=U(S/_);B.push(N(a(h,0))),f=u(n,v,o==s),n=0,++o}++n,++r}return B.join("")}function c(e){return n(e,function(e){return B.test(e)?f(e.slice(4).toLowerCase()):e})}function h(e){return n(e,function(e){return x.test(e)?"xn--"+l(e):e})}var d="object"==typeof exports&&exports,p="object"==typeof module&&module&&module.exports==d&&module,g="object"==typeof global&&global;(g.global===g||g.window===g)&&(e=g);var y,v,b=2147483647,m=36,w=1,E=26,_=38,S=700,L=72,I=128,O="-",B=/^xn--/,x=/[^ -~]/,A=/\x2E|\u3002|\uFF0E|\uFF61/g,T={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},R=m-w,U=Math.floor,N=String.fromCharCode;if(y={version:"1.2.4",ucs2:{decode:i,encode:o},decode:f,encode:l,toASCII:h,toUnicode:c},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return y});else if(d&&!d.nodeType)if(p)p.exports=y;else for(v in y)y.hasOwnProperty(v)&&(d[v]=y[v]);else e.punycode=y}(this);
//# sourceMappingURL=punycode.js.map