




























var gsAgent=navigator.userAgent.toLowerCase(),
gsAppVer=navigator.appVersion.toLowerCase(),
gsAppName=navigator.appName.toLowerCase(),
gbIsOpera=gsAgent.indexOf("opera")>-1,
gbIsWebKit=gsAgent.indexOf("applewebkit")>-1,
gbIsKHTML=gsAgent.indexOf("khtml")>-1
||gsAgent.indexOf("konqueror")>-1||gbIsWebKit,
gbIsIE=(gsAgent.indexOf("compatible")>-1&&!gbIsOpera)
||gsAgent.indexOf("msie")>-1,
gbIsTT=gbIsIE?(gsAppVer.indexOf("tencenttraveler")!=-1?1:0):0,
gbIsQBWebKit=gbIsWebKit?(gsAppVer.indexOf("qqbrowser")!=-1?1:0):0,
gbIsQPlus=gsAgent.indexOf("qplus")>-1,
gbIsSogou=gsAgent.indexOf("se 2.x metasr 1.0")>-1,
gbIsChrome=gbIsWebKit&&!gbIsQBWebKit&&gsAgent.indexOf("chrome")>-1&&!gbIsSogou&&!gbIsQPlus,
gbIsSafari=gbIsWebKit&&!gbIsChrome&&!gbIsSogou&&!gbIsQBWebKit,
gbIsQBIE=gbIsIE&&gsAppVer.indexOf("qqbrowser")!=-1,
gbIsFF=gsAgent.indexOf("gecko")>-1&&!gbIsKHTML,
gbIsNS=!gbIsIE&&!gbIsOpera&&!gbIsKHTML&&(gsAgent.indexOf("mozilla")==0)
&&(gsAppName=="netscape"),
gbIsAgentErr=!(gbIsOpera||gbIsKHTML||gbIsSafari||gbIsIE||gbIsTT
||gbIsFF||gbIsNS),
gbIsWin=gsAgent.indexOf("windows")>-1||gsAgent.indexOf("win32")>-1,
gbIsVista=gbIsWin&&(gsAgent.indexOf("nt 6.0")>-1||gsAgent.indexOf("windows vista")>-1),
gbIsWin7=gbIsWin&&gsAgent.indexOf("nt 6.1")>-1,
gbIsMac=gsAgent.indexOf("macintosh")>-1||gsAgent.indexOf("mac os x")>-1,
gsMacVer=/mac os x (\d+)(\.|_)(\d+)/.test(gsAgent)&&parseFloat(RegExp.$1+"."+RegExp.$3),
gbIsLinux=gsAgent.indexOf("linux")>-1,
gbIsAir=gsAgent.indexOf("adobeair")>-1,
gnIEVer=/MSIE (\d+.\d+);/i.test(gsAgent)&&parseFloat(RegExp["$1"]),
gsFFVer=/firefox\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"],
gsSafariVer=""+(/version\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),
gsChromeVer=""+(/chrome\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),
gsQBVer=""+(/qqbrowser\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),

aEB="_For_E_Built";




if(document.domain!="qq.com"||!window.getTop)
{
document.domain="qq.com";






function getTop()
{
var Au=arguments.callee;

if(!Au.agN)
{
try
{
if(window!=parent)
{
Au.agN=parent.getTop?parent.getTop():parent.parent.getTop();
}
else
{
Au.agN=window;
}
}
catch(bf)
{
Au.agN=window;
}
}

return Au.agN;
};

window.getTop=getTop;
}







function callBack(bD,nG)
{
if(!window.Console)
{
try
{
return callBack.Zc.call(this,bD,nG);
}
catch(bf)
{
debug(bf.message);
}
}
else
{
return callBack.Zc.call(this,bD,nG);
}
}







callBack.Zc=function(bD,nG)
{
return typeof bD=="function"
?bD.apply(this,nG||[]):null;
};










function waitFor(NU,DP,
xo,pq)
{
var eY=0,
lZ=xo||500,
NJ=(pq||10*500)/lZ;

function azc(mT)
{
try
{
DP(mT)
}
catch(bf)
{
debug(bf,2);
}
};

(function()
{
try
{
if(NU())
{
return azc(true);
}
}
catch(bf)
{
debug(bf,2);
}

if(eY++>NJ)
{
return azc(false);
}

setTimeout(arguments.callee,lZ);
})();
}






function unikey(Fw)
{
return[Fw,now(),Math.random()].join("").split(".").join("");
}




function genGlobalMapIdx()
{
return Math.round(Math.random()*10000).toString()+new Date().getMilliseconds();
}






function isLeapYear(gE)
{
return(gE%400==0||(gE%4==0&&gE%100!=0));
}







function calDays(gE,iu)
{
return[null,31,null,31,30,31,30,31,31,30,31,30,31][iu]||(isLeapYear(gE)?29:28);
}





function now()
{
return+new Date;
}






function trim(bF)
{
return(bF&&bF.replace?bF:"").replace(/(^\s*)|(\s*$)/g,"");
}

function trim2(bF)
{


if(bF&&bF.substring)
{
var ro=/\s/,Ci=-1,Cc=bF.length;
while(ro.test(bF.charAt(--Cc)));
while(ro.test(bF.charAt(++Ci)));
return bF.substring(Ci,Cc+1);
}

}












function strReplace(bF,Rz,bJT,da)
{
return(bF||"").replace(
new RegExp(regFilter(Rz),da),bJT);
}






function encodeURI(bF)
{
return bF&&bF.replace?bF.replace(/%/ig,"%25").replace(/\+/ig,"%2B")
.replace(/&/ig,"%26").replace(/#/ig,"%23")
.replace(/\'/ig,"%27").replace(/\"/ig,"%22"):bF;
}






function decodeURI(bF)
{
return decodeURIComponent(bF||"");
}






function regFilter(NC)
{
return NC.replace(/([\^\.\[\$\(\)\|\*\+\?\{\\])/ig,"\\$1");
}






function isUrl(fE)
{
return(fE||"").replace(
/http?:\/\/[\w.]+[^ \f\n\r\t\v\"\\\<\>\[\]\u2100-\uFFFF]*/,"url")=="url";
}













function cookQueryString(bj,az)
{
var cP=bj.split("#"),
zs=cP[1]?("#"+cP[1]):"";

bj=cP[0];

for(var i in az)
{
var bZ=az[i],
dG=new RegExp(["([?&]",i,"=)[^&#]*"].join(""),"gi");

bj=dG.test(bj)?
bj.replace(dG,"$1"+bZ):[bj,"&",i,"=",bZ,zs].join("");
}
return bj;
}









function formatNum(kY,aSC)
{
var xJ=(isNaN(kY)?0:kY).toString(),
anZ=aSC-xJ.length;
return anZ>0?[new Array(anZ+1).join("0"),xJ].join(""):xJ;
}







function numToStr(kY,bOq)
{
var xJ=String(kY.toFixed(bOq));
var re=/(-?\d+)(\d{3})/;
while(re.test(xJ))
{
xJ=xJ.replace(re,"$1,$2");
}
return xJ;
}




function numToTimeStr(kY,Gf)
{
var Jl=Gf||"$HH$:$MM$:$SS$";
return	T(Jl).replace({
SS:formatNum(parseInt(kY)%60,2),
MM:formatNum(parseInt(kY/60)%60,2),
HH:formatNum(parseInt(kY/3600)%60,2)
})
}








function formatDate(pO,Gf,bVR)
{
var cW=pO||new Date(),
Xq=formatNum;

return T(Gf,bVR).replace({
YY:Xq(cW.getFullYear(),4),
MM:Xq(cW.getMonth()+1,2),
DD:Xq(cW.getDate(),2),
hh:Xq(cW.getHours(),2),
mm:Xq(cW.getMinutes(),2),
ss:Xq(cW.getSeconds(),2)
});
}







function getAsiiStrLen(bF)
{
return(bF||"").replace(/[^\x00-\xFF]/g,"aa").length;
}





function clearHtmlStr(bF)
{
return bF?bF.replace(/<[^>]*>/g,""):bF;
}








function subAsiiStr(bF,vd,Vq,Ea)
{
var Dc=function(fE){return fE},
Er=Ea?htmlEncode:Dc,
fA=(Ea?htmlDecode:Dc)(trim((bF||"").toString())),
zz=Vq||"",
MW=Math.max(vd-zz.length,1),
Uz=fA.length,
wg=0,
uG=-1,
qc;

for(var i=0;i<Uz;i++)
{
qc=fA.charCodeAt(i);


wg+=qc==35||qc==87
?1.2
:(qc>255?1.5:1);

if(uG==-1&&wg>MW)
{
uG=i;
}

if(wg>vd)
{
return Er(fA.substr(0,uG))+zz;
}
}

return Er(fA);
}













function setCookie(aD,bJ,lJ,eS,kk,oP)
{
if(aD)
{
document.cookie=T(
[
'$name$=$value$; ',
!lJ?'':'expires=$expires$; ',
'path=$path$; ',
'domain=$domain$; ',
!oP?'':'$secure$'
]
).replace(
{
name:aD,
value:encodeURIComponent(bJ||""),
expires:lJ&&lJ.toGMTString(),
path:eS||'/',
domain:kk||["mail.",getDomain()].join(""),
secure:oP?"secure":""
}
);
return true;
}
else
{
return false;
}
}






function getCookie(aD)
{
var ia=(new RegExp(["(^|;|\\s+)",regFilter(aD),"=([^;]*);?"].join("")));

if(ia.test(document.cookie))
{

try
{
return decodeURIComponent(RegExp["$2"]);
}
catch(e)
{
return RegExp["$2"];
}
}
}







function deleteCookie(aD,eS,kk)
{
setCookie(aD,"",new Date(0),eS,kk);
}









function setCookieFlag(aD,dp,vy,aEf)
{
var jA=aEf||getCookieFlag(aD),
Sm=new Date();


Sm.setTime(Sm.getTime()+(30*24*3600*1000));
jA[dp]=vy;
setCookie(aD,jA.join(""),Sm);

return jA;
}






function getCookieFlag(aD)
{
var HQ=(getCookie(aD)||"").split("");

for(var i=HQ.length;i<6;i++)
{
HQ[i]='0';
}

return HQ;
}








function isArr(az)
{
return Object.prototype.toString.call(az)=="[object Array]";
}









function E(ML,acS,azp,ZH)
{
if(!ML)
{
return;
}

if(ML.length!=null)
{
var _nLen=ML.length,
hp;

if(ZH<0)
{
hp=_nLen+ZH;
}
else
{
hp=ZH<_nLen?ZH:_nLen;
}

for(var i=(azp||0);i<hp;i++)
{
try
{
if(acS(ML[i],i,_nLen)===false)
{
break;
}
}
catch(bf)
{
debug([bf.message,"<br>line:",bf.lineNumber,'<br>file:',bf.fileName,"<br>",acS]);
}
}
}
else
{
for(var i in ML)
{
try
{
if(acS(ML[i],i)===false)
{
break;
}
}
catch(bf)
{
debug([bf.message,"<br>",acS]);
}
}
}
}









function extend()
{
for(var aY=arguments,sQ=aY[0],i=1,_nLen=aY.length;i<_nLen;i++)
{
var xs=aY[i];
for(var j in xs)
{
sQ[j]=xs[j];
}
}
return sQ;
}







function delAtt(aA,WU)
{
try
{
delete aA[WU];
}
catch(bf)
{
}
return aA;
}







function saveAtt(aA,WU)
{
if(aA)
{
var bYt=aA.hasOwnProperty(WU),
fz=aA[WU];
return function()
{
if(bYt)
{
aA[WU]=fz;
}
else
{
delAtt(aA,WU);
}
return aA;
};
}
else
{
return function(){};
}
}









function globalEval(gn,vS)
{
var QU=getTop().globalEval||arguments.callee;

if(!QU.aEI&&typeof(QU.biB)!="boolean")
{
var aV="testScriptEval"+now();

QU.aEI=true;
QU(T('window.$id$=1;').replace({
id:aV
}));
QU.aEI=false;

QU.biB=getTop()[aV]?true:false;
}

var iI=trim(gn);
if(!iI)
{
return false;
}

var aM=(vS||window).document,
sE=GelTags("head",aM)[0]||aM.documentElement,
eC=aM.createElement("script");

eC.type="text/javascript";
if(QU.biB||arguments.callee.aEI)
{
try
{
eC.appendChild(aM.createTextNode(iI));
}
catch(bf)
{
}
}
else
{

eC.text=iI;
}
sE.insertBefore(eC,sE.firstChild);
sE.removeChild(eC);

return true;
}





function evalValue(gn,vS)
{
var bi=unikey("_u"),
ay=vS||window,
jA;

globalEval(
[
"(function(){try{window.",bi,"=",gn,";}catch(_oError){}})();"
].join(""),
ay
);
jA=ay[bi];
ay[bi]=null;

return jA;
}







function evalCss(cbw,vS,apj)
{
if(cbw)
{
var aM=vS?vS.document||vS:document,
bKz="cssfrom",
cAX="style",
abc=aM.getElementsByTagName(cAX)[0];

if(apj&&abc)
{
var jv=abc.getAttribute(bKz)||"";
if(jv.indexOf(apj)!=-1)
{
return;
}
}

if(aM.createStyleSheet)
{
abc=abc||aM.createStyleSheet().owningElement;
abc.styleSheet.cssText+=getRes(cbw);
}
else
{

if(!abc)
{
var _oHeader=aM.getElementsByTagName("head")[0];
abc=aM.createElement(cAX);
abc.type="text/css";
_oHeader.insertBefore(abc,_oHeader.firstChild);
}
abc.textContent+=getRes(cbw);
}
apj&&abc.setAttribute(
bKz,[abc.getAttribute(bKz)||"",apj].join(",")
);
}
}







function S(aL,dB)
{
try
{
return(dB&&(dB.document||dB)
||document).getElementById(aL);
}
catch(bf)
{
return null;
}
}







function SN(aD,dB)
{
try
{
var SC=(dB&&(dB.document||dB)
||document).getElementsByName(aD);
if(SC)
{
SC[aEB]=true;
}
return SC;
}
catch(bf)
{
return null;
}
}









function attr(_aoDom,dI,bJ)
{

if(!_aoDom||!_aoDom.nodeType||_aoDom.nodeType===3||_aoDom.nodeType===8)
{
return undefined;
}
if(bJ===undefined)
{
return _aoDom.getAttribute(dI);
}
else
{
_aoDom.setAttribute(dI,bJ);
return _aoDom;
}
}







function GelTags(hQ,bE)
{
var SC=(bE||document).getElementsByTagName(hQ);
if(SC)
{
SC[aEB]=true;
}
return SC;

}







function CN(TL,_aoDom,jn)
{
_aoDom=_aoDom||document;

if(_aoDom.getElementsByClassName)
{
return _aoDom.getElementsByClassName(TL);
}
else
{
jn=jn||"*";
var gs=[],
agm=(jn=='*'&&_aoDom.all)?_aoDom.all:_aoDom.getElementsByTagName(jn),
i=agm.length;
TL=TL.replace(/\-/g,'\\-');
var ia=new RegExp('(^|\\s)'+TL+'(\\s|$)');
while(--i>=0)
{
if(ia.test(agm[i].className))
{
gs.push(agm[i]);
}
}
return gs;
}
};







function F(aL,ao)
{
var Fu=S(aL,ao);
return Fu&&(Fu.contentWindow||(ao||window).frames[aL]);
}

function appendToUrl(bj,bSj)
{
var cP=bj.split("#");
return[cP[0],bSj,(cP.length>1?"#"+cP[1]:"")].join("");
}









function insertHTML(bE,eQ,cB)
{
if(!bE)
{
return false;
}
try
{

if(bE.insertAdjacentHTML)
{
bE.insertAdjacentHTML(eQ,cB);
}
else
{
var cX=bE.ownerDocument.createRange(),
kS=eQ.indexOf("before")==0,
Ei=eQ.indexOf("Begin")!=-1;
if(kS==Ei)
{
cX[kS?"setStartBefore":"setStartAfter"](bE);
bE.parentNode.insertBefore(
cX.createContextualFragment(cB),Ei
?bE
:bE.nextSibling
);
}
else
{
var dL=bE[kS?"lastChild":"firstChild"];
if(dL)
{
cX[kS?"setStartAfter":"setStartBefore"](dL);
bE[kS?"appendChild":"insertBefore"](cX
.createContextualFragment(cB),dL);
}
else
{

bE.innerHTML=cB;
}
}
}
return true;
}
catch(bf)
{

return false;
}
}

















function setHTML(apb,cB)
{
var asu=typeof apb==="string"?S(apb):apb,
arD=asu.cloneNode(false);
arD.innerHTML=cB;
asu.parentNode.replaceChild(arD,asu);
return arD;
}



















function createIframe(ao,ru,cd)
{
var aeO="_creAteifRAmeoNlQAd_",
cS=cd||{},
aV=cd.id||unikey(),
vQ=S(aV,ao);


typeof ao[aeO]!="function"&&
(ao[aeO]=function(aL,bWV)
{
callBack.call(bWV,arguments.callee[aL],[ao]);
}
);


ao[aeO][aV]=cd.onload;
if(!vQ)
{
insertHTML(
cS.obj||ao.document.body,
cS.where||"afterBegin",
TE([
'<iframe frameborder="0" scrolling="$scrolling$" id="$id$" name="$id$" ',
'$@$if($transparent$)$@$allowTransparent$@$endif$@$ class="$className$" ',
'onload="this.setAttribute(\x27loaded\x27,\x27true\x27);$cb$(\x27$id$\x27,this);" ',
'src="$src$" style="$style$" $attrs$>',
'</iframe>'
]).replace(extend(
{
"id":aV,
"cb":aeO,
style:"display:none;",
scrolling:"no",
src:ru
}
,cd))
);
vQ=S(aV,ao);
vQ.aPR=cd.onload;
}
else if(vQ.getAttribute("loaded")=="true")
{
ao[aeO](aV,vQ);
}

return vQ;
}





function removeSelf(bE)
{
try
{
bE.parentNode.removeChild(bE);
}
catch(bf)
{
}

return bE;
}







function isObjContainTarget(bE,fu)
{
try
{
if(!bE||!fu)
{
return false;
}
else if(bE.contains)
{
return bE.contains(fu);
}
else if(bE.compareDocumentPosition)
{
var ED=bE.compareDocumentPosition(fu);
return(ED==20||ED==0);
}
}
catch(BK)
{


}

return false;
}






function isDisableCtl(aCc,ao)
{
var aZt=SN(aCc,ao);
for(var i=aZt.length-1;i>=0;i--)
{
if(aZt[i].disabled)
{
return true;
}
}
return false;
}







function disableCtl(aCc,ut,dB)
{
E(SN(aCc,dB),function(cdL)
{
cdL.disabled=ut;
}
);
}


(function(aC)
{
var	_oTop=getTop(),

abu=/\[([\w\-_]+)(=[\'\"]?([\w\-_~@]+)[\'\"]?)?\]/,
aav=/\[[\w\-_]+(=[\'\"]?[\w\-_~@]+[\'\"]?)?\]/g,
adw=/^([#\$<:])([\w\-_]+)>?$/,
Yu=/.*?\.([\w\-_]+)/,
Kf=/(?:[\w\-~@\\.#\[\]=\'\"]+)+|\*|>/ig,
AL=/#([\w\-_]+)/,
AS=/^([\w\*\-_]+)/,

lR=[aC,aC];

function pC(aA)
{
for(var i=0,gu=[],_nLen=aA.length;i<_nLen;i++)
{
gu[i]=aA[i];
}
return gu;
}


function rJ(jG,Js,BN,abA)
{
var za=!Js||Js.test(jG.className),
i=0,zY,Af;

while(za&&i<abA)
{
zY=jG.getAttribute((Af=BN[i++])[1]);
za=Af[2]?zY===Af[3]:!!zY;
}
return za;
}


function AE(eG)
{
var dZ=eG.match(aav);
if(dZ)
{
for(i=dZ.length-1;i>=0;i--)
{
dZ[i]=dZ[i].match(abu);
}
}
return dZ;
}


function CQ(eG)
{
var ir=(eG.match(Yu)||lR)[1];
return ir&&RegExp('(^|\\s)'+ir+'(\\s|$)');
}

function uT(uA,vI,XX)
{
var qu=uA.pop();

if(qu==='>')
{
return uT(uA,vI,true);
}

var aV=(qu.match(AL)||lR)[1],
gz=CQ(qu),
eZ=(qu.match(AS)||lR)[1],
dZ=AE(qu),
jR=dZ?dZ.length:0,
cL=[],
Yi=-1,
dW=-1,
cv,
dC,
zS;


eZ&&(eZ=eZ=="*"?"":eZ.toUpperCase());

while((cv=vI[++dW]))
{
dC=cv.parentNode;

do
{
zS=(!aV||dC.id===aV)&&
(!eZ||dC.nodeName==eZ)&&
rJ(dC,gz,dZ,jR);

if(XX||zS)
{
break;
}

}
while((dC=dC.parentNode)&&dC.getAttribute);

zS&&(cL[++Yi]=cv);
}

return uA[0]&&cL[0]?uT(uA,cL):cL;
}


function dya(eG,_aoDom)
{
var ga=eG.match(Kf),
jF=ga.pop(),
aV=(jF.match(AL)||lR)[1],
gz=CQ(jF),
dZ=AE(jF),
jR=dZ?dZ.length:0,
eZ=(jF.match(AS)||lR)[1],
cHv=[],
dv=[],
i=-1,
dW=-1,
cv;

while((_aoDom=_aoDom.parentNode)&&_aoDom.nodeType!==9)
{
cHv.push(_aoDom);
}

eZ&&(eZ=eZ=="*"?"":eZ.toUpperCase());

while(cv=cHv[++i])
{
(!aV||cv.id===aV)&&
(!eZ||cv.nodeName==eZ)&&
rJ(cv,gz,dZ,jR)&&
(dv[++dW]=cv);
}

return ga[0]&&dv[0]?uT(ga,dv):dv;
}

function vK(eG,au)
{
if(au.querySelectorAll)
{
return pC(au.querySelectorAll(eG));
}

var ga=eG.match(Kf),
jF=ga.pop(),
aV=(jF.match(AL)||lR)[1],
gz=CQ(jF),
dZ=AE(jF),
jR=dZ?dZ.length:0,
eZ=(jF.match(AS)||lR)[1],
dv;


if(aV)
{
var aM=(au||window).document||au,
_oDom=aM.getElementById(aV);

if(!_oDom||(eZ&&_oDom.nodeName!=eZ.toUpperCase())||
!rJ(_oDom,gz,dZ,jR))
{
return[];
}
dv=[_oDom];
}
else
{
var jT=au.getElementsByTagName(eZ||'*');
if(gz||jR)
{
var i=-1,dW=-1,cv;
dv=[];
if(!jR)
{
while(cv=jT[++i])
{
gz.test(cv.className)&&(dv[++dW]=cv);
}
}
else
{
while(cv=jT[++i])
{
rJ(cv,gz,dZ,jR)&&(dv[++dW]=cv);
}
}
}
else
{
dv=pC(jT);
}
}

return ga[0]&&dv[0]?uT(ga,dv):dv;
}

_oTop.simpleFind=vK;
_oTop.simpleParents=dya;
})();








function isShow(rT,dB)
{
return(getStyle((typeof(rT)=="string"?S(rT,dB):rT),"display")||"none")
!="none";
}







function show(rT,nz,dB)
{
var dL=(typeof(rT)=="string"?S(rT,dB):rT);
if(dL)
{
dL.style.display=(nz?"":"none");
}
else if(!dB&&typeof(rT)=="string")
{

}
return dL;
}


var Show=show;





function toggle(rT,dB)
{
return show(rT,!isShow(rT,dB),dB);
}







function setClass(bE,qf)
{
if(bE&&typeof(qf)!="undefined"&&bE.className!=qf)
{
bE.className=qf;
}
return bE;
}







function addClass(bE,qf)
{
if(bE)
{
var ir=" "+bE.className+" ";
if(ir.indexOf(" "+qf+" ")<0)
{
bE.className+=bE.className?" "+qf:qf;
}
}
return bE;
};







function rmClass(bE,qf)
{
if(bE)
{
if(qf)
{
var ir=" "+bE.className+" ";
ir=ir.replace(" "+qf+" "," ");
bE.className=trim(ir);
}
else
{
bE.className="";
}
}
return bE;
};





function hasClass(bE,qf)
{
return bE&&(" "+bE.className+" ").indexOf(" "+qf+" ")>-1;
};







function getStyle(bE,baE)
{
var qb=bE&&(bE.currentStyle
?bE.currentStyle
:bE.ownerDocument.defaultView.getComputedStyle(bE,null));
return qb&&qb[baE]||"";
}







function setOpacity(bE,aaD)
{
if(bE&&bE.tagName)
{
var cQ=bE.style,
pY=aaD||0;











if(typeof cQ.opacity=="undefined")
{
cQ.filter=pY==1
?"":["alpha(opacity=",pY*100,")"].join("");
}
else
{
cQ.opacity=pY;
}
}
return bE;
}






function getOpacity(bE,aaD)
{
if(bE&&bE.tagName)
{
var cQ=bE.style,
pY=1;









if(typeof cQ.opacity=="undefined")
{
pY=parseFloat(cQ.filter.split("=").pop())/100;
}
else
{
pY=parseFloat(cQ.opacity);
}

if(isNaN(pY))
{
pY=1;
}
}
return pY;
}






function getStrDispLen(bF)
{
var bjH="__QMStrCalcer__";
var asC=S(bjH,getTop());
if(!asC)
{
var cA=getTop().document.body;
insertHTML(
cA,
"afterBegin",
T([
'<div id="$id$" ',
'style="width:1px;height:1px;overflow:auto;*overflow:hidden;white-space:nowrap;',
'position:absolute;left:0;top:0;">','</div>']).replace({
id:bjH
})
);
asC=cA.firstChild;
}
asC.innerHTML=htmlEncode(bF);
return asC.scrollWidth;
}







function calcPos(bE,awj)
{
var bY=0,
ea=0,
cD=0,
cI=0;

if(bE&&bE.tagName)
{
var adt=bE,
dL=bE.parentNode,
aHv=bE.offsetParent,
aM=bE.ownerDocument,
fW=aM.documentElement,
cA=aM.body;

ea+=bE.offsetLeft;
bY+=bE.offsetTop;
cD=bE.offsetWidth;
cI=bE.offsetHeight;

while(aHv&&dL&&dL!=fW&&dL!=cA)
{
if(calcPos.baC()&&adt.style&&getStyle(adt,"position")==="fixed")
{
break;
}

if(aHv==dL)
{
ea+=dL.offsetLeft;
bY+=dL.offsetTop;
aHv=dL.offsetParent;
}

ea-=dL.scrollLeft;
bY-=dL.scrollTop;
adt=dL;
dL=dL.parentNode;

}

if(calcPos.baC()&&adt.style&&getStyle(adt,"position")==="fixed")
{
ea+=bodyScroll(aM,'scrollLeft');
bY+=bodyScroll(aM,'scrollTop');
}
}

return awj=="json"
?{top:bY,bottom:bY+cI,left:ea,
right:ea+cD,width:cD,height:cI}
:[bY,ea+cD,bY+cI,ea,cD,cI];
}

calcPos.baC=function()
{

var ciz,
ae=this;
if(ae.aVW==ciz)
{
var cE=document.createElement("div");
cE.style.cssText="'position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;";
cE.innerHTML="<div style='position:fixed;top:20px;'></div>";
document.body.appendChild(cE);
ae.aVW=!!{20:1,15:1}[cE.firstChild.offsetTop];
}
return ae.aVW;
};







function calcPosFrame(bE,ao)
{
ao=ao||window;
var lO=calcPos(bE),
_oTop=getTop();
while(ao.frameElement&&ao!=_oTop)
{
var en=calcPos(ao.frameElement);
for(var i=0;i<4;i++)
{

lO[i]+=en[i&1?3:0]-bodyScroll(ao,i&1?"scrollLeft":"scrollTop");

}
ao=ao.parent;
}
return lO;
}










function calcAdjPos(kD,rU,nc,ao,eB)
{
var apX=bodyScroll(ao,'clientHeight'),
bjc=bodyScroll(ao,'clientWidth'),
WE=bodyScroll(ao,'scrollTop'),
aBH=bodyScroll(ao,'scrollLeft'),
ajC=WE+apX,
aUA=aBH+bjc,
aE=[0,0,0,0];
if(eB<2)
{

var iU=aBH-kD[1];
if(eB==0&&kD[3]<rU
||eB==1&&aUA-kD[1]>rU)
{

aE[1]=(aE[3]=kD[1])+rU;
}
else
{

aE[3]=(aE[1]=kD[3])-rU;
}
if(kD[0]+nc>ajC)
{


aE[0]=(aE[2]=(kD[2]-nc<WE?ajC:kD[2]))-nc;
}
else
{

aE[2]=(aE[0]=kD[0])+nc;
}
}
else
{

if(eB==2&&kD[0]-WE<nc
||eB==3&&ajC>kD[2]+nc)
{

aE[2]=(aE[0]=kD[2])+nc;
}
else
{

aE[0]=(aE[2]=kD[0])-nc;
}
aE[1]=kD[1];
aE[3]=kD[3];
}
return aE;
}







function bodyScroll(dB,aw,cg)
{
var aM=(dB||window).document||dB,
cA=aM.body,
sJ=aM.documentElement;

if(typeof(cg)=="number")
{
cA[aw]=sJ[aw]=cg;
}
else
{
if(aw=="scrollTop"&&typeof dB.pageYOffset!="undefined")
{
return dB.pageYOffset;
}
else
{
return sJ[aw]||cA[aw];
}
}
}








function htmlDecode(bF)
{
return bF&&bF.replace?(bF.replace(/&nbsp;/gi," ").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
.replace(/&quot;/gi,"\"").replace(/&#39;/gi,"'").replace(/&amp;/gi,"&")
):bF;
}






function htmlEncode(bF)
{
return bF&&bF.replace?(bF.replace(/&/g,"&amp;").replace(/\"/g,"&quot;")
.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&#39;")):bF;
}







function filteScript(bF,bYl)
{
return bF
&&bF.replace(/<script ?.*>(.*?)<\/script>/ig,
"<script>$1\n</script>"
).replace(/<script ?.*>([\s\S]*?)<\/script>/ig,bYl||"");
}






function textToHtml(ez)
{

return[
'<DIV>',
ez.replace((ez.indexOf("<BR>")>=0)?/<BR>/ig:/\n/g,
"</DIV><DIV>"
),
"</DIV>"
].join("")
.replace(new RegExp("\x0D","g"),"")
.replace(new RegExp("\x20","g"),"&nbsp;")
.replace(new RegExp("(<DIV><\/DIV>)*$","g"),"")
.replace(/<DIV><\/DIV>/g,"<DIV>&nbsp;</DIV>");
}






function textToHtmlForNoIE(ez)
{
return ez.replace(/\n/g,"<br>");
}






function htmlToText(ez)
{
return ez

.replace(/\n/ig,"")

.replace(/(<\/div>)|(<\/p>)|(<br\/?>)|(<\/li>)/ig,"\n");
}






function fixNonBreakSpace(bF)
{
return(bF||"").replace(/\xA0/ig," ");
}









function pasteHTML(aes,anb,ciu,ao)
{
ao=ao||getMainWin();
aes=filteScript(aes);
var _oContainer=(typeof(anb)=="string"?S(anb,ao):anb);
if(!_oContainer||!aes)
{
return false;
}
if(ciu)
{
_oContainer.innerHTML=aes;
}
else
{
insertHTML(_oContainer,"afterBegin",aes);
}
return true;
}







function T(hx,lA)
{
return new T.si(hx,lA);
}









































function TE(hx,lA)
{
var _oTop=getTop();
if(_oTop.QMTmplChecker)
{
var bf=(new _oTop.QMTmplChecker(hx.join?hx:[hx],
lA)).getErrors();
if(bf.length)
{
debug(bf.join("\n"),"code");
}
}
return new T.si(hx,lA,"exp");
}

T.si=function(hx,lA,aw)
{
this.wk=hx.join?hx.join(""):hx.toString();
this.ri=lA||"$";
this.Um=aw=="exp"
?this.TZ
:this.US;
};

T.si.prototype=
{
toString:function()
{
return this.wk;
},

replace:function(gy,ln,Ad)
{
return this.Um(gy,ln,Ad);
},

US:function(gy,afy,Vi)
{
var ae=this,
nW=ae.ri,
lB=ae.DZ,
wj=ae.TC,
Ev=!lB,
Mv=afy?ae.aeu:ae.kb;

if(Ev)
{

lB=ae.DZ=ae.wk.split(ae.ri);
wj=ae.TC=ae.DZ.concat();
}

for(var i=1,_nLen=lB.length;i<_nLen;i+=2)
{
wj[i]=Mv.call(ae,Ev?(lB[i]=lB[i].split("."))
:lB[i],gy,Vi,nW);
}

return wj.join("");
},

TZ:function(gy,ln,Ad)
{
var ae=this,
kA;

if(!ae.Eh)
{
ae.Ud();
}

if(typeof ln=="string")
{
var qW=ae.Ed[ln];
if(qW)
{
kA=typeof qW!="function"
?ae.Ed[ln]=ae.Et(qW)
:qW;
}
}
else
{
kA=ae.Eh;
}

try
{
return kA&&kA(gy,ae.Ph,
ae.kb,ae.ri,htmlEncode,Ad||ln)||"";
}
catch(bf)
{
return bf.message;
}
},




Ud:function()
{
var ae=this,
hw=0,
fO=[],
vZ=[],
wm=[],
Up=ae.Ed=[],
nW=ae.ri,
ia=new RegExp(["","(.*?)",""].join(regFilter(nW)),"g"),
nZ="_afG('$1'.split('.'),_oD,_aoD,_aoR)",
tx=ae.Ph=ae.wk.split(["","@",""].join(nW)),
dF;

for(var i=0,_nLen=tx.length;i<_nLen;i++)
{
dF=tx[i];

if(i%2==0)
{
fO.push("_oR.push(_aoT[",i,"].replace(_oD,false,_aoD));");
tx[i]=T(dF,nW);
}
else if(dF=="else")
{
fO.push("}else{");
}
else if(dF=="endsec")
{
if(wm.length)
{
var av=wm.pop();
Up[av[0]]=fO.slice(av[1]);
}
}
else if(dF=="endfor")
{
vZ.length&&fO.push(
"try{delete _oD._parent_;delete _oD._idx_;}catch(e){}}_oD=_oS",vZ.pop(),";");
}
else if(dF=="endif")
{
fO.push("}");
}
else if(dF.indexOf("else if(")==0)
{
fO.push("}",dF.replace(ia,nZ),"{");
}
else if(dF.indexOf("if(")==0)
{
fO.push(dF.replace(ia,nZ),"{");
}
else if(dF.indexOf("for(")==0)
{
vZ.push(++hw);
fO.push(
"var _sI",hw,",_oD",hw,",_oS",hw,"=_oD;",
dF.replace(ia,
["_sI",hw," in (_oD",hw,"=",nZ,")"].join("")),
"{",
"_oD=_oD",hw,"[_sI",hw,"];",
"if(!_oD){continue;}",
"try{_oD._parent_=_oS",hw,";",
"_oD._idx_=_sI",hw,";}catch(e){}"
);
}
else if(dF.indexOf("sec ")==0)
{
wm.push([dF.split(" ").pop(),fO.length]);
}
else if(dF.indexOf("eval ")==0)
{
fO.push("_oR.push(",dF.substr(5).replace(ia,nZ),");");
}
else if(dF.indexOf("html(")==0)
{
fO.push("_oR.push(_afE(",dF.substr(5).replace(ia,nZ),");");
}
}

ae.Eh=ae.Et(fO);

return fO;
},

Et:function(UA)
{
try
{
return eval(
[
'([function(_aoD,_aoT,_afG,_aoR, _afE, A){var _oR=[],_oD=_aoD;',
UA.join(""),
'return _oR.join("");}])'
].join("")
)[0];
}
catch(eN)
{
return function(){return"compile err!"};
}
},

aeu:function(mR,gy,zk,pZ)
{
var fz=this.kb(mR,gy,zk,pZ);
return typeof fz=="undefined"?pZ+mR.join(".")+pZ:fz;
},

kb:function(mR,gy,zk,pZ,hC)
{
var _nLen=mR.length,
bi,
fz,
YA;

if(_nLen>1)
{
try
{
fz=gy;
for(var i=0;i<_nLen;i++)
{
bi=mR[i];
if(bi=="_root_")
{
fz=zk;
}
else
{
fz=fz[bi];
}
}
}
catch(bf)
{
fz=YA;
}
}
else
{
fz={
"_var_":pZ,
"_this_":gy
}[bi=mR[0]]||gy[bi];
}

return fz;
}
};










var addEvent=(function()
{








function Hz(fu,aw,WI,sl)
{
if(fu&&WI)
{
if(fu.addEventListener)
{
fu[sl?"removeEventListener":"addEventListener"](
aw,WI,false
);
}
else if(fu.attachEvent)
{
fu[sl?"detachEvent":"attachEvent"]("on"+aw,
WI
);
}
else
{
fu["on"+aw]=sl?null:WI;
}
}

return fu;
}

return function(fu,aw,aRp,sl)
{
if(fu&&(fu.join||fu[aEB]))
{
E(fu,function(_aoDom)
{
Hz(_aoDom,aw,aRp,sl);
}
);
}
else
{
Hz(fu,aw,aRp,sl);
}

return fu;
};
}
)();








function addEvents(fu,iz,sl)
{
E(iz,function(mF,aw)
{
addEvent(fu,aw,mF,sl);
}
);
return fu;
}








function removeEvent(fu,aw,WI)
{
return addEvent(fu,aw,WI,true);
}







function removeEvents(fu,iz)
{
return addEvents(fu,iz,true);
}






function preventDefault(_aoEvent)
{
if(_aoEvent)
{
if(_aoEvent.preventDefault)
{
_aoEvent.preventDefault();
}
else
{
_aoEvent.returnValue=false;
}
}
return _aoEvent;
}






function stopPropagation(_aoEvent)
{
if(_aoEvent)
{
if(_aoEvent.stopPropagation)
{
_aoEvent.stopPropagation();
}
else
{
_aoEvent.cancelBubble=true;
}
}
return _aoEvent;
}






function getEventTarget(_aoEvent)
{
return _aoEvent&&(_aoEvent.srcElement||_aoEvent.target);
}











function getUserTarget(_aoDom,_aoEvent,dI)
{
var aF=getEventTarget(_aoEvent);
while(aF&&isObjContainTarget(_aoDom,aF))
{
if(attr(aF,dI))
{
return aF;
}
aF=aF.parentNode;
}
}











function fireMouseEvent(bE,aro,_aoEvent)
{
if(bE)
{
_aoEvent=_aoEvent||{};
if(bE.dispatchEvent)
{

var aM=bE.ownerDocument,
ay=aM.defaultView,
bN=aM.createEvent("MouseEvents");
bN.initMouseEvent(aro,true,true,ay,0,0,0,0,0,!!_aoEvent.ctrlKey,!!_aoEvent.altKey,!!_aoEvent.shiftKey,!!_aoEvent.metaKey,0,null);
bE.dispatchEvent(bN);
}
else
{


if(bE.tagName=="INPUT"&&bE.getAttribute("type")=="submit"&&aro=="click")
{
bE.click();
}
else
{
var bN=bE.ownerDocument.createEventObject();
for(var aY=["ctrlKey","altKey","shiftKey","metaKey"],i=aY.length-1;i>=0;i--)
{
bN[aY[i]]=_aoEvent[aY[i]];
}
bE.fireEvent("on"+aro,bN);
}
}
}
return bE;
}

var liveEvent=(function()
{
var 
aaq=
{
click:"ck1",
dblclick:"dbl",
mousedown:'md',
mouseup:'mu',
mouseover:'mor',
mousemove:'mm',
mouseout:'mot',
keydown:'kd',
keypress:'kp',
keyup:'ku'
};

function dQJ(_aoEvent,aA)
{
var kK=_aoEvent.type,
XB=aaq[kK],
MD=aA.rule()[kK],
cw=aA.events(),
aF=getEventTarget(_aoEvent);

if(!XB)
{
return;
}

do
{
var SL=aF.getAttribute(XB),
fV=MD[SL];
if(SL&&fV&&cw[SL])
{
cw[SL].call(aA,_aoEvent,aF);
if(!fV.bPropagable)
{
break;
}
}
}
while((aF=aF.parentNode)&&aF.getAttribute);
}

return function(_aoDom,aA)
{
var MD=aA.rule();
for(var kK in MD)
{
addEvent(_aoDom,kK,function(_aoEvent)
{
dQJ(_aoEvent,aA);
});
}
};
})();











function loadJsFile(kf,aDd,ei,XH,rb,drg)
{
var aM=ei||document,
cat=typeof XH=="function",
eiH,eC,
BP=getTop().loadJsFile,
_sFile=getRes(kf),
jP=BP.jP||(BP.jP={});

if(aDd)
{
for(var adh=GelTags("script",aM),
i=adh.length-1;i>=0;i--)
{
if(adh[i].src.indexOf(_sFile)!=-1)
{
if(cat)
{
var bi=adh[i].getAttribute("_key_");
if(jP[bi]===true)
{
callBack.call(adh[i],XH);
}
else
{
jP[bi].push(XH);
}
}
return adh[i];
}
}
}

eC=aM.createElement("script");
E(rb,function(nJ,bm)
{
eC.setAttribute(bm,nJ);
}
);

var bi=unikey();
eC.setAttribute("_key_",bi);
jP[bi]=[];

function blo()
{
var ae=this,bi=ae.getAttribute("_key_");
callBack.call(ae,XH);
E(jP[bi],function(dQ){dQ()});
jP[bi]=true;

if(drg)
{
removeSelf(eC);
}
ae.onreadystatechange=ae.onload=null;
}

(GelTags("head",aM)[0]||aM.documentElement)
.appendChild(extend(eC,

{
onload:blo,
onreadystatechange:function()
{
var ae=this;
({loaded:true,complete:true}[ae.readyState])&&blo.call(this);
}
},
{
type:"text/javascript",
charset:rb&&rb.charset||"gb2312",
src:_sFile
}
)
);

return eC;
}






function loadJsFileToTop()
{

if(arguments.length==2)
{
var aAF=arguments[0],
pQ=arguments[1];
}
else
{
var aAF="",
pQ=arguments[0];
}
var bSf=window.loadJsFile;


function bvA(kf)
{
if(kf)
{

bSf(aAF+kf,true,getTop().document);
}
}
E(pQ,bvA);
}









function loadCssFile(kf,aDd,ei)
{
var aM=ei||document,
_sFile=getRes(kf);

if(aDd)
{
for(var bdg=GelTags("link",aM),
i=bdg.length-1;i>=0;i--)
{
if(bdg[i].href.indexOf(_sFile)!=-1)
{
return;
}
}
}

var lu=aM.createElement("link"),
aFH=GelTags("link",aM);

lu.type="text/css";
lu.rel="stylesheet";
lu.href=_sFile;

if(aFH.length>0)
{
var aXx=aFH[aFH.length-1];
aXx.parentNode.insertBefore(lu,
aXx.nextSibling);
}
else
{
(GelTags("head",aM)[0]||aM.documentElement).appendChild(lu);
}

return lu;
}








function replaceCssFile(Gf,kf,ei)
{
if(Gf)
{
E(GelTags("link",ei||document),function(aFj)
{
if(aFj&&aFj.href.indexOf(Gf)!=-1)
{
removeSelf(aFj);
}
});
}

return loadCssFile(kf,false,ei);
}









function QMAjax(bj,jx,pq,gh)
{
var ae=this,
_oTop=getTop(),
la=gh,
dH;

function bws()
{
ae.onComplete(la);
}

function bzD(da)
{
ae.onError(la,da);
}

function bwc(bxO)
{
if(!dH)
{
dH=setTimeout(
function()
{
ae.abort();
},
bxO
);
}
}

function VQ(da)
{
if(dH)
{
clearTimeout(dH);
dH=null;
if(da!="ok")
{
bzD(da);
}
return true;
}
return false;
}



this.method=jx||"POST";
this.url=bj;
this.async=true;
this.content="";
this.timeout=pq;


this.onComplete=function()
{
};
this.onError=function()
{
};

if(!la)
{
try
{
la=new XMLHttpRequest;
}
catch(bf)
{
try
{
la=new ActiveXObject("MSXML2.XMLHTTP");
}
catch(bf)
{
try
{
la=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(bf)
{
}
}
}
}



if(!la)
{
return false;
}





this.abort=function()
{
VQ("abort");
la.abort();
};






this.send=function(brK)
{
if(!this.method||!this.url||!this.async)
{
return false;
}

typeof this.url=="object"&&(this.url=this.url.replace({}));

var eU=this.method.toUpperCase(),
ju=getTop().getSid&&getTop().getSid();
this.abort();

la.open(eU,

this.url+(ju&&eU=="POST"&&((this.url.split("?")[1]||"")+"&").indexOf("&sid=")==-1
?(this.url.indexOf("?")==-1?"?sid=":"&sid=")+ju:""),
this.async
);

if(eU=="POST")
{
la.setRequestHeader("Content-Type",document.charset);
la.setRequestHeader("Content-length",this.content.length);
la.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded"
);
}

_oTop.E(this.headers,function(bJ,bm)
{
la.setRequestHeader(bm,bJ);
}
);

la.onreadystatechange=function()
{
try
{
if(la.readyState==4)
{
if(la.status==200)
{
if(VQ("ok"))
{
bws();
}
}
else
{
VQ(la.status);
}
}
}
catch(dD)
{
VQ(dD.message);
}
}



bwc(this.timeout||15000);

try
{
if(eU=="POST")
{
la.send(brK||this.content);
}
else
{

la.send(null);
}
}
catch(bf)
{
VQ(bf.message);
}

return true;
}
};













QMAjax.send=function(bj,aj,bAg)
{
var _oTop=getTop(),
fB=bAg||new QMAjax,
aT=aj||{};
fB.url=bj;

_oTop.E("method,timeout,content,headers".split(","),function(bm)
{
if(aT[bm])
{
fB[bm]=aT[bm];
}
}
);

var aqF=new Date().valueOf();
fB.onComplete=function(gh)
{
QMAjax.stat(new Date().valueOf()-aqF,bj);
_oTop.callBack.call(gh,aj.onload,[true,_oTop.trim2(gh.responseText||""),gh]);

};

fB.onError=function(gh,da)
{
_oTop.callBack.call(gh,aj.onload,[false,da,gh]);
};

fB.send();
}


;(function()
{
var gu=[];

QMAjax.stat=function(ceJ,bj)
{
ceJ<120000&&ceJ>0&&(bj.indexOf("/")==0)&&gu.push(ceJ);

if(gu.length>=20)
{
var cPf=0,cwW=0;
for(var i in gu)
{
cPf+=gu[i];
}
cwW=(cPf/gu.length).toFixed(2);
gu.length=0;
ossLog("delay","all","stat=qmajax&time="+cwW);
}
}
})();


function includeAjax(ao)
{


var iI=[];
iI.push(QMAjax.toString());
iI.push(["var QMAjaxSend =",QMAjax.send.toString()].join(""));
globalEval(iI.join(""),ao);

}

var QMAjaxRequest=QMAjax;







function getErrMsg(gh,aOy)
{
var amP="_AjaxErrorHTML_";
var BX=S(amP);
if(!BX)
{
BX=document.createElement("div");
BX.id=amP;
BX.style.display="none";
document.body.appendChild(BX);
}
BX.innerHTML=filteScript(gh.status==200?gh.responseText:"");
var TJ=S(aOy);
return TJ&&(TJ.innerText||TJ.textContent)||"";
}





function getHttpProcesser()
{
var _oTop=getTop(),
aos=_oTop.gCurHttpProcesserId||0;

_oTop.gCurHttpProcesserId=(aos+1)%30;

try
{
if(_oTop.gHttpProcesserContainer[aos]!=null)
{
delete _oTop.gHttpProcesserContainer[aos];
}
}
catch(bf)
{
_oTop.gHttpProcesserContainer={};
}

var bdW=_oTop.gHttpProcesserContainer[aos]=new _oTop.Image;
bdW.onload=function()
{
return false;
};

return bdW;
}







function goUrl(aDO,bj,cel)
{
try
{
var tj=(aDO.contentWindow||aDO).location,
bLT=tj.href.split("#"),
bkh=bj.split("#"),
bKG=bkh[0]==bLT[0],
aS=bKG?bkh[0]:bj;

if(cel)
{
tj.href=aS;
}
else
{
tj.replace(aS);
}
}
catch(bf)
{
aDO.src=bj;
}
}









function generateFlashCode(aL,aHq,BN,aZ)
{
var aZI=[],
aCZ=[],
atb=[],
cN=aZ||{},

apJ=T(' $name$=$value$ '),
aWk=T('<param name="$name$" value="$value$" />'),
bYu=gbIsIE?T([
'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ',
'$codebase$ ','$attr$ $id$ >',
'$param$',
'<embed $embed$ type="application/x-shockwave-flash" ',
'$pluginspage$ ',' $name$ ></embed>',
'</object>'
]):T([
'<embed $embed$ type="application/x-shockwave-flash" ',
'$pluginspage$ ',' $name$ $id$ ></embed>'
]);

function aqs(aD,nJ)
{
return{
name:aD,
value:nJ
};
}

cN.allowscriptaccess=BN&&BN.allowscriptaccess||"always";
cN.quality="high";

for(var Ek in cN)
{
var bT=aqs(Ek,cN[Ek]);
aCZ.push(aWk.replace(bT));
atb.push(apJ.replace(bT));
}

for(var Ek in BN)

{
var bT=aqs(Ek,BN[Ek]);
aZI.push(apJ.replace(bT));
atb.push(apJ.replace(bT));
}

if(aHq)
{
aCZ.push(aWk.replace(aqs("movie",aHq)));
atb.push(apJ.replace(aqs("src",aHq)));
}

return bYu.replace({
id:aL&&[' id="',aL,'"'].join(""),
name:aL&&[' name="',aL,'"'].join(""),
attr:aZI.join(""),
param:aCZ.join(""),
embed:atb.join(""),
codebase:location.protocol=="https:"
?''
:'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ',
pluginspage:location.protocol=="https:"
?''
:'pluginspage="http://www.adobe.com/cn/products/flashplayer" '
}
);
}







function getFlash(aL,ao)
{
var ay=ao||window,
dL=ay[aL]||ay.document[aL];
return dL&&(dL.length?dL[dL.length-1]:dL);
}

















function zoomFuncCreater(aj)
{














return function(rU,nc,chG,chQ)
{
var aHa=chG||aj.limitWidth||1,
aEc=chQ||aj.limitHeight||1,
aKu=(rU/aHa)||1,
aKY=(nc/aEc)||1,
tY=[aKu<1?"w":"W",aKY<1?"h":"H"]
.join(""),
Bd=aj[tY]||aj.all,
aE={};

switch(Bd)
{
case"stretch":
aE.width=aHa;
aE.height=aEc;
break;
case"zoomMaxMin":
case"zoomMinMax":
var bim=rU>nc?0:1;
Bd=["zoomMax","zoomMin"][Bd=="zoomMinMax"
?1-bim
:bim];
case"zoomMax":
case"zoomMin":
var ahP=Math[Bd=="zoomMax"?"min":"max"](
aKY,aKu
);
aE.width=Math.round(rU/ahP);
aE.height=Math.round(nc/ahP);
break;
case"none":
default:
aE.width=rU;
aE.height=nc;
break;
}

aE.left=Math.round((aHa-aE.width)/2);
aE.top=Math.round((aEc-aE.height)/2);

return aE;
};
}










function scrollIntoMidView(bE,fl,cbH,
bUF,chI)
{
if(!bE||!fl)
{
return false;
}


var bif=fl.tagName.toUpperCase()=="BODY",
aM=fl.ownerDocument,
sJ=aM.documentElement;
if(bif&&sJ.clientHeight)
{
fl=sJ;
}

var vN=calcPos(bE)[0]-calcPos(fl)[0]-(bif?fl.scrollTop:0),
RN=vN,
abg=bE.offsetHeight,
apg=fl.clientHeight,
aDj=bUF||0;

if(cbH||RN<0
||RN+abg>apg)
{
var avy=0,
kZ;

if(apg>abg+aDj)
{
if(chI)
{
avy=RN<0?0
:(apg-abg-aDj);
}
else
{
avy=(apg-abg-aDj)/2
}
}

kZ=fl.scrollTop=fl.scrollTop+vN-avy;
fl==sJ&&(aM.body.scrollTop=kZ);
}

return true;
}





function Gel(aL,bE)
{
return(bE||document).getElementById(aL);
}





function objectActive(bE)
{





}




















function inherit(aFU,uZ,aFL,aGT,cau)
{
var baf=callBack(aFL,[uZ.prototype]),
chH=baf.$_constructor_,
WY=function()
{
if(arguments[0]!="__inherit__")
{

var bcu=callBack.call(this,cau,arguments)||{};
if(bcu.bReturn)
{
return bcu.vData;
}
else
{
if(!this.bXl)
{
this.constructor=arguments.callee;
this.bXl=true;
}
uZ.apply(this,arguments);
callBack.call(this,chH,arguments);
}
}
};
extend(WY.prototype=new uZ("__inherit__"),baf,{toString:function(){return"";}});
return extend(WY,aGT,
{
name:aFU,
superclass:uZ
}
);
}







function inheritEx(aFU,uZ,aFL,aGT)
{
var afE={},
WY=inherit(aFU,uZ,aFL,aGT,
function()
{
var aX=typeof(arguments[0]),
bTz=aX=="string"||aX=="undefined";

return{
bReturn:bTz,
vData:WY.$_call.apply(WY,arguments)
};
}
);
return extend(
WY,
{


$_call:function(aL,bOI,az)
{
if(arguments.length==0)
{
return afE;
}
else
{
var ej=afE[aL];
return arguments.length>1&&ej?
callBack.call(ej,ej[bOI],az):ej;
}
},

$_add:function(aL,aA)
{
return afE[aL]=aA;
},

get:function(aL)
{
return afE[aL];
},

$_del:function(aL)
{
delete afE[aL];
}
}
);
}







function inheritSimple(ax,aDM)
{
var Ue=function(atv)
{
var ae=this;
if(atv!=="__inherit__"&&typeof(ae.init_)=="function")
{
ae.init_.apply(ae,arguments);
}
};
if(!aDM)
{
aDM=ax;
ax=function(){};
}
Ue.prototype=A.extend(new ax("__inherit__"),aDM(ax.prototype));
Ue.prototype.constructor=Ue;
return Ue;
}


























function cacheByIframe(aCL,cd)
{
var bi="_cAcheBYifRAme_",
cS=cd||{},
ay=cS.win||getTop(),
aV=cS.id||unikey("_"),
dZ=[cS.attrs],
_oHeader=[cS.header],
cA=[],
cts=cS.virtual!==false;


for(var i=0,_nLen=aCL&&aCL.length||0;i<_nLen;i++)
{
for(var Sx=aCL[i],j=2,bNM=Sx.length;j<bNM;j++)
{
switch(Sx[0])
{
case"img":
cA.push('<img src="',Sx[1],Sx[j],'"/>');
break;
case"js":
case"html":
if(gbIsWebKit)
{
cA.push('<img src="',Sx[1],Sx[j],'"/>');
break;
}
if(gbIsIE)
{
_oHeader.push('<script src="',Sx[1],Sx[j],'" ><\/script>');
break;
}
case"css":
_oHeader.push('<link rel="stylesheet" type="text/css" href="',Sx[1],Sx[j],'" />');
}
}
}



!ay[bi]&&(ay[bi]={});
ay[bi][aV+"_h"]=_oHeader.join("");

ay[bi][aV+"_b"]=((cS.body||"").toString().indexOf("<body")==-1?
'<body class="domain">'+cA.join("")+'</body>':
cS.body+cA.join(""));

createIframe(ay,
(cts?
["javascript:(function(){document.open();document.domain='",document.domain,"';frameElement['_render_']=1;",
"try{document.write('<head><script>window.onerror=function(){return true};<\/script>'+",
"parent['",bi,"']['",aV,"_h']+'</head>'+parent['",bi,"']['",aV,"_b']);",
"parent['",bi,"']['",aV,"_h']=parent['",bi,"']['",aV,"_b']=null;}catch(e){alert(e.message);}",
"document.close();})()"
]:
[getRes("$base_path$zh_CN/htmledition/domain2104475.html"),"#",encodeURIComponent(document.domain),
"&",bi+"&"+encodeURIComponent(aV)+"&"+(cS.destroy!==false?"1":"")
]
).join(""),
extend({},cS,
{
id:aV,
attrs:dZ.join(""),
onload:function(ao)
{
var qj=this;
if(!cts||qj["_render_"])
{
callBack.call(qj,cS.onload,[ao]);

(cS.destroy!=false||qj.getAttribute("destroy")=="true")
&&ay.setTimeout(function(){removeSelf(qj);},100);
}
}
}
)
);
}








function clearCache()
{












arguments.length>0&&getTop().cacheByIframe(arguments,
{
virtual:false,
destroy:false,
onload:function()
{
if(!this.getAttribute("destroy"))
{
this.setAttribute("destroy","true");
this.contentWindow.location.reload(true);
}
}
}
);
}








function preLoad(aw,eS,pQ,bda)
{
if(window!=getTop())
{
getTop().preLoad.apply(this,arguments);
}
else
{
var ae=arguments.callee,
aoz=ae.bKW=(ae.bKW||[]);

if(aw&&pQ)
{
for(var i=0,_nLen=pQ.length;i<_nLen;i++)
{
aoz.push([[aw,eS,pQ[i]]]);
}
}

if(!ae.beV&&aoz.length>0)
{
ae.beV=true;

function avn()
{
ae.beV=false;
callBack(bda,[aoz.shift()[0][2]]);
setTimeout(function(){ae("","","",bda);},100);
}

cacheByIframe(aoz[0],{onload:avn});
}
}
}





function setDblClickNoSel(bE)
{
if(bE)
{
var aLg="__MoUSeDoWnnoSEL__";
function getAtts()
{
return(bE.getAttribute(aLg)||"").toString().split(",");
}
function setAtts(gU,aw)
{
bE.setAttribute(aLg,[gU,aw]);
}
if(getAtts().length==1)
{

setAtts(0,"up");
addEvents(bE,{
mousedown:function(_aoEvent)
{
var gN=now(),
KJ=parseInt(getAtts()[0]);
setAtts(gN,"down");

if(gN-KJ<500)
{
preventDefault(_aoEvent);
}
},

mouseup:function()
{
setAtts(getAtts()[0],"up");
},
selectstart:function(_aoEvent)
{
if(getAtts().pop()=="up")
{
preventDefault(_aoEvent);
}
}
});
}
}

return bE;
}













;(function()
{
var bgu=TE([
'<form method="$sMethod$" id="$sFormId$" name="$sFormId$" target="$sTarget$" action="$sAction$" enctype="multipart/form-data">',
'$@$for($oInputs$)$@$',
'<input name="$name$" type="hidden" value="$value$"/>',
'$@$endfor$@$',
'</form>'
]);

window.createForm=function(aj,LO)
{
var adJ=aj.sFormId||unikey(),
eH=S(adJ,aj.oWin),
iA=[];

if(eH)
{
removeSelf(eH);
}
LO=LO||{};
LO.sid=LO.sid||getSid();
E(LO,function(nR,nr)
{
iA.push({name:nr,value:nR});
}
);
aj.oInputs=iA;
insertHTML(aj.oWin.document.body,"beforeEnd",bgu.replace(
extend(
{
sFormId:adJ,
sTarget:"_self",
sMethod:"POST"
},aj)
)
);
return S(adJ,aj.oWin);
}
})();







































var 
gsMsgNoSubject="\u8BF7\u586B\u5199\u90AE\u4EF6\u4E3B\u9898",
gsMsgNoMail="\u672A\u9009\u4E2D\u4EFB\u4F55\u90AE\u4EF6",
gsMsgSend="\u90AE\u4EF6\u6B63\u5728\u53D1\u9001\u4E2D... ",
gsMsgSave="&nbsp;&nbsp;&nbsp;\u90AE\u4EF6\u6B63\u5728\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1...",
gsMsgSaveOk="\u90AE\u4EF6\u6210\u529F\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",
gsMsgAutoSave="&nbsp;&nbsp;&nbsp;\u90AE\u4EF6\u6B63\u5728\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1...",
gsMsgAutoSaveOk="\u90AE\u4EF6\u81EA\u52A8\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",
gsMsgSendErrorSaveOK="\u4FE1\u4EF6\u5DF2\u88AB\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",
gsMsgSaveErr="\u90AE\u4EF6\u672A\u80FD\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",
gsMsgNoSender="\u8BF7\u586B\u5199\u6536\u4EF6\u4EBA\u540E\u518D\u53D1\u9001",
gsMsgNoCardSender="\u8BF7\u586B\u5199\u6536\u4EF6\u4EBA\u540E\u518D\u53D1\u9001",
gsMsgNoCard="\u8BF7\u9009\u4E2D\u8D3A\u5361\u540E\u518D\u53D1\u9001",
gsMsgSettingOk="\u8BBE\u7F6E\u4FDD\u5B58\u6210\u529F",
gsMsgLinkErr="\u7F51\u7EDC\u5E94\u7B54\u5931\u8D25",
gsMsgCheatAlert="\u7CFB\u7EDF\u4F1A\u5C06\u6B64\u90AE\u4EF6\u79FB\u5165\u5230\u201C\u5783\u573E\u90AE\u4EF6\u201D\u4E2D\uFF0C\u5E76\u628A\u90AE\u4EF6\u5185\u5BB9\u63D0\u4EA4\u7ED9\u90AE\u7BB1\u7BA1\u7406\u5458\u3002\n\n\u60A8\u786E\u5B9A\u8981\u4E3E\u62A5\u6B64\u90AE\u4EF6\u5417\uFF1F",
gsMsgSendTimeErr="\u60A8\u8BBE\u7F6E\u7684\u53D1\u9001\u65F6\u95F4\u4E0D\u5B58\u5728",
gsMsgMoveMailSameFldErr="\u4E0D\u80FD\u79FB\u52A8\u5230\u76F8\u540C\u7684\u76EE\u5F55";








function doPageError(_asMsg,bj,Ct)
{
var hL=arguments.callee.caller,
asq=hL&&hL.caller,
buH=asq&&asq.caller,
aSu=(hL||"null").toString(),
aIQ=(asq||"").toString(),
aKQ=(buH||"").toString(),
akx;

try
{

if(_asMsg.indexOf(" Script ")!=-1)
{
return;
}


log("err:",_asMsg,"-",bj,"-",Ct);

if(_asMsg.indexOf("flashUploader")!=-1)
{
var bia=qmFlash.getFlashVer();
for(var i in bia)
{
_asMsg+="|"+bia[i];
}
}

if(!(bj&&bj.indexOf("/cgi-bin/mail_list?")!=-1&&Ct==2)&&location.getParams)
{
var cN=location.getParams(bj);
aWK=(bj||"").split("?")[0].split("/"),
aZT=encodeURIComponent(
aSu.replace(/[\r\n\t ]/ig,"")
.substr(0,50)
);

if(aWK.length>0)
{
cN.cgi=aWK.pop();
getTop().ossLog("delay","sample",[
"stat=js_run_err&msg=",
_asMsg,
"&line=",
Ct,
"&url=",
T('$cgi$?t=$t$&s=$s$').replace(cN),
"&func=",
aZT,(gbIsIE?"":"_NIE")
].join(""));
}
else
{
akx=aZT;
}
}

getTop().debug([
"error:",
_asMsg,
"<br><b>line</b>:",
Ct,
"<br><b>url</b>:",
bj,
"<br><b>function</b>:",
aSu.substr(0,100),
aIQ?"<br><b>parent function</b>:"
+aIQ.substr(0,100):"",
aKQ?"<br><b>parent parent function</b>:"
+aKQ.substr(0,100):""].join(""),"error");
}
catch(bf)
{
akx=bf.message;
}

akx&&log("err:doPageError ",akx,"-",bj,"-",Ct);







return location.host.indexOf("dev.")!=0;
}




var QMFileType={};

QMFileType.data={
doc:"doc",
docx:"doc",

xls:"exl",
xlsx:"exl",

ppt:"ppt",
pptx:"ppt",

pdf:"pdf",

txt:"txt",
log:"txt",
xml:"txt",
js:"txt",
css:"txt",
php:"txt",
asp:"txt",
aspx:"txt",
jsp:"txt",
vbs:"txt",
h:"txt",
cpp:"txt",

eml:"eml",

rar:"rar",
zip:"rar",
"7z":"rar",
arj:"rar",

wav:"mov",
mp3:"mov",
wma:"mov",
mid:"mov",
rmi:"mov",
ra:"mov",
ram:"mov",

mp1:"mov",
mp2:"mov",
mp4:"mov",
rm:"mov",
rmvb:"mov",
avi:"mov",
mov:"mov",
qt:"mov",
mpg:"mov",
mpeg:"mov",
mpeg4:"mov",
dat:"mov",
asf:"mov",
wmv:"mov",
"3gp":"mov",
ac3:"mov",
asf:"mov",
divx:"mov",
mkv:"mov",
ogg:"mov",
pmp:"mov",
ts:"mov",
vob:"mov",
xvid:"mov",

htm:"html",
html:"html",
mht:"html",

swf:"swf",
flv:"swf",

bmp:"bmp",
gif:"gif",
jpg:"jpg",
jpeg:"jpg",
jpe:"jpg",
psd:"psd",
pdd:"psd",
eps:"psd",

tif:"tu",
tiff:"tu",
ico:"tu",
png:"tu",
pic:"tu",
ai:"tu"
};






QMFileType.getFileType=function(UL)
{
return this.data[(trim(UL||"")).toLowerCase()]||"qita";
};






QMFileType.getFileTypeForFile=function(gS)
{
return this.getFileType((gS||"").split(".").pop());
};






var QMHistory={
afT:{




},
ZL:{





}
};






QMHistory.getId=function(aL)
{
return aL;
};






QMHistory.getUrl=function(aL)
{
var bO=getTop().QMHistory.ZL[QMHistory.getId(aL)];
return bO&&bO.aS;
};





QMHistory.getLastRecordId=function()
{
return getTop().QMHistory.afT.bXi;
};






QMHistory.tryBackTo=function(aL)
{
try
{
var bT=getTop().QMHistory.afT,
aru=QMHistory.getId(aL),
Wj=getTop().QMHistory.ZL[aru],
bdU=Wj&&Wj.aS,
aYA=Wj
&&Wj.cdj>=getTop().history.length,
aYy=Wj&&bT.bTg==bdU,
aXi=Wj&&!bT.bRs;

function cei()
{
var aS=bdU.split("#")[0];

if(getTop().location.getParams
&&getTop().location.getParams(aS)["folderid"]==4)
{
return goUrlMainFrm(aS);
}


if(gbIsIE&&gnIEVer==6)
{
return getTop().history.go(aS);
}
getTop().history.back();
};

if((gbIsIE&&(aYA||aYy)&&aXi)
||(!gbIsWebKit&&aYA&&aYy&&aXi))
{

cei();
return true;
}
}
catch(bf)
{

}

return false;
};





QMHistory.recordCurrentUrl=function(ao)
{
var aS=ao.location.href,
Ls=getTop().QMHistory.ZL,
bT=getTop().QMHistory.afT;

var bSI=bT.bTg=bT.bNi,
Kg=bT.bNi=aS;

var ahw,JX;


for(var i in Ls)
{
if(Ls[i].aS==bSI)
{
ahw=i;
}
if(Ls[i].aS==Kg)
{
JX=i;
}
}


if(ahw&&JX)
{
delete Ls[ahw];
}


if(aS.indexOf("/mail_list")!=-1)
{
this.aEh("mail_list",aS);
}

if(aS.indexOf("t=readmail")!=-1)
{
this.aEh("readmail",aS);
}

if(aS.indexOf("/today")!=-1)
{
this.aEh("today",aS);
}
};





QMHistory.recordActionFrameChange=function(da)
{
getTop().QMHistory.afT.bRs=da!="clear";
};






QMHistory.aEh=function(aL,bj)
{
var _oTop=getTop(),
aru=QMHistory.getId(aL),
Ls=_oTop.QMHistory.ZL,
bO=Ls[aru];

if(!bO)
{
bO=Ls[aru]=new _oTop.Object;
}

bO.cdj=history.length+1;
bO.aS=bj;

_oTop.QMHistory.afT.bXi=aL;
};












function QMCache(aj)
{
var KJ=this.cbL=aj.timeStamp||1;
var Gv=this.adb=aj.appName;

if(!KJ||!Gv)
{
throw{
message:"QMCache construct : config error!"
};
}

var aqh=getTop().QMCache.VD;
if(!aqh)
{
aqh=getTop().QMCache.VD={};
}

var Kq=aqh[Gv];
if(!Kq)
{
Kq=aqh[Gv]={
aDs:"0",
qV:{}
};
}

if(this.bhS(Kq.aDs,KJ)==1)
{
Kq.aDs=KJ;
}
};





QMCache.prototype.isHistoryTimeStamp=function()
{
return this.bhS(
getTop().QMCache.VD[this.adb].aDs,
this.cbL
)!=0;
};






QMCache.prototype.setData=function(bm,bJ)
{
getTop().QMCache.VD[this.adb][bm]=bJ;
};

QMCache.prototype.getAll=function(bm)
{
return getTop().QMCache.VD[this.adb];
}






QMCache.prototype.getData=function(bm)
{
return getTop().QMCache.VD[this.adb][bm];
};





QMCache.prototype.delData=function(bm)
{
delete getTop().QMCache.VD[this.adb][bm];
};







QMCache.prototype.bhS=function(bfT,bgE)
{
if(bfT==bgE)
{
return 0;
}
return bfT>bgE?-1:1;
};










var QMMailCache=
{
Nc:now()
};







QMMailCache.newCache=function(vS,aoL)
{
var Sq=false,
_oTop=getTop();

if(!_oTop.gMailListStamp||_oTop.gMailListStamp<aoL)
{
_oTop.gMailListStamp=aoL;
if(!_oTop.goMailListMap)
{
_oTop.goMailListMap=new _oTop.Object;
}
Sq=true;
}
else if(_oTop.gnExpireTimeStamp>=aoL)
{







reloadFrm(vS);
}

return vS["isNewQMMailCache"+this.Nc]=Sq;
};




QMMailCache.setExpire=function()
{
getTop().gnExpireTimeStamp=getTop().gMailListStamp;
};













QMMailCache.addData=function(aJ,aZ)
{
if(!aJ||!getTop().goMailListMap)
{
return;
}

if(!this.hasData(aJ))
{
getTop().goMailListMap[aJ]={
oTagIds:{},
bUnread:null,
star:null,
reply:null
};
}

if(!aZ)
{
return;
}

var gp=getTop().goMailListMap[aJ];
for(var i in aZ)
{
switch(i)
{
case"removeTagId":
gp.oTagIds[aZ[i]]=0;
break;
case"addTagId":
gp.oTagIds[aZ[i]]=1;
break;
default:
if(typeof aZ[i]!="undefined")
{
gp[i]=aZ[i];
}
break;
}
}
};





QMMailCache.delData=function(aJ)
{
if(getTop().goMailListMap)
{
delete getTop().goMailListMap[aJ];
}
};






QMMailCache.hasData=function(aJ)
{
return getTop().goMailListMap&&getTop().goMailListMap[aJ]!=null;
};






QMMailCache.getData=function(aJ)
{
return getTop().goMailListMap&&getTop().goMailListMap[aJ];
};







QMMailCache.addVar=function(acs,cg)
{
return getMainWin()[acs]=this.getVar(acs,0)+cg;
};







QMMailCache.getVar=function(acs,bun)
{
return getMainWin()[acs]||bun;
};






QMMailCache.isRefresh=function(vS)
{
return vS["isNewQMMailCache"+this.Nc];
};










function rdVer(XA,Si,aEk)
{

var aIb,sz,RB,aDT,
bO=new QMCache({appName:"readmail"});

if(Si==-1)
{
return bO.delData(XA);
}

aIb=bO.getData("on");
if(XA=="on")
{
return Si==0?(aIb||0):(bO.setData("on",Si));
}

if(!aIb||!XA)
{
return 0;
}

aDT=XA=="BaseVer";

RB=bO.getData("BaseVer");
if(!RB||(aDT&&Si==1))
{

RB=RB||(rdVer("on",0)+(+Math.random().toFixed(2)));
RB+=10;
bO.setData("BaseVer",RB);
}

if(aDT)
{
return RB;
}

sz=(bO.getData(XA)||0);
var bfB=(!sz||Si==1);

if(bfB||aEk)
{
if(bfB)
{
sz+=10000;
}
if(aEk)
{
sz=Math.floor(sz/10000)*10000+parseInt(aEk,10)%10000;
}
bO.setData(XA,sz);
}
return sz;
}

rdVer.batch=function(aw)
{
var bO=new QMCache({appName:"readmail"}),
ia=new RegExp("^"+aw),
gp=bO.getAll();

E(gp,function(Km,aJ)
{
if(ia.test(aJ))
{
rdVer(aJ,1);
}
}
);
}






rdVer.check=function(ao,aJ,anw)
{
if(ao)
{
var jy=ao.location,
aJ=aJ||jy.getParams()["mailid"],
anw=anw||jy.getParams()["ver"]||0,
bcV=rdVer(aJ,0);

if(bcV>anw)
{
goUrl(ao,cookQueryString(jy.href,{ver:bcV}),true);
return true;
}
else
{
return false;
}
}
}






rdVer.log=function(aJ,Ob)
{
var aIt=new QMCache({appName:"preload"}),
KK=new Date().getTime(),
eY=aIt.getData(aJ),
atN=eY&&(KK-eY)<rdVer.maxage(aJ)*1000;

switch(Ob)
{
case"pre":
if(!atN)
{
aIt.setData(aJ,KK);
ossLog("delay","all","stat=rdcache&type=281&locval=,rdcache,preload,1");
}
break;
case"hit":
if(atN)
{
ossLog("delay","all","stat=rdcache&type=291&locval=,rdcache,hit,1");
}
if(eY)
{
aIt.delData(aJ);
}
break;
}
return atN;
}

rdVer.isPre=function(Od)
{

return!(Od>2&&Od<7||Od==9||Od==11);
}


rdVer.preRD=function(Xl,XO)
{
var ayK=function()
{
preLoad("html","/cgi-bin/readmail?",Xl,function(kf)
{
rdVer.log(location.getParams(kf)["mailid"],"pre");
}
);
}
if(Xl&&Xl.length>0)
{
XO=XO||40;

Xl=Xl.slice(0,rdVer("on",0)>1?2:1);

if(Xl.length>0)
{
if(XO)
{
setTimeout(ayK,XO);
}
else
{
ayK();
}
}
}
}

rdVer.maxage=function(aJ)
{
if(!aJ)
{
return 0;
}
return(aJ[0]=="@"||aJ[0]=="C"?10:60)*60;
}










rdVer.url=function(aJ,nv,bWC,eB,bSH,agH,
aHJ,aGP,aWo)
{
var bhr='/cgi-bin/$cgi$?folderid=$folderid$$s$&t=$t$&mailid=$mailid$$cache$&sid=$sid$',
aDJ,
Mn,JZ,aS,wi="readmail";

if(aHJ)
{
Mn="readmail&s=draft";
}
else if(eB===0)
{
Mn=aGP==100?"compose_card&s=draft"
:"compose&s=draft";
}
else if(nv=="9")
{
bhr=[location.protocol,location.protocol=="https:"?"//ws.mail.qq.com":"//msgopt.mail.qq.com",bhr].join("");
Mn="sms_list_v2";
wi="readtemplate";
}
else if(nv=="11"||/^(LP|ZP)/.test(aJ))
{
wi="bottle_panel";
Mn="bottle";
}
else
{
switch(aJ.charAt(0))
{
case'C':
Mn="readmail_conversation";
break;
case'@':
Mn="readmail_group";
break;
default:
Mn="readmail";
break;
}
aDJ=true;
}

if(bSH)
{
JZ=["&newwin=true","&compose_new=compose"][eB?0:1];
}
else
{
JZ=["","&s=from_unread_list","&s=from_star_list"][
agH!=1&&agH!=2?0:agH];
}

var sz=aDJ?rdVer(aJ,0,bWC):0;

if(!sz&&aWo)
{
return"";
}

aS=T(bhr).replace(
{
cgi:wi,
mailid:aJ,
folderid:nv,
t:Mn,
s:JZ,
sid:getSid(),
cache:sz?T("&mode=pre&maxage=$maxage$&base=$base$&ver=$ver$").replace(
{
maxage:rdVer.maxage(aJ),
base:rdVer("BaseVer",0),
ver:sz
}
):""
}
);

return aWo?aS.split("?")[1]:aS;
}









function setGlobalVarValue(bm,dM,bMP)
{
var _oTop=getTop();

if(!_oTop.goDataBase)
{
_oTop.goDataBase=new _oTop.Object;
}

if(bm&&!bMP)
{
_oTop.goDataBase[bm]=dM;
}

return dM;
}






function getGlobalVarValue(bm)
{
return getTop().goDataBase&&getTop().goDataBase[bm];
}






function hideWindowsElement(ha,ao)
{
ao=ao||getMainWin();
if(!gbIsIE||gnIEVer>6||(ao.gbIsHasHideElements||false)!=(ha||false))
{
return;
}

getTop().setGlobalVarValue("WINDOWS_ELEMENT_NOT_DISPLAY",ha?"":"true");

ao.gbIsHasHideElements=!ha;

var cA=ao.document.body;

E(ao.QMReadMail?["select","object","embed"]:["select"],
function(bRR)
{
E(GelTags(bRR,cA),
function(bE)
{
if(ha)
{
bE.style.visibility=
bE.getAttribute("savevisibility");
}
else
{
bE.setAttribute("savevisibility",
getStyle(bE,"visibility"));
bE.style.visibility="hidden";
}
}
);
}
);
}






function controlWindowsElement()
{
var bYD=getTop().getGlobalVarValue("WINDOWS_ELEMENT_NOT_DISPLAY");
if(bYD=="true")
{
hideWindowsElement(false);
}
}





function setKeepAlive(ao)
{
if(getTop().gKeepAliveNum==null)
{
getTop().gKeepAliveNum=0;
}

if(ao==null||ao.gbIsSetKeepAlive==true)
{
return;
}

ao.gbIsSetKeepAlive=true;
getTop().gKeepAliveNum++;

if(getTop().gKeepAliveTimer==null)
{

getTop().gKeepAliveTimer=getTop().setInterval(
function()
{
getTop().runUrlWithSid("/cgi-bin/readtemplate?t=keep_alive");
},
15*60*1000
);
}
addEvent(
ao,
"unload",
function()
{
ao.gbIsSetKeepAlive=false;
getTop().gKeepAliveNum--;
if(getTop().gKeepAliveNum==0)
{
getTop().clearInterval(getTop().gKeepAliveTimer);
getTop().gKeepAliveTimer=null;
}
}
);
}







function encodeNick(tZ)
{
return tZ&&tZ.replace(/\\/g,"\\\\").replace(/\"/ig,"\\\"").replace(/\'/ig,"\\\'")||"";
}






function decodeNick(tZ)
{
return tZ&&tZ.replace(/\\\"/ig,"\"").replace(/\\\\/ig,"\\")||"";
}






function rollback(eB)
{
var ame=getGlobalVarValue('DEF_ROLLBACK_ACTION');
if(ame&&ame.rbkey)
{
confirmBox({
title:"\u64A4\u9500\u786E\u8BA4",
mode:"prompt",

height:135,
msg:T([
'\u64A4\u9500\u6700\u8FD1\u4E00\u6B21$msg$\u5417\uFF1F',
]).replace(ame),
onreturn:function(ba)
{
if(ba)
{
QMAjax.send("/cgi-bin/mail_mgr",
{
method:"POST",
content:["sid=",getSid(),"&mailaction=mail_revert&t=mail_mgr2&timekey=",ame.rbkey,"&logtype=",eB].join(''),
onload:function(ba,bK)
{
if(ba&&bK.indexOf("mail_revert successful")>=0)
{
var Ag=getMainWin().location.getParams()["t"];

if(Ag=="mail_list"||Ag=="mail_list_group"||(!Ag&&getMainWin().location.href.indexOf("/cgi-bin/mail_list?")>-1))
{
reloadFrmLeftMain(true,true);
}
else if(Ag=="folderlist_setting")
{
goUrlMainFrm(getMainWin().location.href.replace(/\#.+/,"").replace(/&s=.+?(&|$)/,"&")+"&s="+getMainWin().getType());
reloadFrmLeftMain(true,false);
}
else
{
reloadFrmLeftMain(true,false);
}

setGlobalVarValue('DEF_ROLLBACK_ACTION',null);
showInfo("\u6210\u529F\u64A4\u9500\u6700\u8FD1\u4E00\u6B21"+ame.msg);
}
else
{
var bf=globalEval(bK);
showInfo(bf&&bf.errmsg||("\u64A4\u9500\u6700\u8FD1\u4E00\u6B21"+ame.msg+"\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
}
}
});
}
}
});
}
}


var QMPageInit={
bio:function(ao)
{
var _oTop=getTop();
if(ao==_oTop)
{
var hL=new(_oTop.Function)(
"var _oLogs = arguments.callee.logs;_oLogs.length > 500 && _oLogs.shift();"+
"_oLogs.push([+new Date, [].slice.apply(arguments).join('')].join(' '));");
hL.logs=new(_oTop.Array);
return hL;
}
else
{
return _oTop.log||(_oTop.log=this.bio(_oTop));
}
},

cfF:function(bQo)
{
return function()
{
try
{
var aBT=arguments.length,
aIl=arguments[aBT-1],
aXf=aIl>100000;
if(typeof(aIl)=="number"
&&(aXf&&aIl!=getTop().g_uin))
{
return;
}
}
catch(e)
{

return;
}

if(getTop().Console)
{
if(aBT==0||(aBT==1&&aXf))
{
if(location.host=="dev.mail.qq.com")
{
debugger;
}
}
else
{
try
{
var _oConsole=getTop().Console[bQo];
_oConsole.add.apply(_oConsole,arguments);

}
catch(bf)
{
}
}
}
}
},

chf:function(ao)
{
return function(aD,cih,da,bRe,eM)
{
if(getTop().QMTimeTracer&&(!eM||eM==getTop().g_uin))
{
getTop().QMTimeTracer.getTracer().trace(aD,cih,
ao,da,bRe
);
}
}
},

bVX:function(ao)
{
var tj=ao.location;
tj.bhy=false;
tj.params={};
tj.getParams=function(bj)
{
if(!bj&&this.bhy)
{
return this.params;
}

var cN={},
aNz=bj
?bj.substr(bj.indexOf("?")+1).split("#")[0]
:this.search.substr(1);

if(aNz)
{
E(aNz.split("&"),function(pB)
{
var bW=pB.split("=");
cN[bW.shift()]=unescape(bW.join("="));
}
);
}

if(!bj)
{
this.params=cN;
this.bhy=true;
}

return cN;
};

var fQ=tj.href,
_oTop=getTop();

if(ao==_oTop
&&getSid()
&&fQ.indexOf("/cgi-bin/")>-1
&&fQ.indexOf("/frame_html?")==-1
&&fQ.indexOf("/log")==-1
&&(fQ.indexOf("/ftnExs_")==-1||fQ.indexOf("/ftnExs_files")>-1)
&&!ao.gbIsNoCheck
&&tj.getParams()["nocheckframe"]!="true")
{
if(fQ.indexOf("/cgi-bin/bizmail")==-1)
{

goNewWin(tj,true,!ao.gbSupportNW);
}
else
{
goNewWin(tj,true,false,{frametmpl:"dm_frame",frametmplparam:"&dmtype=bizmail"});
}
}

else if(ao!=_oTop&&_oTop.bnewwin&&ao==getMainWin())
{
if(!ao.gbSupportNW)
{
goNewWin(tj,true,true);
}
else if(tj.getParams()["newwin"]!="true")
{
ao.location.replace(fQ+"&newwin=true");
}
}
},

bPY:function(_aoEvent,bZh)
{
var ee=_aoEvent.srcElement||_aoEvent.target,
anA=_aoEvent.ctrlKey,
ede=_aoEvent.altKey,
wJ=_aoEvent.shiftKey,
dGj=_aoEvent.metaKey,
dT=_aoEvent.keyCode,
XI=ee.type=="text"
||ee.tagName=="TEXTAREA",
bVz=bZh
&&(ee.tagName=="INPUT"&&ee.type!="button"),
ccJ=ee.tagName=="BUTTON"||ee.type=="button";

switch(dT)
{

case 8:

if(!XI&&goBackHistory())
{
preventDefault(_aoEvent);
}
break;

case 13:


if(!ccJ&&((!XI&&QMReadedItem.read(ee))||bVz))
{
preventDefault(_aoEvent);
}
break;

case 37:

case 39:

if(anA)
{
goPrevOrNextMail(dT==39);
preventDefault(_aoEvent);
}
break;

case 38:

case 40:

case 188:

case 190:

var aaX=dT==38||dT==188;
if(!XI&&getMainWin()&&getMainWin().QMReadedAddr)
{
if(getMainWin().QMReadedAddr.move(!aaX))
{
preventDefault(_aoEvent);
}
}
else
{
if(!XI)
{
if(QMReadedItem.move(!aaX))
{
preventDefault(_aoEvent);
}
}
}
break;

case 46:


if(!XI)
{
var biH=S(
wJ?"quick_completelydel":"quick_del",
getMainWin()
),
biC=wJ?S("quick_del",getMainWin()):null,
bjf=S("del",getMainWin());
if(isShow(biH)||isShow(biC)||isShow(bjf))
{
preventDefault(_aoEvent);
fireMouseEvent((biH||biC||bjf),"click");
}
}
break;

case 88:

if(!XI&&QMReadedItem.check(wJ))
{
preventDefault(_aoEvent);
}
break;
case 90:
var DG=ee.tagName.toUpperCase();
if(anA&&!(DG=="INPUT"&&ee.type.toLowerCase()!="button"||DG=="TEXTAREA"))
{
rollback(1);
}
break;

case 65:
if(!XI&&(dGj||anA))
{
preventDefault(_aoEvent);
var cSp=S("frm",getMainWin());
if(cSp)
{
var crr=GelTags("table",cSp)[0];
if(crr)
{
var Pq=GelTags("input",crr)[0];


!Pq.addEventListener&&Pq.click&&Pq.click()
||fireMouseEvent(Pq,"click");

}
}
}
break;
}
},

bXu:function(ao)
{
ao.Log=ao.log=this.bio("log");
ao.Debug=ao.debug=this.cfF("debug");

ao.Trace=ao.trace=this.chf(ao);
ao.onerror=doPageError;
},

bZU:function(ao)
{
if(ao!=getTop()&&ao==getMainWin())
{

getTop().QMHistory.recordCurrentUrl(ao);
getTop().QMHistory.recordActionFrameChange("clear");


var ae=this,fQ=ao.location.href,
aES=fQ.indexOf("t=sms_list_v2")>0,
bZA=fQ.indexOf("t=bottle")>0;

addEvents(ao,
{load:function()
{
initAD(ao)
},
unload:function()
{

showProcess(0);
if(isshowMsg()&&getTop().gMsgDispTime
&&now()-getTop().gMsgDispTime>2000)
{
hiddenMsg();
}

aES&&startWebpush(2);

}
});

aES&&closeWebpush(2);
bZA&&closeWebpush(4);
getTop().QMWebpushTip&&getTop().QMWebpushTip.hideAll(3000);

ao.setTimeout(function()
{



















if(!(getTop().QQPlusMail&&getTop().QQPlusMail.getPageTitle()))
{
ao.document.title&&(getTop().document.title=ao.document.title);
}

},
200
);
}
},

bQD:function(ao)
{

if(ao==getTop()&&ao.location.href.indexOf("/frame_html")!=-1)
{



















addEvents(ao,{
load:function(e)
{
var cA=getTop().document.body;

function aYZ(_aoEvent)
{
var ee=_aoEvent.srcElement||_aoEvent.target;

for(var HK=0;ee&&HK<3;
ee=ee.parentNode,HK++)
{
if(ee.tagName=="A")
{
break;
}
}

return ee||{};
};

function ceG(_aoEvent)
{
if((_aoEvent.target||_aoEvent.srcElement)==cA)
{
preventDefault(_aoEvent);
}
}

function bdE(_aoEvent)
{
var ee=aYZ(_aoEvent);
if(ee.tagName=="A")
{
if(ee.getAttribute("initlized")!="true")
{
ee.setAttribute("initlized","true");

var bgw=ee.onclick;
ee.onclick=function(caX)
{
var bN=caX||getTop().event,
dH=parseInt(ee
.getAttribute("md"));
if(!isNaN(dH)&&dH>0)
{
getTop().clearTimeout(dH);
ee.setAttribute("md","0");

var wJ=bN.shiftKey,
anA=bN.ctrlKey,
bPi=bN.metaKey,
baU=wJ||anA||bPi,
bfm=trim(ee.href)
.indexOf("http")==0;

function aYF()
{
if(bgw)
{
bgw.call(ee);
preventDefault(bN);
}

if(bfm)
{
if(baU&&ee.href.indexOf("java")!=0)
{
open(ee.href);
preventDefault(bN);
}
else
{
switch(ee.target)
{
case"mainFrame":
var aS=ee.href;
goUrlMainFrm(
aS+(aS.indexOf("?")!=-1?"#stattime="+now():""),
false
);
preventDefault(bN);
break;
case"_parent":
case"_self":
try
{
ao.location.href=ee.href;
}
catch(BK)
{
}
preventDefault(bN);
break;
default:
break;
}
}
}
};

if(!baU
&&ee.getAttribute("nocheck")!="true"
&&(!bfm||ee.target!="_blank"))
{
preventDefault(bN);
QMPageInit
.blq(aYF);
}
else
{
aYF();
}
}
};
}

ee.setAttribute(
"md",
getTop().setTimeout(
function()
{
ee.setAttribute("md","0");
},
1000
)
);
}

}

function axX(_aoEvent)
{
var ee=aYZ(_aoEvent);
if(ee.tagName=="A"
&&ee.getAttribute("initlized")!="true")
{
preventDefault(_aoEvent);
}
}

addEvents(cA,
{
mousewheel:ceG,
mousedown:bdE,
keydown:bdE,
click:axX
}
);
}


});
}
},

bVn:function(ao,_aoEvent)
{
var Ag,
bgo=["u","1","2","3","4"],
aF=getEventTarget(_aoEvent),
bev=function(_aoDom)
{
if(_aoDom&&_aoDom.getAttribute)
{
var CF=_aoDom.getAttribute("t");
for(var i in bgo)
{
if(bgo[i]==CF)
{
return CF;
}
}
}
};

Ag=bev(aF);

while(aF&&aF!=ao.document.body&&Ag)
{
if(Ag=="u")
{
aF=aF.parentNode;
Ag=bev(aF)||Ag;
}
else
{
return aF;
}
}
return null;
},

bhG:function(aw,ao,_aoEvent)
{
var aF=this.bVn(ao,_aoEvent),
brE;
if(!aF&&aw=="over"&&(brE=ao["__simpleTipDivShared"]))
{
brE&&addClass(brE,"smt_hide");
brE=null;
}
if(aF)
{
var Ag=aF.getAttribute("t");
switch(Ag)
{
case"1":
case"2":
case"3":
waitFor(
function()
{
return getTop().QMProfileTips;
},
function(mT)
{
if(mT)
{
getTop().QMProfileTips.doMouseEvent(aw,ao,aF);
}
}
);
break;
case"4":
var aoJ="simpletip",
aYX="stitle",
aWY="smt_hide";
if(aF.title)
{
aF.setAttribute(aYX,aF.title);
aF.title="";
}
if(aw=="over")
{
var hB=aF.getAttribute(aYX),
tV=S(aoJ,ao);
if(!tV)
{
insertHTML(ao.document.body,"afterBegin",'<div id="'+aoJ+'" class="smt_container smt_up smt_hide"><span class="smt_inner"></span></div>');
tV=S(aoJ,ao);
}
if(tV)
{
tV.firstChild.innerHTML!=hB&&(tV.firstChild.innerHTML=hB);
rmClass(tV,aWY);

var Sc=calcPos(aF),
bbM=(Sc[1]+Sc[3])/2;
Sc[0]-=3;
Sc[2]+=3;

var	cI=parseInt(tV.offsetHeight),
cD=parseInt(tV.offsetWidth),
_oPos=calcAdjPos([Sc[0],bbM,Sc[2],bbM],cD,cI,ao,2),
ir=tV.className,
brb=_oPos[2]==Sc[0]?"smt_down":"smt_up";


tV.className="smt_container "+brb+" smt_id_"+aF.id;

tV.style.top=_oPos[0]+"px";
tV.style.left=(_oPos[3]-cD/2)+"px";
ao["__simpleTipDivShared"]=tV;
}
}
else if(aw=="out")
{
var tV=S(aoJ,ao);
tV&&addClass(tV,aWY);
ao["__simpleTipDivShared"]=null;
}
break;
}
}
},

bMA:function(ao)
{
ao.call=function()
{
var aY=arguments,aVK=[],i,l,
dZ=aY[0].split("."),
ae=hL=ao;

for(i=1,l=aY.length;i<l;i++)
{
aVK.push(aY[i]);
}

for(i=0,l=dZ.length;i<l&&hL;i++)
{
ae=hL;
hL=hL[dZ[i]];
}

if(typeof hL=="function")
{
return hL.apply(ae,aVK);
}
}
},



bWa:function(ao)
{
var ae=this;
ao.setTimeout(
function()
{
var bWb=(ao.location.getParams
&&ao.location.getParams()["t"]||"")
.indexOf("compose")==0;

addEvents(ao.document,
{
mousedown:hideMenuEvent,
touchend:getTop().iPadCloseMenu||function(){},
keydown:function(_aoEvent)
{

ae.bPY(_aoEvent,bWb);
},
click:function(_aoEvent)
{
hideEditorMenu();


getTop().QMWebpushTip&&getTop().QMWebpushTip.hideAll(3000);
},
mouseover:function(_aoEvent)
{
ae.bhG("over",ao,_aoEvent);
},
mouseout:function(_aoEvent)
{
ae.bhG("out",ao,_aoEvent);
}
}
);
},100
);
},

adY:function(ao)
{
ao=ao||window;

if(ao.gIsInitPageEventProcess)
{
return;
}

ao.gIsInitPageEventProcess=true;

var lz=0;
try
{
lz=1;
this.bXu(ao);

lz=2;
this.bVX(ao);

lz=3;
this.bZU(ao);

lz=4;
this.bQD(ao);

lz=5;
this.bWa(ao);

lz=6;
this.bMA(ao);
}
catch(bf)
{
doPageError(bf.message,ao.location.href,
"initPageEvent_processid:"+lz
);
}

try
{

ao.document.execCommand("BackgroundImageCache",false,true);
}
catch(bf)
{
}
},

blq:function(atr)
{
try
{
if(getMainWin().exitConfirm)
{
return getMainWin().exitConfirm(atr);
}
}
catch(bf)
{
debug(bf.message);
}


atr();
}
}





function initPageEvent(ao)
{
QMPageInit.adY(ao);
}

(function()
{
initPageEvent(window);
})();






function getTopWin()
{
return getTop();
}





function getMainWin()
{
return F("mainFrame",getTop())||getTop();
}





function getActionWin()
{
return F("actionFrame",getTopWin());
}





function getLeftWin()
{
return getTop();
}
var GetLeftWin=getLeftWin;





function getLeftDateWin()
{
return F("leftFrame",getTop());
}






function reloadFrm(ao)
{
if(ao&&ao!=getTop())
{
try
{
if(ao.location.search)
{


var arE=ao.location.href.split("#")[0].split("?"),
aZi="r="+now();
arE[1]=!arE[1]?aZi:
(("&"+arE[1]+"&").replace(/&r=.*?&/,"&")+aZi).slice(1);
ao.location.replace(arE.join("?"));
return true;
}
}
catch(bf)
{
}
}
return false;
}




function reloadLeftWin()
{
var Fu;
if(!reloadFrm(getLeftDateWin())&&(Fu=S("leftFrame",getTop())))
{
Fu.src=T('/cgi-bin/folderlist?sid=$sid$&r=$rand$').replace(
{
sid:getSid(),
rand:Math.random()
}
);
}
}








function reloadAllFrm(dtH,dNw,aoo,apx)
{
function PV(bLE)
{
var bcw=arguments.callee;
getTop().setTimeout(bLE,bcw.lq);
bcw.lq+=200;
}
PV.lq=0;

if(apx==null||apx)
{
PV(
function()
{
reloadFrm(getMainWin());
}
);
}

if(aoo==null||aoo)
{
PV(
function()
{
reloadFrm(reloadLeftWin());
}
);
}
}






function reloadFrmLeftMain(aoo,apx)
{
reloadAllFrm(false,false,aoo,apx);
}













function goUrlTopWin(bj,bNt)
{

goUrl(getTop(),bj,!bNt);
}







function goUrlMainFrm(bj,bPw,biw)
{
if(bPw!=false)
{
reloadLeftWin();
setTimeout(
function()
{
goUrl(S("mainFrame",getTop())||getTop(),bj,!biw);
},
300
);
}
else
{
goUrl(S("mainFrame",getTop())||getTop(),bj,!biw);
}
}

function chA(aku)
{
return aku&&aku.substr&&("?"+(["&",aku.substr(1),"&"].join("")
.replace(/&sid=.*?&/ig,"&")
.replace(/&loc=.*?&/ig,"&")
.replace(/&newwin=true/ig,"&")
.slice(1,-1)));
}










function goNewWin(WZ,cfL,bOX,ast)
{
var akF="",
Ha="",
mZ="";

if(typeof(WZ)=="object")
{
akF=WZ.pathname;
Ha=WZ.search;
}
else
{
var xH=WZ.indexOf("?");
akF=WZ.substring(0,xH);
Ha=WZ.substr(xH);
}

if(ast)
{
mZ=ast.frametmpl;
}
else
{
mZ=bOX?"frame_html":"newwin_frame";
}

var biF='';
if(akF.indexOf('reader_')>-1)
{
biF=getTop().location.protocol+"//mail.qq.com";
}

var aS=T(biF+'/cgi-bin/frame_html?t=$t$&sid=$sid$&url=$url$').replace(
{
t:mZ,
sid:getSid(),
url:encodeURI(akF+chA(Ha))
}
);

if(ast)
{
aS+=ast.frametmplparam;
}

if(cfL)
{
goUrlTopWin(aS,true);
}
else
{

window.open(aS);
}
}






function isMaximizeMainFrame()
{
return getTop().maximizeMainFrame.ccq;
}






function maximizeMainFrame(aok)
{
var aHP=S("mainFrame",getTop()),
aqf=S("leftPanel",getTop()),
apu=S("imgLine",getTop());

if(!aHP||!apu||!aqf
||aok!=2&&(aok==0)==!isMaximizeMainFrame())
{
return false;
}

var ael=getTop().maximizeMainFrame,
Lf=ael.ccq=aok==2
?!isMaximizeMainFrame():(aok?true:false);

if(Lf)
{
ael.bLV=aqf.style.width;
ael.bPU=apu.parentNode.style.cssText;
}

aHP.parentNode.style.marginLeft=
Lf?"5px":ael.bLV;
aqf.parentNode.style.cssText=
Lf?"border-left:none;":"";
apu.parentNode.style.cssText=
(Lf?"border-left:none;margin-left:0;padding:0;":"")+ael.bPU;

show(aqf,!Lf);
show(apu,!Lf);
show(S("qqplus_panel",getTop()),!Lf);
show(S("folder",getTop()),!Lf);
}







function filteSignatureTag(bF,da)
{
var fA=typeof bF=="string"?bF:"";

if(da=="2LOWCASE")
{
return fA.replace(/<sign(.*?)\/>/ig,"<sign$1>")
.replace(/<qzone(.*?)\/>/ig,"<qzone$1>")
.replace(/<taotao(.*?)\/>/ig,"<taotao$1>")
.replace(/<\/sign>/ig,"</sign>")
.replace(/<\/qzone>/ig,"</qzone>")
.replace(/<\/taotao>/ig,"</taotao>")
.replace(/<(\/?)includetail>/ig,"<$1tincludetail>");
}
if(da=="FILTE<:")
{
return fA.replace(/<:sign.*?>/ig,"")
.replace(/<:qzone.*?>/ig,"")
.replace(/<:taotao.*?>/ig,"")
.replace(/<:includetail.*?>/ig,"");
}
else
{
return fA.replace(/<\/?sign.*?>/ig,"")
.replace(/<\/?qzone.*?>/ig,"")
.replace(/<\/?taotao.*?>/ig,"")
.replace(/<\/?includetail.*?>/ig,"");
}
}





function getSignatureHeader()
{
return T([
'<div style="color:#909090;font-family:Arial Narrow;font-size:12px">',
'------------------',
'</div>'
]);
}





window.g_sBaseImageUrl=getTop().getPath("stationery");
if(!getTop().goUserInfo)
{
getTop().goUserInfo=
{
dN:'init',
aHg:{},
av:{},
dNj:function()
{
for(var obj in getTop().goUserInfo.aHg)
{
for(var i=0,l=getTop().goUserInfo.aHg[obj].length;i<l;i++)
{
try{
getTop().goUserInfo.aHg[obj][i](getTop().goUserInfo.get(obj));
}catch(e){}
}
}
getTop().goUserInfo.aHg={};
},
get:function(bi)
{
if(getTop().goUserInfo.dN=='init')
{
getTop().goUserInfo.reset();
return'';
}
else
{
if(typeof getTop().goUserInfo.av[bi]==='undefined')
{
return'';
}
return getTop().goUserInfo.av[bi];
}
},
deferget:function(bi,jd)
{
if(getTop().goUserInfo.dN=='init')
{
if(typeof getTop().goUserInfo.aHg[bi]==='undefined')
{
getTop().goUserInfo.aHg[bi]=[];
}
getTop().goUserInfo.aHg[bi].push(jd);
getTop().goUserInfo.reset();
}
else
{
jd(getTop().goUserInfo.av[bi]);
}
},
set:function(ej)
{
extend(getTop().goUserInfo.av,ej);
},
reset:function()
{
if(getTop().goUserInfo.dN=='loading')
{
return;
}
getTop().goUserInfo.dN='loading';

var aS=T(["/cgi-bin/getcomposedata?t=signature&fun=compose&sid=$sid$&qzonesign=$qzonesign$&r=$rand$"])
.replace({
sid:getSid(),
qzonesign:"",
rand:now()
});
QMAjax.send(aS,
{
method:"GET",
timeout:10000,
headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},
onload:function(ba,bK)
{
var gT=trim2(bK);

if(ba&&gT.indexOf("(")==0)
{
getTop().goUserInfo.dN='ready';
getTop().goUserInfo.set(
(function(){
return(new Function("return "+gT))();
})()
);
bindAccount();
}
else
{
getTop().goUserInfo.dN='init';
}
getTop().goUserInfo.dNj();
}
});
}
};
}






function setDefaultSender(pJ)
{

getTop().goUserInfo.set({"DEF_MAIL_FROM":pJ});

}

function getMailZoomTool()
{
return getTop().goUserInfo.get("DEF_MAILZOOMTOOL")=="1";
}

function setMailZoomTool(Wo)
{
getTop().goUserInfo.set({"DEF_MAILZOOMTOOL":Wo?"1":"0"});
}





function closeRecognizeNickName()
{
ossLog("realtime","all","stat=tips&type=know&tipid=66");
getTop().goUserInfo.set({"DEF_RECOGNIZENICKNAME":false});
}






function getUserInfoText(aw)
{
var dL=S("user"+aw,getTopWin())||{};
return fixNonBreakSpace(dL.innerText||dL.textContent);
}






function getUserInfo(aw)
{
return(S("user"+aw,getTopWin())||{}).innerHTML||"";
}







function setUserInfo(aw,bJ)
{
try
{
S("user"+aw,getTopWin()).innerHTML=htmlEncode(bJ);
return true;
}
catch(bf)
{
return false;
}
}










function msgBox(_asMsg,ZJ,apk,FA,
bcT,ao)
{
if(window!=getTop())
{
return getTop().msgBox(_asMsg,ZJ,apk,FA,
bcT,ao);
}

var fb=_asMsg;

if(!fb)
{
var Wt=S("msg_txt",ao||window)
||S("msg_txt",getActionWin());

if(Wt&&(Wt.innerText||Wt.textContent)
&&Wt.getAttribute("ok")!="true")
{
fb=filteScript(Wt.innerHTML);
Wt.setAttribute("ok","true");
}
}

if(!fb||!(fb=trim(fb.replace(/[\r\n]/ig,""))))
{
return;
}

hiddenMsg();

if(ZJ=="dialog")
{
alertBox(
{
msg:fb,
title:bcT||"\u786E\u8BA4"
}
);
}
else
{
setClass(arguments.callee.createMessageBox().firstChild,
ZJ=="success"?"msg":"errmsg").innerHTML=fb;

showMsg();

if(apk)
{
getTop().gMsgBoxTimer=getTop().setInterval(getTop().hiddenMsg,FA||5000);
}

getTop().gMsgDispTime=now();
}
};




msgBox.createMessageBox=function(Iu)
{
var VM=S("msgBoxDIV",getTop());
if(!VM)
{

var bY=typeof Iu=="undefined"?(getTop().bnewwin?0:43):Iu;
insertHTML(
getTop().document.body,
"afterBegin",
T([
'<div id="msgBoxDIV" style="position:absolute;width:100%;display:none;',
'padding-top:2px;height:24px;*height:24px;_height:20px;top:$top$px;text-align:center;">',
'<span></span>',
'</div>'
]).replace({
top:bY
})
);
VM=S("msgBoxDIV",getTop());
}
return VM;
};





function isshowMsg()
{
return getTop().isShow("msgBoxDIV");
}




function hiddenMsg()
{
if(getTop().gMsgBoxTimer)
{
getTop().clearInterval(getTop().gMsgBoxTimer);
getTop().gMsgBoxTimer=null;
}
getTop().show("msgBoxDIV",false);
getTop().showProcess(0);
}






function displayGrayTip(_aoDom,fY)
{
var cQ=_aoDom.style;

cQ.visibility=!fY?"hidden":"";
cQ.height=!fY?"0":"";
}




function showMsg()
{
getTop().show("msgBoxDIV",true);
}







function showError(hR,FA,cOr)
{
msgBox(hR,"",FA!=-1,FA||5000);
var VM=S("msgBoxDIV",getTop());
if(VM&&cOr)
{
var ank=[];
E(GelTags("script",VM),function(aQZ)
{
ank.push(aQZ.innerHTML);
}
);
globalEval(ank.join(";"),getTop());
}
}






function showInfo(cce,FA)
{
msgBox(cce,"success",FA!=-1,FA||5000);
}











function showProcess(vy,bPQ,aCp,bjX,bYK)
{
var aV="load_process",
bcF=arguments.callee.bpj(aV);

if(vy==0)
{
return show(bcF,false);
}

hiddenMsg();
show(bcF,true);

var WT=vy==2;

if(WT)
{
var gC=parseInt(aCp);

if(isNaN(gC))
{
gC=0;
}
else
{
gC=Math.max(0,Math.min(100,gC));
}
if(bjX)
{
S(aV+"_plan_info",getTop()).innerHTML=bjX+(gC?":":"");
}

S(aV+"_plan_rate",getTop()).innerHTML=
S(aV+"_plan_bar",getTop()).style.width=[gC,"%"].join("");
}
else
{
if(aCp)
{
S(aV+"_info",getTop()).innerHTML=aCp;
}
}

show(S(aV+"_plan",getTop()),WT);
show(S(aV+"_img",getTop()),WT?false:bPQ);
show(S(aV+"_plan_info",getTop()),WT);
show(S(aV+"_plan_rate",getTop()),WT&&gC);
show(S(aV+"_info",getTop()),!WT);
show(S(aV+"_cancel",getTop()),bYK!=false);
}






showProcess.bpj=function(aL)
{
var aBU=S(aL,getTop());
if(!aBU)
{
insertHTML(
getTop().document.body,
"afterBegin",
T([
'<table id="$id$" cellspacing=0 cellpadding=0 border=0 ',
'style="position:absolute;top:$top$px;left:0;width:100%;display:none;z-index:9999;">',
'<tr><td align="center">',
'<table cellspacing=0 cellpadding=0 border=0 class="autosave autosave_txt" style="height:20px;"><tr>',
'<td style="width:2px;"></td>',
'<td id="$id$_img" style="padding:0 0 0 5px;">',
'<img src="$image_path$ico_loading104474.gif" style="width:16px;height:16px;vertical-align:middle;">',
'</td>',
'<td id="$id$_plan" valign=center style="padding:0 0 0 5px;">',
'<div style="font:1px;border:1px solid white;width:104px;text-align:left;">',
'<div id="$id$_plan_bar" style="font:1px;background:#fff;height:8px;margin:1px 0;width:50%;"></div>',
'</div>',
'</td>',
'<td id="$id$_plan_info" style="padding:0 0 0 5px;"></td>',
'<td id="$id$_plan_rate" style="width:40px;text-align:right;padding:0;"></td>',
'<td id="$id$_info" style="padding:0 0 0 5px;"></td>',
'<td id="$id$_cancel" style="padding:0 0 0 5px;">',
'[<a onclick="getTop().cancelDoSend();" nocheck="true" style="color:white;">\u53D6\u6D88</a>]',
'</td>',
'<td style="padding:0 0 0 5px;"></td>',
'<td style="width:2px;"></td>',
'</tr></table>',
'</td></tr>',
'</table>'
]).replace(
{
id:aL,
top:getTop().bnewwin?0:45,
image_path:getPath("image",true)
}
)
);
aBU=S(aL,getTop());
}
return aBU;
};





function getProcessInfo()
{
var aV="load_process",
od=getTop();

if(isShow(S(aV,od)))
{
var aWg=S(aV+"_plan_rate",od),
aGG=S(aV+"_info",od);

if(aGG&&isShow(aGG))
{
return aGG.innerHTML;
}

if(aWg&&isShow(S(aV+"_plan",od)))
{
return parseInt(aWg.innerHTML);
}
}
return"";
}






function replaceCss(ao,xP)
{
replaceCssFile(
"skin",
[getPath("style"),getFullResSuffix(["skin",
typeof xP=="undefined"?getPath("skin"):xP,".css"].join(""))
].join(""),
(ao||window).document
);
}






function bah(xP,atk)
{
var _oTop=getTop();

return!atk&&_oTop.gLogoUrl?_oTop.gLogoUrl.replace(/(.*)_[^_]+_([^_]+)/,"$1_"+xP+"_$2")
:TE([
'$images_path$logo',
'$@$if($bFoxmail$)$@$',
'_foxmail',
'$@$else$@$',
'$sSubfolder$',
'$@$endif$@$',
'/logo_$nSkinId$_',
'$@$if($bFoxmail$)$@$',
'0',
'$@$else$@$',
'$sLogoid$',
'$@$endif$@$.gif'
]).replace(
{
images_path:getPath("image"),
bFoxmail:atk,
sSubfolder:_oTop.gsLogoFolder,
nSkinId:xP,
sLogoid:(_oTop.gsLogoFolder||xP==0)?(_oTop.gLogoId||0):0
}
);
}








function doRealChangeStyle(bPA,xP,atk,wb,bUI)
{
var _oTop=getTop(),
Ml=_oTop.gTempSkinId=xP,
cF=getMainWin(),
aIi=[_oTop,cF],
bTs=bUI||false,
ado=S("imglogo",_oTop);

if(ado)
{

if(typeof wb=="undefined"||wb=="")
{
ado.style.backgroundImage="";
if(xP<10000000&&_oTop.gLogoUrl)
{

ado.style.backgroundImage="url("+bah(Ml,atk)+")";
ado.src="/zh_CN/htmledition/images/spacer.gif";












}
}
else
{
ado.style.backgroundImage="url("+wb+")";
}
ado.className=bTs?"domainmaillogo":"maillogo";
}







E(_oTop.goDialogList,function(le,vP)
{
aIi.push(F(vP,getTop()));
});

E(GelTags("iframe",cF.document),function(le)
{
aIi.push(le.contentWindow);
});

E(aIi,function(ao)
{
replaceCss(ao,Ml);
});

removeSelf(bPA);

setTimeout(resizeFolderList);

rdVer("BaseVer",1);
}






function changeStyle(xP,wb)
{
var ara=false,
aou=false;


var asx=getTop().getGlobalVarValue("DOMAIN_MAIL_LOGO_URL")||{},
QS=getTop().goUserInfo.get("DEF_MAIL_FROM")||'';
if(wb)
{
aou=wb.indexOf("/cgi-bin/viewfile")>=0;
if(aou)
{
asx[QS]=wb;
QS&&setGlobalVarValue("DOMAIN_MAIL_LOGO_URL",asx);
}
}
else if(QS&&asx[QS])
{

wb=asx[QS];
aou=wb&&wb.indexOf("/cgi-bin/viewfile")>=0;
}

var Ml=typeof xP=="undefined"||xP==""?getTop().skin_path:xP,
bLR=getTop().gsLogoFolder,
bZZ=ara?0:(bLR||Ml==0?(getTop().gLogoId||0):0),
bSy=ara?"_foxmail":"",
aZa=getTop().changeStyle,
bWc=aZa.aHk,
aHk=aZa.aHk=["skinCssCache",Ml,
bSy,wb||bZZ].join("_");


if(aHk!=bWc)
{
cacheByIframe([
["css",getPath("style"),"skin"+Ml+".css"],
!!wb?["img","",wb]

:["img",bah(Ml,ara)]
],
{
onload:function()
{
doRealChangeStyle(this,Ml,ara,wb,aou);
}
}
);
}
}




function osslogCompose(gU,aEA,aJ,aDB,aEr)
{
getTop().ossLog("delay","all",T([
'stat=compose_send',
'&t=$time$&actionId=$actionId$&mailid=$mailid$',
'&isActivex=$isActivex$&failCode=$failCode$',
'&$other$'
]).replace({
time:gU,
actionId:aEA,
mailId:aJ,
failCode:aDB,
other:["&cgitm=",getTop().g_cgiTimeStamp||-1,"&clitm=",getTop().g_clientTimeStamp||-1,"&comtm=",aEr&&aEr.valueOf?aEr.valueOf():-1].join('')
}));
}

function osslogAjaxCompose(yx,CS,ln,aw)
{
var _oTop=getTop(),
bMI=["IE","FF","Safari","Chrome","Opera","QBIE","TT","NS"],
LC="gbIs",
cFz="Other";
for(var i=0;i<bMI.length;i++)
{
if(_oTop[LC+bMI[i]])
{
cFz=bMI[i];
break;
}
}
ossLog("delay","all",T([
'stat=compose_ajax_send',
'&server=$server$&browser=$browser$',
'&status=$status$&code=$code$&section=$section$&sendtype=$type$&ran=$ran$',
]).replace(
{
ran:now(),
server:getCookie("ssl_edition")||location.host,
browser:cFz,

status:yx,
code:CS,
section:ln,
type:aw
}
));
}








function recodeComposeStatus(aEA,aJ,aDB,bTC)
{
var eY=0,
aeY=getTop().gSendTimeStart;

if(!aeY||!aeY.valueOf)
{
if(!bTC)
{
return;
}
}
else
{
eY=now()-aeY.valueOf();
getTop().gSendTimeStart=null;
}



osslogCompose(eY,aEA,aJ,aDB,aeY);













getTop().isUseActiveXCompose=false;
}




function errorProcess(XQ)
{

if(typeof getMainWin().ErrorCallBack=="function")
{
getMainWin().ErrorCallBack(XQ);

}
else if(typeof getTop().ErrorCallBack=="function")
{
getTop().ErrorCallBack(XQ);
}
}







function doPostFinishCheck(aL,ao,bwx)
{
if(aL)
{
var wW="",
aiq=false,
Fu=S(aL,ao),
aqe=F(aL,ao),
byF=-1;
try
{
byF=0;
if(!Fu
||Fu.getAttribute("deleted")=="true")
{
return;
}

byF=1;
var cA=aqe.document.body,
aiq=!cA.className&&!cA.style.cssText;

byF=2;
if(aiq)
{
var Cv=aqe.document.documentElement;
wW=(Cv.textContent
||Cv.innerText||"").substr(0,30);
}




}
catch(bf)
{
doPageError([aL,bf.message].join(":"),aqe&&aqe.location&&aqe.location.href||aL,byF);
aiq=bf.message||"exception";
}

QMHistory.recordActionFrameChange();

if(aiq)
{
callBack.call(Fu,bwx,[wW]);












errorProcess();
}
}
}




function actionFinishCheck()
{
doPostFinishCheck("actionFrame",getTop(),function(responseContent)
{
showError(gsMsgLinkErr);
}
);
}




function doSendFinishCheck()
{
doPostFinishCheck("sendmailFrame",getTop(),function(ajH)
{
recodeComposeStatus(2,null,ajH||0);
msgBox(T(['\u7531\u4E8E\u7F51\u7EDC\u539F\u56E0\uFF0C\u90AE\u4EF6\u53D1\u9001\u5931\u8D25\uFF01'
,'[<a href="/cgi-bin/switch2service?sid=$sid$&errcode=-1&time=$time$&cginame=sendmail&t=error_report">\u53D1\u9001\u9519\u8BEF\u62A5\u544A</a>]']).replace(
{
time:formatDate(new Date(),"$YY$$MM$$DD$$hh$$mm$$ss$")
}
),"dialog",true,0,"\u5931\u8D25\u4FE1\u606F");
}
);
}






function submitToActionFrm(mO)
{
try
{
mO.submit();
return true;
}
catch(bf)
{
showError(mO.message);
return false;
}
}









function afterAutoSave(vk,aJ,_asMsg,btS)
{

var lz=0,
wB,auX;

try
{
var cF=getTop().getMainWin();

function arz()
{
if(disableAll)
{
disableAll(false);
}
}

lz=1;

if(aJ==""||!aJ)
{
return arz();
}

lz=2;

if(!cF||!S("fmailid",cF))
{
return arz();
}

lz=3;
auX=S("fmailid",cF).value;

if(auX!=aJ)
{
S("fmailid",cF).value=aJ;
getTop().setTimeout(
function()
{
reloadLeftWin()
},
0
);
}

lz=4;

var _oFiles=vk.split(" |"),
MQ=[],
axi=cF.QMAttach.getExistList();

for(var i=0,_nLen=axi.length;i<_nLen;i++)
{
var acl=S("Uploader"+axi[i],cF);
if(acl&&!acl.disabled&&acl.value!="")
{
MQ.push(acl);
}
}

lz=5;

var bvl=MQ.length;
for(var i=0,_nLen=_oFiles.length-1;i<_nLen;i++)
{
var CY=false;
for(var j=0;j<=i&&j<bvl;j++)
{
if(!MQ[j].disabled
&&MQ[j].value.indexOf(_oFiles[i])!=-1)
{
MQ[j].disabled=true;
CY=true;
try
{
if(gbIsIE||gbIsWebKit)
{
MQ[j].parentNode.childNodes[1].innerText=_oFiles[i];
}
}
catch(bf)
{
}
}
}
if(!CY)
{
var aQ=_oFiles[i]+" |",
dR=vk.indexOf(aQ);

if(dR!=-1)
{
vk=vk.substr(0,dR)
+vk.substr(dR+aQ.length,
vk.length-dR-aQ.length
);
}
}
}

lz=6;

cF.loadValue();

lz=7;

if(vk&&S("fattachlist",cF))
{
S("fattachlist",cF).value+=vk;
}

lz=8;







lz=9;

showInfo(_asMsg
||(formatDate(new Date,"$hh$:$mm$")+" "+getTop().gsMsgSendErrorSaveOK));

lz=10;
var eE=getTop().QMDialog("composeExitAlert");
var ih=eE&&eE.S("btn_exit_notsave");
if(ih&&ih.isShow())
{
return fireMouseEvent(ih,"click");
}

lz=11;

if(!btS)
{
arz();
}

lz=12;

cF.enableAutoSave();
}
catch(bf)
{
wB=bf.message;
debug(["afterAutoSave:",bf.message,"eid:",lz]);
}









}




function cancelDoSend()
{
var cF=getMainWin(),
UT=cF.QMAttach;

if(UT&&UT.onfinish)
{
UT.onprogress=null;
UT.onfinish=null;
}
else
{
var aoS=S("sendmailFrame",getTop());
if(aoS)
{
aoS.setAttribute("deleted","true");
removeSelf(aoS);
}
}

recodeComposeStatus(3,null,0);
showProcess(0);
errorProcess();
}







function quickDoSend(ta,bJ,_asMsg)
{
var aIB=false;

if(_asMsg!="nomsg")
{
showProcess(1,0,[
"<img src='",getPath("image"),"newicon/a_send.gif' width='14px' height='14px' align='absmiddle'>&nbsp;",
(_asMsg||gsMsgSend)].join(""),null,true);
}

disableSendBtn(true);
disableSource(true);

createBlankIframe(getTop(),
{
id:"sendmailFrame",
onload:function(ao)
{
if(aIB)
{
doSendFinishCheck(this);
}
else
{
aIB=true;

try
{
ta.content.value=bJ;
ta.target="sendmailFrame";
ta.submit();
}
catch(bf)
{
showError("\u53D1\u9001\u5931\u8D25\uFF1A"+bf.message);
disableSendBtn(false);
disableSource(false);
}
}
}
}
);
}






function disableSendBtn(ut,ao)
{
disableCtl("sendbtn",ut,ao||getMainWin());
}





function disableSaveBtn(ut,ao)
{
disableCtl("savebtn",ut,ao||getMainWin());
}





function disableTimeSendBtn(ut,ao)
{
disableCtl("timeSendbtn",ut,ao||getMainWin());
}





function disableSource(ut)
{
disableCtl("source",ut,getMainWin());
}




function disableAll(ut,ao)
{
var cF=ao||getMainWin();
if(cF.disableAll&&cF.disableAll!=arguments.callee)
{
return cF.disableAll(ut);
}

disableSendBtn(ut,ao);
disableSaveBtn(ut,ao);
disableTimeSendBtn(ut,ao);

var eE=getTop().QMDialog("composeExitAlert"),
bbx=eE&&eE.S("btn_exit_save");
if(bbx)
{
bbx.disabled=ut;
}
}






function verifyCode(aw,Tg)
{
if(window!=getTop())
{
return getTop().verifyCode(cnK);
}

var BP=arguments.callee,

cdb=BP.ceV;


setVerifyCallBack();
loadingBox(
{
model:"\u9A8C\u8BC1\u7801",
js:"$js_path$qmverify111fe0.js",
oncheck:function()
{
return window.QMVerifyBox;
},
onload:function()
{
QMVerifyBox.open(
{
sType:aw,
sVerifyKey:Tg,
onok:cdb
}
);
}
}
);
}
























function openComposeDlg(Kp,aj,bbj)
{
!(typeof QMAddress!="undefined"&&QMAddress.isInit())&&initAddress();



loadJsFileToTop(["$js_path$com/kits/qmeditor/js/editor11b888.js"]);
loadingBox(
{
model:"\u53D1\u4FE1",
js:["$js_path$libcompose111fe0.js","$js_path$qmaddrinput111fe0.js"],
oncheck:function()
{
return window.ComposeLib&&window.QMAddrInput&&window.QMEditor&&(!bbj||bbj());
},
onload:function()
{
ComposeLib.openDlg(Kp,aj);
}
}
);
}










function setVerifyCallBack(bD)
{
getTop().verifyCode.ceV=bD;
}







function emptyFolder(cjh,bLp,aMb)
{
confirmBox({
title:"\u6E05\u7A7A\u6587\u4EF6\u5939",
msg:T([
'<div class="dialog_f_t">\u662F\u5426\u8981\u6E05\u7A7A$name$\uFF1F</div>',
'<div class="dialog_f_d">\u6E05\u7A7A\u540E\u90AE\u4EF6\u5C06\u65E0\u6CD5\u6062\u590D\u3002</div>'
]).replace({
name:(aMb?"\u6B64\u6587\u4EF6\u5939":aMb+"\u4E2D\u7684\u90AE\u4EF6")

}),
confirmBtnTxt:'\u662F',
cancelBtnTxt:'\u5426',
onreturn:function(ba)
{
ba&&bLp();
}
});




}








function renameFolder(eD,aw,ao,bAy)
{
promptFolder({
defaultValue:bAy||'',
type:"rename"+(aw||'folder'),
onreturn:function(jB){
var gq=S("frm",ao);
if(aw=='tag')
{
gq.fun.value="renametag";
gq.tagname.value=jB;
gq.tagid.value=eD;
}
else
{
gq.fun.value="rename";
gq.name.value=jB;
gq.folderid.value=eD;
}
submitToActionFrm(gq);
}
});
return false;
}











function promptFolder(aj)
{
var aT={
shortcutgroup:{title:'\u65B0\u5EFA\u8054\u7CFB\u4EBA\u5206\u7EC4',msg:'\u8BF7\u586B\u5199\u8054\u7CFB\u4EBA\u5206\u7EC4\u540D\u79F0',name:'\u8054\u7CFB\u4EBA\u5206\u7EC4',maxascii:32,description:"\u5199\u4FE1\u65F6\uFF0C\u53EA\u9700\u8981\u8F93\u5165\u8FD9\u4E2A\u7FA4\u7EC4\u540D(\u6C49\u5B57\u9700\u8F93\u5165\u62FC\u97F3)\uFF0C\u5C31\u53EF\u4EE5\u5FEB\u6377\u7FA4\u53D1\u4E86\u3002"},
folder:{title:'\u65B0\u5EFA\u6587\u4EF6\u5939',msg:'\u8BF7\u60A8\u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0',name:'\u6587\u4EF6\u5939',maxascii:80},
tag:{title:'\u65B0\u5EFA\u6807\u7B7E',msg:'\u8BF7\u60A8\u8F93\u5165\u6807\u7B7E\u540D\u79F0',name:'\u6807\u7B7E',maxascii:50},
renamefolder:{title:'\u91CD\u547D\u540D\u6587\u4EF6\u5939',msg:'\u8BF7\u60A8\u8F93\u5165\u65B0\u7684\u6587\u4EF6\u5939\u540D\u79F0',name:'\u6587\u4EF6\u5939',maxascii:80},
renametag:{title:'\u91CD\u547D\u540D\u6807\u7B7E',msg:'\u8BF7\u60A8\u8F93\u5165\u65B0\u7684\u6807\u7B7E\u540D\u79F0',name:'\u6807\u7B7E',maxascii:50}
}[aj.type];
aT.defaultValue=aj.defaultValue;

aj.width&&(aT.width=aj.width);
aj.height&&(aT.height=aj.height);
aj.bAlignCenter&&(aT.bAlignCenter=aj.bAlignCenter);
aj.onclose&&(aT.onclose=aj.onclose);
aj.style&&(aT.style=aj.style);

aT.onreturn=function(ba,fE){
if(!ba)
{
return;
}

var _nLen=getAsiiStrLen(trim(fE));
if(_nLen==0||_nLen>aT.maxascii)
{
return showError(TE(_nLen?"$name$\u540D\u79F0\u592A\u957F\uFF0C\u8BF7\u4F7F\u7528\u5C11\u4E8E$maxascii$\u4E2A\u5B57\u7B26($@$eval $maxascii$/2$@$\u4E2A\u6C49\u5B57)\u7684\u540D\u79F0":'$name$\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A').replace(aT));
}
if(/[~!#\$%\^&\*\(\)=\+|\\\[\]\{\};\':\",\?\/<>]/.test(fE))
{
return showError(aT.name+'\u540D\u79F0\u4E0D\u80FD\u5305\u542B ~!#$%^&*()=+|\\[]{};\':",?/<> \u7B49\u5B57\u7B26');
}

aj.onreturn(fE);
};
promptBox(aT);
}


function bjK(eD,aaL,aqK,da)
{
if(eD)
{
var aFh=S(eD+"_td",aaL);
if(aFh)
{
setClass(aFh,aqK);
return aFh;
}
else
{

var aEV=S(eD,aaL);
if(aEV)
{
var aZk=da=="over";
if(aZk)
{
showFolders(aEV.name,true);
}
var cfr=S(eD,aaL).parentNode;
setClass(cfr,aZk?"fn_list":"");
return aEV;
}
}
}
}











function switchFolderComm(aL,ao,awG,jn,caI,
bVg,aVU)
{
var aDw=S(awG,ao),
kd=aL;

if(kd)
{
aVU.bPu=kd;
}
else
{
kd=aVU.bPu;
}

if(aDw)
{
var aWj="SwiTchFoLdErComM_gLoBaldATa",
bkr=ao[aWj],
aeH;

if(bkr!=kd)
{
bjK(bkr,ao,bVg,"none");
}

if(aeH=
bjK(ao[aWj]=kd,ao,caI,"over"))
{

E("new|personal|pop|tag".split("|"),function(bka)
{
var Ya=S(bka+"folders",ao);
Ya&&isObjContainTarget(Ya,aeH)
&&showFolders(bka,true);
}
);

if(getStyle(aDw,"overflow")!="hidden")
{

scrollIntoMidView(aeH,aDw);
}
else
{

var Ya=S("ScrollFolder",ao);
Ya&&isObjContainTarget(Ya,aeH)
&&scrollIntoMidView(aeH,Ya);
}
}
}
}






function switchFolder(aL,ao)
{
getTop().switchFolderComm(aL,ao||getLeftWin(),"folder","li","fn","fs",
getTop().switchFolder
);
}







function switchRightFolder(aL,bUz,awG)
{
getTop().switchFolderComm(aL,bUz||F("rightFolderList",getMainWin()),
awG||"folder_new","div","toolbg","",getTop().switchRightFolder
);
}






function isShowFolders(aL,ao)
{
var ux=S("icon_"+aL,ao||getTop());
return!!(ux&&ux.className=="fd_off");
}





function showFolders(aL,nz,ao)
{
var ay=ao||getTop(),
_oContainer=S(aL+"folders",ay),
ux=S("icon_"+aL,ay);

if(_oContainer&&ux)
{
var jJ=S(aL+"folders",ay),
chm=GelTags("li",jJ).length;

var ha=!isShowFolders(aL,ay);
if(chm&&(typeof nz!="boolean"||ha==nz))
{
setClass(ux,ha?"fd_off":"fd_on");

if(!ao)
{
var _oTop=getTop(),
biA="fOlDErsaNimaTion"+aL,
oc=_oTop[biA];

if(!oc)
{
oc=_oTop[biA]=new _oTop.qmAnimation(
{
from:1,
to:100
}
);
}

oc.stop();

if(ha)
{
_oContainer.style.height="1px";
show(_oContainer,true);
}
else
{
_oContainer.style.height="auto";
}

var rp=_oContainer.scrollHeight;
oc.play(
{
speed:rp,
onaction:function(cg,iN)
{
S(aL+"folders",_oTop).style.height=
(Math.floor((ha?iN:1-iN)*rp)
||1)+"px";
},
oncomplete:function(cg,anT)
{
var ej=S(aL+"folders",_oTop);
if(ha)
{
ej.style.height="auto";
}
else
{
show(ej,false);
}
}
}
);
}
else
{
show(_oContainer,ha);
}

callBack(getTop().iPadResizeFolder);
}
}
}

function decreaseFolderUnread(pJ,Cw,ao)
{
var mj,SA=pJ.split(';');
for(var i=SA.length-1;i>=0;i--)
{
if(mj=KT(0,SA[i]))
{
KT(1,SA[i],mj-1,Cw,ao);
}
}
}







function getFolderUnread(eD)
{
return KT(0,eD);
}









function setFolderUnread(eD,cg,Cw,ao)
{

return KT(1,eD,cg||0,Cw,ao);
}






function getGroupUnread(Ss)
{
return KT(0,Ss,null,null,getMainWin());
}








function setGroupUnread(Ss,cg,Cw)
{
return KT(1,Ss,cg||0,Cw,getMainWin());
}









function setTagUnread(eD,cg,Cw,ao)
{
return KT(1,eD,cg||0,Cw,ao,true);
}











function KT(eB,eD,cg,Cw,ao,cfT)
{
var Cm=S(
[
"folder_",


(new String(eD)).toString().split("folder_").pop()
].join(""),
ao||getLeftWin()
);
if(!Cm)
{
return 0;
}

var fT=Cm.getAttribute("etitle"),
aJk=GelTags("div",Cm),
aQ=Cm.name;
if(aJk.length)
{
Cm=aJk[0];
}

var ik=typeof(cg)=="number"&&cg>0?cg:0,
adX=Cm.innerText||Cm.textContent||"",
aqW=adX.lastIndexOf("("),
aGN=aqW==-1?0
:parseInt(adX.substring(aqW+1,adX.lastIndexOf(")")));

if(eB==0)
{
return aGN;
}

if(aGN==ik)
{
return 1;
}

var aSH=ik==0,
bT={
info:htmlEncode(aqW!=-1?adX.substring(0,aqW):adX),
title:fT,
unread:ik
};

Cm.title=T('$title$'+(Cw||aSH?'':'  \u672A\u8BFB\u90AE\u4EF6 $unread$ \u5C01')).replace(bT);




Cm=setHTML(Cm,T(aSH&&'$info$'
||(Cw?'$info$($unread$)':'<b>$info$</b><b>($unread$)</b>')
).replace(bT)+(bT.info=='\u661F\u6807\u90AE\u4EF6'?'<input type="button" class="ico_input icon_folderlist_star"/>':'')+(bT.info=='\u6F02\u6D41\u74F6'?'<input class="ico_input drifticon" type="button" hidefocus />':'')
);
Cm.setAttribute("initlized","");


var cUJ=S(
"folder_"+(new String(eD)).toString().split("folder_").pop()+"_ns",
ao||getLeftWin()
);
cUJ&&setHTML(cUJ,T(aSH?'$info$':'<b>$info$</b>').replace(bT));

if(aQ&&!cfT)
{
var aGg=S("folder_"+aQ,getTop());
if(aGg)
{
try
{
KT(eB,eD,ik,Cw,getMainWin());
}
catch(bf)
{
doPageError(bf.message,"all.js","_optFolderUnread");
}

return setFolderUnread(aGg.id,
getFolderUnread(aGg.id)-aGN+ik);
}
}

return 1;
}







function doFolderEmpty(eD,ta,py)
{
ta.folderid.value=eD;
ta.rk.value=Math.random();

if(ta.loc)
{
ta.loc.value=py;
}

submitToActionFrm(ta);
}

function handleSubFolder(eD)
{
var bNJ="icon_subfolder_fold",
aTg=S("icon_subfolder_"+eD),
ha=!hasClass(aTg,bNJ);
if(aTg)
{
ha?
addClass(aTg,bNJ):
rmClass(aTg,bNJ);
show("folder_sysmsg_td",ha);
show("folder_notsysmsg_td",ha);
show("folder_sysmsg_line",ha);
show("folder_"+eD+"_ns",ha);
show("folder_"+eD,!ha);

QMAjax.send(T("/cgi-bin/setting4?sid=$sid$&openclassify=$openclassify$&fun=submit&loc=switchfolder,,,$loc$").replace(
{
openclassify:ha?0:1,
sid:getSid(),
loc:ha?"open":"close"
}
)
);
}
}








function selectAll(Jt,dB)
{
E(GelTags("input",S('list',dB)),function(hU)
{
hU.checked=Jt;
}
);
getTop().showSelectALL(dB,Jt);
}





function selectReadMail(Jt,dB)
{
E(GelTags("input",S('list',dB)),function(hU)
{
if(hU.title!="\u9009\u4E2D/\u53D6\u6D88\u9009\u4E2D")
{
hU.checked=hU.getAttribute('unread')!=Jt;
}
}
);
}





function checkAddrSelected(dB)
{
var iA=GelTags("input",S('list',dB)),
_nLen=iA.length,
bI;

for(var i=0;i<_nLen;i++)
{
bI=iA[i];
if(bI.type=="checkbox"&&bI.checked)
{
return true;
}
}

return false;
}






function checkBoxCount(axV,dB)
{
var fR=0;

E(GelTags("INPUT",S("list",dB)),function(ka)
{
if(ka.type=="checkbox"
&&ka.name==axV
&&ka.checked)
{
fR++;
}
}
);

return fR;
}




function PGV()
{
}






function checkCheckBoxs(aD,ta)
{
var gq=ta||S("frm",getMainWin()),
iA=GelTags("input",gq),
nb;

for(var i=0,_nLen=iA.length;i<_nLen;i++)
{
nb=iA[i];

if(nb.type=="checkbox"
&&nb.name==aD
&&nb.checked)
{
return true;
}
}

return false;
}






function setListCheck(ka,Rq)
{
if(ka.type!="checkbox")
{
return;
}

if(Rq==null)
{
Rq=ka.checked;
}
else
{
ka.checked=Rq;
}

var dL=ka.parentNode.parentNode;

if(dL.tagName=="TR")
{
dL=dL.parentNode.parentNode;
}


if(dL==S("frm",getMainWin()))
{
return;
}

var aea=dL.className;
if(aea=="B")
{
aea=Rq?"B":"";
}
else
{
aea=strReplace(aea," B","")
+(Rq?" B":"");
}

setClass(dL,aea);

if(Rq)
{
listMouseOut.call(dL);
}
}







function doCheck(_aoEvent,adU,cdz,cbs)
{
var bN=_aoEvent||window.event,
ee=adU||bN.srcElement||bN.target,
cF=cbs||getMainWin();

if(!ee||!cF)
{
return;
}

if(ee.className=="one"||ee.className=="all")
{
CA(ee);
}
setListCheck(ee);

if((bN&&bN.shiftKey||cdz)
&&cF.gCurSelObj
&&cF.gCurSelObj!=ee
&&ee.checked==cF.gCurSelObj.checked)
{
var iA=getTop().GelTags("input",cF.document),
fR=0,
_nLen=iA.length,
nb;

for(var i=0;i<_nLen;i++)
{
nb=iA[i];

if(nb.type!="checkbox")
{
continue;
}

if((nb==cF.gCurSelObj
||nb==ee)&&fR++==1)
{
break;
}

if(fR==1)
{
setListCheck(nb,ee.checked);
}
}
}
cF.gCurSelObj=ee;

getTop().showSelectALL(cF,false)
}






function checkAll(axV,dB)
{
E(GelTags("input",dB),function(bw)
{
if(bw.name==axV)
{
setListCheck(bw);
}
}
);
}







function fakeReadmail(aj)
{
QMAjax.send(
T('/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&t=readsubmail&mode=fake&base=$base$&pf=$pf$').replace({
sid:getSid(),
mailid:aj.sMailId,
pf:rdVer.isPre(aj.sFolderId)?1:0,
base:rdVer("BaseVer",0)
}),
{
method:"GET",
headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},
onload:function(ba,bK)
{
var gT=trim2(bK);
if(ba&&gT.indexOf("(")==0)
{
var gb=evalValue(gT);
if(gb)
{
folderOpt(extend(aj,gb));
callBack(getMainWin().updatePreAndNext,[aj]);
}
}
else
{
var EV=getActionWin().document;
EV.open();
EV.write(mE.responseText);
}
}
}
);
}













function folderOpt(aj)
{
if(!aj)
{
return;
}

var _oTop=getTop();
_oTop.recordCompareReadedMailId(aj.sMailId);
if(aj.bNewMail)
{
var kd=aj.sFolderId,
ekO;





if(kd>0)
{
try{
_oTop.setFolderUnread(kd,_oTop.getFolderUnread(kd)-1);
if(aj.bStar)
{
_oTop.setFolderUnread("starred",_oTop.getFolderUnread("starred")-1);
}


if(aj.oSysTag&&/system:1\|/.test(aj.oSysTag))
{
setFolderUnread("sysmsg",getFolderUnread("sysmsg")-1);
}
if(aj.oSysTag&&/system:0\|/.test(aj.oSysTag))
{
setFolderUnread("notsysmsg",getFolderUnread("notsysmsg")-1);
}










var wc=aj.oMatchTag||[],
i=wc.length-1;
i>=0&&setTagUnread('tag',getFolderUnread('tag')-1);
for(;i>=0;i--)
{
var gX='tag_'+wc[i];
debug(['getFolderUnread',gX,getFolderUnread(gX)]);
setTagUnread(gX,getFolderUnread(gX)-1);
}

}catch(e){}
}




}
}






function recordReadedMailId(aJ)
{
getTop().gsReadedMailId=aJ;
}



function recordMailListScroll()
{
getTop().gnMailListPos=bodyScroll(getTop().getMainWin(),"scrollTop");
}





function recordCompareReadedMailId(aJ)
{
if(aJ&&getTop().gsReadedMailId!=aJ)
{
getTop().gsReadedMailId=aJ;
}

QMMailCache.addData(aJ,{bUnread:null});
}






function SG(afA,bXv)
{
var cT=afA.className,
ha=!/\bsts\b/i.test(cT);



var	bI=GelTags("input",afA.parentNode)[0],
aZc=bI&&bI.className,
agk=(bXv
?afA.parentNode.parentNode.parentNode
:afA.parentNode).nextSibling;

if(aZc=="one"||aZc=="all")
{
setClass(bI,ha?"one":"all");
}

setClass(afA,
ha?cT.replace(/\bhts\b/i,"sts"):cT.replace(/\bsts\b/i,"hts"));


if(agk.className!="toarea")
{
agk=agk.nextSibling;
}

if(agk.className!="toarea")
{
return;
}

return show(agk,ha);
}





function CA(ZO)
{
if(ZO)
{
var zh=(ZO.className=="all"
?ZO.parentNode.parentNode.parentNode.parentNode
:ZO.parentNode).nextSibling;

if(zh.className!="toarea")
{
zh=zh.nextSibling;
}

if(zh.className=="toarea")
{
var ccs=ZO.checked;

E(GelTags("input",zh),function(bw)
{
setListCheck(bw,ccs);
}
);
}
}
}















function RD(_aoEvent,aJ,ty,eB,nv,agH,
aHJ,aGP,Ey)
{
recordReadedMailId(aJ);
recordMailListScroll();

if(_aoEvent)
{
preventDefault(_aoEvent);


var aF=_aoEvent.srcElement||_aoEvent.target,
kd=aF&&aF.getAttribute("fid");

if(kd)
{
goUrlMainFrm(T("/cgi-bin/$cgi$?sid=$sid$&folderid=$fid$&page=0&t=$t$").replace(
{
cgi:kd=="9"?"readtemplate":"mail_list",
fid:kd,
sid:getSid(),
t:kd=="9"?"sms_list_v2":""
}
),false);
return stopPropagation(_aoEvent);
}
}

var aS=rdVer.url(aJ,nv,Ey,
eB,getTop().bnewwin||(_aoEvent&&_aoEvent.shiftKey),
agH,aHJ,aGP);

rdVer.log(aJ,"hit");

if(_aoEvent&&(_aoEvent.shiftKey||_aoEvent.ctrlKey||_aoEvent.metaKey))
{
var ee=_aoEvent.target||_aoEvent.srcElement;

while(ee&&ee.className!="i M"
&&ee.className!="i F")
{
ee=ee.parentNode;
}

ee&&QMReadedItem.disp(ee);
goNewWin(aS);
}
else
{
goUrlMainFrm([aS,"#stattime=",now()].join(""),false);
}
}









var QMReadedItem={};





QMReadedItem.addItem=function(hU)
{
if(!getMainWin().gMailItems)
{
getMainWin().gMailItems=[];
}

getMainWin().gMailItems.push(hU);
};





QMReadedItem.getItems=function()
{
return getMainWin().gMailItems||[];
};





QMReadedItem.save=function(ccH)
{
getMainWin().goReadedItemImg=ccH;
};





QMReadedItem.load=function()
{
return getMainWin().goReadedItemImg;
};





QMReadedItem.disp=function(abP)
{
if(!abP)
{
return;
}

var JB=abP.type=="checkbox"
?abP.parentNode
:GelTags("input",abP)[0].parentNode,
eh=JB.firstChild;

if(eh.tagName!="IMG")
{
insertHTML(
JB,
"afterBegin",
T([
'<img src="$path$spacer.gif" width="10" height="11" class="showarrow"',
' title="\u8FD9\u662F\u60A8\u6700\u8FD1\u9605\u8BFB\u7684\u4E00\u5C01\u90AE\u4EF6" />'
]).replace(
{
path:getPath("image")
}
)
);
eh=JB.firstChild;
}

show(this.load(),false);
show(eh,true);

this.save(eh);
};





QMReadedItem.read=function(adU)
{
if(adU&&adU.tagName==="U")
{
fireMouseEvent(adU,"click");
}
else
{
if(!this.load())
{
return false;
}

fireMouseEvent(
GelTags("table",this.load().parentNode.parentNode)[0].parentNode,
"click"
);
}

return true;
};






QMReadedItem.check=function(bZR)
{
if(!this.load())
{
return false;
}

var aFN=this.load().nextSibling;
aFN.checked=!aFN.checked;

doCheck(null,aFN,bZR);
return true;
};






QMReadedItem.move=function(btF)
{
var bv=this.getItems(),
aqb=bv.length,
dR=-1;

if(aqb==0)
{
return false;
}

if(this.load()!=null)
{
var aTb=QMReadedItem.load().nextSibling;

for(var i=aqb-1;i>=0;i--)
{
if(aTb==bv[i])
{
dR=i;
break;
}
}
}

dR+=btF?1:-1;

if(dR>-1&&dR<aqb)
{
this.disp(bv[dR]);
scrollIntoMidView(bv[dR],getMainWin().document.body,false);
return true;
}

return false;
};







function listMouseOver(_aoEvent)
{
var ae=this,
cT=ae.className;

if(cT.indexOf(" B")==-1
&&cT.indexOf(" V")==-1
&&ae.getAttribute("colorchange")!="none")
{
ae.className=cT+" V";
}


if(_aoEvent)
{
var aF=getEventTarget(_aoEvent);
while(aF&&aF!=ae&&aF.className!='tagbgSpan')
{
aF=aF.parentNode;
}
if(aF&&aF!=ae)
{
QMTag.showTagClose(aF,1);
}
}
}





function listMouseOut(_aoEvent)
{
var ae=this;
if((!_aoEvent||!isObjContainTarget(ae,_aoEvent.relatedTarget
||_aoEvent.toElement))
&&ae.className.indexOf(" V")>-1
&&ae.getAttribute("colorchange")!="none")
{
ae.className=ae.className.replace(" V","");
}


if(_aoEvent)
{

var aF=getEventTarget(_aoEvent);
while(aF&&aF!=ae&&aF.className!='tagbgSpan')
{
aF=aF.parentNode;
}
if(aF&&aF!=ae)
{
QMTag.showTagClose(aF,0);
}
}

}






function listMouseEvent(bE)
{
addEvents(bE,{
contextmenu:function(_aoEvent)
{
listContextMenu.call(bE,_aoEvent);
},
mouseover:function(_aoEvent)
{
listMouseOver.call(bE,_aoEvent);
},
mouseout:function(_aoEvent)
{
listMouseOut.call(bE,_aoEvent);
}
});
}

function listContextMenu(_aoEvent)
{
var _oDom=this;
allDeferOK()&&mailRightMenu(_oDom,_aoEvent);
preventDefault(_aoEvent);
}





function GetListMouseClick(ao)
{
return function(_aoEvent)
{
ListMouseClick(_aoEvent,ao||window);
}
}






function ListMouseClick(_aoEvent,ao)
{
var ee,
bN=_aoEvent||ao.event;

if(!(ee=getEventTarget(bN)))
{
return;
}


if(attr(ee,"name")=="mailid"||(ee.lastChild&&attr(ee.lastChild,"name")=="mailid")||attr(ee,"name")=="AddrID"||(ee.lastChild&&attr(ee.lastChild,"name")=="AddrID"))
{
if(ee.lastChild&&(attr(ee.lastChild,"name")=="mailid"||attr(ee.lastChild,"name")=="AddrID"))
{
ee.lastChild.click();
}

if(!getGlobalVarValue('TIP_46'))
{
requestShowTip('gotnomail',46,ao,function(bK,gh)
{



setGlobalVarValue('TIP_46',1);

return true;
}
);
}

return doCheck(bN);
}


if(ee.className.indexOf("cir")==0)
{
var VV=GelTags("table",ee.parentNode.parentNode)[0]
.parentNode.onclick.toString().split("{")[1]
.split("}")[0].replace(/event/ig,"{shiftKey:true}");

if(/\WRD/.test(VV))
{
return eval(VV);
}
else
{
VV=GelTags("table",ee.parentNode.parentNode)[0]
.parentNode.onclick.toString().replace(/.*{/g,"")
.replace(/}.*/g,"").replace(/event/ig,"{shiftKey:true}");
return eval(VV);
}
}
}






function listInitForComm(da,cdY)
{
var cT,
rC=GelTags("div"),
bVe=doCheck,
Xj,ph;

cT=da?da:"M";
for(var i=rC.length-1;i>=0;i--)
{
Xj=rC[i];

if(Xj.className!=cT)
{
continue;
}

if(da=="ft")
{
Xj=GelTags("table",Xj)[0];
}

ph=GelTags("input",Xj)[0];
if(!ph||ph.type!="checkbox")
{
continue;
}

ph.title="\u6309\u4F4Fshift\u70B9\u51FB\u4E0D\u540C\u7684\u52FE\u9009\u6846 \u53EF\u65B9\u4FBF\u5FEB\u6377\u591A\u9009";
addEvent(ph,"click",bVe);









if(!cdY)
{
listMouseEvent(Xj);
}
}
}










function modifyFolder(nv,Ga)
{
getMainWin().location.href=T([
'/cgi-bin/foldermgr?sid=$sid$&fun=detailpop&t=pop_detail',
'&folderid=$folderid$&acctid=$acctid$'
]).replace(
{
sid:getSid(),
folderid:nv,
acctid:Ga
}
);
return false;
}







function recvPopHidden(nv)
{
getMainWin().setTimeout(
function()
{
if(!nv)
{
getTop().reloadFrmLeftMain(false,true);
}
else
{
var aV="iframeRecvPopHidden";
createBlankIframe(getMainWin(),{id:aV});

var aS=["/cgi-bin/mail_list?sid=",getSid(),"&folderid=",
nv,"&t=recv_pop_hidden"].join("");
try
{
F(aV,getMainWin()).location.replace(aS);
}
catch(bf)
{
S(aV,getMainWin()).src=aS;
}
}
},
10000
);
}






function recvPop(Ga,nv,dB)
{
recvPopCreat(Ga,nv);
if(S("tips",dB))
{
S("tips",dB).innerHTML=T(
[
'<img src="$images_path$ico_loading3104474.gif" align=absmiddle>',
' \u6B63\u5728\u6536\u53D6...&nbsp;\u7CFB\u7EDF\u5C06\u5728\u540E\u53F0\u81EA\u52A8\u6536\u53D6\uFF0C\u60A8\u53EF\u4EE5\u79BB\u5F00\u6B64\u9875\u9762\uFF0C\u7A0D\u540E\u56DE\u6765\u67E5\u770B\u6536\u53D6\u7ED3\u679C\u3002'
]
).replace(
{
images_path:getPath("image",true)
}
);
}


recvPopHidden(nv);
}





function recvPopCreat(Ga)
{
getActionWin().location=["/cgi-bin/foldermgr?sid=",getSid(),
"&fun=recvpop&acctid=",Ga].join("");
}




function recvPopAll()
{
getActionWin().location=["/cgi-bin/foldermgr?sid=",getSid(),
"&fun=recvpopall"].join("");
try
{

setTimeout(
function()
{
reloadFrmLeftMain(false,true);
},
3000
);
}
catch(bf)
{
}
return false;
}









function setPopFlag(Ga,qx,bJ)
{
if(qx=="recent")
{
setPopRecentFlag(Ga,bJ);
}
}






function setPopRecentFlag(Ga,bJ)
{
runUrlWithSid(["/cgi-bin/foldermgr?sid=",getSid(),
"&fun=pop_setting&acctid=",Ga,"&recentflag=",bJ].join(""));
}







function checkPopMailShow(pJ)
{
var bjL=["@yahoo.com.cn","@sina.com","@tom.com","@gmail.com"],
bMk=pJ.toLowerCase();

for(var i=0;i<bjL.length;i++)
{
if(bMk.indexOf(bjL[i])>=0)
{
return true;
}
}

return false;
}









function setBeforeUnloadCheck(ao,_asMsg,Nr,chl,
fl)
{
var aIo=["input","select","textarea"];

ao=ao||window;
fl=fl?(typeof(fl)=="string"
?S(fl,ao)
:fl):ao.document;
ao.gbIsBeforeUnloadCheck=true;

E(aIo,
function(jn)
{
var cbZ=ao[jn+"_save"]=[];

E(GelTags(jn,fl),
function(bE,dp)
{
cbZ.push(bE.value+bE.checked);
bE.setAttribute("saveid",dp);
}
);
}
);

if(!ao.onsetbeforeunloadcheck)
{
ao.onsetbeforeunloadcheck=function()
{
if(ao.gbIsBeforeUnloadCheck)
{
for(var i=0,_nLen=aIo.length;i<_nLen;i++)
{
var DG=aIo[i],
aQ=DG+"_save",
aeF=GelTags(DG,fl);

for(var j=0,jlen=aeF.length;j<jlen;j++)
{
var blm=aeF[j].getAttribute("saveid");
if(blm!=null&&aeF[j].getAttribute("nocheck")!="true"&&ao[aQ][blm]
!=(aeF[j].value+aeF[j].checked))
{
return _asMsg?_asMsg:"\u60A8\u4FEE\u6539\u7684\u8BBE\u7F6E\u5C1A\u672A\u4FDD\u5B58\uFF0C\u786E\u5B9A\u8981\u79BB\u5F00\u5417\uFF1F";
}
}
}
}
};

gbIsIE?(ao.document.body.onbeforeunload=ao.onsetbeforeunloadcheck)
:ao.document.body.setAttribute("onbeforeunload","return onsetbeforeunloadcheck();");
}

E(chl||["cancel"],
function(aHA)
{
addEvent(
typeof(aHA)=="string"
?S(aHA,ao):aHA,
"mousedown",
function()
{
ao.gbIsBeforeUnloadCheck=false;
}
);
}
);

E(GelTags("form",ao.document),
function(mO)
{
addEvent(mO,"submit",
function()
{
ao.gbIsBeforeUnloadCheck=false;
}
);

if(!mO.SP)
{
mO.SP=mO.submit;
mO.submit=function()
{
ao.gbIsBeforeUnloadCheck=false;
this.SP();
};
}
}
);
}









function popErrProcess(_asMsg,ZJ,apk,FA,bWr,aWr)
{
if(_asMsg!=null)
{
msgBox(_asMsg,ZJ,apk,FA);
}

if(aWr!=null)
{
getMainWin().ShowPopErr(aWr,bWr);
}

showSubmitBtn();
}




function showSubmitBtn()
{
var II=S("submitbtn",getMainWin());

if(II)
{
II.disabled=false;
}
}




function showPopSvr()
{
show(S("popsvrTR",getMainWin()),true);
}





function setTaskId(Av)
{
try
{
getMainWin().document.checkFrom.taskid.value=Av;
}
catch(bf)
{
}
}








function showQuickReply(nz)
{
show(S('quickreply',getMainWin()),nz);
show(S('upreply',getMainWin()),!nz);
runUrlWithSid("/cgi-bin/getcomposedata?Fun=setshowquickreply&isShowQuickReply="
+(nz?0:1));
}




function hiddenReceipt(ao)
{
show(S("receiptDiv",ao),false);
}





function switchOption(dB)
{
var aE=[
[
"<span class='qm_ico_quickup' alt='\u663E\u793A\u66F4\u591A' title='\u9690\u85CF'></span>",true],

[
"<span class='qm_ico_quickdown' alt='\u663E\u793A\u66F4\u591A' id='display_more_operator'></span>",false]

][
S("trOption",dB).style.display=="none"?0:1
];
S("aSwitchOption",dB).innerHTML=aE[0];
show(S("trOption",dB),aE[1]);
}






function checkPerDel(ao)
{


delMail("PerDel",ao);

}






function delMail(acd,ao)
{
rmMail(acd=="PerDel"?1:0,ao.QMReadMail.getCBInfo(ao));
}








function setMailType(aw,Hm,Mj,dB)
{
var gq=S("mail_frm",dB);

gq.s.value=["readmail_",
Hm?(Mj?"group":aw):("not"+aw),
getMainWin().newwinflag?"_newwin":""].join("");
gq.action="/cgi-bin/mail_mgr?sid="+getSid();
gq.mailaction.value="mail_spam";
gq.isspam.value=Hm;
gq.reporttype.value=aw=="cheat"?"1":"";

submitToActionFrm(gq);
}



function getAddrSub(addr)
{
var _oPos=addr.indexOf("@");
if(_oPos>-1)
{
var addrName=addr.substr(0,_oPos);
var addrDom=addr.substr(_oPos);
return subAsiiStr(addrName,18,'...')+subAsiiStr(addrDom,18,'...');
}
else
{
debug("name+dom"+addr);
return subAsiiStr(addr,36,'...');
}
}

function getRefuseText(NN)
{
var bbS=T([
'<input type="checkbox" name="$TNAME$" id="$TID$" $TCHECK$>\u5C06<label for="$TID$">$TVALUE$</label>\u52A0\u5165\u9ED1\u540D\u5355'
]);
var i;
var retstr="";
var br="";
for(i in NN)
{
var tagname="refuse";
if(i>0){
tagname="refuse"+i;
br="<br>"
}
var addrlabel;
if(NN[i]!="\u53D1\u4EF6\u4EBA")
addrlabel="&lt;"+getAddrSub(NN[i])+"&gt;";
else
addrlabel=NN[i];
var ischecked="";
debug("ITEM: "+NN[i]);
retstr+=br+bbS.replace({
TNAME:tagname,
TID:tagname,
TVALUE:addrlabel,
TCHECK:ischecked
});
}
debug("RET Text"+retstr);
return retstr;
}










function reportSpam(arl,aCB,ao,yx,KD)
{
debug("Enter mail.js reportSpam "+arl);
var ay=ao||(window==getTopWin()?getMainWin():window);
if(!S("mail_frm",ay))
{
debug("enter from maillist");

var jz=QMMailList.getCBInfo(ay),
_oInfo,
biI=0,
cm=jz.oMail.length,
uK={};
if(cm==0)
{
showError(gsMsgNoMail);
return false;
}
for(var aN=0;aN<cm;aN++)
{

_oInfo=jz.oMail[aN];
if(_oInfo.bSys)
{





}
biI+=_oInfo.bDft?1:0;
if(_oInfo.sSEmail.indexOf("@groupmail.qq.com")!=-1)
{

arl=true;
}else if(_oInfo.sSEmail.indexOf("10000@qq.com")!=-1){

arl=true;
}
if(typeof uK.sender=="undefined")
{
uK.sender=_oInfo.sSEmail;
uK.nickname=_oInfo.sSName;
}else if(uK.sender!=_oInfo.sSEmail)
{
uK.sender="";
}
}
if(biI==cm)
{

yx=1;
}
else
{

for(aN=0;aN<cm;aN++)
{
_oInfo=jz.oMail[aN];




}
jz=QMMailList.getCBInfo(ay);
QMMailList.selectedUI(jz);
}
}

var Qq=new Array();
Qq[0]="\u53D1\u4EF6\u4EBA";

if(uK&&uK.sender&&uK.sender.indexOf(',')<0)
{
Qq[0]=uK.sender;
}

var auZ=0;
if(KD)
{
if(KD[0].length>0)Qq[auZ++]=KD[0];
if(KD[1])Qq[auZ++]=KD[1];
}
var afH=T([
'<div>',
'<input type="radio" name="reporttype" id="r$value$" value="$value$" $checked$>',
'<label for="r$value$">$content$</label>',
'</div>'
]);
var cu=(yx!==1?[
"<div style='padding:10px 10px 0 25px;text-align:left;'>",
"<form id='frm_spamtype'>",
"<div style='margin:3px 0 3px 3px'><b>\u8BF7\u9009\u62E9\u8981\u4E3E\u62A5\u7684\u5783\u573E\u7C7B\u578B\uFF1A</b></div>",
afH.replace({
value:(aCB?11:8),
checked:"checked",
content:"\u5176\u4ED6\u90AE\u4EF6"
}),

afH.replace({
value:(aCB?10:4),
checked:"",
content:"\u5E7F\u544A\u90AE\u4EF6"
}),

afH.replace({
value:(aCB?9:1),
checked:"",
content:"\u6B3A\u8BC8\u90AE\u4EF6"
}),
"<div style=\"padding:5px 0 2px 0;\">",
(arl
?"&nbsp;"
:getRefuseText(Qq)),"</div><div style='margin:10px 3px 0px 3px' class='addrtitle' >\u6E29\u99A8\u63D0\u793A\uFF1A\u6211\u4EEC\u5C06\u4F18\u5148\u91C7\u7EB3\u51C6\u786E\u5206\u7C7B\u7684\u4E3E\u62A5\u90AE\u4EF6\u3002</div>","</form>",
"</div><div style='padding:3px 15px 12px 10px;text-align:right;'>",
"<input type=button id='btn_ok' class='btn wd2' value=\u786E\u5B9A>",
"<input type=button id='btn_cancel' class='btn wd2' value=\u53D6\u6D88>",
"</div>"
]:[
"<div class='cnfx_content'>",
"<img style='float:left; margin:5px 10px 0;' src='",getPath("image"),"ico_question.gif' />",
"<div class='b_size' style='padding:10px 10px 0 0;margin-left:65px;line-height:1.5;height:80px;text-align:left;'>",
"<form id='frm_spamtype'>",
"<strong>\u60A8\u8981\u4E3E\u62A5\u8FD9\u4E2A\u6F02\u6D41\u74F6\u5417\uFF1F</strong><br>",
"<div style=\"display:none\">",
afH.replace({
value:8,
checked:"checked",
content:""
}),
"</div>",
"\u4E3E\u62A5\u4EE5\u540E\uFF0C\u60A8\u5C06\u4E0D\u518D\u6536\u5230\u8FD9\u4E2A\u6F02\u6D41\u74F6\u7684\u56DE\u5E94\u3002","</form>",
"</div></div><div class='cnfx_btn'>",
"<input type=button id='btn_ok' class='btn wd2' value=\u786E\u5B9A>",
"<input type=button id='btn_cancel' class='btn wd2' style='margin-left:5px' value=\u53D6\u6D88>",
"</div>"
]).join("");

new(getTop().QMDialog)({
sId:"reportSpam",
sTitle:yx===1?"\u7838\u6389\u8FD9\u4E2A\u74F6\u5B50":"\u4E3E\u62A5\u5E76\u62D2\u6536\u9009\u4E2D\u90AE\u4EF6",
sBodyHtml:cu,
nWidth:450,
nHeight:yx===1?150:220,
onload:function(){
var bQ=this;
addEvent(bQ.S("btn_ok"),"click",function()
{
var gq=S("mail_frm",getMainWin())||S("frm",getMainWin());
if(!gq)
{
return;
}
gq.s.value="readmail_spam";
gq.isspam.value='true';
gq.mailaction.value="mail_spam";
gq.action='/cgi-bin/mail_mgr?sid='+getTop().getSid();

var arM=bQ.S("frm_spamtype").reporttype,
VB=bQ.S("frm_spamtype").refuse,
aac=bQ.S("frm_spamtype").refuse1;
for(var i=0,_nLen=arM.length;i<_nLen;i++)
{
if(arM[i].checked)
{
gq.reporttype.value=arM[i].value;
break;
}
}
var yo=new Array();
yo[0]="0";
yo[1]="0";
if((VB&&VB.checked)||
(aac&&aac.checked))
{
gq.s.value="readmail_reject";
}

if(aac)
{
yo[0]=VB&&VB.checked?"1":"0";
yo[1]=aac.checked?"1":"0";
}
else 
{
yo[0]="1";
yo[1]="1";
}

if(gq.s_reject_what){
gq.s_reject_what.value=yo[0]+yo[1];
debug("Reject method "+gq.s_reject_what.value);
}

submitToActionFrm(gq);
bQ.close();
});
addEvent(bQ.S("btn_cancel"),"click",function(){bQ.close()});

},
onshow:function()
{
this.S("btn_cancel").focus();
}
});

return false;
}









function setSpamMail(Hm,Mj,dB)
{
var baJ=dB||(window==getTopWin()?getMainWin():window);
if(Hm&&!Mj)
{
return reportSpam(null,null,baJ);
}
setMailType("spam",Hm,Mj,baJ);
}






function setCheatMail(Hm,Mj)
{
setMailType("cheat",Hm,Mj);
}






function doReject(Hm,Mj,dB,gg)
{
var aWW="\u6B64\u90AE\u4EF6\u5730\u5740";
if(gg){
aWW="<"+gg+">";
}

var gq=S("mail_frm",dB);
if(gq.s_reject_what)
{
gq.s_reject_what.value="10";
}

if(confirm("\u7CFB\u7EDF\u4F1A\u628A"+aWW+"\u653E\u5165\u201C\u9ED1\u540D\u5355\u201D\u4E2D\uFF0C\u60A8\u5C06\u4E0D\u518D\u6536\u5230\u6765\u81EA\u6B64\u5730\u5740\u7684\u90AE\u4EF6\u3002\n\n\u786E\u5B9A\u8981\u62D2\u6536\u6B64\u53D1\u4EF6\u4EBA\u7684\u90AE\u4EF6\u5417\uFF1F"))
{
setMailType("reject",Hm,Mj,dB);
}
}




function setFolderReaded(eD,Ss,bVS,qx)
{

var ccU=eD=="all"?parseInt(bVS||"0"):(Ss?getGroupUnread(Ss):getFolderUnread(eD));
if(ccU<1)
{
return showError("\u6587\u4EF6\u5939\u5185\u6CA1\u6709\u672A\u8BFB\u90AE\u4EF6");
}

var ju=getSid(),
aVE=unikey("allread"),
bAj=function()
{
QMAjax.send("/cgi-bin/mail_mgr?mailaction=read_all&t=unreadmail_reg_data&loc=setFolderUnread,,,32",
{
method:"POST",
content:T('sid=$sid$&folderid=$folderid$&groupid=$groupid$$flags$').replace(
{
sid:ju,
folderid:eD!="all"?eD:"1&folderid=3&folderid=8&folderid=9&folderid=11&folderid=personal&folderid=pop&folderid=subscribe",
groupid:Ss,
flags:qx?qx:""
}
),
onload:function(ba,bK)
{
if(ba&&bK.indexOf("mark_allmail_ok")>-1)
{
var fb="\u6587\u4EF6\u5939\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C"
reloadFrmLeftMain(true,!!getMainWin()[aVE]);
showInfo(fb+"\u6210\u529F");
var aE=eval(bK);
setRollBack(aE.rbkey,fb);
}
else
{
showError("\u6587\u4EF6\u5939\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
}
}
});
};
getMainWin()[aVE]=1;


bAj();












































}






function linkMaker(Rz)
{


var els="(https?:\\/\\/[\\w.]+[^ \\f\\n\\r\\t\\v\"\\\\\\'\\<\\>\[\\]\\u2100-\\uFFFF]*)",






bXF="([a-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Z0-9-]+\\.)+[A-Z]{2,4})";
function aHo(bF)
{
var hI=12,
fA=bF||"",
_oList=[],
_nLen=fA.length/hI;

for(var i=0;i<_nLen;i++)
{
_oList[i]=fA.substr(i*hI,hI);
}

return _oList.join("<wbr>");
}

return Rz.replace(
new RegExp([els,bXF].join("|"),"ig"),
function(bfk,dyf,aCi)
{
if(aCi)
{
return['<a href="mailto:',aCi,'">',
aHo(aCi),'</a>'].join("");
}
else
{
return['<a href="',bfk,'">',
aHo(bfk),'</a>'].join("");
}
}
);
}





function linkIdentify(bE)
{
if(!bE||bE.tagName=="A"||bE.tagName=="SCRIPT"
||bE.tagName=="STYLE"||bE.className=="qqmailbgattach")
{
return;
}

for(var cv=bE.firstChild,nextNode;cv;cv=nextNode)
{
nextNode=cv.nextSibling;
linkIdentify(cv);
}

if(bE.nodeType==3)
{
var fA=bE.nodeValue.replace(/</g,"&lt;").replace(/>/g,"&gt;"),
iI=linkMaker(fA);

if(fA!=iI)
{
var jb=false;

if(bE.previousSibling)
{
jb=insertHTML(bE.previousSibling,"afterEnd",iI);
}
else
{
jb=insertHTML(bE.parentNode,"afterBegin",iI);
}

if(jb)
{
removeSelf(bE);
}
}
}
}







function bkZ(_aoDom)
{
var fQ=_aoDom.href||"",
ei=_aoDom.ownerDocument,
jy=(ei.parentWindow||ei.defaultView).location;
return!_aoDom.onclick&&fQ&&fQ.indexOf("javascript:")!=0&&fQ.indexOf("#")!=0&&
fQ.indexOf(jy.protocol+"//"+jy.hostname+"/")!=0;

}







function swapLink(aL,Mr,dB)
{
var dL=aL.ownerDocument?aL:S(aL,dB);
if(dL)
{
function aSE(atK)
{

if(bkZ(atK))
{

atK.target="_blank";
atK.onclick=function()
{
return blx.call(this,Mr);
};
}
else
{
}
atK=null;
}
linkIdentify(dL);
E(GelTags("a",dL),aSE);
E(GelTags("area",dL),aSE);
E(GelTags("form",dL),function(bmh)
{
bmh.onsubmit=function()
{
var jy=dB.location;

if(jy.getParams()["filterflag"]=="true"||this.action)
{
this.target="_blank";
return true;
}

showError(T(['\u51FA\u4E8E\u5B89\u5168\u8003\u8651\u8BE5\u64CD\u4F5C\u5DF2\u88AB\u5C4F\u853D [<a onclick="',
'setTimeout( function() {',
'goUrlMainFrm(\x27$url$&filterflag=true\x27);',
'showInfo(\x27\u53D6\u6D88\u5C4F\u853D\u6210\u529F\x27);','});',
'" style="color:white;" >\u53D6\u6D88\u5C4F\u853D</a>]']).replace({url:jy.pathname+jy.search}));

return false;
};
bmh=null;
}
);
}
dL=null;
}






function preSwapLink(_aoEvent,Mr)
{
var aF=getEventTarget(_aoEvent);
if(aF
&&{"A":1,"AREA":1}[aF.tagName]
&&bkZ(aF))
{
blx.call(aF,Mr)&&window.open(aF.href);
preventDefault(_aoEvent);
}
}








function swapImg(aL,dXP,Mr,ao)
{














































































}




function openSpam(ao)
{
ao=ao||window;
if(true||confirm("\u6B64\u90AE\u4EF6\u7684\u56FE\u7247\u53EF\u80FD\u5305\u542B\u4E0D\u5B89\u5168\u4FE1\u606F\uFF0C\u662F\u5426\u67E5\u770B\uFF1F"))
{
ao.location.replace(appendToUrl(ao.location.href,"&disptype=html&dispimg=1&clickshowimage=1"));
}
}




function openHttpsMail(ao)
{
ao.location.replace(appendToUrl(ao.location.href,"&dispimg=1"));
}






function copyToClipboard(fE)
{
try
{
if(gbIsFF)
{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(fE);
}
else
{

var Kz=S("copyinputcontainer");
if(!Kz)
{
insertHTML(document.body,"beforeEnd",'<input id="copyinputcontainer" style="position:absolute;top:-1000px;left:-1000px;"/>');
Kz=S("copyinputcontainer");
}
Kz.value=fE;
Kz.select();
document.execCommand('Copy');
}
}
catch(e)
{
alert(T('\u60A8\u7684\u6D4F\u89C8\u5668\u5B89\u5168\u8BBE\u7F6E\u4E0D\u5141\u8BB8\u7F16\u8F91\u5668\u81EA\u52A8\u6267\u884C\u590D\u5236\u64CD\u4F5C\uFF0C\u8BF7\u4F7F\u7528\u952E\u76D8\u5FEB\u6377\u952E($cmd$+C)\u6765\u5B8C\u6210\u3002').replace({cmd:gbIsMac?"Command":"Ctrl"}));
return false;
}
return true;
}






function blx(Mr)
{
var fk=this;

if(fk.href.indexOf("mailto:")==0&&fk.href.indexOf("@")!=-1)
{
window.open(["/cgi-bin/readtemplate?sid=",getSid(),
"&t=compose&s=cliwrite&newwin=true&email=",
fk.href.split("mailto:")[1]].join(""));
return false;
}
else if(fk.className=="qqmail_card_reply"
||fk.className=="qqmail_card_reply_btn"
||fk.className=="qqmail_birthcard_reply"
||fk.className=="qqmail_birthcard_reply_btn")
{






var fT=fk.name,
cT=fk.className,
aSt=!!fT,
ceB=cT.indexOf("birthcard")!=-1;

getMainWin().location=T('/cgi-bin/cardlist?sid=$sid$&t=$t$&s=$s$&today_tips=$tips$&loc=readmail,readmail,sendnewcard,1&ListType=$listtype$&email=$email$$newwin$').replace(
{
sid:getSid(),
t:aSt?"compose_card":"card",
s:ceB?"replybirthcard":"",
tips:cT.indexOf("btn")!=-1?"112":"111",
listtype:aSt?"No":"Cards&Cate1Idx=listall",
email:fT,
newwin:getTop().bnewwin?"&newwin=true":""
});
return false;
}
else if(fk.className=="qqmail_postcard_reply_mobile")
{
var xI=getMainWin().QMReadMail;
if(xI)
{
getMainWin().location=T("/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&t=compose&s=reply&disptype=html").replace(
{
sid:getSid(),
mailid:xI.getMailId()
})
}
return false;
}
else if(fk.className=="qqmail_postcard_sendhelp_mobile")
{
window.open("http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=36&&no=1000696");
return false;
}
else if(fk.className=="qqmail_card_reply_thanksbtn"
||fk.className=="qqmail_card_reply_thanks"
||fk.className=="qqmail_birthcard_reply_thanksbtn")
{
var fT=fk.name;

openComposeDlg("card",{
sTitle:"\u7B54\u8C22\u597D\u53CB",
sDefAddrs:fT,
bAddrEdit:true,
sDefContent:"\u8C22\u8C22\u4F60\u7684\u8D3A\u5361\uFF01 \u4EE5\u540E\u8981\u5E38\u8054\u7CFB\u54E6\u3002",
bContentEdit:true,
sDefSubject:"\u8C22\u8C22\u4F60\u7684\u8D3A\u5361!",
bRichEditor:false,
oncomplete:function(){},

bShowResult:true
});
return false;
}












else if(fk.className=="qqmail_postcard_reply")
{
goUrlMainFrm(
T('/cgi-bin/readtemplate?sid=$sid$&t=compose_postcard&email=$email$'
).replace({
sid:getSid(),
email:fk.name
}),false
);
return false;
}
else if(fk.className=="qqmail_postcard_reply2")
{
var aYp='',
aMo='',
xI=getMainWin().QMReadMail;
if(xI)
{
try
{
var RW=(xI.getSubMailWithDom?xI.getSubMailWithDom(fk):xI.getMailInfo()).from;
aYp=RW&&RW.name||'';
aMo=RW&&RW.addr||'';
}
catch(e)
{
}
}
goUrlMainFrm(
T('/cgi-bin/readtemplate?sid=$sid$&t=compose_postcard&email=$email$&reply=1&frname=$name$&fraddr=$addr$'
).replace({
name:escape(aYp),
addr:escape(aMo),
sid:getSid(),
email:fk.name
}),false
);
return false;
}












else if(fk.className=="qqmail_postcard_print")
{
var xI=getMainWin().QMReadMail;
if(xI)
{
window.open(T('/cgi-bin/readmail?sid=$sid$&t=print_haagendazs&s=print&filterflag=true&mailid=$mailid$').replace(
{
sid:getSid(),
mailid:xI.getMailId()
})
);
}
return false;
}
else if(fk.className=="qqmail_postcard_getmoreinfo")
{
var xI=getMainWin().QMReadMail;
if(xI)
{
window.open(T('/cgi-bin/today?t=haagendazs2010&sid=$sid$').replace(
{
sid:getSid(),
mailid:xI.getMailId()
})
);
}
return false;
}
else if(fk.className=="qqmail_videomail_reply")
{
goUrlMainFrm(
T('/cgi-bin/readtemplate?sid=$sid$&t=compose_video&email=$email$'
).replace({
sid:getSid(),
email:fk.name
}),false
);
return false;
}
else if(fk.className=="groupmail_open")
{
getMainWin().location=["/cgi-bin/grouplist?sid=",getSid(),
"&t=compose_group",(getTop().bnewwin?"&newwin=true":"")].join("");
return false;
}
else if(fk.className=="reg_alias")
{
getMainWin().location=[
"/cgi-bin/readtemplate?reg_step=1&t=regalias_announce&sid=",
getSid()].join("");
return false;
}

else if(fk.className=="mergemail_reader_article_list_link")
{
var bJL=fk.getAttribute("ctype");
var aFz=fk.getAttribute("param_new");
var aS="";


if(aFz.indexOf("follow=1")>=0)
{
var bNv=fk.getAttribute("followuin");
aS=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr";
QMAjax.send(aS,
{
method:"POST",
content:"fun=followshare&followuin="+bNv+"&sid="+getSid(),
onload:function(ba,cIZ)
{
if(ba)
{

getMainWin().location=T('$host$/cgi-bin/reader_article_list?sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:aFz
});
}
}
});
}

else
{
getMainWin().location=T('$host$/cgi-bin/reader_article_list?sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:aFz
});
}


if(bJL=="onefeed")
{
aS=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr?fun=setlog&flag=3&from=2";
}
else
{
aS=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr?fun=setlog&flag=3&from=4";
}
runUrlWithSid(aS);

return false;
}
else if(fk.className=="mergemail_reader_setting_link")
{

getMainWin().location=T('$host$/cgi-bin/reader_setting?t=rss_setting_notify&sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:fk.getAttribute("param")
});


var aS=(getTop().gsRssDomain||"")+"/cgi-bin/reader_mgr?fun=setlog&flag=3&from=3";
runUrlWithSid(aS);
return false;
}
else if(fk.className=="reader_article_list_link")
{

getMainWin().location=T('$host$/cgi-bin/reader_article_list?sid=$sid$&$param$').replace(
{
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:fk.getAttribute("param")
}
);

return false;
}

else if(fk.className=="reader_detail_qqmail_link")
{
var cN=[];

E(fk.getAttribute("param").split("&"),function(bK)
{
if(bK.indexOf("share=1")<0)
{
cN.push(bK);
}
}
);

getMainWin().location=T('$host$/cgi-bin/reader_detail?sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:cN.join("&")
});
return false;
}
else if(fk.className=="reader_list_qqmail_link")
{
var cN=[];

E(fk.getAttribute("param").split("&"),function(bK)
{
cN.push(bK);
}
);
getMainWin().location=T('$host$/cgi-bin/reader_list?classtype=allfriend&refresh=1&share=1&sid=$sid$&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:cN.join("&")
});
return false;
}
else if(fk.className=="reader_catalog_list_qqmail_link")
{
var cN=[];

E(fk.getAttribute("param").split("&"),function(bK)
{
cN.push(bK);
}
);

getMainWin().location=T('$host$/cgi-bin/reader_catalog_list?sid=$sid$&classtype=share&share=1&refresh=1&$param$'
).replace({
host:(getTop().gsRssDomain||""),
sid:getSid(),
param:cN.join("&")
});
return false;
}
else if(fk.className=="ftn_groupshare_enter_link")
{
getMainWin().location.href=T(
'/cgi-bin/ftnExs_files?listtype=group&s=group&t=exs_ftn_files&sid=$sid$'
).replace({sid:getSid()});
return false;
}
else if(fk.className=="book_article_list_link")
{

getMainWin().location=T('/cgi-bin/setting10?sid=$sid$&$param$').replace(
{
sid:getSid(),
param:fk.getAttribute("param")
}
);

return false;
}



if(1)
{

if(fk.href.indexOf("javascript:void(0)")>=0)
{

return false;
}
if(Mr!="preview"&&getMainWin().location.href.indexOf('/cgi-bin/readmail?')<0)
{
return true;
}

var kL=fk.parentNode;
while(kL)
{
if(kL.nodeType==1&&(kL.id=="QQmailNormalAtt"||kL.id=="attachment"))
{
return true;
}
kL=kL.parentNode;
}

window.open(T('/cgi-bin/mail_spam?action=check_link&url=$url$&mailid=$mid$&spam=$spam$').replace(
{
mid:getMainWin().location.getParams()['mailid'],
spam:Mr=="spam"?1:0,
url:escape(fk.href)
}
),"_blank");
return false;
}

var fA="http://mail.qq.com/cgi-bin/feed?u=";
if(fk.name=="_QQMAIL_QZONESIGN_"||fk.href.indexOf(fA)==0)
{
if(fk.name=="_QQMAIL_QZONESIGN_")
{
var cdw=fk.href.split("/"),
oO=parseInt(cdw[2]),
bT=[
"&sid=",
getSid(),
"&u=http%3A%2F%2Ffeeds.qzone.qq.com%2Fcgi-bin%2Fcgi_rss_out%3Fuin%3D",
oO
].join("");
}
else
{
var bay=fk.href.substr(fA.length);
if(bay.indexOf("http%3A%2F%2F")==0
||bay.indexOf("https%3A%2F%2F")==0)
{
var bT=["&sid=",getSid(),"&u=",fk.href.substr(fA.length)]
.join("");
}
else
{
var bT=["&sid=",getSid(),"&u=",
encodeURIComponent(fk.href.substr(fA.length))].join("");
}
}
if(getTop().bnewwin)
{
goUrlTopWin(["/cgi-bin/frame_html?target=feed",bT].join(""));
}
else
{
goUrlMainFrm(["/cgi-bin/feed?",bT].join(""),false);
}
return false;
}
else if(fk.name=="QmRsSRecomMand")
{
getMainWin().location=T("$host$/cgi-bin/reader_detail?vs=1&feedid=$feedid$&itemid=$itemid$&t=compose&s=content&mailfmt=1&sid=$sid$&newwin=$isnewwin$&tmpltype=recommend&loc=reader_detail,rss_recommend,,2").replace({
host:(getTop().gsRssDomain||""),
feedid:fk.getAttribute("feedid"),
itemid:fk.getAttribute("itemid"),
sid:getSid(),
isnewwin:!!getTop().bnewwin
});
return false;
}

return true;
}





function goPrevOrNextMail(aBn)
{
var dL,
cF=getMainWin();

if(!!(dL=S(["prevmail","nextmail"][aBn?1:0],cF))
&&!dL.getAttribute("disabled"))
{

}
else if(!!(dL=S(["prevpage","nextpage","prevpage1","nextpage1"][aBn?1:0],cF))
&&!dL.getAttribute("disabled"))
{
cF.location=dL.href;
}
}





function goBackHistory()
{
var Ef=SN("readmailBack",getMainWin());
if(Ef.length>0&&isShow(Ef[0]))
{
fireMouseEvent(Ef[0],"click");
return true;
}
return false;
}













function checkPerDelML(nv,aJx,dB)
{
return delMailML(nv,aJx,"PerDel",dB);
}









function delMailML(nv,aJx,acd,dB)
{
var ay=dB.nodeType==9?(dB.defaultView||dB.parentWindow):dB,
aT=QMMailList.getCBInfo(ay);
configPreRmMail(aT,'rmMail');
rmMail(acd=="PerDel"?1:0,aT);
return;
}






function reportSpamML(bsn,dB)
{

if(getTop().isSelectAllFld(getMainWin()))
{
return showError('\u4E0D\u80FD\u5BF9\u5168\u6587\u4EF6\u5939\u6267\u884C\u6B64\u64CD\u4F5C');
}

var ay=dB.nodeType==9?(dB.defaultView||dB.parentWindow):dB,
aT=QMMailList.getCBInfo(ay);


configPreRmMail(aT,'spammail');
(bsn?reportSpamJson:reportNoSpamJson)({bBlackList:true},aT);
return false;
}














function MLIUIEvent(BJ,ao,eD)
{
var bh=BJ.value,
bO=QMMailCache,
Dv=bO.isRefresh(ao),
yA=BJ.parentNode;
while(yA.tagName.toUpperCase()!="TABLE")
{
yA=yA.parentNode;
}
var gw=GelTags("table",yA)[0],
Bh=GelTags("td",GelTags("tr",gw)[0]),
ckO=Bh[1],
MC=Bh[Bh.length-1];

BJ.setAttribute('init','true');
QMReadedItem.addItem(BJ);


if(MC.className=="new_g")
{
MC=Bh[6];
}


var atm=GelTags("div",gw),
Vn;
for(var aN=atm.length-1;aN>=0;aN--)
{
if(atm[aN].className=="TagDiv")
{
Vn=atm[aN];
break;
}
}


if(bO.hasData(bh))
{
if(!Dv)
{
var av=bO.getData(bh);
if(BJ.getAttribute("unread")=="true")
{
bO.addVar("unread",-1);
}
aLk(BJ,yA,av.bUnread?true:false,av.reply);
aJD(BJ,yA);

if(av.star!=null)
{
setClass(MC,av.star?"fg fs1":"fg");
bO.addVar("star",av.star?1:-1);
}

if(av.oTagIds)
{
var AK=GelTags("table",gw),
wc=av.oTagIds,
zf,
aMS={};

if(Vn)
{
for(var aN=AK.length-1;aN>=0;aN--)
{
if(zf=AK[aN].getAttribute("tagid"))
{
aMS[zf]=1;
}
}
for(var acw in wc)
{
if(wc[acw]===0)
{

QMTag.rmTagUI(Vn,acw);
}
else if(!aMS[acw])
{

QMTag.addTagUI(Vn,acw,eD,bh,false);
}
}
}
}
}
else
{

bO.addData(bh,
{
bUnread:BJ.getAttribute("unread")=="true",
oTagIds:{},
star:null,
reply:null
});
}
}

listMouseEvent(yA);

MC.title=MC.className=="fg"?"\u6807\u8BB0\u661F\u6807":"\u53D6\u6D88\u661F\u6807";
addEvent(MC,'click',function(_aoEvent)
{
starMail(null,QMMailList.getCBInfo(ao,bh));
return stopPropagation(_aoEvent);
}
);

addEvent(yA,"click",GetListMouseClick(ao));
addEvent(yA,"selectstart",preventDefault);


var aqI=gw.rows[0].cells[1];
if(aqI.className.indexOf("fr")>-1)
{

loadJsFile("$js_path$qmtip111fe0.js",true);
addEvent(aqI,"mouseover",MLI.aKy);
addEvent(aqI,"mouseout",MLI.aKy);
}


addEvent(Vn,'click',function(_aoEvent)
{
if(QMTag.readclose(_aoEvent,QMMailList.getCBInfo(ao,bh)))
{
return stopPropagation(_aoEvent);
}
}
);

dragML(yA,BJ);

}






function MLI(dhe,ao,eD,Ey)
{














var aKl=SN("mailid",ao),
HP=aKl[aKl.length-1],
bh=HP.value,
_oItem=HP.parentNode,
bO=QMMailCache,
Dv=bO.isRefresh(ao);

while(_oItem.tagName.toUpperCase()!="TABLE")
{
_oItem=_oItem.parentNode;
}

MLIUIEvent(HP,ao,eD);


var btj=HP.getAttribute("uw")=="1",
aKP=btj?ao.oPreUWMails:ao.oPreMails,
bpX=aKP.length,
bzR=Dv?2:1,

bxc=new Date()-new Date(parseInt(HP.getAttribute("totime")))<2592000000,

bzJ=!/^(LP|ZP)/.test(bh)&&bxc&&HP.getAttribute("unread")=="true"&&bpX<bzR&&!rdVer.log(bh);

if(bzJ&&rdVer.isPre(eD))
{
var aS,
Cf=HP.getAttribute("gid");

aS=rdVer.url(bh,eD,Ey,"",false,"",false,"",true);

if(aS)
{
aKP.push(aS);
}
}

if(getTop().gsReadedMailId==bh)
{
QMReadedItem.disp(_oItem);
recordReadedMailId(null);
}

}









function MLJump(bvw,bvJ,bj,ao)
{
var bAu=SN("maillistjump",ao.document),
aKi="_MlJuMp_",
Vz=parseInt(bvw)||0,
GF=parseInt(bvJ)||0;

function amZ(aL)
{
var kh=getTop().QMMenu(aL).S("txt"),
cV=parseInt(kh.value);

if(isNaN(cV))
{
kh.select();
return showError("\u8BF7\u8F93\u5165\u8DF3\u8F6C\u7684\u9875\u6570");
}

cV=Math.max(0,Math.min(cV-1,GF));
if(Vz==cV)
{
kh.select();
return showError("\u4F60\u8F93\u5165\u4E86\u5F53\u524D\u9875\u6570");
}

getTop().QMMenu(aL).close();
goUrlMainFrm([bj,'&page=',cV,'&loc=mail_list,,jump,0',getTop().isSelectAllFld(getMainWin())?"&selectall=1":""].join(''));
}

E(bAu,function(acb)
{
if(!acb.getAttribute(aKi))
{
acb.setAttribute(aKi,"1");
addEvents(acb,
{
click:function(_aoEvent)
{
var aV=unikey("mljump"),
_oPos=calcPos(acb),
cD=185,
cI=40;


new(getTop().QMMenu)(
{
sId:aV,
oEmbedWin:ao,
nWidth:cD,
nX:_oPos[1]-cD,
nY:bodyScroll(ao,"scrollHeight")-_oPos[2]<cI?(_oPos[0]-cI-13):_oPos[2],
bAutoClose:false,
oItems:
[
{
nHeight:cI,
sItemValue:MLJump.kj.replace({id:aV})
}
],
onshow:function()
{
this.S("txt").focus();
}
}
);

addEvent(getTop().QMMenu(aV).S("txt"),"keypress",function(_aoEvent)
{
var dT=_aoEvent.keyCode||_aoEvent.which;
if(dT===13)
{
amZ(aV);
}
else if((dT<48||dT>57)&&dT!=8&&dT!=9)
{
preventDefault(_aoEvent);
}
}
);

addEvent(getTop().QMMenu(aV).S("btn"),"click",function(_aoEvent)
{
amZ(aV);
}
);

preventDefault(_aoEvent);
}
}
);
}
}
);
}

MLJump.kj=T(
[
'<div style="position:absolute;width:160px;margin-left:-7px;">',
'<div class="addrtitle jumpmenusdjust" style="float:left;">\u8DF3\u8F6C\u5230\u7B2C <input id="txt" type="text" class="txt" style="width:30px;" /> \u9875</div>',
'<a id="btn" href="javascript:;" class="left button_gray_s" style="width:40px; margin:7px 0 0 5px; _display:inline;">&nbsp;\u786E\u5B9A&nbsp;</a>',
'</div>'
]
);







function initDropML()
{
function acm(_aoDom)
{
var _oPos=calcPos(_aoDom),
hK=S('dragtitle'),
uF=hK.offsetLeft,
sX=hK.offsetTop;
return(_oPos[1]>uF&&_oPos[3]<uF&&_oPos[2]>sX&&_oPos[0]<sX)?_aoDom:null;
}

function Vp(_aoDom,aLc)
{
if(_aoDom&&_aoDom.id.indexOf('folder_')>=0)
{
var cT=_aoDom.className,
aKR=cT.indexOf('toolbg')>-1;
if(aLc&&aKR)
{
setClass(_aoDom,cT.replace(/\btoolbg\b/g,''));
}
else if(!aKR&&!aLc)
{
setClass(_aoDom,cT+' toolbg');
}
}
}

var hK=S('dragtitle'),
aLj=S('OutFolder'),
aLP='inidrop',
yI=BaseMailOper.getInstance(getMainWin()),
aps=QMDragDrop,
aIx='mail_list';

if(aLj.getAttribute(aLP)=='true')
{

return false;
}
aLj.getAttribute(aLP,'true');
aps.delGroup(aIx);

var Hq=null,

asB=false,
rf=null,
ij=null,
kr=null,



aJU=/^([489]|personal|pop|tag)$/,

amz=new aps.DropTarget(
S('OutFolder'),
{





ondragover:function(uV)
{
if(rf==ij)
{
return;
}
var bPz=rf&&rf.id||'',
JX=ij&&ij.id||'',
arm=rf&&rf.getAttribute('dp'),
apN=ij&&ij.getAttribute('dp'),
aKa=ij&&ij.getAttribute('dr');


if(apN)
{
showFolders(apN,true,getTop());
}
if(arm&&arm!=apN)
{
showFolders(arm,false,getTop());
}

Vp(rf,1);
Vp(ij);


if(kr)
{
clearTimeout(kr);
}
asB=aKa&&!aJU.test(aKa);
kr=setTimeout(function(){
setClass(hK,asB?'drag_over':'drag_out');
kr=null;
},50);

rf=ij;
},





ondrop:function(uV)
{
if(!ij||!asB)
{
return;
}
var gX=yI.getMailInfo().sFid,
aV=ij.getAttribute('dr')||'';
ossLog("delay","all","stat=drag&opr="+aV);


if(aV=='6')
{

Vp(rf,1);
rf=null;
yI.apply('spammail');
dragML.aol=true;
return;
}
else if(aJU.test(aV))
{
Vp(rf,1);
rf=null;
return;
}
else if(aV.indexOf('tag_')>=0)
{

aV=aV.replace('tag','tid');
}
else if(aV=='starred')
{
aV='star';
}
else if((gX==5||gX==6)&&aV==5)
{
aV='predelmail';
dragML.aol=true;
}
else if(parseInt(aV))
{
aV={5:'delmail'}[aV]||'fid_'+aV;
}
else
{
return;
}
yI.apply(aV);
hK.setAttribute('na','true');
var oc=new qmAnimation(
{
from:100,
to:1
}
);
oc.play(
{
speed:"slow",
onaction:function(cg,iN)
{
setOpacity(hK,cg/100.0);
},
oncomplete:function(cg,anT)
{
show(hK,0);
setClass(hK,'drag_out');
setOpacity(hK,100);
Vp(rf,1);
rf=null;
}
});
}
},
function(uF,sX,uV){






if(gbIsIE)
{
var aF=getEventTarget(uV.event),
bts=/(folder_\w+_td|(personal|pop|tag)foldersDiv)/;
while(aF&&!bts.test(aF.id))
{
aF=aF.parentNode;
}
ij=aF;
}
else if(ij=acm(S('OutFolder')))
{


var gr=['personal','pop','tag'],
Vc=null,
aLd=null,
Ce,
i;
for(i=gr.length-1;i>=0;i--)
{
if(Vc=acm(S(gr[i]+'foldersDiv')))
{
break;
}
}

if(Vc=Vc||acm(S('SysFolderList')))
{

Ce=GelTags('li',Vc);
for(i=Ce.length-1;i>=0;i--)
{
if(aLd=acm(Ce[i]))
{
break;
}
}
}
ij=aLd||Vc;

}
return!!(rf||ij);
}
);
aps.addGroup(aIx,amz);
}

function dragML(_aoDom,hU)
{
if(!S('OutFolder')||!QMDragDrop)
{


return;
}
var ae=dragML,
aV='dragtitle',
hK=S(aV);
if(!hK)
{
insertHTML(getTop().document.body,'afterBegin','<div id="dragtitle" class="drag_out" style="display:none;"></div>');
hK=S(aV);
}
var Hq,

Uq=new QMDragDrop.Draggable(
_aoDom,
{

threshold:5,
oTitle:hK
},
{
ondragstart:function(_aoEvent)
{
ae.aol=hU.checked==true;
hU.checked=true;
var ay=getMainWin(),
yI=BaseMailOper.getInstance(ay),
bU=QMMailList.getCBInfo(ay);
QMMailList.selectedUI(bU);
yI.setMailInfo(bU);
hK.innerHTML=['\u9009\u4E2D ',bU.oMail.length,' \u5C01\u90AE\u4EF6'].join('');

ossLog("delay","all","stat=drag&c="+bU.oMail.length);









Hq=gbIsIE?[0,0,0,0]:calcPos(ay.frameElement);
hK.style.left=Hq[3]+_aoEvent.clientX+'px';
hK.style.top=Hq[0]+_aoEvent.clientY+'px';
hK.setAttribute('na','');
show(hK,1);

initDropML();
},
ondrag:function(_aoEvent)
{
hK.style.left=Hq[3]+_aoEvent.clientX+'px';
hK.style.top=Hq[0]+_aoEvent.clientY+'px';
},
ondragend:function(_aoEvent)
{
if(!hK.getAttribute('na'))
{

show(hK,0);
setClass(hK,'drag_out');
}
if(!ae.aol)
{
hU.checked=false;
var aYK=QMMailList.getCBInfo(getMainWin());
QMMailList.selectedUI(aYK);
}
}
}
);
QMDragDrop.addGroup('mail_list',Uq);


var aM=_aoDom.ownerDocument,
ay=aM.parentWindow||aM.defaultView,
acP=dragML.acP=dragML.acP||unikey('drag');
if(!ay[acP])
{
addEvent(ay,'unload',function(){
if(hK.releaseCapture)
{
hK.releaseCapture();
}
show(hK,0);
});
ay[acP]=1;
}
}




MLI.aKy=function(_aoEvent)
{
var _oTop=getTop(),
ae=arguments.callee,
FE=_aoEvent.clientX,
DK=_aoEvent.clientY,
bE=getEventTarget(_aoEvent);
while(bE&&bE.tagName.toUpperCase()!="TD")
{
bE=bE.parentNode;
}
if(ae.vT)
{
clearTimeout(ae.vT);
ae.vT=0;
}

if(_aoEvent.type=="mouseout")
{
_oTop.QMTip&&_oTop.QMTip.showMailList(0,bE.ownerDocument);
return;
}

ae.vT=setTimeout(function(){
var aMu=_oTop.GelTags("b",bE.parentNode.cells[2]),
aKB=aMu[aMu.length-1];

if(!_oTop.QMTip||!aKB||(ae.xd==FE&&ae.vR==DK))
{
return;
}

ae.xd=FE;
ae.vR=DK;

var CK=aKB.innerHTML.replace(/^\&nbsp;-\&nbsp;/,"").replace(/\&nbsp;/gi,"&nbsp; ").replace(/&lt;br\/?&gt;/g,'<br/>');
_oTop.QMTip.showMailList(1,bE.ownerDocument,CK,FE,DK);
},250);
};





function MLI_A(ei)
{
var Lx=GelTags("table",ei),
bvM=Lx.length,

_oItem=Lx[bvM-1],
bh=_oItem.getAttribute("mailid");

if(QMMailCache.hasData(bh))
{
if(!QMMailCache.isRefresh(window))
{
setClass(_oItem,"i M");
}
else
{
QMMailCache.delData(bh);
}
}

listMouseEvent(_oItem);

addEvent(_oItem,"selectstart",preventDefault);
}










function aLm(hU,Bb,ty,acx)
{
if(!(hU&&hU.type=="checkbox"))
{
return false;
}

if(ty==null)
{
return hU.getAttribute("unread")=="true";
}

if(!Bb)
{
Bb=hU.parentNode.parentNode.parentNode.parentNode;
}

if((hU.getAttribute("unread")=="true")==!!ty
&&!acx)
{
return ty;
}

var Cf=hU.getAttribute("gid");
if(Cf)
{
setGroupUnread(Cf,getGroupUnread(Cf)-1);
setGroupUnread("gall",getGroupUnread("gall")-1);
}

hU.setAttribute("unread",ty?"true":"false");

setClass(Bb,
[ty?"i F":"i M",hU.checked?" B":""].join(""));
setClass(GelTags("table",Bb)[0],ty?"i bold":"i");


var aKk=GelTags("div",Bb)[1];
if(!/(s[016789]bg)|(Rw)/.test(aKk.className))
{
var anP=acx?"r":hU.getAttribute("rf"),
amE=hU.getAttribute("isendtime"),
cT="Rr";

if(amE)
{
cT=amE=="0"?"Rc":"Ti";
}
else if(ty)
{
cT="Ru";
}
else if(anP)
{
cT=anP=="r"?"Rh":"Rz";
}

setClass(aKk,"cir "+cT);
}

return ty;
}






function bve(hU)
{
return aLm(hU);
}









function aLk(hU,Bb,ty,acx)
{
return aLm(hU,Bb,ty,acx);
}








function aJD(hU,Bb)
{
if(!hU||!hU.getAttribute("gid"))
{
return false;
}

var aLh=GelTags("b",Bb)[0],
JB=aLh&&aLh.parentNode;

if(JB&&JB.className=="new_g")
{
JB.style.visibility="hidden";
return true;
}

return false;
}






function getMailListInfo()
{
var cF=getMainWin(),
aLG=S("_ut_c",cF),
aLu=S("_ur_c",cF),
aJn=S("_ui_c",cF);

return{
totle:(aLG&&parseInt(aLG.innerHTML))||0,
unread:(aLu&&parseInt(aLu.innerHTML))||0,
star:(aJn&&parseInt(aJn.innerHTML))||0
};
}






function ciw(dB,aDF)
{
var GV=S("selectAll",dB);

if(GV)
{
GV.setAttribute("totalcnt",aDF);
E(GelTags("div",GV),
function(bE,dp)
{
var adL=bE.getAttribute("un");
if(adL=="selected")
{
GelTags("span",bE)[0].setAttribute("end",aDF);
}
else if(adL=="unselect")
{
var bG=bE.innerHTML;
bE.innerHTML=bG.replace(/\u5168\u90E8.*\u5C01/gi,"\u5168\u90E8&nbsp;"+aDF+"&nbsp;\u5C01");
}
}
);
}
}








function setMailListInfo(Es,zi,aom)
{
var cF=getMainWin(),
jb=true,
asw=S("_ur",cF),
boV=S("_ui",cF),
bwK=S("_ut",cF),
dL;

if(!isNaN(Es=parseInt(Es)))
{
if(!!(dL=S("_ur_c",cF)))
{
dL.innerHTML=Math.max(0,Es);
show(asw,Es>0);
}
else
{
jb=false;
}
var acf=S("tip_unread",cF);
if(acf)
{
acf.innerHTML=Es<0?parseInt(acf.innerHTML)+Es:Es;
show(acf,Es);
}
}

if(!isNaN(zi=parseInt(zi)))
{
zi=Math.max(0,zi);
if(!!(dL=S("_ui_c",cF)))
{
dL.innerHTML=zi;
show(boV,zi!=0);
}
else
{
jb=false;
}
}

if(!isNaN(aom=parseInt(aom)))
{
zi=Math.max(0,aom);
if(!!(dL=S("_ut_c",cF)))
{
dL.innerHTML=zi;
show(bwK,zi!=0);

getTop().ciw(cF,zi);
}
else
{
jb=false;
}
}

show(
S("_uc",cF),
isShow(asw)

);
show(
S("_ua",cF),
isShow(asw)

);

return jb;
}








function readMailFinish(aJ,aw,eD,btf)
{
var cF=getMainWin(),
asE=S("load_"+aJ,cF),
_oItem,ph;

QMMailCache.addData(aJ);

if(asE)
{
show(asE,false);

_oItem=asE.parentNode.previousSibling;
ph=GelTags("input",_oItem)[0];
}
else
{
var iA=GelTags("input",cF.document);
for(var i=0,_nLen=iA.length;i<_nLen;i++)
{
if(iA[i].type=="checkbox"
&&iA[i].value==aJ)
{
ph=iA[i];
break;
}
}
_oItem=ph;
while(_oItem.tagName.toUpperCase()!="TABLE")
{
_oItem=_oItem.parentNode;
}
}


var AK=GelTags("table",_oItem),
aLK=false;
for(var aN=AK.length-1;aN>=0;aN--)
{
if(AK[aN].getAttribute("tagid"))
{
aLK=true;
break;
}
}

aJD(ph,_oItem);

if(ph&&bve(ph))
{
aLk(ph,_oItem,false);
setMailListInfo(getMailListInfo().unread-1);


if(ph.getAttribute('star')=='1')
{
setFolderUnread('starred',getFolderUnread('starred')-1);
}
var adH=ph.getAttribute("ssystag");
if(adH&&/system:1\|/.test(adH))
{
setFolderUnread("sysmsg",getFolderUnread("sysmsg")-1);
}
if(adH&&/system:0\|/.test(adH))
{
setFolderUnread("notsysmsg",getFolderUnread("notsysmsg")-1);
}

if(eD&&parseInt(eD)>0&&!aLK)
{
setFolderUnread(eD,btf
?getGroupUnread("gall")
:getMailListInfo().unread);
}
else
{
reloadLeftWin();
}
}
}








function checkMail(pJ)
{
if(pJ=="")
{
showError("\u8BF7\u586B\u5199\u90AE\u7BB1\u5E10\u53F7");
return false;
}

var bXF="([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)";
if(!new RegExp(bXF,"ig").test(pJ))
{
showError("\u60A8\u8F93\u5165\u7684\u90AE\u7BB1\u5730\u5740\u4E0D\u6B63\u786E\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165");
return false;
}

return true;
}








function checkAndSubmit(aL)
{
var bI=S(aL);

if(!checkMail(trim(bI.value)))
{
bI.focus();
return false;
}

submitToActionFrm(bI.form);
}






function pushToDialogList(aL)
{
var _oTop=getTop();

if(!_oTop.goDialogList)
{
_oTop.goDialogList=new _oTop.Object;
}

if(aL)
{
_oTop.goDialogList[aL]=true;
}
}





function showDialogNewReadMail(cby,bQf,xq,aJ)
{
new(getTop().QMDialog)({
sId:"addnewremind_qqmail",
sTitle:"\u65B0\u5EFA\u63D0\u9192",
sUrl:T("/cgi-bin/read_reminder?linkid=%linkid%&linktitle=%linktitle%&sid=%sid%&t=remind_edit&from=%from%","%").replace({
sid:getSid(),
linkid:cby,
linktitle:bQf,
from:xq
}),
nWidth:450,
nHeight:360
})
aJ&&rdVer(aJ,1);
}

function setRemindSpan(aJ,ao)
{


getTop().S('remind_edit_'+aJ,ao).innerHTML=(getTop().reminddetail["mailid:"+aJ]||"")
.replace(/linktitle=.*&sid=/g,function(bJ)
{
return bJ.replace(/\'/g,"&#039;");
}
);
}


function showSimpleRuleFilter(dh)
{
if(!dh)
{
showError("\u65E0\u6CD5\u83B7\u53D6\u53D1\u4EF6\u4EBA\u5730\u5740\uFF0C\u4E0D\u80FD\u521B\u5EFA\u89C4\u5219");
return;
}
var eE=new(getTop().QMDialog)(
{
sId:"addnewfilter_qqmail",
sTitle:"\u5FEB\u6377\u521B\u5EFA\u6536\u4FE1\u89C4\u5219",
sUrl:T("/cgi-bin/setting2?sid=$sid$&Fun=GetFolderList&CurFilterID=0&t=readmail_filter&fromaddr=$fromaddr$").replace({
sid:getSid(),
fromaddr:dh
}),
nWidth:410,
nHeight:240,
onshow:function()
{
var axO=this.getDialogWin();
waitFor(
function()
{
try
{
return S("jump",axO);
}
catch(e){}
},
function(ba)
{
if(ba)
{
function dKd(bpa)
{
if(bpa.length)
{
bpa.push({
bDisSelect:true,
nHeight:10,
sItemValue:'<hr/>'
});
}
bpa.push({
bDisSelect:false,
nHeight:22,
sId:"new",
sItemValue:'\u65B0\u5EFA\u6587\u4EF6\u5939...'
});

return bpa;
};
function ctK()
{
var MB=buB.get(2);

return MB=="new"?"-1":MB;
};
function cWe()
{
buB.set(aen[0].sId,2);
};
function dWR(aD,bJ)
{
var csF={
bDisSelect:false,
nHeight:22,
sId:bJ,
sItemValue:aD
};

if(aen.length==1)
{
aen=cfP(aen,{
bDisSelect:true,
nHeight:10,
sItemValue:'<hr/>'
},0);
aen=cfP(aen,csF,0);
}
else
{

aen=cfP(aen,csF,aen.length-2)
}
buB.update({
oMenu:{
oItems:aen
}
});
buB.set(bJ,2);
};
function cfP(fl,bd,pW)
{
({}).toString.call([])!="[object Array]"&&(bd=[bd]);
return fl.slice(0,pW).concat(bd).concat(fl.slice(pW,fl.length));
};
function erW()
{

promptFolder({
type:'folder',
bAlignCenter:true,
width:410,
height:237,
style:"createNewFolder",
onreturn:function(aD)
{
QMAjax.send(
"/cgi-bin/foldermgr",
{
method:"POST",
content:["sid=",getSid(),"&fun=new&from=simple&ef=js&resp_charset=UTF8&name=",aD].join(''),
onload:function(ba,wL)
{
try
{
if(ba)
{
var av=eval("("+wL+")");
if(av.errcode=="0")
{
dWR(aD,av.folderid);
reloadLeftWin()
showInfo("\u5DF2\u6210\u529F\u65B0\u5EFA\u6587\u4EF6\u5939");
}
else
{
showError(av.errmsg);
}
return;
}
}
catch(e)
{}
showError("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
}
}
);
}
});
};

var aen=dKd(axO.oUserFolder)
buB=new QMSelect({
oContainer:S("selectfolder",axO),


oMenu:{
nWidth:"auto",
nMaxWidth:180,
nMaxItemView:4,
oItems:aen 
},
onselect:function(bd)
{
if(bd.sId=="new")
{
erW();
return true;
}
}
});

addEvent(S("jump",axO),"click",function()
{
eE.close();
var kd=ctK();
kd=="-1"&&(kd="");
getMainWin().location.replace(
axO.location.href
.replace("&Fun=GetFolderList","&Fun=Create")
.replace("&t=readmail_filter","&loc=filter,simple,0,0&folderid="+kd)
);
}
);
addEvent(S("confirm",axO),"click",function()
{
var kd=ctK(),
cNr=S("oldmail",axO).checked?1:0;

if(kd=="-1")
{
showError("\u60A8\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u65B0\u6587\u4EF6\u5939");
cWe();
}
else if(!kd)
{
showError("\u8BF7\u9009\u62E9\u6587\u4EF6\u5939");
cWe();
}
else
{
QMAjax.send(
"/cgi-bin/foldermgr",
{
method:"POST",
content:["sid=",getSid(),"&fun=addfilter&from=simple&ef=js&action=move&oldmail=",cNr,"&sender=",dh,"&folderid=",kd].join(''),
onload:function(ba,wL)
{
try
{
if(ba)
{
var av=eval("("+wL+")");
if(av.errcode=="0")
{
if(cNr&&av.affected>0)
{
showInfo(TE([
'\u64CD\u4F5C\u6210\u529F\uFF0C',
'$@$if($num$>0)$@$',
'\u79FB\u52A8\u4E86$num$\u5C01\u90AE\u4EF6\u3002',
'$@$else$@$',
'\uFF0C\u60A8\u6CA1\u6709\u9700\u8981\u79FB\u52A8\u6216\u6807\u8BB0\u7684\u90AE\u4EF6\u3002',
'$@$endif$@$',
'<a href="/cgi-bin/mail_list?sid=$sid$&folderid=$fid$&page=0"',
'style="color:white" onclick="getTop().hiddenMsg();" target="mainFrame">',
'[\u67E5\u770B]',
'</a>']).replace({
sid:getSid(),
fid:av.folderid,
num:av.affected
}),30000);
}
else
{
showInfo("\u5DF2\u6210\u529F\u65B0\u5EFA\u89C4\u5219");
}


ossLog("realtime","all","loc=filter,simple,0,1");
eE.close();
}
else
{
showError(av.errmsg);
}
return;
}
}
catch(e)
{}
showError("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
}

}
);
}
}
);
addEvent(S("cancel",axO),"click",function()
{
eE.close();
}
);
}
else
{
showError("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002");
}
}
);
}
});

}
function closeSimpleRuleFilter(gZ)
{
gZ&&gZ();
QMDialog("addnewfilter_qqmail").close();
}



function applyRules(cZH)
{
confirmBox({
title:"\u6536\u4FE1\u89C4\u5219",
msg:"\u60A8\u662F\u5426\u8981\u5BF9\u6536\u4EF6\u7BB1\u7684\u5DF2\u6709\u90AE\u4EF6\u6267\u884C\u6B64\u89C4\u5219?",
confirmBtnTxt:'\u662F',
cancelBtnTxt:'\u5426',
onreturn:function(ba)
{
if(ba)
{
QMAjax.send(T("/cgi-bin/exbook_mgr?sid=$sid$&fname=&optype=mailfilter").replace(
{
sid:getSid()
}),
{
method:"GET",
headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},
onload:function(ba,bK)
{
show(S("spam",getMainWin()),0);
showInfo("\u6210\u529F\u5BF9\u6536\u4EF6\u7BB1\u5DF2\u6709\u90AE\u4EF6\u6267\u884C\u6B64\u89C4\u5219!");
callBack(cZH);
}
});
}
else
{
callBack(cZH);
}
}
});
}

function submitSwitchForm()
{
var eH=getTop().S("frmSwitch");
eH&&eH.submit();
}
















function getDomain(bVx)
{
return[["foxmail.com","qq.com","biz"],["Foxmail.com","QQ","\u817E\u8BAF"]][
bVx?1:0][/,7$/.test(getSid())?2:(location.href.indexOf("foxmail.com")>-1?0:1)];
}
var GetDomain=getDomain;





function getSid()
{
return getTop().g_sid
||(S("sid")?S("sid").value:location.getParams(getTop().location.href)["sid"]);
}
var GetSid=getSid;





function getUin()
{
return getTop().g_uin;
}





function getPaths()
{

var Xh=
{
images_path:"/zh_CN/htmledition/images/",
js_path:"/zh_CN/htmledition/js/",
css_path:"/zh_CN/htmledition/css/",
style_path:"/cgi-bin/getcss?sid="+getSid()+"ft=",
swf_path:"/zh_CN/htmledition/swf/",

stationery_path:"http://res.mail.qq.com/zh_CN/",
card_path:"http://res.mail.qq.com/zh_CN/",
mo_path:"http://res.mail.qq.com/zh_CN/",
base_path:"/",
skin_path:"0"
};
for(var k in Xh)
{
Xh[k]=trim(getTop()[k])||Xh[k];
}
return Xh;
}







function getPath(aw,bOg)
{














aw=="image"&&(aw+="s");
var io=getPaths()[aw+"_path"]||"";
if(io)
{
if(bOg&&aw!="skin"&&io.indexOf("http")!=0)
{
io=[location.protocol,"//",location.host,io].join("");
}
}
return io;
}








function getRes(abl)
{
return T(abl).replace(getPaths());
}






function getFullResSuffix(gS)
{
if(!getTop().gLn)
{
return gS;
}
var _sFile,ub,aIp=".j"+"s";
if(gS.indexOf(aIp)>0)
{
_sFile=gS.substr(0,gS.indexOf(aIp));
ub=aIp;
}
else if(gS.indexOf(".css")>0)
{
_sFile=gS.substr(0,gS.indexOf(".css"));
ub=".css";
}
else if(gS.indexOf(".html")>0)
{
_sFile=gS.substr(0,gS.indexOf(".html"));
ub=".html";
}
if(_sFile.length>0&&getTop().gLn[_sFile])
{
return _sFile+getTop().gLn[_sFile]+ub;
}
else
{
return gS;
}
}












function outputJsReferece(eS,pQ,ao)
{
var io=eS||outputJsReferece.afW,
_oFileList=pQ||outputJsReferece.mQ,
ay=ao||window,
bS=T(['<script language="JavaScript" src="$file$',(eS?'':'?r='+Math.random()),'"></','script>']),
wu=[];
outputJsReferece.afW=io;
outputJsReferece.mQ=_oFileList;

function bVO(kf)
{
var _sFile=trim(kf||""),
gl=/[0-9a-fA-F]{6}\.js$/.test(_sFile)?kf.substr(0,kf.length-9):kf.split(".")[0];

if(gl&&(eS||!ay[gl+"_js"]))
{
wu.push(bS.replace(
{
file:io+kf
}
));
}
}
E(_oFileList,bVO);
return wu.join("");
}





function runUrlWithSid(bj)
{
try
{

getTop().getHttpProcesser().src=T('$url$&sid=$sid$&r=$rand$').replace(
{
url:bj,
sid:getSid(),
rand:Math.random()
}
);
}
catch(bf)
{
}
}




























function createBlankIframe(ao,cd)
{
cacheByIframe(cd&&cd.defcss==false
?[]
:[["css","",getRes("$css_path$comm11427c.css")],["css",getPath("style"),"skin"]],
extend(
{
className:"menu_base_if",
transparent:false,
destroy:false
},
cd,
{
win:ao,
header:["<script>",getTop.toString().replace(/[\r\n]/g,""),"<\/script>",cd&&cd.header||""].join(""),
onload:function(ao)
{
if(this.getAttribute("cbi_inited")!="true")
{
cd&&cd.transparent&&
(this.contentWindow.document.body.style.background="transparent");
this.setAttribute("cbi_inited","true");
}
callBack.call(this,cd&&cd.onload,[ao]);
}
}
)
);
}






function createActionFrame(ao)
{
return createBlankIframe(ao,
{
id:"actionFrame",
defcss:false,
onload:actionFinishCheck
}
);
}
















function hideEditorMenu()
{
if(getTop().QMEditor)
{
getTop().QMEditor.hideEditorMenu();
}
}





function hideMenuEvent(_aoEvent)
{
var ee=getEventTarget(_aoEvent),
abU=getTop().QMMenu&&getTop().QMMenu();
for(var i in abU)
{
!abU[i].isContain(ee)&&abU[i].close();
}

try
{
getTop().QQPlusUI.hideMenuEvent(ee);
}
catch(BK)
{
}
}






















function confirmBox(az)
{

var	Ho=2,
vM=az.defaultChecked||false,
aDq=az.confirmBtnTxt||"\u786E\u5B9A",
aCY=az.cancelBtnTxt||"\u53D6\u6D88",
ajx=az.neverBtnTxt;



new(getTop().QMDialog)({
bAlignCenter:az.bAlignCenter,
sId:az.id||"QMconfirm",
sTitle:az.title||"\u786E\u8BA4",
sBodyHtml:TE([
'<div class="$sStyle$">',
'$@$if($sType$=="custom")$@$',
'$msg$',
'$@$else$@$',
'<div class="cnfx_content">',
'<span class="dialog_icon icon_info_b"></span>',




'<div class="dialog_f_c">$msg$</div>',
'</div>',
'<div class="cnfx_status" style="display:$statusdisp$;">',
'<input id="recordstatus" class="cnfx_status_checkbox" type="checkbox" $checked$/><label for="recordstatus">$recordinfo$</label>',
'</div>',
'$@$endif$@$',
'</div>'
]).replace({
sStyle:az.style||'',
sType:az.sType||"",

msg:az.msg,
caceldisp:az.mode=="alert"?"none":"",
imgdisp:az.mode=="prompt"?"none":"block",
recordinfo:az.recordInfo,
statusdisp:az.enableRecord?"":"none",
checked:az.defaultChecked?"checked":"",


confrim:aDq,
confirmcss:getAsiiStrLen(aDq)>5?"":"wd2",
cancel:aCY,
cancelcss:getAsiiStrLen(aCY)>5?"":"wd2",
never:ajx,
neverdisp:ajx?'':'none',
nevercss:getAsiiStrLen(ajx)>5?"":"wd2"
}),
sFootHtml:T([
'<div class=" txt_right cnfx_btn">',
'<input class="$confirmcss$ btn confirm" type="button" id="confirm" value="$confirm$">',
'<input class="$cancelcss$ btn cancel" type="button" id="cancel" style="display:$caceldisp$;" value="$cancel$">',
'<input class="$nevercss$ btn" type="button" id="never" style="display:$neverdisp$;" value="$never$">',
'</div>'
]).replace({
caceldisp:az.mode=="alert"?"none":"",
confirm:aDq,
confirmcss:getAsiiStrLen(aDq)>5?"":"wd2",
cancel:aCY,
cancelcss:getAsiiStrLen(aCY)>5?"":"wd2",
never:ajx,
neverdisp:ajx?'':'none',
nevercss:getAsiiStrLen(ajx)>5?"":"wd2"

}),


onload:function(){
var bQ=this,
agP=bQ.S("confirm"),
anO=bQ.S("cancel"),
amW=bQ.S("never");








addEvents([agP,anO,amW],
{
click:function(_aoEvent)
{
var _oDom=getEventTarget(_aoEvent);
if(_oDom==agP)
{
if(bQ.S("recordstatus"))
{
vM=bQ.S("recordstatus").checked;
}
Ho=1;
}
else if(_oDom==amW)
{
Ho=3;
}
bQ.close();
}
}
);
callBack.call(bQ,az.onload);
},
onshow:function(){

gbIsMac||this.S("confirm").focus();
callBack.call(this,az.onshow);
},
onclose:function(){
callBack.call(this,az.onclose)
},
onbeforeclose:function(){
try
{

callBack.call(this,az.onreturn,[Ho==1,vM,Ho]);
}
catch(bf)
{
}
return true;
}
});
}










function alertBox(az)
{
confirmBox(extend({mode:"alert"},az))
}













function promptBox(az)
{
var amA=false,
cci=az.onreturn;
az.onreturn=function(ba)
{
var ae=this;
callBack.call(ae,cci,[amA||ba,ae.S("txt").value]);
};
az.msg=T(
[
'<div class="dialog_txt">',
'<div style="margin:0 10px 10px;" class="bold">$msg$</div>',
'<div style="margin:10px 10px 5px;"><input type="text" id="txt" style="width:352px;" class="txt" value="$defaultValue$"/></div>',
'<div style="margin:0 10px 10px;" class="f_size addrtitle">$description$</div>',
'</div>',
]
).replace(az);
confirmBox(extend(
{
sType:"custom",
height:160,
onload:function()
{
var ae=this;
addEvent(ae.S("txt"),"keydown",function(_aoEvent)
{
if(_aoEvent.keyCode==13)
{
amA=true;
ae.close();
}
}
);
},
onshow:function()
{
this.S('txt').select();
this.S("txt").focus();
}
},az)
);
}











function loadingBox(az)
{
if(!callBack(az.oncheck))
{
var cJ=new QMDialog(
{
sId:"LoAdINgBOx",
sTitle:az.model+"\u6A21\u5757\u52A0\u8F7D\u4E2D...",
nWidth:400,
nHeight:200,
sBodyHtml:T(
[
'<div style="text-align:center;padding:58px;">',
'<img id="load" src="$images_path$ico_loading2104474.gif">',
'<span id="err" style="display:none;">$model$\u6A21\u5757\u52A0\u8F7D\u5931\u8D25</span>',
'</div>'
]
).replace(extend(az,{images_path:getPath("image")})),
onclose:function()
{
cJ=null;
}
}
);
if(az.js)
{
var _oFiles=[];
E(typeof az.js=="string"?[az.js]:az.js,function(kf)
{
_oFiles.push(kf);
}
);
loadJsFileToTop(_oFiles);
}
waitFor(
function()
{
return callBack(az.oncheck);
},
function(ba)
{

if(!cJ)
{
return;
}
if(!ba)
{
show(cJ.S("load"),false);
show(cJ.S("err"),true);
}
else
{
cJ.close(true);
callBack(az.onload);
}
}
)
}
else
{
callBack(az.onload);
}
}





















(function()
{
var _oTop=getTop();

function bMC(aEa,aqK)
{
var aEa="weixinCss";

if(!_oTop.S(aEa))
{
var Wf=_oTop.document.createElement("style");
Wf.type="text/css";
Wf.id=aEa;
if(_oTop.gbIsIE)
{
Wf.styleSheet.cssText=aqK;
}
else
{
Wf.innerHTML=aqK;
}
_oTop.document.getElementsByTagName("head")[0].appendChild(Wf);
}
}

var bMF=TE([
'<div id="mask" class="editor_mask opa50Mask editor_maskAtt" ></div>',
'<a id="close" class="wx_c_bar" href="javascript:;" title="\u5173\u95ED" style="$@$if($noclose$)$@$display:none$@$endif$@$;"><span class="wx_close"></span></a>',

'<div id="out" style="z-index:1000;position: absolute;width:$width$%;height:$height$%;margin-left:$offsetLeft$%;margin-top:$offsetTop$%;outline:0;" tabindex="-1" hidefocus="hidefocus">',
'<div id="body" style="width:100%;height:100%">$html$</div>',
'</div>'
]);


function maskPanel(ap)
{
bMC(ap.sId,ap.sCssRule);

new QMPanel(
{
oEmbedWin:_oTop,
sStyle:"position:absolute;width:100%; height:100%; left:0; top:0; margin-top:-2px",
nWidth:"auto",
nHeight:"auto",
sId:"weixinnote",
sClassName:"qr_previewer",
sBodyHtml:bMF.replace(
{
noclose:ap.bNoCloseBtn,
html:ap.sBodyHtml,
images_path:getPath("image"),
offsetTop:(100-ap.nHeightPercent)/2,
offsetLeft:(100-ap.nWidthPercent)/2,
width:ap.nWidthPercent,
height:ap.nHeightPercent
}),
onclose:ap.onclose,
onload:function()
{
var afD=this;
afD.S("mask").onclick=afD.S("close").onclick=function()
{
afD.close();
}
ap.onload&&callBack.call(afD,ap.onload,[afD]);
}
}
);
}
window.maskPanel=maskPanel;
})();




function getQMPluginInfo(bJR)
{
var b=
(gbIsWin&&
(


(gbIsFF&&gsFFVer.split(".")[0]>=3&&(gsFFVer.split(".")[1]>0||gsFFVer.split(".")[2]>=8||parseInt(navigator.buildID.substr(0,8))>=20090701))
||(gbIsChrome&&(""+gsChromeVer).split('.')[0]>=6)
||(gbIsSafari&&gsAgent.indexOf("se 2.x metasr 1.0")<0)
||(gbIsOpera)
||(gbIsQPlus)
||(gbIsQBWebKit&&getQMPluginInfo.amq(gsQBVer,"6.5")>0)
)
)
||(gbIsMac&&getQMPluginInfo.amq(gsMacVer,""+bJR)>=0&&
(
gbIsFF&&parseFloat(gsFFVer)>=3.6
||gbIsChrome&&parseFloat(gsChromeVer)>=8
||gbIsSafari&&parseFloat(gsSafariVer)>=5
||gbIsQBWebKit
)
);
return b;
}







getQMPluginInfo.amq=function(dbP,daV)
{
var bIK=(""+dbP).split("."),
bGI=bIK.length,
bIL=(""+daV).split("."),
bIU=bIL.length;

for(var i=0;i<bGI&&i<bIU;i++)
{
var bGS=parseInt(bIK[i]),
bGU=parseInt(bIL[i]);
if(bGS==bGU)
{
continue;
}
return bGS>bGU?1:-1;
}
if(i<bGI)
{
return 1;
}
if(i<bIU)
{
return-1
}
return 0;
};






var QMAXInfo=
{
aZs:
{
path:"/activex/",
cab:["TencentMailActiveX.cab","TencentMailActiveX_2.cab"],
exe:"TencentMailActiveXInstall.exe",

obj:[
["TXGYMailActiveX.ScreenCapture","TXGYMailActiveX.UploadFilePartition",
"TXGYMailActiveX.Uploader","TXFTNActiveX.FTNUpload","TXGYMailActiveX.DropFile"]],
available:["ScreenCapture","Uploader","FTNUpload","DropFile","UploadFilePartition"],
lastVer:["1.0.1.47","1.0.1.29","1.0.1.47","1.0.0.29","1.0.0.47"],
miniVer:[(getDomain()=="foxmail.com")?"1.0.0.5":"1.0.1.28",
"1.0.1.28","1.0.1.28","1.0.0.13","1.0.0.7"]
},

aRF:
{
path:"/xpi/",
xpi:"TencentMailPlugin.xpi",

obj:["ScreenCapture","","Uploader","FTNUpload",""],
available:["ScreenCapture","Uploader","FTNUpload"],
name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in","QQMail Plugin"],




type:(function()
{
var Az="application/txftn",
aWm="application/txftn-webkit";
return["application/x-tencent-qmail","","application/x-tencent-qmail",
(typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes[aWm]?aWm:Az,
"application/x-tencent-qmail"];
})(),
lastVer:["1.0.1.47","","1.0.1.47","1.0.0.3","1.0.0.0"],
miniVer:["1.0.1.28","","1.0.1.28","1.0.0.1","1.0.0.0"]
},

ayR:
{
path:"/crx/",
crx:"TencentMailPlugin.crx",
exe:"QQMailWebKitPlugin.exe",
obj:["ScreenCapture","","Uploader","FTNUpload",""],
available:["ScreenCapture","FTNUpload"],
name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in",""],
type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","application/txftn-webkit",""],
lastVer:["1.0.1.47","","1.0.1.47","1.0.0.3",""],
miniVer:["1.0.1.28","","1.0.1.28","1.0.0.1",""]
},

aQz:
{
path:"/crx/",
pkg:"TencentMailPluginForMac.pkg",
obj:["ScreenCapture","","Uploader","FTNUpload",""],
available:["ScreenCapture","Uploader"],
name:["QQMailPlugin","","QQMailPlugin","Tencent FTN Plug-in",""],
type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","application/txftn",""],
lastVer:["1.0.1.34","","1.0.1.34","1.0.0.3",""],
miniVer:["1.0.1.34","","1.0.1.34","1.0.0.3",""]
},







mbAblePlugin:getQMPluginInfo("10.6.8"),



mbAbleUsePlugin:getQMPluginInfo("10.6.8"),




ccY:true,

getTitle:function()
{
return gbIsIE?"\u63A7\u4EF6":"\u63D2\u4EF6";
},




getinfo:function()
{
if(QMAXInfo.mbAblePlugin)
{
if(gbIsWin)
{
if(gbIsIE)
{
return QMAXInfo.aZs.available;
}
if(gbIsFF)
{
return QMAXInfo.aRF.available;
}
if(gbIsChrome||gbIsSafari||gbIsOpera||gbIsQBWebKit)
{
return QMAXInfo.ayR.available;
}
}
if(gbIsMac)
{
return QMAXInfo.aQz.available;
}
}

return[];
},




bPr:function()
{








},











installer:function(aw,oU)
{
var _oInfo=this.get("whole",oU),
gl="";
if(/^online/.test(aw))
{
if(_oInfo.cab)
{
gl=this.get("cab");
}
else
{
gl=_oInfo.xpi||(gbIsChrome&&parseInt(gsChromeVer)<21&&_oInfo.crx);
}
}
else if(/^download/.test(aw)&&_oInfo)
{
if(oU=="FF"||(!oU&&gbIsFF))
{
_oInfo=this.get("whole","WebKit");
}
gl=_oInfo.exe||_oInfo.pkg;
}
if(gl)
{
var cuw=gl.split('.');
gl=[[cuw[0]].concat(_oInfo.lastVer[0].split('.')).join("_"),cuw[1]].join('.');
}
if(gl&&/Abs$/.test(aw))
{
gl=_oInfo.path+gl;
}
return gl;
},







get:function(amt,VR)
{
if(!VR)
{
gbIsIE&&(VR="IE");
gbIsFF&&(VR='FF');
(gbIsChrome||gbIsSafari||gbIsOpera||gbIsQBWebKit)&&(VR="WebKit");
!gbIsIE&&gbIsMac&&(VR="mac");
}

var jz={
IE:this.aZs,
FF:this.aRF,
chrome:this.ayR,
WebKit:this.ayR,
mac:this.aQz
}[VR];

if(!this.ccY)
{
this.bPr();
}

if(amt=="whole")
{
return jz;
}
else if(amt=="cab")
{
var lS=createActiveX(0),
gl=lS?"":"_2.dll";
try{gl=lS.GetDLLFileName();}catch(e){}
return jz["cab"][gl&&gl.indexOf("_2.dll")!=-1?0:1];
}

return jz[amt];
}
};






function createActiveX(zP,ao)
{
	if(!gbIsIE)
	{
		return createPlugin(zP,false,ao);
	}

	if(zP>=0&&zP<=4)
	{
		var qR=QMAXInfo.get("obj");
		for(var i=0,len=qR.length;i<len;i++)
		{

			if(zP==3)
			{
				try
				{
					new ActiveXObject(qR[i][0]);
				}
				catch(bf)
				{
				}
			}
			try
			{
				return new ActiveXObject(qR[i][zP]);
			}
			catch(bf)
			{
			}
		}
	}
	return null;
}








function detectActiveX(zP,Lt,aHh,erO)
{
if(!gbIsIE)
{
return detectPlugin(zP,Lt,aHh,erO);
}

var Sq=typeof(aHh)=="undefined",
CY=false,
wY=Sq?createActiveX(zP)
:aHh,
hG=getActiveXVer(wY);




if(wY&&hG)
{

if(Lt!=1&&Lt!=2)
{
CY=true;
}




else if(getQMPluginInfo.amq(hG,QMAXInfo.get(Lt==1?"miniVer":"lastVer")[zP])>=0)
{
CY=true;
}

if(Sq)
{
delete wY;
wY=null;
}
}
return CY;
}






function getActiveXVer(bA)
{
if(!gbIsIE)
{
return getPluginVer(bA);
}

var hG="",
wY;
try
{
wY=typeof(bA)=="number"?createActiveX(bA):bA;
hG=wY&&(wY.version
?wY.version
:"1.0.0.8")||"";
}
catch(bf)
{
}

return hG;
}






function checkInstallPlugin(oH)
{

if(!QMAXInfo.mbAbleUsePlugin)
{
return false;
}

try
{

navigator.plugins.refresh(false);
}
catch(e)
{
}

var aQ=QMAXInfo.get("name")[oH],
aX=QMAXInfo.get("type")[oH],
zI=navigator.plugins;
if(zI&&aQ)
{
for(var i=zI.length-1;i>=0;i--)
{
for(var j=zI[i].length-1;j>=0;j--)
{
if(zI[i].name.indexOf(aQ)!=-1&&zI[i][j].type==aX)
{

if(oH!=3&&(gsAgent.indexOf("vista")>-1||/nt 6/gi.test(gsAgent))&&aX=="application/x-tencent-qmail")
{
var aRv=zI[i].description.split('#')[1];
if(!aRv)
{

continue;
}
}

var aRv=/(\d+(?:\.\d+)+)/.test(zI[i].description||"")?RegExp.$1:"1.0.0.0";
if(gbIsMac&&oH!=3&&aRv=="1.0.0.0")
{
continue;
}

if(gbIsMac&&gbIsChrome&&parseFloat(gsChromeVer)>21&&getQMPluginInfo.amq(aRv,"1.0.0.6")<0)
{
continue;
}

return true;
}
}


}
}
return false;
}









function createPlugin(oH,bQN,ao,AB)
{
var hT=null;
ao=ao||getMainWin();
switch(oH)
{
case 0:
case 2:
case 4:
if(gbIsSafari)
{
createPlugin.aVZ(oH,ao,AB);
}
hT=createPlugin.aVZ(oH,getTop(),AB);
break;
case 3:
hT=createFTNPlugin(ao,AB);
break;
}


if(!bQN&&checkInstallPlugin(oH))
{

getTop().ossLog("delay","all",
T([
'stat=ff_addon',
'&type=%type%&info=%info%'
],'%').replace({
type:!hT?"failcreatePlugin":"successcreatePlugin",
info:["ver:",gsFFVer,",pluginId:",oH,",brtpe:",(gbIsFF?1:(gbIsChrome?2:(gbIsSafari?3:(gbIsOpera?4:5))))].join("")
})
);
}
return hT;
}

createPlugin.aVZ=function(oH,ao,AB)
{
var nK,
hT=null,
auV=gbIsFF?"application/x-tencent-qmail":"application/x-tencent-qmail-webkit";
ao=ao||getTop();
if(checkInstallPlugin(oH))
{
var aaY=AB||"QQMailFFPluginIns";
if(!(nK=S(aaY,ao)))
{
insertHTML(

ao.document.body,
"beforeEnd",
T('<embed id="$id$" type="$type$" hidden="true"></embed>').replace({

type:auV,
id:aaY
})
);
nK=S(aaY,ao);
}

var SL={0:"CreateScreenCapture",
2:"CreateUploader",
4:"CreateDragDropManager"
}[oH];
if(typeof nK[SL]!="undefined")
{
hT=nK[SL]();



if(oH==0)
{
hT.OnCaptureFinished=function(){};
}
else if(oH==2)
{
hT.OnEvent=function(){};
}
}
}
return hT;
};

createPlugin.bbW=function(ao,AB)
{
var nK=null,


auV=QMAXInfo.get("whole")["type"][3],
aCz=AB||"npftnPlugin";
ao=ao||getTop();
if(!(nK=S(aCz,ao)))
{
insertHTML(
ao.document.body,
"beforeEnd",
T('<embed id="$id$" type="$type$" style="z-index:99999;position:absolute;top:0;left:0;width:1px;height:1px;"></embed>').replace({

type:auV,
id:aCz
})
);
nK=S(aCz,ao);
if(nK)
{
nK.onEvent=function(){};
}
}
return nK;
};







function createFTNPlugin(ao,AB)
{
if(!checkInstallPlugin(3))
{
return null;
}
createPlugin.bbW(ao,AB);
var nK=createPlugin.bbW(getTop(),AB);
















if(AB)
{

getTop().ossLog("delay","all",T([
'stat=ff_addon',
'&type=%type%&info=%info%'
],'%').replace({
type:nK&&nK.Version?"successcreatePlugin":"failcreatePlugin",
info:["ver:",gsFFVer,",pluginId:3,insId:",AB].join("")
}));
}

return nK.Version?nK:null;
}






function detectPlugin(oH,Lt,cbD,AB)
{

var CY=false;
var aPx=cbD||createPlugin(oH,true,null,AB),
hG=getPluginVer(aPx);

if(aPx&&hG)
{
if(Lt!=1&&Lt!=2)
{
CY=true;
}


else if(getQMPluginInfo.amq(hG,QMAXInfo.get(Lt==1?"miniVer":"lastVer")[oH])>=0)
{
CY=true;
}
}
return CY;
}



function getPluginVer(bA)
{
var wY,hG="";
try
{
wY=typeof(bA)=="number"?createPlugin(bA,true):bA;
hG=(wY&&wY.Version)||"";
}
catch(bf)
{
}

return hG;
}








































function initDialog(aL,BV,bj,rU,nc)
{
new(getTop().QMDialog)({
sid:aL,
sTitle:BV,
sUrl:bj,
nWidth:rU,
nHeight:nc
});
}








function requestShowTip(Md,bKr,ao,bP)
{
var aS=T('/cgi-bin/tip?sid=$sid$&args=$dom$,$tip$&r=$r$').replace({
sid:getSid(),
dom:Md,
tip:bKr,
r:Math.random()
});


QMAjax.send(aS,{
method:'GET',
onload:function(ba,bK,gh)
{
if(ba&&bK.indexOf('oTop.QMTip')>0)
{
if(!bP||bP(bK,gh))
{
globalEval(bK,ao);
}
}
}
});
}

function detectCapsLock(xA,blQ,ei)
{
if(!xA)
{
return;
}
function showTips(_aoEvent)
{
var aF=_aoEvent.target||_aoEvent.srcElement,
_oPos=calcPos(aF),
di=blQ||S("capTip");

function getStyle()
{
return["z-index:20;position:absolute;background:#fdf6aa;padding:1px;",
"border:1px solid #dbc492;border-right:1px solid #b49366;border-bottom:1px solid #b49366;",
"left:",_oPos[3],"px;","top:",(_oPos[2]+1),"px;"].join("");
}
if(!di)
{
insertHTML((ei||document).body,"afterBegin",
'<div id="capTip" style="'+getStyle()+'">\u5927\u5199\u9501\u5B9A\u5DF2\u6253\u5F00</div>');
}
else
{
di.style.cssText=getStyle();
}
}
function hideTips()
{
show(S("capTip",(ei||document)),false);
}
var BY=-1;
addEvents(xA,{
keydown:function(_aoEvent)
{
var hW=_aoEvent.keyCode||_aoEvent.charCode

if(hW==20)
{
if(BY==0)
{
showTips(_aoEvent);
BY=1;
}
else if(BY==1)
{
hideTips();
BY=0;
}

}
},
keypress:function(_aoEvent)
{
var hW=_aoEvent.keyCode||_aoEvent.charCode,
wJ=_aoEvent.shiftKey;

if((hW>=65&&hW<=90&&!wJ)
||(hW>=97&&hW<=122&&wJ))
{
BY=1
showTips(_aoEvent);
}
else if((hW>=97&&hW<=122&&!wJ)||(hW>=65&&hW<=90&&wJ))
{
BY=0;
hideTips();
}
else
{
hideTips();
}
},
blur:function()
{
hideTips();
}
});
}








function calcMainFrameDomInGlobalPos(bVL,awj)
{
var _oPos=calcPos(bVL),
aVw=calcPos(S("mainFrame",getTop())),
baD=getMainWin().document,
bey=baD.documentElement,
bcs=baD.body,
ea=_oPos[3]+aVw[3]
-(bey.scrollLeft||bcs.scrollLeft||0),
bY=_oPos[0]+aVw[0]
-(bey.scrollTop||bcs.scrollTop||0),
cD=_oPos[4],
cI=_oPos[5];

return awj=="json"
?{top:bY,bottom:bY+cI,left:ea,
right:ea+cD,width:cD,height:cI}
:[bY,ea+cD,bY+cI,ea,cD,cI];
}

function allDeferOK()
{
return typeof all_defer_js=="function"
}






















function attachSetFlag(bA,ani,bP)
{
bA="&mailattach="+(typeof bA=="string"?bA.split(","):bA).join("&mailattach=");

var _oTop=getTop(),
aS=[bA,"&action=",ani?"setflag":"cancelflag"].join(""),
bkw=ani?"\u6536\u85CF":"\u53D6\u6D88\u6536\u85CF";


QMAjax.send(
"/cgi-bin/attachfolder?t=attachfolder.json",
{
method:"POST",
content:["r=",Math.random(),aS].join(""),
onload:function(ba,bA)
{
if(ba)
{
try
{
var av=eval(bA);
_oTop.showInfo("\u9644\u4EF6\u5DF2"+bkw);
bP&&bP.call(null,av);
}
catch(e)
{
_oTop.showError(bkw+"\u5931\u8D25");
}
}
else
{
_oTop.showError("\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
}
}
}
);
};




















function getAttachList(bA,bP,cd)
{
cd=cd||{};
var uY=arguments.callee,
aY=arguments,
_oList=(typeof bA=="object"&&bA.length)?bA:[],
bqK=T("/cgi-bin/readmail?sid=$sid$&t=$t$&s=forward&from=attachfolder&disptype=html&ef=js$param$"),
rG=TE([
'$@$for($oAttach$)$@$',
'&mailattach=$mailid$|$attachid$|$attachname$|$fileextenal$|$filebyte$',
'$@$if($editname$)$@$',
'|$editname$',
'$@$endif$@$',
'$@$endfor$@$'
]).replace({
oAttach:_oList
});

QMAjax.send(bqK.replace({
sid:getSid(),
t:"compose.json",
param:rG
}),
{
method:"GET",
onload:function(ba,cr)
{
var eu=true;
if(ba)
{
try
{
var av=eval(cr),
pP=av.attach;
if(pP&&pP.length)
{
for(var i=0;i<pP.length;i++)
{
if(+pP[i]["byte"]==0)
{
eu=false;
break;
}
}
}
else
{
eu=false;
}
}
catch(e)
{
eu=false;
}
}

if(eu&&ba)
{
bP(true,av);
}
else
{
bP(false,av);
}
}
},
cd.ajax
);




























};






function mailRecall(eB,az,kv)
{
var ey=kv||{},
Kw=extend(
{
r:Math.random(),
sid:getSid()
},
az
);

if(ey.onbeforesend&&ey.onbeforesend()===false)
{
return;
}
QMAjax.send(
"/cgi-bin/send_status",
{
method:"POST",
content:!eB?
T('t=send_status.json&s=mailrecallv2&messageid=$msgid$&time=$time$&sid=$sid$&r=$r$&ef=js').replace(Kw):
T('t=send_status.json&s=mailrecall_queryv2&taskid=$taskid$&messageid=$msgid$&sid=$sid$&r=$r$&ef=js').replace(Kw),
onload:function(ba,bA)
{
if(ba)
{
try
{
var av=eval(["(",bA,")"].join(""));
if(+av.errcode>-1)
{
ey.onsuccess&&ey.onsuccess(av);
return;
}
else
{
showError(av.errmsg||(eB==1?"\u67E5\u8BE2\u90AE\u4EF6\u64A4\u56DE\u72B6\u6001\u5931\u8D25\uFF0C\u64A4\u56DE\u7ED3\u679C\u5C06\u7A0D\u540E\u901A\u77E5\u4F60":"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"));
}
}
catch(e)
{
showError(av.errmsg||(eB==1?"\u67E5\u8BE2\u90AE\u4EF6\u64A4\u56DE\u72B6\u6001\u5931\u8D25\uFF0C\u64A4\u56DE\u7ED3\u679C\u5C06\u7A0D\u540E\u901A\u77E5\u4F60":"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"));
}
ey.onerror&&ey.onerror(bA);
}
else
{
bA!="abort"
&&showError(av.errmsg||(eB==1?"\u67E5\u8BE2\u90AE\u4EF6\u64A4\u56DE\u72B6\u6001\u5931\u8D25\uFF0C\u64A4\u56DE\u7ED3\u679C\u5C06\u7A0D\u540E\u901A\u77E5\u4F60":"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"));
ey.onerror&&ey.onerror(bA);
}
ey.oncomplete&&ey.oncomplete(ba,bA);
}
}
);
};





function backHome(ciL)
{
getMainWin().location.href=T('/cgi-bin/today?sid=$sid$&loc=backhome,,,$locid$')
.replace(
{
sid:getSid(),
locid:ciL||140
}
);
}






function resizeFolderList()
{
var aHH=S("SysFolderList"),
aGV=S("ScrollFolder"),
jJ=S("folder");
















if(aHH&&aGV&&jJ)
{
var aGd=["auto","hidden"],
bkk=jJ.clientHeight,
bjT=aHH.offsetHeight,
RN=bkk-bjT,
aDH=RN<50?0:1;
jJ.style.overflow=aGd[aDH];
jJ.style.overflowX=aGd[1];
aGV.style.overflow=aGd[1-aDH];
aGV.style.height=aDH
?(bkk-bjT)+"px":"auto";
}

AD.setAdFlag();
AD.adjustADDisp();
}






function setTopSender(cd)
{
var QS=getTop().goUserInfo.get("DEF_MAIL_FROM")||'';
switch(cd&&cd.action)
{
case"setting4":
if(QS!=cd.email)
{
setUserInfo("addr",cd.email);
setDefaultSender(cd.email);
changeStyle(cd.skin,cd.logo);
getTop().skin_path=cd.skin;
clearCache(["css",getPath("style"),"skin"]);
}


getTop().goUserInfo.reset();
break;
}
}




function bindAccount()
{
var aoH=S("useraddr"),
aIw=S("useraddrArrow"),
EW=getTop().goUserInfo.get('RealBindAccount'),
BU={nHeight:10,sItemValue:'<div style="background:#CCC; height:1px; margin-top:5px; overflow:hidden;"></div>'},
bv=[],
bkp=aoH&&subAsiiStr(aoH.innerHTML,20,"...");

if(!aoH||!EW)
{
return;
}

if(EW.qq.length+EW.biz.length)
{
bv.push(
{
sItemValue:'<a id="manage" href="javascript:;" style="float: right;">\u7BA1\u7406</a><span class="ml">\u5173\u8054\u5E10\u53F7\uFF1A</span>'
},
{
sId:'self',
bDisSelect:true,
sItemValue:T('<div class="unread_num"><span class="ico_unreadnum"></span>$unread$</div><input type="button" class="ft_upload_success" id="self"/><span style="overflow:hidden;margin-left:0" >$myemail$</span>').replace(extend({myemail:subAsiiStr(bkp,19,"...")},EW.self))
}
);
E(['qq','biz'],function(bJ,dp)
{
var cm=EW[bJ].length;
if(cm&&dp)
{
bv.push(BU);
}
for(var cm=EW[bJ].length,i=0;i<cm;i++)
{
var av=EW[bJ][i],

fT=subAsiiStr(av['email'],19,"...");














bv.push(
{
aX:bJ,
sId:av.uin,
sItemValue:['<div class="unread_num"><span class="ico_unreadnum"></span>',av.unread,'</div>','<span style="overflow:hidden;">',fT,'</span>'].join('')
}
);
}
}
);
}
else
{

bv.push(
{
sItemValue:'<span>\u60A8\u7684\u5F53\u524D\u90AE\u7BB1\u5E10\u53F7\uFF1A</span>'
},
{
sItemValue:T('<strong class="ml black">$myemail$</strong>').replace({myemail:bkp})
},
BU,
{
sItemValue:'<span>\u62E5\u6709\u5907\u7528\u90AE\u7BB1\uFF0C\u6765\u9002\u7528\u4E8E\u4E0D\u540C\u7528\u9014\u3002</span>'
},
{
sItemValue:'<span>\u5B83\u4EEC\u53EF\u4EE5\u5173\u8054\u5728\u4E00\u8D77\uFF0C</span>'
},
{
sItemValue:'<span>\u65B9\u4FBF\u968F\u610F\u5207\u6362\u4E0D\u540C\u7684\u90AE\u7BB1\u3002</span>'
},
{
nHeight:35,
sItemValue:'<input id="bind" type="button" class="btn ml"value="\u7533\u8BF7\u5907\u7528\u90AE\u7BB1" style="margin-top:5px;padding:0 10px;overflow:visible;"/>&nbsp; <a href="/cgi-bin/readtemplate?sid=$sid$&t=attrpwd_sec" target="mainFrame" id="bind_a">\u5173\u8054\u5DF2\u6709\u90AE\u7BB1</a>'
}
);
}
if(aIw)
{
aIw.style.visibility="visible";
aIw.parentNode.onclick=function()
{
var sK=calcPos(aoH.parentNode);
new QMMenu(
{
sId:"bindaccount",
sClassName:"bindacc qmpanel_shadow",

nX:sK[3],
nY:sK[2],
nWidth:235,
nMinWidth:160,
nItemHeight:25,
oItems:bv,
onitemclick:function(aL,bd)
{
if(bd.aX=='biz')
{
submitSwitchForm();
}
else
{
goUrlTopWin(T('/cgi-bin/login?vt=relate&uin=$uin$&old_sid=$sid$').replace({
uin:aL,
sid:getSid()
})
);
}
},
onload:function()
{
var ae=this,
bgI=ae.S("self"),
cv;
if(bgI)
{
cv=bgI.parentNode;
setClass(cv,cv.className+' settingtable');
}

addEvent(ae.S("manage"),'click',function(_aoEvent)
{

goUrlMainFrm(
T("/cgi-bin/setting4?fun=list&acc=1&sid=$sid$&go=bind").replace({sid:getSid()})
);
ae.close();
preventDefault(_aoEvent);
}
);

addEvent(ae.S("bind"),'click',function(_aoEvent)
{

goUrlMainFrm(
T("/cgi-bin/readtemplate?sid=$sid$&t=attrpwd_sec_alone&s=regemail&by=beiyong").replace({sid:getSid()})
);
ae.close();
preventDefault(_aoEvent);
}
);

addEvent(ae.S("bind_a"),'click',function(_aoEvent)
{

goUrlMainFrm(
T("/cgi-bin/readtemplate?sid=$sid$&t=attrpwd_sec").replace({sid:getSid()})
);
ae.close();
preventDefault(_aoEvent);
}
);

}
}
);
};
}
}

bindAccount.epd=function()
{
var ae=arguments.callee;
if(ae.vT)
{
}

};




function initAddress(bP)
{
callBack.call(window,bP,[{sType:"loading",sMsg:""}]);

var _oTop=getTop(),
Tm=_oTop.document,
bXK=getPath("js"),
fR=0,
tv=function()
{
if(++fR>=2)
{
_oTop.QMAddress.initAddress(bP);
}
};

loadJsFile("$js_path$qmlinkman1136ba.js",true,Tm,tv);
loadJsFile("$js_path$qmaddress1136ba.js",true,Tm,tv);






























}




function getPhotoCGI()
{
return[location.protocol,"//",location.host,"/cgi-bin/upload?sid=",getTop().getSid()]
.join("");
}





function blb()
{
var uY=arguments.callee;
return(uY.Rf||(uY.Rf=
{"sid":1,"username":1,"foxacc":1,

"m3gmsid":1,"mcookie":1,"msid":1,"defaultf":1,
"qm_flag":1,"QFRIENDUNREADCNT":1,"RSSUNREADCNT":1,"rss_domain":1,"qqmail_activated":1,"qqmail_alias_default":1,
"qqmail_from":1,"wimrefreshrun":1,"new":1,"qm_sk":1,"qm_ssum":1,"qq2self_sid":1,"exstype":1,"lockurl":1,"new_mail_num":1})
);
}

function setUserCookie(aD,bJ,lJ,eS,kk,oP)
{







if(blb()[aD]==1)
{
var pr=getCookie(aD),
eJ=pr?pr.split("|"):[],
dK=getUin(),
bZ=dK+"&"+bJ,
eu=true;


for(var i=0;i<eJ.length;i++)
{
if(eJ[i].match(dK))
{
eJ[i]=bZ;
eu=false;
}
}

pr=eJ.join("|");
eu&&(pr+=(pr==""?"":"|")+bZ);
return setCookie(aD,pr,lJ,eS,kk,oP);
}
else
return setCookie(aD,bJ,lJ,eS,kk,oP);

}





function getUserCookie(aD)
{




var gv=getCookie(aD);

if(blb()[aD]!=1)
{
return gv;
}
else
{
var eJ=gv?gv.split("|"):[],
dK=getUin();

for(var i=0;i<eJ.length;i++)
{
if(eJ[i].match(dK))
{
return((eJ[i].split("&"))[1]||eJ[i]);
}
}
return gv;
}

}




function deleteUserCookie(aD,eS,kk)
{
deleteCookie(aD,eS,kk);
}





function setUserCookieFlag(aD,dp,vy,aEf)
{
return setCookieFlag(aD,dp,vy,aEf)
}





function getUserCookieFlag(aD)
{
return getCookieFlag(aD);
}








function getReaderData(bj)
{
if(window!=getTop())
{
getTop().getReaderData(bj);
}
else
{
var Au=arguments.callee;
removeSelf(Au.jsObj);
Au.jsObj=loadJsFile(bj+"&r="+Math.random(),false,document);
}
}






function getReaderDataInterval(bj,xo)
{
if(window!=getTop())
{
return getTop().getReaderDataInterval(bj,xo);
}
else
{
var Au=arguments.callee,
aS=(window.gsRssDomain||'')+"/cgi-bin/reader_data2?sid="+getSid()+"&t=rss_data.js";

if(Au.nTimer)
{
clearInterval(Au.nTimer);
}

function Mz()
{
getReaderData(aS);
}

Au.nTimer=setInterval(Mz,xo
||(window.gnRssInterval*1000)||(10*60*1000));
Mz();
}
}


function changeStatus(aTC)
{
var bhM=S("searchIcon");
bhM&&setClass(bhM,aTC?"ss_icon ss_fronticon ss_icon_loading":"ss_icon ss_fronticon ss_icon_search")
}





function doSearch()
{
QMPageInit.blq(
function()
{
var gq=S("frmSearch");
gq.sender.value=gq.subject.value;
gq.receiver.value=gq.subject.value;
gq.keyword.value=gq.subject.value;
gq.combinetype.value="or";
submitToActionFrm(gq);
}
);
return false;
}





function audioPlay(aj)
{
var _oTop=getTop();
if(!aj.container)
{
aj.container=S('mp3player_container',_oTop.getMainWin());
}
if(aj.global&&!aj.globalcontainer)
{
aj.globalcontainer=S('gplayer_container',_oTop);
if(!aj.globalcontainer)
{
aj.global=false;
}
}

if(!_oTop.QMPlayer)
{

loadJsFileToTop(["$js_path$qmplayer/player118ad1.js"]);
}
waitFor(
function()
{
return!!_oTop.QMPlayer;
},
function(ba)
{
if(ba)
{



var Ws="gplayer_kernel",
aOb=aj.id||("qmplayer_unique"+unikey());

function aRL()
{
var aV=Ws+"_dom";
if(_oTop.S(aV))
{
return _oTop.S(aV)
}
else
{
var _oDom=_oTop.document.createElement("div");
_oDom.id=aV;
_oDom.style.cssText="position:absolute;left:-100000px;";
_oTop.document.body.appendChild(_oDom);
return _oDom;
}
};

if(!aj.msg)
{
aj.msg="QQ\u90AE\u7BB1\u64AD\u653E\u5668";
}
if(aj.container&&aj.container.getElementsByTagName("div").length==0)
{
aj.container.innerHTML="";
}

if(aj.global)
{
var agv=QMPlayer.initKernel({
sId:Ws,
oContainer:aRL()
}),
aOt=QMPlayer.initSkin({
sId:Ws,
sSkin:"Global",




oContainer:aj.globalcontainer
});

_oTop.QMPlayer.init({
oSkin:aOt,
oKernel:agv
});
}

_oTop.QMPlayer.delUIById(aOb);

_oTop.QMPlayer.init({
oSkin:QMPlayer.initSkin({
sId:aOb,
oContainer:aj.container,
sSkin:aj.skin||"Mini"
}),
oKernel:aj.global?agv.setInfo(aj):QMPlayer.initKernel({
sId:aOb,
oContainer:aj.container,
oInfo:aj
})
});
}
else if(aj.container)
{
aj.container.innerHTML="\u64AD\u653E\u5668\u52A0\u8F7D\u5931\u8D25";
}
}
);
}




function audioStop()
{
var hS=getTop().QMPlayer;
hS&&hS.stop();
}




function audioPause()
{
var hS=getTop().QMPlayer;
hS&&hS.pause();
}














function setPlayer(aj)
{
var _oTop=getTop();

function bkj(aj)
{
if(!_oTop.QMPlayer)
{
setTimeout(function()
{
bkj(aj);
},200);
return false;
}

var aV="qqmailMediaPlayer"+(aj.id||""),
ay=aj.win||window;

if(!ay||ay[aV])
{
return false;
}

if(!aj.container
&&!(aj.container=S("mp3player_container",ay)))
{
return false;
}

return(ay[aV]=new _oTop.QMPlayer()).setup(aj);
}

if(!_oTop.QMPlayer)
{

loadJsFile("$js_path$qmplayer111fe0.js",true,_oTop.document);
}

return bkj(aj);
}













function playUrl(jH)
{
var hS=(jH.win||window)["qqmailMediaPlayer"
+(jH.id||"")];

if(!hS)
{
setPlayer(jH);
}
else
{
hS.openUrl(jH.url,jH.dispInfo);
}
}









function stopUrl(jH)
{
if(!jH)
{
jH={};
}

try
{
(jH.win||window)["qqmailMediaPlayer"+(jH.id||"")].stop();
}
catch(bf)
{
}
}











function searchMusic(lI,mt,bD)
{
if(window!=getTop())
{
return getTop().searchMusic(lI,mt,bD);
}
lI=lI||"";
mt=mt||"";
var RJ=arguments.callee,
aGX=[lI,mt].join("@");

var dNG=function(bj)
{






if(bj.indexOf("qqmusic.qq.com")==-1)
{
return bj;
}
else
{
if(bj.indexOf(".wma")!=-1)
{
var bi="stream",
CF=bj.substring(bj.indexOf(bi)+bi.length),
drj=CF.substring(0,CF.indexOf(".")),
cuA=bj.substring(0,bj.indexOf(".")),
dHV=bj.substring(bj.indexOf(".")),
en=dHV.split("/"),
_sDomain=en[0],
aQk=en[1],
drf=parseInt(drj)+10;

var elF=parseFloat(aQk.substring(0,aQk.indexOf("."))),
eqy=elF-12000000+30000000;
return cuA.substring(0,cuA.indexOf(bi)+bi.length)+drf+_sDomain+"/"+eqy+".mp3";
}
else
{
return bj;
}
}
}
RJ.fCallBack=function(pB)
{
var _oList,
aS="",
asa=[];

if(!pB.contentWindow.gMusicInfo||!(_oList=pB.contentWindow.gMusicInfo.list))
{
return bD(asa);
}







for(var i=0,_nLen=_oList.length;i<_nLen;i++)
{
var _oInfo={
song:_oList[i].songname.replace(/<\/?strong>/gi,""),
singer:_oList[i].singername.replace(/<\/?strong>/gi,"")
},
avY=htmlDecode(_oList[i].songurl).replace(/\|/g,"").split(";");



for(var j=0,awf=avY.length;j<awf;j+=2)
{



if(avY[j])

{

_oInfo.url=dNG(avY[j].replace(/^(FI|SI|AN|QQ)/,""));

asa.push(_oInfo);
break;
}
}
}
RJ.Rh[aGX]=asa;
bD(asa);
};

if(!lI&&!mt)
{
return bD([]);
}
if(!RJ.Rh)
{
RJ.Rh={};
}
if(RJ.Rh[aGX])
{
return bD(RJ.Rh[aGX]);
}

RJ.dLE=createBlankIframe(getTop(),{
id:"getMusicUrlFromSoSo",
style:"display:none;",
virtual:false,
header:T(
[
'<meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>',
'<script>',
'function searchJsonCallback(a)',
'{',
'window.gMusicInfo = a;',
'}',
'<\/script>',
'<script src="$domain$/fcgi-bin/fcg_search_xmldata.q?w=$song$%20$singer$&source=3&r=$rand$"><\/script>',


]
).replace(
{
domain:(location.protocol=="https:"?'https://qqshow.mail.qq.com':'http://cgi.music.soso.com'),
song:encodeURI(lI),

singer:encodeURI(mt),

rand:Math.random()
}
),
destroy:true,
onload:function(ao)
{
searchMusic.fCallBack(this);
}
});
}








function getMusicUrl(lI,mt,bD)
{
searchMusic(lI,mt,function(Gu)
{
if(Gu.length>0)
{
var j=0,
aeI=/\.mp3$/i;
for(var i=0;(gbIsMac||gbIsLinux)&&i<Gu.length;i++)
{
if(aeI.test(Gu[i].url))
{
j=i;
break;
}
}

bD(Gu[j].song,Gu[j].singer,Gu[j].url,Gu);
}
else
{
bD(lI,mt,"",Gu);
}
},1);
}









function startWebpush(LT)
{
var _oTop=getTop();

_oTop.loadCssFile("$css_path$webpushtip112019.css",true);

_oTop.loadJsFile("$js_path$qmwebpushtip112019.js",
true,
_oTop.document,
function()
{
_oTop.QMWebpushTip.open(LT);
}
);

_oTop.loadJsFile("$js_path$qmwebpush111fe0.js",true,_oTop.document);
}







function closeWebpush(LT)
{
getTop().QMWebpushTip&&getTop().QMWebpushTip.close(LT,true);
}








function ftSendStatic(gn,eM)
{
if(gn)
{
ossLog("realtime","all",T('stat=exskick&sid=$sid$&uin=$uin$&log=$code$')
.replace(
{
uin:eM||getTop().g_uin,
sid:getSid(),
code:gn
}
));
}
}






function twoDCodeImgUrl(bTS)
{
var cN=location.getParams(bTS);

return TE(
[
'/cgi-bin/generate_twodimcode?out=250&sid=$@$eval getSid()$@$',
'$@$if($mailid$)$@$',
'&filename=$@$eval escape($filename$)$@$&mailid=$mailid$',
'$@$else if($att$)$@$',
'&att=$att$&action=groupattach',
'$@$else if($k$)$@$',
'&k=$k$&code=$code$&action=bigattach',
'$@$endif$@$'
]).replace(cN);
}

function showTwoDCodeImgMenu(ao,ag,gS,bTS)
{
var ae=this,
aM=ao.document,
_oPos=calcPos(ag),
rh=_oPos[2]-40,
kU=0,
kZ=bodyScroll(aM,"scrollTop"),
wA=bodyScroll(aM,"clientHeight");

if((kU=rh+320-kZ-wA)>0)
{
rh-=(kU+10);
}
new QMMenu(
{
oEmbedWin:ao,
sId:"scanImg",
nArrowPos:_oPos[0]-rh-5,
bAutoClose:false,
sWidthDetect:"float",
nArrowDirection:"Left",
nWidth:"auto",
nX:_oPos[3]+25,
nY:rh,
onshow:function()
{
if(gnIEVer==6)
{
this.S("twodcode").src=this.S("twodcode").src;
}
},
oItems:[
{
bDisSelect:true,
sStyle:"padding:0;",
nHeight:"auto",
sItemValue:T([
'<div style="width:300px;height:310px;padding-top:10px;">',
'<div style="text-align:center;">',
'<img id="twodcode" style="width:250px;height:250px;" src="$src$"/>',
'</div>',
'<div style="margin-top:-5px;">',

'<p style="margin:0;text-align:center;padding:5px 0;">\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u5C06\u9644\u4EF6\u4E0B\u8F7D\u5230\u624B\u673A\u3002</p>',
'<p style="margin:0;text-align:center;padding:5px 0;">\uFF08\u4E8C\u7EF4\u7801\u6709\u6548\u671F\u4E3A5\u5206\u949F\uFF09</p>',
'</div>',
'</div>'
]).replace(
{
filename:gS,
src:twoDCodeImgUrl(bTS)
})
}]
});
}






function beginStatTime(ao)
{
var aeJ=parseInt(ao.location.hash.split("stattime=").pop());

if(!isNaN(aeJ)&&aeJ.toString().length==13&&aeJ>(getTop().gnStatTimeStamp||0))
{
ao.gnBeginTime=getTop().gnStatTimeStamp=aeJ;
ao.gnStatTimeStart=now();
}
}

















function endStatTime(ao,ds)
{
var BE=ao.gnBeginTime,
fJ=ao.gnStatTimeStart,
hp=now();

if(!isNaN(fJ)&&!isNaN(BE))
{
addEvent(ao,"load",function()
{
var aHR=now();

ossLog("delay","sample",T(
[
'stat=cgipagespeed&type=$type$&t1=$t1$&t2=$t2$&t3=$t3$',
'&rcgi=$appname$&rt=$t$&rs=$s$&allt=$allt$&flowid=$wm_flowid$'
]
).replace(extend(ds,
{
t1:fJ-BE,
t2:hp-fJ,
t3:aHR-hp,
allt:[BE,fJ,hp,aHR].join("|")
}
)));
debug([fJ-BE,hp-fJ,aHR-hp],994919736);
}
);
}
}
















function ossLog()
{
var bkm=getTop().ossLog;
return bkm.ahp.apply(bkm,arguments);
}

ossLog.ahp=function(aar,Ab,qr,aBA)
{
var ae=this,
aaU=aar||"realtime",
Ji=ae.abE(qr),
lr=ae.lr||(ae.lr=[]),
gC=typeof Ab=="number"?Ab:{all:1}[Ab||"all"]||0.1;




if(aaU=="realtime")
{
ae.Jj(gC)&&ae.aGj(Ji);
}

else
{

ae.Jj(gC)
&&lr.push(["delayurl","=",encodeURIComponent(Ji)].join(""));

lr.length>=1000?ae.aGj()

:(!ae.dH&&lr.length>0&&(ae.dH=setTimeout(ae.aGj,5*1000)));
}
};

ossLog.aGj=function(Gn)
{
var ae=ossLog,
lr=ae.lr;
if(Gn||lr.length>0)
{
QMAjax.send("/cgi-bin/getinvestigate",
{
method:"POST",
timeout:500,
content:T('sid=$sid$&$rl$&$ls$').replace(
{
sid:getSid(),
rl:Gn,
ls:lr.join("&")
}
)
}
);
lr.length=0;
ae.dH&&clearTimeout(ae.dH);
ae.dH=null;
}
};

ossLog.Jj=function(kp)
{
return(this.KJ||(this.KJ=now()))%100<100*kp;
};

ossLog.abE=function(qr)
{
var jz=[];
typeof qr=="string"
?jz.push("&",qr)
:E(qr,function(nJ,bm)
{
jz.push("&",bm,"=",encodeURIComponent(nJ));
}
);
return jz.shift()&&jz.join("");
};










function isdLog(cbN,bm,nJ)
{
var tj=T([
window.location.protocol,
"//isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=101&flag3=$flag$&$key$=$value$&r=$r$"
]),
eh=new Image();

setTimeout(function()
{
eh.src=tj.replace({
flag:cbN,
key:bm,
value:nJ||"1",
r:Math.random()
});
}
);
}




var AD=
{
brf:"",
init:function(ao)
{
var ae=this;
ao["AD_callback"]=function(ap)
{
try
{
if(ae.brf!="timeout")
{
ae.brf="ok";
for(var i=0;i<ap.length;i++)
{
var aI=ap[i]&&ap[i][0];
if(aI)
{
var Hd=aI.loc,
bvU=aI.oid,
bvL=aI.fodder,cCB=T("stat=log_ad_show&loc=$loc$&oid=$oid$&hit=$hit$&resource_url=$resource_url$&link_to=$link_to$&loc=ad_today,$loc$,$oid$,$hit$");
if(bvU=="1"||bvU=="100")
{
ae.cCm(ao,Hd);
if(getUin()%100==55||getUin()%100==77)
{
ossLog("realtime","all",cCB.replace(
{
loc:Hd,
oid:bvU,
hit:0
}
));
}
}
else if(bvL[0]&&Hd)
{
if(getUin()%100==55||getUin()%100==77)
{
ossLog("realtime","all",cCB.replace(
{
loc:Hd,
oid:bvU,
hit:1,
link_to:encodeURIComponent(bvL[0].link_to),
resource_url:encodeURIComponent(bvL[0].resource_url)
}
));
}
ae.ejw(ao,extend(bvL[0],{cid:aI.cid,loc:aI.loc,oid:aI.oid}),Hd)
}
else
{
debug("No AD loc or DATA")
}
}
else
{
debug("no AD")
}
}
}
}
catch(e)
{
}

};

















this.eou(ao);
this.dFV(ao);
},
postADlog:function(dHi,fS,bj,_aoEvent)
{
if(dHi=="flash")
{
var ej=getEventTarget(_aoEvent);
if(ej.tagName=="DIV")
{
ossLog("realtime","all",T('stat=log_ad_click&pos=$pos$')
.replace(
{
pos:fS
}
));
bj&&window.open(bj);
}
}
else
{
ossLog("realtime","all",T('stat=log_ad_click&pos=$pos$')
.replace(
{
pos:fS
}
));
}
},

setAdFlag:function()
{
setCookieFlag("CCSHOW",5,getTop().document.body.clientWidth<1152?0:1);
},
adjustADDisp:function()
{
var cF=getTop().getMainWin(),
bOJ=S("qqmail_AD_container",cF),
_oContainer=S("qqmail_mailcontainer",cF);
rdVer("BaseVer",1);
if(this.cPR()=="0"&&isShow(bOJ))
{
bOJ&&(show(bOJ,0));
}













},
cPR:function()
{
return getCookieFlag("CCSHOW")[5];
},
dUt:function(bj)
{
var CF=strReplace(bj,"http://",""),
ade=CF.indexOf("/"),
_sDomain=CF.substr(0,ade),
dHn="https://stockweb.mail.qq.com";
return strReplace(bj,"http://"+_sDomain,dHn)+"?pdomain="+_sDomain;
},
dGJ:function(eB)
{























var	emZ=TE([
'<span style="background:url($pingurl$);"></span>',
'<a href="$link_to$" target="_blank"  onclick="getTop().AD.postADlog(\'img\',\'$pos$\')" ',
'style="white-space: nowrap; height:80px; overflow: hidden; display: block; margin-bottom:3px; background:url($resource_url$) no-repeat;"></a>']),
eah=TE([
'<a href="$link_to$" target="_blank" style="background:url($pingurl$);" onclick="getTop().AD.postADlog(\'img\',\'$pos$\')">',
'<img src="$resource_url$" width="$width$" height="$height$">',
'</a>',
'<style>',
'.ad_btn_close{position:absolute; top:5px; right:5px; line-height:0; text-decoration:none; background:#aaa; width:12px; height:12px;  border:1px solid #999;}',
'.ad_btn_close:hover{border-color:#888;background-color:#999;}',
'</style>',
'$@$if($bCloseBtn$)$@$',
' <a class="ad_btn_close" onclick="closeAD(\'$pos$\')"><img src="$img_path$ico_closetip.gif"></a>',
'$@$endif$@$',
]);




if(eB==1)
{
return emZ;
}
else if(eB==2)
{
return eah;
}
},
ejw:function(ao,ah,py,bP)
{
try
{
var _oDom=this.bUf(ao,py),
byc=location.protocol=="https:",
elj=byc?T("https://stockweb.mail.qq.com/p?oid=$oid$&cid=$cid$&loc=$loc$&pdomain=p.l.qq.com")
:T("http://p.l.qq.com/p?oid=$oid$&cid=$cid$&loc=$loc$"),
egM=attr(_oDom,"bgimg")=="1"?true:false,
dXK=attr(_oDom,"closebtn")=="1"?true:false,
eii=attr(_oDom,"pos");
if(_oDom&&ah.resource_url)
{
var cJi=_oDom.parentNode;
byc&&(ah.resource_url=this.dUt(ah.resource_url));






var dUC=this.dGJ(egM?1:2);


show(cJi,1);
setHTML(cJi,dUC.replace(extend(ah,
{
img_path:getPath("image"),
bIsIE:gbIsIE,
bCloseBtn:dXK,
pingurl:elj.replace(ah),
pos:eii
})));
var aeV=S("todaybarTitle",ao);
if(aeV)
{
setHTML(aeV,"\u5546\u4E1A\u8D44\u8BAF");
show(aeV,1)
}
}
else
{
debug("no loc dom")
}
}
catch(e)
{

}
},
bUf:function(ao,py)
{
var cL=null;
E(GelTags("qqmailad",ao.document),function(_aoDom)
{
eln=attr(_aoDom,"loc")||"";
if(eln==py)
{
cL=_aoDom;
}
});
return cL;
},
eou:function(ao,arZ)
{
var bSg=[],afz="",ae=this,
byc=location.protocol=="https:",
efc=byc?T("https://stockweb.mail.qq.com/lview?c=www&loc=$loc$&callback=AD_callback&rot=1&pdomain=l.qq.com"):T("http://l.qq.com/lview?c=www&loc=$loc$&callback=AD_callback&rot=1");

E(GelTags("qqmailad",ao.document),function(_aoDom)
{
afz=attr(_aoDom,"loc")||"";
if(arZ)
{
attr(_aoDom,"disp")=="0"&&afz&&bSg.push(afz)&&attr(_aoDom,"disp","1");
}
else
{
attr(_aoDom,"disp")!="0"&&afz&&bSg.push(afz);
}
});

afz=bSg.join(",");


if(afz)
{
setTimeout(function()
{
try
{
var _oDom=ae.bUf(ao,afz),
aeV=S("todaybarTitle",ao);
if(_oDom)
{
var aDA=_oDom&&attr(_oDom,"ADDefault")||"";
if(aDA!=""&&S(aDA,ao))
{
if(!isShow(S(aDA,ao)))
{
show(S(aDA,ao),1);
}
}
}
if(aeV&&!isShow(aeV))
{
show(aeV,1)
}
}
catch(e)
{
}

},2.5*1000);

if(!(this.cPR()=="0"&&afz=="qqmail_send_skyscraper"))
{
var fok=loadJsFile(efc.replace({loc:afz}),false,ao.document);

setTimeout(function()
{
if(ae.brf!="ok")
{
ae.brf="timeout";
ae.cCm(ao,afz);
ossLog("realtime","all","loc=ad_timeout,,,");
}
},2*1000);
}

}

},
cCm:function(ao,py)
{
try
{
var _oDom=this.bUf(ao,py),
aDA=_oDom&&attr(_oDom,"ADDefault")||"",
aeV=S("todaybarTitle",ao);
if(aDA!="")
{
_oDom&&_oDom.parentNode&&show(_oDom.parentNode,0);
show(S(aDA,ao),1);
}
if(aeV&&!isShow(aeV))
{
show(aeV,1)
}
}
catch(e)
{

}
},
dFV:function(ao)
{
var cIJ=S("todaybarnormallink",ao);
if(cIJ)
{
cIJ.onclick=function()
{
ossLog("realtime","all","stat=log_todaybar_click");
}
}
}
};


function initAD(ao)
{
AD.init(ao);
}






function all_js(){}