"use strict";
// Guarda a quantidade, os produtos e o estado da compra.
let total = 0;
let busy = false;
let timer;
// Guarda a quantidade de cada produto e seus preços demonstrativos.
const items = new Map();
const prices = {
  "Vaso Aurora": 89.9,
  "Luminária Brisa": 219,
  "Caneca Orvalho": 64.5,
};
const $ = (id) => document.getElementById(id);
const cart = $("cart");
const count = $("count");
const toast = $("toast");
const buy = $("buy");
const dropdown = $("cartDropdown");
const cartItems = $("cartItems");
const money = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Exibe uma mensagem curta depois de uma ação importante.
function announce(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

// Atualiza a lista, os subtotais e o total exibidos na sacola.
function renderCart() {
  cartItems.replaceChildren();
  let cartValue = 0;

  for (const [name, quantity] of items) {
    const unitPrice = prices[name];
    const lineTotal = unitPrice * quantity;
    cartValue += lineTotal;

    const row = document.createElement("li");
    row.className = "cart-item";
    row.innerHTML = `<div class="cart-item-info"><strong></strong><span class="sub"></span></div><span class="cart-quantity"></span><strong class="cart-line-total"></strong>`;
    row.querySelector(".cart-item-info strong").textContent = name;
    row.querySelector(".cart-item-info span").textContent = `${money(unitPrice)} / unidade`;
    row.querySelector(".cart-quantity").textContent = `× ${quantity}`;
    row.querySelector(".cart-line-total").textContent = money(lineTotal);
    cartItems.append(row);
  }

  $("cartEmpty").hidden = items.size > 0;
  $("cartTotal").textContent = money(cartValue);
}

// Abre ou fecha o dropdown e atualiza seus estados acessíveis.
function setCartOpen(open) {
  cart.setAttribute("aria-expanded", String(open));
  cart.setAttribute("aria-label", `${open ? "Fechar" : "Abrir"} sacola, ${total} ${total === 1 ? "produto" : "produtos"}`);
  dropdown.setAttribute("aria-hidden", String(!open));
  dropdown.inert = !open;
  dropdown.classList.toggle("is-open", open);
}

// O botão da sacola alterna a abertura do resumo.
cart.addEventListener("click", () => {
  setCartOpen(cart.getAttribute("aria-expanded") !== "true");
});

// Fecha o resumo quando a pessoa clica fora dele.
document.addEventListener("click", (event) => {
  if (!event.target.closest(".cart-area")) setCartOpen(false);
});
// A tecla Esc fecha a sacola e devolve o foco ao botão.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cart.getAttribute("aria-expanded") === "true") {
    setCartOpen(false);
    cart.focus();
  }
});

// Cada botão adiciona uma unidade e atualiza a interface.
document.querySelectorAll(".add").forEach((button) =>
  button.addEventListener("click", () => {
    if (busy) return;
    const name = button.dataset.product;
    total++;
    items.set(name, (items.get(name) || 0) + 1);
    count.textContent = total;
    renderCart();
    cart.setAttribute("aria-label", `Abrir sacola, ${total} produtos`);
    $("cartStatus").textContent =
      `${name} adicionado. ${total} ${total === 1 ? "produto" : "produtos"} na sacola.`;
    $("checkoutHint").textContent = "Sua sacola está pronta para finalizar.";
    buy.disabled = false;
    cart.classList.remove("bump");
    void cart.offsetWidth;
    cart.classList.add("bump");
    announce(`${name} adicionado à sacola`);
  }),
);

// Simula o processamento e depois mostra a confirmação da compra.
buy.addEventListener("click", () => {
  if (busy || !total) return;
  busy = true;
  buy.disabled = true;
  buy.innerHTML = '<span class="spinner" aria-hidden="true"></span>Processando...';
  $("buyStatus").innerHTML =
    '<span class="spinner" aria-hidden="true"></span>Processando sua compra. Aguarde.';
  setTimeout(() => {
    busy = false;
    buy.textContent = "Compra concluída";
    $("buyStatus").textContent =
      `Compra confirmada! ${total} ${total === 1 ? "produto" : "produtos"} incluído(s). Nenhum pagamento foi realizado.`;
    announce("Compra confirmada com sucesso.");
  }, 1400);
});

// Permite desligar os movimentos pela opção da página.
$("reduce").addEventListener("change", (event) =>
  document.body.classList.toggle("reduced", event.target.checked),
);
// Respeita a preferência de movimento definida no dispositivo.
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  $("reduce").checked = true;
  document.body.classList.add("reduced");
}
// Ajusta a duração do hover para comparar o efeito.
$("speed").addEventListener("change", (event) => {
  document.documentElement.style.setProperty("--duration", `${event.target.value}ms`);
  $("speedText").textContent = `Duração atual: ${event.target.value} ms`;
});

// Seleciona o switch e o texto que indica o tema atual.
const themeToggle = $("themeToggle");
const themeLabel = $("themeLabel");
// Aplica o tema escolhido e guarda a preferência neste navegador.
function setTheme(isDark) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.checked = isDark;
  themeToggle.setAttribute("aria-label", isDark ? "Desativar tema escuro" : "Ativar tema escuro");
  themeLabel.textContent = isDark ? "Tema escuro" : "Tema claro";
  localStorage.setItem("vitrine-theme", isDark ? "dark" : "light");
}
// Usa a escolha salva; na primeira visita, consulta o tema do sistema.
const savedTheme = localStorage.getItem("vitrine-theme");
setTheme(savedTheme ? savedTheme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
themeToggle.addEventListener("change", () => setTheme(themeToggle.checked));


