document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('locked') || ramo.classList.contains('aprobado')) return;

    ramo.classList.add('aprobado');

    // Buscar dependientes
    document.querySelectorAll('.ramo.locked').forEach(dep => {
      const prereq = dep.getAttribute('data-prereq');
      if (prereq) {
        const requisitos = prereq.split(',');
        const completos = requisitos.every(id => 
          document.getElementById(id).classList.contains('aprobado')
        );
        if (completos) dep.classList.remove('locked');
      }
    });
  });
});
