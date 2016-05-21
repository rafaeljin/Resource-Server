<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="edu.thu.rlab.server.ServerInfo,edu.thu.rlab.server.Messenger" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%-- --%>
<% if (ServerInfo.activated && !ServerInfo.authenticated) { %>
    <head>
    	<title>Server failed.</title>
    </head>
    <body>
    	<p> Authentication Failed. </p>
    </body>
<% } else { %>
	<html>
		<head>

			<title>Welcome</title>
			<meta http-equiv="pragma" content="no-cache">
			<meta http-equiv="cache-control" content="no-cache">
			<meta http-equiv="content-type" content="text/html; charset=UTF-8">

			<meta http-equiv="keywords" content="tsinghua, cs, rlab">
			<meta http-equiv="description" content="login page">
			<style type="text/css">
	<!--
	body {
		margin-left: 0px;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		background-image: url(images/login_bg.gif);
		overflow: hidden;
	}

	.style_font {
		font-size: 12px;
		color: #FFFFFF;
	}
	-->
	</style>
		</head>

		<body>
			<form name="form" action="login" method="post">
				<table width="100%" height="100%" border="0" cellpadding="0"
					cellspacing="0">
					<tr>
						<td>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td background="images/login_lr.gif">
										&nbsp;
									</td>
									<td width="876">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="299" valign="top"
													background="images/login_top.jpg">
													&nbsp;
												</td>
											</tr>
											<tr>
												<td height="54">
													<table width="100%" border="0" cellspacing="0"
														cellpadding="0">
														<tr>
															<td width="394" height="69"
																background="images/login_left.jpg">
																&nbsp;
															</td>
															<td width="199" background="images/login_center.jpg">
																<table width="100%" border="0" cellspacing="0"
																	cellpadding="0">
																	<tr>
																		<td width="22%" height="22">
																			<div align="center">
																				<span class="style_font">用户名</span>
																			</div>
																		</td>
																		<td width="51%" height="22">
																			<input name="username" type="text" size="12"
																				style="height: 20px; background-color: #032e49; color: #88b5d1; border: solid 1px #88b5d1;" />
																		</td>
																		<td width="27%" height="22">
																			&nbsp;
																		</td>
																	</tr>
																	<tr>
																		<td height="22" valign="middle">
																			<div align="center">
																				<span class="style_font">密&nbsp; 码</span>
																			</div>
																		</td>
																		<td height="22" valign="bottom">
																			<input name="password" type="password" size="12"
																				style="height: 20px; background-color: #032e49; color: #88b5d1; border: solid 1px #88b5d1;" />
																		</td>
																		<td height="22" valign="middle">
	 																		<a href="#" onclick="document.form.submit();"><img src="images/dl.gif" width="39" height="17" /> </a>
																		</td>
																	</tr>
																	<tr>
																		<td colspan="3">

																			<s:if test="%{#parameters.login_error[0] != null}">
																				<font color="red">用户名或密码错误</font>
																			</s:if>
																		</td>
																	</tr>
																</table>
															</td>
															<td width="283" background="images/login_right.jpg">
																&nbsp;
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td height="225" background="images/login_bottom.jpg">
													&nbsp;
												</td>
											</tr>
										</table>
									</td>
									<td background="images/login_lr.gif">
										&nbsp;
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</form>
		</body>
	</html>
<% } %>