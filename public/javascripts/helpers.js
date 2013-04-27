function oneWay() {
	$("#oneway").addClass("active");
	$("#roundtrip").removeClass("active");
	$(".arrive_date").fadeOut("normal");

	$("#triptype").val("oneWay");
}

function roundTrip() {
	$("#roundtrip").addClass("active");
	$("#oneway").removeClass("active");
	$(".arrive_date").fadeIn("normal");

	$("#triptype").val("roundTrip");
}

function coach() {
	$("#coach").addClass("active");
	$("#firstclass").removeClass("active");
	$("#business").removeClass("active");

	$("#class_select").val("Economy");
}

function business() {
	$("#business").addClass("active");
	$("#firstclass").removeClass("active");
	$("#coach").removeClass("active");

	$("#class_select").val("Business");
}

function firstclass() {
	$("#firstclass").addClass("active");
	$("#coach").removeClass("active");
	$("#business").removeClass("active");

	$("#class_select").val("First");
}

// function airportAC() {
// 	$.ajax({
// 	  url: '/airports.txt',
// 	  success: function(items) {
// 	    var airports = new Array();
// 	    $.each(JSON.parse(items), function() {
// 	      airports.push(this.name);
// 	    });
// 	    $( ".airportComplete" ).autocomplete({
// 	      source: 'http://airportcode.riobard.com/search?fmt=JSONP'
// 	    });
// 	  }
// 	});
// }