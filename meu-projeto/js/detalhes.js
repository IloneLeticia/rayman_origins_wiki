
function renderizarPaginaDetalhes(categorias) {
    // Se não receber o parâmetro, tenta puxar do LocalStorage automaticamente
    if (!categorias) {
        categorias = JSON.parse(localStorage.getItem('dadosWiki')) || [];
    }

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const container = document.getElementById("detalhe-item");

    if (!container) return; // Evita erros caso o elemento não exista na tela atual

    // Procura a categoria pelo ID no array
    const categoria = categorias.find(c => c.id === id);

    if (!categoria) {
        container.innerHTML = `<div class="alert alert-danger">Categoria não encontrada no arquivo.</div>`;
        return;
    }

    const { detalhes } = categoria;

    container.innerHTML = `
        <div class="row">
            <div class="col-md-6 mb-4">
                <img src="${detalhes.imagemMaior || 'img/placeholder-detalhe.jpg'}" class="img-fluid rounded border border-secondary shadow w-100" alt="${detalhes.titulo}">
            </div>
            <div class="col-md-6 mb-4">
                <h4 class="text-muted text-uppercase mb-1">${categoria.nomeCategoria}</h4>
                <h2 class="display-5 font-weight-bold mb-3">${detalhes.titulo || categoria.nomeCategoria}</h2>
                <hr>
                <p class="lead" style="text-align: justify;">${detalhes.descricaoElaborada}</p>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12 mb-3">
                <h3>Descrição:</h3>
                <p class="text-muted" style="white-space: pre-line;">${detalhes.descricaoSubitens || 'Sem descrição geral disponível.'}</p>
            </div>
            <hr>
            <div class="col-12">
                <div class="row" id="lista-subitens">
                    ${detalhes.subitens.length === 0 ? '<p class="text-muted ps-3">Nenhum subitem registrado para esta categoria.</p>' : ''}
                    <hr>
                    ${detalhes.subitens.map(subitem => `
                        <div class="col-6 col-md-4 col-lg-3 mb-4">
                            <a href="detalhe-subitem.html?catId=${categoria.id}&subId=${subitem.id}" class="text-decoration-none">
                                <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
                                    <div style="height: 220px; overflow: hidden;">
                                        <img src="${subitem.imagem}" class="w-100 h-100" style="object-fit: cover;" alt="${subitem.nome}">
                                    </div>
                                    
                                    
                                    <div class="card-body bg-light text-center">
                                        <h5 class="card-title font-weight-bold text-dark mb-2">${subitem.nome}</h5>
                                      
                                    </div>
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarPaginaDetalhes();
});