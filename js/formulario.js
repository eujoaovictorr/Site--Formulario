
// Função para obter o valor de um cookie pelo nome
function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

// Função para definir um cookie
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

// Função para validar o formulário e exibir mensagens de erro/sucesso
function validarForm(event) {
  event.preventDefault(); // Impede o envio do formulário

  try {
    // Obtenção dos valores dos campos
    const nome = document.getElementById('nome').value;
    const id = document.getElementById('id').value;
    const tipo_de_cliente = document.getElementById('tipo_de_cliente').value;
    const endereco = document.getElementById('endereco').value;
    const cep = document.getElementById('cep').value;
    const data_de_Nascimento = document.getElementById('data_de_nascimento').value;
    const vendedor = document.getElementById('vendedor').value;
    const limite_de_credito = document.getElementById('limite_de_credito').value;

    // Validação dos campos
    if (/\d/.test(nome) || /\d/.test(vendedor)) {
      throw 'O campo "Nome" e/ou "Vendedor" não podem conter números!';
    }

    if (/\D/.test(id) || /\D/.test(cep) || /\D/.test(limite_de_credito)) {
      throw 'O campo "ID" e/ou, e/ou "CEP" e/ou "limite de créditos" devem conter apenas números.';
    }

    if (!nome && !id && !tipo_de_cliente && !endereco && !cep && !data_de_Nascimento && !vendedor && !limite_de_credito) {
      throw 'Todos os campos são obrigatórios.';
    }

    // Armazena o nome e o ID do formulário em cookies
    setCookie('nome', nome, 365);
    setCookie('id', id, 365);

    // Exibe mensagem de sucesso
    document.getElementById('mensagemSucesso').textContent = 'Cadastro realizado com sucesso!';
    document.getElementById('mensagemError').textContent = '';
  } catch (error) {
    // Exibe mensagem de erro
    document.getElementById('mensagemError').textContent = error;
    document.getElementById('mensagemSucesso').textContent = '';
  }
}

// Recupera o nome e o ID do formulário armazenados em cookies
const nomeCookie = getCookie('nome');
const idCookie = getCookie('id');

// Preenche os campos com os valores dos cookies, se existirem
if (nomeCookie) {
  document.getElementById('nome').value = nomeCookie;
}

if (idCookie) {
  document.getElementById('id').value = idCookie;
}

// Adiciona o evento de submit ao formulário
document.getElementById('formulario').addEventListener('submit', validarForm);
