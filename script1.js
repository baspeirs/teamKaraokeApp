// id's
    // artist = userSearch
    // song = userSearch2
    // submit = searchBtn

//base urls
var bandInfoBaseURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";

//system of a down/chop%20suey"

$("#searchBtn").on("click", function(){
    // grab the values of the text boxes and apply them to variables
    var artistSearch = $("#userSearch").val();
    
    var fullBandURL = bandInfoBaseURL + artistSearch;

    $.ajax({
        url: fullBandURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.artists[0])
        // directions to logo png --- id from html = artistimg
        // create the image tag
        let logoTag = $("<img>")
        // apply the src attribute and attatch the directions to the logo
        logoTag.attr("src", response.artists[0].strArtistLogo)
        logoTag.attr("width", "200px")
        // append image to the page
        $("#artistimg").append(logoTag)

        // directions to the artist name
        var artistPTag = $("<p>")
        artistPTag.text(response.artists[0].strArtist)
        $("#artistimg").append(artistPTag)

        // directions to genre/style
        let genrePTag = $("<p>");
        genrePTag.text(response.artists[0].strStyle)
        // append to bottom div here

        // directions to facebook link
        let FBLinkTag = $("<a>")
        FBLinkTag.text(response.artists[0].strFacebook)
        // append to bottom div

        // directions to artist banner
        let artistThumbTag = $("<img>")
        artistThumbTag.attr("scr", response.artists[0].strArtistThumb)
        // append to bottom div
    })
})




