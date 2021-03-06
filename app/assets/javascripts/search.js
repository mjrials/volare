//  48a5cb3a2dc46b8aab6f                    --  wego api key
//Fix   pendingResults              *****
//      get rid of layover time
//      referrals to regular site
//      register + login + Ff thing     ***
//      switch to dnsimple -> link to heroku
//      integrate designsuxx table css
//      anonymous search (FF input box) ***
//      roundTrip not just oneWay -- multipel flight times, layover, etc ***
//      add pics for airlines?
//      sort search results

var userRewards;

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
    var userAirline = $('.rewards').val();  

    var flights = data.response.itineraries;

    var html = [];
    html.push('<h2 class="sub_title">Top Results</h2>')

    if(flights.length >= 20) {
        html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3" class="table table-striped table-hover"><thead><tr><th>Flight Info</th><th>Route</th><th class="center">Flight Times</th><th>Price</th><th>Redeemable<br />Miles</th><th>Elite Qualifying<br />Miles</th><th>Net Cost</th></tr></thead><tbody>');

        for (var i = 0; i < 20; i++) {
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

            if(airline == userRewards) {
                var dollarsPerMile;

                if(tClass == 'Economy')     { rMiles = estMiles; }
                if(tClass == 'Business')    { rMiles = Math.round(1.25 * estMiles); }
                else                        { rMiles = Math.round(1.5 * estMiles); }

                if(rMiles < 500)            { rMiles = 500; }
                if(rMiles > 2000)           { dollarsPerMile = 0.007; }
                else                        { dollarsPerMile = 0.014; }
                rMiles = rMiles;
                qMiles = Math.round(rMiles * 0.5);

                rewardDeduction = Math.round(rMiles * dollarsPerMile);
                cost = price - rewardDeduction;

                rMiles = numberWithCommas(rMiles);
                qMiles = numberWithCommas(qMiles);
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
    }
    else {
        html.push('<br /><br /><br /><h1 class="center blue">No flights found (possible error). Please try search again.</h1>')
    }

    $("#search_flights").css("height", "1210px"); 
    $("#search_flights").html(html.join(""));
}

pull = function(data){
    if(!data.error) {
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
        }, 10000);
    }
    else {
        $("#search_flights").html('<br /><br /><br /><h1 class="center blue">No flights found (possible error). Please try search again.</h1>');
    }
}

function startSearch(event)
{
    var validParams = true;
    //scrape parameters
    var tClass      = $('.class_select li.active a').text();
    var type        = camelCase($('.triptype li.active a').text()); 
    var from        = $('.departfrom').val();             //make sure these are IATA codes
        from        = from.substring(from.length - 4, from.length - 1);
    var to          = $('.arriveto').val();
        to          = to.substring(to.length - 4, to.length - 1);                
    var depart      = $('.departdate').val();
    var arrive      = $('.arrivedate').val();           //dates must be yyyy-mm-dd
    var adults      = $('.adults_select').val();        
    var children    = $('.children_select').val();

    userRewards = $('.rewards').val();

    var arriveString = '';
    if(type == "roundTrip") {
        if(arrive == "")                      { $('.arrivedate').addClass("syntax_error"); validParams=false; }
        else                                  { $('.arrivedate').removeClass("syntax_error"); }
        if(arrive < depart) {
            $('.arrivedate').addClass("syntax_error");
            $('.departdate').addClass("syntax_error");
            validParams=false;
        }
        arriveString = '&inboundDate=' + arrive;
    }

    // verify well-formed input
    if(from == "" || from.length != 3)    { $('.departfrom').addClass("syntax_error"); validParams=false; }
    else                                  { $('.departfrom').removeClass("syntax_error"); }
    if(to == "" || to.length != 3)        { $('.arriveto').addClass("syntax_error"); validParams=false; }
    else                                  { $('.arriveto').removeClass("syntax_error"); }
    if(depart == "")                      { $('.departdate').addClass("syntax_error"); validParams=false; }
    else                                  { $('.departdate').removeClass("syntax_error"); }  

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
    if(validParams) {
        $("#search_flights").html('<h2 class="sub_title">Top Results</h2><br /><br /><br /><br /><h1 class="center blue">Thank you for your patience while we find your flights.</h1><br /><h1 class="center blue">Search may take several seconds.</h1><br /><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div>');
        $.ajax({
            url: instanceURL,
            dataType: 'jsonp'
        });
    }
}