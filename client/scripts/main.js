const formEl = document.querySelector(".js-task-form");
let Tasks = [];
const baseUrl = "http://localhost:3000/api/task";
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formEl = e.target.elements;
  const { title } = formEl;
  if (title.value) {
    submitViaApi({ title: title.value });
    title.value = "";
  }
});

async function submitViaApi(title) {
  const addBtn = document.querySelector(".js-add-btn");
  try {
    addBtn.textContent = "Loding...";
    addBtn.disabled = true;
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(title),
    });
    const data = await res.json();
    renderTasks([...Tasks, data]);
  } catch (error) {
    console.log(error);
  } finally {
    addBtn.textContent = "Add";
    addBtn.disabled = false;
  }
}

function renderTasks(tasks) {
  let taskHTML = "";
  tasks.forEach((task) => {
    taskHTML += `
    <div class="task">
          <p class="task-title ${task.isCompleted && " strike"}">${
      task.title
    }</p>
          <div class="controllers ">
            <a href=${`/client/task.html?taskId=${task._id}`} class="edit-btn btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="blue"
                class="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                />
              </svg>
            </a>
            <button class="delete-btn btn js-delete-btn" data-task-id=${
              task._id
            }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="darkred"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                />
              </svg>
            </button>
          </div>
        </div>
    `;
  });

  document.querySelector(".js-tasks").innerHTML = taskHTML;

  document.querySelectorAll(".js-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { taskId } = btn.dataset;
      deleteTask(taskId);
    });
  });
}

async function fetchTasksAndRender() {
  try {
    const res = await fetch(baseUrl);
    const tasks = await res.json();
    renderTasks(tasks);
    Tasks = tasks;
  } catch (error) {
    console.log(error);
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      Tasks = Tasks.filter((task) => task._id !== id);
      renderTasks(Tasks);
    }
  } catch (error) {
    console.log(error);
  }
}
fetchTasksAndRender();
