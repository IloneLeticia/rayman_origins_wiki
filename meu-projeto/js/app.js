

// Estado global da aplicação
let dadosApp = null;

async function inicializarAplicacao() {
    gerenciarSessaoEMenu();

    try {
        const resposta = await fetch('data/dados.json');
        if (!resposta.ok) throw new Error('Erro ao carregar o JSON');
        const json = await resposta.json();

        const dadosLocais = localStorage.getItem('dadosWiki');

        if (dadosLocais) {
            const categoriasLocais = JSON.parse(dadosLocais);

            json.categorias.forEach(catJson => {
                const catLocal = categoriasLocais.find(c => c.id === catJson.id);
                
                if (catLocal && catLocal.detalhes && catLocal.detalhes.subitens) {
                    // Validação crítica: se o subitem local ainda usar o formato antigo (com .imagens), ignora-o
                    const formatoAntigo = catLocal.detalhes.subitens.some(s => s.imagens !== undefined);
                    
                    if (!formatoAntigo && catLocal.detalhes.subitens.length > 0) {
                        // Só mantém os subitens do CRUD se já estiverem no formato novo
                        catJson.detalhes.subitens = catLocal.detalhes.subitens;
                    }
                }
            });
        }

        // 2. Grava e força a aplicação a usar os dados atualizados do JSON
        localStorage.setItem('dadosWiki', JSON.stringify(json.categorias));
        dadosApp = json.categorias;
        rotearPagina();

    } catch (erro) {
        console.error('Falha na inicialização dos dados:', erro);
        const dadosLocais = localStorage.getItem('dadosWiki');
        if (dadosLocais) {
            dadosApp = JSON.parse(dadosLocais);
            rotearPagina();
        }
    }
}

function rotearPagina() {
    // Verifica qual página está activa com base nos elementos do DOM
    if (document.getElementById("container-cards")) {
        renderizarPaginaInicial(dadosApp);
    } else if (document.getElementById("detalhe-item")) {
        renderizarPaginaDetalhes(dadosApp);
    }
}

function gerenciarSessaoEMenu() {
    // Recupera o usuário logado do localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // Mapeia os elementos do HTML que mudam com base na autenticação
    const linkCadastroItens = document.getElementById("linkCadastroItens");
    const linkFavoritos = document.getElementById("linkFavoritos");
    const linkAuth = document.getElementById("linkAuth");
    const linkLogout = document.getElementById("linkLogout");
    const linkPerfil = document.querySelector('a[href="perfil.html"]') || document.querySelector('a[href="#"]');

    if (usuarioLogado) {
        // === USUÁRIO ESTÁ LOGADO ===
        if (linkFavoritos) linkFavoritos.classList.remove("d-none");
        if (linkAuth) linkAuth.classList.add("d-none");
        if (linkLogout) {
            linkLogout.classList.remove("d-none");
            linkLogout.innerHTML = `🚪 Sair (${usuarioLogado.usuario})`;
        }
        
        if (linkPerfil) {
            linkPerfil.href = "perfil.html";
        }

        // Só mostra o link de cadastro se for admin de verdade
        if (linkCadastroItens) {
            if (usuarioLogado.admin) {
                linkCadastroItens.classList.remove("d-none");
            } else {
                linkCadastroItens.classList.add("d-none");
            }
        }
    } else {
        // === USUÁRIO DESLOGADO (SEM CADASTRO) ===
        if (linkFavoritos) linkFavoritos.classList.add("d-none");
        if (linkAuth) linkAuth.classList.remove("d-none");
        if (linkLogout) linkLogout.classList.add("d-none");
        if (linkCadastroItens) linkCadastroItens.classList.add("d-none"); // Esconde o cadastro
        
        if (linkPerfil) {
            linkPerfil.href = "login.html"; // Redireciona para o login se tentar acessar sem conta
        }
    }

    // Configura o clique para o botão de Logout
    if (linkLogout && !linkLogout.dataset.listenerAtivo) {
        linkLogout.dataset.listenerAtivo = "true";
        linkLogout.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioLogado"); 
            alert("Sessão encerrada!");
            window.location.href = "index.html"; 
        });
    }
}

// ÚNICO ponto de entrada do script para gerenciar o ciclo de vida do app perfeitamente
document.addEventListener("DOMContentLoaded", inicializarAplicacao);