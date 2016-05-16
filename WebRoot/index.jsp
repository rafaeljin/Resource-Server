<%@ page language="java" import="java.util.*;" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>RLab Home</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="tsinghua, cs, rlab">

		<link rel="stylesheet" type="text/css" href="css/ext-all.css">

		<script type="text/javascript" src="js/ext-base.js"></script>
		<script type="text/javascript" src="js/ext-all.js"></script>
		<script type="text/javascript" src="js/ext-basex.js"></script>
		<script type="text/javascript" src="js/rlab.js"></script>
		<script type="text/javascript" src="js/lang_zh.js"></script>
		
		<script type="text/javascript" src="js/drag.js"></script>
		<script type="text/javascript" src="js/menu.js"></script>
		<script type="text/javascript" src="js/window.js"></script>
		<script type="text/javascript" src="js/grid.js"></script>
		<script type="text/javascript" src="js/admin.js"></script>
		<script type="text/javascript" src="js/teacher.js"></script>
		<script type="text/javascript" src="js/student.js"></script>
		<script type="text/javascript" src="js/experiment.js"></script>
		<script type="text/javascript" src="js/led.js"></script>
		<script type="text/javascript" src="js/reg.js"></script>
		<script type="text/javascript" src="js/ram.js"></script>

		<script type="text/javascript">

		<%
		String role = (String)session.getAttribute("role");
		String course = (String)session.getAttribute("course");
		
		//add this is for teacher to view student interface
		String stFlag = (String)request.getParameter("stFlag");
		//when teacher  run student's experiment
		String stSubmitPath = (String)request.getParameter("stSubmitPath");
		String stExpName = (String)request.getParameter("stExpName");
		if("ROLE_ADMIN".equals(role)){
		%>
		Ext.onReady(function(){
				new RLab.Admin();	
			});
		<%
		}else if("ROLE_TEACHER".equals(role) && !"stFlag".equals(stFlag)){
		%>
		Ext.onReady(function(){
				new RLab.Teacher({course : <%=course%>});	
			});
		<%
		}else {
		%>
		Ext.onReady(function(){
				new RLab.Student({course : <%=course%>, 
					stSubmitPath : '<%=stSubmitPath%>',
					stExpName : '<%=stExpName%>'});	
			});
		<%
		}
	 %>
	 </script>

		<style type="text/css">
<!--
body{
	font-family: Tahoma;
	background:#eee;
}
#mainPanel {
	width: 960px;
	height : 100%;
	margin-bottom : 0px;
}

a:link {
	color: #000000;
	text-decoration: none;
}

a:visited {
	text-decoration: none;
	color: #000000;
}

a:active {
	text-decoration: none;
	color: #000000;
}

a:hover {
	text-decoration: none;
}

#header {
	width: 960;
	height: 115;
	background-image: url(images/header.jpg);
}


#information {
	font-size: 14px;
	color: #606060;
	padding-top: 10px;
	text-align: left;
}

#toolBar{ clear:both; background:#FFFFFF; zoom:1;overflow:hidden; border-bottom:1px #ccc solid; padding-bottom:6px; }
#toolBar ul{ font-size:12px;}
#toolBar li{ float:left; margin:6px 0px; margin-bottom:0px; padding-left:6px; line-height:28px; height:28px; text-align:center;text-transform:capitalize; font-weight:bold; }
#toolBar li a{ background:#eee; padding:0 31px; height:28px;display:inline-block; color:#6c1b78; }
#toolBar li a:hover{ background:#82318e; color:#FFFFFF;  text-decoration:none;}

.rlab-menu{background:#FFFFFF;border: 1px solid #999;}
.rlab-menu ul{font-size:14px;}
.rlab-menu li{float:top; margin:6px 1px; margin-bottom:0px; padding-left:6px; line-height:28px; text-transform:capitalize; font-weight:bold;}

.menuItemMouseOver {
	background-color: #82318e;
	cursor : pointer;
}
#userPanel{zoom:1;overflow:hidden;}
#userPanel ul{ font-size:12px;}
#userPanel li{ float:right;line-height:20px; height:20px; text-align:center;text-transform:capitalize; font-weight:bold; }
#userPanel li a{height:20px;display:inline-block; color:#404040; }
#userPanel li a:hover{ color:#6c1b78;  text-decoration:none;}

#displayPanel{background:#FFFFFF;}


.window{border: 1px solid #999;}
.window .window-header{
	cursor: move;
	background-image : url(images/default/window/top-bottom.png);
	overflow: hidden;

}
.window .window-header .window-header-title{
	color: #15428B;
	font-size: 14px;
	font-weight:bold;
}
.window .window-toolbar{background:#eee;zoom:1;overflow:hidden;border-bottom:1px #ccc solid;}
.window .window-toolbar ul{ font-size:12px;}
.window .window-toolbar li{ float:left;line-height:20px; height:20px; text-align:center;text-transform:capitalize; font-weight:bold; }
.window .window-toolbar li a{height:20px;display:inline-block; color:#404040; }
.window .window-toolbar li a:hover{ color:#6c1b78;  text-decoration:none;}

.rlab-mask{
background-color: #CCC;
z-index: 20000;
position: absolute;
top: 0;
left: 0;
-moz-opacity: 0.5;
opacity: .50;
filter: alpha(opacity=50);
width: 100%;
height: 100%;
zoom: 1;
}

.rlab-clickToReverse{
	font-weight:bold;
	color: #15428B;
}

.rlab-setAllMemory li{ float:left;line-height:20px; height:18px; text-align:center;text-transform:capitalize;}
.rlab-setAllMemory li a{height:20px;display:inline-block; }

-->
</style>

	</head>
	<body>
<div align="center" style="position:absolute;top:0px;width:100%;height:100%">
  		<div id="mainPanel">
  			<div id="header"></div>
  			<table width="100%" height="22px" border="0" cellspacing="0" cellpadding="0">
  			<tr><td align="left"><span id="information"></span></td>
  			<td align="right"><div id="userPanel" ></div></td></tr></table>
			<div id="toolBar" align="left"></div>
			<div id="displayPanel"></div>
		</div>
	</div>
	</body>
</html>
