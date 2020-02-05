// Item Controller
const ItemCtrl = (() => {
    // Item Constructor
    const Item = function(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
    };
  
    // Data Structure / State (private)
    const data = {
      // ADD ON: This data can also be fetched from the USDA API
      items: StorageCtrl.getItemsFromStorage(),
      currentItem: null,
      totalCalories: 0
    };
  
    // Public Methods
    return {
      getItems: () => {
        return data.items;
      },
      addItem: (name, calories) => {
        let ID;
        // Create ID
        if (data.items.length > 0) {
          ID = data.items[data.items.length - 1].id + 1;
        } else {
          ID = 0;
        }
        // Calories to number
        calories = parseInt(calories);
  
        // Create new item
        newItem = new Item(ID, name, calories);
  
        // Add to items array
        data.items.push(newItem);
  
        return newItem;
      },
      getItemById: id => {
        // Loop through items
        return data.items.find(item => item.id === id);
      },
      updateItem: (name, calories) => {
        // Calories to number
        calories = parseInt(calories);
  
        let found = null;
  
        data.items.forEach(item => {
          if (item.id === data.currentItem.id) {
            item.name = name;
            item.calories = calories;
            found = item;
          }
        });
  
        return found;
      },
      deleteItem: id => {
        data.items = data.items.filter(item => item.id !== id);
      },
      clearAllItems: () => {
        data.items = [];
      },
      setCurrentItem: item => {
        data.currentItem = item;
      },
      getCurrentItem: () => data.currentItem,
      getTotalCalories: () => {
        let total = 0;
  
        // Loop through items and add cals
        data.items.forEach(item => {
          total += item.calories;
        });
  
        // Set total cal in data structure
        data.totalCalories = total;
  
        // Return total cals
        return data.totalCalories;
      },
      logData: () => {
        return data;
      }
    };
  })();