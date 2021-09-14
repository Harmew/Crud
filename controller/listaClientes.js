import { services } from "../service/services.js";

const createRow = (client) => {
    const containerBody = document.querySelector('#table>tbody')
    const localClient = document.createElement('tr')
    const conteudo = `<tr>
        <th scope="row">${client.id}</th>
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td id="buttons-edit">
            <a href="./telas/vizualizar.html?id=${client.id}"><button type="button" class="btn btn-success"><i class="bi bi-eye-fill"></i>Visualizar</button></a>
            <a href="./telas/editar.html?id=${client.id}"><button type="button" class="btn btn-warning"><i class="bi bi-pencil-square"></i>Editar</button></a>
            <button type="button" class="btn btn-danger" id="deletar-client" data-index="${client.id}"><i class="bi bi-trash-fill"></i>Excluir</button>
        </td>
    </tr>`
  localClient.innerHTML = conteudo
  containerBody.appendChild(localClient)
  return localClient
}

const tabela = document.querySelector('tbody')

const dltModalClose = () => {
    document.querySelector('.modal').classList.remove('active')
}

const whatsTypeIs = (event) => {
    if(event.target.classList.contains('deletebtn')) {
        let id = event.target.dataset.index
            services.removeCliente(id)
    } else
        dltModalClose()
}

const dltModalOpen = (event) => {
    if(event.id == ('deletar-client')) {
        document.querySelector('.deletebtn').dataset.index = event.dataset.index
        document.querySelector('.modal').classList.add('active')
    }
}

tabela.addEventListener('click', async (event) => {
    if(event.target.id == ('deletar-client')) {
       const acao = event.target
       dltModalOpen(acao)
    }    
    if(event.target.parentElement.id == ('deletar-client')) {
        const acao = event.target.parentElement
        dltModalOpen(acao)
    }
})

/* Click Events */

document.querySelector('.closer-delete')
    .addEventListener('click', dltModalClose)

document.querySelectorAll('.clearfix-button').forEach(item => {
    item.addEventListener('click', whatsTypeIs)
})

const carregar = async () => {
    try {
        const listaClientes = await services.listaClientes()
        listaClientes.forEach(cliente => createRow(cliente))
    }
    catch (erro) {
        console.log(erro)
    }
}
  
carregar()