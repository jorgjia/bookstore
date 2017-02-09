
 // jQuery code, two POST requests emitted from the buttons
$("document").ready(function() {

	$("#send").on("click", function() {
		// AJAX request that sends data from several text fields to the back-end server
		$.ajax({
			url: "/",
			type: "POST",
			dataType: "json",
			data: {
				emri: $("#emri").val(),
				mbiemri: $("#mbiemri").val(),
				email: $("#email").val(),
				
			},
			// If we get a successful response, we display a 'Web form submitted successfully' message.
			success: function(data) {
					console.log("Hello");
					var msg = JSON.stringify(data.message).split("");
					msg.pop();
					msg.shift();
					$("#message").html(msg.join(""));
			}
		});
	});

	$("#find").on("click", function() {
			// AJAX request that sends a name to the back-end, and tried to find a match in the database.
			$.ajax({
				url: "/find",
				type: "POST",
				dataType: "json",
				data: {
					emri: $("#text").val()
				},
				// If we get a name, we filter it on the front-end, and display it in a paragraph.
				success: function(data) {
					$("#person").html(
						"emri: " +
						data.emri +
						"<br>mbiemri: " +
						data.mbiemri +
						"<br>email: " +
						data.email );
				
						
				}
			});
	});

});