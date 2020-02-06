// Storage Controller
const StorageCtrl = (() => {
  // Public methods
  return {
    storeItem: item => {
      let items;

      console.log(item);
      // Check if any items in ls
      if (localStorage.getItem('items') === null) {
        items = [];

        // Push new item
        items.push(item);

        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Reset ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: date => {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items')).filter(
          item => item.date === date
        );
      }
      return items;
    },
    updateItemStorage: updatedItem => {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (updatedItem.date === item.date && updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: (date, id) => {
      let items = JSON.parse(localStorage.getItem('items'));

      let newItems = [];

      items.forEach(item => {
        if (item.id !== id || item.date !== date) {
          newItems.push(item);
        }
      });

      localStorage.setItem('items', JSON.stringify(newItems));
    },
    clearItemsFromStorage: date => {
      let items = JSON.parse(localStorage.getItem('items'));

      let newItems = [];

      items.forEach(item => {
        if (item.date !== date) {
          newItems.push(item);
        }
      });

      localStorage.setItem('items', JSON.stringify(newItems));
    }
  };
})();
