// Item Controller
const ItemCtrl = (() => {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Date Object Constructor
  const DateObj = function(date) {
    this.date = date;
    this.items = StorageCtrl.getItemsFromStorage(date);
    this.currentItem = null;
    this.totalCalories = 0;
  };

  //   {
  //     date: dateStr,
  //     // items: StorageCtrl.getItemsFromStorage(dateStr),
  //     items: [],
  //     currentItem: null,
  //     totalCalories: 0
  //   }

  // Get current date in proper format
  let dateStr = new Date()
    .toDateString()
    .split(' ')
    .slice(1);
  dateStr = `${dateStr[0]} ${dateStr[1]}, ${dateStr[2]}`;
  // Data Structure / State (private)
  const data = {
    // ADD ON: This data can also be fetched from the USDA API
    dates: []
  };

  // Public Methods
  return {
    getObjectByDate: date => {
      // Search for the date in the dates array
      let dateObj = data.dates.find(item => item.date === date);
      // If the object for that date has not been created
      // create a new one
      if (dateObj === undefined) {
        let index = ItemCtrl.createDateObj(date);
        return data.dates[index];
      } else {
        return dateObj;
      }
    },
    createDateObj: date => {
      // Creates new Date Object in the dates array and
      // also returns the index of the new object
      return data.dates.push(new DateObj(date)) - 1;
    },
    getItems: date => {
      let items;
      const dateObj = ItemCtrl.getObjectByDate(date);
      if (dateObj !== undefined) {
        items = dateObj.items;
      } else {
        items = null;
      }
      return items;
    },
    addItem: (date, name, calories) => {
      let ID;
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);
      // Create ID
      if (dateObj.items.length > 0) {
        ID = dateObj.items[dateObj.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      dateObj.items.push(newItem);

      return newItem;
    },
    getItemById: (date, id) => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);
      // Loop through items
      return dateObj.items.find(item => item.id === id);
    },
    updateItem: (date, name, calories) => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);

      // Calories to number
      calories = parseInt(calories);

      let found = null;

      dateObj.items.forEach(item => {
        if (item.id === dateObj.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: (date, id) => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);

      dateObj.items = dateObj.items.filter(item => item.id !== id);
    },
    clearAllItems: date => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);

      dateObj.items = [];
    },
    setCurrentItem: (date, item) => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);

      dateObj.currentItem = item;
    },
    getCurrentItem: date => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);

      return dateObj.currentItem;
    },
    getTotalCalories: date => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);

      let total = 0;

      // Loop through items and add cals
      dateObj.items.forEach(item => {
        total += item.calories;
      });

      // Set total cal in dateObj structure
      dateObj.totalCalories = total;

      // Return total cals
      return dateObj.totalCalories;
    },
    logData: date => {
      // Find object for specified date
      let dateObj = ItemCtrl.getObjectByDate(date);

      return dateObj;
    }
  };
})();
