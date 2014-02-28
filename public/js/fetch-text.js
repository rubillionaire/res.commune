

$(document).ready(function(){

fullWindows();

				var textInput;
				var searchURL;
				var identifiers;
				var detailsURL;	
				var download_url;
				$(".correct").click(function(){

					$("#fullText").css({"visibility":"visible","height":"600px"});

				});
				$(".submission").on('click',function(){

				$.scrollTo("#selections",500);
				textInput = $("#textInput").val().replace(" ","+");
				searchURL = "http://archive.org/advancedsearch.php?q="+textInput+"+AND+format%3Atext&fl%5B%5D=format&fl%5B%5D=identifier&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=callback";



				$.ajax({
					url: searchURL,
					dataType: 'jsonp',
					success: function(data) {
						var fullCount = data.response.docs.length;
						if (fullCount > 4) {
								identifiers = data.response.docs.slice(0,4);
								console.log(identifiers);
						} else if (fullCount == 1) {
								identifiers = data.response.docs;
								console.log(identifiers);
						} else {
							var count = data.response.docs.length;
							identifiers = data.response.docs.slice(0,count-1);
						}

						$(identifiers).each(function(d){
								console.log(d);
							  detailsURL = "http://archive.org/details/" + identifiers[d].identifier + "&output=json";

								  $.ajax({
									url: detailsURL,
									dataType: 'jsonp',
									success: function(details_data) {

										var metadata;
										 for (obj in details_data.files) {
											console.log(identifiers);
										 	if ((obj.slice(-3) == "txt") && (obj.slice(-8) != "meta.txt")) {
											console.log(details_data.metadata);

												if (details_data.metadata.hasOwnProperty("creator")) {
													var author = details_data.metadata.creator[0];
												} else {
													var author = "Anonymous";
												}

													var ourDiv = "<div class='textOption' data-identifier="+identifiers[d].identifier+"><h1>"+details_data.metadata.title[0]+"</h1>by "+author+"</div>";
													$(".possibleSelections").append(ourDiv);

										 	}
										 }


									}



								});


						});

					}

			});	


	});










});


//this just sets the div to be screen height/width
function fullWindows() {
	$winHeight = $(window).height();
	$winWidth = $(window).width();
	$(".fullScreen").css({
	   width : $winWidth+'px',
	   height : $winHeight+'px'
	});
}