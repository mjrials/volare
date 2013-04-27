//  48a5cb3a2dc46b8aab6f                    --  wego api key
//Fix   pendingResults
//      get rid of layover time
//      referrals to regular site
//      register + login + Ff thing
//      green cost text
//      switch to dnsimple -> link to heroku
//      integrate designsuxx table css
//      anonymous search (FF input box)
//      verify well-formed input
//      and highlight boxes in red
//      roundTrip not just oneWay -- multipel flight times, layover, etc
//      add pics for airlines?

function getNumTickets(string) {
    return string.replace( /^\D+/g, '');
}

function tConvert (time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) { 
    time = time.slice (1);  
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
    time[0] = +time[0] % 12 || 12; 
  }
  return time.join ('');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function camelCase(input) { 
    return input.toLowerCase().replace(/ (.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

displayResults = function(data){
    console.log(data);
    var userAirline = "United Airlines";

    $("#search_flights").fadeOut("normal", function() { 
        var html = [];
        html.push('<h2 class="sub_title">Top Results</h2>')
        html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3" class="table table-striped table-hover"><thead><tr><th>Flight Info</th><th>Route</th><th class="center">Flight Times</th><th>Price</th><th>Redeemable<br />Miles</th><th>Elite Qualifying<br />Miles</th><th>Net Cost</th></tr></thead><tbody>');

        var flights = data.response.itineraries;
        for (var i = 0; i < 10; i++) {
            var airline         = (flights[i].carrier)[0].name;
            var code            = flights[i].outboundInfo.flightNumbers.join(' / ');
            var tClass          = (flights[i].outboundInfo.flightClasses)[0].name;
            var route           = flights[i].outboundInfo.airports.join('-');
            var times           = tConvert(flights[i].outboundInfo.localDepartureTimeStr.substring(11, 16)) + ' - ' +
                                    tConvert(flights[i].outboundInfo.localArrivalTimeStr.substring(11, 16));
            var elapsedTimeMins = flights[i].outboundInfo.durationInMin;
            var estMiles        = elapsedTimeMins * 8.546;          
            var price           = Math.round(flights[i].price.totalAmount);
            var rMiles          = 0;
            var qMiles          = 0;
            var rewardDeduction = "";
            var cost            = price;

            if(airline == userAirline) {
                var dollarsPerMile;

                if(tClass == 'Economy')     { rMiles = estMiles; }
                if(tClass == 'Business')    { rMiles = Math.round(1.25 * estMiles); }
                else                        { rMiles = Math.round(1.5 * estMiles); }

                if(rMiles < 500)            { rMiles = 500; }
                if(rMiles > 2000)           { dollarsPerMile = 0.007; }
                else                        { dollarsPerMile = 0.014; }
                rMiles = numberWithCommas(rMiles);
                qMiles = numberWithCommas(Math.round(rMiles * 0.5));

                rewardDeduction = Math.round(rMiles * dollarsPerMile);
                cost = price - rewardDeduction;
                rewardDeduction = "- $" + rewardDeduction;
            }
                
            html.push('<tr><td>' + '<div><p class="result_airline">' + airline + '</p><p>' + code + ' - ' + tClass + '</p></div>' + 
                    '</td><td>' + route + 
                    '</td><td>' + '<div><p class="center">' + times + '</p></div>' + 
                    '</td><td>$' + price +
                    '</td><td>' + '<div><p>' + rMiles + '</p></div>' +
                    '</td><td>' + qMiles +
                    '</td><td>' + '<div><p>$' + cost + '</p><p class="deduction">' + rewardDeduction + '</p></div>' +
                    '</td></tr>');
        }

        html.push('</tbody></table>');               
        $("#search_flights").css("height", "625px"); 
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
    var timeout = window.setTimeout(function() {
        $.ajax({
            url: pullURL,
            dataType: 'jsonp'
        });
    }, 3000);
}

function startSearch(event)
{
    //scrape parameters
    var tClass      = $('.class_select li.active a').text();
    var type        = camelCase($('.triptype li.active a').text());   //must be oneWay || roundTrip
    var from        = $('.departfrom').val();             //make sure these are IATA codes
    var to          = $('.arriveto').val();                 
    var depart      = $('.departdate').val();
    var arrive      = $('.arrivedate').val();           //dates must be yyyy-mm-dd
    var adults      = $('.adults_select').val();         //must be number
    var children    = $('.children_select').val();

    var arriveString = '';
    if(type == "roundTrip") {
        arriveString = '&inboundDate=' + arrive;
    }

    // verify well-formed input

    // startSearch with instanceId
    var instanceURL = 'http://www.wego.com/api/flights/startSearch.html?' +
                    'format=json' +
                    '&fromLocation='    + from + 
                    '&toLocation='      + to + 
                    '&tripType='        + type + 
                    '&cabinClass='      + tClass + 
                    '&outboundDate='    + depart + 
                    arriveString        + 
                    '&numAdults='       + adults +
                    '&numChildren='     + children + 
                    '&callback=pull'    + 
                    '&apiKey=48a5cb3a2dc46b8aab6f'
    $.ajax({
        url: instanceURL,
        dataType: 'jsonp'
    });
}