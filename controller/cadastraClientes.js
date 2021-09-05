import { services } from "../service/services.js";

//criarClientes

const limparFormulario = () => {
    document.getElementById('logradouro').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}

const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

const eNumero = (numero) => /^[0-9]+$/.test(numero)
const cepValido = (cep) => cep.length == 8 && eNumero(cep)

const pesquisarCep = async () => {
    limparFormulario()
    const cep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    if(cepValido(cep)) {
        const dados = await fetch(url)
        const endereco = await dados.json()
        if(endereco.hasOwnProperty('erro')) {
            document.querySelector('.validity-cep').style.display = "block"
        } else {
            document.querySelector('.validity-cep').style.display = 'none'
            preencherFormulario(endereco)
        }
    } else {
        document.querySelector('.validity-cep').style.display = "block"
        document.querySelector('.validity-cep').innerHTML = 'CEP incorreto!'
    }
}

addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
        const nome = event.target.querySelector('#nome').value
        const email = event.target.querySelector('#email').value
        const telefone = event.target.querySelector('#telefone').value
        const nascimento = event.target.querySelector('#nascimento').value
        const cpf = event.target.querySelector('#cpf').value
        const cep = event.target.querySelector('#cep').value
        const logradouro = event.target.querySelector('#logradouro').value
        const numero = event.target.querySelector('#numero').value
        const bairro = event.target.querySelector('#bairro').value
        const cidade = event.target.querySelector('#cidade').value
        const estado = event.target.querySelector('#estado').value
    
        await services.criarClientes(nome, email, telefone, nascimento, cpf, cep, logradouro, numero, bairro, cidade, estado)
        document.querySelector('.modal-sucess').classList.add('active')
    }
    catch (erro) {
        console.log(event.target)
        document.getElementById('modal').classList.add('active')
        document.documentElement.style.overflow = "hidden"
    }
})

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep)

