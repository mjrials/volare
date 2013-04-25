//  48a5cb3a2dc46b8aab6f                    --  wego api key

function getNumTickets(string) {
    return string.replace( /^\D+/g, '');
}

displayResults = function(data){
    console.log(data);
    var userAirline = "United Airlines";

    $("#search_flights").fadeOut("normal", function() { 
        var html = [];
        html.push('<h2 class="sub_title">Search Results</h2>')
        html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3" class="table table-striped table-hover"><thead><tr><th>Flight Info</th><th>Route</th><th>Flight Times</th><th>Price</th><th>R. Miles</th><th>Q. Miles</th><th>Cost</th></tr></thead><tbody>');

        var flights = data.response.itineraries;
        for (var i = 0; i < 10; i++) {
            var airline         = (flights[i].carrier)[0].name;
            var code            = flights[i].outboundInfo.flightNumbers.join(' / ');
            var tClass          = (flights[i].outboundInfo.flightClasses)[0].name;
            var route           = flights[i].outboundInfo.airports.join('-');
            var times           = flights[i].outboundInfo.localArrivalTimeStr.substring(11, 16) + '-' +
                                    flights[i].outboundInfo.localDepartureTimeStr.substring(11, 16);
            var elapsedTimeMins = flights[i].outboundInfo.durationInMin;
            var estMiles        = elapsedTimeMins * 8.546;          //EST 8.546 miles/min
            var price           = flights[i].price.totalAmount;
            var rMiles          = 0;
            var qMiles          = 0;
            var cost            = price;

            if(airline == userAirline) {
                if(tClass == 'Economy') {
                    rMiles = estMiles;
                }
                if(tClass == 'Business') {
                    rMiles = 1.25 * estMiles;
                }
                else { //First
                    rMiles = 1.5 * estMiles;
                }

                if(rMiles < 500) {
                    rMiles = 500;
                }
                if(rMiles > 2000) {
                    cost = Math.round((price - (rMiles * 0.007)) * 100)/100;
                }
                else {
                    cost = Math.round((price - (rMiles * 0.014)) * 100)/100;
                }

                $(".result_cost").css("color", "green"); 
            }
                
            html.push('<tr><td>' + '<div><p class="result_airline">' + airline + '</p><p>' + code + ' - ' + tClass + '</p></div>' + 
                    '</td><td>' + route + 
                    '</td><td>' + times +
                    '</td><td>$' + price +
                    '</td><td>' + rMiles +
                    '</td><td>' + qMiles +
                    '</td><td>' + '<div><p class="result_cost">$' + cost + '</p></div>' +
                    '</td></tr>');
        }

        html.push('</tbody></table>');               
        $("#search_flights").css("height", "605px"); 
        $("#search_flights").html(html.join(""));
    });    
    $("#search_flights").fadeIn("normal");
}

pull = function(data){
    var pullURL = 'http://www.wego.com/api/flights/pull.html?' +
                'format=json' +
                '&apiKey=48a5cb3a2dc46b8aab6f' +
                '&instanceId=' + data.request.instanceId + 
                '&rand=1' +
                '&callback=displayResults';
    $.ajax({
        url: pullURL,
        dataType: 'jsonp'
    });
}

function startSearch(event)
{
    //scrape parameters
    var tClass = $('.class_select').val();          //must be Economy, Business, First
    // var tClass = $('#class_select li.selected a').text();
    var type = $('.triptype').val();                //must be oneWay || roundTrip
    var from = $('.depart_from').val();             //make sure these are IATA codes
    var to = $('.arrive_to').val();                 
    var depart = $('.depart_date').val();
    var arrive = $('.arrive_date').val();           //dates must be yyyy-mm-dd
    var adults = $('.adults_select').val();         //must be number
    var children = $('.children_select').val();

    // verify well-formed input

    // startSearch with instanceId
    var instanceURL = 'http://www.wego.com/api/flights/startSearch.html?' +
                    'format=json' +
                    '&fromLocation=SFO' +
                    '&toLocation=ORD' +
                    '&tripType=oneWay' +
                    '&cabinClass=Economy' +
                    '&outboundDate=2013-06-09' +
                    '&numAdults='+ adults +
                    '&numChildren='+ children + 
                    '&callback=pull' + 
                    '&apiKey=48a5cb3a2dc46b8aab6f'
    $.ajax({
        url: instanceURL,
        dataType: 'jsonp'
    });
}