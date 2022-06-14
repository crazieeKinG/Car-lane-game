class Game_logic {
    /**
     * The constructor function creates a score board element and appends it to the road element. It also starts the game.
     */
    constructor() {
        this.score_element = this.create_score_board();

        ROAD.appendChild(this.score_element);
        this.game_id = '';

        this.start_game();
    }

    /**
     * It returns the number of milliseconds that should elapse between each frame of the game.
     * @returns the value of the expression (GAME_SPEED / 2) * 1000.
     */
    get_delay() {
        return (GAME_SPEED / 2) * 1000;
    }

    /**
     * "Create a new car object and assign it to a random lane."
     */
    create_street_car() {
        let index = getRandomInt(0, LANE_ARRAY.length * 3) % LANE_ARRAY.length;
        new Car("other", LANE_ARRAY[index]);
    }

    
    /**
     * It creates a div element, sets the inner text to the value of the SCORE variable, and then sets the style of the div element to the values specified.
     * @returns The score_element is being returned.
     */
    create_score_board(){
        const score_element = document.createElement('div');
        score_element.innerText = SCORE;

        score_element.style.padding = "0.5rem 1rem";
        score_element.style.fontSize = "3rem";
        score_element.style.color = "white";


        score_element.style.position = "absolute";
        score_element.style.transform = "translate(-50%,0)";
        score_element.style.top = "5%";

        score_element.style.left = "50%";
        score_element.style.zIndex = "2";
        

        return score_element;
    }

    /* Updating the score board. */
    maintain_score(){
        this.score_element.innerText = SCORE;
    }

    /**
    * "If the game is not over, then create a street car, and if the score is divisible by 2, then increase the game speed."
    * "Reset the render car delay to the new game speed."
    * "Keep the score up to date."
    */
    start_game() {
        if (!this.game_id) {
            const delay = this.get_delay();
            this.game_id = setInterval(() => {
                if (GAME_OVER) {
                    clearInterval(this.game_id);
                    this.game_id = "";
                }

                this.create_street_car();

                if (SCORE % (GAME_SPEED * 2) === 0 && GAME_SPEED > 1) {
                    GAME_SPEED--;
                }

                if (GAME_SPEED != (delay / 1000)) {
                    clearInterval(this.game_id);

                    ROAD.style.animationDuration = `${GAME_SPEED}s`;
                    this.game_id = "";
                }

            }, delay);
        }

        this.maintain_score();

        window.requestAnimationFrame(() => {
            if (!GAME_OVER) {
                this.start_game();
            }
        });
    }
}