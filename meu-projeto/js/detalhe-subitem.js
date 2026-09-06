

document.addEventListener("DOMContentLoaded", () => {
    // 1. Pega o banco de dados atualizado do LocalStorage
    const categorias = JSON.parse(localStorage.getItem('dadosWiki')) || [];

    // 2. Captura as variáveis passadas na URL (?catId=X&subId=Y)
    const params = new URLSearchParams(window.location.search);
    const catId = parseInt(params.get("catId"));
    const subId = params.get("subId");

    const container = document.getElementById("container-detalhe-subitem");
    const btnVoltar = document.getElementById("btnVoltarCategoria");

    // Configura o botão voltar dinamicamente para a categoria correta
    if (btnVoltar && catId) {
        btnVoltar.href = `pagdetalhes.html?id=${catId}`;
    }

    if (!container) return;

    // 3. Encontra a categoria correspondente (ex: Heróis)
    const categoria = categorias.find(c => c.id === catId);
    if (!categoria || !categoria.detalhes || !categoria.detalhes.subitens) {
        container.innerHTML = `<div class="alert alert-danger text-center">Categoria não encontrada no sistema.</div>`;
        return;
    }

    // 4. Encontra o subitem específico (ex: Rayman pelo id "h3")
    const subitem = categoria.detalhes.subitens.find(s => s.id === subId);
    if (!subitem) {
        container.innerHTML = `<div class="alert alert-danger text-center">O item selecionado não foi encontrado.</div>`;
        return;
    }

    // 5. Injeta a estrutura montada com os campos exatos do seu JSON
    container.innerHTML = `
        <button id="btnFavoritar" onclick="alternarFavorito()" class="btn btn-outline-warning btn-lg rounded-pill mt-3">⭐ Favoritar</button>
        <div class="row align-items-center mt-4">
            <div class="col-md-5 text-center mb-4 mb-md-0">
                <img src="${subitem.imagem}" 
                     class="img-fluid rounded-3 shadow border w-100" 
                     alt="${subitem.nome}" 
                     style="max-height: 400px; object-fit: cover;"
                     onerror="this.src='https://placehold.co/400x400?text=Sem+Imagem';">
                
                ${subitem.imagem2 ? `
                    <img src="${subitem.imagem2}" 
                         class="img-fluid rounded-3 shadow border w-100 mt-3" 
                         alt="Segunda imagem de ${subitem.nome}" 
                         style="max-height: 250px; object-fit: cover;"
                         onerror="this.style.display='none';">
                ` : ''}
            </div>

            <div class="col-md-7 ps-md-5">
                <span class="badge bg-warning text-dark text-uppercase mb-2 px-3 py-2 rounded-pill fw-bold">
                    ${categoria.nomeCategoria}
                </span>
                <h1 class="display-4 font-weight-bold mb-3 text-dark">${subitem.nome}</h1>
                <hr class="border-2 border-warning w-25">
                <p class="lead text-secondary mt-4" style="text-align: justify; white-space: pre-line; line-height: 1.8;">
                    ${subitem.descricao}
                </p>
            </div>
        </div>
    `;
}); 

// 6. Função global do lado de fora para o 'onclick' funcionar perfeitamente
function alternarFavorito() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
        alert("Você precisa estar logado para favoritar itens!");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const catId = params.get("catId");
    const subId = params.get("subId");

    let favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuarioLogado.usuario}`)) || [];
    const itemExistente = favoritos.find(f => f.catId === catId && f.subId === subId);

    if (itemExistente) {
        favoritos = favoritos.filter(f => !(f.catId === catId && f.subId === subId));
        alert("Removido dos favoritos!");
    } else {
        favoritos.push({ catId, subId });
        alert("Adicionado aos favoritos! ⭐");
    }

    localStorage.setItem(`favoritos_${usuarioLogado.usuario}`, JSON.stringify(favoritos));
}