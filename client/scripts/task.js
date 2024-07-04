const baseUrl = "http://localhost:3000/api/task";

const getCurrentTaskId = () => {
  const url = new URL(location.href);
  const taskId = url.searchParams.get("taskId");
  return taskId;
};

async function getCurrentTask() {
  try {
    const currentId = getCurrentTaskId();
    const res = await fetch(`${baseUrl}/${currentId}`);
    const data = await res.json();
    renderTask(data);
  } catch (error) {
    console.log(error);
  }
}

function extractDate(date) {
  const fullDate = new Date(date);
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth();
  const day = fullDate.getDate();
  return `${year}/${month < 10 ? "0" + month : month}/${
    day < 10 ? "0" + day : day
  }`;
}

function renderTask(task) {
  const taskHtml = `
    <div class="header">
        <a href="/client/index.html">Back</a>
        <p>${extractDate(task.createdAt)}</p>
      </div>
      <form class="js-single-task-form">
        <div class="group">
          <label for="title">Title: </label>
          <input type="text" id="title" value=${task.title} name="title"/>
        </div>
        <div class="group">
          <label for="completed">completed: </label>
          <input type="checkbox" id="completed" ${
            task.isCompleted && "checked"
          } name="completed" />
        </div>
        <button type="submit" class="btn">Save</button>
      </form>
    `;
  document.querySelector(".js-single-task").innerHTML = taskHtml;

  const formEl = document.querySelector(".js-single-task-form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const formEle = e.target.elements;
    const { title, completed } = formEle;
    const data = { title: title.value, isCompleted: completed.checked };
    updateTask(data);
  });
}

async function updateTask(data) {
  try {
    const currentId = getCurrentTaskId();
    const res = await fetch(`${baseUrl}/${currentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.success) {
      location.href = "/client/index.html";
    }
  } catch (error) {
    console.log(error);
  }
}
getCurrentTask();
