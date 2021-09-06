import { services } from "../service/services.js"

const idDados = document.querySelector('#identificador')
const nomeDados = document.querySelector('#nome')
const emailDados = document.querySelector('#email')
const telefoneDados = document.querySelector('#telefone')
const nascimentoDados = document.querySelector('#nascimento')
const cpfDados = document.querySelector('#cpf')
const cepDados = document.querySelector('#cep')
const logradouroDados = document.querySelector('#logradouro')
const numeroDados = document.querySelector('#numero')
const bairroDados = document.querySelector('#bairro')
const cidadeDados = document.querySelector('#cidade')
const estadoDados = document.querySelector('#estado')

let apiEndereco 


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

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep)

async function carregarDados() {
  const dadosCliente = apiEndereco
  idDados.value += dadosCliente.id
  nomeDados.value += dadosCliente.nome
  emailDados.value += dadosCliente.email
  telefoneDados.value += dadosCliente.telefone
  nascimentoDados.value += dadosCliente.nascimento
  cpfDados.value += dadosCliente.cpf
  cepDados.value += dadosCliente.cep
  logradouroDados.value += dadosCliente.logradouro
  numeroDados.value += dadosCliente.numero
  bairroDados.value += dadosCliente.bairro
  cidadeDados.value += dadosCliente.cidade
  estadoDados.value += dadosCliente.estado
}

async function carregaEndereco() {
    try {
        const pegaURL = new URL(window.location)
        const id = pegaURL.searchParams.get('id')
        const response = await services.detalhaCliente(id);
        apiEndereco = await response;
        carregarDados();
    } catch (error) {
        console.error(error);
    }
}
  
carregaEndereco()


const updateClient = (event) => {
    event.preventDefault()

    const nome = document.querySelector('#nome').value
    const email = document.querySelector('#email').value
    const telefone = document.querySelector('#telefone').value
    const nascimento = document.querySelector('#nascimento').value
    const cpf = document.querySelector('#cpf').value
    const cep = document.querySelector('#cep').value
    const logradouro = document.querySelector('#logradouro').value
    const numero = document.querySelector('#numero').value
    const bairro = document.querySelector('#bairro').value
    const cidade = document.querySelector('#cidade').value
    const estado = document.querySelector('#estado') .value

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        nascimento: nascimento,
        cpf: cpf,
        cep: cep,
        logradouro: logradouro,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado
    }

    const id = document.getElementById('identificador').value
    services.editClient(dados, id)
}

document.getElementById('buttonEdit')
    .addEventListener('click', updateClient)