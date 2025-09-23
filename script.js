// Добавляет элемент из поля ввода в список задач
function add() {
    const listContainer = document.getElementById("app");
    const input = document.getElementById("itemInput");
    if (!input) return; // если по какой-то причине поле не найдено

    const value = input.value.trim();
    if (!value) return; // ничего не добавляем, если пусто

    // Найдём существующий <ul> или создадим новый с id "todo-list"
    let ul = document.getElementById("todo-list");
    if (!ul) {
        ul = document.createElement("ul");
        ul.id = "todo-list";
        listContainer.appendChild(ul);
    }

    createListItem(value);

    // Сохраняем текущее состояние списка в localStorage
    saveListFromDOM();

    input.value = ""; // очистим поле ввода
    input.focus();


}

// Простейшая функция очистки списка и поля ввода
const STORAGE_KEY = 'todoItems';

function clearList() {
    const ul = document.getElementById("todo-list");
    if (ul) {
        ul.innerHTML = "";
        ul.remove();
    }

    // Удаляем данные из storage
    localStorage.removeItem(STORAGE_KEY);

    const input = document.getElementById("itemInput");
    if (input) {
        input.value = "";
        input.focus();
    }
}

// Создаёт <li>, навешивает обработчик удаления по клику и добавляет в <ul>
function createListItem(text) {
    if (!text) return;
    let ul = document.getElementById("todo-list");
    const listContainer = document.getElementById("app");
    if (!ul) {
        ul = document.createElement("ul");
        ul.id = "todo-list";
        listContainer.appendChild(ul);
    }

    const li = document.createElement("li");
    li.className = "item";
    li.textContent = text;

    // Удалять элемент при клике (можно поменять на кнопку крестика)
    li.addEventListener('click', function () {
        li.remove();
        saveListFromDOM();
    });

    ul.appendChild(li);
}

// Сохраняет текущие элементы списка в localStorage
function saveListFromDOM() {
    const ul = document.getElementById('todo-list');
    const items = [];
    if (ul) {
        ul.querySelectorAll('li').forEach(li => items.push(li.textContent));
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Загружает список из localStorage при старте
function loadList() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    let items;
    try {
        items = JSON.parse(raw);
    } catch (e) {
        console.warn('Ошибка чтения списка из storage', e);
        return;
    }
    if (!Array.isArray(items) || items.length === 0) return;
    items.forEach(i => createListItem(i));
}

// Загружаем список, когда DOM готов
document.addEventListener('DOMContentLoaded', loadList);



