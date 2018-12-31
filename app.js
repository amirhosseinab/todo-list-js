+function () {
    let todos = [];
    const addButton = document.getElementById("addButton");
    const todoText = document.getElementById("todoText");
    const todoList = document.getElementById("todoList");

    addButton.onclick = addItem;
    todoText.onkeypress = function (e) {
        if (e.key === 'Enter') {
            addItem()
        }
    };


    function addItem() {
        todos.push({text: todoText.value, done: false, editMode: false});
        todoText.value = "";
        refreshTodos();
    }

    function createTodoItem(todo, index) {
        let item = document.createElement("li");
        let text = document.createElement("span");
        let btnContainer = createButtons(index);

        if (todo.done) {
            item.setAttribute("class", "item-done");
        }

        text.innerText = todo.text;

        item.appendChild(text);
        item.appendChild(btnContainer);
        return item;
    }

    function createEditableTodoItem(todo, index) {
        let item = document.createElement("li");
        let textBox = document.createElement("input");
        let btnContainer = createEditableModeButtons(index, textBox);

        textBox.setAttribute("type", "text");
        textBox.value = todo.text;

        item.appendChild(textBox);
        item.appendChild(btnContainer);
        return item
    }

    function createEditableModeButtons(itemIndex, editableTextBox) {
        let btnContainer = document.createElement("div");
        btnContainer.appendChild(createButton("&times;", cancelEditMode));
        btnContainer.appendChild(createButton("&check;", save));

        return btnContainer;

        function cancelEditMode() {
            todos[itemIndex].editMode = false;
            refreshTodos();
        }

        function save() {
            todos[itemIndex].editMode = false;
            todos[itemIndex].text = editableTextBox.value;
            refreshTodos();
        }
    }

    function createButtons(itemIndex) {
        let btnContainer = document.createElement("div");
        btnContainer.appendChild(createButton("&#9998;", setEditMode));
        btnContainer.appendChild(createButton("&checkmark;", setDone));
        btnContainer.appendChild(createButton("&#128465;", removeTodo));

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
            todos[itemIndex].editMode = true;
            refreshTodos();
        }

    }

    function createButton(text, func) {
        let btn = document.createElement("a");
        btn.innerHTML = text;
        btn.setAttribute("href", "#");
        btn.onclick = func;
        return btn;
    }

    function refreshTodos() {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild)
        }

        todos.forEach((todo, index) => {
            if (todo.editMode) {
                todoList.appendChild(createEditableTodoItem(todo, index))
            } else {
                todoList.appendChild(createTodoItem(todo, index))
            }
        })
    }
}();

