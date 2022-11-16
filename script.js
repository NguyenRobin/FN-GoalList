"use strict";

const goalContainerEl = document.querySelector(".container");
const btnPlusSign = document.querySelector(".btn-open");
const goalSection = document.querySelector(".goal-section");

function renderGoal(data) {
  const html = `
  <article class="goal-section">
    <h2 class="goal-heading">Goal ${data.code}</h2>
    <section class="goal-information">
    <p class="goal-text">${data.title}</p>
    <button class="btn-open"><span><i class="fa-solid fa-plus"></i></span></button>
    <button><span><i class="fa-solid fa-minus"></i></span></button>
    </section
  </article>

  <article class="target-section"> VARFÖR FUNGERAR DET INTE </article>
  `;

  goalContainerEl.insertAdjacentHTML("beforeend", html);
}

async function displayGoal() {
  try {
    const response = await fetch(
      `https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=true`
    );
    const data = await response.json();
    // console.log(data);
    for (const eachData of data) {
      renderGoal(eachData);
    }
  } catch (error) {
    console.log(error.message);
  }
}
displayGoal();

goalContainerEl.addEventListener("click", function (event) {
  console.log(event);
  if (
    event.target.classList.contains("fa-plus") ||
    event.target.classList.contains("btn-open")
  ) {
    document.querySelector(".target-section").style.display = "block";
    console.log(event.target);
    // const article = document.createElement("article");
    // article.setAttribute("class", "goal-information ");
    // article.innerText = "VARFÖR ÄNDRAS BARA FÖRSTA ELELEMENTET";
    // document.querySelector(".goal-section").append(article);
  }
});
