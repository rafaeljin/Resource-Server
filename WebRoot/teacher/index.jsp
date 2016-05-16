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
		<link rel="stylesheet" type="text/css" href="../css/ext-all.css">
		<script type="text/javascript" src="../js/ext-base.js"></script>
		<script type="text/javascript" src="../js/ext-all.js"></script>
		<script type="text/javascript" src="../js/rlab.js"></script>
		<script type="text/javascript" src="../js/menu.js"></script>		
		<script type="text/javascript" src="teacher.js"></script>

		<script type="text/javascript">
			Ext.onReady(function() {
				new RLab.Teacher();
			});
		</script>
	</head>
	<body>
		<div id="mainPanel" align="center">
			<div id="userPanel" align="right"></div>
			
			<div id="toolBar" align="left"></div>
			<div id="displayPanel"></div>
		</div>		
	</body>
</html>
