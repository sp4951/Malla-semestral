const mallaData = [
  // Primer Año
  {nombre: "Teorías y funciones de la administración", requisitos: [], desbloquea: ["Gestión administrativa"]},
  {nombre: "Desarrollo de habilidades de la comunicación administrativa", requisitos: [], desbloquea: ["Gestión administrativa"]},
  {nombre: "Derecho civil y mercantil", requisitos: [], desbloquea: []},
  {nombre: "Fundamentos de contabilidad", requisitos: [], desbloquea: ["Contabilidad financiera"]},
  {nombre: "Matemáticas aplicadas a la administración", requisitos: [], desbloquea: []},
  {nombre: "Tecnologías de la información y la comunicación", requisitos: [], desbloquea: []},
  {nombre: "Gestión administrativa", requisitos: ["Teorías y funciones de la administración","Desarrollo de habilidades de la comunicación administrativa"], desbloquea: []},
  {nombre: "Administración del capital humano", requisitos: [], desbloquea: ["Sistemas de evaluación de capital humano"]},
  {nombre: "Derecho constitucional y administrativo", requisitos: [], desbloquea: []},
  {nombre: "Contabilidad financiera", requisitos: ["Fundamentos de contabilidad"], desbloquea: ["Contabilidad de costos"]},
  {nombre: "Matemáticas financieras", requisitos: [], desbloquea: []},
  {nombre: "Lectura y análisis de textos administrativos", requisitos: [], desbloquea: []},
  
  // Segundo año
  {nombre: "Administración de organizaciones", requisitos: [], desbloquea: ["Modelos organizacionales"]},
  {nombre: "Administración de prestaciones", requisitos: [], desbloquea: []},
  {nombre: "Derecho laboral", requisitos: [], desbloquea: []},
  {nombre: "Contabilidad de costos", requisitos: ["Contabilidad financiera"], desbloquea: []},
  {nombre: "Ética y valores", requisitos: [], desbloquea: []},
  {nombre: "Estadística descriptiva y probabilidad", requisitos: [], desbloquea: ["Inferencia estadística"]},
  {nombre: "Modelos organizacionales", requisitos: ["Administración de organizaciones"], desbloquea: []},
  {nombre: "Sistemas de evaluación de capital humano", requisitos: ["Administración del capital humano"], desbloquea: []},
  {nombre: "Introducción a las finanzas y proyectos de inversión", requisitos: [], desbloquea: ["Administración de evaluación de inversiones"]},
  {nombre: "Metodología de la investigación", requisitos: [], desbloquea: []},
  {nombre: "Inferencia estadística", requisitos: ["Estadística descriptiva y probabilidad"], desbloquea: []},
  {nombre: "Sistema de información automatizados en las organizaciones", requisitos: [], desbloquea: []},

  // Tercer año
  {nombre: "Teoría de la calidad", requisitos: [], desbloquea: []},
  {nombre: "Administración estratégica", requisitos: [], desbloquea: []},
  {nombre: "Derecho penal y fiscal", requisitos: [], desbloquea: []},
  {nombre: "Administración de evaluación de inversiones", requisitos: ["Introducción a las finanzas y proyectos de inversión"], desbloquea: []},
  {nombre: "Microeconomía", requisitos: [], desbloquea: []},
  {nombre: "Investigación de operaciones", requisitos: [], desbloquea: []},
  {nombre: "Sistemas de aseguramiento de la calidad", requisitos: [], desbloquea: []},
  {nombre: "Administración de la producción", requisitos: ["Administración de evaluación de inversiones"], desbloquea: ["Administración de operaciones"]},
  {nombre: "Auditoría administrativa", requisitos: [], desbloquea: []},
  {nombre: "Fundamentos de mercadotecnia", requisitos: [], desbloquea: []},
  {nombre: "Macroeconomía", requisitos: [], desbloquea: []},
  {nombre: "Desarrollo sustentable", requisitos: [], desbloquea: []},

  // Cuarto año
  {nombre: "Desarrollo de emprendedores", requisitos: [], desbloquea: []},
  {nombre: "Administración de operaciones", requisitos: ["Administración de la producción"], desbloquea: []},
  {nombre: "Logística", requisitos: [], desbloquea: []},
  {nombre: "Investigación de mercados", requisitos: [], desbloquea: []},
  {nombre: "Análisis socioeconómico de México", requisitos: [], desbloquea: []},
  {nombre: "Optativa", requisitos: [], desbloquea: []},
];

// Generar la malla
const mallaDiv = document.getElementById("malla");

mallaData.forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");
    div.textContent = ramo.nombre;
    div.dataset.aprobado = "false";
    div.dataset.nombre = ramo.nombre;
    div.dataset.requisitos = JSON.stringify(ramo.requisitos);
    div.dataset.desbloquea = JSON.stringify(ramo.desbloquea);

    // Solo se desbloquea si no tiene requisitos
    if(ramo.requisitos.length === 0) div.classList.add("desbloqueado");

    div.addEventListener("click", () => {
        if(!div.classList.contains("desbloqueado")) return;

        // Aprobar ramo
        div.classList.add("aprobado");
        div.dataset.aprobado = "true";

        // Desbloquear ramos que dependen de este
        mallaData.forEach(r => {
            const rDiv = [...mallaDiv.children].find(d => d.dataset.nombre === r.nombre);
            if(r.requisitos.includes(ramo.nombre)) {
                // Comprobar si todos los requisitos están aprobados
                const todosAprobados = r.requisitos.every(req => {
                    const reqDiv = [...mallaDiv.children].find(d => d.dataset.nombre === req);
                    return reqDiv.dataset.aprobado === "true";
                });
                if(todosAprobados) rDiv.classList.add("desbloqueado");
            }
        });
    });

    mallaDiv.appendChild(div);
});
