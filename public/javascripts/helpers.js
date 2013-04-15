function oneWay() {
	$("#oneway").addClass("active");
	$("#roundtrip").removeClass("active");
	$(".arrive_date").fadeOut("normal");
}

function roundTrip() {
	$("#roundtrip").addClass("active");
	$("#oneway").removeClass("active");
	$(".arrive_date").fadeIn("normal");
}