class Car {
    /**
     * This function creates a car object and appends it to the road div.
     * @param [type=other] - "player" or "other"
     * @param initial_X_position - The initial X position of the car.
     */
    constructor(type = "other", initial_X_position) {
        this.car_image = type === "other" ? "../images/other.png" : "../images/player.png"

        this.positionX = initial_X_position;

        this.width = CAR_WIDTH;
        this.height = CAR_HEIGHT;

        this.top = (type === "player") ? PLAYER_Y_POSITION : -10;

        this.car = this.create_car(type);

        ROAD.appendChild(this.car);

        if (this.car.car_type === "player") {
            this.player_movement();
        }
        else if (this.car.car_type === "other") {
            this.street_car_movement();
        }
    }

    /**
     * It creates a div element, sets its width, height, border, background image, background size, background repeat, background position, position, top, and left properties, and then returns the div element
     * @param type - "other" or "player"
     * @returns The car_element is being returned.
     */
    create_car(type) {
        this.car_element = document.createElement("div");
        this.car_element.car_type = type;

        this.car_element.style.width = `${this.width}px`;
        this.car_element.style.height = `${this.height}px`;

        this.car_element.style.backgroundImage = `url(${this.car_image})`;
        this.car_element.style.backgroundSize = "contain";
        this.car_element.style.backgroundRepeat = "no-repeat";
        this.car_element.style.backgroundPosition = "center";

        // this.car_element.style.transform = "translate(-50%,0)";
        this.car_element.style.position = "absolute";
        this.car_element.style.top = `${this.top}%`;
        this.car_element.style.left = `${this.positionX}%`;

        if (this.car_element.car_type === "other") this.car_element.style.transform = "rotateZ(180deg)";

        return this.car_element;
    }

    /**
     * It moves the player's car to the left or right by a certain amount of pixels per second.
     * @param current_position - The current position of the car.
     * @param final_position - the position where the car should be moved to
     * @returns The setInterval() method calls a function or evaluates an expression at specified
     * intervals (in milliseconds).
     */
    move_player_car(current_position, final_position) {
        let speedX = (final_position - current_position) / LANE_DISTANCE;
        return setInterval(() => {
            current_position += speedX;
            this.car.style.left = `${current_position}%`;

            CURRENT_PLAYER_POSITION = current_position;

            if (parseInt(current_position) === Math.abs(final_position)) {
                clearInterval(this.move_id);
                this.move_id = '';
            }

        }, FRAME_PER_SECOND);
    }

    /**
     * When the user presses the 'a' or 'd' key, the player's car moves to the left or right, respectively, if the car is not moving and if the car is not in the leftmost or rightmost lane.
     */
    player_movement() {
        document.addEventListener("keypress", (e) => {
            let current_position = parseInt(this.car.style.left);
            if (e.key.toLowerCase() === "a" && !this.move_id && current_position > FIRST_LANE && !GAME_OVER) {
                let final_position = (current_position - LANE_DISTANCE);

                this.move_id = this.move_player_car(current_position, final_position);
            }
            else if (e.key.toLowerCase() === "d" && !this.move_id && current_position < LAST_LANE && !GAME_OVER) {
                let final_position = (current_position + LANE_DISTANCE);

                this.move_id = this.move_player_car(current_position, final_position);
            }
        });
    }

    /**
     * "If the game is not over, move the car down the road, check for collision with the player, and if the car has not reached the end of the road, repeat the process."
     */
    street_car_movement() {
        if (GAME_OVER) return;
        let current_position = parseFloat(this.car.style.top);

        this.car.style.top = `${current_position + (1 - (GAME_SPEED / 5))}%`;

        if (current_position >= CHECK_AFTER_CAR_TRAVEL) {
            this.check_collision_with_player();
        }

        window.requestAnimationFrame(() => {
            if (current_position < 100) {
                this.street_car_movement();
            } else {
                ROAD.removeChild(this.car);
                SCORE++;

            }
        })
    }

    /**
     * If the player's left side is to the left of the car's left side and the player's right side is to the right of the car's left side, or if the player's left side is to the left of the car's right side and the player's right side is to the right of the car's right side, then return true.
     * @param player_x_coordinates - [x_coordinate_of_left_of_player_car, x_coordinate_of_right_of_player_car]
     * @param car_x_coordinates - [x_coordinate_of_left_of_car, x_coordinate_of_right_of_car]
     * @returns a boolean value.
     */
    car_colision_condition_x_axis(player_x_coordinates, car_x_coordinates) {
        return (player_x_coordinates[0] <= car_x_coordinates[0] && player_x_coordinates[1] >= car_x_coordinates[0]) || (player_x_coordinates[0] <= car_x_coordinates[1] && player_x_coordinates[1] >= car_x_coordinates[1])
    }

    /**
     * If the top of the player is less than or equal to the top of the car and the bottom of the player is greater than or equal to the top of the car, or if the top of the player is less than or equal to the bottom of the car and the bottom of the player is greater than or equal to the bottom of the car, then return true.
     * @param player_y_coordinates -[y_coordinate_of_left_of_player_car, y_coordinate_of_right_of_player_car]
     * @param car_y_coordinates - [y_coordinate_of_top_of_car, y_coordinate_of_bottom_of_car]
     * @returns a boolean value.
     */
    car_colision_condition_y_axis(player_y_coordinates, car_y_coordinates) {
        return (player_y_coordinates[0] <= car_y_coordinates[1] && player_y_coordinates[1] >= car_y_coordinates[1]) || (player_y_coordinates[0] >= car_y_coordinates[0] && player_y_coordinates[1] <= car_y_coordinates[0])
    }

    /**
     * "If the player's car is within the same x and y coordinates as the street car, then the game is over."
     * The function is called every time the street car moves.
     */
    check_collision_with_player() {
        const car_width_percent = (CAR_WIDTH / ROAD_WIDTH) * 100;
        const car_height_percent = (CAR_HEIGHT / ROAD_HEIGHT) * 100;

        const street_car_current_x_position = parseInt(this.car.style.left);
        const street_car_current_y_position = parseInt(this.car.style.top);

        let player_coordinates_x = [CURRENT_PLAYER_POSITION, CURRENT_PLAYER_POSITION + car_width_percent];
        let player_coordinates_y = [PLAYER_Y_POSITION, PLAYER_Y_POSITION + car_height_percent];

        let car_coordinates_x = [street_car_current_x_position, street_car_current_x_position + car_width_percent];
        let car_coordinates_y = [street_car_current_y_position, street_car_current_y_position + car_height_percent];

        if (this.car_colision_condition_x_axis(player_coordinates_x, car_coordinates_x) && this.car_colision_condition_y_axis(player_coordinates_y, car_coordinates_y)) {
            GAME_OVER = true;
            GAME_SPEED = 0;
            ROAD.style.animationDuration = `${GAME_SPEED}s`;
            GAME.reset_game();
        }
    }
}