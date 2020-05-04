var baseURL = "https://api.lyrics.ovh/v1/"

// $(document).ready(function(){




$("#searchBtn").on("click", function(){

    var artistName = $("#userSearch").val().trim();

    



    var songName = $("#userSearch2").val().trim();

    

    var fullUrl = baseURL + artistName + "/" + songName 
    $.ajax({
        type: "GET",
        url: fullUrl
        // dataType: "json"
    }).then(function(response) {
        $("#lyrics").text(response.lyrics)
        console.log(response.lyrics);
        
    
        
    })
    
   
    

})
