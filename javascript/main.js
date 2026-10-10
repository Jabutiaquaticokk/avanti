const produtos = [
  { nome: 'Camiseta Lorem Ipsum', precoAntigo: 109.90, preco: 79.90, desconto: 15, novo: true, img: 'img/modelo-camisa.png' },
  { nome: 'Camiseta Dolor Sit', precoAntigo: 109.90, preco: 79.90, desconto: 15, novo: true, img: 'img/modelo-camisa.png' },
];

const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const track = document.getElementById('track');

track.innerHTML = produtos.map((p, i) => `
  <article class="card">
    ${p.novo ? '<span class="card__badge">NOVO</span>' : ''}
    <img src="${p.img}" alt="${p.nome}">
    <h3>${p.nome}</h3>
    <span class="card__old">${formatar(p.precoAntigo)}</span>
    <span class="card__discount">${p.desconto}% OFF</span>
    <p class="card__price">${formatar(p.preco)}</p>
    <small>Ou em até 10x de ${formatar(p.preco / 10)}</small>
    <button class="btn" data-id="${i}">Comprar</button>
  </article>
`).join('');

// Setas do carrossel
const rolar = (direcao) => {
  track.scrollBy({ left: direcao * track.clientWidth, behavior: 'smooth' });
};
document.querySelector('.carousel__btn--prev').addEventListener('click', () => rolar(-1));
document.querySelector('.carousel__btn--next').addEventListener('click', () => rolar(1));

// Contador do carrinho
let carrinho = 0;
const contador = document.getElementById('cart-count');

track.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    carrinho++;
    contador.textContent = carrinho;
  }
});