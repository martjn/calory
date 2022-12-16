// Storage Controller

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
            {id: 0, name: 'Kartul', calories: 300},
            {id: 1, name: 'Riis', calories: 250},
            {id: 2, name: 'Hapukapsas', calories: 400}
        ],
        total: 0
    }

    return {
        getItems: function(){
            return data.items
        },
        logData: function(){
            return data
        }
    }


})();

// UI Controller
const UICtrl = (function(){
    return {
        populateItemList: function(items) {
            //create html content
            let html = '';

            // parse data and create list items html
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class=secondary-content">
                <i class="edit item fa fa-pencil"></i>
                </a></li>`;
            });

            document.querySelector("#item-list").innerHTML = html;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
    return {
        init: function(){
            console.log('Initializing App')
            // fetch items from data structure
            const items = ItemCtrl.getItems()
            // popilate items list
            UICtrl.populateItemList(items)
        }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init()