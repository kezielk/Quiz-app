$(document).ready(function() {
runProgram();

	function runProgram(){
		var scoreAry = [];
		var questions = [ 
					{ q: "Whats seven plus seven", s: ["16", "15", "14", "13"], a: "14", correct: 0 },
					{ q: "What is my name?", s: ["walter white", "Gerard", "Eisenhower", "Bob"], a: "Gerard", correct: 0 },
					{ q: "Who is your father", s: ["Darth vader", "Sperm Donor", "The infamous Bob", "Your father"], a: "Your father", correct: 0 },
					{ q: "Who are you", s: ["Bob", "Mario", "Bowser", "Me"], a: "Me", correct: 0  },
					{ q: "Who is marios nemesis", s: ["communism", "Bowser", "Darth Vader", "hitler"], a: "Bowser", correct: 0  }
				];  		
var counter = questions.length;


		//This grabs the question and answer data from the questions array and appends it to the content container:
		function setUp(dataSet) {
			for (var i = 0; i < dataSet.length; i++) {
				$("#question-block").append('<form id="'+i+'" class="center-text"><p class="question">'+dataSet[i].q+'</p><br/>'+formatRadioButtons(dataSet[i].s, i)+'<p class="center-text spaced-top-bottom"><button class="start-over spaced-right">&#8635;</button><button type="submit" class="center-text next">&#62;</button></p></form>');
			}

			//This hides all the newly created questions, except the first:
			for (var i=dataSet.length-1; i > 0; i--) {
				$('#'+i).hide();
			}
		}
		

		//This grabs the answer choices from the questions array and returns them to setUp() on line 19:	
		function formatRadioButtons(ary, qNum) {  //Example of ary would be ["Robert Downey, Jr.", "Sarah Palin", "Elon Musk"] from line 7
			var answers = [];
			for (i=0; i < ary.length; i++) { 
				answers.push('<label><input type="radio" name="'+qNum+'" value="'+ary[i]+'">'+ary[i]+'</label>');
			}
			return answers.join(" ");
		}
		
		
		//This sums the correct values in the questions array:
		function addUpScore(dataSet) {
			return scoreAry.reduce(function(previousValue, currentValue, index, array){  //scoreAry was initialized on line 5.
			  return previousValue + currentValue;
			});
		}


		//This checks the user's answer and updates his or her score:
		function checkAnswer(answer, qNum, dataSet) {
			if (answer == dataSet[qNum].a) {
				dataSet[qNum].correct = 1;
				scoreAry.push(dataSet[qNum].correct);  //scoreAry was initialized on line 5.  This pushes the value of 1 to the array.
				$(".instruction-text").text('You\'re score is: ' + addUpScore(dataSet) + ' correct out of '+ dataSet.length + '.');
			}
			else {
				scoreAry.push(dataSet[qNum].correct);  //scoreAry was initialized on line 5.  This pushes the value of 0 to the array.
				$(".instruction-text").text('You\'re score is: ' + addUpScore(dataSet) + ' correct out of '+ dataSet.length + '.');
			}
		}
		

		//This returns your final score:
		function scoreMsg(percentage){
			var msg = null;
			$("header").removeClass("normal");
			$(".title").css("color", "white");

			if (percentage <=100 && percentage >= 80) {
				msg = "Great job!";
				$("header").addClass("great-job");
				return msg;
			}
			else if (percentage <=79 && percentage >= 50) {
				msg = "Not bad!";
				$("header").addClass("not-bad");
				return msg;
			}
			else {
				msg = "You don't get out much do you?";
				$("header").addClass("get-out-more");
				return msg;
			}
		}
		

		setUp(questions);

		$(".next").click(function(event){
			event.preventDefault();  //This stops the form from submitting
			var qNum = $(this).closest("form").attr("id"); //This gives us the question number
			var userInput = $('input[name='+qNum+']:radio:checked').val();  //This grabs the user's selected answer

				if (counter > 1) {
					checkAnswer(userInput, qNum, questions);
					$("#"+qNum).hide();
					$("#"+qNum).next().show();
					counter--;
				}
				else if (counter == 1) {
					checkAnswer(userInput, qNum, questions);
					var percentage = (100/questions.length)*addUpScore(questions);
					$(".instruction-text").text('You\'re final score is: '+percentage+'%');
					$("#question-block").find("form").remove();
					$(".content-container").append('<section class="final-score center-text"><p>'+scoreMsg(percentage)+'</p><br/><form><button class="start-over">&#8635;</button></form></section>');
				}
				else {
					return false;
				}
		});
	}
});