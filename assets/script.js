//base urls
var bandInfoBaseURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";
var lyricsBaseURL = "https://api.lyrics.ovh/v1/"
$("#searchBtn").on("click", function(){
    // clear out the contents of the current container
    $("#artistimg").empty();
    $("#artistThumb").empty();
    $("#link").empty();
    $("#genre").empty();
    $("#userSearch").empty();
    $("#userSearch2").empty();
    $("#lyrics").empty()
    
    // grab the values of the text boxes and apply them to variables
    var artistSearch = $("#userSearch").val().trim();
    var fullBandURL = bandInfoBaseURL + artistSearch;
    var songName = $("#userSearch2").val().trim();
    var fullSongUrl = lyricsBaseURL + artistSearch + "/" + songName 
    $.ajax({
        url: fullBandURL,
        method: "GET"
    }).then(function(response) {
        // directions to logo png --- id from html = artistimg
        // create the image tag
        let logoTag = $("<img>")
        // apply the src attribute and attatch the directions to the logo
        logoTag.attr("src", response.artists[0].strArtistLogo)
        logoTag.attr("width", "300px")
        // append image to the page
        $("#artistimg").append(logoTag)

        // create a bulma card
        let cardDiv = $("<div>");
        let innerCardDiv = $("<div>");
        let lowerCardDiv = $("<div>");
        cardDiv.attr("class", "card");
        innerCardDiv.attr("class", "card-content");
        lowerCardDiv.attr("class", "card-footer");

        // directions to genre/style
        let genrePTag = $("<p>");
        genrePTag.text("Genre: " + response.artists[0].strStyle);
        genrePTag.attr("class", "title");
        genrePTag.attr("id", "genreButton");
        innerCardDiv.append(genrePTag);

        // directions to facebook link
        // auto skips if band does not have facebook, so no conditional needed 
        console.log(response.artists[0].strFacebook);
        let FBLinkTag = $("<a>");
        let FBLinkTextTag = $("<p>");
        FBLinkTextTag.text(response.artists[0].strFacebook)
        FBLinkTextTag.attr("class", "subtitle")
        FBLinkTag.append(FBLinkTextTag);
        FBLinkTag.attr("href", "https://" + response.artists[0].strFacebook);
        FBLinkTextTag.attr("id", "linkBox");
        lowerCardDiv.append(FBLinkTag)
        cardDiv.append(innerCardDiv).append(lowerCardDiv);
        $("#genre").append(cardDiv);

        // directions to artist banner
        let artistThumbTag = $("<img>");
        artistThumbTag.attr("src", response.artists[0].strArtistThumb)
        artistThumbTag.attr("width", "200px")
        $("#artistThumb").append(artistThumbTag)
    })
    $.ajax({
        url: fullSongUrl,
        method: "GET"
    }).then(function(response) {
        $("#lyrics").text(response.lyrics)
        // if there are no lyrics from the json string
        if (response.lyrics === "") {
            $("#lyrics").text("No lyrics obtained, please try again.");
        }
    })
})

