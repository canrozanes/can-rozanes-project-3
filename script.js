const numberGame = {}
numberGame.level = 0;
numberGame.randNumber;

//generates a random number with the size equal to the level of the game. first level, it generates a random number between 1 and 9, second level, it generates a random number from 10 to 99 and so on.
numberGame.generateRandomNumber = function (level){
    return Math.floor(10 ** (level - 1) + Math.random() * 9 * 10 ** (level - 1));
}

//generates the loading page of the game.
numberGame.makeFrameZero = function(){
    return `<section class="frame0">
                <h2>Frame 0: Getting Started</h2>
                <p>Average human can remember a number upto 7 digits. How many can you remember?</p>
                <button type="button" class="start">Start</button>
            </section>`;
}
//generates the frame that shows the user the random number that was generated. 
numberGame.makeFrameOne = function (level, randomNumber){
    return `<section class="frame1">
                <h2>Frame 1: Memorize the Number</h2>
                <h2 class="level"> Level ${level}</h2>
                <h3>Remember this number</h3>
                <p class="countdown">time left: 1 second</p>
                <p class="randomNumberContainer">${randomNumber}</p>
                <button type="button" class="next">Next</button>
            </section>`;
}
//generates the frame that asks the user if they remember the number and ask the user to input that number.
numberGame.makeFrameTwo = function (level){
    return  `<section class="frame2" id="status">
                <h2>Frame 2: Can you remember the Number?</h2>
                <h2 class="level">Level ${level}</h2>
                <h2>What was the number?</p>
                <form action="">
                    <input type="text" class="userField">
                    <button type="button" class="submit">Submit</button>
                </form>
            </section>`;
}
//generates the frame that tells the user that they got the number right. 
numberGame.makeFrameThree = function (level, randomNumber, userNumber){
    return `<section class="frame3">
                <h2>Frame 3: You got it right!</h2>
                <h2 class="level">Level ${level}</h2>
                <h3>The Actual Number was:</h3>
                <p>${randomNumber}</p>
                <h3>Your answer was:</h3>
                <p>${userNumber}</p>
                <button type="button" class="nextLevel">Next</button>
                
            </section>`;
}
//generates the fram that tells the user they got the number wrong and the game is over.
numberGame.makeFrameFour = function (level, randomNumber, userNumber){
    return `<section class="frame4">
                <h2>Frame 4: You got it wrong. Game Over!</h2>
                <h2 class="level">Level ${level}</h2>
                <h3>The Actual Number was:</h3>
                <p>${randomNumber}</p>
                <h3>Your answer was:</h3>
                <p>${userNumber}</p>
                <button type="button" class="startOver">Start Over</button>
            </section>`;
}

$(function() {
    //generate the loading page
    $(".gameContainer").html(numberGame.makeFrameZero());

    //when user presses the start button,
    $(".gameContainer").on("click", ".start", function(){
        //increase level,
        numberGame.level++;
        //generate a random number and store it in randNumber.
        numberGame.randNumber = numberGame.generateRandomNumber(numberGame.level);
        //generate frame that shows the user what the random number is along with a counter.
        $(".gameContainer").html(numberGame.makeFrameOne(numberGame.level, numberGame.randNumber));
    })
    //when user is confident they memorized the number they click next. 
    $(".gameContainer").on("click", ".next", function () {
        //generate the frame that asks the user if they remember the number. timer will be placed on this frame. 
        $(".gameContainer").html(numberGame.makeFrameTwo(numberGame.level));
        //make sure the input is focused. 
        $('.userField').focus();
    })
    //when the user has the number typed in, they click submit
    $(".gameContainer").on("click", ".submit", function (){
        //form return the number as a string. using parseInt, the program converts that to a number.
        let userNumber = parseInt($(".userField").val(),10);
        
        if (userNumber === numberGame.randNumber){

            $(".gameContainer").html(numberGame.makeFrameThree(numberGame.level,numberGame.randNumber, userNumber))
            numberGame.level++;
        }
        else{
            $(".gameContainer").html(numberGame.makeFrameFour(numberGame.level, numberGame.randNumber, userNumber))
        }
    })
    $(".gameContainer").on("click", ".nextLevel", function () {

        numberGame.randNumber = numberGame.generateRandomNumber(numberGame.level);
        $(".gameContainer").html(numberGame.makeFrameOne(numberGame.level, numberGame.randNumber));

    })
    $(".gameContainer").on("click", ".startOver", function () {
        numberGame.level = 0;
        $(".gameContainer").html(numberGame.makeFrameZero());        
    })


})
