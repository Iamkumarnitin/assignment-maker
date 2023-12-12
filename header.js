const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
}

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.classList.toggle("active");
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

// toggle hamburger menu
hamburgerBtn.addEventListener("click", toggleHamburger);

















// Check for valid email syntax
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function closeForm() {
    document.contactform.name.value = '';
    document.contactform.email.value = '';
    document.contactform.message.value = '';
  
    $('.email').removeClass('typing');
    $('.name').removeClass('typing');
    $('.message').removeClass('typing');
  
    $('.cd-popup').removeClass('is-visible');
    $('.notification').addClass('is-visible');
    $('#notification-text').html("Thanks for contacting us!");
  }
  
  $(document).ready(function($) {
  
    /* ------------------------- */
    /* Contact Form Interactions */
    /* ------------------------- */
    $('#contact').on('click', function(event) {
      event.preventDefault();
  
      $('#contactblurb').html('Questions, suggestions, and general comments are all welcome!');
      $('.contact').addClass('is-visible');
  
      if ($('#name').val().length != 0) {
        $('.name').addClass('typing');
      }
      if ($('#email').val().length != 0) {
        $('.email').addClass('typing');
      }
      if ($('#message').val().length != 0) {
        $('.message').addClass('typing');
      }
    });
  
    //close popup when clicking x or off popup
    $('.cd-popup').on('click', function(event) {
      if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
        event.preventDefault();
        $(this).removeClass('is-visible');
      }
    });
  
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event) {
      if (event.which == '27') {
        $('.cd-popup').removeClass('is-visible');
      }
    });
  
    /* ------------------- */
    /* Contact Form Labels */
    /* ------------------- */
    $('#name').keyup(function() {
      $('.name').addClass('typing');
      if ($(this).val().length == 0) {
        $('.name').removeClass('typing');
      }
    });
    $('#email').keyup(function() {
      $('.email').addClass('typing');
      if ($(this).val().length == 0) {
        $('.email').removeClass('typing');
      }
    });
    $('#message').keyup(function() {
      $('.message').addClass('typing');
      if ($(this).val().length == 0) {
        $('.message').removeClass('typing');
      }
    });
  
    /* ----------------- */
    /* Handle submission */
    /* ----------------- */
    $('#contactform').submit(function() {
      var name = $('#name').val();
      var email = $('#email').val();
      var message = $('#message').val();
      var human = $('#human:checked').val();
  
      if (human) {
        if (validateEmail(email)) {
          if (name) {
            if (message) {
  
  // Handle submitting data somewhere
  // For a tutorial on submitting the form to a Google Spreadsheet, see:
  // https://notnaturaltutorials.wordpress.com/2016/03/20/submit-form-to-spreadsheet/
  
  /*
              var googleFormsURL = "https://docs.google.com/forms/d/1dHaFG67d7wwatDtiVNOL98R-FwW1rwdDwdFqqKJggBM3nFB4/formResponse";
              // replace these example entry numbers
              var spreadsheetFields = {
                "entry.212312005": name,
                "entry.1226278897": email,
                "entry.1835345325": message
              }
              $.ajax({
                url: googleFormsURL,
                data: spreadsheetFields,
                type: "POST",
                dataType: "xml",
                statusCode: {
                  0: function() {
  
                  },
                  200: function() {
  
                  }
                }
              });
  */
              
              closeForm();
  
            } else {
              $('#notification-text').html("<strong>Please let us know what you're thinking!</strong>");
              $('.notification').addClass('is-visible');
            }
          } else {
            $('#notification-text').html('<strong>Please provide a name.</strong>');
            $('.notification').addClass('is-visible');
          }
        } else {
          $('#notification-text').html('<strong>Please use a valid email address.</strong>');
          $('.notification').addClass('is-visible');
        }
      } else {
        $('#notification-text').html('<h3><strong><em>Warning: Please prove you are a human and not a robot.</em></strong></h3>');
        $('.notification').addClass('is-visible');
      }
  
      return false;
    });
  });


















  const daysContainer = document.getElementById("daysContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const monthYear = document.getElementById("monthYear");
const dateInput = document.getElementById("dateInput");
const calendar = document.getElementById("calendar");

let currentDate = new Date();
let selectedDate = null;

function handleDayClick(day) {
  selectedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    day
  );
  dateInput.value = selectedDate.toLocaleDateString("en-US");
  calendar.style.display = "none";
  renderCalendar();
}

function createDayElement(day) {
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const dayElement = document.createElement("div");
  dayElement.classList.add("day");

  if (date.toDateString() === new Date().toDateString()) {
    dayElement.classList.add("current");
  }
  if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
    dayElement.classList.add("selected");
  }

  dayElement.textContent = day;
  dayElement.addEventListener("click", () => {
    handleDayClick(day);
  });
  daysContainer.appendChild(dayElement);
}

function renderCalendar() {
  daysContainer.innerHTML = "";
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  monthYear.textContent = `${currentDate.toLocaleString("default", {
    month: "long"
  })} ${currentDate.getFullYear()}`;

  for (let day = 1; day <= lastDay.getDate(); day++) {
    createDayElement(day);
  }
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

dateInput.addEventListener("click", () => {
  calendar.style.display = "block";
  positionCalendar();
});

document.addEventListener("click", (event) => {
  if (!dateInput.contains(event.target) && !calendar.contains(event.target)) {
    calendar.style.display = "none";
  }
});

function positionCalendar() {
  const inputRect = dateInput.getBoundingClientRect();
  calendar.style.top = inputRect.bottom + "px";
  calendar.style.left = inputRect.left + "px";
}

window.addEventListener("resize", positionCalendar);

renderCalendar();








$(function() {
  $( ".calendar" ).datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1
	});
	
	$(document).on('click', '.date-picker .input', function(e){
		var $me = $(this),
				$parent = $me.parents('.date-picker');
		$parent.toggleClass('open');
	});
	
	
	$(".calendar").on("change",function(){
		var $me = $(this),
				$selected = $me.val(),
				$parent = $me.parents('.date-picker');
		$parent.find('.result').children('span').html($selected);
	});
});

