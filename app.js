// // Storage Controller
// const StorageCtrl = (() => {
//   // Public methods
//   return {
//     storeItem: item => {
//       let items;

//       // Check if any items in ls
//       if (localStorage.getItem('items') === null) {
//         items = [];

//         // Push new item
//         items.push(item);

//         // Set ls
//         localStorage.setItem('items', JSON.stringify(items));
//       } else {
//         // Get what is already in ls
//         items = JSON.parse(localStorage.getItem('items'));

//         // Push new item
//         items.push(item);

//         // Reset ls
//         localStorage.setItem('items', JSON.stringify(items));
//       }
//     },
//     getItemsFromStorage: () => {
//       let items;
//       if (localStorage.getItem('items') === null) {
//         items = [];
//       } else {
//         items = JSON.parse(localStorage.getItem('items'));
//       }
//       return items;
//     },
//     updateItemStorage: updatedItem => {
//       let items = JSON.parse(localStorage.getItem('items'));

//       items.forEach((item, index) => {
//         if (updatedItem.id === item.id) {
//           items.splice(index, 1, updatedItem);
//         }
//       });
//       localStorage.setItem('items', JSON.stringify(items));
//     },
//     deleteItemFromStorage: id => {
//       let items = JSON.parse(localStorage.getItem('items'));

//       let newItems = items.filter(item => item.id !== id);

//       localStorage.setItem('items', JSON.stringify(newItems));
//     },
//     clearItemsFromStorage: () => {
//       localStorage.removeItem('items');
//     }
//   };
// })();

// // Item Controller
// const ItemCtrl = (() => {
//   // Item Constructor
//   const Item = function(id, name, calories) {
//     this.id = id;
//     this.name = name;
//     this.calories = calories;
//   };

//   // Data Structure / State (private)
//   const data = {
//     // ADD ON: This data can also be fetched from the USDA API
//     items: StorageCtrl.getItemsFromStorage(),
//     currentItem: null,
//     totalCalories: 0
//   };

//   // Public Methods
//   return {
//     getItems: () => {
//       return data.items;
//     },
//     addItem: (name, calories) => {
//       let ID;
//       // Create ID
//       if (data.items.length > 0) {
//         ID = data.items[data.items.length - 1].id + 1;
//       } else {
//         ID = 0;
//       }
//       // Calories to number
//       calories = parseInt(calories);

//       // Create new item
//       newItem = new Item(ID, name, calories);

//       // Add to items array
//       data.items.push(newItem);

//       return newItem;
//     },
//     getItemById: id => {
//       // Loop through items
//       return data.items.find(item => item.id === id);
//     },
//     updateItem: (name, calories) => {
//       // Calories to number
//       calories = parseInt(calories);

//       let found = null;

//       data.items.forEach(item => {
//         if (item.id === data.currentItem.id) {
//           item.name = name;
//           item.calories = calories;
//           found = item;
//         }
//       });

//       return found;
//     },
//     deleteItem: id => {
//       data.items = data.items.filter(item => item.id !== id);
//     },
//     clearAllItems: () => {
//       data.items = [];
//     },
//     setCurrentItem: item => {
//       data.currentItem = item;
//     },
//     getCurrentItem: () => data.currentItem,
//     getTotalCalories: () => {
//       let total = 0;

//       // Loop through items and add cals
//       data.items.forEach(item => {
//         total += item.calories;
//       });

//       // Set total cal in data structure
//       data.totalCalories = total;

//       // Return total cals
//       return data.totalCalories;
//     },
//     logData: () => {
//       return data;
//     }
//   };
// })();

// // UI Controller
// const UICtrl = (() => {
//   const UISelectors = {
//     itemList: '#item-list',
//     listItems: '#item-list li',
//     addBtn: '.add-btn',
//     updateBtn: '.update-btn',
//     deleteBtn: '.delete-btn',
//     backBtn: '.back-btn',
//     clearBtn: '.clear-btn',
//     itemNameInput: '#item-name',
//     itemCaloriesInput: '#item-calories',
//     totalCalories: '.total-calories'
//   };

//   // Public Methods
//   return {
//     populateItemList: items => {
//       let html = '';

//       items.forEach(item => {
//         html += `
//              <li class="collection-item" id="item-${item.id}">
//              <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
//              <a href="#" class="secondary-content">
//                <i class="edit-item fa fa-pencil"></i>
//              </a>
//            </li>
//              `;
//       });

//       // Insert list items
//       document.querySelector(UISelectors.itemList).innerHTML = html;
//     },
//     getItemInput: () => {
//       return {
//         name: document.querySelector(UISelectors.itemNameInput).value,
//         calories: document.querySelector(UISelectors.itemCaloriesInput).value
//       };
//     },
//     addListItem: item => {
//       // Show the list
//       document.querySelector(UISelectors.itemList).style.display = 'block';
//       // Create li element
//       let li = document.createElement('li');
//       // Add class
//       li.className = 'collection-item';
//       // Add id
//       li.id = `item-${item.id}`;
//       // Add HTML
//       li.innerHTML = `
//         <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
//         <a href="#" class="secondary-content">
//           <i class="edit-item fa fa-pencil"></i>
//         </a>
//         `;
//       // Insert item
//       document
//         .querySelector(UISelectors.itemList)
//         .insertAdjacentElement('beforeend', li);
//     },
//     updateListItem: item => {
//       let listItems = document.querySelectorAll(UISelectors.listItems);

//       // Turn Node list into array
//       listItems = Array.from(listItems);

//       listItems.forEach(listItem => {
//         const itemID = listItem.getAttribute('id');

//         if (itemID === `item-${item.id}`) {
//           document.querySelector(`#${itemID}`).innerHTML = `
//           <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
//           <a href="#" class="secondary-content">
//             <i class="edit-item fa fa-pencil"></i>
//           </a>
//           `;
//         }
//       });
//     },
//     deleteListItem: id => {
//       const itemID = `#item-${id}`;
//       const item = document.querySelector(itemID);
//       item.remove();
//     },
//     clearInput: () => {
//       document.querySelector(UISelectors.itemNameInput).value = '';
//       document.querySelector(UISelectors.itemCaloriesInput).value = '';
//     },
//     addItemToForm: () => {
//       document.querySelector(
//         UISelectors.itemNameInput
//       ).value = ItemCtrl.getCurrentItem().name;
//       document.querySelector(
//         UISelectors.itemCaloriesInput
//       ).value = ItemCtrl.getCurrentItem().calories;
//       UICtrl.showEditState();
//     },
//     removeItems: () => {
//       let listItems = document.querySelectorAll(UISelectors.listItems);

//       // Turn Node list into array
//       listItems = Array.from(listItems);

//       listItems.forEach(item => item.remove());
//     },
//     hideList: () => {
//       document.querySelector(UISelectors.itemList).style.display = 'none';
//     },
//     showTotalCalories: totalCalories => {
//       document.querySelector(
//         UISelectors.totalCalories
//       ).textContent = totalCalories;
//     },
//     clearEditState: () => {
//       UICtrl.clearInput();
//       document.querySelector(UISelectors.updateBtn).style.display = 'none';
//       document.querySelector(UISelectors.backBtn).style.display = 'none';
//       document.querySelector(UISelectors.deleteBtn).style.display = 'none';
//       document.querySelector(UISelectors.addBtn).style.display = 'inline';
//     },
//     showEditState: () => {
//       document.querySelector(UISelectors.updateBtn).style.display = 'inline';
//       document.querySelector(UISelectors.backBtn).style.display = 'inline';
//       document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
//       document.querySelector(UISelectors.addBtn).style.display = 'none';
//     },
//     getSelectors: () => {
//       return UISelectors;
//     }
//   };
// })();

// App Controller
const App = ((ItemCtrl, StorageCtrl, UICtrl) => {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

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
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear input fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Click edit item
  const itemEditClick = e => {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = e => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Update item
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

      // Update UI
      UICtrl.updateListItem(updatedItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Update local storage
      StorageCtrl.updateItemStorage(updatedItem);

      UICtrl.clearEditState();
    }

    e.preventDefault();
  };

  const itemDeleteSubmit = e => {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete item from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = e => {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Clear from local storage
    StorageCtrl.clearItemsFromStorage();

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

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
