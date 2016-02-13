
$(document).ready(function() {
    $(".electricForm").submit(function(e) {
        e.preventDefault();
        displayInfo("check")
    });
})

function displayInfo(data) {
	var lightBox = $("<div id='light'></div>");
	lightBox.append("<h2>חברת חשמל - פרטי החשבונית</h2>");
	lightBox.append("<p>" + "חשבון דו חודשי"+"<br>" + "חוזה מספר - 4432321"+"<br>" +"<br>" +"<br>" +"חשבון לתקופה של 60 ימים"+ "<br>" +
                    "מ-18.9.15 עד 17.11.15" + "<br>" + "חיוב בגין צריכה - סה״כ 212 קוט״ש" + "</p><br>");
	lightBox.append("<h2>סה״כ לתשלום 158₪</h2>" + "<h2> יש לשלם חשבון זה עד 4.12.15</h2>" + "<br>");
	var paragraph = $("<p></p>");
	lightBox.append(paragraph);
	lightBox.append("<br>");
	lightBox.append("<button class = 'scan'>ביטול</button>");
	lightBox.append("<button class = 'paymentElc'>לתשלום" + "<br>" + "<span class='credit'>(בכרטיס אשראי)</span>" + "</button>");
	$("body").prepend("<div id='fade'></div>");
	$("body").prepend(lightBox);
	$("#fade").on("click", function() {
		$("#light").remove();
		$("#fade").remove();
	});
	$("#fade").show();
	lightBox.show();
}
