//Document Ready Function
$(document).ready(function () {

    // Initial array of Sports to Populate Initial Buttons
    var topics = ["baseball", "basketball", "football", "hockey", "golf", "soccer", "lacrosse", "curling"];

    //Function to Display Search Query when User Clicks Button
    function getTopic(topic) {
        //Get Topic from Topics Array
        var index = topics.indexOf(topic);
        //This allows user to search using multiple words/strings
        return encodeURIComponent(topics[index]);
    };

    // Function for dumping the JSON content for each button into the div
    function displaySportInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=9HeQ9HW3dHXdNkyJQDA69pPw4TvgtlG0&q=" + getTopic(topic) + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).

            then(function (response) {
                // Deleting the sports gifs div prior to adding gifs to avoid repeat gif images
                $("#sports-gifs").empty();
                //For loop to run through all responses (10) from API request for each search
                for (var i = 0; i < response.data.length; i++) {

                    // Creating a div to hold the sports gif
                    var gifDiv = $("<div class='sportdiv'>");

                    // Storing the rating data
                    var rating = response.data[i].rating;

                    // Creating an element to have the rating displayed
                    var gifrating = $("<p>").text("Rating: " + rating);

                    // Displaying the rating
                    gifDiv.append(gifrating);

                    //Variable for Images
                    var image = $("<img>");
                    image.addClass("sport");

                    // Retrieving the URL for the static gif image (default)
                    var imgURL = response.data[i].images.fixed_height_still.url;

                    //Retrieve the URL for the animated gif image & apply to data animate class
                    image.attr("data-animate", response.data[i].images.fixed_height.url);

                    // Retrieving the URL for the static gif image & apply to data still class
                    image.attr("data-still", response.data[i].images.fixed_height_still.url);

                    // Creating an element to hold the image & apply data-still/default class 
                    image.attr("src", response.data[i].images.fixed_height_still.url);

                    //Adding Data State Still to all gif images upon adding them to div
                    image.attr("data-state", "still");

                    // Appending the Sports gif image
                    gifDiv.append(image);

                    // Putting the entire sports gif above the previous sports gifs
                    $("#sports-gifs").append(gifDiv);

                };
            });
    };

    //On Click Function to Animate/Pause Gifs 
    $(document).on("click", ".sport", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Function for displaying all sports buttons
    function renderButtons() {

        // Deleting the sports buttons prior to adding new sports giphy search buttons to avoid repeat buttons
        $("#sports-buttons").empty();

        // Looping through the pre-defined array of sports
        for (var i = 0; i < topics.length; i++) {

            // Dynamically generating buttons for each sport in the array.
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
    };

    // This function handles events when the submit button is clicked by the user
    $("#add-giphy").on("click", function (event) {

        // event.preventDefault prevents the form from submitting itself. Also allows user to hit enter instead of clicking button
        event.preventDefault();

        // Grabs the input text from the input box
        var sportInput = $("#giphy-input").val().trim();

        // The sport search from the textbox is then added to our array
        topics.push(sportInput);

        // calling renderButtons function which handles the processing of our sports array
        renderButtons();
    });

    // Function for displaying the Sports giphy info
    $(document).on("click", ".sport-btn", displaySportInfo);

    // Calling the renderButtons function at least once to display the initial list of sports
    renderButtons();

    //End Document Ready Function
});