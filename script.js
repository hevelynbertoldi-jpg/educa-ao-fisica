/* ---------- Menu mobile ---------- */
const menuBtn = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
 
menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});
 
/* ---------- Barra com discos ---------- */
const PESO_BARRA = 20;
const MAX_DISCOS_POR_LADO = 8;
 
const DISCOS = [
  { kg: 25,  cor: "var(--vermelho)", h: 180, w: 22 },
  { kg: 20,  cor: "var(--azul)",     h: 170, w: 20 },
  { kg: 15,  cor: "var(--amarelo)",  h: 150, w: 18 },
  { kg: 10,  cor: "var(--verde)",    h: 130, w: 16 },
  { kg: 5,   cor: "var(--branco)",   h: 100, w: 12 },
  { kg: 2.5, cor: "var(--preto)",    h: 76,  w: 10 },
];
 
let usados = []; // discos de um lado, na ordem em que foram adicionados
 
const ladoEsq = document.getElementById("ladoEsq");
const ladoDir = document.getElementById("ladoDir");
const totalEl = document.getElementById("total");
const avisoEl = document.getElementById("avisoBarra");
const AVISO_PADRAO = "Barra olímpica de 20 kg. Os discos entram nos dois lados.";
 
function formatar(n) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}
 
function criarDisco(d) {
  const el = document.createElement("span");
  el.className = "disco";
  el.title = d.kg + " kg";
  el.style.cssText = `--c:${d.cor};--h:${d.h}px;--w:${d.w}px`;
  return el;
}
 
function desenharBarra() {
  // Os mais pesados ficam perto do centro
  const ordenados = [...usados].sort((a, b) => b.kg - a.kg);
  ladoDir.replaceChildren(...ordenados.map(criarDisco));
  ladoEsq.replaceChildren(...[...ordenados].reverse().map(criarDisco));
 
  const somaLado = usados.reduce((s, d) => s + d.kg, 0);
  totalEl.textContent = formatar(PESO_BARRA + somaLado * 2) + " kg";
}
 
const botoesDisco = document.getElementById("botoesDisco");
DISCOS.forEach((d) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "btn-disco";
  b.style.setProperty("--c", d.cor);
  b.textContent = formatar(d.kg) + " kg";
  b.addEventListener("click", () => {
    if (usados.length >= MAX_DISCOS_POR_LADO) {
      avisoEl.textContent = `Barra cheia: máximo de ${MAX_DISCOS_POR_LADO} discos por lado.`;
      return;
    }
    avisoEl.textContent = AVISO_PADRAO;
    usados.push(d);
    desenharBarra();
  });
  botoesDisco.appendChild(b);
});
 
document.getElementById("desfazer").addEventListener("click", () => {
  usados.pop();
  avisoEl.textContent = AVISO_PADRAO;
  desenharBarra();
});
document.getElementById("limpar").addEventListener("click", () => {
  usados = [];
  avisoEl.textContent = AVISO_PADRAO;
  desenharBarra();
});
desenharBarra();
 
/* ---------- Treinos por grupo muscular ---------- */
const GRUPOS = [
  {
    nome: "Peito", cor: "var(--vermelho)",
    musculos: "Peitoral maior e menor, deltoide anterior e tríceps.",
    exercicios: [
      ["Supino reto com barra", "4 × 6–10"],
      ["Supino inclinado com halteres", "3 × 8–12"],
      ["Crucifixo na polia", "3 × 12–15"],
      ["Flexão de braço", "3 × 10–20"],
    ],
    dica: "Mantenha as escápulas juntas e os pés firmes no chão durante toda a série.",
  },
  {
    nome: "Costas", cor: "var(--azul)",
    musculos: "Latíssimo do dorso, trapézio, romboides e bíceps.",
    exercicios: [
      ["Puxada frontal", "4 × 8–12"],
      ["Remada curvada com barra", "4 × 6–10"],
      ["Remada baixa no cabo", "3 × 10–12"],
      ["Barra fixa", "3 × 5–10"],
    ],
    dica: "Comece o movimento pelas escápulas e evite balançar o tronco para ajudar na subida.",
  },
  {
    nome: "Pernas", cor: "var(--amarelo)",
    musculos: "Quadríceps, posteriores de coxa, glúteos e panturrilhas.",
    exercicios: [
      ["Agachamento livre", "4 × 6–10"],
      ["Leg press 45°", "3 × 10–15"],
      ["Stiff com barra", "3 × 8–12"],
      ["Cadeira extensora", "3 × 12–15"],
      ["Panturrilha em pé", "4 × 12–20"],
    ],
    dica: "Os joelhos acompanham a direção dos pés e a coluna se mantém neutra.",
  },
  {
    nome: "Ombros", cor: "var(--verde)",
    musculos: "Deltoides (anterior, lateral e posterior), manguito rotador e trapézio superior.",
    exercicios: [
      ["Desenvolvimento com halteres", "4 × 8–12"],
      ["Elevação lateral", "3 × 12–15"],
      ["Crucifixo inverso", "3 × 12–15"],
      ["Encolhimento", "3 × 10–15"],
    ],
    dica: "Controle a descida e não use impulso do corpo para levantar a carga.",
  },
  {
    nome: "Braços", cor: "var(--branco)",
    musculos: "Bíceps, tríceps e antebraço.",
    exercicios: [
      ["Rosca direta", "3 × 8–12"],
      ["Rosca martelo", "3 × 10–12"],
      ["Tríceps testa", "3 × 8–12"],
      ["Tríceps corda na polia", "3 × 10–15"],
    ],
    dica: "Mantenha os cotovelos parados ao lado do corpo para isolar o músculo.",
  },
  {
    nome: "Core", cor: "var(--preto)",
    musculos: "Reto abdominal, oblíquos, transverso do abdome e eretores da espinha.",
    exercicios: [
      ["Prancha", "3 × 30–60 s"],
      ["Abdominal na polia", "3 × 12–15"],
      ["Elevação de pernas", "3 × 10–15"],
      ["Prancha lateral", "3 × 20–40 s"],
    ],
    dica: "Respire de forma contínua e evite prender o ar por muito tempo.",
  },
];
 
const abasEl = document.getElementById("abas");
const painel = document.getElementById("painel");
const abaBotoes = [];
 
function mostrarGrupo(i) {
  const g = GRUPOS[i];
  abaBotoes.forEach((b, idx) => {
    b.setAttribute("aria-selected", idx === i);
    b.tabIndex = idx === i ? 0 : -1;
  });
  painel.style.setProperty("--cor", g.cor);
  document.getElementById("painelTitulo").textContent = g.nome;
  document.getElementById("painelMusculos").textContent = g.musculos;
  document.getElementById("painelDica").textContent = "Dica: " + g.dica;
  document.getElementById("painelLista").innerHTML = g.exercicios
    .map(([nome, series]) => `<tr><td>${nome}</td><td>${series}</td></tr>`)
    .join("");
}
 
GRUPOS.forEach((g, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "aba";
  b.role = "tab";
  b.textContent = g.nome;
  b.style.setProperty("--c", g.cor);
  b.addEventListener("click", () => mostrarGrupo(i));
  b.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const prox = (i + (e.key === "ArrowRight" ? 1 : -1) + GRUPOS.length) % GRUPOS.length;
    mostrarGrupo(prox);
    abaBotoes[prox].focus();
  });
  abasEl.appendChild(b);
  abaBotoes.push(b);
});
mostrarGrupo(0);
 
/* ---------- Calculadora de 1RM (Epley) ---------- */
const PERCENTUAIS = [
  [95, "Força máxima"], [90, "Força máxima"], [85, "Força máxima"],
  [80, "Hipertrofia"], [75, "Hipertrofia"], [70, "Hipertrofia"], [65, "Hipertrofia"],
  [60, "Resistência muscular"], [50, "Resistência muscular"],
];
 
const cargaIn = document.getElementById("calcCarga");
const repsIn = document.getElementById("calcReps");
const resultadoEl = document.getElementById("resultado");
const tabelaPct = document.getElementById("tabelaPct");
 
function arredondar(n) {
  return Math.round(n * 2) / 2; // de 0,5 em 0,5 kg
}
 
function calcular() {
  const carga = parseFloat(cargaIn.value);
  const reps = parseInt(repsIn.value, 10);
 
  if (!(carga > 0) || !(reps >= 1 && reps <= 12)) {
    resultadoEl.className = "resultado erro";
    resultadoEl.textContent = "Informe uma carga maior que 0 e entre 1 e 12 repetições.";
    tabelaPct.hidden = true;
    return;
  }
 
  const rm = reps === 1 ? carga : carga * (1 + reps / 30);
  resultadoEl.className = "resultado";
  resultadoEl.innerHTML = `Seu 1RM estimado é <strong>${formatar(arredondar(rm))} kg</strong>`;
 
  tabelaPct.querySelector("tbody").innerHTML = PERCENTUAIS
    .map(([p, foco]) => `<tr><td>${p}%</td><td>${formatar(arredondar(rm * p / 100))} kg</td><td>${foco}</td></tr>`)
    .join("");
  tabelaPct.hidden = false;
}
 
document.getElementById("calcBtn").addEventListener("click", calcular);
[cargaIn, repsIn].forEach((el) =>
  el.addEventListener("keydown", (e) => { if (e.key === "Enter") calcular(); })
);
calcular();
 