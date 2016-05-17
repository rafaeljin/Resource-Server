<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>

		<title>My JSP 'index.jsp' starting page</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">

		<link rel="stylesheet" type="text/css" href="index.css">
		<link rel="stylesheet" type="text/css" href="../css/ext-all.css">
			
		<script type="text/javascript" src="../js/ext-base.js"></script>
		<script type="text/javascript" src="../js/ext-all.js"></script>
		<script type="text/javascript" src="../js/rlab.js"></script>
		<script type="text/javascript" src="../js/drag.js"></script>
		<script type="text/javascript" src="../js/menu.js"></script>		
		<script type="text/javascript">
			Ext.onReady(function(){
				new RLab.Student();	
			});
		</script>
	</head>

	<body>
		<div id=mainPanel" align="center">
			<div id="userPanel" align="right">
			</div>
		</div>
		<div id="studentToolBar"></div>
		<div id="regsPanel">
			<table id="regsTable">
				<tr>
					<th>
						Reg NO
					</th>
					<th>
						Value
					</th>
				</tr>
				<s:bean name="org.apache.struts2.util.Counter">
					<s:param name="first" value="1" />
					<s:param name="last" value="255" />
					<s:iterator status="st">
						<tr id="<s:property value="'Reg' + #st.count"/>">
							<td>
								<s:property value="'Reg' + #st.count" />
							</td>
							<td>
								-1
							</td>
						</tr>
					</s:iterator>
				</s:bean>
			</table>
		</div>
		<div id="memPanel">
			<table id="memTable">
				<tr>
					<th>
						Address
					</th>
					<th>
						Value
					</th>
				</tr>
			</table>
		</div>
	</body>
</html>
