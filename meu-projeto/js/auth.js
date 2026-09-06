// js/auth.js

// Executa quando a página de Login ou Cadastro carregar
document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("formCadastro");
    const formLogin = document.getElementById("formLogin");

   
    // LÓGICA DE CADASTRO DE USUÁRIO
  
    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();

            const usuarioInput = document.getElementById("cadUsuario").value.trim();
            const senhaInput = document.getElementById("cadSenha").value;

            if (usuarioInput.length < 3 || senhaInput.length < 4) {
                alert("O usuário deve ter ao menos 3 caracteres e a senha ao menos 4.");
                return;
            }

            // Pega a lista de usuários já cadastrados no LocalStorage
            let usuariosCadastrados = JSON.parse(localStorage.getItem("usuariosWiki")) || [];

            // Verifica se o usuário já existe
            const usuarioExiste = usuariosCadastrados.some(user => user.usuario.toLowerCase() === usuarioInput.toLowerCase());

            if (usuarioExiste) {
                alert("Este nome de usuário já está sendo usado!");
                return;
            }

            // Salva o novo usuário na lista
            usuariosCadastrados.push({ usuario: usuarioInput, senha: senhaInput });
            localStorage.setItem("usuariosWiki", JSON.stringify(usuariosCadastrados));

            alert("Cadastro realizado com sucesso! Redirecionando para o login...");
            window.location.href = "login.html";
        });
    }

   
    // LÓGICA DE LOGIN DO USUÁRIO
  
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const usuarioInput = document.getElementById("loginUsuario").value.trim();
            const senhaInput = document.getElementById("loginSenha").value;

            // Busca os usuários cadastrados
            const usuariosCadastrados = JSON.parse(localStorage.getItem("usuariosWiki")) || [];

            // Tenta encontrar a combinação correta de login e senha
            const contaValida = usuariosCadastrados.find(user => user.usuario.toLowerCase() === usuarioInput.toLowerCase() && user.senha === senhaInput);

            // Fallback de segurança para o Admin padrão de testes
            let contaAdminPadrao = null;
            if (usuarioInput.toLowerCase() === "admin" && senhaInput === "iloneDiva") {
                contaAdminPadrao = { usuario: "admin", admin: true };
            }

            const usuarioAutenticado = contaValida || contaAdminPadrao;

            if (!usuarioAutenticado) {
                alert("Usuário ou senha incorretos!");
                return;
            }

            // Salva o usuário ativo e o status de admin na sessionStorage (Controle de Sessão)
           localStorage.setItem("usuarioLogado", JSON.stringify({ 
    usuario: usuarioAutenticado.usuario,
    admin: usuarioAutenticado.admin || false 
}));

            alert(`Bem-vindo, ${usuarioAutenticado.usuario}!`);

            // REDIRECIONAMENTO CONDICIONAL:
            if (usuarioAutenticado.admin === true || usuarioAutenticado.usuario.toLowerCase() === "admin") {
                window.location.href = "cadastro-itens.html";
            } else {
                window.location.href = "index.html";
            }
        });
    }
});