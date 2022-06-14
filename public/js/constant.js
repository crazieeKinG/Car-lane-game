const ROAD_WIDTH = 500;
const ROAD_HEIGHT = 700;

const FRAME_PER_SECOND = 0.06;
const LANE_DISTANCE = 35;

const FIRST_LANE = 10;
const MID_LANE = 45;
const LAST_LANE = 80;
const LANE_ARRAY = [FIRST_LANE, MID_LANE, LAST_LANE];


const CAR_WIDTH = 60;
const CAR_HEIGHT = 90;

const PLAYER_Y_POSITION = 85

const CHECK_AFTER_CAR_TRAVEL = 60;

let GAME_SPEED = 0;

let SCORE = 0;

let CURRENT_PLAYER_POSITION = 45;

let GAME_OVER = true;

const ROAD = document.querySelector("#road");
ROAD.style.animationDuration = `${GAME_SPEED}s`;

const MENU = document.querySelector("#game_menu");

let GAME;