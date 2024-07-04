const formEl = document.querySelector(".js-task-form");
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
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    addBtn.textContent = "Add";
    addBtn.disabled = false;
  }
}
