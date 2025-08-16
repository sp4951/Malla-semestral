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
