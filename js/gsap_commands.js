/*
 * The page is divided into sections, generally animate each section
 * as it scrolls about 51% into the viewport.
 * Each section has at least one ScrollTrigger to change the scroller text.
 * Create an independent instance of ScrollTrigger if there is no Tween
 * and only using callbacks.
 * Create an instance of ScrollTrigger inside the Tween if its a 1-1 association.
 * Create a Timeline, add Tweens and attach one ScrollTrigger to the Timeline
 * if mulitple tweens are to be animated on one trigger.
 */

/* Globcal control variables */

// For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
    onEnter: () => {},
    onLeave: () => {},
    onEnterBack: () => {},
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
    onEnter: () => {
      //document.querySelector("#scroller-label-1").classList.add("active");
      //document.querySelector("#navbar-text").innerHTML = "Principles of Flight";      
      show_toc('#toc-1'); //Only call on first and last section of every menu group, it will close others
      update_toc('#toc-1-1', "Principles of Flight");
      /* Pause the pseudo scroller while moving through horizontal panels */
      //ScrollTrigger.getById("0").disable(false);
    },
    onEnterBack: () => {
      show_toc('#toc-1');
      update_toc('#toc-1-1', "Principles of Flight");
      //ScrollTrigger.getById("0").disable(false);
    },
    onLeave: () => {
      //document.querySelector("#scroller-label-1").classList.remove("active");
      /* Resume the pseudo scroller */
      //ScrollTrigger.getById("0").enable(false);
    },
    onLeaveBack: () => {
      //document.querySelector("#scroller-label-1").classList.remove("active");
      //ScrollTrigger.getById("0").enable(false);
    },
  }
});

tl_1_1.to(panels_1_1, {xPercent: -100 * (panels_1_1.length - 1), ease: "none"}, 0);

/* 
 * Section 1-2 and its objects
 */

let tl_1_2 = gsap.timeline({
  scrollTrigger: {
    id: "1_2",
    trigger: "#section-1-2",
    start: "top 0%",
    end: "bottom 25%",
    scrub: 1,
    onEnter: () => {
      //document.querySelector("#navbar-text").innerHTML = "Airplane Structure";
      //document.querySelector("#toc-1-2").classList.add("active");
      update_toc('#toc-1-2', "Airplane Structure");
    },
    onLeave: () => {
      //document.querySelector("#toc-1-2").classList.remove("active");
    },
    onEnterBack: () => {
      update_toc('#toc-1-2', "Airplane Structure");
    },
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
    
    onEnter: () => {
      document.querySelector("#navbar-text").innerHTML = "Motion in Air";
      document.querySelector("#toc-1-3").classList.add("active");
      /* Pause the pseudo scroller while moving through horizontal panels */
      ScrollTrigger.getById("0").disable(false);
    },
    onEnterBack: () => {
      document.querySelector("#navbar-text").innerHTML = "Motion in Air";
      document.querySelector("#toc-1-3").classList.add("active");
      //ScrollTrigger.getById("0").disable(false);
    },
    onLeave: () => {
      document.querySelector("#toc-1-3").classList.remove("active");
      /* Resume the pseudo scroller */
      ScrollTrigger.getById("0").enable(false);
    },
    onLeaveBack: () => {
      document.querySelector("#toc-1-3").classList.remove("active");
      ScrollTrigger.getById("0").enable(false);
    },
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
    onEnter: () => {
      document.querySelector("#toc-1-4").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "Forces In Flight";
      /* Pause the pseudo scroller while moving through horizontal panels */
      ScrollTrigger.getById("0").disable(false);
    },
    onEnterBack: () => {
      document.querySelector("#toc-1-4").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "Forces In Flight";
      //ScrollTrigger.getById("0").disable(false);
      show_toc('#toc-1');
    },
    onLeave: () => {
      document.querySelector("#toc-1-4").classList.remove("active");
      /* Resume the pseudo scroller */
      ScrollTrigger.getById("0").enable(false);
    },
    onLeaveBack: () => {
      document.querySelector("#toc-1-4").classList.remove("active");
      ScrollTrigger.getById("0").enable(false);
    },
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
    onEnter: () => {
      document.querySelector("#toc-2-1").classList.add("active");
      show_toc('#toc-2');
      /* Pause the pseudo scroller while moving through horizontal panels */
      ScrollTrigger.getById("0").disable(false);
    },
    onEnterBack: () => {
      document.querySelector("#toc-2-1").classList.add("active");
      show_toc('#toc-2');
      //ScrollTrigger.getById("0").disable(false);
    },
    onLeave: () => {
      document.querySelector("#toc-2-1").classList.remove("active");
      /* Resume the pseudo scroller */
      ScrollTrigger.getById("0").enable(false);
    },
    onLeaveBack: () => {
      document.querySelector("#toc-2-1").classList.remove("active");
      ScrollTrigger.getById("0").enable(false);
    },
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
    end: () => "+=" + document.querySelector("#section-2-1").offsetWidth,
    pin: "#section-2-2",
    scrub: 1,
    snap: 1 / (panels_2_2.length - 1),
    onEnter: () => {
      document.querySelector("#toc-2-2").classList.add("active");
      show_toc('#toc-2');
      /* Pause the pseudo scroller while moving through horizontal panels */
      ScrollTrigger.getById("0").disable(false);
    },
    onEnterBack: () => {
      document.querySelector("#toc-2-2").classList.add("active");
      show_toc('#toc-2');
      //ScrollTrigger.getById("0").disable(false);
    },
    onLeave: () => {
      document.querySelector("#toc-2-2").classList.remove("active");
      /* Resume the pseudo scroller */
      ScrollTrigger.getById("0").enable(false);
    },
    onLeaveBack: () => {
      document.querySelector("#toc-2-2").classList.remove("active");
      ScrollTrigger.getById("0").enable(false);
    },
  }
});

tl_2_2.to(panels_2_2, {xPercent: -100 * (panels_2_2.length - 1), ease: "none"}, 0);

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
      document.querySelector("#toc-glossary").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "Glossary";
    },
    onLeave: () => {
      document.querySelector("#toc-glossary").classList.remove("active");
    },
    onEnterBack: () => {
      document.querySelector("#toc-glossary").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "Glossary";
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
      document.querySelector("#toc-references").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "References";
    },
    onLeave: () => {
      document.querySelector("#toc-references").classList.remove("active");
    },
    onEnterBack: () => {
      document.querySelector("#toc-references").classList.add("active");
      document.querySelector("#navbar-text").innerHTML = "References";
    },
    onLeaveBack: () => {
      document.querySelector("#toc-references").classList.remove("active");
    },
  }
});

/* TWEENS AND TIMELINES
 * Create tweens, and timelines if multiple tweens and assign them to variables then play on events as required.
 * Declare global variables if required to be passed to tweens.
 * Set these in the function that calls the play and use in the tween.
 * Would have been good to be able to pass the tween a parameter - To check!
 */

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

/***********
 * FUNCTIONS
 * Functions to be called on button clicks or other events that will play tweens
 ***********/

 /* Gobal variables */

let start_heading = 0;

let vor_radial_top = parseInt(document.getElementById("vor-radial").getBoundingClientRect().top);
let vor_radial_left = parseInt(document.getElementById("vor-radial").getBoundingClientRect().left);
let vor_radial_width = parseInt(document.getElementById("vor-radial").getBoundingClientRect().width);
let vor_radial_height = parseInt(document.getElementById("vor-radial").getBoundingClientRect().height);

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

/* Set initial positions for all elements in GSAP code rather than as CSS styling */
gsap.set(('#vor-instrument-to'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-instrument-from'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-markings'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-cdi'), {left:'50%', top:'50%', xPercent:'-50', yPercent:'-50'});
gsap.set(('#vor-radial'), {left:'50%', top:'40%', xPercent:'-50', yPercent:'-50', scale: 0.4});
gsap.set(('#airplane'), {left:'50%', top:'85%', xPercent:'-50', yPercent:'-50', rotation: -90});

/* The timeline needs to be defined inside the function if it takes parameters */
let vor_markings_rotate = (obs_value_param) => {
  let obs_value = 0;
  //So function can be called fom button click or from another function
  if(obs_value_param == null){
    obs_value = parseInt(document.querySelector("#obs-input").value);
  }else{
    obs_value = obs_value_param;
  }
  
  let vor_markings_rotate_tl = gsap.timeline({repeat: 0, repeatDelay: 1, paused: true});
  vor_markings_rotate_tl.to("#vor-markings", {rotation: -obs_value, duration: 5}, 0);

  vor_markings_rotate_tl.play();
  vor_markings_rotate_tl.restart(true, true);                      
}

/* Call once on page load to set to 180 degrees as primary course */
/* Or use a pre-rotated image then this will not be necessary */
vor_markings_rotate(180);

//Global variables, positions at start and other initializations
//Since this is a single page, positions are offset on the screen on reload
let airplane_start_left = $('#airplane').position().left;
let vor_cdi_start_left = $('#vor-cdi').position().left;
let reached_edge = true;

/* Calculate and store as global variables the radial range
 * For each radial calculate as positive or negative values the entry, center and exit points 
 * wrt the airplane start position, which is at the 180 radial
 * On entry rotate markings to that radial and move CDI away from center, left or right
 * At center point, move CDI also to center
 * The values are calculated once on load, the position is determined by a function getRadial()
 */

/* Determine if on a radial (only check for a few values) and rotate the primary course value */
let length_180_radial = parseInt(document.getElementById("vor-radial").getBoundingClientRect().height)/2;
/* Math.tan() and .sin() and .cos() need angle in radians */
/* x_first_radial and x_second_radial are positive lengths on left or right side */
/* Offset everything by airplane_start_position x value */
let abs_dzr = 0; //distance_zero_radial (abs = absolute)
let abs_dfr = parseInt(Math.abs(length_180_radial * Math.tan(15 * Math.PI/180))); //distance_first_radial
let abs_dsr = parseInt(Math.abs(length_180_radial * Math.tan(30 * Math.PI/180))); //distance_second_radial
let abs_sd = (abs_dfr - abs_dzr) / 2; //half distance between radials, +ve value, equal segments across radials

alert("abs_dzr: " + abs_dzr + "abs_dfr: " + abs_dfr + "abs_dsr: " + abs_dsr);

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

/* FUNCTION: Moves the airplane right or left by x and rotates it by degrees 
 * The x value passed here from the button click is +ve or -ve indicating right and left movement
 */

//This needs to be outside of the function so it does not get reset on every call
let at_radial = 180; //We will only check for 5 values: 150, 165, 180, 195, 210 

let move_airplane = (x, degrees) => {
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

  getRadial($('#airplane').position().left);

  /* Move markings and CDI */
  /* If the dial is rotated to a new radial, the CDI line should be centered */

  let cdi_x = 0; //How much to move the CDI by
  let side_of_radial = ""; //Which side of the radial the airplane is on
  let distance_from_radial = 0;
  
  if(Math.abs(diff_from_start - x_zero_radial) < 4){
    at_radial = 180;
    cdi_x = 0;
    distance_from_radial = diff_from_start - x_zero_radial; //Need to know +ve or -ve
  } else if(Math.abs(diff_from_start - x_first_radial) < 4){
      distance_from_radial = diff_from_start - x_first_radial; //Need to know +ve or -ve
      if (side == "left"){
        at_radial = 195;
        cdi_x = 0;
      }
      if (side == "right"){
        at_radial = 165;
        cdi_x = 0;
      }
  } else if(Math.abs(diff_from_start - x_second_radial) < 4){
      distance_from_radial = diff_from_start - x_second_radial; //Need to know +ve or -ve
      if (side == "left"){ 
        at_radial = 210;
        cdi_x = 0;
      }
      if (side == "right"){
        at_radial = 150;
        cdi_x = 0;
      }
  } else{
      //at_radial remains at last set value
      //The CDI can move right of left independent of the airplane based on radial
      //This is determined when moving the CDI, so here pass the absolute value
      cdi_x = Math.abs(x)/2; 
  }

  ////Determine side of radial
  if(side == "left"){
    if(distance_from_radial < 0){
      side_of_radial = "right";
    }else{
      side_of_radial = "left";
    }
  }else if(side == "sight"){
    if(distance_from_radial < 0){
      side_of_radial = "left";
    }else{
      side_of_radial = "right";
    }
  }
  

  //Move based on x and at_radial values set under conditions above
  vor_markings_rotate(at_radial);
  move_vor_cdi(distance_from_radial, at_radial, side_of_radial);
}

/* Move the CDI line left or right, will be called programmatically depending on airplane position
 * The CDI needs to move in a direction depending on whether the airplane is to 
 * the right of the radial (move CDI to the left) or left of the radial (move CDI to the right)
 * At radials the CDI is centered
 */

let move_vor_cdi = (cdi_x, at_radial, side_of_radial) => {
  let move_vor_cdi_tl = gsap.timeline({paused: true});
  if(cdi_x == 0){ //Reset
    move_vor_cdi_tl.to("#vor-cdi", {x: 0, 
      onComplete: () => {/*console.log("to: " + gsap.getProperty("#vor-cdi", "x"));*/}
      }, 0);
  }else{
    move_vor_cdi_tl.to("#vor-cdi", {x: "+="+cdi_x}, 0);
  }
  move_vor_cdi_tl.play();
  move_vor_cdi_tl.restart(true,true);
}

/* Moves the airplane along the set heading
 * When it reaches the VOR station the center line goes all the way to the left
 * When it crosses the VOR station the To flag changes to From
 */
let startFlight = (heading) => {
  //alert(top + "," + left + "," + width + "," + height);
  //108, 737, 491, 457
  let vor_radial_center = vor_radial_top + vor_radial_height/2;

  let airplane_top = document.getElementById("airplane").getBoundingClientRect().top; //557.6
  let airplane_height = document.getElementById("airplane").getBoundingClientRect().height;

  let airplane_center = airplane_top + airplane_height/2;

  let distance_to_vor = (airplane_center - vor_radial_center);

  let start_flight_tl = gsap.timeline({repeat: 0, repeatDelay: 1, paused: false});
  start_flight_tl.to("#airplane", {y: "-="+distance_to_vor, duration: 10}, 0)
                  //When the airplane reaches the VOR station
                  .to("#vor-instrument-to", {display:"none"})
                  .to("#vor-instrument-from", {display:"block"})
                  //Continue beyond the VOR station
                  .to("#airplane", {y: "-="+distance_to_vor, duration: 10});

  start_flight_tl.play();
  start_flight_tl.restart(true, true);
}

/* FUNCTION to return which radial the airplane is at */
let getRadial = (x_position) => {
  //Offset position by #airplane centre point (approx .position().left)
  x_position = x_position - airplane_start_left;
  if(between(x_position, radial_180_points[0], radial_180_points[2])){
    alert("x_position: " + x_position + "radial: " + "180");
  }else if(between(x_position, radial_195_points[0], radial_195_points[2])){
    alert("x_position: " + x_position + "radial: " + "195");
  }else if(between(x_position, radial_210_points[0], radial_210_points[2])){
    alert("x_position: " + x_position + "radial: " + "210");
  }else if(between(x_position, radial_165_points[0], radial_165_points[2])){
    alert("x_position: " + x_position + "radial: " + "165");
  }else if(between(x_position, radial_150_points[0], radial_150_points[2])){
    alert("x_position: " + x_position + "radial: " + "150");
  }
}

/* FUNCTION to return whether it is to the left or right of the radial */

/* JavaScript (jQuery) commands */

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
/* When scrolling, call this function but do not toggle, explicitly hide or show as required */
let show_toc = (toc_element) => {
  let selected_group = $(toc_element).parent().children('ul.tree');
  $('.tree-toggle').parent().children('ul.tree').not(selected_group).hide(400);
  selected_group.show(400);
}

let update_toc = (toc_element, heading_text) => {
  //Remove active class from all toc elements
  //$('.nav-link').classList.removeClass("active");
  //Then add active to selected one
  //$(toc_element).classList.add("active");
  //document.querySelector(toc_element).classList.add("active");
  document.querySelector("#navbar-text").innerHTML = heading_text;  
}

/* UTILITY FUNCTIONS */
let between = (x, min, max) => {
  return x >= min && x < max; //Keep equal only on one side so there is no overlap at boundary
}