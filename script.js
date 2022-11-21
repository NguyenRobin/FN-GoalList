"use strict";

const goalContainerEl = document.querySelector(".container");

async function renderGoal(data) {
  const html = `
  <article class="goal-section">
    <h2 class="goal-heading">Goal ${data.code}</h2>
    <section class="goal-information">
    <p class="goal-text">${data.title}</p>
    <button class="btn-open"><span><i class="fa-solid fa-plus"></i></span></button>
    <button class="btn-close"><span><i class="fa-solid fa-minus"></i></span></button>
    </section>
  </article>
  `;

  goalContainerEl.insertAdjacentHTML("beforeend", html);

  const responseTarget = await fetch(
    `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${data.code}/Target/List?includechildren=true`
  );
  const dataTarget = await responseTarget.json();
  // console.log(dataTarget);
  const ul = document.createElement("ul");
  for (let i = 0; i < dataTarget[0].targets.length; i++) {
    const li = document.createElement("li");
    ul.classList.add("target-text");
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
        goal.after(ul);
      }
    }

    // CLICK WON'T CHANGE CORRECT .target-text
    for (let i = 0; i < document.querySelectorAll(".btn-open").length; i++) {
      const clickedBtn = document.querySelectorAll(".btn-open")[i];
      clickedBtn.addEventListener("click", function (event) {
        if (event.currentTarget.closest(".goal-section")) {
          document.querySelector(".target-text").style.display = "block";
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}
displayGoal();

// async function displayGoal() {
//   try {
//     const response = await fetch(
//       `https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=fa`
//     );
//     const data = await response.json();
//     for (const eachData of data) {
//       renderGoal(eachData);
//       console.log("VARJE MÅL FRÅN 1 - 17 ->", eachData.code);
//       const responseTarget = await fetch(
//         `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${eachData.code}/Target/List?includechildren=true`
//       );
//       const targetData = await responseTarget.json();
//       console.log("TARGETS ->", targetData[0].targets);

//       const ul = document.createElement("ul");
//       for (let i = 0; i < targetData[0].targets.length; i++) {
//         const li = document.createElement("li");
//         li.textContent = `TARGET ${targetData[0].targets[i].title}`;
//         ul.append(li);
//         console.log(ul);
//         // console.log(targetData[0].targets[i]);
//         // console.log(targetData[0].targets[i].title);
//       }
//     }
//     for (let i = 0; i < document.querySelectorAll(".btn-open").length; i++) {
//       const clickedBtn = document.querySelectorAll(".btn-open")[i];
//       clickedBtn.addEventListener("click", function (event) {
//         console.log();
//         const articleHtml = document.createElement("article");
//         articleHtml.textContent = `test`;
//         articleHtml.classList.add("target-section");
//         event.currentTarget.closest(".goal-information").after(" testar klick");
//         // document.querySelector(".target-section").style.display = "block";
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// displayGoal();
