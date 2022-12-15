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
        logData: function(){
            return data
        }
    }


})();

// UI Controller
const UICtrl = (function(){
    console.log('UICtrl')
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
    return {
        init: function(){
            console.log('Initializing App')
        }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init()