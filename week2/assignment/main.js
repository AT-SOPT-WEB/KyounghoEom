(function () {
const STORAGE_KEY = 'todos';
const $tbody = document.querySelector('.todo-app__tbody');
const $filterBtns = document.querySelectorAll('.todo-app__filter-btn');
const $filterArea = document.querySelector('.todo-app__filter');
const $priorityDropdown = document.getElementById('priority-dropdown');
const $priorityOptions = $priorityDropdown ? $priorityDropdown.querySelectorAll('.todo-app__priority-option') : [];
const $addBtn = document.querySelector('.todo-app__add-btn');
const $todoInput = document.querySelector('.todo-app__input');
const $prioritySelect = document.querySelector('.todo-app__priority-select');
const $deleteBtn = document.querySelector('.todo-app__delete-btn');
const $completeBtn = document.querySelector('.todo-app__complete-btn');
const $modal = document.querySelector('.todo-app__modal');
const $modalCloseBtn = document.querySelector('.todo-app__modal-close-btn');

  let todos = [];
  let filter = 'all';
  let priorityFilter = null;
  let dropdownOpen = false;

  function init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(window.initialTodos));
    }
    todos = getTodos();
    render();
    bindEvents();
  }

  function togglePriorityDropdown(open) {
    if (!$priorityDropdown) return;
    dropdownOpen = open !== undefined ? open : !dropdownOpen;
    if (dropdownOpen) {
      $priorityDropdown.classList.add('is-open');
    } else {
      $priorityDropdown.classList.remove('is-open');
    }
  }

  function getTodos() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function setTodos(newTodos) {
    todos = newTodos;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function filterByStatus(list, status) {
    if (status === 'completed') return list.filter(t => t.completed);
    if (status === 'active') return list.filter(t => !t.completed);
    return list;
  }
  function filterByPriority(list, prio) {
    if (!prio) return list;
    return list.filter(t => t.priority === prio);
  }
  function getFilteredTodos() {
    let filtered = filterByStatus(todos, filter);
    filtered = filterByPriority(filtered, priorityFilter);
    return filtered;
  }

  function render() {
    $filterBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    const list = getFilteredTodos();
    $tbody.innerHTML = '';
    const tpl = document.getElementById('todo-row');
    const frag = document.createDocumentFragment();
    list.forEach((todo) => {
      const clone = tpl.content.cloneNode(true);
      const $rowCheckbox = clone.querySelector('.row-checkbox');
      $rowCheckbox.dataset.id = todo.id;
      $rowCheckbox.checked = !!todo.checked;
      const $tdTitle = clone.querySelector('td:nth-child(2)');
      $tdTitle.textContent = todo.title;
      if (todo.completed) $tdTitle.classList.add('completed');
      const $priority = clone.querySelector('.priority-icon');
      $priority.innerHTML = [...Array(todo.priority)].map(() => '<i class="fas fa-star"></i>').join('');
      const $doneCheckbox = clone.querySelector('td:last-child input[type="checkbox"]');
      $doneCheckbox.checked = !!todo.completed;
      frag.appendChild(clone);
    });
    $tbody.appendChild(frag);
    syncSelectAll();
  }

  function syncSelectAll() {
    const $selectAll = document.querySelector('.todo-app__select-all');
    if (!$selectAll) return;
    const list = getFilteredTodos();
    if (list.length === 0) {
      $selectAll.checked = false;
      $selectAll.indeterminate = false;
      return;
    }
    const checkedCount = list.filter(t => t.checked).length;
    $selectAll.checked = checkedCount === list.length;
    $selectAll.indeterminate = checkedCount > 0 && checkedCount < list.length;
  }

  let dragTodoId = null;

  function handleFilterAreaClick(e) {
    const btn = e.target.closest('.todo-app__filter-btn');
    if (!btn) return;
    switch (btn.dataset.filter) {
      case 'priority':
        togglePriorityDropdown();
        break;
      case 'all':
      case 'completed':
      case 'active':
        filter = btn.dataset.filter;
        priorityFilter = null;
        render();
        togglePriorityDropdown(false);
        break;
    }
  }

  function handlePriorityOptionClick(e) {
    const opt = e.target.closest('.todo-app__priority-option');
    if (!opt) return;
    const prio = Number(opt.dataset.priority);
    priorityFilter = prio;
    filter = 'priority';
    render();
    togglePriorityDropdown(false);
  }

  document.addEventListener('mousedown', (e) => {
    if (
      $priorityDropdown &&
      !e.target.closest('#priority-dropdown') &&
      !e.target.closest('#priority-filter-btn')
    ) {
      togglePriorityDropdown(false);
    }
  });

  function onAdd() {
    const title = $todoInput.value.trim();
    const priority = Number($prioritySelect.value);
    if (!title || !$prioritySelect.value) {
      alert('할 일과 중요도를 모두 입력하세요.');
      return;
    }
    const maxId = todos.length ? Math.max(...todos.map((t) => t.id)) : 0;
    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      priority,
      checked: false,
    };
    setTodos([...todos, newTodo]);
    $todoInput.value = '';
    $prioritySelect.value = '';
    $todoInput.placeholder = '할 일을 입력하세요';
    render();
  }

  $addBtn.addEventListener('click', onAdd);
  $todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onAdd();
  });

  $filterArea.addEventListener('click', handleFilterAreaClick);
  if ($priorityDropdown) {
    $priorityDropdown.addEventListener('click', handlePriorityOptionClick);
  }

  $tbody.addEventListener('change', (e) => {
    if (e.target.classList.contains('row-checkbox')) {
      const id = Number(e.target.dataset.id);
      todos = todos.map((t) =>
        t.id === id ? { ...t, checked: e.target.checked } : t
      );
      setTodos(todos);
      syncSelectAll();
    }
  });

  $tbody.addEventListener('dragstart', (e) => {
    const tr = e.target.closest('tr[draggable="true"]');
    if (!tr) return;
    const $rowCheckbox = tr.querySelector('.row-checkbox');
    if ($rowCheckbox) {
      dragTodoId = Number($rowCheckbox.dataset.id);
    }
  });
  $tbody.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  $tbody.addEventListener('drop', (e) => {
    e.preventDefault();
    const tr = e.target.closest('tr[draggable="true"]');
    if (!tr || dragTodoId === null) return;
    const $rowCheckbox = tr.querySelector('.row-checkbox');
    if (!$rowCheckbox) return;
    const dropTodoId = Number($rowCheckbox.dataset.id);
    if (dragTodoId === dropTodoId) return;
    const fromIdx = todos.findIndex(t => t.id === dragTodoId);
    const toIdx = todos.findIndex(t => t.id === dropTodoId);
    if (fromIdx === -1 || toIdx === -1) return;
    const moved = todos.splice(fromIdx, 1)[0];
    todos.splice(toIdx, 0, moved);
    setTodos(todos);
    render();
    dragTodoId = null;
  });

  const $selectAll = document.querySelector('.todo-app__select-all');
  if ($selectAll) {
    $selectAll.addEventListener('change', (e) => {
      const checked = $selectAll.checked;
      const filteredIds = getFilteredTodos().map(t => t.id);
      todos = todos.map((t) =>
        filteredIds.includes(t.id) ? { ...t, checked } : t
      );
      setTodos(todos);
      render();
    });
  }

  function onDelete() {
    const filteredIds = getFilteredTodos().filter((t) => t.checked).map((t) => t.id);
    if (!filteredIds.length) return;
    filteredIds.forEach(id => {
      const tr = $tbody.querySelector(`.row-checkbox[data-id="${id}"]`)?.closest('tr');
      if (tr) tr.remove();
    });
    setTodos(todos.filter((t) => !filteredIds.includes(t.id)));
    syncSelectAll();
  }

  function onComplete() {
    const filtered = getFilteredTodos().filter((t) => t.checked);
    if (!filtered.length) return;
    if (filtered.some((t) => t.completed)) {
      $modal.classList.remove('hidden');
      return;
    }
    const filteredIds = filtered.map(t => t.id);
    setTodos(
      todos.map((t) =>
        filteredIds.includes(t.id) ? { ...t, completed: true, checked: false } : t
      )
    );
    render();
  }

  $deleteBtn.addEventListener('click', onDelete);
  $completeBtn.addEventListener('click', onComplete);
  $modalCloseBtn.addEventListener('click', () => {
    $modal.classList.add('hidden');
  });

  init();
})();
