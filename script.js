const inputs = document.querySelectorAll('#nome, #sobrenome, #nascimento, #rg, #CPF, #CEP, #bairro, #rua, #cidade, #numero')
const resetButton = document.querySelector('input[type="button"]')
const selectInput = document.querySelector('#sexo')
const inputCep = document.querySelector('#CEP')
const inputCPF = document.querySelector('#CPF')
const nascimento = document.querySelector('#nascimento')

// ----------------------------------------------------------------------------------------
// Reseta todos os campos
resetButton.addEventListener('click', () => {
	inputs.forEach((item) => {
		item.value = '';
	})
	selectInput.value = 'Masc';
	radioInput.forEach((item) => {
		item.checked = false;
	})
})

// ----------------------------------------------------------------------------------------
// API do viacep
inputCep.addEventListener('keyup', apiResponse)

function apiResponse() {
	if (inputCep.value.length == 8) {
		apiCep(inputCep.value)
	} else if (inputCep.value.length == 0) {
		document.querySelector('#rua').value = ''
		document.querySelector('#bairro').value = ''
		document.querySelector('#cidade').value = ''
	}
}

function apiCep(cep) {
	fetch(`https://viacep.com.br/ws/${cep}/json/`)
		.then(response => {
			return response.json()
		})
		.then(jsonBody => {
			if (jsonBody.hasOwnProperty('erro')) {
				window.alert('Cep inválido')
				highlightError(document.querySelector('#CEP'))
			} else {
				document.querySelector('#rua').value = jsonBody.logradouro
				document.querySelector('#bairro').value = jsonBody.bairro
				document.querySelector('#cidade').value = `${jsonBody.localidade}/${jsonBody.uf}`
			}
		})
}

// ----------------------------------------------------------------------------------------
// Máscara e validação de CPF
inputCPF.addEventListener('keypress', () => {
	const inputlenght = inputCPF.value.length
	if (inputlenght === 3 || inputlenght === 7) {
		inputCPF.value += '.'
	} else if (inputlenght === 11) {
		inputCPF.value += '-'
	}
})

function validarCPF(cpf) {
	cpf = cpf.replace(/[^\d]+/g, '');
	if (cpf == '') return false;
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 ||
		cpf == "00000000000" ||
		cpf == "11111111111" ||
		cpf == "22222222222" ||
		cpf == "33333333333" ||
		cpf == "44444444444" ||
		cpf == "55555555555" ||
		cpf == "66666666666" ||
		cpf == "77777777777" ||
		cpf == "88888888888" ||
		cpf == "99999999999")
		return false;
	// Valida 1o digito	
	add = 0;
	for (i = 0; i < 9; i++)
		add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(9)))
		return false;
	// Valida 2o digito	
	add = 0;
	for (i = 0; i < 10; i++)
		add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(10)))
		return false;
	return true;
}


function validacaoCPF() {
	const cpf = document.querySelector('#CPF').value
	if (!validarCPF(cpf)) {
		window.alert('CPF INVÁLIDO')
		highlightError(document.querySelector('#CPF'))
		return false
	} else {
		return true
	}
}

function validarRG() {
	const numeroRG = document.querySelector('#rg')
	if (validarNum(numeroRG.value) && numeroRG.value.length == 10) {
		return true
	} else if (numeroRG.value.length < 10) {
		window.alert('O campo de RG necessita de pelo menos 10 caracteres')
		highlightError(numeroRG)
		return false;
	} else {
		window.alert('Campo de RG aceita apenas números')
		highlightError(numeroRG)
		return false;
	}
}

function validarNumeroCasa() {
	const casaNumero = document.querySelector('#numero')
	if (validarNum(casaNumero.value)) {
		return true
	} else {
		window.alert('Numero inválido')
		highlightError(casaNumero)
	}
}

function validarNum(num) {
	const regex = /^\d+$/
	if (regex.test(num)) {
		return true;
	} else {
		return false
	}
}

// ----------------------------------------------------------------------------------------
// validação de campos com letras com acento e espaços em branco
function validarPrimeiroNome() {
	const primeiroNome = document.querySelector('#nome')
	if (!validarNome(primeiroNome.value)) {
		window.alert('O campo de Nome é inválido')
		highlightError(primeiroNome)
		return false
	} else if (primeiroNome.value.length < 2) {
		window.alert('O campo de Nome precisa de pelo menos 2 caracteres')
		highlightError(primeiroNome)
		return false
	} else {
		return true;
	}
}

function validarSegundoNome() {
	const segundoNome = document.querySelector('#sobrenome')
	if (!validarNome(segundoNome.value)) {
		window.alert('O campo de Sobrenome é inválido')
		highlightError(segundoNome)
		return true
	} else if (segundoNome.value.length < 2) {
		window.alert('O campo de Sobrenome precisa de pelo menos 2 caracteres')
		highlightError(segundoNome)
		return false
	} else {
		return true;
	}
}

function validarRua() {
	const nomeRua = document.querySelector('#rua')
	if (!validarNome(nomeRua.value)) {
		window.alert('O campo de rua é inválido')
		highlightError(nomeRua)
		return true
	} else if (nomeRua.value.length < 2) {
		window.alert('O campo de rua precisa de pelo menos 2 caracteres')
		highlightError(nomeRua)
		return false
	} else {
		return true;
	}
}

function validarCidade() {
	const nomeCidade = document.querySelector('#cidade')
	if (!validarNome(nomeCidade.value)) {
		window.alert('O campo de Cidade é inválido')
		highlightError(nomeCidade)
		return true
	} else if (nomeCidade.value.length < 2) {
		window.alert('O campo de Cidade precisa de pelo menos 2 caracteres')
		highlightError(nomeCidade)
		return false
	} else {
		return true;
	}
}

function validarBairro() {
	const nomeBairro = document.querySelector('#bairro')
	if (!validarNome(nomeBairro.value)) {
		window.alert('O campo de Bairro é inválido')
		highlightError(nomeBairro)
		return true
	} else if (nomeBairro.value.length < 2) {
		window.alert('O campo de Bairro precisa de pelo menos 2 caracteres')
		highlightError(nomeBairro)
		return false
	} else {
		return true;
	}
}

function validarNome(char) {
	const Regex = /[a-zA-Z\u00C0-\u00FF ]+/i;
	if (!Regex.test(char)) {
		return false
	} else {
		return true;
	}
}

// ---------------------------------------------------------------------------------------
// valida o select de sexo
function validarSexo() {
	if (selectInput.value == '') {
		window.alert('Favor selecionar um sexo')
		highlightError(selectInput)
		return false;
	} else {
		return true;
	}
}

// ---------------------------------------------------------------------------------------
// valida as datas
function is200YearsOld(dateInput) {
	const inputDate = new Date(dateInput.value);
	// Format date in Brazilian format
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	const formattedDate = inputDate.toLocaleDateString('pt-BR', options);
	const today = new Date();
	const twoHundredYearsAgo = new Date(today.getFullYear() - 200, today.getMonth(), today.getDate());
	const is200 = inputDate <= twoHundredYearsAgo;
	if (!is200) {
		console.log(formattedDate)
		return formattedDate;
	}
	return false;
}

function validaData() {
	const dateInput = document.getElementById('nascimento');
	const is200 = is200YearsOld(dateInput);
	if (!is200) {
		window.alert('Insira uma data válida');
		highlightError(dateInput);
		return false;
	} else {
		return true;
	}
}

//coloca um highlight nos erros 
function highlightError(prop) {
	prop.style.outline = '2px solid red'
}

// retira o highlight nos erros quando clicado
inputs.forEach((item) => {
	item.addEventListener('click', () => {
		item.style.outline = 'none'
	})
})

selectInput.addEventListener('click', () => {
	selectInput.style.outline = 'none'
})

// WebSql
// Initialize database
var db = openDatabase('dbvigel', '1.0', 'My Database', 2 * 1024 * 1024);

// Create table
db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, sobrenome TEXT, rg TEXT, cpf TEXT, sexo TEXT, nascimento TEXT, cep TEXT, bairro TEXT, rua TEXT, numero TEXT, cidade TEXT)'
	);
	
});

// Save data to database
function saveData() {
	if(validaData() &&
		  validacaoCPF() &&
		   validarRG() &&
		    validarNumeroCasa() &&
			 validarPrimeiroNome() &&
			  validarSegundoNome() &&
			   validarRua() &&
			    validarCidade() &&
				 validarBairro() &&
				  validarSexo()) {
		const nome = document.querySelector('#nome').value;
		const sobrenome = document.querySelector('#sobrenome').value;
		const rg = document.querySelector('#rg').value;
		const cpf = document.querySelector('#CPF').value;
		const sexo = document.querySelector('#sexo').value;
		const nascimento = document.querySelector('#nascimento').value;
		const cep = document.querySelector('#CEP').value;
		const bairro = document.querySelector('#bairro').value;
		const rua = document.querySelector('#rua').value;
		const numero = document.querySelector('#numero').value;
		const cidade = document.querySelector('#cidade').value;


	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO usuarios (nome, sobrenome, rg, cpf, sexo, nascimento, cep, bairro, rua, numero, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, sobrenome, rg, cpf, sexo, nascimento, cep, bairro, rua, numero, cidade], function (tx, res) {
			alert('User data saved successfully!');

			const table = document.getElementById('user-table');
					const row = table.insertRow();
					
					// Add data to columns
					const nameCell = row.insertCell();
					nameCell.textContent = nome;
					
					const emailCell = row.insertCell();
					emailCell.textContent = sobrenome;
					
					const rgCell = row.insertCell();
					rgCell.textContent = rg;

					const cpfCell = row.insertCell();
					cpfCell.textContent = cpf;

					const sexoCell = row.insertCell();
					sexoCell.textContent = sexo;

					const nascimentoCell = row.insertCell();
					nascimentoCell.textContent = nascimento;

					const cepCell = row.insertCell();
					cepCell.textContent = cep;

					const bairroCell = row.insertCell();
					bairroCell.textContent = bairro;

					const ruaCell = row.insertCell();
					ruaCell.textContent = rua;

					const numeroCell = row.insertCell();
					numeroCell.textContent = numero;

					const cidadeCell = row.insertCell();
					cidadeCell.textContent = cidade;

				document.querySelector('#user-table').classList.add('open')
		});
	});
	return false;

	} else {
		return false;
	}
}


