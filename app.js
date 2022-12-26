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
        total: 0
    }

    return {
        getItems: function(){
            return data.items
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
        totalCalories: '.total-calories'
    }
    return {
        showAddButton: function(){
            document.querySelector(UISelectors.addBtn).style.display = "inline";
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            console.log('Showing add button' + document.activeElement);
        },
        showUpdateButton: function(){
            document.querySelector(UISelectors.addBtn).style.display = "none";
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            console.log('Showing update button' + document.activeElement);
        },
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
                console.log('clicked ' + `item-${item.id}`);
            })
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