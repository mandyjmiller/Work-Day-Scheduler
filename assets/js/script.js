// Display current day at the top of the calendar
$("#currentDay").text(dayjs().format("dddd, MMMM D"));

// Present timeblocks for standard business hours when the user scrolls down
function createTimeBlocks() {
  var container = $(".container");
  var currentHour = dayjs().hour();

  //set loop to start day at 9am till 17:00
  for (var hour = 9; hour <= 17; hour++) {
  //define new time block  (row per hour)
    var timeBlock = $("<div>").addClass("row time-block");
     //define add hour column
    var hourCol = $("<div>").addClass("col-1 hour").text(hour);
    //define add text description column
    var textAreaCol = $("<textarea>").addClass(getTimeBlockClass(hour));
    //define add save column
    var saveBtnCol = $("<button>");

    //Listeners to add hour,  description text and save columns to the time block
    timeBlock.append(hourCol, textAreaCol, saveBtnCol);
    container.append(timeBlock);
  }
}

// Display hour blocks -- add formatting depending on past / present / future
function getTimeBlockClass(hour) {
  var currentHour = dayjs().hour()
  if (hour < currentHour) 
  return "col-10 past"; // col-10 this column is assigned 10 units width compared to 1 unit width for time and 1 unit width for save
  else if (hour == currentHour)
  return "col-10 present";
  else
  return "col-10 future";
}

// Runs the function to create time blocks on load page
createTimeBlocks();
