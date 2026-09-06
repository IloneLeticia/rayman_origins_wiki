

let avatarSelecionado = "meu-projeto/foto-de-perfil/edith-up.jpg";

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    if (!usuarioLogado) {
        window.location.href = "login.html";
        return;
    }

    // 1. Carrega dados básicos do usuário
    document.getElementById("nomeUsuarioPerfil").innerText = usuarioLogado.usuario;
    if (usuarioLogado.avatar) {
        document.getElementById("avatarAtual").src = usuarioLogado.avatar;
        avatarSelecionado = usuarioLogado.avatar;
    }
    
    // Carrega a bio salva no modo estático
    if (usuarioLogado.bio && usuarioLogado.bio.trim() !== "") {
        document.getElementById("textoBio").innerText = usuarioLogado.bio;
        document.getElementById("textoBio").classList.remove("text-secondary");
        document.getElementById("textoBio").classList.add("text-dark");
        document.getElementById("bioUsuario").value = usuarioLogado.bio;
    }

    // 2. Carrega os favoritos
    carregarFavoritosNoPerfil(usuarioLogado.usuario);
});

// Exibe o botão salvar quando houver modificações
function mostrarBotaoSalvar() {
    const btnSalvar = document.getElementById("btnSalvarPerfil");
    if (btnSalvar) {
        btnSalvar.classList.remove("d-none");
    }
}

// Mostra/Esconde a seção de avatares ao clicar no botão
function toggleOpcoesFoto() {
    const secao = document.getElementById("secaoFotos");
    secao.classList.toggle("d-none");
}

// Altera a foto de perfil temporariamente e ativa o botão de salvar
function mudarAvatar(urlAvatar) {
    avatarSelecionado = urlAvatar;
    document.getElementById("avatarAtual").src = urlAvatar;
    mostrarBotaoSalvar();
}

// Alterna entre o parágrafo estático e a área de digitação da Bio
function ativarEdicaoBio() {
    const textBio = document.getElementById("textoBio");
    const inputBio = document.getElementById("bioUsuario");
    const btnEditar = document.getElementById("btnEditarBio");

    if (inputBio.classList.contains("d-none")) {
        // Entra no modo de edição
        inputBio.classList.remove("d-none");
        textBio.classList.add("d-none");
        btnEditar.innerText = "✖️ Cancelar";
        inputBio.value = textBio.innerText === "Nenhuma biografia adicionada ainda..." ? "" : textBio.innerText;
        inputBio.focus();

        // Monitora as teclas para exibir o botão salvar se o texto mudar
        inputBio.oninput = () => {
            if (inputBio.value.trim() !== textBio.innerText) {
                mostrarBotaoSalvar();
            }
        };
    } else {
        // Cancela e volta para o modo estático
        inputBio.classList.add("d-none");
        textBio.classList.remove("d-none");
        btnEditar.innerText = "✏️ Editar Bio";
    }
}

// Salva as alterações no LocalStorage de forma global
function salvarPerfil() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) return;

    const inputBio = document.getElementById("bioUsuario");
    const novaBio = inputBio.classList.contains("d-none") 
        ? document.getElementById("textoBio").innerText 
        : inputBio.value.trim();

    // Atualiza a sessão atual
    usuarioLogado.avatar = avatarSelecionado;
    usuarioLogado.bio = novaBio === "Nenhuma biografia adicionada ainda..." ? "" : novaBio;
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    // Atualiza no banco global (usuariosWiki)
    const listaUsuarios = JSON.parse(localStorage.getItem("usuariosWiki")) || [];
    const index = listaUsuarios.findIndex(u => u.usuario.toLowerCase() === usuarioLogado.usuario.toLowerCase());
    if (index !== -1) {
        listaUsuarios[index].avatar = avatarSelecionado;
        listaUsuarios[index].bio = usuarioLogado.bio;
        localStorage.setItem("usuariosWiki", JSON.stringify(listaUsuarios));
    }

    alert("Perfil atualizado com sucesso!");
    window.location.href = "perfil.html";
}

// Busca os itens favoritados do usuário logado e monta os cards
function carregarFavoritosNoPerfil(nomeUsuario) {
    const container = document.getElementById("container-favoritos-perfil");
    const dadosWiki = JSON.parse(localStorage.getItem("dadosWiki")) || [];
    const favoritos = JSON.parse(localStorage.getItem(`favoritos_${nomeUsuario}`)) || [];

    if (favoritos.length === 0) {
        container.innerHTML = `<p class="text-muted small col-12 text-center">Você ainda não tem itens favoritados.</p>`;
        return;
    }

    container.innerHTML = "";

    favoritos.forEach(fav => {
        const categoria = dadosWiki.find(c => c.id == fav.catId);
        if (!categoria) return;

        const subitem = categoria.detalhes.subitens.find(s => s.id == fav.subId);
        if (!subitem) return;

        container.innerHTML += `
            <div class="col">
                <div class="card h-100 border shadow-sm rounded-3 overflow-hidden" style="max-width: 320px; margin: auto;">
                    <img src="${subitem.imagem}" class="card-img-top" style="height: 120px; object-fit: cover;" alt="${subitem.nome}">
                    <div class="card-body p-2 text-center bg-light">
                        <h6 class="card-title font-weight-bold m-0 text-dark">${subitem.nome}</h6>
                        <a href="detalhe-subitem.html?catId=${categoria.id}&subId=${subitem.id}" class="btn btn-sm btn-warning rounded-pill py-0 px-2 mt-2" style="font-size: 12px;">Acessar</a>
                    </div>
                </div>
            </div>
        `;
    });
}