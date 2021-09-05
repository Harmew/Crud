import { services } from "../service/services.js"

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

async function carregarDados() {
  const dadosCliente = apiEndereco

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