function getNumTickets(string) {
    return string.replace( /^\D+/g, '');
}

function generateTable()
{
    // var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    // var html = [];
    // html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3" class="table"><thead><tr><th/><th>Name</th><th>Price</th></tr></thead><tbody>');

    // for (var i = 0; i < items.length; ++i) {
    //     var item     = items[i];
    //     var itemId   = item.itemId;
    //     var title    = item.title;
    //     var pic      = item.galleryURL;
    //     var viewitem = item.viewItemURL;
    //     var listingInfo = item.listingInfo;
    //     var price = centifyPrice(item.sellingStatus[0].currentPrice[0].__value__);
    //     var btcPrice = centifyPrice(getBTC(price));

    //     if (null != title && null != viewitem) {
    //         html.push('<tr><td>' + '<img src="' + pic + '" border="0">' +
    //          '</td>' + '<td style="vertical-align:middle"><a href="' + viewitem + '" target="_blank">' +
    //          title + '</a></td>' + "<td style='vertical-align:middle'><button class='btn btn-success btn-large btc-btn' data-toggle='modal'>" +
    //             btcPrice + ' BTC</button>' + '($' + price  +  ')</td></tr>');
    //     }
    // }
    // html.push('</tbody></table>');

    var html = [];
    html.push('<h2 class="sub_title">Search Results</h2>')
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3" class="table table-striped table-hover"><thead><tr><th>Flight Info</th><th>Route</th><th>Flight Times</th><th>Price</th><th>Cost</th><th>R. Miles</th><th>Q. Miles</th></tr></thead><tbody>');

    for (var i = 0; i < 10; ++i) {
        // var item     = items[i];
        html.push('<tr><td>UA1010</td><td>SFO-ORD</td><td>6:32A-12:43P</td><td>$310</td><td>$194</td><td>2307.5</td><td>1846</td></tr>');
    }
    html.push('</tbody></table>');

    $("#search_flights").html(html.join(""));
}

function getResults() {
    //  48a5cb3a2dc46b8aab6f                    --  wego api key
    // fd6a7feda4c23483893ce20b64800ae46922afa2 --  sample instance ID

    generateTable();
}

displayResults = function(data){
    console.log(data);
    $("#search_flights").fadeOut("normal", function() { 
        getResults(); });    
    $("#search_flights").fadeIn("normal");
}

pull = function(data){
    // $.each(data.items, function(idx,val) {
    //    $("#results").append($('<div></div>').text(val.title));
    // });

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