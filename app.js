// App Controller
const App = ((ItemCtrl, StorageCtrl, UICtrl) => {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    document.addEventListener('DOMContentLoaded', function() {
      let options = {
        defaultDate: new Date(),
        setDefaultDate: true,
        autoClose: true,
        onSelect: date => {
          // Clear edit state / set initial state
          UICtrl.clearEditState();

          // Remove existing list items from UI
          UICtrl.removeItems();

          // Get selected calendar date in proper format
          let dateStr = date
            .toDateString()
            .split(' ')
            .slice(1);
          dateStr = `${dateStr[0]} ${dateStr[1]}, ${dateStr[2]}`;

          // Fetch items from data structure
          // If not date object is available for the passed in date
          // a new date object will be created
          const items = ItemCtrl.getItems(dateStr);

          // Check if any items in date object
          if (items.length === 0) {
            UICtrl.hideList();
          } else {
            UICtrl.showList();
            // Populate list with items
            UICtrl.populateItemList(items);
          }

          // Get total calories
          const totalCalories = ItemCtrl.getTotalCalories(dateStr);

          // Add total calories to UI
          UICtrl.showTotalCalories(totalCalories);
        }
      };
      var elems = document.querySelector('.datepicker');
      var instances = M.Datepicker.init(elems, options);
    });

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    // Disable submit on enter key
    document.addEventListener('keypress', e => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemEditClick);

    // Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', backButtonClick);

    // Delete item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    // Clear items event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener('click', clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = e => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '' && input.date !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.date, input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories(input.date);

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      // Pass in new object with add property of date
      StorageCtrl.storeItem({ date: input.date, ...newItem });

      // Clear input fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Click edit item
  const itemEditClick = e => {
    if (e.target.classList.contains('edit-item')) {
      // Get form input from UI Controller
      const input = UICtrl.getItemInput();

      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(input.date, id);

      // Set current item
      ItemCtrl.setCurrentItem(input.date, itemToEdit);

      // Add item to form
      UICtrl.addItemToForm(input.date);
    }
    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = e => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '' && input.date !== '') {
      // Update item
      const updatedItem = ItemCtrl.updateItem(
        input.date,
        input.name,
        input.calories
      );

      // Update UI
      UICtrl.updateListItem(updatedItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories(input.date);

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Update local storage, pass in item object with date added
      StorageCtrl.updateItemStorage({ date: input.date, ...updatedItem });

      UICtrl.clearEditState();
    }

    e.preventDefault();
  };

  const itemDeleteSubmit = e => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Get current item
    const currentItem = ItemCtrl.getCurrentItem(input.date);

    // Delete from data structure
    ItemCtrl.deleteItem(input.date, currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories(input.date);

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete item from local storage
    StorageCtrl.deleteItemFromStorage(input.date, currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = e => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Delete all items from data structure
    ItemCtrl.clearAllItems(input.date);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories(input.date);

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Clear from local storage
    StorageCtrl.clearItemsFromStorage(input.date);

    // Hide UL
    UICtrl.hideList();

    e.preventDefault();
  };

  // Back button click
  const backButtonClick = e => {
    UICtrl.clearEditState();
    e.preventDefault();
  };

  // Public methods
  return {
    init: () => {
      // Clear edit state / set initial state
      UICtrl.clearEditState();

      // Get current date in proper format
      let dateStr = new Date()
        .toDateString()
        .split(' ')
        .slice(1);
      dateStr = `${dateStr[0]} ${dateStr[1]}, ${dateStr[2]}`;

      // Fetch items from data structure
      // If not date object is available for the passed in date
      // a new date object will be created
      const items = ItemCtrl.getItems(dateStr);

      // Check if any items in date object
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories(dateStr);

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
