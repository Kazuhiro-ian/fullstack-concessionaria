const URL_VENDAS = 'http://localhost:8080/api/vendas';
const URL_VEICULOS = 'http://localhost:8080/api/veiculos';
const URL_CLIENTES = 'http://localhost:8080/api/clientes';
const URL_FUNCIONARIOS = 'http://localhost:8080/api/funcionarios';

// Variável global para guardar os veículos e seus preços
let listaVeiculos = [];

// Inicialização: Carrega os dados assim que a página abre
document.addEventListener('DOMContentLoaded', () => {
    carregarDadosParaFormulario();
    carregarHistoricoVendas();
});

// 1. Busca Veículos, Clientes e Funcionários para preencher os Selects
async function carregarDadosParaFormulario() {
    try {
        const [resVeic, resCli, resFunc] = await Promise.all([
            fetch(URL_VEICULOS),
            fetch(URL_CLIENTES),
            fetch(URL_FUNCIONARIOS)
        ]);

        const veiculos = await resVeic.json();
        const clientes = await resCli.json();
        const funcionarios = await resFunc.json();

        // --- Popular Veículos (Filtrando apenas os DISPONIVEL) ---
        const selectVeiculo = document.getElementById('select-veiculo');
        selectVeiculo.innerHTML = '<option value="">Selecione um Veículo...</option>';
        
        // Salva os disponíveis na variável global para usarmos na hora de mostrar o preço
        listaVeiculos = veiculos.filter(v => v.status === 'DISPONIVEL');
        
        if (listaVeiculos.length === 0) {
            selectVeiculo.innerHTML = '<option value="">🚫 Nenhum veículo disponível</option>';
        } else {
            listaVeiculos.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.id;
                opt.textContent = `${v.marca} ${v.modelo} (${v.placa}) - R$ ${v.preco.toLocaleString('pt-BR')}`;
                selectVeiculo.appendChild(opt);
            });
        }

        // Limpa o campo de valor ao recarregar a lista
        document.getElementById('valorTotal').value = '';

        // --- Popular Clientes ---
        const selectCliente = document.getElementById('select-cliente');
        selectCliente.innerHTML = '<option value="">Selecione o Cliente...</option>';
        clientes.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.nome} (${c.cpf})`;
            selectCliente.appendChild(opt);
        });

        // --- Popular Vendedores ---
        const selectVendedor = document.getElementById('select-vendedor');
        selectVendedor.innerHTML = '<option value="">Selecione o Vendedor...</option>';
        funcionarios.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.id;
            opt.textContent = `${f.nome} - ${f.cargo}`;
            selectVendedor.appendChild(opt);
        });

    } catch (error) {
        console.error("Erro ao carregar seletores:", error);
        alert("Erro ao conectar com o servidor para carregar listas.");
    }
}

// MÁGICA NOVA: Atualiza o campo de valor quando o vendedor escolhe um carro
document.getElementById('select-veiculo').addEventListener('change', (event) => {
    const veiculoId = event.target.value;
    const inputValor = document.getElementById('valorTotal');

    if (!veiculoId) {
        inputValor.value = ''; // Se voltar para "Selecione...", limpa o valor
        return;
    }

    // Procura o veículo escolhido na nossa lista guardada
    const veiculoEscolhido = listaVeiculos.find(v => v.id == veiculoId);
    if (veiculoEscolhido) {
        // Preenche o input com o preço real
        inputValor.value = veiculoEscolhido.preco.toFixed(2);
    }
});

// 2. Enviar o Formulário de Venda
const formVenda = document.getElementById('form-venda');
formVenda.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Captura apenas os IDs, o Java cuida do resto!
    const vendaRequest = {
        veiculo: { id: document.getElementById('select-veiculo').value },
        cliente: { id: document.getElementById('select-cliente').value },
        vendedor: { id: document.getElementById('select-vendedor').value }
    };

    try {
        const response = await fetch(URL_VENDAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vendaRequest)
        });

        if (response.ok) {
            alert("Venda realizada com sucesso! O status do veículo foi atualizado.");
            formVenda.reset();
            carregarDadosParaFormulario();
            carregarHistoricoVendas();
        } else {
            const erroMsg = await response.text();
            alert("Falha na venda: " + erroMsg);
        }
    } catch (error) {
        alert("Erro de rede ao tentar realizar a venda.");
    }
});

// 3. Carregar Tabela de Histórico
async function carregarHistoricoVendas() {
    try {
        const response = await fetch(URL_VENDAS);
        const vendas = await response.json();
        
        const tbody = document.querySelector('#tabela-vendas tbody');
        tbody.innerHTML = '';

        vendas.forEach(v => {
            const dataFmt = new Date(v.dataVenda).toLocaleString('pt-BR');
            const valorFmt = v.valorTotal ? v.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "R$ 0,00";
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${v.id}</td>
                <td>${dataFmt}</td>
                <td>${v.veiculo ? v.veiculo.modelo : '---'}</td>
                <td>${v.cliente ? v.cliente.nome : '---'}</td>
                <td>${v.vendedor ? v.vendedor.nome : '---'}</td>
                <td class="price-tag">${valorFmt}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar histórico de vendas:", error);
    }
}