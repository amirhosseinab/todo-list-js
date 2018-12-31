+function () {
    let todos = [];
    const addButton = document.getElementById("addButton");
    const todoText = document.getElementById("todoText");
    const todoList = document.getElementById("todoList");

    addButton.onclick = addItem;
    todoText.onkeypress = function (e) {
        if (e.key === 'Enter') {
            addItem();
        }
    };


    function addItem() {
        todos.push({text: todoText.value, done: false, editMode: false});
        todoText.value = "";
        refreshTodos();
    }

    function createButtons(itemIndex) {
        let btnContainer = document.createElement("div");
        btnContainer.appendChild(createButton("&#9998;", setEditMode));
        btnContainer.appendChild(createButton("&checkmark;", setDone));
        btnContainer.appendChild(createButton("&times;", removeTodo));

        return btnContainer;

        function removeTodo(e) {
            e.preventDefault();
            todos.splice(itemIndex, 1);
            refreshTodos();
        }
        function setDone() {
            todos[itemIndex].done = !todos[itemIndex].done;
            refreshTodos();
        }

        function setEditMode() {
            todos[itemIndex].editMode = !todos[itemIndex].editMode;
            refreshTodos();
        }

        function createButton(text, func) {
            let btn = document.createElement("a");
            btn.innerHTML = text;
            btn.setAttribute("href", "#");
            btn.onclick = func;
            return btn;
        }
    }

    function refreshTodos() {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild)
        }

        todos.forEach((todo, index) => {
            todoList.appendChild(createTodoItem(todo, index))
        });
    }

    function createTodoItem(todo, index) {
        let item = document.createElement("li");
        let text = document.createElement("input");
        let btnContainer = createButtons(index);
        
        text.onchange = makeTextEdit;
        text.setAttribute("class", "task-text");
        if (todo.done) {
            item.setAttribute("class", "item-done");
        }
        
        if(todo.editMode) {
            text.setAttribute('contenteditable', 'true');
        }
        
        text.value = todo.text;
        item.appendChild(text);
        item.appendChild(btnContainer);
        return item;

        function makeTextEdit() {
            todo.text = text.value;
        }

    }

}();

