const URL_API = 'http://localhost:8080/api/veiculos';

function carregarVeiculos() {
    fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tabela-veiculos tbody');
            if (!tbody) return;
            
            tbody.innerHTML = ''; 
            
            data.forEach(v => {
                const row = document.createElement('tr');
                
                // Proteção: Se o preço for nulo no banco, não quebra a tela
                const precoFormatado = v.preco 
                    ? v.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
                    : "R$ 0,00";
                
                const statusVeiculo = v.status || 'DISPONIVEL';
                const classeBadge = statusVeiculo === 'VENDIDO' ? 'badge-danger' : 'badge-success';

                row.innerHTML = `
                    <td>${v.id}</td>
                    <td>${v.marca}</td>
                    <td>${v.modelo}</td>
                    <td>${v.ano}</td>
                    <td>${precoFormatado}</td>
                    <td>
                        <span class="badge ${classeBadge}">
                            ${statusVeiculo}
                        </span>
                    </td>
                    <td>
                        <button onclick="deletarVeiculo(${v.id})" class="btn-delete">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => console.error("Erro ao carregar veículos:", err));
}

// Executa a função assim que a página carrega
document.addEventListener('DOMContentLoaded', carregarVeiculos);

// FORMULÁRIO DE CADASTRO
const form = document.querySelector('#form-veiculo');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const novoVeiculo = {
        marca: document.querySelector('#marca').value,
        modelo: document.querySelector('#modelo').value,
        ano: parseInt(document.querySelector('#ano').value),
        preco: parseFloat(document.querySelector('#preco').value),
        placa: document.querySelector('#placa').value.toUpperCase(),
        status: "DISPONIVEL" 
    };

    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoVeiculo)
        });

        if (response.ok) {
            console.log("3. Sucesso! O Java salvou no banco.");
            form.reset(); 
            carregarVeiculos(); 
        } else {
            // Se der erro de validação no Java (ex: placa repetida)
            const erroTexto = await response.text();
            console.error("3. Erro do Backend:", erroTexto);
            alert("O Java recusou o cadastro! Abra o F12 e olhe o console.");
        }
    } catch (err) {
        console.error("Erro de conexão (O Java está rodando?):", err);
    }
});

function deletarVeiculo(id) {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
        fetch(`${URL_API}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Veículo removido com sucesso!");
                carregarVeiculos(); 
            } else {
                alert("Erro ao tentar excluir o veículo.");
            }
        })
        .catch(err => console.error("Erro na requisição:", err));
    }
}

function filtrarTabela() {
    const termoBusca = document.getElementById('input-busca').value.toLowerCase();
    const statusSelecionado = document.getElementById('filtro-status').value;
    
    const linhas = document.querySelectorAll('#tabela-veiculos tbody tr');

    linhas.forEach(linha => {
        const textoLinha = linha.innerText.toLowerCase();
        
        // Pega o texto do status ignorando os espaços em branco
        const badge = linha.querySelector('.badge');
        const statusLinha = badge ? badge.innerText.trim().toUpperCase() : "";

        const bateBusca = textoLinha.includes(termoBusca);
        const bateStatus = (statusSelecionado === "TODOS") || (statusLinha === statusSelecionado);

        if (bateBusca && bateStatus) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
}