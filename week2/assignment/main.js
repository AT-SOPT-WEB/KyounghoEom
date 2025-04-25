(function () {
const STORAGE_KEY = 'todos';
const $tbody = document.querySelector('.todo-app__tbody');
const $filterBtns = document.querySelectorAll('.todo-app__filter-btn');
const $priorityFilterBtn = document.getElementById('priority-filter-btn');
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

  // 초기화
  function init() {
    // localStorage에 없으면 초기 데이터 저장
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(window.initialTodos));
    }
    todos = getTodos();
    render();
    bindEvents();
  }

  // 드롭다운 열기/닫기
  function togglePriorityDropdown(open) {
    if (!$priorityDropdown) return;
    dropdownOpen = open !== undefined ? open : !dropdownOpen;
    if (dropdownOpen) {
      $priorityDropdown.classList.add('is-open');
    } else {
      $priorityDropdown.classList.remove('is-open');
    }
  }

  // localStorage에서 todos 가져오기
  function getTodos() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  // localStorage에 todos 저장
  function setTodos(newTodos) {
    todos = newTodos;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  // 상태별 필터
  function filterByStatus(list, status) {
    if (status === 'completed') return list.filter(t => t.completed);
    if (status === 'active') return list.filter(t => !t.completed);
    return list;
  }
  // 중요도 필터
  function filterByPriority(list, prio) {
    if (!prio) return list;
    return list.filter(t => t.priority === prio);
  }
  // 필터링된 todo 반환
  function getFilteredTodos() {
    let filtered = filterByStatus(todos, filter);
    filtered = filterByPriority(filtered, priorityFilter);
    return filtered;
  }

  // 렌더링
  function render() {
    // 필터 버튼 active 처리
    $filterBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // 테이블 렌더링
    const list = getFilteredTodos();
    $tbody.innerHTML = '';
    const tpl = document.getElementById('todo-row');
    const frag = document.createDocumentFragment();
    list.forEach((todo) => {
      const clone = tpl.content.cloneNode(true);
      // 체크박스
      const $rowCheckbox = clone.querySelector('.row-checkbox');
      $rowCheckbox.dataset.id = todo.id;
      $rowCheckbox.checked = !!todo.checked;
      // 제목
      const $tdTitle = clone.querySelector('td:nth-child(2)');
      $tdTitle.textContent = todo.title;
      if (todo.completed) $tdTitle.classList.add('completed');
      // 중요도
      const $priority = clone.querySelector('.priority-icon');
      $priority.innerHTML = [...Array(todo.priority)].map(() => '<i class="fas fa-star"></i>').join('');
      // 완료여부(두 번째 체크박스)
      const $doneCheckbox = clone.querySelector('td:last-child input[type="checkbox"]');
      $doneCheckbox.checked = !!todo.completed;
      frag.appendChild(clone);
    });
    $tbody.appendChild(frag);
    syncSelectAll();
  }

  // 전체선택 체크박스 상태 동기화
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

  // 드래그&드롭 순서 변경
  let dragTodoId = null;

  // 이벤트 바인딩
  function bindEvents() {
    // 필터 버튼
    $filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // 중요도 버튼은 드롭다운 토글만
        if (btn.dataset.filter === 'priority') {
          togglePriorityDropdown();
        } else {
          filter = btn.dataset.filter;
          priorityFilter = null;
          render();
          togglePriorityDropdown(false);
        }
      });
    });

    // 드롭다운 옵션 클릭
    if ($priorityOptions) {
      $priorityOptions.forEach((opt) => {
        opt.addEventListener('click', (e) => {
          const prio = Number(opt.dataset.priority);
          priorityFilter = prio;
          filter = 'priority';
          render();
          togglePriorityDropdown(false);
        });
      });
    }

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('mousedown', (e) => {
      if (
        $priorityDropdown &&
        !e.target.closest('#priority-dropdown') &&
        !e.target.closest('#priority-filter-btn')
      ) {
        togglePriorityDropdown(false);
      }
    });

    // 추가 버튼
    $addBtn.addEventListener('click', onAdd);

    // 엔터로 추가
    $todoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') onAdd();
    });

    // 테이블 체크박스 (이벤트 위임)
    $tbody.addEventListener('change', (e) => {
      if (e.target.classList.contains('row-checkbox')) {
        const id = Number(e.target.dataset.id);
        todos = todos.map((t) =>
          t.id === id ? { ...t, checked: e.target.checked } : t
        );
        setTodos(todos);
        // 개별 체크박스 변경 시 전체선택 체크박스 상태 동기화
        syncSelectAll();
      }
    });

    // 드래그&드롭 (이벤트 위임 방식)
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
      // todos 배열에서 dragTodoId를 dropTodoId 위치로 이동
      const fromIdx = todos.findIndex(t => t.id === dragTodoId);
      const toIdx = todos.findIndex(t => t.id === dropTodoId);
      if (fromIdx === -1 || toIdx === -1) return;
      const moved = todos.splice(fromIdx, 1)[0];
      todos.splice(toIdx, 0, moved);
      setTodos(todos);
      render();
      dragTodoId = null;
    });

    // 전체선택 체크박스
    const $selectAll = document.querySelector('.todo-app__select-all');
    if ($selectAll) {
      $selectAll.addEventListener('change', (e) => {
        const checked = $selectAll.checked;
        todos = todos.map((t) => ({ ...t, checked }));
        setTodos(todos);
        render();
      });
    }

    // 삭제 버튼
    $deleteBtn.addEventListener('click', onDelete);

    // 완료 버튼
    $completeBtn.addEventListener('click', onComplete);

    // 모달 닫기
    $modalCloseBtn.addEventListener('click', () => {
      $modal.classList.add('hidden');
    });
  }

  // 할 일 추가
  function onAdd() {
    const title = $todoInput.value.trim();
    const priority = Number($prioritySelect.value);
    if (!title || !priority) {
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

  // 삭제
  function onDelete() {
    const checkedIds = todos.filter((t) => t.checked).map((t) => t.id);
    if (!checkedIds.length) return;
    setTodos(todos.filter((t) => !checkedIds.includes(t.id)));
    render();
  }

  // 완료
  function onComplete() {
    const checked = todos.filter((t) => t.checked);
    if (!checked.length) return;
    // 이미 완료된 todo가 하나라도 있으면 모달 띄우기
    if (checked.some((t) => t.completed)) {
      $modal.classList.remove('hidden');
      return;
    }
    setTodos(
      todos.map((t) =>
        t.checked ? { ...t, completed: true, checked: false } : t
      )
    );
    render();
  }

  // XSS 방지용: 사용자 입력을 HTML에 넣을 때 태그로 해석되지 않도록 이스케이프 처리
  // 예: <script> → <script> (실제 실행 안 됨, 화면에 문자 그대로 노출)
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return (
        {
          '&': '&',
          '<': '<',
          '>': '>',
          '"': '"',
          "'": '&#39;',
        }[m] || m
      );
    });
  }

  // 최초 실행
  init();
})();
