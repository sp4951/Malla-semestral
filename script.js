function mostrarInfo(materia) {
  const info = document.getElementById("info");
  let texto = "";

  switch(materia) {
    case "Matemáticas":
      texto = "Materia de cálculo, álgebra y geometría.";
      break;
    case "Historia":
      texto = "Materia de historia universal y nacional.";
      break;
    case "Biología":
      texto = "Materia de genética, ecología y anatomía.";
      break;
  }

  info.innerHTML = `<h2>${materia}</h2><p>${texto}</p>`;
  info.style.display = "block";
}
