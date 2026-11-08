const form = document.getElementById("formAdd");
const input = document.getElementById("inputItem");
const erro = document.getElementById("erroInput");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const alerta = document.getElementById("alerta");
const alertaTexto = document.getElementById("alertaTexto");
const alertaFechar = document.getElementById("alertaFechar");
const btnVoltar = document.getElementById("btnVoltar");

let timerAlerta;

function criarItem(nome) {
  const li = document.createElement("li");
  li.className = "item";

  const check = document.createElement("input");
  check.type = "checkbox";
  check.setAttribute("aria-label", "Marcar " + nome + " como concluído");
  check.addEventListener("change", () => {
    li.classList.toggle("concluido", check.checked);
  });

  const span = document.createElement("span");
  span.className = "nome";
  span.textContent = nome;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-remover";
  btn.innerHTML = '<img src="img/lixeira-de-reciclagem.png" alt="" class="icone-lixeira">';
  btn.setAttribute("aria-label", "Remover " + nome);
  btn.addEventListener("click", () => removerItem(li));

  li.append(check, span, btn);
  return li;
}

function atualizarVazio() {
  vazio.hidden = lista.children.length > 0;
}

function adicionarItem(nome) {
  lista.appendChild(criarItem(nome));
  atualizarVazio();
}

function removerItem(li) {
  li.remove();
  atualizarVazio();
  mostrarAlerta("O item foi removido da lista");
}

function mostrarAlerta(msg) {
  alertaTexto.textContent = msg;
  alerta.hidden = false;
  clearTimeout(timerAlerta);
  timerAlerta = setTimeout(fecharAlerta, 4000);
}

function fecharAlerta() {
  alerta.hidden = true;
  clearTimeout(timerAlerta);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) {
    erro.hidden = false;
    input.classList.add("invalido");
    input.focus();
    return;
  }
  erro.hidden = true;
  input.classList.remove("invalido");
  adicionarItem(texto);
  input.value = "";
  input.focus();
});

input.addEventListener("input", () => {
  erro.hidden = true;
  input.classList.remove("invalido");
});

alertaFechar.addEventListener("click", fecharAlerta);

btnVoltar.addEventListener("click", () => {
  if (history.length > 1) history.back();
  else window.location.href = "/";
});

// Itens pré-cadastrados
["Pão integral", "Café", "Suco de maracujá", "Biscoito de Maizena"].forEach(adicionarItem);
