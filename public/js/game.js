class Game {
    /**
     * If the highscore is null, then set the highscore to the score, otherwise set the highscore to the local storage item.
     */
    constructor() {
        this.highscore = localStorage.getItem("highscore") === null ? SCORE : localStorage.getItem("highscore");

        this.reset_game();

        const START_BUTTON = document.querySelector("#start");
        START_BUTTON.addEventListener('click', () => {
            this.start_game();
        });
    }

    /**
     * This function resets the game by managing the score and displaying the menu.
     */
    reset_game() {
        this.manage_score();

        MENU.style.display = "flex";
        ROAD.innerHTML = "";
    }

    /**
     * If the current score is greater than the highscore, then the highscore is set to the current score and the highscore is saved to local storage.
     */
    manage_score() {
        if (SCORE >= this.highscore) {
            this.highscore = SCORE
            localStorage.setItem("highscore", SCORE)
        }

        const score_element = document.querySelector('p#score');
        score_element.innerText = `Score: ${SCORE} \n High-score: ${this.highscore}`;
        score_element.style.fontSize = "2rem";
        score_element.style.textAlign = "center";

    }

    /**
     * It starts the game.
     */
    start_game() {
        GAME_SPEED = 4;
        SCORE = 0;
        CURRENT_PLAYER_POSITION = 45;
        GAME_OVER = false;

        ROAD.style.animationDuration = `${GAME_SPEED}s`;

        new Car("player", CURRENT_PLAYER_POSITION);
        new Game_logic();

        MENU.style.display = "none";
    }
}