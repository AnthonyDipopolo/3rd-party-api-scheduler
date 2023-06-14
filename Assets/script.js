// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//all global variables 
var button = $('.btn');
var div = $('.div-container');
var nine = $('#9');
var description = $('.description');
var textInput = description.val();
var timeBlock = $('.time-block');

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

  function getUserInput() { //this function gathers the users input in the selected time block 
    timeBlock.each(function() { //this tells the code to iterate or loop over each time block
      var blockHour = parseInt($(this).attr('id')); //this takes the id of the time block turn it into an integer and assigns it to the blockHour variable giving each time block a unique key
      var text = localStorage.getItem('userInput_' + blockHour); //this then gathers the value from the local storage that was set to the updated unique key and stores it to the valuable of text

      if (text) { //this checks to see if the text block has any value or is null
        $(this).find('.description').val(text);  //this uses the this element to select the description of the current time block that the loop is on 
      }//the val.text then sets the value of that desciption to the text that was retrieved from the local storage and saved to the text variable 
    });
  }

  function saveUserInput() { // this refers to the save button element that triggered the click event, closest selects the nearest ancestor element with the class time-block. In this case, it selects the parent element of the save button
    var blockHour = parseInt($(this).closest('.time-block').attr('id')); // .attr retrieves the value of the id attribute of the selected time block element, parseInt() converts the id value from a string to an integer and then stores it to the blockHour variable 
    var text = $(this).siblings('.description').val(); //.this selects the sibling elemets with the class of description and then stores that textarea value to the varible text

    localStorage.setItem('userInput_' + blockHour, text); //localStorage.setItem(key, value) stores the specified value in the localStorage object with the specified key
   // The key is composed by appending the blockHour value to userInput_, which creates a unique key for each time block
   // The users input text value is saved in localStorage with the created key
    
  }

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

  button.on('click', saveUserInput); //event listener to call save user input on button click 

  getUserInput(); //calls get user input function
});
