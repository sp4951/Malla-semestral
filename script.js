// Dependencias: (curso -> prerequisitos)
const prerequisites = {
  "Gestión administrativa": [
    "Teorías y funciones de la administración",
    "Desarrollo de habilidades de la comunicación administrativa"
  ],
  "Contabilidad financiera": ["Fundamentos de contabilidad"],
  "Sistemas de evaluación de capital humano": ["Administración del capital humano"],
  "Contabilidad de costos": ["Contabilidad financiera"],
  "Modelos organizacionales": ["Administración de organizaciones"],
  "Inferencia estadística": ["Estadística descriptiva y probabilidad"],
  "Administración de evaluación de inversiones": ["Introducción a las finanzas y proyectos de inversión"],
  "Administración de operaciones": ["Administración de la producción"]
};

function normalize(name) {
  return name.trim();
}

const approved = new Set(JSON.parse(localStorage.getItem("approved") || "[]"));
const courses = document.querySelectorAll(".course");

function render() {
  courses.forEach(el => {
    const name = normalize(el.dataset.id);
    const done = approved.has(name);
    const reqs = prerequisites[name] || [];
    const unlocked = reqs.every(r => approved.has(normalize(r)));

    el.classList.toggle("approved", done);
    el.classList.toggle("locked", !done && reqs.length > 0 && !unlocked);
  });
}

courses.forEach(el => {
  el.addEventListener("click", () => {
    if (el.classList.contains("locked")) return;
    const name = normalize(el.dataset.id);
    if (approved.has(name)) {
      approved.delete(name);
    } else {
      approved.add(name);
    }
    localStorage.setItem("approved", JSON.stringify([...approved]));
    render();
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  approved.clear();
  localStorage.removeItem("approved");
  render();
});

render();
document.querySelectorAll(".course").forEach(course => {
  course.addEventListener("click", () => {
    if (course.classList.contains("locked") || course.classList.contains("completed")) return;

    course.classList.add("completed");

    const unlocks = course.dataset.unlocks;
    if (unlocks) {
      const next = document.querySelector(`[data-id='${unlocks}']`);
      if (next) next.classList.remove("locked");
    }
  });
});

