var pickupBoxes;

$(document).ready(function() {
	showCurrentDate();
	markCurrentPage(1);
	$.getJSON("data/addresses.json", function(data) {
		fillDashboard(data);
	});
	defineMotions();//define the click motions on each brick on the main menu
	setBricksLinks();
})

function setBricksLinks() {
//	setCourierLink();
	setPickupLink();
//	setDroneLink();
}

function setPickupLink() {
	$(".pickup").on("click", function() {
//		$("#wrapper").fadeIn(200).append("<div class='waitingSign'></div>");
//		$("#wrapper").append("<div id='fade'></div>");
		$.get("ajax/newPIckup.html", function(data) {
			$("main").remove();
			$("#wrapper").append(data);
			markCurrentPage(2);
			loadPickupBoxes();
		});
	});
}

function loadPickupBoxes() {
	$.get("fetchBoxes.php", {action: "pickup"}, function(data) {
		pickupBoxes = $.parseJSON(data);
//		console.log(json);
//		$.each(pickupBoxes, function(k, v) {
//			console.log(v.personId);
//			displayAllPickupBoxes();
//		});
		displayAllPickupBoxes();
	});
}

function displayAllPickupBoxes() {
	var mainContent = $(".mainContent");
	var i = 1;
	$.each(pickupBoxes, function(k, v) {
		appendBox(v, mainContent, i);
		i++;
	});
}

function appendBox(objVal, htmlTag, boxNum) {
	var box = $("<section class='box'></section>");
	box.append("<div class='circle'><p>" + boxNum + "</p></div>");
	var packageDel = $("<section class='packageDel'></section>");
	var packageNum = $("<div class='packageNum'></div>");
	packageNum.append("<p>" + objVal.deliveryId + "</p>");
	var form = $("<form action='#'></form>");
	var label = $("<label></label>");
	label.append("סטטוס<input type='text' name='packageNumber' readonly>");
	form.append(label);
	form.append("<div class='packageLine'></div>");
//	packageNum.append(form);
	packageDel.append(packageNum);
	packageDel.append(form);
	box.append(packageDel);
	htmlTag.append(box);
}

function defineMotions() {
	var courier = $(".courier");
	var drone = $(".drone");
	var package = $(".package");
	var report = $(".report");
	var pickup = $(".pickup");
	makeClickMotion(courier);
	makeClickMotion(drone);
	makeClickMotion(package);
	makeClickMotion(report);
	makeClickMotion(pickup);
}

function makeClickMotion(obj) {
	obj.mousedown(function() {
		$(this).css("box-shadow", "none");
	})
	.mouseup(function() {
		$(this).css("box-shadow", "5px 5px 5px #888888");
	})
	.css("cursor", "pointer");
}

function showCurrentDate(position) {
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	$(".date").html("<p>" + day + "." + month + "." + year + "</p>");
}

function markCurrentPage(position) {
	var aTag = document.getElementsByClassName("sideNav")[0];
	var size = aTag.children.length;
	for (var i = 0; i < size; i++) {
		if (i === position) {
			aTag.children[i].firstChild.style.borderColor = "#d6d6d6";
			aTag.children[i].firstChild.style.borderRadius = "3px";
			continue;
		}
		aTag.children[i].firstChild.style.borderColor = "#ca151d";
	}
	return;
	var a = document.getElementsByClassName("sideNav")[0].children[position].firstChild;
	a.style.borderColor = "#d6d6d6";
	a.style.borderRadius = "3px";
}

function fillDashboard(data) {
	var dataNav = document.getElementsByClassName("dataNav")[0].children;
	var dronePanel = document.getElementsByClassName("drone")[0].children;
	var courier = document.getElementsByClassName("courier")[0].children;
	var pickup = document.getElementsByClassName("pickup")[0].children;
	var boxes = document.getElementsByClassName("package")[0].children;
	var num = 1;
	$.each(data.dashboard, function(k, v) {
		//dataNav filling
		dataNav[0].children[0].children[0].innerHTML = v.boxes.total;
		dataNav[0].children[1].children[0].innerHTML = v.pickup.total;
		dataNav[0].children[2].children[0].innerHTML = v.drone.total;
		dataNav[0].children[3].children[0].innerHTML = v.delivery.total;

		//drone filling
		dronePanel[3].children[1].innerHTML = v.drone.waiting;
		dronePanel[4].children[1].innerHTML = v.drone.delivering;
		dronePanel[5].children[1].innerHTML = v.drone.delivered;

		//courier filling
		courier[3].children[1].innerHTML = v.delivery.available;
		courier[4].children[1].innerHTML = v.delivery.inShift;
		courier[5].children[1].innerHTML = v.delivery.delivered;
		courier[6].children[1].innerHTML = v.delivery.waiting;

		//pickup filling
		pickup[3].children[1].innerHTML = v.pickup.waiting;
		pickup[4].children[1].innerHTML = v.pickup.delivered;
		pickup[5].children[1].innerHTML = v.pickup.loaded;

		//boxes filling
//		console.log(boxes);
		boxes[3].children[1].innerHTML = v.boxes.waiting;
		boxes[4].children[1].innerHTML = v.boxes.total;
	});
}
