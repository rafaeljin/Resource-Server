(function(A) {
	var oL = QMFileUpload, ay = window;

	var fAO = oL.qmCreater, aUB = new fAO(), cbx;

	var cnN = aUB.detects;

	cnN["Ftn"] = function(aw) {
		if (aw == "popup") {
			return A.detectActiveX(3, 1)
		} else if (aw == "drag") {
			return false && A.isBrowser("ie") && A.detectActiveX(4, 1)
					&& A.detectActiveX(3, 1);
		} else if (aw == "paste") {
			return A.detectActiveX(2, 1) && A.detectActiveX(4, 1);
		}
	};

	aUB.orders = {
		"popup" : [ "Ftn", "FlashPopup", "ActivexPopup", "RawinputPopup" ],
		"drag" : [ "Ftn" ],
		"paste" : [ "Ftn" ]
	};

	var aJg = oL.oUtil.getDragCode4Ax, zX = '\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF', abV = '\u91CA\u653E\u9F20\u6807';

	oL.createFtn = function(aw, ap) {
		if (cbx) {
			if (!cnN["Ftn"](aw)) {
				return;
			}
			if (typeof ap == "function") {
				ap = ap.call(ae, ae.name);
			}
			ap.sType = aw;
			cbx.uK(ap)
			cbx.initCallBack(ap);
			return cbx;
		}
		return aUB.create(aw, function(aD) {
			if (/Ftn/.test(aD) && !cbx) {
				cbx = this;
				A.addEvent(window, 'unload', function() {
					cbx.dGc();
				});
			}
			return ap;
		});
	}

	QMFileUpload
			.createCom(
					"Ftn",
					function(ax) {
						return ( {
							init : function(ap) {
								var ae = this;
								ax.init.call(ae, ap);
								ae.fTQ();
								ae.uK(ae.oCfg);
							},
							fTQ : function() {
								var ae = this, aaK = function() {
								}, fru = {
									"1" : ae.fOr,
									"2" : ae.fda,
									"3" : ae.fdJ,
									"4" : ae.fhM,

									"6" : ae.ghg
								};

								ae.aeV = A.createActiveX(3);
								ae.aeV.RetryTime = 20;
								ae.aeV.TimeOut = 90 * 1000;
								ae.aeV.BlockSize = 128 * 1024;
								ae.aeV.BreakSize = 64 * 1024;
								ae.aeV.MaxConcurrentUploadNum = ae.nConcurrent;
								ae.aeV.OnEvent = function(bk) {
									var aV = ae.aeV
											.UserDatabyLocalID(bk.LocalID);
									if ((bk.ErrorCode && bk.ErrorCode != "0")
											|| (bk.Step && bk.Step != "0")) {
										debug( [ "ax onevent error:",
												bk.ErrorCode, bk.Step ]);
										var de = ae.getFile(aV);
										if (de.get("sUploadStep") == "posting") {
											de.set("sUploadStep", "paused");
										}
										ae.onerror(de.set("sError", ae.err(
												"internal", bk.ErrorCode,
												bk.Step, ae.aeV.Version)));
										ae.ossLog(de);
									} else {
										if (ae.getFile(aV)) {
											(fru[bk.EventType] || aaK).call(ae,
													bk, aV);
										} else {
											debug("can`t find:" + aV);
										}
									}
								}
							},

							dGc : function() {
								var ae = this, _oFiles = ae.getFile();
								if (ae.aeV) {
									for ( var i in _oFiles) {
										var de = _oFiles[i], ahA;
										if (ahA = de.get("nLocalID")) {
											ae.aeV.ReleaseLocal(ahA);
										}
									}
								}
							},

							fdJ : function(bk, aL) {
								var ae = this, de = ae.getFile(aL);

								ae.onprocess(de.set("nUploadPercent", 100));

								ae.oncomplete(de);
								ae.aeV.ReleaseLocal(bk.LocalID);
								de.set("nLocalID", 0);
								de.fCancel = null;
							},

							fHV : function(aO, ddJ) {
								var ae = this;

								if (!aO.pause) {
									aO.fCancel = function() {
										ae.aeV.StopUpload(ddJ);
										ae.aeV.ReleaseLocal(ddJ);
										aO.set("nLocalID", 0);
									}
									aO.pause = function() {
										if (aO.get("sUploadStep") == "posting") {
											ae.aeV.StopUpload(ddJ);

											ae.callBack("onprocess", [ aO.set( {
												sStatus : "stopped",
												sUploadStep : "paused"
											}) ]);

											ae.eAT(aO, -1);
											ae.ossLog(aO);
										}
									}
									aO.resumeLocal = function() {
										if (aO.get("sUploadStep") == "paused") {
											ae.callBack("onprocess", [ aO.set( {
												sStatus : "uploading",
												sUploadStep : "posting",
												nStartTime : new Date()
														.valueOf(),
												nRealPostTime : 0,
												nRealPostSize : 0
											}) ]);
											setTimeout(function() {
												ae.aeV.ResumeFileLocal(ddJ);
											}, 500);
										}
									}
								}
							},

							fhM : function(bk, aL) {
								var ae = this, de = ae.getFile(aL);

								ae.fHV(de, bk.LocalID);

								var Gf = de.get("nUploadedSize") || 0, eRm = de
										.get("nRealPostSize") || 0, eRy = de
										.get("nRealPostTime") || 0, bFW = bk.Processed
										- Gf;

								if (bFW > 0) {

									if (bFW < 128 * 1024 + 1) {
										eRm += bFW;
										eRy += (new Date().valueOf() - de
												.get("nStartTime"));

										de.set( {
											nRealPostTime : eRy,
											nRealPostSize : eRm
										});
									}
									de.set("nStartTime", new Date().valueOf());
								}

								var dbI = bk.Processed;

								ae.onprocess(de.set( {
									nUploadPercent : dbI / bk.FileSize * 100,
									nUploadedSize : dbI
								}));
							},

							eAT : function(aO, fhW) {
								var ae = this, Ks = new Date().valueOf();

								if (!aO.dzO) {
									aO.dzO = Ks;
								} else if (Ks - aO.dzO >= (fhW || 5000)) {
									A.QMAjax
											.send(
													A
															.T(
																	"/cgi-bin/ftnUpFileSize?sid=$sid$&filekey=$fileid$&uploadsize=$uploadsize$&ef=js")
															.replace(
																	{
																		sid : A
																				.getSid(),
																		fileid : aO
																				.get("sFileId"),
																		uploadsize : aO
																				.get("nUploadedSize")
																	}),
													{
														method : "GET",
														headers : {
															"If-Modified-Since" : "0",
															"Cache-Control" : "no-cache, max-age=0"
														},
														onload : function(lF,
																bK, cp) {
															if (bK
																	.indexOf("<!--cgi exception-->") != -1) {
																var cM = A
																		.evalValue(bK
																				|| "{}");

																var _oFiles = ae
																		.getFile();
																for ( var i in _oFiles) {
																	var de = _oFiles[i];
																	if (de
																			.get("sStatus") == "uploading") {
																		de.pause
																				&& de
																						.pause();
																		ae
																				.onerror(de
																						.set(
																								"sError",
																								[
																										"cgi",
																										cM.errcode,
																										"ftnUpFileSize" ]
																										.join(",")));
																	}
																}
															}
														}
													});
									aO.dzO = Ks;
								}
							},

							calcSpeed : function(aO, wU) {
								var ae = this, Ks = new Date().valueOf();

								if (!aO.get("nSize")) {
									return;
								}

								if (!aO.aug) {

									aO.aug = Ks;
									return;
								} else if (Ks - aO.aug > (wU || 1000)) {

									var MW = aO.get("nRealPostSize")
											/ aO.get("nRealPostTime"), aLJ = (aO
											.get("nSize") - aO
											.get("nUploadedSize"))
											/ MW;

									if (MW > 0) {
										aO.set( {
											nSpeed : (MW / 1024 * 1000)
													.toFixed(2),
											nRemainTime : (aLJ / 1000)
													.toFixed(2)
										});
									}

									aO.aug = Ks;
								}
							},

							onprocess : function(aO) {
								var ae = this;

								ae.eAT(aO);

								ax.onprocess.call(ae, aO);

							},

							fOr : function(bk, aL) {
								var ae = this, de = ae.getFile(aL);

								ae.callBack("onprocess", [ de.set( {
									sUploadStep : "creating",
									sMD5 : bk.Md5,
									sSHA : bk.SHA,
									sSHA3 : bk.SHA3
								}) ]);

								A.QMAjax
										.send(
												A
														.T(
																"/cgi-bin/ftnCreatefile?uin=$uin$&ef=js&resp_charset=UTF8&s=ftnCreate&sid=$sid$&dirid=$dirid$&path=$path$&size=$size$&md5=$md5$&sha=$sha$&sha3=$sha3$&appid=$appid$&loc=$loc$")
														.replace(
																{
																	sid : A
																			.getSid(),
																	loc : [
																			"ftnCreatefile",
																			"ftnCreatefile",
																			"ftnCreate",
																			(de
																					.get("sFrom") || "")
																					+ de
																							.get("nAppId") ]
																			.join(","),
																	path : encodeURIComponent(de
																			.get("sLocalPath")),
																	dirid : de
																			.get("sPathId"),
																	size : de
																			.get("nSize"),
																	md5 : de
																			.get("sMD5"),
																	sha : de
																			.get("sSHA"),
																	sha3 : de
																			.get("sSHA3"),
																	appid : de
																			.get("nAppId")
																}),
												{
													method : "GET",
													headers : {
														"If-Modified-Since" : "0",
														"Cache-Control" : "no-cache, max-age=0"
													},
													onload : function(lF, bK,
															cp) {
														var cM = A.evalValue(bK
																|| "{}");
														if (lF
																&& cM.errcode == "0") {
															de.set(cM.data);
															ae.anH(de);
														} else {
															ae
																	.onerror(de
																			.set( {
																				nPercent : 0,
																				sError : (cM && cM.errcode) ? ae
																						.err(
																								"cgi",
																								cM.errcode,
																								cM.appname)
																						: ae
																								.err(
																										"http",
																										cp.status)
																			}));
														}
													}
												});

								ae.aeV.ReleaseLocal(bk.LocalID);
								de.set("nLocalID", 0);
							},

							fda : function(bk, aL) {
								var ae = this, gE = Math.min(100,
										Math.floor(bk.Processed / bk.FileSize
												* 100));
								de = ae.getFile(aL);

								de.fCancel = function() {
									ae.aeV.ReleaseLocal(bk.LocalID);
									de.set("nLocalID", 0);
								}
								de.set("nSignPercent", Math.max(gE, 0));
								ae.callBack("onprocess", [ de ]);
							},

							fWk : function(aO) {
								var ae = this, ahA = ae.aeV.ResumeFile(aO
										.get("sIP"), parseInt(aO.get("nPort")),
										aO.get("sKey"), aO.get("sSHA"), aO
												.get("sFileId"), aO
												.get("sLocalPath"), aO
												.get("nUploadedSize"), aO
												.get("sId"));

								ae.callBack("onprocess", [ aO.set( {
									nLocalID : ahA,
									nStartTime : new Date().valueOf(),
									nRealPostTime : 0,
									nRealPostSize : 0,
									nUpTime : new Date().valueOf()
								}) ]);
							},

							anH : function(aO) {
								var ae = this, ahA = ae.aeV.UploadFile(aO
										.get("sIP"), aO.get("nPort"), aO
										.get("sKey"), aO.get("sSHA"), aO
										.get("sFileId"), aO.get("sLocalPath"),
										aO.get("sId"));

								aO.set( {
									nLocalID : ahA,
									nStartTime : new Date().valueOf(),
									nRealPostTime : 0,
									nRealPostSize : 0,
									nUpTime : new Date().valueOf()
								});

							},

							uK : function(ap) {
								var ae = this, aX = ap.sType || "popup";
								if (aX == "popup") {
									if (ap.oContainer) {
										A.addEvent(ap.oContainer, "click",
												function() {
													ae.fVu();
												});
									}
								} else if (aX == "drag") {
									var _oContainer = ap.oContainer;
									_oContainer.innerHTML = aJg();
									setTimeout(
											function() {
												var IH = ae.baC = _oContainer.firstChild;
												A
														.extend(
																IH,
																{
																	text : zX,
																	backColor : 0xffffff,
																	textColor : 0x000000,
																	textFacName : "\u5B8B\u4F53",
																	textFontSize : 10,
																	textFontWeight : 500,
																	OnFilesDroped : function(
																			vZ) {
																		ae
																				.bcS(vZ);
																	}
																});
											}, 200);
								} else if (aX == "paste") {

								}
							},

							bcS : function(vZ) {
								var ae = this, IH = ae.baC;
								switch (vZ) {
								case "ENTER":
									IH.text = abV;
									break;
								case "LEAVE":
									IH.text = zX;
									break;
								case "OVER":
									break;
								default:
									if (vZ) {
										var _oFiles = (vZ || "").split("\r\n");
										if (_oFiles.length == 0) {

											return false;
										} else {
											var dJ = [];
											for ( var i in _oFiles) {
												dJ.push(_oFiles[i].replace(
														/^(.*?)\s/ig, ""));
											}
											ae.selectFiles(dJ);
										}
									}
									break;
								}
								;
							},

							ddy : function(atF) {
								var cmi = [ "getFileSizeString", "GetFileSize",
										"getFileSize" ], lI = this.aeV, fh = 0;

								for ( var i in cmi) {
									try {
										fh = +lI[cmi[i]](atF);
									} catch (e) {
										debug(e, 2)
									}
									if (fh) {
										return fh;
									}
								}
								return fh;
							},

							fVu : function() {
								var ae = this, lI = ae.aeV, acA = function(acM) {
									var _oFiles = (acM || "").split("\r\n");
									if (_oFiles.length == 0) {

										return false;
									} else {
										ae.selectFiles(_oFiles);
									}
								}

								if (lI.SelectFilesAsync) {
									lI.SelectFilesAsync(window, acA);
								} else {
									try {

										lI.focus();
									} catch (e) {
									}
									acA(lI.SelectFiles(window));
								}
							},

							selectFiles : function(jS) {
								var ae = this, gw, de, fh, ags, _oFiles = [];

								for ( var i = 0, cm = jS.length; i < cm; i++) {
									ags = jS[i];
									if (ags) {
										gw = ags.split(/(\\|\/)/g).pop();
										fh = ae.ddy(ags);
										de = ae.addFile( {
											sLocalPath : ags,
											sName : gw,
											nSize : fh
										});
										_oFiles.push(de);
									}
								}
								_oFiles.length && ae.onselect(_oFiles);
							},

							nConcurrent : 3,

							resume : function(axi) {
								var ae = this, lI = ae.aeV, de = ae
										.addFile(axi);

								if (!ae.prepareUpload_(de)) {
									return de;
								}

								de.set( {
									sStatus : "uploading",
									sUploadStep : "creating",
									nUploadPercent : axi.nUploadedSize
											/ axi.nSize,
									bFtnFile : true
								});

								A.QMAjax
										.send(
												A
														.T(
																"/cgi-bin/ftnGetTmpFileInfo?sid=$sid$&filekey=$filekey$&ef=js&t=ftnCreatefile&s=ftnResume")
														.replace(
																{
																	sid : A
																			.getSid(),
																	filekey : de
																			.get("sFileId")
																}),
												{
													method : "GET",
													headers : {
														"If-Modified-Since" : "0",
														"Cache-Control" : "no-cache, max-age=0"
													},
													onload : function(lF, bK) {
														var av = A.evalValue(bK
																|| "{}");
														if (lF
																&& av.errcode == "0") {
															de.set(av.data);
															ae.fWk(de);
														} else {
															ae
																	.onerror(de
																			.set( {
																				nPercent : 0,
																				sStatus : "error",
																				sError : (cM && cM.errcode) ? ae
																						.err(
																								"cgi",
																								cM.errcode)
																						: ae
																								.err(
																										"http",
																										cp.status)
																			}));
														}
													}
												});
								return de;
							},

							uploadToFtn : function(aO) {
								var ae = this, lI = ae.aeV, ahA;

								if (!ae.prepareUpload_(aO)) {
									return false;
								}

								ae.callBack("onprocess", [ aO.set( {
									nUpTime : new Date().valueOf(),
									bFtnFile : true,
									sStatus : "uploading",
									sUploadStep : "signing",
									nSignPercent : 0
								}) ]);

								ahA = lI.FileSign(aO.get("sLocalPath"), aO
										.get("sId"));
								aO.set( {
									nLocalID : ahA
								});
								return true;
							}
						});
					}, "baseToFtn");

})(QMFileAdaptor);
