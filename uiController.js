// UI Controller
const UICtrl = (() => {
    const UISelectors = {
      itemList: '#item-list',
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearBtn: '.clear-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
    };
  
    // Public Methods
    return {
      populateItemList: items => {
        let html = '';
  
        items.forEach(item => {
          html += `
               <li class="collection-item" id="item-${item.id}">
               <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
               <a href="#" class="secondary-content">
                 <i class="edit-item fa fa-pencil"></i>
               </a>
             </li>
               `;
        });
  
        // Insert list items
        document.querySelector(UISelectors.itemList).innerHTML = html;
      },
      getItemInput: () => {
        return {
          name: document.querySelector(UISelectors.itemNameInput).value,
          calories: document.querySelector(UISelectors.itemCaloriesInput).value
        };
      },
      addListItem: item => {
        // Show the list
        document.querySelector(UISelectors.itemList).style.display = 'block';
        // Create li element
        let li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Add id
        li.id = `item-${item.id}`;
        // Add HTML
        li.innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
          `;
        // Insert item
        document
          .querySelector(UISelectors.itemList)
          .insertAdjacentElement('beforeend', li);
      },
      updateListItem: item => {
        let listItems = document.querySelectorAll(UISelectors.listItems);
  
        // Turn Node list into array
        listItems = Array.from(listItems);
  
        listItems.forEach(listItem => {
          const itemID = listItem.getAttribute('id');
  
          if (itemID === `item-${item.id}`) {
            document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
            `;
          }
        });
      },
      deleteListItem: id => {
        const itemID = `#item-${id}`;
        const item = document.querySelector(itemID);
        item.remove();
      },
      clearInput: () => {
        document.querySelector(UISelectors.itemNameInput).value = '';
        document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      addItemToForm: () => {
        document.querySelector(
          UISelectors.itemNameInput
        ).value = ItemCtrl.getCurrentItem().name;
        document.querySelector(
          UISelectors.itemCaloriesInput
        ).value = ItemCtrl.getCurrentItem().calories;
        UICtrl.showEditState();
      },
      removeItems: () => {
        let listItems = document.querySelectorAll(UISelectors.listItems);
  
        // Turn Node list into array
        listItems = Array.from(listItems);
  
        listItems.forEach(item => item.remove());
      },
      hideList: () => {
        document.querySelector(UISelectors.itemList).style.display = 'none';
      },
      showTotalCalories: totalCalories => {
        document.querySelector(
          UISelectors.totalCalories
        ).textContent = totalCalories;
      },
      clearEditState: () => {
        UICtrl.clearInput();
        document.querySelector(UISelectors.updateBtn).style.display = 'none';
        document.querySelector(UISelectors.backBtn).style.display = 'none';
        document.querySelector(UISelectors.deleteBtn).style.display = 'none';
        document.querySelector(UISelectors.addBtn).style.display = 'inline';
      },
      showEditState: () => {
        document.querySelector(UISelectors.updateBtn).style.display = 'inline';
        document.querySelector(UISelectors.backBtn).style.display = 'inline';
        document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
        document.querySelector(UISelectors.addBtn).style.display = 'none';
      },
      getSelectors: () => {
        return UISelectors;
      }
    };
  })();