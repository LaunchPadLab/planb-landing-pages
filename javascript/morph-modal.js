var modalTrigger = $(".morph-btn");
var modalWindow = $(".morph-modal");
var closeTrigger = $(".close-modal");



//get the trigger button position function
//allow button to be passed in to find it's placement
function getElementPosition(getSelectedModalTrigger){
  var top = getSelectedModalTrigger.offset().top - $(window).scrollTop();
  var left = getSelectedModalTrigger.offset().left;
  //return an array
  return [top, left];
}



function evalScale(element, position){
  var scaleY = scaleValue(position[0], element.innerHeight(), $(window).height());
  var scaleX = scaleValue(position[1], element.innerWidth(), $(window).width());

  return [scaleY, scaleX];
}



function scaleValue(firstCoord, elSize, windowSize){
  var secondCoord = windowSize - firstCoord - elSize; //bottom
  var maxCoord = Math.max(firstCoord, secondCoord);
  var scaleValue = (maxCoord*2 + elSize)/elSize; //final size of the span element
  return Math.ceil(scaleValue*10)/10;
}

function launchModal(e){
  e.preventDefault
  //alert("hello");
  var selectedModalTrigger = $(this); //this button we just clicked on
  //get href
  var modalId = selectedModalTrigger.attr("href"); //the buttons href value
  console.log(modalId);
  //show modal
  //aka - get the .morph-modal element w/ "this" id
  var selectedModalWindow = modalWindow.filter(modalId);
  var selectedMorphBackground = selectedModalWindow.children(".morph-background");
  selectedModalWindow.addClass("open-modal");

  //run trigger button position function (pass in the element)
  var triggerPosition = getElementPosition(selectedModalTrigger);

  var scaleValues = evalScale(selectedMorphBackground, triggerPosition);

  //use array index to locate position
  selectedMorphBackground.css({
    "top": triggerPosition[0]+"px",
    "left": triggerPosition[1]+"px",
    "transform":"scaleX("+scaleValues[1]+") scaleY("+scaleValues[0]+")",
    //"border":"1px solid red"
  }).one("transitionend", function(){
    //one works like on, but listens to the callback only once
    selectedModalWindow.addClass("modal-visible");
  });

  // function showContent(){
  //   selectedModalWindow.addClass("modal-visible");
  // }
}
modalTrigger.on("click", launchModal);




modalWindow.on("click", ".close-modal", closeModal);
function closeModal(event){
  //get modal window && background
  var selectedModalWindow = $(this).parent(".morph-modal");
  var selectedBackground = selectedModalWindow.children(".morph-background");

  //hide the modal content
  modalWindow.removeClass("modal-visible");
  //reduce
  selectedBackground.css({
    "transform":"scaleX(1) scaleY(1)"
  }).one("transitionend", function(){
    selectedModalWindow.removeClass("open-modal");
  });
}