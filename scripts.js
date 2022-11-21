const goalContainerEl = document.querySelector(".container");
const btnPlusSign = document.querySelector(".btn-open");
const goalSection = document.querySelector(".goal-section");

async function renderGoal(data) {
  const html = `
  <article class="goal-section">
    <h2 class="goal-heading">Goal ${data.code}</h2>
    <section class="goal-information">
    <p class="goal-text">${data.title}</p>
    <button class="btn-open"><span><i class="fa-solid fa-plus"></i></span></button>
    <button><span><i class="fa-solid fa-minus"></i></span></button>
    </section
  </article>
  `;

  goalContainerEl.insertAdjacentHTML("beforeend", html);

  const responseTarget = await fetch(
    `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${data.code}/Target/List?includechildren=true`
  );
  const dataTarget = await responseTarget.json();
  console.log(dataTarget);

  const ul = document.createElement("ul");
  for (let i = 0; i < dataTarget[0].targets.length; i++) {
    const li = document.createElement("li");
    li.textContent = `CODE ${dataTarget[0].targets[i].code} TARGETS: ${dataTarget[0].targets[i].title}`;
    ul.append(li);
  }

  return ul;
}

async function displayGoal() {
  try {
    const response = await fetch(
      `https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false`
    );
    const data = await response.json();
    // console.log(data);
    for (const eachData of data) {
      const ul = await renderGoal(eachData);
      let goals = document.querySelectorAll(".goal-information");
      for (let goal of goals) {
        goal.append(ul);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
displayGoal();
