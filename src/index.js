import "./shepherdSample";

let todoList = [
  {
    id: 1,
    title: "本を買いに行く",
    isDone: false
  },
  {
    id: 2,
    title: "飲み会の予約をする",
    isDone: false
  },
  {
    id: 3,
    title: "Aさんにメールを返信する",
    isDone: true
  }
];

window.customElements.define(
  "todo-item",
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
            <input class="position-static mr-2 js-check guid-check" type="checkbox">
            ${this.textContent}
            <button type="button" class="close js-delete guid-delete" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
    }
    connectedCallback() {
      // todoが完了しているかの状態を設定
      this.done = !this.hasAttribute("done");
      this.querySelector(".js-check").checked = this.hasAttribute("done");

      // todoの完了の状態を切り替え
      this.querySelector(".js-check").addEventListener("change", () => {
        this.done = this.classList.contains("list-group-item-secondary");
        const pos = todoList
          .map(todo => todo.id)
          .indexOf(Number(this.dataset.id));
        todoList[pos].isDone = !todoList[pos].isDone;
      });

      // todo削除
      this.querySelector(".js-delete").addEventListener("click", () => {
        if (!confirm("削除しますか?")) return;
        this.remove();
        const pos = todoList
          .map(todo => todo.id)
          .indexOf(Number(this.dataset.id));
        todoList.splice(pos, 1);
      });
    }
    set done(isDone) {
      if (isDone) this.classList.remove("list-group-item-secondary");
      else this.classList.add("list-group-item-secondary");
    }
  }
);

// todo追加
document.querySelector(".js-add-todo").addEventListener("submit", e => {
  e.preventDefault();
  const input = e.target.querySelector("input");
  if (!input.value.trim()) return;

  todoList.push({
    id: todoList.slice(-1)[0].id + 1,
    title: input.value,
    isDone: false
  });
  document.querySelector(".js-todos").insertAdjacentHTML(
    "beforeend",
    `<todo-item 
      class="list-group-item"
      data-id=${todoList.slice(-1)[0].id}>
        ${input.value}
     </todo-item>`
  );
  input.value = "";
});

// タブ切り替え
document.querySelectorAll(".js-nav-item a").forEach(elm => {
  elm.addEventListener("click", e => {
    switch (e.target.textContent) {
      case "All":
        render(todoList);
        break;
      case "Active":
        render(todoList.filter(todo => !todo.isDone));
        break;
      case "Complete":
        render(todoList.filter(todo => todo.isDone));
        break;
    }
  });
});

render(todoList);

// リスト描画
function render(list) {
  document.querySelector(".js-todos").innerHTML = "";
  list.forEach(({ id, title, isDone }) => {
    document.querySelector(".js-todos").insertAdjacentHTML(
      "beforeend",
      `<todo-item
          class="list-group-item" 
          data-id=${id}
          ${isDone ? "done" : ""}>
            ${title}
       </todo-item>`
    );
  });
}
