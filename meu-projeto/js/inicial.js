// js/inicial.js

function renderizarPaginaInicial(categorias) {
    // Se não receber o parâmetro, tenta puxar do LocalStorage automaticamente
    if (!categorias) {
        categorias = JSON.parse(localStorage.getItem('dadosWiki')) || [];
    }

    const containerCards = document.getElementById("container-cards");
    const carrosselInner = document.getElementById("carrossel-dinamico");
    const inputPesquisa = document.querySelector(".navbar input[type='search']");
    const botaoPesquisa = document.querySelector(".navbar button[type='submit']");

    //carrossel
    if (carrosselInner) {

        carrosselInner.innerHTML = `
            <div class="carousel-item active">
                <a href="">
                    <img src="imagens/banner.png" class="d-block w-100" alt="Rayman Origins Wiki" style="max-height: 450px; object-fit: cover;">
                    <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.6); border-radius: 8px;">
                        <h5>Bem-vindo à Rayman Origins Wiki!</h5>
                        <p>Explore as categorias, gerencie seus favoritos e descubra tudo sobre o jogo.</p>
                    </div>
                </a>
            </div>
        `;
        
        const categoriasComBanner = categorias.filter(c => c.imagemCarrossel);
        
        categoriasComBanner.forEach((categoria) => {
           
            carrosselInner.innerHTML += `
                <div class="carousel-item">
                    <img src="${categoria.imagemCarrossel}" class="d-block w-100" alt="${categoria.nomeCategoria}" style="max-height: 450px; object-fit: cover;">
                    <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.6); border-radius: 8px;">
                        <h5>${categoria.nomeCategoria}</h5>
                        <p>${categoria.breveDescricao}</p>
                    </div>
                </div>
            `;
        });
    }
    // 2. Função de Filtragem e Renderização dos Cards
    function filtrarEExibir() {
        if (!containerCards) return;
        
        const termo = inputPesquisa ? inputPesquisa.value.toLowerCase().trim() : "";
        containerCards.innerHTML = "";

        categorias.forEach(categoria => {
            const nomeBate = categoria.nomeCategoria.toLowerCase().includes(termo);
            const descBate = categoria.breveDescricao.toLowerCase().includes(termo);

            if (termo === "" || nomeBate || descBate) {
                containerCards.innerHTML += `
                    <article class="col-6 col-md-4 col-lg-3 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${categoria.imagemCard || 'img/placeholder.jpg'}" class="card-img-top" alt="${categoria.nomeCategoria}" style="height: 220px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-uppercase font-weight-bold">${categoria.nomeCategoria}</h5>
                                <p class="card-text text-muted flex-grow-1">${categoria.breveDescricao}</p>
                                <a href="pagdetalhes.html?id=${categoria.id}" class="btn btn-primary mt-auto">VER MAIS</a>
                            </div>
                        </div>
                    </article>
                `;
            }
        });

        if (containerCards.innerHTML === "") {
            containerCards.innerHTML = `<div class="col-12 text-center my-4 text-muted">Nenhum resultado encontrado para "${termo}".</div>`;
        }
    }

    // 3. Ativação dos Eventos de Busca
    filtrarEExibir();
    if (botaoPesquisa && inputPesquisa) {
        botaoPesquisa.addEventListener("click", (e) => {
            e.preventDefault();
            filtrarEExibir();
        });
        inputPesquisa.addEventListener("input", filtrarEExibir);
    }
} // Fechamento correto da função renderizarPaginaInicial

// Lógica da Sidebar (Menu Lateral)
const sidebar = document.getElementById('sidebar');
const btnAbrir = document.getElementById('btnAbrir');
const btnFechar = document.getElementById('btnFechar');

if (btnAbrir && sidebar) {
    btnAbrir.addEventListener('click', () => {
        sidebar.classList.toggle('ativo');
    });
}

if (btnFechar && sidebar) {
    btnFechar.addEventListener('click', () => {
        sidebar.classList.remove('ativo'); 
    });
}