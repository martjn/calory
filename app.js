// Storage Controller
const StorageCtrl = (function(){
    // public methods
    return {
        storeItem: function(item){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
                //push new item
                items.push(item);
                // set ls
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                // push new item
                items.push(item);
                // reset ls
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        storeExistingItem: function(id, new_name, new_calories){
            let items;
            // get what is already in ls
            items = JSON.parse(localStorage.getItem('items'));
            // update item
            items[id]['name'] = new_name;
            items[id]['calories'] = new_calories;
            // reset ls
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItem: function(id){
            let items;
            // get what is already in ls
            items = JSON.parse(localStorage.getItem('items'));
            // delete item
            items.splice(id, 1);
            // refresh itemlist ID values
            items.forEach(function(item){
                if(item.id > id){
                    item.id -= 1;
                }
            })            
            // reset ls
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteAllItems: function(){
            items = JSON.parse(localStorage.getItem('items'));
            items = [];
            // reset ls
            localStorage.setItem('items', JSON.stringify(items));
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        }
    }
})();
// Item Controller

const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

    // Data Structure
    const data = {
        items: [
            //{id: 0, name: 'Kartul', calories: 300},
            //{id: 1, name: 'Riis', calories: 250},
            //{id: 2, name: 'Hapukapsas', calories: 400}
        ],
        total: 0,
        currentItem: null
    }

    return {
        getItems: function(){
            return data.items
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        addItem: function(name, calories){
            let ID;
            // Create ID
            // Kui on andmeid andmestruktuuris, määra järgmine ID väärtus andmete pikkus+1
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
                console.log(ID)
            } else {
                ID = 0
            }
            // calories to number
            calories = parseInt(calories);
            // create new item
            newItem = new Item(ID, name, calories);
            // add to items array
            data.items.push(newItem);
            // return new item
            return newItem
        },
        editItem: function(id, new_name, new_calories){
            data.items[id].name = new_name;
            data.items[id].calories = parseInt(new_calories);
        },
        deleteItem: function(id){
            // delete item from array
            data.items.splice(id, 1);
            // refresh itemlist ID values
            data.items.forEach(function(item){
                if(item.id > id){
                    item.id -= 1;
                }
            })
        },
        deleteAllItems: function(){
            data.items = [];
        },
        getTotalCalories: function() {
            let total = 0;
            // loop through items and add calories
            data.items.forEach(function(item){
                total = total + item.calories;
            });
            // set total calories in data structure
            data.total = total;
            console.log(data.total);
            // return total
            return data.total;   
        },
        logData: function(){
            return data
        }
    }
})();

// UI Controller
const UICtrl = (function(){
    // UI selectors
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        editBtn: '.edit-item',
        deleteBtn: '.delete-btn',
        clearBtn: '.clear-btn',
        backBtn: '.back-btn',
        totalCalories: '.total-calories'
    }
    return {
        populateItemList: function(items) {
            //create html content
            let html = '';
            // parse data and create list items html
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a></li>`;          
            });
            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
            // add event listeners to every food item
            items.forEach(function(item){
                const el = document.getElementById(`item-${item.id}`);
                el.getElementsByClassName('edit-item')[0].addEventListener('click', function(){
                    UICtrl.showUpdateButton();
                    UICtrl.setInputValue(item.id);
                    console.log('clicked ' + `item-${item.id}`);
                })
            })
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput: function(){
            return{
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            // create li element
            const li = document.createElement('li');
            // add class
            li.className = 'collection-item';
            // add ID
            li.id = `item-${item.id}`;
            // add HTML
            li.innerHTML = `<strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
            // add event
            const el = document.getElementById(`item-${item.id}`);
            el.getElementsByClassName('edit-item')[0].addEventListener('click', function(){
                UICtrl.showUpdateButton();
                UICtrl.setInputValue(item.id);
                console.log('clicked ' + `item-${item.id}`);
            })
        },
        showAddButton: function(){
            document.querySelector(UISelectors.addBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            console.log('show add btn');
        },
        showUpdateButton: function(){
            document.querySelector(UISelectors.addBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            console.log('Show update btn');
        },
        setInputValue: function(id){
            // use selected item values in input fields
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getItems()[id].name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getItems()[id].calories;
            currentItem = ItemCtrl.setCurrentItem(id);
        },
        goBack: function(){
            UICtrl.showAddButton();
            UICtrl.clearInput();
            ItemCtrl.setCurrentItem(null);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },


    }
})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function() {
        // get ui selectors
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        // add update event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);        
        // add delete event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);        
        // add delete all event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', itemDeleteAll);        
        // add back event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.goBack);        
        // add document reload event
        document.addEventListener('DOMContentLoaded', getItemsFromStorage);
    }
    const itemAddSubmit = function(event){
        // get form input from UI Controller
        const input = UICtrl.getItemInput();
        // check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            // add item to UI items list
            UICtrl.addListItem(newItem)
            // get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //store in localStorage
            StorageCtrl.storeItem(newItem);
            // clear fields
            UICtrl.clearInput();
        }
        event.preventDefault()
    }
    const itemUpdateSubmit = function(event){
        // get form input from UI Controller
        const input = UICtrl.getItemInput();
        // check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            // get currentItem ID from items data
            const currentItem = ItemCtrl.getCurrentItem();
            // update item in items list
            ItemCtrl.editItem(currentItem, input.name, input.calories);
            // get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //store in localStorage
            StorageCtrl.storeExistingItem(currentItem, input.name, input.calories);
            // clear fields
            UICtrl.clearInput();
            // set current item to null
            ItemCtrl.setCurrentItem(null);
            // show add btn
            UICtrl.showAddButton();
            // refresh item list
            const items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);
        }
        event.preventDefault()     
    }
    const itemDeleteSubmit = function(event){
        // get currentItem ID from items data
        const currentItem = ItemCtrl.getCurrentItem();
        // delete currently selected item
        ItemCtrl.deleteItem(currentItem);
        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        //delete item in localStorage
        StorageCtrl.deleteItem(currentItem);
        // clear fields
        UICtrl.clearInput();
        // set current item to null
        ItemCtrl.setCurrentItem(null);
        // show add btn
        UICtrl.showAddButton();
        // refresh item list
        const items = ItemCtrl.getItems();
        UICtrl.populateItemList(items);

        event.preventDefault()     
    }
    const itemDeleteAll = function(event){
        // delete all items from items list
        ItemCtrl.deleteAllItems();
        // delete all items from local storage
        StorageCtrl.deleteAllItems();
        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // clear fields
        UICtrl.clearInput();
        // set current item to null
        ItemCtrl.setCurrentItem(null);
        // show add btn
        UICtrl.showAddButton();
        // refresh item list
        UICtrl.populateItemList(items);
        console.log('CLEAR ALL');
        event.preventDefault()     
    }
    // get items from storage
    const getItemsFromStorage = function(){
        // get items from storage
        const items = StorageCtrl.getItemsFromStorage()
        // set storage items to ItemCtrl data items
        items.forEach(function(item){
            ItemCtrl.addItem(item['name'], item['calories'])
        })
        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories();       
        // add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // populate items list         
        UICtrl.populateItemList(items)
    }
    return {
        init: function(){
            console.log('Initializing App')
            // fetch items from data structure
            const items = ItemCtrl.getItems()
            // popilate items list
            UICtrl.populateItemList(items)
            // load event listeners
            loadEventListeners();
            // show add meal button by default
            UICtrl.showAddButton();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init()