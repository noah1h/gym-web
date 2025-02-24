function calculateMacros(weight, unit = "lbs", goal = "maintenance", gender = "male") {
  // Convert weight to pounds if given in kilograms
  if (unit === "kg") {
      weight = weight * 2.20462; // Convert kg to lbs
  }

  // Macronutrient and calorie multipliers per pound
  const multipliers = {
      maintenance: { protein: [0.7, 1.0], carbs: [1.5, 2.5], fat: [0.3, 0.5], male: [14, 16], female: [13, 15] },
      muscle_gain: { protein: [1.0, 1.2], carbs: [2.5, 3.5], fat: [0.4, 0.6], male: [16, 18], female: [14, 16] },
      fat_loss: { protein: [1.0, 1.2], carbs: [1.0, 1.5], fat: [0.3, 0.5], male: [12, 14], female: [11, 13] }
  };

  // Validate input
  if (!multipliers[goal]) {
      console.error("Invalid goal:", goal);
      return null;
  }
  if (!multipliers[goal][gender]) {
      console.error("Invalid gender:", gender);
      return null;
  }

  const macro = multipliers[goal];
  const calorieRange = macro[gender];

  // Calculate macros
  const protein = [Math.round(weight * macro.protein[0]), Math.round(weight * macro.protein[1])];
  const carbs = [Math.round(weight * macro.carbs[0]), Math.round(weight * macro.carbs[1])];
  const fat = [Math.round(weight * macro.fat[0]), Math.round(weight * macro.fat[1])];
  const calories = [Math.round(weight * calorieRange[0]), Math.round(weight * calorieRange[1])];

  return {
      weight: weight.toFixed(1) + " lbs",
      goal: goal.replace("_", " ").toUpperCase(),
      gender: gender.toUpperCase(),
      protein: `${protein[0]}g - ${protein[1]}g`,
      carbs: `${carbs[0]}g - ${carbs[1]}g`,
      fat: `${fat[0]}g - ${fat[1]}g`,
      calories: `${calories[0]} - ${calories[1]} kcal`
  };
}
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar JS
const sidebar = document.querySelector('.sidebar')
const toggleButtonSide = document.querySelector('.sidebar-toggle-side')
const toggleButtonNav = document.querySelector('.sidebar-toggle-nav')
const sideLinks = document.querySelectorAll('.side-links')

toggleButtonNav.addEventListener('click', function() {
  sidebar.classList.toggle('open');
  sidebar.classList.remove('close');
});
toggleButtonSide.addEventListener('click', function() {
  sidebar.classList.toggle('close');
  sidebar.classList.remove('open');
});
sideLinks.forEach(link => {
  link.addEventListener('click', function() {
    sidebar.classList.toggle('close');
    sidebar.classList.remove('open');
  });
  
})
})

$(document).ready(function() {
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", function() {
      // Remove "active" from all dropdown items
      document.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));

      // Add "active" only to the clicked item
      this.classList.add("active");

      // Find the closest .btn-group ancestor, then find the .btn-dropdown within it
      let btnGroup = this.closest('.btn-group');
      let dropDownMenu = btnGroup ? btnGroup.querySelector('.btn-dropdown') : null;

      if (dropDownMenu) {
        // Update the button's text with the clicked dropdown item's text
        dropDownMenu.textContent = this.textContent;

        // Detect which dropdown item is selected
        let selectedItemId = this.id; // Get the ID of the selected item
        let selectedItemText = this.textContent; // Get the text of the selected item

        // Log the selected item's details
        console.log("Selected Item ID:", selectedItemId);
        console.log("Selected Item Text:", selectedItemText);

        // You can also store the selected item in a variable or update a specific element
        let selectedItem = {
          id: selectedItemId,
          text: selectedItemText
        };

        // Example: Update a hidden input or display the selected item somewhere
        document.getElementById("selected-item-display").textContent = `Selected: ${selectedItemText}`;
      } else {
        console.error("Could not find .btn-dropdown element");
      }
    });
  });
});

$(document).ready(function() {
  var unit = "kg";
  var gender = "";
  var activity = "";
  var goal = "";

  $('.unit').click(function() {
      unit = $(this).data('value');
  });

  $('.sex').click(function() {
      gender = $(this).data('value');
  });

  $('.activity').click(function() {
      activity = $(this).data('value');
  });

  $('.goal').click(function() {
      goal = $(this).data('value');
  });

  $('#submit-btn').click(function() {
    var weight = parseFloat($('#weight').val()); // Convert input to number

    // Validate weight input
    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    // Validate required selections
    if (!gender) {
        alert("Please select a gender.");
        return;
    }

    if (!goal || !["maintenance", "muscle_gain", "fat_loss"].includes(goal)) {
        alert("Please select a valid goal.");
        return;
    }

    // Calculate macros
    var result = calculateMacros(weight, unit, goal, gender);

    // Display result in the respective elements
    if (result) {
        $('#cals').html(result.calories);
        $('#fats').html(result.fat);
        $('#protein').html(result.protein);
        $('#carbs').html(result.carbs);
    }
});

});
