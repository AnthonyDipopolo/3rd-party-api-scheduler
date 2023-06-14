// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// var p = $('#currentDay');
// var now = dayjs();
// var formattedDateTime = now.format('MM-DD-YYYY');
// p.innerText = formattedDateTime;

// var h4 = $('#hour-4');
// var past = $('row time-block past');

// var hour = dayjs().hour();
// console.log(hour);

//console.log(formattedDateTime);
var button = $('.btn');
var div = $('.div-container');
var nine = $('#9');
var description = $('.description');
var textInput = description.val();
var timeBlock = $('.time-block');
// var text = timeBlock.find('.description').val();
// var timeBlockId = timeBlock.attr('id');
// var timeBlock = $(this);
//console.log(textInput);

$(function () {
  var hour = dayjs().hour();  //sets a variable eaqual to the time in military time
  // var hour = 11 //to check if it works 
  // console.log(hour);

  var p = $('#currentDay'); //this query selects the p id in the html
  var now = dayjs(); //this sets the now varible to the dayjs api
  var formattedDateTime = now.format('MM-DD-YYYY'); //this formats the date in the order wanted 
  p.text(formattedDateTime);//this changes the paragraphs inner text to the current date 

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // function getUserInput(){
  //   // var input = {}; //this is my reset for the input sections 
  //   var text = description.val();
  //   localStorage.setItem('userInput', text);
  

  //   console.log(text);
  // };

  // function getUserInput() {
  //   timeBlock.each(function() {
  //     var timeBlock = $(this);
  //     // var text = timeBlock.find('.description').val();
  //     var timeBlockId = timeBlock.attr('id');
  //     localStorage.getItem('userInput_' + timeBlockId);
  //     console.log(text);

  //     if (text) {
  //       timeBlock.find('.description').val(text);
  //     }

  //   });
  // }

  function getUserInput() {
    timeBlock.each(function() {
      var blockHour = parseInt($(this).attr('id'));
      var text = localStorage.getItem('userInput_' + blockHour);

      if (text) {
        $(this).find('.description').val(text);
      }
    });
  }

  function saveUserInput() {
    var blockHour = parseInt($(this).closest('.time-block').attr('id'));
    var text = $(this).siblings('.description').val();

    localStorage.setItem('userInput_' + blockHour, text);
  }
  
  

  // function showUserInput() {
  //   var check = getUserInput();

  //   console.log(check);

  // }

  // function userData(){
    

  //   // var calender = description.value;
  //   console.log(text);

  //   localStorage.setItem('userInput', (text));
  // }

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  timeBlock.each(function () { //the $.timeblock is querySelecting all or selecting all elements with the class of time block, each is a method that loops over every element with the class
    var blockHour = parseInt($(this).attr('id')); //the this element is used to select the individual current time block and parseInt or turn the id into an integer to be able to compare the id to the current hour

    if (blockHour < hour) { //here the new block integer is compared to the current hour and if it is less than the current hour then we give it a class of past 
      $(this).addClass('past');
    } else if (blockHour === hour) { //here we see if the hour and block hour are the same and if they are we give this block a class of present 
      $(this).addClass('present');
    } else {
      $(this).addClass('future'); //else everything else is considered the future and given the future class
    }
  });

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  button.on('click', saveUserInput);

  getUserInput();
});

// button.addEventListener('click', userData);

// showUserInput();