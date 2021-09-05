import { servicos } from "../service/servicos.js";

const createRow = (client) => {
    const containerBody = document.querySelector('#table>tbody')
    const localClient = document.createElement('tr')
    const conteudo = `<tr>
        <th scope="row">${client.id}</th>
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td id="buttons-edit">
            <button type="button" class="btn btn-success"><i class="bi bi-eye-fill"></i>Visualizar</button>
            <button type="button" class="btn btn-warning"><i class="bi bi-pencil-square"></i>Editar</button>
            <button type="button" class="btn btn-danger" id="deletar-client" data-index="${client.id}"><i class="bi bi-trash-fill"></i>Excluir</button>
        </td>
    </tr>`
  localClient.innerHTML = conteudo
  containerBody.appendChild(localClient)
  return localClient
}

const clientGlance = (listaClientes) => {
    listaClientes.forEach((cliente => {
        createRow(cliente)
    }))
}

const tabela = document.querySelector('tbody')

const dltModalClose = () => {
    document.querySelector('.modal').classList.remove('active')
}

const whatsTypeIs = (event) => {
    if(event.target.classList.contains('deletebtn')) {
        let id = event.target.dataset.index
            servicos.removeCliente(id)
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
        const listaClientes = await servicos.listaClientes()
        clientGlance(listaClientes)
    }
    catch (erro) {
        console.log(erro)
    }
}
  
carregar()