const listaClientes = () => {
    return fetch('http://localhost:3000/clients')
        .then(response => response.json())
        .then(body => {
          return body
        })
    .catch(() => {
        console.log(Error)
    });
}

// Remove 
const removeCliente = (id) => {
    return fetch(`http://localhost:3000/clients/${id}`, {
      method: 'DELETE'
    }).then(resposta => {
      if (!resposta.ok) {
        throw new Error('Não foi possivel remover cliente')
      }
    })
}

// Create
const criarClientes = (nome, email, telefone, nascimento, cpf, cep, logradouro, numero, bairro, cidade, estado) => {
    return fetch(`http://localhost:3000/clients`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
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
            estado: estado,
        })
    })
    .then(resposta => {
        if (resposta.ok) {
          return resposta.body
        }
        throw new Error('Não foi possivel criar cliente')
    })
}

// Read in Another Page
const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/clients/${id}`)
      .then(resposta => {
        if (resposta.ok) {
          return resposta.json()
        }
        throw new Error('Não foi possivel detalhar cliente')
    })
}
  
// Edit Clients
const editClient = (dados, id) => {
    fetch(`http://localhost:3000/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

export const services = {
    listaClientes,
    criarClientes,
    removeCliente,
    detalhaCliente,
    editClient
}