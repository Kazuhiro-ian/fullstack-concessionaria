const URL_API_CLIENTES = 'http://localhost:8080/api/clientes';

// 1. Carregar a lista de clientes ao abrir a página
function carregarClientes() {
    fetch(URL_API_CLIENTES)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tabela-clientes tbody');
            tbody.innerHTML = ''; 
            
            data.forEach(c => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td><strong>${c.nome}</strong></td>
                    <td>${c.cpf}</td>
                    <td>${c.email}</td>
                    <td>
                        <button onclick="deletarCliente(${c.id})" class="btn-delete">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => console.error("Erro ao carregar clientes:", err));
}

// 2. Salvar novo cliente
const formCliente = document.querySelector('#form-cliente');

formCliente.addEventListener('submit', (event) => {
    event.preventDefault();

    const novoCliente = {
        nome: document.querySelector('#nome').value,
        cpf: document.querySelector('#cpf').value.replace(/\D/g, ''), // Remove pontos/traços se houver
        email: document.querySelector('#email').value
    };

    fetch(URL_API_CLIENTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente)
    })
    .then(response => {
        if (!response.ok) {
            // Caso o CPF já exista ou e-mail seja inválido no Java
            return response.json().then(err => { throw new Error(err.mensagem || "Erro ao salvar") });
        }
        return response.json();
    })
    .then(() => {
        formCliente.reset();
        carregarClientes(); // Atualiza a tabela
    })
    .catch(err => alert("Erro: " + err.message));
});

// 3. Deletar cliente
function deletarCliente(id) {
    if (confirm("Tem certeza que deseja remover este cliente?")) {
        fetch(`${URL_API_CLIENTES}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Cliente removido!");
                carregarClientes();
            } else if (response.status === 409) {
                alert("Não é possível excluir um cliente que possui compras vinculadas!");
            } else {
                alert("Erro ao tentar excluir.");
            }
        })
        .catch(err => console.error("Erro na requisição:", err));
    }
}

// --- FUNÇÃO DE BUSCA E FILTRO ---
function filtrarTabela() {
    // Pega o texto digitado e converte para minúsculo
    const termoBusca = document.getElementById('input-busca').value.toLowerCase();
    
    // Pega todas as linhas da tabela de clientes
    const linhas = document.querySelectorAll('#tabela-clientes tbody tr');

    linhas.forEach(linha => {
        // Pega todo o texto da linha (ID, Nome, CPF, Email)
        const textoLinha = linha.innerText.toLowerCase();

        // Se o texto da linha contiver o que foi digitado, mostra. Se não, esconde.
        if (textoLinha.includes(termoBusca)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
}

// Inicia a lista quando a página carrega
document.addEventListener('DOMContentLoaded', carregarClientes);