//Document Ready Function
$(document).ready(function () {

    // Initial array of Sports to Populate Initial Buttons
    var topics = ["baseball", "basketball", "football", "hockey", "golf", "soccer", "lacrosse", "curling"];

    //Function to Display Search Query when user clicks button
    function getTopic (topic) {
        //Get topic from topics array
    var index = topics.indexOf(topic);
    return encodeURIComponent (topics[index]);
    };    
    
    // Function for dumping the JSON content for each button into the div
    function displaySportInfo() {

        var topic = $(this).attr("data-name");
        //http://api.giphy.com/v1/gifs/search?api_key=9HeQ9HW3dHXdNkyJQDA69pPw4TvgtlG0&q=baseball&limit=10
        var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=9HeQ9HW3dHXdNkyJQDA69pPw4TvgtlG0&q=" + getTopic(topic) + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).
        
        then(function (response) {
            $("#sports-gifs").empty();
            for (var i = 0; i < response.data.length; i++) {

            // Creating a div to hold the sports gif
            var gifDiv = $("<div class='sport'>");

            // Storing the rating data
            var rating = response.data[i].rating;
            console.log(rating);
            // Creating an element to have the rating displayed
            var gifrating = $("<p>").text("Rating: " + rating);
            // Displaying the rating
            gifDiv.append(gifrating);

            // Retrieving the URL for the gif image
            var imgURL = response.data[i].images.original.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appending the Sports gif image
            gifDiv.append(image);

            // Putting the entire sports gif above the previous sports gifs
            $("#sports-gifs").append(gifDiv);
        }
        });

    }

    // Function for displaying all sports buttons
    function renderButtons() {

        // Deleting the sports buttons prior to adding new sports giphy search buttons to avoid repeat buttons
        $("#sports-buttons").empty();

        // Looping through the pre-defined array of sports
        for (var i = 0; i < topics.length; i++) {

            // Here we're dynamically generating buttons for each sport in the array.
            var a = $("<button>");
            // Adding a class for each button
            a.addClass("sport-btn");
            // Adding a data-attribute with a value of the sport at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the sport at index i
            a.text(topics[i]);
            // Adding the button to the HTML in the Sports-Buttons div
            $("#sports-buttons").append(a);
        }
    }

    // This function handles events when the submit button is clicked by the user
    $("#add-giphy").on("click", function (event) {
        // event.preventDefault prevents the form from submitting itself. Also allows user to hit enter instead of clicking button
        event.preventDefault();

        // This line will grab the input text from the input box
        var sportInput = $("#giphy-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(sportInput);

        // calling renderButtons function which handles the processing of our sports array
        renderButtons();
    });

    // Function for displaying the Sports giphy info
    // Using $(document).on instead of $(".sport").on to add event listeners to dynamically generated elements
    $(document).on("click", ".sport-btn", displaySportInfo);

    // Calling the renderButtons function at least once to display the initial list of sports
    renderButtons();










    //For Loop to Go through and load all Pre-Defined Buttons on click (load 10 results, show )

    // var api = "http://api.giphy.com/v1/gifs/search?";
    // var apiKey = "&api_key=9HeQ9HW3dHXdNkyJQDA69pPw4TvgtlG0";
    // var query = "&q=baseball";

    // $.ajax({
    //     type: 'GET',
    //     url: "http://api.giphy.com/v1/gifs/search?&api_key=9HeQ9HW3dHXdNkyJQDA69pPw4TvgtlG0&q=baseball",
    //     success: function(data) {
    //         console.log('success', data);
    //         $.each(data, function(i, gif) {
    //             $('#sports-buttons').append('<img src=' + url + '>')
    //         })
    //     }
    // })


    //From Giphy Youtube Video
    // var api = "http://api.giphy.com/v1/gifs/search?";
    // var apiKey = "&api_key=9HeQ9HW3dHXdNkyJQDA69pPw4TvgtlG0";
    // var query = "&q=baseball";

    // function setup() {
    //     noCanvas();
    //     var url = api + apiKey + query;
    //     loadJSON(url, gotData);
    // };

    // function gotData (giphy) {
    //     for (i = 0; i < giphy.data.length; i++) {
    //     createImg(giphy.data[i].images.original.url);
    //   }
    // };


    //Test from Giphy API documentation 
    // var baseball = $.get("http://api.giphy.com/v1/gifs/search?q=baseball&api_key=9HeQ9HW3dHXdNkyJQDA69pPw4TvgtlG0&limit=10");
    // baseball.done(function(data) { 
    //     console.log("success got data", data); });

    //Function to listen for Click Action for the "Add Sport" button to dynamically add a new button with user's search query














    //End Document Ready Function
});