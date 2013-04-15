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
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3" class="table"><thead><tr><th>Flight Info</th><th>Route</th><th>Flight Times</th><th>Price</th><th>Cost</th><th>R. Miles</th><th>Q. Miles</th></tr></thead><tbody>');

    for (var i = 0; i < 10; ++i) {
        // var item     = items[i];
    
        html.push('<tr><td>UA1010</td><td>SFO-ORD</td><td>6:32A-12:43P</td><td>$310</td><td>$194</td><td>2307.5</td><td>1846</td></tr>');
    }
    html.push('</tbody></table>');

    $("#search_flights").html(html.join(""));
}

function getResults() {
    // $.getScript("http://svcs.ebay.com/services/search/FindingService/v1" +
    //  "?SECURITY-APPNAME=eBit79154-2413-47fb-b56d-e842fd2c524" +
    //  "&OPERATION-NAME=findItemsByKeywords" +
    //  "&SERVICE-VERSION=1.0.0" +
    //  "&RESPONSE-DATA-FORMAT=JSON" +
    //  "&callback=_cb_findItemsByKeywords" +
    //  "&REST-PAYLOAD" +
    //  "&keywords=" + searchString +
    //  "&paginationInput.entriesPerPage=10" +
    //  "&paginationInput.pageNumber=" + page +
    //  "&itemFilter(0).name=ListingType" +
    //  "&itemFilter(0).value=FixedPrice"
    //  , animationFunction()); 
    generateTable();
}

function handleSearch(event)
{
    //scrape parameters
    var tripClass = $('.class_select').val();
    var tripType = $('.triptype').val();
    var departFrom = $('.depart_from').val();
    var arriveTo = $('.arrive_to').val();
    var departDate = $('.depart_date').val();
    var arrivateDate = $('.arrive_date').val();

    var adultTickets = $('.adults_select').val();
    var seniorTickets = $('.seniors_select').val();
    var childrenTickets = $('.children_select').val();

    // verify well-formed input

    $("#search_flights").fadeOut("normal");     //fade out input
    getResults();                               //get the results, change #search_fligths
    $("#search_flights").fadeIn("normal");      //fade in results
}