// Imagem substituta quando um arquivo de img/ ainda não existe
const PH = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="360"><rect width="100%" height="100%" fill="#e2e2e2"/></svg>');
const trocar = (img) => { img.src = PH; };
const tratarImagens = (raiz = document) => raiz.querySelectorAll('img').forEach((img) => {
  if (img.complete && !img.naturalWidth) trocar(img);
  else img.addEventListener('error', () => trocar(img), { once: true });
});

// Produtos (troque pelos seus)
const produtos = Array.from({ length: 8 }, (_, i) => ({
  nome: 'Camiseta Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit',
  antigo: [94, 90.8, 99.9, 92, 89.9, 95, 91.5, 98][i],
  preco: 79.9,
  novo: i < 5,
  img: 'img/produto.jpg',
}));

const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const cardHTML = (p) => `
  <article class="card">
    ${p.novo ? '<span class="badge">NOVO</span>' : ''}
    <img src="${p.img}" alt="${p.nome}">
    <h3>${p.nome}</h3>
    <div><span class="old">${moeda(p.antigo)}</span><span class="off">${Math.round((1 - p.preco / p.antigo) * 100)}% OFF</span></div>
    <p class="price">${moeda(p.preco)}</p>
    <small>Ou em até 10x de ${moeda(p.preco / 10)}</small>
    <button class="btn" type="button">Comprar</button>
  </article>`;

// Carrinho
let carrinho = 0;
const contador = document.getElementById('cart-count');

// Carrosséis (todos os blocos .carousel da página)
document.querySelectorAll('.carousel').forEach((car) => {
  const track = car.querySelector('.track');
  const dots = car.querySelector('.dots');
  track.innerHTML = produtos.map(cardHTML).join('');

  const paginas = () => Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
  const desenharDots = () => { dots.innerHTML = '<span></span>'.repeat(paginas()); atualizarDots(); };
  const atualizarDots = () => {
    const atual = Math.round(track.scrollLeft / track.clientWidth);
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === atual));
  };

  car.querySelector('.arrow--prev').addEventListener('click', () => track.scrollBy({ left: -track.clientWidth }));
  car.querySelector('.arrow--next').addEventListener('click', () => track.scrollBy({ left: track.clientWidth }));
  track.addEventListener('scroll', atualizarDots, { passive: true });
  track.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) contador.textContent = ++carrinho;
  });
  window.addEventListener('resize', desenharDots);
  desenharDots();
});

// Newsletter
const form = document.getElementById('news-form');
const msg = document.getElementById('news-msg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { nome, email, aceite } = form.elements;
  let erro = '';
  if (!nome.value.trim()) erro = 'Digite seu nome.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) erro = 'Digite um e-mail válido.';
  else if (!aceite.checked) erro = 'Aceite a Política de Privacidade para continuar.';
  msg.className = 'msg ' + (erro ? 'erro' : 'ok');
  msg.textContent = erro || 'Cadastro realizado! Obrigado.';
  if (!erro) form.reset();
});

tratarImagens();
