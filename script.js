const numberGame = {}
numberGame.level = 0;
numberGame.randNumber;

//generates a random number with the size equal to the level of the game. first level, it generates a random number between 1 and 9, second level, it generates a random number from 10 to 99 and so on.
numberGame.generateRandomNumber = function (level){
    return Math.floor(10 ** (level - 1) + Math.random() * 9 * 10 ** (level - 1));
}

numberGame.makeTimer = function (timeLeft) {
    timeLeft = timeLeft -1;
    $(".countdown").html(`${timeLeft} seconds remaining`);
    let timer = setInterval(function () {
        timeLeft = timeLeft - 1;
        $(".countdown").html(`<div>${timeLeft} seconds remaining</div>`);
        $(".progress")

        if (timeLeft <= 0) {
            $(".countdown").html(`time is up`);
            clearInterval(timer);
        }
    }, 1000);
}


//generates the loading page of the game.
numberGame.makeFrameZero = function(){
    let frameZero = `<section class="frame0">
                        <h2>Frame 0: Getting Started</h2>
                        <p>Average human can remember a number upto 7 digits. How many can you remember?</p>
                        <button type="button" class="loadNextLevel">Start</button>
                    </section>`;
    $(".gameContainer").html(frameZero);
    $('.loadNextLevel').focus();
}
//generates the frame that shows the user the random number that was generated. 
numberGame.makeFrameOne = function (){
    //increase level,
    numberGame.level++;
    //generate a random number and store it in randNumber.
    numberGame.randNumber = numberGame.generateRandomNumber(numberGame.level);

    let frameOne = `<section class="frame1">
                        <h2>Frame 1: Memorize the Number</h2>
                        <h2 class="level"> Level ${numberGame.level}</h2>
                        <h3>Remember this number</h3>
                        <div class="countdown"></div>
                        <div class="timeBarContainer">
                            <div class="progressBar"></div>
                        </div>
                        <p class="randomNumberContainer">${numberGame.randNumber}</p>
                    </section>`;
    $(".gameContainer").html(frameOne);
    //initialize a countdown that tells the user how much time they have left
    numberGame.makeTimer(numberGame.level + 1);

    //set a delay as long as the countdown timer duration for user to memorize the number. Once countdown runs its course, generate the frameTwo.
    setTimeout(function () {
        numberGame.makeFrameTwo(numberGame.level);
        //make sure the input is focused. 
    }, (numberGame.level + 60) * 1000);
}
//generates the frame that asks the user if they remember the number and ask the user to input that number.
numberGame.makeFrameTwo = function (){
    let frameTwo =  `<section class="frame2">
                        <h2>Frame 2: Can you remember the Number?</h2>
                        <h2 class="level">Level ${numberGame.level}</h2>
                        <h2>What was the number?</h2>
                        <form action="">
                            <input type="text" class="userField">
                            <button type="submit" class="submit">Submit</button>
                        </form>
                    </section>`;
    $(".gameContainer").html(frameTwo);
    $('.userField').focus(); 
}
//generates the frame that tells the user that they got the number right. 
numberGame.makeFrameThree = function (userNumber){
    let frameThree =`<section class="frame3">
                        <h2>Frame 3: You got it right!</h2>
                        <h2 class="level">Level ${numberGame.level}</h2>
                        <h3>The Actual Number was:</h3>
                        <p>${numberGame.randNumber}</p>
                        <h3>Your answer was:</h3>
                        <p>${userNumber}</p>
                        <button type="button" class="loadNextLevel">Next</button>
                        
                    </section>`;
    $(".gameContainer").html(frameThree);
    $('.loadNextLevel').focus();
}
//generates the fram that tells the user they got the number wrong and the game is over.
numberGame.makeFrameFour = function (userNumber){
    let frameFour = `<section class="frame4">
                        <h2 class="result">Frame 4: You got it wrong. Game Over!</h2>
                        <h2 class="level">Level ${numberGame.level}</h2>
                        <h3>The Actual Number was:</h3>
                        <p>${numberGame.randNumber}</p>
                        <h3>Your answer was:</h3>
                        <p>${userNumber}</p>
                        <button type="button" class="startOver">Start Over</button>
                    </section>`;
    $(".gameContainer").html(frameFour);
    $('.startOver').focus();
}

$(function() {
    //generate the loading page
    numberGame.makeFrameZero();
    //when user presses start or next lebel buttons,
    $(".gameContainer").on("click", ".loadNextLevel", function(){
        //generate frame that shows the user what the random number is along with a countdown.
        numberGame.makeFrameOne();
    })
    //when the user has the number typed in, they click submit
    $(".gameContainer").submit(function (e){
        e.preventDefault();
        
        userInput = $(".userField").val();
        if (userInput ==="") {
            console.log(`nothin: ${userInput}`);
            numberGame.makeFrameFour("blank");
            $(".result").html(`You didn't input a number! Game Over`);

        }
        else{
            //form return the number as a string. using parseInt, the program converts that to a number.
            let userNumber = parseInt($(".userField").val(),10);
            
            if (userNumber === numberGame.randNumber){
                //load frame three - You got it right!
                numberGame.makeFrameThree(userNumber);
            }

            else{
                //load frame four - Game Over!
                numberGame.makeFrameFour(userNumber);
            }
        }
    })
    

    $(".gameContainer").on("click", ".startOver", function () {
        numberGame.level = 0;
        numberGame.makeFrameZero(); 
    })


})

