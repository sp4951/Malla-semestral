document.querySelectorAll(".ramo").forEach(ramo => {
  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) {
      alert("Este ramo está bloqueado. Debes aprobar sus requisitos primero.");
      return;
    }

    // Marcar como aprobado
    ramo.classList.add("aprobado");

    // Desbloquear dependencias si corresponde
    const desbloquea = ramo.dataset.desbloquea;
    if (desbloquea) {
      const ids = desbloquea.split(",");
      ids.forEach(id => {
        const target = document.getElementById(id.trim());
        if (target) {
          const requisitos = target.dataset.dependencias.split(",").map(r => r.trim()).filter(r => r !== "");
          // Verifica que TODOS los requisitos estén aprobados
          const cumplidos = requisitos.every(req => document.getElementById(req).classList.contains("aprobado"));
          if (cumplidos) {
            target.classList.remove("bloqueado");
          }
        }
      });
    }
  });
});
