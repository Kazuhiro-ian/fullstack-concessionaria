const URL_API_FUNC = 'http://localhost:8080/api/funcionarios';

function carregarFuncionarios() {
    fetch(URL_API_FUNC)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tabela-funcionarios tbody');
            tbody.innerHTML = ''; 
            
            data.forEach(f => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${f.id}</td>
                    <td><strong>${f.nome}</strong></td>
                    <td>${f.matricula}</td>
                    <td><span class="badge-cargo">${f.cargo}</span></td>
                    <td>${f.email}</td>
                    <td>
                        <button onclick="deletarFuncionario(${f.id})" class="btn-delete">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => console.error("Erro ao carregar:", err));
}

const formFunc = document.querySelector('#form-funcionario');

formFunc.addEventListener('submit', (event) => {
    event.preventDefault();

    const novoFuncionario = {
        nome: document.querySelector('#nome').value,
        cpf: document.querySelector('#cpf').value.replace(/\D/g, ''),
        email: document.querySelector('#email').value,
        telefone: document.querySelector('#telefone').value,
        cargo: document.querySelector('#cargo').value,
        matricula: document.querySelector('#matricula').value
    };

    fetch(URL_API_FUNC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoFuncionario)
    })
    .then(response => {
        if (!response.ok) return response.json().then(err => { throw new Error(err.mensagem) });
        return response.json();
    })
    .then(() => {
        alert("Funcionário cadastrado com sucesso!");
        formFunc.reset();
        carregarFuncionarios();
    })
    .catch(err => alert("Erro: " + err.message));
});

function deletarFuncionario(id) {
    if (confirm("Deseja remover este funcionário?")) {
        fetch(`${URL_API_FUNC}/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    alert("Funcionário removido!");
                    carregarFuncionarios();
                } else {
                    alert("Erro: Este funcionário pode estar vinculado a vendas.");
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', carregarFuncionarios);