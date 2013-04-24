function getNumTickets(adults, children, seniors) {
    alert( adults.replace( /^\D+/g, '') + 
            children.replace( /^\D+/g, '') +
            seniors.replace( /^\D+/g, '') );
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

function generateToken() {
    var token;
    $.ajax( {
      url: '/token',
      type: 'POST',
      success: function(items) {
        token = JSON.parse(items).token;
        // return JSON.parse(items).token;
      }
    });
}

function getResults() {
    //  48a5cb3a2dc46b8aab6f                    --  wego api key
    // fd6a7feda4c23483893ce20b64800ae46922afa2 --  sample instance ID
    
    // var token;
    // $.ajax( {
    //   url: '/token',
    //   type: 'POST',
    //   success: function(items) {
    //     token = JSON.parse(items).token;
        
    //     $.ajax( {
    //         url: '/search',
    //         type: 'POST',
    //         data: token,
    //         success: function(items) {
    //             alert(items);
    //         }
    //     })
    //     // return JSON.parse(items).token;
    //   }
    // });

    generateTable();
}

function handleSearch(event)
{
    //scrape parameters
    var tClass = $('.class_select').val();
    var type = $('.triptype').val();
    var from = $('.depart_from').val();           //make sure these are IATA codes
    var to = $('.arrive_to').val();               //
    var depart = $('.depart_date').val();
    var arrive = $('.arrive_date').val();

    var adults = $('.adults_select').val();       
    var seniors = $('.seniors_select').val();
    var children = $('.children_select').val();
    // var tickets = adultTickets + seniorTickets + childrenTickets; //get numbers from ticket vals
    alert(getNumTickets(adults, seniors, children));
    // verify well-formed input

    $("#search_flights").fadeOut("normal", function() {  //fade out input
        getResults();                                    //get the results, change #search_fligths
    });    
    $("#search_flights").fadeIn("normal");      //fade in results
}