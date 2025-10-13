// Variáveis Globais
let carrinho = [];
const precoUnitario = 99.90; // Preço do produto
const nomeProduto = "Produto Fantástico!";

// Elementos do DOM
const contadorCarrinho = document.getElementById('contador-carrinho');
const btnAdicionar = document.getElementById('adicionar-carrinho');
const inputQuantidade = document.getElementById('quantidade');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnAbrirCarrinho = document.getElementById('abrir-carrinho');
const fecharModal = document.querySelector('.fechar-modal');
const listaCarrinho = document.getElementById('lista-carrinho');
const carrinhoTotal = document.getElementById('carrinho-total');
const btnFinalizar = document.getElementById('finalizar-compra');

// Função para formatar o preço para BRL
function formatarBRL(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// 1. Função para adicionar item ao carrinho
function adicionarAoCarrinho() {
    const quantidade = parseInt(inputQuantidade.value);

    if (quantidade > 0) {
        // Verifica se o produto já está no carrinho (neste caso, é sempre o mesmo produto)
        let itemExistente = carrinho.find(item => item.id === 1); 

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({
                id: 1,
                nome: nomeProduto,
                preco: precoUnitario,
                quantidade: quantidade
            });
        }
        
        alert(`${quantidade}x ${nomeProduto} adicionado(s) ao carrinho!`);
        atualizarCarrinhoDOM();
        
    } else {
        alert("Por favor, insira uma quantidade válida.");
    }
}

// 2. Função para atualizar a visualização do carrinho (Modal e Contador)
function atualizarCarrinhoDOM() {
    // A. Atualiza o contador no cabeçalho
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contadorCarrinho.textContent = totalItens;

    // B. Limpa e reconstrói a lista do carrinho
    listaCarrinho.innerHTML = '';
    let totalGeral = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome} (${item.quantidade}x)</span>
            <span>${formatarBRL(subtotal)}</span>
        `;
        listaCarrinho.appendChild(li);
    });

    // C. Atualiza o valor total
    carrinhoTotal.textContent = formatarBRL(totalGeral);
    
    // Habilita/Desabilita o botão de finalizar
    btnFinalizar.disabled = totalItens === 0;
    if (totalItens > 0) {
        btnFinalizar.textContent = "Finalizar Compra";
    } else {
        btnFinalizar.textContent = "Carrinho Vazio";
    }
}


// 3. Configuração de Event Listeners
btnAdicionar.addEventListener('click', adicionarAoCarrinho);

btnAbrirCarrinho.addEventListener('click', () => {
    modalCarrinho.style.display = "block";
});

fecharModal.addEventListener('click', () => {
    modalCarrinho.style.display = "none";
});

// Fecha o modal se o usuário clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target == modalCarrinho) {
        modalCarrinho.style.display = "none";
    }
});

btnFinalizar.addEventListener('click', () => {
    if (carrinho.length > 0) {
        alert(`Obrigado! Seu pedido de ${carrinhoTotal.textContent} foi enviado. (Em um site real, você seria redirecionado para o checkout)`);
        carrinho = []; // Limpa o carrinho
        atualizarCarrinhoDOM();
        modalCarrinho.style.display = "none";
    }
});

// Inicializa a visualização do carrinho
atualizarCarrinhoDOM();