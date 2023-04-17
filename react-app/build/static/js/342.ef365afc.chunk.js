/*! For license information please see 342.ef365afc.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkreact_app=self.webpackChunkreact_app||[]).push([[342],{9094:function(e,n,t){t.d(n,{Rk:function(){return j},gq:function(){return S},my:function(){return _},WF:function(){return I},Bo:function(){return k},pv:function(){return R},LL:function(){return A},EW:function(){return P}});var r=t(885),i=t(2791),o=t(3270),a=t(9434),l=t(6871),s=t(4362),u=function(e){return{type:s.zn,payload:e}},c=function(e){return{type:s.yX,payload:e}},d=function(){return{type:s.Hu}},f=function(e){return{type:s.XZ,payload:e}},h=function(e){return{type:s.Cj,payload:e}},v={project_id:"project",platform:"platform",env_id:"environment",version:"version",title:"title",note:"note",apk:"apk",ipa:"ipa","bundle-identifier":"bundleIdentifier","bundle-version":"bundleVersion","bundle-title":"bundleTitle"},m=function(e){return function(n){return n.release[e]}},g=m("isLoading"),p=m("list"),y=m("listParams"),w=m("getListFailed"),E=m("item"),M=m("getItemFailed"),N=m("createSuccess"),C=m("createFailed"),b=m("deleteSuccess"),x=m("deleteFailed"),R=function(){var e=(0,o.Kx)(),n=e.get("page")||1,t=e.get("per_page")||10,r=e.get("project_id"),a=e.get("env_id"),l=e.get("platform");return(0,i.useMemo)((function(){return{page:n,per_page:t,relation_project:!0,relation_env:!0,order_by_created_at:"desc",project_id:r||void 0,env_id:a||void 0,platform:l||void 0}}),[n,t,r,a,l])},k=function(e){return(0,o.Zp)({action:u,loadingSelector:g,dataSelector:p,failedSelector:w,param:e})},A=function(){return(0,a.v9)(y)},_=function(){return(0,i.useMemo)((function(){return{project:"",platform:"",environment:"",version:"",title:"",note:"",apk:null,windows:null,ipa:null,bundleIdentifier:"",bundleVersion:"",bundleTitle:""}}),[])},j=function(e){var n=(0,l.s0)(),t=(0,o.qd)({loadingSelector:g,action:c}),i=(0,r.Z)(t,2),a=i[0],s=i[1];(0,o.E2)(N,"Create release success",(function(){return n("/")})),(0,o.dH)(C,"Create release Failed",(function(n){n.errors&&Object.keys(n.errors).map((function(t){e.setError(v[t]||t,{message:n.errors[t][0]})}))}));return[a,function(e){var n=new FormData,t={project_id:e.project.value,platform:e.platform.value,env_id:e.environment.value,version:e.version,title:e.title,note:e.note,apk:e.apk?e.apk[0]:null,ipa:e.ipa?e.ipa[0]:null,windows:e.windows?e.windows[0]:null,"bundle-identifier":e.bundleIdentifier,"bundle-version":e.bundleVersion,"bundle-title":e.bundleTitle};return Object.keys(t).map((function(e){n.append(e,t[e])})),s(n)}]},P=function(){(0,o.Yw)(d)},I=function(e){return(0,o.Zp)({action:f,loadingSelector:g,dataSelector:E,failedSelector:M,param:e})},S=function(e){var n=(0,a.I0)(),t=(0,o.qd)({loadingSelector:g,action:h}),i=(0,r.Z)(t,2),l=i[0],s=i[1];return(0,o.E2)(b,"Delete release success",(function(){n(u(e))})),(0,o.dH)(x,"Delete release Failed"),[l,s]}},5342:function(e,n,t){t.r(n),t.d(n,{default:function(){return P}});var r,i,o=t(885),a=t(2791),l=t(6871),s=t(5671),u=t(3144),c=t(7762),d=Object.defineProperty,f=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,m=function(e,n,t){return n in e?d(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t},g=function(e,n){for(var t in n||(n={}))h.call(n,t)&&m(e,t,n[t]);if(f){var r,i=(0,c.Z)(f(n));try{for(i.s();!(r=i.n()).done;){t=r.value;v.call(n,t)&&m(e,t,n[t])}}catch(o){i.e(o)}finally{i.f()}}return e},p=function(e,n){var t={};for(var r in e)h.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&f){var i,o=(0,c.Z)(f(e));try{for(o.s();!(i=o.n()).done;){r=i.value;n.indexOf(r)<0&&v.call(e,r)&&(t[r]=e[r])}}catch(a){o.e(a)}finally{o.f()}}return t};!function(e){var n=function(){function n(e,t,r,i){if((0,s.Z)(this,n),this.version=e,this.errorCorrectionLevel=t,this.modules=[],this.isFunction=[],e<n.MIN_VERSION||e>n.MAX_VERSION)throw new RangeError("Version value out of range");if(i<-1||i>7)throw new RangeError("Mask value out of range");this.size=4*e+17;for(var a=[],l=0;l<this.size;l++)a.push(!1);for(var u=0;u<this.size;u++)this.modules.push(a.slice()),this.isFunction.push(a.slice());this.drawFunctionPatterns();var c=this.addEccAndInterleave(r);if(this.drawCodewords(c),-1==i)for(var d=1e9,f=0;f<8;f++){this.applyMask(f),this.drawFormatBits(f);var h=this.getPenaltyScore();h<d&&(i=f,d=h),this.applyMask(f)}o(0<=i&&i<=7),this.mask=i,this.applyMask(i),this.drawFormatBits(i),this.isFunction=[]}return(0,u.Z)(n,[{key:"getModule",value:function(e,n){return 0<=e&&e<this.size&&0<=n&&n<this.size&&this.modules[n][e]}},{key:"getModules",value:function(){return this.modules}},{key:"drawFunctionPatterns",value:function(){for(var e=0;e<this.size;e++)this.setFunctionModule(6,e,e%2==0),this.setFunctionModule(e,6,e%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);for(var n=this.getAlignmentPatternPositions(),t=n.length,r=0;r<t;r++)for(var i=0;i<t;i++)0==r&&0==i||0==r&&i==t-1||r==t-1&&0==i||this.drawAlignmentPattern(n[r],n[i]);this.drawFormatBits(0),this.drawVersion()}},{key:"drawFormatBits",value:function(e){for(var n=this.errorCorrectionLevel.formatBits<<3|e,t=n,r=0;r<10;r++)t=t<<1^1335*(t>>>9);var a=21522^(n<<10|t);o(a>>>15==0);for(var l=0;l<=5;l++)this.setFunctionModule(8,l,i(a,l));this.setFunctionModule(8,7,i(a,6)),this.setFunctionModule(8,8,i(a,7)),this.setFunctionModule(7,8,i(a,8));for(var s=9;s<15;s++)this.setFunctionModule(14-s,8,i(a,s));for(var u=0;u<8;u++)this.setFunctionModule(this.size-1-u,8,i(a,u));for(var c=8;c<15;c++)this.setFunctionModule(8,this.size-15+c,i(a,c));this.setFunctionModule(8,this.size-8,!0)}},{key:"drawVersion",value:function(){if(!(this.version<7)){for(var e=this.version,n=0;n<12;n++)e=e<<1^7973*(e>>>11);var t=this.version<<12|e;o(t>>>18==0);for(var r=0;r<18;r++){var a=i(t,r),l=this.size-11+r%3,s=Math.floor(r/3);this.setFunctionModule(l,s,a),this.setFunctionModule(s,l,a)}}}},{key:"drawFinderPattern",value:function(e,n){for(var t=-4;t<=4;t++)for(var r=-4;r<=4;r++){var i=Math.max(Math.abs(r),Math.abs(t)),o=e+r,a=n+t;0<=o&&o<this.size&&0<=a&&a<this.size&&this.setFunctionModule(o,a,2!=i&&4!=i)}}},{key:"drawAlignmentPattern",value:function(e,n){for(var t=-2;t<=2;t++)for(var r=-2;r<=2;r++)this.setFunctionModule(e+r,n+t,1!=Math.max(Math.abs(r),Math.abs(t)))}},{key:"setFunctionModule",value:function(e,n,t){this.modules[n][e]=t,this.isFunction[n][e]=!0}},{key:"addEccAndInterleave",value:function(e){var t=this.version,r=this.errorCorrectionLevel;if(e.length!=n.getNumDataCodewords(t,r))throw new RangeError("Invalid argument");for(var i=n.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][t],a=n.ECC_CODEWORDS_PER_BLOCK[r.ordinal][t],l=Math.floor(n.getNumRawDataModules(t)/8),s=i-l%i,u=Math.floor(l/i),c=[],d=n.reedSolomonComputeDivisor(a),f=0,h=0;f<i;f++){var v=e.slice(h,h+u-a+(f<s?0:1));h+=v.length;var m=n.reedSolomonComputeRemainder(v,d);f<s&&v.push(0),c.push(v.concat(m))}for(var g=[],p=function(e){c.forEach((function(n,t){(e!=u-a||t>=s)&&g.push(n[e])}))},y=0;y<c[0].length;y++)p(y);return o(g.length==l),g}},{key:"drawCodewords",value:function(e){if(e.length!=Math.floor(n.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");for(var t=0,r=this.size-1;r>=1;r-=2){6==r&&(r=5);for(var a=0;a<this.size;a++)for(var l=0;l<2;l++){var s=r-l,u=0==(r+1&2)?this.size-1-a:a;!this.isFunction[u][s]&&t<8*e.length&&(this.modules[u][s]=i(e[t>>>3],7-(7&t)),t++)}}o(t==8*e.length)}},{key:"applyMask",value:function(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(var n=0;n<this.size;n++)for(var t=0;t<this.size;t++){var r=void 0;switch(e){case 0:r=(t+n)%2==0;break;case 1:r=n%2==0;break;case 2:r=t%3==0;break;case 3:r=(t+n)%3==0;break;case 4:r=(Math.floor(t/3)+Math.floor(n/2))%2==0;break;case 5:r=t*n%2+t*n%3==0;break;case 6:r=(t*n%2+t*n%3)%2==0;break;case 7:r=((t+n)%2+t*n%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[n][t]&&r&&(this.modules[n][t]=!this.modules[n][t])}}},{key:"getPenaltyScore",value:function(){for(var e=0,t=0;t<this.size;t++){for(var r=!1,i=0,a=[0,0,0,0,0,0,0],l=0;l<this.size;l++)this.modules[t][l]==r?5==++i?e+=n.PENALTY_N1:i>5&&e++:(this.finderPenaltyAddHistory(i,a),r||(e+=this.finderPenaltyCountPatterns(a)*n.PENALTY_N3),r=this.modules[t][l],i=1);e+=this.finderPenaltyTerminateAndCount(r,i,a)*n.PENALTY_N3}for(var s=0;s<this.size;s++){for(var u=!1,d=0,f=[0,0,0,0,0,0,0],h=0;h<this.size;h++)this.modules[h][s]==u?5==++d?e+=n.PENALTY_N1:d>5&&e++:(this.finderPenaltyAddHistory(d,f),u||(e+=this.finderPenaltyCountPatterns(f)*n.PENALTY_N3),u=this.modules[h][s],d=1);e+=this.finderPenaltyTerminateAndCount(u,d,f)*n.PENALTY_N3}for(var v=0;v<this.size-1;v++)for(var m=0;m<this.size-1;m++){var g=this.modules[v][m];g==this.modules[v][m+1]&&g==this.modules[v+1][m]&&g==this.modules[v+1][m+1]&&(e+=n.PENALTY_N2)}var p,y=0,w=(0,c.Z)(this.modules);try{for(w.s();!(p=w.n()).done;){y=p.value.reduce((function(e,n){return e+(n?1:0)}),y)}}catch(N){w.e(N)}finally{w.f()}var E=this.size*this.size,M=Math.ceil(Math.abs(20*y-10*E)/E)-1;return o(0<=M&&M<=9),o(0<=(e+=M*n.PENALTY_N4)&&e<=2568888),e}},{key:"getAlignmentPatternPositions",value:function(){if(1==this.version)return[];for(var e=Math.floor(this.version/7)+2,n=32==this.version?26:2*Math.ceil((4*this.version+4)/(2*e-2)),t=[6],r=this.size-7;t.length<e;r-=n)t.splice(1,0,r);return t}},{key:"finderPenaltyCountPatterns",value:function(e){var n=e[1];o(n<=3*this.size);var t=n>0&&e[2]==n&&e[3]==3*n&&e[4]==n&&e[5]==n;return(t&&e[0]>=4*n&&e[6]>=n?1:0)+(t&&e[6]>=4*n&&e[0]>=n?1:0)}},{key:"finderPenaltyTerminateAndCount",value:function(e,n,t){return e&&(this.finderPenaltyAddHistory(n,t),n=0),n+=this.size,this.finderPenaltyAddHistory(n,t),this.finderPenaltyCountPatterns(t)}},{key:"finderPenaltyAddHistory",value:function(e,n){0==n[0]&&(e+=this.size),n.pop(),n.unshift(e)}}],[{key:"encodeText",value:function(t,r){var i=e.QrSegment.makeSegments(t);return n.encodeSegments(i,r)}},{key:"encodeBinary",value:function(t,r){var i=e.QrSegment.makeBytes(t);return n.encodeSegments([i],r)}},{key:"encodeSegments",value:function(e,t){var i,l,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:40,d=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1,f=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];if(!(n.MIN_VERSION<=s&&s<=u&&u<=n.MAX_VERSION)||d<-1||d>7)throw new RangeError("Invalid value");for(i=s;;i++){var h=8*n.getNumDataCodewords(i,t),v=a.getTotalBits(e,i);if(v<=h){l=v;break}if(i>=u)throw new RangeError("Data too long")}for(var m=0,g=[n.Ecc.MEDIUM,n.Ecc.QUARTILE,n.Ecc.HIGH];m<g.length;m++){var p=g[m];f&&l<=8*n.getNumDataCodewords(i,p)&&(t=p)}var y,w=[],E=(0,c.Z)(e);try{for(E.s();!(y=E.n()).done;){var M=y.value;r(M.mode.modeBits,4,w),r(M.numChars,M.mode.numCharCountBits(i),w);var N,C=(0,c.Z)(M.getData());try{for(C.s();!(N=C.n()).done;){var b=N.value;w.push(b)}}catch(A){C.e(A)}finally{C.f()}}}catch(A){E.e(A)}finally{E.f()}o(w.length==l);var x=8*n.getNumDataCodewords(i,t);o(w.length<=x),r(0,Math.min(4,x-w.length),w),r(0,(8-w.length%8)%8,w),o(w.length%8==0);for(var R=236;w.length<x;R^=253)r(R,8,w);for(var k=[];8*k.length<w.length;)k.push(0);return w.forEach((function(e,n){return k[n>>>3]|=e<<7-(7&n)})),new n(i,t,k,d)}},{key:"getNumRawDataModules",value:function(e){if(e<n.MIN_VERSION||e>n.MAX_VERSION)throw new RangeError("Version number out of range");var t=(16*e+128)*e+64;if(e>=2){var r=Math.floor(e/7)+2;t-=(25*r-10)*r-55,e>=7&&(t-=36)}return o(208<=t&&t<=29648),t}},{key:"getNumDataCodewords",value:function(e,t){return Math.floor(n.getNumRawDataModules(e)/8)-n.ECC_CODEWORDS_PER_BLOCK[t.ordinal][e]*n.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][e]}},{key:"reedSolomonComputeDivisor",value:function(e){if(e<1||e>255)throw new RangeError("Degree out of range");for(var t=[],r=0;r<e-1;r++)t.push(0);t.push(1);for(var i=1,o=0;o<e;o++){for(var a=0;a<t.length;a++)t[a]=n.reedSolomonMultiply(t[a],i),a+1<t.length&&(t[a]^=t[a+1]);i=n.reedSolomonMultiply(i,2)}return t}},{key:"reedSolomonComputeRemainder",value:function(e,t){var r,i=t.map((function(e){return 0})),o=(0,c.Z)(e);try{var a=function(){var e=r.value^i.shift();i.push(0),t.forEach((function(t,r){return i[r]^=n.reedSolomonMultiply(t,e)}))};for(o.s();!(r=o.n()).done;)a()}catch(l){o.e(l)}finally{o.f()}return i}},{key:"reedSolomonMultiply",value:function(e,n){if(e>>>8!=0||n>>>8!=0)throw new RangeError("Byte out of range");for(var t=0,r=7;r>=0;r--)t=t<<1^285*(t>>>7),t^=(n>>>r&1)*e;return o(t>>>8==0),t}}]),n}(),t=n;function r(e,n,t){if(n<0||n>31||e>>>n!=0)throw new RangeError("Value out of range");for(var r=n-1;r>=0;r--)t.push(e>>>r&1)}function i(e,n){return 0!=(e>>>n&1)}function o(e){if(!e)throw new Error("Assertion error")}t.MIN_VERSION=1,t.MAX_VERSION=40,t.PENALTY_N1=3,t.PENALTY_N2=3,t.PENALTY_N3=40,t.PENALTY_N4=10,t.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],t.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],e.QrCode=t;var a=function(){function e(n,t,r){if((0,s.Z)(this,e),this.mode=n,this.numChars=t,this.bitData=r,t<0)throw new RangeError("Invalid argument");this.bitData=r.slice()}return(0,u.Z)(e,[{key:"getData",value:function(){return this.bitData.slice()}}],[{key:"makeBytes",value:function(n){var t,i=[],o=(0,c.Z)(n);try{for(o.s();!(t=o.n()).done;){r(t.value,8,i)}}catch(a){o.e(a)}finally{o.f()}return new e(e.Mode.BYTE,n.length,i)}},{key:"makeNumeric",value:function(n){if(!e.isNumeric(n))throw new RangeError("String contains non-numeric characters");for(var t=[],i=0;i<n.length;){var o=Math.min(n.length-i,3);r(parseInt(n.substr(i,o),10),3*o+1,t),i+=o}return new e(e.Mode.NUMERIC,n.length,t)}},{key:"makeAlphanumeric",value:function(n){if(!e.isAlphanumeric(n))throw new RangeError("String contains unencodable characters in alphanumeric mode");var t,i=[];for(t=0;t+2<=n.length;t+=2){var o=45*e.ALPHANUMERIC_CHARSET.indexOf(n.charAt(t));r(o+=e.ALPHANUMERIC_CHARSET.indexOf(n.charAt(t+1)),11,i)}return t<n.length&&r(e.ALPHANUMERIC_CHARSET.indexOf(n.charAt(t)),6,i),new e(e.Mode.ALPHANUMERIC,n.length,i)}},{key:"makeSegments",value:function(n){return""==n?[]:e.isNumeric(n)?[e.makeNumeric(n)]:e.isAlphanumeric(n)?[e.makeAlphanumeric(n)]:[e.makeBytes(e.toUtf8ByteArray(n))]}},{key:"makeEci",value:function(n){var t=[];if(n<0)throw new RangeError("ECI assignment value out of range");if(n<128)r(n,8,t);else if(n<16384)r(2,2,t),r(n,14,t);else{if(!(n<1e6))throw new RangeError("ECI assignment value out of range");r(6,3,t),r(n,21,t)}return new e(e.Mode.ECI,0,t)}},{key:"isNumeric",value:function(n){return e.NUMERIC_REGEX.test(n)}},{key:"isAlphanumeric",value:function(n){return e.ALPHANUMERIC_REGEX.test(n)}},{key:"getTotalBits",value:function(e,n){var t,r=0,i=(0,c.Z)(e);try{for(i.s();!(t=i.n()).done;){var o=t.value,a=o.mode.numCharCountBits(n);if(o.numChars>=1<<a)return 1/0;r+=4+a+o.bitData.length}}catch(l){i.e(l)}finally{i.f()}return r}},{key:"toUtf8ByteArray",value:function(e){e=encodeURI(e);for(var n=[],t=0;t<e.length;t++)"%"!=e.charAt(t)?n.push(e.charCodeAt(t)):(n.push(parseInt(e.substr(t+1,2),16)),t+=2);return n}}]),e}();a.NUMERIC_REGEX=/^[0-9]*$/,a.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,a.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",e.QrSegment=a}(r||(r={})),function(e){var n=(0,u.Z)((function e(n,t){(0,s.Z)(this,e),this.ordinal=n,this.formatBits=t})),t=n;t.LOW=new n(0,1),t.MEDIUM=new n(1,0),t.QUARTILE=new n(2,3),t.HIGH=new n(3,2),e.Ecc=t}((i=r||(r={})).QrCode||(i.QrCode={})),function(e){!function(e){var n=function(){function e(n,t){(0,s.Z)(this,e),this.modeBits=n,this.numBitsCharCount=t}return(0,u.Z)(e,[{key:"numCharCountBits",value:function(e){return this.numBitsCharCount[Math.floor((e+7)/17)]}}]),e}(),t=n;t.NUMERIC=new n(1,[10,12,14]),t.ALPHANUMERIC=new n(2,[9,11,13]),t.BYTE=new n(4,[8,16,16]),t.KANJI=new n(8,[8,10,12]),t.ECI=new n(7,[0,0,0]),e.Mode=t}(e.QrSegment||(e.QrSegment={}))}(r||(r={}));var y=r,w={L:y.QrCode.Ecc.LOW,M:y.QrCode.Ecc.MEDIUM,Q:y.QrCode.Ecc.QUARTILE,H:y.QrCode.Ecc.HIGH},E="#FFFFFF",M="#000000";function N(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=[];return e.forEach((function(e,r){var i=null;e.forEach((function(o,a){if(!o&&null!==i)return t.push("M".concat(i+n," ").concat(r+n,"h").concat(a-i,"v1H").concat(i+n,"z")),void(i=null);if(a!==e.length-1)o&&null===i&&(i=a);else{if(!o)return;null===i?t.push("M".concat(a+n,",").concat(r+n," h1v1H").concat(a+n,"z")):t.push("M".concat(i+n,",").concat(r+n," h").concat(a+1-i,"v1H").concat(i+n,"z"))}}))})),t.join("")}function C(e,n){return e.slice().map((function(e,t){return t<n.y||t>=n.y+n.h?e:e.map((function(e,t){return(t<n.x||t>=n.x+n.w)&&e}))}))}function b(e,n,t,r){if(null==r)return null;var i=t?4:0,o=e.length+2*i,a=Math.floor(.1*n),l=o/n,s=(r.width||a)*l,u=(r.height||a)*l,c=null==r.x?e.length/2-s/2:r.x*l,d=null==r.y?e.length/2-u/2:r.y*l,f=null;if(r.excavate){var h=Math.floor(c),v=Math.floor(d);f={x:h,y:v,w:Math.ceil(s+c-h),h:Math.ceil(u+d-v)}}return{x:c,y:d,h:u,w:s,excavation:f}}!function(){try{(new Path2D).addPath(new Path2D)}catch(e){return!1}}();function x(e){var n=e,t=n.value,r=n.size,i=void 0===r?128:r,o=n.level,l=void 0===o?"L":o,s=n.bgColor,u=void 0===s?E:s,c=n.fgColor,d=void 0===c?M:c,f=n.includeMargin,h=void 0!==f&&f,v=n.imageSettings,m=p(n,["value","size","level","bgColor","fgColor","includeMargin","imageSettings"]),x=y.QrCode.encodeText(t,w[l]).getModules(),R=h?4:0,k=x.length+2*R,A=b(x,i,h,v),_=null;null!=v&&null!=A&&(null!=A.excavation&&(x=C(x,A.excavation)),_=a.createElement("image",{xlinkHref:v.src,height:A.h,width:A.w,x:A.x+R,y:A.y+R,preserveAspectRatio:"none"}));var j=N(x,R);return a.createElement("svg",g({height:i,width:i,viewBox:"0 0 ".concat(k," ").concat(k)},m),a.createElement("path",{fill:u,d:"M0,0 h".concat(k,"v").concat(k,"H0z"),shapeRendering:"crispEdges"}),a.createElement("path",{fill:d,d:j,shapeRendering:"crispEdges"}),_)}var R=t(9094),k=t(7710),A=t(8542),_=t(184),j={android:{name:"Android",icon:"platform-android fab fa-android text-success",image:"/images/android.svg"},ios:{name:"IOS",icon:"platform-android fab fa-apple text-secondary",image:"/images/ios.svg"},windows:{name:"IOS",icon:"platform-android fab fa-apple text-secondary",image:"/images/windows.svg"}};var P=function(){var e,n,t,r,i,s,u,c=(0,l.UO)(),d=(0,l.s0)(),f=(0,a.useState)(null),h=(0,o.Z)(f,2),v=h[0],m=h[1],g=(0,R.WF)(v),p=(0,o.Z)(g,1)[0],y=(0,a.useState)({}),w=(0,o.Z)(y,2),E=w[0],M=w[1];(0,a.useEffect)((function(){var e;if(null!==p&&void 0!==p&&null!==(e=p.data)&&void 0!==e&&e.length){var n=null===p||void 0===p?void 0:p.data.find((function(e){return+e.id===+c.id}));M(n||p.data[0])}}),[p]),(0,a.useEffect)((function(){c.slug&&m({id:c.id})}),[c.slug]);var N=(0,k.el)(E);return(0,_.jsx)(a.Fragment,{children:(0,_.jsxs)("div",{className:"container-fluid detail-container",children:[(0,_.jsx)("div",{className:"row main-detail-banner",children:(0,_.jsx)("div",{className:"col-12",children:(0,_.jsx)("div",{className:"card  ",children:(0,_.jsx)("div",{className:"card-body",children:(0,_.jsxs)("div",{className:"row",children:[(0,_.jsx)("div",{className:"col-sm-6 col-md-5 col-lg-4 col-xl-3 text-center info-barcode",children:(0,_.jsx)("div",{className:"qrcode",children:(0,_.jsx)(x,{value:N,size:230,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!1,imageSettings:{src:null===(e=j[null===E||void 0===E?void 0:E.platform])||void 0===e?void 0:e.image,x:void 0,y:void 0,height:40,width:40,excavate:!1}})})}),(0,_.jsx)("div",{className:"col-sm-6 col-md-7 col-lg-8 col-xl-9 text-sm-start text-center align-self-center info-detail",children:(0,_.jsxs)("div",{className:"info-detail__content",children:[(0,_.jsx)("div",{className:"release-name",children:(0,_.jsx)("h3",{children:null===E||void 0===E?void 0:E.title})}),(0,_.jsx)("div",{className:"release-version",children:(0,_.jsxs)("h4",{children:["Version ",null===E||void 0===E?void 0:E.version]})}),(0,_.jsxs)("div",{className:"button btn-download",children:[(0,_.jsx)("a",{href:N,target:"_blank",rel:"noreferrer",className:"btn btn-primary text-white",children:"Download & install"}),(0,_.jsxs)("span",{className:"px-3 d-none d-md-inline-block update-on",children:["Update on: ",(0,_.jsx)("strong",{children:(0,A.d)(null===E||void 0===E?void 0:E.created_at)})]})]})]})})]})})})})}),(0,_.jsxs)("div",{className:"row main-detail-info",children:[(0,_.jsx)("div",{className:"col-sm-6 col-md-5 col-lg-4 col-xl-3 text-center",children:(0,_.jsx)("div",{className:"list-release mb-3",children:null===p||void 0===p||null===(n=p.data)||void 0===n?void 0:n.map((function(e){return(0,_.jsx)("div",{className:"border pt-1 pb-1 ".concat(e.id===E.id?"active":""),children:(0,_.jsxs)("div",{className:"item d-flex justify-content-between p-3",onClick:function(){return function(e){var n;M(e),d({pathname:"/release/".concat(e.id,"/").concat(null===(n=e.project)||void 0===n?void 0:n.name.split(" ").join("-"),"-").concat(e.platform)},{replace:!0})}(e)},children:[(0,_.jsx)("span",{children:e.version}),(0,_.jsx)("span",{children:(0,A.d)(null===e||void 0===e?void 0:e.created_at)})]})},e.id)}))})}),(0,_.jsxs)("div",{className:"col-sm-6 col-md-7 col-lg-8 col-xl-9 text-sm-start",children:[(0,_.jsx)("h5",{className:"mt-4 mb-3 info-detail-note__title",children:"Release Notes"}),(0,_.jsxs)("div",{className:"p-3 ps-4 info-ver-detail",children:[(0,_.jsxs)("p",{className:"",children:["Platform: ",(0,_.jsx)("strong",{children:null===(t=j[null===E||void 0===E?void 0:E.platform])||void 0===t?void 0:t.name})]}),(0,_.jsxs)("p",{className:"",children:["Project: ",(0,_.jsx)("strong",{children:null===E||void 0===E||null===(r=E.project)||void 0===r?void 0:r.name})]}),(0,_.jsxs)("p",{className:"",children:["Version: ",(0,_.jsx)("strong",{children:null===E||void 0===E?void 0:E.version})]}),(0,_.jsxs)("p",{className:"",children:["Environment: ",(0,_.jsx)("strong",{children:null===E||void 0===E||null===(i=E.environment)||void 0===i?void 0:i.name})]}),(0,_.jsxs)("p",{className:"",children:["Base URL / API URL: ",(0,_.jsx)("a",{href:null===E||void 0===E||null===(s=E.environment)||void 0===s?void 0:s.baseurl,target:"_blank",rel:"noreferrer",children:(0,_.jsx)("strong",{children:null===E||void 0===E||null===(u=E.environment)||void 0===u?void 0:u.baseurl})})]}),(0,_.jsxs)("p",{className:"d-block d-md-none",children:["Update on: ",(0,_.jsx)("strong",{children:(0,A.d)(null===E||void 0===E?void 0:E.updated_at)})]})]}),(0,_.jsx)("div",{className:"mt-3 content-note",dangerouslySetInnerHTML:{__html:(0,k.hU)(null===E||void 0===E?void 0:E.note)}})]})]})]})})}},8542:function(e,n,t){t.d(n,{d:function(){return o}});var r=t(2426),i=t.n(r),o=function(e){return e?i()(e).format("Y-MM-DD HH:mm:ss"):""}},5671:function(e,n,t){function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}t.d(n,{Z:function(){return r}})},3144:function(e,n,t){function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}t.d(n,{Z:function(){return i}})},7762:function(e,n,t){t.d(n,{Z:function(){return i}});var r=t(181);function i(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=(0,r.Z)(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,s=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return l=e.done,e},e:function(e){s=!0,a=e},f:function(){try{l||null==t.return||t.return()}finally{if(s)throw a}}}}}}]);
//# sourceMappingURL=342.ef365afc.chunk.js.map