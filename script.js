const colunas = document.querySelectorAll('.coluna');
const inputTarefa = document.getElementById('nova-tarefa-input');
const btnAdicionar = document.getElementById('adicionar-tarefa-btn');

function atualizarContadores() {
    colunas.forEach(coluna => {
        const contador = coluna.querySelector('.contador');
        const numItens = coluna.querySelectorAll('.item').length;
        contador.textContent = numItens;
    });
}

// Função para tornar um item arrastável
function tornarArrastavel(item) {
    item.addEventListener('dragstart', (evento) => {
        evento.dataTransfer.setData('text/plain', evento.target.id);
    });
}

// Função para criar uma nova tarefa a partir do input
function criarNovaTarefa() {
    const textoTarefa = inputTarefa.value.trim();
    if (textoTarefa === '') {
        return; // Não faz nada se o campo estiver vazio
    }
    
    // Cria o novo elemento de tarefa
    const novoItem = document.createElement('div');
    const idUnico = `tarefa-${Date.now()}`;
    novoItem.id = idUnico;
    novoItem.className = 'item';
    novoItem.setAttribute('draggable', 'true');
    novoItem.textContent = textoTarefa;
    
    // Adiciona o novo item à primeira coluna
    document.getElementById('novas-tarefas').appendChild(novoItem);
    
    // Torna o novo item arrastável
    tornarArrastavel(novoItem);
    
    // Limpa o campo de input
    inputTarefa.value = '';
    
    // Atualiza os contadores
    atualizarContadores();
}

// Adiciona os eventos para o botão e para a tecla Enter
btnAdicionar.addEventListener('click', criarNovaTarefa);
inputTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        criarNovaTarefa();
    }
});

// Adiciona os eventos de soltar para cada coluna
colunas.forEach(coluna => {
    coluna.addEventListener('dragover', (evento) => {
        evento.preventDefault();
    });
    
    coluna.addEventListener('drop', (evento) => {
        evento.preventDefault();
        const idItem = evento.dataTransfer.getData('text/plain');
        const itemArrastado = document.getElementById(idItem);
        
        // Move o item para a nova coluna
        coluna.appendChild(itemArrastado);
        
        // Atualiza os contadores após a mudança
        atualizarContadores();
    });
});

// Atualiza os contadores na primeira carga da página
document.addEventListener('DOMContentLoaded', atualizarContadores);