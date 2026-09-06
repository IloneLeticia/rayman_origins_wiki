

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // Se não estiver logado OU não for admin, expulsa da página
    if (!usuarioLogado || !usuarioLogado.admin) {
        alert("Acesso negado! Apenas administradores podem cadastrar itens.");
        window.location.href = "index.html";
        return;
    }
});
document.addEventListener("DOMContentLoaded", () => {
    let categorias = JSON.parse(localStorage.getItem('dadosWiki')) || [];
    
    const form = document.getElementById("formItemCRUD");
    const tabelaBody = document.getElementById("tabelaItensCRUD");
    const itemIdInput = document.getElementById("itemId");
    const btnCancelar = document.getElementById("btnCancelarEdicao");
    const tituloForm = document.getElementById("tituloForm");
    const selectCategoria = document.getElementById("selectCategoria");
    const tituloTabela = document.getElementById("tituloTabela");

    // Garante que a estrutura nova exista em todas as categorias
    categorias.forEach(cat => {
        if (!cat.detalhes) cat.detalhes = {};
        if (!cat.detalhes.subitens) cat.detalhes.subitens = [];
    });
    localStorage.setItem('dadosWiki', JSON.stringify(categorias));

    let categoriaAtiva = categorias.find(c => c.id == selectCategoria.value);

    function renderizarTabela() {
        if (!tabelaBody || !categoriaAtiva) return;
        tabelaBody.innerHTML = "";
        
        tituloTabela.innerText = `🗂️ Subitens em "${categoriaAtiva.nomeCategoria}"`;

        const listaItens = categoriaAtiva.detalhes.subitens;
        
        listaItens.forEach((item, index) => {
            tabelaBody.innerHTML += `
                <tr>
                    <td>
                        <img src="${item.imagem}" alt="${item.nome}" class="rounded border" style="width: 50px; height: 50px; object-fit: cover;" onerror="this.src='https://placehold.co/50x50?text=Sem+Img';">
                    </td>
                    <td><strong>${item.nome}</strong></td>
                    <td class="text-truncate" style="max-width: 250px;">${item.descricao}</td>
                    <td class="text-center">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-warning text-white" onclick="editarItem(${index})">✏️</button>
                            <button class="btn btn-danger" onclick="excluirItem(${index})">❌</button>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    selectCategoria.addEventListener("change", () => {
        categoriaAtiva = categorias.find(c => c.id == selectCategoria.value);
        resetarFormulario();
        renderizarTabela();
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nomeInput = document.getElementById("nomeCategoria").value.trim();
            const descricaoInput = document.getElementById("breveDescricao").value.trim();
            const imagem1Input = document.getElementById("imagemCard").value.trim();
            const imagem2Input = document.getElementById("imagemCarrossel").value.trim();

            const indexEditando = itemIdInput.value;
            const listaItens = categoriaAtiva.detalhes.subitens;

            if (indexEditando === "") {
                // Criar Novo Subitem com a nova estrutura de propriedades puras
                const novoSubitem = {
                    id: `${categoriaAtiva.nomeCategoria.toLowerCase()[0]}${Date.now()}`, // Gera um ID único como h171829...
                    nome: nomeInput,
                    imagem: imagem1Input || 'https://placehold.co/300x220?text=Sem+Imagem',
                    imagem2: imagem2Input,
                    descricao: descricaoInput
                };
                listaItens.push(novoSubitem);
                alert(`Inserido em ${categoriaAtiva.nomeCategoria} com sucesso!`);
            } else {
                // Atualizar item existente mantendo o ID original dele
                const i = parseInt(indexEditando);
                listaItens[i].nome = nomeInput;
                listaItens[i].imagem = imagem1Input;
                listaItens[i].imagem2 = imagem2Input;
                listaItens[i].descricao = descricaoInput;
                
                alert("Item atualizado!");
                resetarFormulario();
            }

            localStorage.setItem('dadosWiki', JSON.stringify(categorias));
            resetarFormulario();
            renderizarTabela();
        });
    }

    window.editarItem = function(index) {
        const item = categoriaAtiva.detalhes.subitens[index];

        document.getElementById("nomeCategoria").value = item.nome;
        document.getElementById("breveDescricao").value = item.descricao;
        document.getElementById("imagemCard").value = item.imagem;
        document.getElementById("imagemCarrossel").value = item.imagem2 || "";
        
        document.getElementById("selectCategoria").value = categoriaAtiva.id;
        
        itemIdInput.value = index;
        tituloForm.innerText = "✏️ Editar Item";
        selectCategoria.disabled = true; 
        if (btnCancelar) btnCancelar.classList.remove("d-none");
    };

    window.excluirItem = function(index) {
        if (confirm("Deseja remover este item?")) {
            categoriaAtiva.detalhes.subitens.splice(index, 1);
            localStorage.setItem('dadosWiki', JSON.stringify(categorias));
            renderizarTabela();
        }
    };

    if (btnCancelar) {
        btnCancelar.addEventListener("click", resetarFormulario);
    }

    function resetarFormulario() {
        const categoriaAtual = selectCategoria.value;
        form.reset();
        itemIdInput.value = "";
        selectCategoria.value = categoriaAtual;
        tituloForm.innerText = "✨ Novo Item";
        selectCategoria.disabled = false;
        if (btnCancelar) btnCancelar.classList.add("d-none");
    }

    const btnResetarJSON = document.getElementById("btnResetarJSON");
if (btnResetarJSON) {
    btnResetarJSON.addEventListener("click", () => {
        if (confirm("Atenção: Isso vai apagar todos os itens cadastrados manualmente e restaurar os textos originais do arquivo JSON. Deseja continuar?")) {
            localStorage.removeItem('dadosWiki'); // Apaga a memória travada
            alert("Memória limpa! Recarregando a página para aplicar os novos textos do JSON...");
            window.location.reload(); // Atualiza a página para o app.js buscar o JSON novo
        }
    });
}

    renderizarTabela();
});