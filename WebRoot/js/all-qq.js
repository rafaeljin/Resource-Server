var QMFileAdaptor = (function(aC) {
	var abI;

	return {

		isBrowser : function(aeZ) {
			return ( {
				ie : gbIsIE,
				safari : gbIsSafari,
				chrome : gbIsChrome,
				ff : gbIsFF
			})[aeZ];
		},
		browserVer : function() {
			return gnIEVer;
		},

		getDomWin : function(_aoDom) {
			var aM = _aoDom.ownerDocument;
			return aM.parentWindow || aM.defaultView;
		},

		isSystem : function(aeZ) {
			return ( {
				win : gbIsWin,
				mac : gbIsMac
			})[aeZ];
		},

		S : S,
		C : function(jl) {
			return document.createElement(jl);
		},
		$ : function(eF, au) {
			return (au || document).getElementsByTagName(eF);
		},
		removeSelf : removeSelf,
		attr : attr,
		insertHTML : insertHTML,
		bodyScroll : bodyScroll,
		contain : isObjContainTarget,

		show : show,
		isShow : isShow,
		getStyle : getStyle,

		hasClass : hasClass,
		addClass : addClass,
		setClass : setClass,
		rmClass : rmClass,

		addEvent : addEvent,
		delEvent : removeEvent,
		target : getEventTarget,
		stopPropagation : stopPropagation,
		preventDefault : preventDefault,

		QMAjax : QMAjax,
		get : function(bj, bA) {
			if (typeof bA == "function") {
				QMAjax.send(bj, {
					method : "GET",
					onload : bA
				});
			} else {
				QMAjax.send(bj, {
					method : "GET",
					timeout : bA.nTimeout,
					onload : bA.oncomplete
				}, bA.bGlobal && (abI || (abI = new QMAjax)));
			}
		},

		getSid : getSid,
		createActiveX : createActiveX,
		getUin : getUin,

		createBlankIframe : createBlankIframe,
		getCookie : getCookie,
		unikey : unikey,
		generateFlashCode : generateFlashCode,
		detectActiveX : detectActiveX,

		getParams : location.getParams,

		getPath : getPath,
		E : E,
		trim : trim,
		qmFlash : qmFlash,
		T : T,
		TE : TE,
		callBack : callBack,
		extend : extend,
		htmlEncode : htmlEncode,
		ossLog : ossLog,
		evalValue : evalValue,
		funcProxy : function(au, dO) {
			return function() {
				dO.apply(au, arguments);
			};
		}
	};
})();

(function(A, aC) {
	var oN = {}, Gz, ay = window;

	Gz = oN.components = {};

	var aTI = [ location.protocol, "//", location.hostname, "/cgi-bin/upload" ]
			.join("");

	var abh = function() {
	}

	function aJN() {
		var bI = ay.document.createElement('input');
		bI.type = 'file';
		return 'multiple' in bI && ay.File != aC && ay.XMLHttpRequest != aC
				&& (new XMLHttpRequest).upload != aC;
	}

	var bjX = function() {
	}
	bjX.prototype = {
		create : function(aw, ap) {
			var aEy = this.bpp(aw), MB = Gz[aEy];

			debug("uploader implement:" + aEy);
			ap.sType = aw;

			if (MB) {
				if (/Flash/.test(aEy)) {

					new Gz["RawinputPopup"](ap);
				}
				return new MB(ap);
			}
		},

		orders : {
			"base" : [ "base" ],
			"popup" : [ "FlashPopup", "ActivexPopup", "Html5Popup",
					"RawinputPopup" ],
			"drag" : [ "Html5Drag", "ActivexDrag" ],
			"paste" : [ "ActivexPaste" ]
		},

		detects : {
			"base" : function() {
				return true
			},

			"RawinputPopup" : function() {
				return true;
			},
			"ActivexPopup" : function() {
				return A.isBrowser("ie") && A.detectActiveX(2);
			},
			"FlashPopup" : function() {
				return A.qmFlash.isSupported();
			},
			"Html5Popup" : aJN,

			"ActivexDrag" : function() {
				return A.detectActiveX(4, 1);
			},
			"Html5Drag" : aJN,

			"ActivexPaste" : function() {
				return A.detectActiveX(2);
			}
		},

		bpp : function(aw) {
			var abZ = this.orders[aw];
			if (abZ) {
				for ( var i in abZ) {
					var UX = this.detects[abZ[i]];

					if (UX && UX(aw)) {
						return abZ[i];
					}
				}
			}
			return null;
		}
	}

	var aUO = new bjX();

	oN.qmCreater = bjX;
	oN.oCreater = aUO;

	oN.create = function(aw, ap) {
		return aUO.create(aw, ap);
	}

	oN.createCom = function(aD, dO, btI) {
		var arv = Gz[btI], CV = (arv && new arv) || {}, MB = function() {
			if (arguments.length > 0) {
				this.name = aD;
				this.init.apply(this, arguments);
			}
		};

		MB.prototype = CV;
		A.extend(MB.prototype, typeof (dO) == "function" ? dO(arv.prototype)
				: dO);
		Gz[aD] = MB;
	}

	var afV = function(ah) {
		var ae = this;

		ae.NZ = {

		};
		ae.set(ah);
	}
	afV.prototype = {
		set : function(bm, dM) {
			var ae = this;
			if (!bm) {
				return;
			}
			if (typeof bm == "object") {
				A.extend(ae.NZ, bm);
			} else {
				ae.NZ[bm] = dM;
			}
			return ae;
		},

		get : function(bm) {
			var ae = this;
			if (bm) {
				return ae.NZ[bm];
			} else {
				return ae.NZ;
			}
		},

		errInfo : function() {
			var ae = this;
			ae.oUploader.errInfo(ae.NZ.sError);
		},

		upload : function() {
			var ae = this;
			ae.oUploader.upload(ae);
		},

		destroy : function() {
			var ae = this;
			ae.oUploader.rmFile(ae);
		},

		cancel : function() {
			var ae = this;
			ae.oUploader.cancel(ae);
		},

		uploader : function() {
			return this.oUploader;
		}
	}

	oN.qmFile = afV;

	oN.oUtil = {
		isFileDragOver : function(_aoEvent) {
			var aLi = _aoEvent.dataTransfer.types, aJS = false;
			if (aLi === null) {
				return true;
			} else {
				A.E(aLi, function(nV) {
					if (nV == "Files") {
						aJS = true;
						return true;
					}
				})
				return aJS;
			}
		},

		cfg2Url : function(ap) {
			var aS = ap.sUrl, aE = [], alR = ap.oQueryData;

			A.E(alR, function(bd, bm) {
				aE.push( [ bm, encodeURIComponent(bd || "") ].join("="));
			});
			return [ aS, aE.join("&") ].join(aS.indexOf("?") > 0 ? "&" : "?");
		}
	};

	oN
			.createCom(
					"base",
					{
						init : function(ap) {
							var ae = this, kv = {};

							if (typeof ap == "function") {
								ap = ap.call(ae, ae.name);
							}

							ae.Gf = {};
							ap.sUrl = ap.sUrl || aTI;
							ap.sFile = ap.sFile || "UploadFile";
							ap.oQueryData = ap.oQueryData || {};
							ap.oBodyData = ap.oBodyData || {};
							ae.oCfg = A.extend( {}, ap);
							ae.initCallBack(ae.oCfg);
						},

						initCallBack : function(ap) {
							var ae = this;
							ae.nb = A.extend(ae.nb || {},
									(ap.oMgr && ap.oMgr.oCfg) || ap || {});
						},

						qmFile : afV,

						nConcurrent : 1,

						callBack : function(bti, aZ) {
							var ae = this, aI = ae.oCfg, hb = ae.nb[bti] || abh;

							hb.apply(aI.oMgr || ae, aZ);
						},

						getDefUploadUrl : function() {
							return aTI;
						},

						setKeepAlive : function(JD) {
							var ae = this;

							if (JD) {
								if (ae.bkT) {
									return;
								}
								ae.bkT = setInterval(
										function() {
											A.QMAjax
													.send(
															"/cgi-bin/readtemplate?t=keep_alive&ef=js&sid="
																	+ A
																			.getSid()
																	+ "&r="
																	+ Math
																			.random(),
															{
																method : "GET",
																headers : {
																	"If-Modified-Since" : "0",
																	"Cache-Control" : "no-cache, max-age=0"
																},
																onload : function(
																		lI, bK,
																		cq) {
																	if (bK
																			.indexOf("<!--cgi exception-->") != -1
																			&& bK
																					.indexOf('errcode : "-2"') != -1) {

																		var _oFiles = ae
																				.getFile();
																		for ( var i in _oFiles) {
																			var dg = _oFiles[i];
																			if (dg
																					.get("sStatus") == "uploading") {
																				dg.fCancel
																						&& dg
																								.fCancel();
																				ae
																						.onerror(dg);
																			}
																		}
																	}
																}
															});
										}, 15 * 60 * 1000);
							} else {
								clearInterval(ae.bkT);
								ae.bkT = null;
							}
						},

						getUploadingCnt : function() {
							var ae = this, Sc = 0, _oFiles = ae.getFile();

							for ( var i in _oFiles) {
								if (_oFiles[i].get("sStatus") == "uploading") {
									Sc += 1;
								}
							}
							return Sc;
						},

						checkClearAlive : function() {
							var ae = this;
							setTimeout(function() {
								if (ae.getUploadingCnt()) {
									ae.setKeepAlive(false);
								}
							}, 2000);
						},

						isBusy : function() {
							var ae = this;
							return ae.getUploadingCnt() >= ae.nConcurrent;
						},

						cancel : function(aO) {
							var ae = this;

							if (aO.get("sStatus") == "uploading") {
								aO.set("sStatus", "cancel");
								ae.calcUsedTime(aO);
								ae.ossLog(aO);
								aO.fCancel && aO.fCancel();
							} else if (aO.get("sStatus") == "ready") {
								aO.set("sStatus", "cancel");
							}
							clearInterval(aO.aKa);
							clearTimeout(aO.dF);
							ae.rmFile(aO);
						},

						onselect : function(jQ) {
							var ae = this;
							ae.callBack("onselect", [ jQ ]);
						},

						calcSpeed : function(aO, wW) {
							var ae = this, Kt = new Date().valueOf();

							if (!aO.get("nSize")) {
								return;
							}

							if (!aO.aut) {
								aO.bDX = aO.get("nUploadPercent");
								aO.aut = Kt;
								return;
							} else if (Kt - aO.aut > (wW || 1000)) {

								var Nf = aO.get("nSize")
										* (aO.get("nUploadPercent") - aO.bDX)
										/ 100 / (Kt - aO.aut), aKK = aO
										.get("nSize")
										* (100 - aO.get("nUploadPercent"))
										/ 100 / Nf;

								if (Nf > 0) {
									aO.set( {
										nSpeed : (Nf / 1024 * 1000).toFixed(2),
										nRemainTime : (aKK / 1000).toFixed(2)
									});
								}

								aO.bDX = aO.get("nUploadPercent");
								aO.aut = Kt;
							}
						},

						onprocess : function(aO) {
							var ae = this;

							if (aO.get("nUploadPercent") >= 100
									&& aO.get("nPercent") >= 80) {

								return;
							}

							ae.calcSpeed(aO);

							aO.set( {
								sStatus : "uploading",
								sUploadStep : "posting",
								nPercent : aO.get("nUploadPercent") * 0.8
							});
							ae.callBack("onprocess", [ aO ]);

							if (aO.get("nUploadPercent") == 100) {
								if (!aO.get("nSpeed")) {
									ae.calcSpeed(aO, 0);

								}
								aO.aKa = setInterval(function() {
									if (aO.get("nPercent") >= 99) {
										clearInterval(aO.aKa);
										return;
									}
									ae.callBack("onprocess", [ aO.set( {
										"nPercent" : aO.get("nPercent") + 1,
										"sUploadStep" : "waiting"
									}) ]);
								}, 100);
							}
						},

						oncomplete : function(aO) {
							var ae = this;

							if (aO.get("sStatus") == "uploading") {
								var dN = aO.get("sStatus");
								aO.set("sStatus", "complete");
								ae.calcUsedTime(aO);
								ae.ossLog(aO);
								aO.set("sStatus", dN);
								ae.rmFile(aO);
								clearTimeout(aO.dF);
								aO.dF = setTimeout(function() {
									clearInterval(aO.aKa);
									aO.set("sStatus", "complete");
									aO
											&& aO.get()
											&& ae
													.callBack("oncomplete",
															[ aO ]);
									ae.checkClearAlive();
								}, Math.max(1600 - (new Date()).valueOf()
										+ aO.get("nUpTime"), 0));
							}
						},

						onerror : function(aO) {
							var ae = this;

							if (/(uploading)|(ready)|(stopped)/.test(aO
									.get("sStatus"))) {
								var dN = aO.get("sStatus");
								aO.set("sStatus", "error");
								ae.calcUsedTime(aO);
								ae.ossLog(aO);
								aO.set("sStatus", dN);

								clearTimeout(aO.dF);
								aO.dF = setTimeout(function() {
									clearInterval(aO.aKa);
									aO.set("sStatus", "error");
									aO && aO.get()
											&& ae.callBack("onerror", [ aO ]);
									ae.checkClearAlive();
								}, Math.max(1600 - (new Date()).valueOf()
										+ aO.get("nUpTime"), 0));
							}
						},

						calcUsedTime : function(aO) {
							var bax = aO.get("nUpTime");

							if (bax) {
								aO.set("nUsedTime", new Date().valueOf()
										- aO.get("nUpTime"));
							}
						},

						cfg : function(aO) {
							return A.extend( {}, this.oCfg, aO && aO.oCfg);
						},

						upload : function(aO) {

						},

						prepareUpload_ : function(aO) {
							var ae = this;

							if (!ae.getFile(aO.get("sId"))) {

								ae.addFile(aO);
							}

							if (ae.isBusy()) {
								return false;
							}
							return true;
						},

						getFile : function(aL) {
							return arguments.length ? this.Gf[aL] : this.Gf;
						},

						rmFile : function(aO) {
							var ae = this;
							delete ae.Gf[aO.get("sId")];
						},

						addFile : function(ah) {
							var ae = this, dg;

							if (ah instanceof ae.qmFile) {
								dg = ah;
							} else {
								ah.sId = ah.sId || A.unikey();
								ah.nTry = 0;
								ah.sType = ae.name;
								dg = new ae.qmFile(ah);
								dg.oUploader = ae;
							}
							dg.set("sStatus", "ready");
							ae.Gf[dg.get("sId")] = dg;
							return dg;
						}
					});

	var aIh = function(ah) {
		afV.call(this, ah);
	}
	aIh.prototype = new afV( {});

	aIh.prototype.uploadToFtn = function() {
		var ae = this;
		return ae.oUploader.uploadToFtn(ae);
	}

	oN
			.createCom(
					"baseToFtn",
					function(ax) {
						return ( {
							qmFile : aIh,

							oncomplete : function(aO) {
								var ae = this;

								if (aO.get("bFtnFile")) {
									A.QMAjax
											.send(
													A
															.T(
																	"/cgi-bin/ftnGetURL?sid=$sid$&t=ftn.json&s=part&fid=$fid$&ef=js")
															.replace(
																	{
																		sid : A
																				.getSid(),
																		fid : aO
																				.get("sFileId")
																	}),

													{
														onload : function(lI,
																bK, cq) {
															if (lI) {
																var cL = A
																		.evalValue(bK), vK;

																if (cL.errcode == "0") {
																	if (cL.oFile
																			&& cL.oFile.sKey
																			&& cL.oFile.sFetchCode) {
																		aO
																				.set(
																						cL.oFile)
																				.set(
																						{
																							sDownloadPage : [
																									"http://mail.qq.com/cgi-bin/ftnExs_download?t=exs_ftn_download&k=",
																									cL.oFile.sKey,
																									"&code=",
																									cL.oFile.sFetchCode ]
																									.join("")

																						});
																		ax.oncomplete
																				.call(
																						ae,
																						aO
																								.set(
																										"sStatus",
																										"uploading"));
																		return;
																	} else {
																		vK = ae
																				.err(
																						"cgi",
																						cL.errcode);
																	}
																} else {
																	vK = ae
																			.err(
																					"http",
																					cL.errcode);
																}
																ax.onerror
																		.call(
																				ae,
																				aO
																						.set( {
																							sError : vK
																						}));
															} else {
																ax.onerror
																		.call(
																				ae,
																				aO
																						.set( {
																							sError : ae
																									.err(
																											"http",
																											bK)
																						}));
															}
														}
													});
								} else {
									ax.oncomplete.call(ae, aO);
								}
							},

							uploadToFtn : function(aO) {
								var ae = this;

								if (!ae.prepareUpload_(aO)) {
									return false;
								}

								var aes = aO.get("nAppId") || 2;
								aO.oCfg = {
									sFlashMode : "RawPost"
								};

								A.QMAjax
										.send(
												A
														.T(
																"/cgi-bin/ftnCreatefile?sid=$sid$&path=$path$&type=direct&s=comCreate&appid=$appid$&dirid=$dirid$&ef=js&resp_charset=UTF8&loc=$loc$")
														.replace(
																{
																	sid : A
																			.getSid(),
																	loc : [
																			"ftnCreatefile",
																			"ftnCreatefile",
																			"comCreate",
																			(aO
																					.get("sFrom") || "")
																					+ aes ]
																			.join(","),
																	appid : aes,
																	dirid : aO
																			.get("sPathId")
																			|| "",
																	path : encodeURIComponent(aO
																			.get("sName"))
																}),
												{
													headers : {
														"If-Modified-Since" : "0",
														"Cache-Control" : "no-cache, max-age=0"
													},
													onload : function(lI, bK,
															cq) {
														var cL;
														if (lI) {
															cL = A
																	.evalValue(bK);
															if (cL.errcode == "0"
																	&& cL.url) {

																aO.set(cL.data);
																aO.oCfg = {
																	sUrl : cL.url,
																	sFlashMode : "RawPost",
																	sFile : "file",
																	oQueryData : {},
																	oBodyData : {
																		mode : /Flash/
																				.test(aO.oUploader.name) ? "flashupload"
																				: "formupload"
																	}
																};

																ae
																		.upload(aO
																				.set(
																						"sStatus",
																						"ready"));
																ae
																		.setKeepAlive(true);
																return true;
															}
														}

														ae
																.onerror(aO
																		.set( {
																			nPercent : 0,
																			sError : (cL && cL.errcode) ? ae
																					.err(
																							"cgi",
																							cL.errcode,
																							cL.appname)
																					: ae
																							.err(
																									"http",
																									cq.status)
																		}));
													}
												});

								ae.onprocess(aO.set( {
									nUploadPercent : 0,
									bFtnFile : true,
									nUpTime : new Date().valueOf()
								}));
								return true;
							}

						});
					}, "base");

	window.QMFileUpload = oN;

})(QMFileAdaptor);

(function(A, aC) {

	var oN = QMFileUpload, ace = oN.components["base"].prototype;

	var bya = {
		"unknow" : 100000000,
		"http" : 200000000,
		"cgi" : 300000000,
		"internal" : 400000000
	};

	var cqe = {
		"RawPost" : 3,
		"CheckPost" : 7,
		"MultiPost" : 9
	};

	oN.errInfo = ace.errInfo = function(aO) {
	}

			ace.ossLog = function(aO) {
				var ae = this, aI = ae.cfg(aO), sy, aQ = ae.name, jp = 0, bBo = 0;

				if (aO.get("sStatus") == "error") {
					var eo = (aO.get("sError") || "").split(",");

					sy = bya[eo[0]];

					if (sy) {
						if (aO.get("nUploadPercent") < 100
								&& eo[0] == "internal") {
							sy = 500000000;
						}
						sy += Math.abs(eo[1]);
					}
				} else if (aO.get("sStatus") == "cancel") {
					sy = 900000001;
				} else if (aO.get("sStatus") == "stopped"
						&& aO.get("sUploadStep") == "paused") {
					sy = 900000;
				} else if (aO.get("sStatus") == "complete") {
					var fj = aO.get("nSize") / 1024 / 1024, sy = 0;

					if (fj >= 1 && fj < 6) {
						sy = Math.floor(fj);
					} else if (6 <= fj && fj <= 50) {
						sy = 6;
					} else if (50 < fj && fj <= 1024) {
						sy = 7;
					} else if (fj > 1024) {
						sy = 8;
					}
					sy = sy * 100000;

					if (aO.get("nTry") > 1) {
						sy += 1000000;
					}

					if (/Flash/.test(aQ) && (bBo = aO.get("nPostMode"))) {
						sy += (bBo * 10000000);
					}
				}

				if (typeof sy == "undefined") {
					return;
				}

				if (/Flash/.test(aQ)) {
					jp = aO.get("nUpType") || cqe[aI.sFlashMode] || 3;

					if (aO.get("bFtnFile")) {
						jp = 3;
					}
				} else if (/Activex/.test(aQ)) {
					jp = 2;
				} else if (/Rawinput/.test(aQ)) {
					jp = 5;
				} else if (/Html5/.test(aQ)) {
					jp = 1;
				} else if (/Ftn/.test(aQ)) {
					jp = 6;
				}

				var bHf = /http:\/\/(.*?)\//.exec(ae.cfg(aO).sUrl);
				A
						.ossLog(
								"delay",
								"all",
								A
										.T(
												"stat=$stat$&ftype=$ftype$&utype=$utype$&errno=$errno$&retry=$retry$&fsize=$fsize$&utime=$utime$&percent=$percent$&errdetail=$errdetail$&uphost=$uphost$")
										.replace(
												{
													stat : aI.bOssLog === false ? "custom"
															: "attach",
													retry : 0,
													ftype : aO.get("bFtnFile") ? "1"
															: "0",
													errno : sy,
													utype : jp,
													fsize : aO
															.get("nRealPostSize")
															|| aO.get("nSize"),

													utime : aO
															.get("nRealPostTime")
															|| aO
																	.get("nUsedTime")
															|| -1,
													percent : aO
															.get("nUploadPercent"),
													uphost : bHf && bHf[1],
													errdetail : aO
															.get("sError")
												}));
			},

			ace.err = function(aw, Da) {
				return [].slice.call(arguments).join(",");
			}

	ace.parser = function(ez, aO) {
		var ae = this, aI = ae.cfg(aO), aE = {}, dN = "error";

		if (/.*\/cgi-bin\/uploadfile/.test(aI.sUrl)) {
			var eo;
			if (ez.indexOf("/data/") != -1) {
				eo = ez.split("|");

				aE.sFileId = eo[0].split("/").pop();
				eo[1] && (aE.sFileUrl = eo[1]);
				dN = "complete";
			} else if (eo = /"errorcode" : "(.*)"/gi.exec(ez)) {
				dN = "error";
				aE.sError = ae.err("cgi", eo[1]);
			}
		}

		else if (/.*\/cgi-bin\/upload/.test(aI.sUrl)) {
			if (/var\s*result\s*=\s*"qmfileuploadsuccess";/.test(ez)) {
				var eo = /viewfileurl="(.*?)";/.exec(ez);

				aE.sFileUrl = eo && (eo[1] + "&sid=" + A.getSid());

				eo = /filepath="(.*?)";/.exec(ez);
				aE.sFileId = eo && eo[1].split("/").pop();
				dN = "complete";

				eo = /filesize="(.*?)";/.exec(ez);
				var fj = parseInt(eo && eo[1], 10);
				if (fj) {
					aE.nSize = fj;
				}
			} else if (/title\s*:\s*"cgi exception",/.test(ez)) {
				var eo = /errcode\s*:\s*"(.*?)",/gi.exec(ez);
				aE.sError = ae.err("cgi", eo ? eo[1] : "0");
			}
		}

		else if (/\/ftn_handler/.test(aI.sUrl)) {
			var eo = /parent\.ftn_post_end\((.*?)\)/.exec(ez);
			if (eo[1] == 0) {
				dN = "complete";
			} else {
				aE.sError = ae.err("cgi", eo ? eo[1] : "0");
			}
		}

		if (dN != "complete" && !aE.sError) {
			aE.sError = ae.err("unknow", "0");
		}

		return [ dN, aE ];
	}

})(QMFileAdaptor);

(function(A, aC) {
	var Gz = QMFileUpload.components, ay = window;

	var aR = QMFileUpload.oUtil;
	var abh = function() {
	};

	QMFileUpload
			.createCom(
					"ActivexPopup",
					function(ax) {
						return ( {
							init : function(ap) {
								var ae = this;
								ax.init.call(ae, ap);
								ae.awK();
								ae.uL();
							},

							awK : function() {
								var ae = this, aI = ae.oCfg;

								aI.oQueryData = A.extend( {

									resp_charset : A.isSystem("mac") ? "UTF8"
											: "",
									t : "qmfileupload",
									ef : "qdata",
									ssl_edition : A.getCookie("ssl_edition"),
									sid : A.getSid(),
									mode : "file"
								}, aI.oQueryData);
							},

							upload : function(aO) {
								var ae = this, aI = ae.cfg(aO);

								if (!ae.prepareUpload_(aO)) {
									return false;
								}

								var lN = A.createActiveX(2, A
										.getDomWin(aI.oContainer));

								ae.HO(aO, aI, lN);
								lN.AddFormItem(aI.sFile, 4, 0, aO.get("sFid"));

								aO.set( {
									sStatus : "uploading",
									nTry : aO.get("nTry") + 1,
									nUpTime : new Date().valueOf()
								});
								aO.fCancel = function() {
									lN.StopUpload();
								};
								lN.StartUpload();
							},

							pE : function(qy, aO) {
								var ae = this, bcM = "axver=", gW = aO
										.get("sFid");

								try {
									bcM += qy.Version;
								} catch (e) {

								}

								qy.OnEvent = function(py, bxl, Tt, VN, aKY) {
									switch (bxl) {
									case 1:
										ae.onerror(aO.set( {
											sError : ae.err("internal", Tt, VN,
													bcM)
										}));
										break;
									case 2:
										ae.onprocess(aO.set( {
											nUploadPercent : Tt / VN * 100
										}));
										break;
									case 3:
										debug( [ "OnEvent", qy.ResponseCode,
												qy.Response ]);
										if (qy.ResponseCode != "200") {

											ae.onerror(aO.set( {
												sError : ae.err("http",
														qy.ResponseCode, bcM)
											}));
										} else {
											var aE = ae.parser(qy.Response, aO);
											(ae["on" + aE[0]] || abh).call(ae,
													aO.set(aE[1]));
										}
										break;
									}
								}
							},

							HO : function(aO, ap, qy) {
								var ae = this;
								ae.pE(qy, aO);

								qy.URL = aR.cfg2Url(ap);

								qy.AddHeader("Cookie", document.cookie);

								A.E(ap.oBodyData, function(bd, bm) {
									qy.AddFormItem(bm, 0, 0, bd);
								});
							},

							arX : function(wk, qy) {
								var ae = this, lN = qy || A.createActiveX(2);

								if (wk && typeof wk == "string") {
									var _oFileList = [];
									A
											.E(
													wk.split("\r\n"),
													function(baY) {
														var Xv = A.trim(baY)
																.split(" ");
														if (Xv.length >= 2) {
															var dg, gW = Xv
																	.shift(), gl = Xv
																	.join(" "), fj = parseInt(lN
																	.GetFileSize(gl));

															dg = ae
																	.addFile( {
																		sFid : gW,
																		sStatus : "ready",
																		sName : gl
																				.split(
																						/[\\\/]/)
																				.pop(),
																		nSize : fj
																	});
															_oFileList.push(dg);
														}
													});
									ae.onselect(_oFileList);
								}
							},

							uL : function() {
								var ae = this, aI = ae.oCfg, _oContainer = aI.oContainer;

								A.addEvent(_oContainer, "click", function(
										_aoEvent) {
									var lN = A.createActiveX(2);
									if (lN) {
										var bqx = lN.SelectFiles(ay);
										ae.arX(bqx, lN);
										A.stopPropagation(_aoEvent);
									}
								});
							}
						});
					}, "baseToFtn");

	QMFileUpload
			.createCom(
					"ActivexPaste",
					function(ax) {
						return ( {
							uL : function() {
								var ae = this, aI = ae.oCfg, _oContainer = aI.oContainer;

								if (_oContainer && aI.bBindKeyDown) {
									A
											.addEvent(
													_oContainer,
													"keydown",
													function(_aoEvent) {
														if ((_aoEvent.ctrlKey || _aoEvent.metaKey)
																&& (_aoEvent.keyCode == 86 || _aoEvent.keyCode == 118)
																&& !_aoEvent.cancelBubble) {
															ae
																	.getClipBoardFiles(_aoEvent);
														}
													});
								}
							},

							getClipBoardFiles : function(_aoEvent) {
								var ae = this, lN = A.createActiveX(2);

								if (lN) {
									var bDS = lN.GetClipboardFiles();
									ae.arX(bDS);
									if (bDS) {

										A.preventDefault(_aoEvent);
									}
								}
							}
						});
					}, "ActivexPopup");

	function aKJ() {
		var lN = A.createActiveX(0), gl = "";

		try {
			gl = lN.GetDLLFileName();
		} catch (e) {
		}
		if (gl.indexOf("_2.dll") != -1) {
			return [
					'<object classid="CLSID:B0F77C07-8507-4AB9-B130-CC882FDDC046"',
					' width=100% height=100%></object>' ].join("");
		} else {
			return [
					'<object classid="CLSID:F4BA5508-8AB7-45C1-8D0A-A1237AD82399"',
					' width=100% height=100%></object>' ].join("");
		}
	}

	var Ay = '\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5FEB\u6377\u952Ectrl+c\u3001ctrl+v\u6765\u6DFB\u52A0\u9644\u4EF6\u3002', acd = '\u91CA\u653E\u9F20\u6807';

	A.extend(aR, {
		getDragCode4Ax : aKJ,
		sDragEnter : Ay,
		sDragOver : acd
	});

	QMFileUpload.createCom("ActivexDrag", function(ax) {

		return ( {
			uL : function() {
				var ae = this, aI = ae.oCfg, IK, _oContainer = aI.oContainer;

				_oContainer.innerHTML = aKJ();
				setTimeout(function() {
					IK = ae.bjc = _oContainer.firstChild;
					A.extend(IK, {
						text : Ay,
						backColor : 0xffffff,
						textColor : 0x000000,
						textFacName : "\u5B8B\u4F53",
						textFontSize : 10,
						textFontWeight : 500,
						OnFilesDroped : function(wk) {
							ae.bfP(wk);
						}
					});
				}, 200);
			},

			bfP : function(wk) {
				var ae = this, IK = ae.bjc;
				switch (wk) {
				case "ENTER":
					IK.text = acd;
					break;
				case "LEAVE":
					IK.text = Ay;
					break;
				case "OVER":
					break;
				default:
					IK.text = Ay;
					ae.arX(wk);
					break;
				}
				;
			}
		});
	}, "ActivexPopup");

})(QMFileAdaptor);

(function(A, aC) {
	var oN = QMFileUpload, Gz = oN.components;

	var aR = QMFileUpload.oUtil;

	var abh = function() {
	};

	var aAo = A.T( [ "top:0;left:0;", "position:absolute;", "cursor:pointer;",
			"width:$width$px;", "height:$height$px;", "overflow:hidden;",
			"background-color:#fff;", "filter: alpha(opacity=0);", "zoom:1;",
			"opacity:0.0;", "z-index:1;" ]);

	var aMr = A.T( [ 'cursor: pointer; ', 'font-family: Times;',
			'position: absolute; ', 'cursor: pointer; ', 'width:200px; ',
			'height:200px; ', 'font-size:50px; ',
			A.isBrowser("ff") ? 'right:426px; ' : 'right:0px;' ]);

	QMFileUpload
			.createCom(
					"RawinputPopup",
					function(ax) {
						return ( {
							init : function(ap) {
								var ae = this;
								ax.init.call(ae, ap);
								ae.awK();
								ae.uL();
							},

							awK : function() {
								var ae = this, aI = ae.oCfg;

								aI.oQueryData = A.extend( {
									t : "qmfileupload",
									ef : "qdata",
									sid : A.getSid(),
									mode : "file"
								}, aI.oQueryData);
							},

							upload : function(aO) {
								var ae = this, aI = ae.cfg(aO);

								if (!ae.prepareUpload_(aO)) {
									return false;
								}

								ae.HO(aO, aI, function() {
									ae.SO(aO);
								});
								return true;
							},

							SO : function(aO) {
								var ae = this, bax = new Date().valueOf(), bBc = function() {
									ae.onprocess(aO.set( {
										nTry : aO.get("nTry") + 1,
										nUpTime : bax,
										nUploadPercent : -1
									}));
								};

								aO.oForm.submit();
								bBc();

								setTimeout(function() {
									if (aO.get("sStatus") == "uploading") {
										bBc();
										setTimeout(arguments.callee, 1000);
									}
								}, 1000);
							},

							HO : function(aO, ap, bD) {
								var ae = this, uF = "if" + ap.sId, ay = A
										.getDomWin(ap.oContainer), ahU = ay.document, aB = {

									id : uF,
									obj : ahU.body,
									where : "beforeEnd",
									style : "display:none;",
									onload : function(ao) {
										var qe = this, eH = aO.oForm;

										A.extend(eH, {
											method : "post",
											target : uF,
											action : aR.cfg2Url(ap)
										});
										eH.encoding = "multipart/form-data";
										eH.style.display = "none";

										eH.firstChild.name = ap.sFile;

										A.E(ap.oBodyData, function(bd, bm) {
											var acF = ahU
													.createElement("input");
											acF.type = "hidden";
											acF.name = bm;
											acF.value = bd;
											eH.appendChild(acF);
										});
										ahU.body.appendChild(eH);

										aB.onload = function() {
											var cu, aE;
											try {
												cu = getTop()
														.htmlDecode(
																qe.contentWindow.document.documentElement.innerHTML);
												cu = cu
														.replace(/BODY/g,
																'body');
												var ph = cu
														.match(/<body>(.*?)<\/body>/);
												if (ph[1]) {
													cu = ph[1];
												}
												aE = ae.parser(cu, aO);
											} catch (e) {
												aE = [ "complete", {} ];
											}

											A.removeSelf(qe);
											A.removeSelf(eH);

											(ae["on" + aE[0]] || abh).call(ae,
													aO.set(aE[1]));
											aO.oForm = aO.oFile = null;
										};

										aO.fCancel = function() {
											A.removeSelf(qe);
											A.removeSelf(eH);
										}

										bD();
									}
								};

								A.createBlankIframe(ay, aB);
							},

							UC : function() {
								var ae = this, aI = ae.oCfg, _oDom = ae.bL, aM = A
										.getDomWin(_oDom).document, bI = aM
										.createElement("input");

								bI.type = "file";
								bI.name = aI.sFile;
								bI.style.cssText = aMr;

								bI.onchange = function() {
									ae.nf(this);
								}

								A.addEvent(bI, "click", function(_aoEvent) {
									A.stopPropagation(_aoEvent);
								});

								_oDom.appendChild(bI);
							},

							nf : function(bw) {
								var ae = this, aM = A.getDomWin(bw).document, eH = aM
										.createElement("form");

								eH.appendChild(bw);

								ae.UC();
								var dg = ae.addFile( {
									sName : bw.value.split("\\").pop()
								});
								dg.oForm = eH;
								ae.onselect( [ dg ]);
							},

							uL : function() {
								var ae = this, aI = ae.oCfg, _oContainer = ae.oCfg.oContainer, aM = A
										.getDomWin(_oContainer).document, _oDom = aM
										.createElement("span");

								ae.bL = _oDom;
								_oDom.style.cssText = aAo.replace( {
									width : _oContainer.offsetWidth,
									height : _oContainer.offsetHeight + 1
								});
								ae.UC();

								_oContainer.style.position = "relative";
								_oContainer.insertBefore(_oDom,
										_oContainer.firstChild);
							}
						});
					}, "baseToFtn");

	QMFileUpload
			.createCom(
					"Html5Popup",
					function(ax) {
						return ( {

							init : function(ap) {
								var ae = this;
								ax.init.call(ae, ap);
								ae.awK();
								ae.uL();
							},

							awK : function() {
								var ae = this, aI = ae.oCfg;

								aI.oQueryData = A.extend( {
									t : "qmfileupload",
									ef : "qdata",
									sid : A.getSid(),
									resp_charset : "UTF8",
									mode : "file"
								}, aI.oQueryData);
							},

							upload : function(aO) {
								var ae = this, aI = ae.cfg(aO);

								if (!ae.prepareUpload_(aO)) {
									return false;
								}

								var cF = new XMLHttpRequest();
								ae.Uf = cF;
								ae.HO(aO, aI, cF);

								aO.set( {
									sStatus : "uploading",
									nTry : aO.get("nTry") + 1,
									nUpTime : new Date().valueOf()
								});
								aO.fCancel = function() {
									cF.abort();
								};

								cF.send(aO.oFile);
								return true;
							},

							uL : function() {
								var ae = this, aI = ae.oCfg, _oContainer = ae.oCfg.oContainer, aM = A
										.getDomWin(_oContainer).document, _oDom = aM
										.createElement("span");

								ae.bL = _oDom;
								_oDom.style.cssText = aAo.replace( {
									width : aI.nWidth
											|| _oContainer.offsetWidth,
									height : aI.nHeight
											|| _oContainer.offsetHeight + 1
								});
								ae.UC();

								_oContainer.style.position = "relative";
								_oContainer.insertBefore(_oDom,
										_oContainer.firstChild);
							},

							UC : function() {
								var ae = this, aI = ae.oCfg, _oDom = ae.bL, aM = A
										.getDomWin(_oDom).document, bI = aM
										.createElement("input");

								bI.type = "file";
								bI.name = aI.sFile;
								bI.style.cssText = aMr;

								if (aI.bMulti !== false) {
									bI.multiple = "true";
								}

								bI.onchange = function() {
									ae.nf(this);
								}

								A.addEvent(bI, "click", function(_aoEvent) {
									A.stopPropagation(_aoEvent);
								});

								_oDom.appendChild(bI);
							},

							nf : function(bw) {
								var ae = this, _oFileList = [], _oFiles = bw.files;

								A.removeSelf(bw);
								ae.UC();

								A.E(_oFiles, function(bd) {
									var dg = ae.addFile( {
										sName : bd.name,
										nSize : parseInt(bd.size, 10)
									});
									dg.oFile = bd;
									_oFileList.push(dg);
								});
								ae.onselect(_oFileList);
							},

							HO : function(aO, ap, cq) {
								var ae = this, aQ = aO.get("sName");

								if (A.isBrowser("safari")) {
									aQ = encodeURIComponent(aQ).replace(
											/%(\w{2})/ig,
											function(bDL, aas) {
												return String
														.fromCharCode(parseInt(
																aas, 16));
											});
								}

								cq.upload.onprogress = function(_aoEvent) {
									if (_aoEvent.lengthComputable) {
										ae.onprocess(aO.set( {
											nUploadPercent : _aoEvent.loaded
													/ _aoEvent.total * 100
										}));
									}
								}

								cq.onreadystatechange = function() {
									if (cq.readyState == 4) {
										cq.onreadystatechange = cq.upload.onprogress = null;

										if (cq.status == 200) {
											var aE = ae.parser(cq.responseText,
													aO);
											ae["on" + aE[0]].call(ae, aO
													.set(aE[1]));
										} else {
											var bDh = "";
											if (cq.status == 0) {
												for ( var FC in cq) {
													bDh += FC + "=" + cq[FC]
															+ ",";
												}
											}
											ae.onerror(aO.set( {
												sError : ae.err("http",
														cq.status, "detail=",
														bDh)
											}));
										}
									}
								}

								cq.open("POST", aR.cfg2Url(ap), true);
								cq.setRequestHeader("X-QQMAIL-FILENAME", aQ);
								cq.setRequestHeader("content-type",
										"application/octet-stream");
							}
						});
					}, "base");

	QMFileUpload
			.createCom(
					"Html5Drag",
					function(ax) {
						var Ay, acd = '\u91CA\u653E\u9F20\u6807';

						return ( {
							uL : function() {
								var ae = this, aI = ae.oCfg, _oContainer = ae.oCfg.oContainer, aM = A
										.getDomWin(_oContainer).document, _oDom = aM
										.createElement("div");

								_oDom.style.cssText = "width:100%;height:100%;font-size:14px;text-align:center;line-height:150px;";

								if (!Ay) {
									Ay = A.detectActiveX(2, 1) ? '\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5FEB\u6377\u952Ectrl+c\u3001ctrl+v\u6765\u6DFB\u52A0\u9644\u4EF6\u3002'
											: '\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF';
								}

								_oDom.innerHTML = Ay;

								A.addEvent(_oDom, "dragover",
										function(_aoEvent) {
											if (aR.isFileDragOver(_aoEvent)) {
												_oDom.innerHTML = acd;
											}
											A.stopPropagation(_aoEvent);
											A.preventDefault(_aoEvent);
										});

								A.addEvent(_oDom, "dragleave", function(
										_aoEvent) {
									if (aR.isFileDragOver(_aoEvent)) {
										_oDom.innerHTML = Ay;
									}
									A.stopPropagation(_aoEvent);
									A.preventDefault(_aoEvent);
								});

								A.addEvent(_oDom, "drop", function(_aoEvent) {
									if (_aoEvent.dataTransfer.files.length) {
										ae.bvg(_aoEvent);
										_oDom.innerHTML = Ay;
									}
									A.stopPropagation(_aoEvent);
									A.preventDefault(_aoEvent);
								});

								_oContainer.insertBefore(_oDom,
										_oContainer.firstChild);
							},

							bvg : function(_aoEvent) {
								var ae = this, _oFileList = [], _oFiles = _aoEvent.dataTransfer.files;

								A.E(_oFiles, function(bd) {
									var dg = ae.addFile( {
										sName : bd.name,
										nSize : parseInt(bd.size, 10)
									});
									dg.oFile = bd;
									_oFileList.push(dg);
								});
								ae.onselect(_oFileList);
							}
						});
					}, "Html5Popup");

})(QMFileAdaptor);

(function(A, aC) {
	var Gz = QMFileUpload.components, ay = window, bpJ = A
			.T( [
					'<span style="top:0;left:0;position:absolute;width:100%;height:100%;margin:$margin$;z-index:0;overflow:hidden;">',
					'$code$', '</span>' ]);

	var aR = QMFileUpload.oUtil;

	var abh = function() {
	};

	QMFileUpload
			.createCom(
					"FlashPopup",
					function(ax) {
						return ( {

							init : function(ap) {
								var ae = this;
								ax.init.call(ae, ap);
								ae.uL();
							},

							upload : function(aO) {
								var ae = this, sW = ae.MZ, aI = ae.cfg(aO);

								if (!ae.prepareUpload_(aO)) {
									return false;
								}

								ae.HO(aI);
								aO.set( {
									bVirtual : aI.sFlashMode != "RawPost",
									sStatus : "uploading",
									nTry : aO.get("nTry") + 1,
									nUpTime : new Date().valueOf()
								});
								aO.fCancel = function() {
									sW.cancel();
								};
								sW.upload(aO.get("sFid"), aI.sFile,
										aI.sFlashMode == "RawPost" ? 0 : 1);
								return true;
							},

							cancel : function(aO) {
								var ae = this;

								aO.set("nUpType", ae.MZ.getCurUptype());
								ax.cancel.call(ae, aO);
							},

							getFile : function(fU) {
								var ae = this, _oFiles = ax.getFile.call(ae);

								for ( var i in _oFiles) {
									if (_oFiles[i].get("sFid") == fU) {
										return _oFiles[i];
									}
								}
								return _oFiles;
							},

							HO : function(ap) {
								var ae = this, sW = ae.MZ;

								A.E(ap.oBodyData, function(bd, bm) {
									sW.addUploadVar(bm, bd);
								});
								sW.setUploadUrl(aR.cfg2Url(ap));
							},

							brt : function(fm) {
								var ae = this, aI = ae.oCfg;

								return bpJ.replace( {
									height : aI.nHeight || fm.offsetHeight,
									width : aI.nWidth || fm.offsetWidth,
									margin : aI.nMargin || 0,
									code : A.generateFlashCode("flashUploader_"
											+ aI.sId,
											A.getPath("swf")
													+ "uploader.swf?r="
													+ Math.random(), {
												width : "100%",
												height : "100%"
											}, {
												wmode : "transparent"
											})
								});
							},

							bdZ : function(aEi) {
								var ae = this, sW = ae.MZ;

								if (aEi && !ae.cVm) {
									ae.cVm = true;
									setInterval(function() {

									}, 1000);
								}
							},

							uL : function() {
								var ae = this, aI = ae.oCfg, _oContainer = aI.oContainer, ay = A
										.getDomWin(_oContainer);

								if (_oContainer) {
									aI.sId = Math.random();

									var cu = ae.brt(_oContainer);

									_oContainer.style.position = "relative";
									if (A.browserVer() == 6) {
										_oContainer.style.zoom = 1;
										_oContainer.style.overflow = "hidden";
									}
									A.insertHTML(_oContainer, "afterBegin", cu);

									setTimeout(
											function() {
												(new A.qmFlash(
														{
															id : "flashUploader_"
																	+ aI.sId,
															win : ay,
															onSelect : function(
																	aql, arG) {
																ae
																		.bAH(
																				aql,
																				arG);
															},
															onProcess : function(
																	ng, ko) {
																ae.bdZ(true);
																ae
																		.onprocess(ae
																				.getFile(
																						ng)
																				.set(
																						{
																							nUploadPercent : ko
																						}));
															},
															onError : function(
																	ng, agL,
																	hP, ko) {
																var dg = ae
																		.getFile(ng);

																ae.bdZ(false);
																ae
																		.onerror(dg
																				.set( {
																					nUpType : ae.MZ
																							.getCurUptype(),
																					nUploadPercent : ko,
																					sError : ae
																							.err(
																									"internal",
																									parseInt(
																											hP
																													.replace(
																															/Error #/g,
																															''),
																											10),
																									"flashver="
																											+ A.qmFlash
																													.getFlashVer().desc)
																				}));
															},
															onComplete : function(
																	ng, ah, cOh) {
																var dg = ae
																		.getFile(ng), dH = ae
																		.parser(
																				ah,
																				dg);

																ae.bdZ(false);
																dg
																		.set( {
																			nPostMode : cOh,
																			nUpType : ae.MZ
																					.getCurUptype()
																		});

																(ae["on"
																		+ dH[0]] || abh)
																		.call(
																				ae,
																				dg
																						.set(dH[1]));
															}
														}))
														.setup(function(tz, aYz) {
															if (tz) {

																_oContainer.firstChild.style.zIndex = 2;
																ae
																		.bvl(this
																				.getFlash());
															} else {
																_oContainer
																		.removeChild(_oContainer.firstChild);
																debug("the flash uploader is not ok...");
															}
														});
											}, 300);
								}
							},

							setPostMode : function(da) {
								var ae = this, sW = ae.MZ, aI = ae.oCfg;

								if (sW.setMultiAndResumeMode
										&& A.isBrowser("chrome")
										&& aI.sFlashMode == "CheckPost") {
									sW.setMultiAndResumeMode(0);
								}
								alR = {
									sid : A.getSid(),
									lang : "utf8",
									ssl_edition : A.getCookie("ssl_edition"),
									skey : A.getCookie("skey"),
									uin : A.getUin(),
									qm_sk : A.getCookie("qm_sk"),
									mode : "file"
								};

								if (aI.sFlashMode == "RawPost") {
									aI.sUrl = ae.getDefUploadUrl();
									alR.ef = "qdata";
									alR.t = "qmfileupload";
								}

								aI.oQueryData = A.extend(alR, aI.oQueryData);
							},

							bvl : function(Ue) {
								var ae = this, aI = ae.oCfg, alR;

								aI.sFlashMode = aI.sFlashMode || "RawPost";

								ae.MZ = Ue;
								if (aI.bMulti !== false) {
									Ue.initlize("multi");
								} else {
									Ue.initlize("single");
								}

								ae.setPostMode();

								Ue.clearUploadVars();
								Ue.addUploadVar("timeout", 60000);
							},

							bAH : function(aql, arG) {
								var ae = this, aI = ae.oCfg, sW = ae.MZ, _oFileList = [];

								for ( var i = aql; i <= arG; i++) {
									var dg = ae.addFile( {
										sFid : i,

										sName : sW.getFileInfo(i, "name"),
										nSize : parseInt(sW.getFileInfo(i,
												"size"), 10)
									});
									_oFileList.push(dg);
								}
								ae.onselect(_oFileList);
							}
						});
					}, "baseToFtn");

})(QMFileAdaptor);

var gnQmToolLoad = new Date().getTime() - dvo;

function qmtool_js() {
}