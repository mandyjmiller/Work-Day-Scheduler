// Display current day at the top of the calendar
$("#currentDay").text(dayjs().format("dddd, MMMM D YYYY"));

// Present timeblocks for standard business hours when the user scrolls down
function createTimeBlocks() {
  var container = $(".container");
  var currentHour = dayjs().hour();

  //set loop to start day at 9am till 17:00
  for (var hour = 9; hour <= 17; hour++) {
    //define new time block  (row per hour)
    var timeBlock = $("<div>").addClass("row time-block");
    //define add hour column
    var hourCol = $("<div>").addClass("col-1 hour").text(formatHour(hour));
    //define add text description column
    var textAreaCol = $("<textarea>").addClass(getTimeBlockClass(hour));
    //define add save column
    var saveBtnCol = $("<button>")
      .addClass("col-2 saveBtn")
      .html('<i class="far fa-save"></i> Save'); //font awesome save icon. Enlarges with hover over;

    // Load previously saved events (if applicable) from local storage
    var savedEvent = localStorage.getItem(formatHour(hour));
    if (savedEvent) {
      textAreaCol.val(savedEvent);
    }

    // Format time in 12-hour clock with AM/PM
    function formatHour(hour) {
      return dayjs().hour(hour).format("h A"); // https://day.js.org/docs/en/display/format "h" is for 12 hour clock, "A" displays AM or PM in caps ("a" would display in lower case - for future reference!)
    }

    //Add hour,  description text and save columns to the time block
    timeBlock.append(hourCol, textAreaCol, saveBtnCol);
    container.append(timeBlock);
  }
}

// Display hour blocks -- add formatting depending on past / present / future
function getTimeBlockClass(hour) {
  var currentHour = dayjs().hour();
  if (hour < currentHour) {
    return "col-8 past"; // col-8 this column is assigned 8 units width compared to 1 unit width for time and 2 unit width for save
  } else if (hour == currentHour) {
    return "col-8 present";
  } else {
    return "col-8 future";
  }
}

// Add Event listener for save button
$(".container").on("click", ".saveBtn", function () {
  var timeBlock = $(this).siblings(".col-8");
  var hour = timeBlock.siblings(".hour").text();
  var eventText = timeBlock.val();

  // Save event to local storage
  localStorage.setItem(hour, eventText);
});

// Runs the function to create time blocks on load page
createTimeBlocks();
