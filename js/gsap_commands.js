/*
 * GSAP animation has three main components:
 * Tweens: These are the actual animations (movements or changes to any property) of elements
 * Timelines: These execute Tweens over a specified duration.
 * ScrollTriggers: These execute Timelines or Tweens as the page scrolls. Standalone ScrollTriggers
 * can be used without Tweens only using callbacks.
 * 
 * One approach is to create a timeline, specify a scroll trigger on which the timeline executes
 * and attach a series of tweens to the timeline. The page is divided into Sections, each of which 
 * has its own content and animations.
 * The second approach is to create a timeline and attach a series of tweens to the timeline and 
 * execute the timeline on a function call (using timeline.play())
 * 
 * The page is divided into the following parts:
 * First is settings. Elements are set on the page using GSAP commands rather than CSS styling.
 * Second is Global Variables which calculates parameters that are used across functions.
 * 
 */

/***************** 
* REGISTER PLUGINS 
******************/
// For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/********************** 
* SET ELEMENT POSITIONS
* Set initial positions for all elements in GSAP code rather than as CSS styling
* This must be done before any position values are calculated
***********************/

//The left top corner of the element are set to the left and top offset % values
//To center the element it needs to be translated back and up by half its width and height
gsap.set(('#vor-instrument-to'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-instrument-from'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-markings'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-cdi'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-radial'), {left:'50%', top:'40%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#airplane'), {left:'50%', top:'85%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#compass-north'), {left:'0%', top:'0%', xPercent:'0', yPercent:'0'});


/***************** 
* GLOBAL VARIABLES
******************/

//Global variables, positions at start and other initializations

let start_radial = 180; //We will only check for 5 values: 150, 165, 180, 195, 210 
let start_heading = 0;

//For element dimensions and positions:
//$('#id').height() or .width() is equal to document.getElementById('id').clientHeight or .clientWidth
//document.getElementById('id').width or .height is greater as it includes padding
let vor_radial_width = $('#vor-radial').width(); //500
let vor_radial_height = $('#vor-radial').height(); //465
let vor_radial_start_left = $('#vor-radial').position().left; //20.65
let vor_radial_start_top = $('#vor-radial').position().top; //19.5
let vor_radial_start_center_x = vor_radial_start_left + vor_radial_width/2; //270.65
let vor_radial_start_center_y = vor_radial_start_top + vor_radial_height/2; //252

/* alert(vor_radial_width); 
alert(vor_radial_height);
alert(vor_radial_start_left);
alert(vor_radial_start_top);
alert(vor_radial_start_center_x);
alert(vor_radial_start_center_y); */


let airplane_width = $('#airplane').width(); //64
let airplane_height = $('#airplane').height(); //51
let airplane_start_left = $('#airplane').position().left; //245.15
let airplane_start_top = $('#airplane').position().top; //503.5
let airplane_start_center_x = airplane_start_left + airplane_width/2; //277.15  
let airplane_start_center_y = airplane_start_top + airplane_height/2; //529

let start_distance_to_vor = (airplane_start_center_y - vor_radial_start_center_y);

/* alert(airplane_width);
alert(airplane_height);
alert(airplane_start_left);
alert(airplane_start_top);
alert(airplane_start_center_x);
alert(airplane_start_center_y); */

let vor_cdi_width = $('#vor-cdi').width();
let vor_cdi_height = $('#vor-cdi').height();
let vor_cdi_start_left = $('#vor-cdi').position().left;
let vor_cdi_start_top = $('#vor-cdi').position().top;
let vor_cdi_start_center_x = vor_cdi_start_left + vor_radial_width/2;
let vor_cdi_start_center_y = vor_cdi_start_top + vor_radial_height/2;

//let airplane_top = document.getElementById('airplane').getBoundingClientRect().top; //557.6
//let airplane_height = document.getElementById('airplane').getBoundingClientRect().height;

//alert("airplane_height: " + airplane_height + "airplane_height_pos" + $('#airplane').height() + "clientHeight: " + document.getElementById('airplane').clientHeight);

//let airplane_start_left = $('#airplane').position().left;
//alert("airplane_start_left: " + airplane_start_left);

//let airplane_center = airplane_top + airplane_height/2;
//let vor_radial_center = 50;


//For element positions:
//let vor_radial_top = parseInt(document.getElementById('vor-radial').getBoundingClientRect().top);
//let vor_radial_left = parseInt(document.getElementById('vor-radial').getBoundingClientRect().left);



/* For each radial calculate the distance left (-ve) or right (+ve) along 
 * the horizontal axis of airplane motion, starting at the 180 radial.
 * Each radial will have an entry, center and exit points. 
 * On entry rotate markings to that radial and move CDI away from center, left or right
 * At center, move CDI to center
 * The values are calculated once on load, the position is determined by a function getRadial().
 */

let length_180_radial = parseInt(document.getElementById("vor-radial").getBoundingClientRect().height)/2;
/* Math.tan() and .sin() and .cos() need angle in radians */
/* x_first_radial and x_second_radial are positive lengths on left or right side */
let abs_dzr = 0; //distance_zero_radial (abs = absolute)
let abs_dfr = parseInt(Math.abs(length_180_radial * Math.tan(15 * Math.PI/180))); //distance_first_radial
let abs_dsr = parseInt(Math.abs(length_180_radial * Math.tan(30 * Math.PI/180))); //distance_second_radial
let abs_sd = (abs_dfr - abs_dzr) / 2; //half distance between radials, +ve value, equal segments across radials

//alert("abs_dzr: " + abs_dzr + "abs_dfr: " + abs_dfr + "abs_dsr: " + abs_dsr);

//For each radial, in an array, store left (-ve wrt airplane), center and right (+ve wrt airplane) points
let radial_180_points = [-(abs_dzr+abs_sd), abs_dzr, abs_dzr+abs_sd];
let radial_195_points = [-(abs_dfr+abs_sd), -abs_dfr, -(abs_dfr-abs_sd)];
let radial_210_points = [-(abs_dsr+abs_sd), -abs_dsr, -(abs_dsr-abs_sd)]; //Left value is left edge for aiplane
let radial_165_points = [(abs_dfr-abs_sd), abs_dfr, (abs_dfr+abs_sd)];
let radial_150_points = [(abs_dsr-abs_sd), abs_dsr, (abs_dsr+abs_sd)]; //Right value is right edge for aiplane

console.log(radial_180_points);
console.log(radial_195_points);
console.log(radial_210_points);
console.log(radial_165_points);
console.log(radial_150_points);

//Flags
let reached_edge = true;



/************************************* 
* TIMELINES, TWEENS AND SCROLLTRIGGERS
**************************************/

/*
 * Create standalone ScrollTriggers for element property changes, no animation
 */
/*
ScrollTrigger.create({
  id: "intro",
  trigger: "#section-intro",
  start: "top 51%",
  end: "top 0%",
  scrub: 1,
  onEnter: ({progress, direction, isActive}) => {},
  onEnterBack: ({progress, direction, isActive}) => {},
});
*/

/*
 * This scrolls along with the viewport, no trigger needs to be defined
 */

let tl0 = gsap.timeline({
  scrollTrigger: {
    id: "0",
    scrub: 1,
  }
}); 

/* No animations on tl0 */

/* 
 * Section Intro and its objects
 */

let tl_intro = gsap.timeline({
  scrollTrigger: {
    id: "intro",
    trigger: "#section-intro",
    start: "top -1%",
    end: "bottom 25%",
    scrub: 1,
    onEnter: () => {
      document.querySelector("#navbar-text").innerHTML = "";
      $('.nav-link').removeClass("active");
    },
    onEnterBack: () => {
      document.querySelector("#navbar-text").innerHTML = "";
      $('.nav-link').removeClass("active");
    },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

/* ScrollTrigger.create({
  id: "intro",
  trigger: "#section-intro",
  start: "top 51%",
  end: "top 0%",
  scrub: 1,
  onEnter: ({progress, direction, isActive}) => {},
  onEnterBack: ({progress, direction, isActive}) => {},
}); */

/* 
 * Section 1-1 and its objects - this has horizontally scrolling panels
 * Create a seperate timeline for the indicator just for these cases.
 */

let panels_1_1 = gsap.utils.toArray(".panel-1-1");

let tl_1_1 = gsap.timeline({
  scrollTrigger: {
    id: "1_1",
    trigger: "#section-1-1",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-1-1").offsetWidth,
    pin: "#section-1-1",
    scrub: 1,
    snap: 1 / (panels_1_1.length - 1),
    markers: false,
    onEnter: () => { updateTOC(1,1); },
    onEnterBack: () => { updateTOC(1,1); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_1_1.to(panels_1_1, {xPercent: -100 * (panels_1_1.length - 1), ease: "none"}, 0);

/* 
 * Section 1-2 and its objects
 * For single panel sections do not include the snap attribute in ScrollTrigger
 * or any animation. Use the callbacks to update TOC and page header, that's all.
 */

let tl_1_2 = gsap.timeline({
  scrollTrigger: {
    id: "1_2",
    trigger: "#section-1-2",
    start: "top 0%",
    end: "bottom 25%",
    scrub: 1,
    onEnter: () => { updateTOC(1,2); },
    onEnterBack: () => { updateTOC(1,2); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
}); 

// add animations and labels to the timeline

/* 
 * Section 1-3 and its objects - this has horizontally scrolling panels
 * Create a seperate timeline for the indicator just for these cases.
 */

let panels_1_3 = gsap.utils.toArray(".panel-1-3");

let tl_1_3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-1-3",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-1-3").offsetWidth,
    pin: "#section-1-3",
    scrub: 1,
    snap: 1 / (panels_1_3.length - 1),
    onEnter: () => { updateTOC(1,3); },
    onEnterBack: () => { updateTOC(1,3); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_1_3.to(panels_1_3, {xPercent: -100 * (panels_1_3.length - 1), ease: "none"}, 0);

/* 
 * Section 1-4 and its objects
 */

let panels_1_4 = gsap.utils.toArray(".panel-1-4");

let tl_1_4 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-1-4",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-1-4").offsetWidth,
    pin: "#section-1-4",
    scrub: 1,
    snap: 1 / (panels_1_4.length - 1),
    onEnter: () => { updateTOC(1,4); },
    onEnterBack: () => { updateTOC(1,4); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_1_4.to(panels_1_4, {xPercent: -100 * (panels_1_4.length - 1), ease: "none"}, 0);

/* 
 * Section 2-1 and its objects
 */

let panels_2_1 = gsap.utils.toArray(".panel-2-1");

let tl_2_1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-2-1",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-2-1").offsetWidth,
    pin: "#section-2-1",
    scrub: 1,
    snap: 1 / (panels_2_1.length - 1),
    onEnter: () => { updateTOC(2,1); },
    onEnterBack: () => { updateTOC(2,1); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_2_1.to(panels_2_1, {xPercent: -100 * (panels_2_1.length - 1), ease: "none"}, 0);

/* 
 * Section 2-2 and its objects
 */

let panels_2_2 = gsap.utils.toArray(".panel-2-2");

let tl_2_2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-2-2",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-2-2").offsetWidth,
    pin: "#section-2-2",
    scrub: 1,
    snap: 1 / (panels_2_2.length - 1),
    onEnter: () => { updateTOC(2,2); },
    onEnterBack: () => { updateTOC(2,2); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_2_2.to(panels_2_2, {xPercent: -100 * (panels_2_2.length - 1), ease: "none"}, 0);

/* 
 * Section 2-3 and its objects
 */

let panels_2_3 = gsap.utils.toArray(".panel-2-3");

let tl_2_3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-2-3",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-2-3").offsetWidth,
    pin: "#section-2-3",
    scrub: 1,
    snap: 1 / (panels_2_3.length - 1),
    onEnter: () => { updateTOC(2,3); },
    onEnterBack: () => { updateTOC(2,3); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_2_3.to(panels_2_3, {xPercent: -100 * (panels_2_3.length - 1), ease: "none"}, 0);

/* 
 * Section 2-4 and its objects
 */

let panels_2_4 = gsap.utils.toArray(".panel-2-4");

let tl_2_4 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-2-4",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-2-4").offsetWidth,
    pin: "#section-2-4",
    scrub: 1,
    snap: 1 / (panels_2_4.length - 1),
    onEnter: () => { updateTOC(2,4); },
    onEnterBack: () => { updateTOC(2,4); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_2_4.to(panels_2_4, {xPercent: -100 * (panels_2_4.length - 1), ease: "none"}, 0);

/* 
 * Section 2-5 and its objects
 */

let panels_2_5 = gsap.utils.toArray(".panel-2-5");

let tl_2_5 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-2-5",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-2-5").offsetWidth,
    pin: "#section-2-5",
    scrub: 1,
    snap: 1 / (panels_2_5.length - 1),
    onEnter: () => { updateTOC(2,5); },
    onEnterBack: () => { updateTOC(2,5); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_2_5.to(panels_2_5, {xPercent: -100 * (panels_2_5.length - 1), ease: "none"}, 0);

/* 
 * Section 3-1 and its objects
 */

let panels_3_1 = gsap.utils.toArray(".panel-3-1");

let tl_3_1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-3-1",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-3-1").offsetWidth,
    pin: "#section-3-1",
    scrub: 1,
    snap: 1 / (panels_3_1.length - 1),
    onEnter: () => { updateTOC(3,1); },
    onEnterBack: () => { updateTOC(3,1); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_3_1.to(panels_3_1, {xPercent: -100 * (panels_3_1.length - 1), ease: "none"}, 0);

/* 
 * Section 3-2 and its objects
 */

let tl_3_2 = gsap.timeline({
  scrollTrigger: {
    id: "3_2",
    trigger: "#section-3-2",
    start: "top 0%",
    end: "bottom 25%",
    scrub: 1,
    onEnter: () => { updateTOC(3,2); },
    onEnterBack: () => { updateTOC(3,2); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
}); 

/* 
 * Section 3-3 and its objects
 */

let panels_3_3 = gsap.utils.toArray(".panel-3-3");

let tl_3_3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-3-3",
    start: "top 0%",
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector("#section-3-3").offsetWidth,
    pin: "#section-3-3",
    scrub: 1,
    snap: 1 / (panels_3_3.length - 1),
    onEnter: () => { updateTOC(3,3); },
    onEnterBack: () => { updateTOC(3,3); },
    onLeave: () => {},
    onLeaveBack: () => {},
  }
});

tl_3_3.to(panels_3_3, {xPercent: -100 * (panels_3_3.length - 1), ease: "none"}, 0);

/* 
 * Section Glossary and its objects
 */

let tl_glossary = gsap.timeline({
  scrollTrigger: {
    id: "glossary",
    trigger: "#section-glossary",
    start: "top 0%",
    end: "bottom 25%",
    scrub: 1,
    onEnter: () => {
      $('.nav-link').removeClass("active");
      document.querySelector("#toc-glossary").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "Glossary";
    },
    onEnterBack: () => {
      $('.nav-link').removeClass("active");
      document.querySelector("#toc-glossary").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "Glossary";
    },
    onLeave: () => {
      document.querySelector("#toc-glossary").classList.remove("active");
    },
    onLeaveBack: () => {
      document.querySelector("#toc-glossary").classList.remove("active");
    },
  }
});

/* 
 * Section References and its objects
 */

let tl_references = gsap.timeline({
  scrollTrigger: {
    id: "references",
    trigger: "#section-references",
    start: "top 20%",
    end: "bottom 25%",
    scrub: 1,
    onEnter: () => {
      $('.nav-link').removeClass("active");
      document.querySelector("#toc-references").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "References";
    },
    onEnterBack: () => {
      $('.nav-link').removeClass("active");
      document.querySelector("#toc-references").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "References";
    },
    onLeave: () => {
      document.querySelector("#toc-references").classList.remove("active");
    },
    onLeaveBack: () => {
      document.querySelector("#toc-references").classList.remove("active");
    },
  }
});

let obs_value = 0;

let roll_tl = gsap.timeline({repeat: 0, repeatDelay: 1, paused: true});
roll_tl.to("#a321-front-view", {rotation: 30, duration: 5});
roll_tl.to("#a321-front-view", {rotation: -30, duration: 5});
roll_tl.to("#a321-front-view", {rotation: 0, duration: 5});

let pitch_tl = gsap.timeline({repeat: 0, repeatDelay: 1, paused: true});
pitch_tl.to("#a321-side-view", {rotation: -15, duration: 5});
pitch_tl.to("#a321-side-view", {rotation: 15, duration: 5});
pitch_tl.to("#a321-side-view", {rotation: 0, duration: 5});

let yaw_tl = gsap.timeline({repeat: 0, repeatDelay: 1, paused: true});
yaw_tl.to("#a321-top-view", {rotation: -15, duration: 5});
yaw_tl.to("#a321-top-view", {rotation: 15, duration: 5});
yaw_tl.to("#a321-top-view", {rotation: 0, duration: 5});

/********************** 
* FUNCTIONS - Animation
***********************/

let roll = () => {
  roll_tl.play();
  roll_tl.restart(true, true);
}   

let pitch = () => {
  pitch_tl.play();
  pitch_tl.restart(true, true);
}   

let yaw = () => {
  yaw_tl.play();
  yaw_tl.restart(true, true);
}

/* The timeline needs to be defined inside the function if it takes parameters */
let vor_markings_rotate = (obs_value) => {
  let radial = 0;
  //So function can be called fom button click or from another function
  if(obs_value == null){
    radial = parseInt(document.querySelector("#obs-input").value);
  }else{
    radial = obs_value;
  }
  
  let vor_markings_rotate_tl = gsap.timeline({repeat: 0, repeatDelay: 1, paused: true});
  vor_markings_rotate_tl.to("#vor-markings", {rotation: -radial, duration: 5}, 0);

  vor_markings_rotate_tl.play();
  vor_markings_rotate_tl.restart(true, true);                      
}

/* FUNCTION: Moves the airplane right or left by x and rotates it by degrees 
 * The x value passed here from the button click is +ve or -ve indicating right and left movement
 */

let moveAirplane = (x, degrees) => {
  let side = "";
  let diff_from_start = 0;
  let airplane_position = 0;

  if($('#airplane').position().left < airplane_start_left) {side = "left"};
  if($('#airplane').position().left > airplane_start_left) {side = "right"};

  /* degrees is passed as a -ve value for clockwise rotation */
  /* This will be the heading the airplane will fly on */
  start_heading += degrees;
  if(start_heading == -360) start_heading = 0; //Reset 360 to 0

  /* Determine if on a radial (only check for a few values) and rotate the primary course value */
  let length_180_radial = parseInt(document.getElementById("vor-radial").getBoundingClientRect().height)/2;
  /* Math.tan() and .sin() and .cos() need angle in radians */
  /* x_first_radial and x_second_radial are positive lengths on left or right side */
  let x_zero_radial = 0;
  let x_first_radial = parseInt(Math.abs(length_180_radial * Math.tan(15 * Math.PI/180)));
  let x_second_radial = parseInt(Math.abs(length_180_radial * Math.tan(30 * Math.PI/180)));
  let max_distance = x_second_radial + 10;

  /* With this approach the diff_from_start will always be a postive value */
  if(side === "left")
    {diff_from_start = airplane_start_left - $('#airplane').position().left;}
  if(side === "right")
    {diff_from_start = $('#airplane').position().left - airplane_start_left;}

  if(diff_from_start > max_distance){
    $("#edge-alert").show();
    //Force reverse direction when at edge, can't stop movement else current x won't ever change
    if(side == "left" && x < 0) x = 4;
    if(side == "right" && x > 0) x = -4;
  }
  else{
    $("#edge-alert").hide();
  }
  /* Timelines */

  /* Timeline to move airplane, rotate markings and move CDI */
  let move_airplane_tl = gsap.timeline({repeat: 0, repeatDelay: 1, paused: true});
  move_airplane_tl.to("#airplane", {rotation: "-="+degrees, duration: 1}, 0)
                  .to("#airplane", {x: "+="+x,
                    onComplete: () => {}
                    }, 0)
                  .to("#start-heading",{innerHTML: parseInt(Math.abs(start_heading)), duration: 0});

  move_airplane_tl.play();
  //move_airplane_tl.restart(true, true);

  //If x == 0 the the airplane is only being rotated in position so no VOR changes */
  /* Move markings and CDI */
  /* If the dial is rotated to a new radial, the CDI line should be centered */
  if(x !== 0){
    let radial_at = getRadial($('#airplane').position().left);
    vor_markings_rotate(radial_at.radial);
    moveVORCDI(radial_at.distance, radial_at.side);
  }
}

/* Move the CDI line left or right, will be called programmatically depending on airplane position
 * The CDI needs to move in a direction depending on whether the airplane is to 
 * the right of the radial (move CDI to the left) or left of the radial (move CDI to the right)
 * At radials the CDI is centered
 */

//CDI side,store as global 
let prev_side = "on"; //Starts with on 180

let moveVORCDI = (distance, side) => {
  let move_vor_cdi_tl = gsap.timeline({paused: true});

  if(side == "on"){ //Reset
    move_vor_cdi_tl.to("#vor-cdi", {x: 0}, 0);
    prev_side = "on";
  }else if(side == "overvor"){ //WHen over the VOR station the CDI moves randomly to one side, no action
    move_vor_cdi_tl.to("#vor-cdi", {x: "+=50"}, 0);
    prev_side = "on";
  }else if(side == "right" && (prev_side == "on" || prev_side == "right")){
    move_vor_cdi_tl.to("#vor-cdi", {x: "-=2"}, 0); //Airplane is on the right so move CDI to left
    prev_side = "right";
  }else if(side == "right" && prev_side == "left"){
    move_vor_cdi_tl.to("#vor-cdi", {x: "-=50"}, 0); //Edge of radials to move CDI to edge
    prev_side = "leftedge";
  }else if(side == "right" && prev_side == "leftedge"){
    move_vor_cdi_tl.to("#vor-cdi", {x: "+=2"}, 0); //Reverse from edge
    prev_side = "leftedge";
  }else if(side == "left" && (prev_side == "on" || prev_side == "left")){
    move_vor_cdi_tl.to("#vor-cdi", {x: "+=2"}, 0); //Airplane is on the left so move CDI to right
    prev_side = "left";
  }else if(side == "left" && prev_side == "right"){
    move_vor_cdi_tl.to("#vor-cdi", {x: "+=50"}, 0); //Edge of radials to move CDI to edge
    prev_side = "rightedge";
  }else if(side == "left" && prev_side == "rightedge"){
    move_vor_cdi_tl.to("#vor-cdi", {x: "-=2"}, 0); //Reverse from edge
    prev_side = "leftedge";
  };

  //alert("cdi_side: " + side + ",prev_side: " + prev_side);

  move_vor_cdi_tl.play();
  move_vor_cdi_tl.restart(true,true);
}

/* Moves the airplane along the set heading
 * When it reaches the VOR station the center line goes all the way to the left
 * When it crosses the VOR station the To flag changes to From
 */
let startFlight = (heading) => {
  let start_flight_tl = gsap.timeline({paused: true});
  start_flight_tl.to("#airplane", {y: "-="+start_distance_to_vor, duration: 10}, 0)
                  //When the airplane reaches the VOR station
                  .to("#vor-instrument-to", {display:"none"})
                  //The flag changes to From and the dial rotates to show the reciprocal course index
                  //as the primary course index
                  .to("#vor-instrument-from", {display:"block"})
                  .to("#vor-markings", {rotation: 180, duration: 5})
                  //Continue beyond the VOR station
                  .to("#vor-cdi", {x: "+=50"}, 10) //Moves randomly to one end, no action required
                  .to("#airplane", {y: "-="+start_distance_to_vor, duration: 10})
                  .to("#vor-cdi", {x: 0},12);

  start_flight_tl.play();
  start_flight_tl.restart(true, true);
}

/* FUNCTION to return which radial and which side of the radial the airplane is at */
/* 180: -34.5, 0, 34.5*/
/* 195: -103.5, -69, -34.5*/
let getRadial = (x_position) => {
  radial_at = {radial: 180, side: "on", distance: 0};
  //Offset position by #airplane centre point (approx .position().left)
  let x_position_offset = x_position - airplane_start_left;

  if(Math.abs(x_position_offset - radial_180_points[1]) < 2){
    radial_at.radial = 180;
    radial_at.side = "on";
  }else if(Math.abs(x_position_offset - radial_195_points[1]) < 2){
    radial_at.radial = 195;
    radial_at.side = "on";
  }else if(Math.abs(x_position_offset - radial_210_points[1]) < 2){
    radial_at.radial = 210;
    radial_at.side = "on";
  }else if(Math.abs(x_position_offset - radial_165_points[1]) < 2){
    radial_at.radial = 165;
    radial_at.side = "on";
  }else if(Math.abs(x_position_offset - radial_150_points[1]) < 2){
    radial_at.radial = 150;
    radial_at.side = "on";
  }
  
  else if(between(x_position_offset, radial_180_points[0], radial_180_points[1])){
    radial_at.radial = 180;
    radial_at.side = "left";
    //Calculate distance proportionately
  }else if(between(x_position_offset, radial_180_points[1], radial_180_points[2])){
    radial_at.radial = 180;
    radial_at.side = "right";
  }
  
  else if(between(x_position_offset, radial_195_points[0], radial_195_points[1])){
    radial_at.radial = 195;
    radial_at.side = "left";
  }else if(between(x_position_offset, radial_195_points[1], radial_195_points[2])){
    radial_at.radial = 195;
    radial_at.side = "right";
  }

  else if(between(x_position_offset, radial_210_points[0], radial_210_points[1])){
    radial_at.radial = 210;
    radial_at.side = "left";
  }else if(between(x_position_offset, radial_210_points[1], radial_210_points[2])){
    radial_at.radial = 210;
    radial_at.side = "right";
  }

  else if(between(x_position_offset, radial_165_points[0], radial_165_points[1])){
    radial_at.radial = 165;
    radial_at.side = "left";
  }else if(between(x_position_offset, radial_165_points[1], radial_165_points[2])){
    radial_at.radial = 165;
    radial_at.side = "right";
  }

  else if(between(x_position_offset, radial_150_points[0], radial_150_points[1])){
    radial_at.radial = 150;
    radial_at.side = "left";
  }else if(between(x_position_offset, radial_150_points[1], radial_150_points[2])){
    radial_at.radial = 150;
    radial_at.side = "right";
  }
 return radial_at;
}

let setHeading = (heading) => {

}

/********************** 
* FUNCTIONS - Utility
***********************/

/* Changes to Sidebar ToC and Heading need to be made on scrolling and on ToC click */
/* Start by collapsing all items */
$(function(){
$('.tree-toggle').parent().children('ul.tree').toggle(0);
})

/* When clicking */
$('.tree-toggle').click(function () {	
  let selected_group = $(this).parent().children('ul.tree');
  $('.tree-toggle').parent().children('ul.tree').not(selected_group).hide(400);
  selected_group.toggle(400);
})

$('.nav-link').click(function () {
  /*$('#navbar-text').innerHTML = $(this).text();*/
  document.querySelector("#navbar-text").innerHTML = $(this).text();
})

/* Functions to call when scrolling */

/* This function will expand the required group in the ToC and highlight the selected link */
/* It will also update the page header */
/* When scrolling do not toggle the ToC, explicitly hide or show as required */
let updateTOC = (toc_group, toc_link)=> {
  //Construct the elements with these two values (all sections are toc_group-content, 1-1, 1-2...)
  //Show/Hide group of ToC links
  let selected_group = $('#toc-'+toc_group).parent().children('ul.tree');
  $('.tree-toggle').parent().children('ul.tree').not(selected_group).hide(400);
  selected_group.show(400);

  //Set selective link to Active
  $('.nav-link').removeClass("active");
  $('#toc-'+toc_group+'-'+toc_link).addClass("active");
  //document.querySelector("#toc-1-4").classList.add("active");

  //Update page header
  document.querySelector("#navbar-text").innerHTML = $('#section-'+toc_group+'-'+toc_link).attr("data-title");
}

/* UTILITY FUNCTIONS */
let between = (x, min, max) => {
  return x >= min && x < max; //Keep equal only on one side so there is no overlap at boundary
}

/* Enable popovers everywhere */
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})


/******************************** 
* FUNCTIONS EXECUTED ON PAGE LOAD
*********************************/

/* Call once on page load to set to 180 degrees as primary course */
/* Or use a pre-rotated image then this will not be necessary */
vor_markings_rotate(180);