const URL_API = 'http://localhost:8080/api/veiculos';

function carregarVeiculos() {
    fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tabela-veiculos tbody');
            tbody.innerHTML = ''; 
            
            data.forEach(v => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${v.id}</td>
                    <td>${v.marca}</td>
                    <td>${v.modelo}</td>
                    <td>${v.ano}</td>
                    <td>R$ ${v.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>
                        <span class="${v.status === 'VENDIDO' ? 'status-vendido' : 'status-disponivel'}">
                            ${v.status}
                        </span>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => console.error("Erro ao carregar veículos:", err));
}

// Executa a função assim que a página carrega
document.addEventListener('DOMContentLoaded', carregarVeiculos);

const form = document.querySelector('#form-veiculo');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede a página de recarregar

    const novoVeiculo = {
        marca: document.querySelector('#marca').value,
        modelo: document.querySelector('#modelo').value,
        ano: parseInt(document.querySelector('#ano').value),
        preco: parseFloat(document.querySelector('#preco').value),
        placa: document.querySelector('#placa').value.toUpperCase(),
        status: "DISPONIVEL" // Status inicial padrão
    };

    fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoVeiculo)
    })
    .then(response => {
        if (!response.ok) {
            // Se o preço for negativo, o Spring vai mandar erro e cair aqui!
            return response.json().then(err => { throw new Error(err.mensagem) });
        }
        return response.json();
    })
    .then(() => {
        alert("Veículo cadastrado com sucesso!");
        form.reset(); // Limpa os campos
        carregarVeiculos(); // Atualiza a tabela na hora
    })
    .catch(err => alert("Erro: " + err.message));
});