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
		<script type="text/javascript" src="../js/drag.js"></script>
		<script type="text/javascript" src="../js/window.js"></script>
		
		<script type="text/javascript" src="admin.js"></script>

		<script type="text/javascript">
	Ext.onReady(function() {
		new RLab.Admin();
	});
</script>
	</head>
	<body>
		<div id="mainPanel" align="center">
			<div id="userPanel" align="right"></div>
			
			<div id="toolBar" align="left"></div>
			<div id="adminDisplayPanel"></div>
			
			<div id="courseInfoBtn">
				<a href="#"><span>Course Information</span> </a>
			</div>
			<div id="teacherInfoBtn">
				<a href="#"><span>Teacher Information</span> </a>
			</div>
			<div id="deviceInfoBtn">
				<a href="#"><span>Device Information</span> </a>
			</div>
			<div id="welcomePanel">
				Welcome
			</div>
			<div id="courseInfoPanel" style="display: none">
				<h1>
					<font color="red">Create Course</font>
				</h1>
				<s:form action="createCourse">
					<s:select name="course.name"
						list="{'Digital Logic','Principle of Computer','Computer Architecture'}"
						label="Name" />
					<s:select name="course.year"
						list="{'2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'}"
						label="Year" />
					<s:select name="course.season"
						list="{'Spring','Summer','Autumn','Winter'}" label="Season" />
					<s:submit />
				</s:form>
				<div id="listCourseBtn">
					<a href="#"><span>List Course</span> </a>
				</div>
			</div>

			<div id="teacherInfoPanel" style="display: none">
				<s:form action="createUser">
					<h1>
						<font color="red">Add Teacher</font>
					</h1>
					<s:textfield name="user.username" label="Username"></s:textfield>
					<s:password name="user.password" label="Password"></s:password>
					<s:hidden name="user.userRole" value="ROLE_TEACHER"></s:hidden>
					<s:textfield name="user.name" label="Name"></s:textfield>
					<s:textfield name="user.email" label="Email"></s:textfield>
					<s:textfield name="user.phone" label="Phone"></s:textfield>
					<s:submit />
				</s:form>
			</div>

			<div id="deviceInfoPanel" style="display: none">
				<h1>
					<font color="red">Device Information</font>
				</h1>
				IP Port Location LastHeartBeatTime State UserIP UserName lastOpTime
			</div>

		</div>
	</body>
</html>
