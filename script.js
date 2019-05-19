//the object that host the entire app
const numberGame = {}
//the variable that tracks the level of the game.
numberGame.level = 0;
//the variable that stores the random number generated for that level
numberGame.randNumber;


//generates a random number with the size equal to the level of the game. first level, it generates a random number between 1 and 9, second level, it generates a random number from 10 to 99 and so on.
numberGame.generateRandomNumber = function (level){
    return Math.floor(10 ** (level - 1) + Math.random() * 9 * 10 ** (level - 1));
}

//generates the countdown and the progress bar attached to it. Once time runs out, it also loads frame two. 
numberGame.makeTimer = function (timeLeft) {
    
    //declare jquery selectors for better performance
    $countdown = $(".countdown");
    $progressBar = $(".progress-bar");

    //display the initial time remaining on page
    $countdown.html(`${timeLeft} seconds remaining`);
    //define the width of the initial progress bar as 100;
    let progressWidth = 100;
    //set the width increment as a function of timeLeft.
    let widthIncrement = progressWidth / timeLeft / 100
    //define the setInterval function
    let timer = setInterval(function () {
        //reduce timeLeft in 0.01 second increments.
        timeLeft = timeLeft - 1 / 100;
        //reduce the width of the progress bar the size of the widthIncrement
        progressWidth = progressWidth - widthIncrement;
        //display timeLeft on the html
        $countdown.html(`<p>${Math.round(timeLeft*10)/10} seconds remaining </p>`);
        ///update the width of the progress bar on html
        $progressBar.width(`${progressWidth}%`);
        //when width of the progress bar is zero, clearInterval and move to the next frame.
        if (progressWidth <= 0) {
            // $(".countdown").html(`time is up`);
            clearInterval(timer);
            numberGame.makeFrameTwo();
        }
    }, 10);
}


//generates the loading page of the game.
numberGame.makeFrameZero = function(){
    let frameZero = `<section class="frame0">
                        <div>
                            <h2>Getting Started</h2>
                            <p>Average human can remember a number upto 7 digits. How many can you remember?</p>
                        </div>
                        <label for="start" class="visually-hidden">Start the Game</label>
                        <button type="button" name="start" class="load-next-level button">Start</button>
                    </section>`;
    $(".game-container").html(frameZero);
    $('.load-next-level').focus();
}
//generates the frame that shows the user the random number that was generated. 
numberGame.makeFrameOne = function (){
    //increase level,
    numberGame.level++;
    //generate a random number and store it in randNumber.
    numberGame.randNumber = numberGame.generateRandomNumber(numberGame.level);

    let frameOne = `<section class="frame1">
                        <h2>Level ${numberGame.level}: Memorize the Number</h2>
                        <p class="random-number-container">${numberGame.randNumber}</p>
                        <div class="time">
                            <div class="countdown"></div>
                            <div class="time-bar-container">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                    </section>`;
    $(".game-container").html(frameOne);
    //initialize a countdown that tells the user how much time they have left
    numberGame.makeTimer(numberGame.level);
}
//generates the frame that asks the user if they remember the number and ask the user to input that number.
numberGame.makeFrameTwo = function (){
    let frameTwo =  `<section class="frame2">
                        <h2>Level ${numberGame.level}: Can you remember the Number?</h2>
                        <form action="">
                            <label for="name" class="visually-hidden">Enter your memorized number </label>
                            <input type="number" class="userField" name="number" required placeholder="Enter your number">
                            <label for="submit" class="visually-hidden">Submit the number</label>
                            <button type="submit" name="submit" class="submit button">Submit</button>
                        </form>
                    </section>`;
    $(".game-container").html(frameTwo);
    $('.userField').focus(); 
}
//generates the frame that tells the user that they got the number right. 
numberGame.makeFrameThree = function (userNumber){
    let frameThree =`<section class="frame3">
                        <h2>Level ${numberGame.level}: You got it right!</h2>
                        <h3>The Actual Number was:</h3>
                        <p>${numberGame.randNumber}</p>
                        <h3>Your answer was:</h3>
                        <p>${userNumber}</p>
                        <label for="next" class="visually-hidden">Go to next level</label>
                        <button type="button" name="next" class="load-next-level button">Next</button>
                        
                    </section>`;
    $(".game-container").html(frameThree);
    $('.load-next-level').focus();
}
//generates the frame that tells the user they got the number wrong and the game is over.
numberGame.makeFrameFour = function (userNumber){
    let frameFour = `<section class="frame4">
                        <h2 class="result">Level ${numberGame.level}: Game Over!</h2>
                        <h3>The Actual Number was:</h3>
                        <p>${numberGame.randNumber}</p>
                        <h3>Your Answer Was:</h3>
                        <p>${userNumber}</p>
                        <label for="again" class="visually-hidden">Play Again</label>
                        <button type="button" name="again" class="startOver button">Start Over</button>
                    </section>`;
    $(".game-container").html(frameFour);
    $('.startOver').focus();
}

$(function() {
    //generate the loading page
    numberGame.makeFrameZero();
    //when user presses start or next lebel buttons,
    $(".game-container").on("click", ".load-next-level", function(){
        //generate frame that shows the user what the random number is along with a countdown.
        numberGame.makeFrameOne();
    })
    //when the user has the number typed in, they click submit
    $(".game-container").submit(function (e){
    e.preventDefault();

        //form return the number as a string. using parseInt, the program converts that to a number.
        let userNumber = parseInt($(".userField").val(),10);
        
        if (userNumber === numberGame.randNumber){
            //load frame three - You got it right!
            numberGame.makeFrameThree(userNumber);
        }

        else{
            //load frame four - Game Over!
            numberGame.makeFrameFour(userNumber);
            if (numberGame.level - 1 <= 7) {
                $(".result").after(`<p>Your last succesful level was ${numberGame.level - 1}. You are below average. Sad. </p>`);
            }
            else if (numberGame.level - 1 <= 12) {
                $(".result").after(`<p> Your last succesful level was ${numberGame.level - 1}. You are not a super human but are still above average. Congratulations! </p>`);
            }
            else
                $(".result").after(`<p>Your last succesful level was ${numberGame.level - 1}. You are either a super human or you cheated. Either way, congratulations!</p>`);
        }
    })
    

    $(".game-container").on("click", ".startOver", function () {
        numberGame.level = 0;
        numberGame.makeFrameZero(); 
    })


})

