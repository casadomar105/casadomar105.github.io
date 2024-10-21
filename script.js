<script>

document.getElementById('hospedes').addEventListener('keypress', function(event) {
    event.preventDefault(); // Previne a entrada de texto
});

document.getElementById('criancas').addEventListener('keypress', function(event) {
    event.preventDefault(); // Previne a entrada de texto
});



// Função formatar e validar Data

function formatarData(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (valor.length > 8) {
        valor = valor.slice(0, 8);
    }
    if (valor.length > 4) {
        valor = valor.replace(/(\d{2})(\d{2})(\d)/, '$1/$2/$3');
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
    }
    campo.value = valor;
}

function validarData(campo) {
    const dataPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    const dataError = document.getElementById('dataError');
    if (!dataPattern.test(campo.value)) {
        dataError.style.display = 'inline';
    } else {
        dataError.style.display = 'none';
    }
}

document.getElementById('nascimentoHospede').addEventListener('keypress', function(event) {
    if (isNaN(String.fromCharCode(event.which)) && String.fromCharCode(event.which) !== '/') {
        event.preventDefault(); // Previne a entrada de texto
    }
});


// Função Data Atual


 function formatarData(data) {
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
            const ano = data.getFullYear();
            return `${dia}${mes}${ano}`; // Sem barras
        }

        const data = new Date();
        document.getElementById('dataAtual').textContent = formatarData(data);



// Função formatar e validar CPF
 
function formatarCPF(campo) {
    let valor = campo.value.replace(/\D/g, '');
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
                 .replace(/(\d{3})(\d)/, '$1.$2')
                 .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    campo.value = valor;
}

function validarCPF(campo) {
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cpfError = document.getElementById('cpfError');
    if (!cpfPattern.test(campo.value)) {
        cpfError.style.display = 'inline';
    } else {
        cpfError.style.display = 'none';
    }
}

// Função formatar e validar CEP

function formatarCEP(campo) {
    let valor = campo.value.replace(/\D/g, '');
    if (valor.length > 8) {
        valor = valor.slice(0, 8);
    }
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    campo.value = valor;
}

function validarCEP(campo) {
    const cepPattern = /^\d{5}-\d{3}$/;
    const cepError = document.getElementById('cepError');
    if (!cepPattern.test(campo.value)) {
        cepError.style.display = 'inline';
    } else {
        cepError.style.display = 'none';
    }
}

// Função formatar e validar Telefone

function formatarTelefone(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    valor = valor.replace(/(\d{2})(\d)/, '($1) $2')
                 .replace(/(\d{5})(\d)/, '$1-$2');
    campo.value = valor;
}

function validarTelefone(campo) {
    const telefonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    const telefoneError = document.getElementById('telefoneError');
    if (!telefonePattern.test(campo.value)) {
        telefoneError.style.display = 'inline';
    } else {
        telefoneError.style.display = 'none';
    }
}

document.getElementById('telefoneHospede').addEventListener('keypress', function(event) {
    if (isNaN(String.fromCharCode(event.which))) {
        event.preventDefault(); // Previne a entrada de texto
    }
});

// Função validar Email

function validarEmail(campo) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');

    if (!emailPattern.test(campo.value)) {
        emailError.style.display = 'inline';
    } else {
        emailError.style.display = 'none';
    }
}



// Função para calcular o número de dias entre as datas de checkin e checkout  
function calcularNoites() {   
  const checkin = document.getElementById('checkin').value;   
  const checkout = document.getElementById('checkout').value;   
  const noites = document.getElementById('numNoites');   
   
  if (checkin && checkout) {   
   const dataCheckin = new Date(checkin);   
   const dataCheckout = new Date(checkout);   
   const diferenca = dataCheckout.getTime() - dataCheckin.getTime();   
   const noitesCalculadas = Math.round(diferenca / (1000 * 3600 * 24));   
   
   noites.value = noitesCalculadas;   
   atualizarDesconto(); // Chama a função atualizarDesconto() aqui  
   atualizarValorTotal(); // Chama a função atualizarValorTotal() aqui
  }   
}  

// Função para atualizar o valor da diária com base no número de hóspedes
function atualizarDiaria() {
    const hospedes = parseInt(document.getElementById('hospedes').value, 10);
    const diariaElement = document.getElementById('valorDiaria');

    if (hospedes >= 7 && hospedes <= 12) {
        const acrescimo = (hospedes - 6) * configuracoes.hospedeExtra;
        diariaElement.value = configuracoes.valorDiaria + acrescimo;
    } else {
        diariaElement.value = configuracoes.valorDiaria;
    }
    atualizarValorTotal();
}
  
// Função para atualizar o desconto  
function atualizarDesconto() {   
  const noites = document.getElementById('numNoites').value;   
  const desconto = document.getElementById('desconto');   
   
  if (noites) {   
   if (noites >= 7) {   
    desconto.value = 5;   
   } else {   
    desconto.value = 0;   
   }   
  } else {   
   desconto.value = '';   
  }   
}


// Regras do Calendário para mínimo de 2 noites  

document.getElementById('checkin').addEventListener('change', function() {
    var checkinDate = new Date(this.value);
    var checkoutDateInput = document.getElementById('checkout');
    
    if (checkinDate) {
      // Habilitar o campo de data de check-out
      checkoutDateInput.disabled = false;
      
      // Calcular a data mínima para o check-out (dois dias após o check-in)
      var minCheckoutDate = new Date(checkinDate);
      minCheckoutDate.setDate(minCheckoutDate.getDate() + 2);
      
      // Definir o valor mínimo do campo de data de check-out
      checkoutDateInput.min = minCheckoutDate.toISOString().split('T')[0];
    }
  });


// Adiciona evento de mudança nos campos de data para calcular as noites  

document.getElementById('checkin').addEventListener('change', calcularNoites);  
document.getElementById('checkout').addEventListener('change', calcularNoites);
  
// Bloqueia o campo "noite" para somente leitura  
document.getElementById('numNoites').readOnly = true;


// Função fomratar valor total em milhar 

function formatarValorTotal(valor) {
    // Converte para número flutuante
    valor = parseFloat(valor).toFixed(2);
    
    // Se não for um número válido, retorna zero
    if (isNaN(valor)) {
        return '0,00';
    }

    // Converte o ponto decimal para vírgula
    valor = valor.replace(".", ",");

    // Adiciona os pontos de milhar
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return valor;
}

 
// Função para atualizar o valor total 
 
function atualizarValorTotal() {
    const noites = document.getElementById('numNoites').value;
    const diaria = document.getElementById('valorDiaria').value;
    const desconto = document.getElementById('desconto').value;
    const taxaLimpeza = document.getElementById('taxaLimpeza').value;
    const valorTotal = document.getElementById('valorTotal');
    
    if (noites) {
        let valorTotalCalculado = noites * diaria;
        
        if (desconto >= 1) {
            valorTotalCalculado = valorTotalCalculado * (1 - (desconto / 100));
        }
        
        valorTotalCalculado = valorTotalCalculado + parseFloat(taxaLimpeza);
        
        // Formatar o valor total calculado
        valorTotal.value = formatarValorTotal(valorTotalCalculado.toFixed(2));
    } else {
        valorTotal.value = '0,00';
    }
}

  
// Chama a função ao alterar o valor de qualquer um dos campos  
document.getElementById('numNoites').addEventListener('onchange', atualizarValorTotal);  
document.getElementById('valorDiaria').addEventListener('onchange', atualizarValorTotal);  
document.getElementById('desconto').addEventListener('onchange', atualizarValorTotal);  
document.getElementById('taxaLimpeza').addEventListener('onchange', atualizarValorTotal);  
  
// Chama a função ao carregar a página  
atualizarValorTotal();

document.getElementById('taxaLimpeza').readOnly = true;


// Forma de Pagamento 

function toggleInputs(enable) {
  const numParcelasInput = document.getElementById('numParcelas');
  const valorParcelaInput = document.getElementById('valorParcela');

  numParcelasInput.disabled = !enable;
  if (enable) {
    numParcelasInput.value = 1;
    calcularValorParcela();
    numParcelasInput.addEventListener('keydown', function(event) {
      event.preventDefault(); // Previne a entrada de texto
    });
  } else {
    numParcelasInput.value = '';
    valorParcelaInput.value = '';
    numParcelasInput.removeEventListener('keydown', function(event) {
      event.preventDefault(); // Previne a entrada de texto
    });
  }
}

function calcularValorParcela() {
  const numParcelas = document.getElementById('numParcelas').value;
  let valorTotal = document.getElementById('valorTotal').value;

  // Remove pontos e converte vírgula para ponto para garantir que seja tratado como número
  valorTotal = valorTotal.replace(/\./g, '').replace(',', '.');
  valorTotal = parseFloat(valorTotal);

  const valorParcela = valorTotal / numParcelas;
  document.getElementById('valorParcela').value = isNaN(valorParcela) ? '' : valorParcela.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// Função Accordions e checkbox 

var accordions = document.getElementsByClassName("accordion");
        for (var i = 0; i < accordions.length; i++) {
            accordions[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }

        document.getElementById('reservaForm').addEventListener('submit', function(event) {
            var checkbox = document.getElementById('concordo');
            var termosError = document.getElementById('termosError');
            if (!checkbox.checked) {
                event.preventDefault();
                termosError.style.display = 'inline';
            } else {
                termosError.style.display = 'none';
            }
        });



function syncValues() {
    var taxaLimpezaConfig = document.getElementById('taxaLimpezaConfig').value;
    document.getElementById('taxaLimpeza').value = taxaLimpezaConfig;
  }

  // Para sincronizar o valor inicial
  window.addEventListener('DOMContentLoaded', (event) => {
    syncValues();
  });




// Função Configuração

const configuracoes = {
    valorDiaria: 600,   // atualizar valor da diária  
    hospedeExtra: 100, // atualizar valor do hóspede extra 
    taxaLimpeza: 250
};

function sincronizarTaxaLimpeza() {
    document.getElementById('taxaLimpeza').value = configuracoes.taxaLimpeza;
}

function mostrarPopup() {
    document.getElementById('configuracaoModal').style.display = 'block';
}

function fecharPopup() {
    document.getElementById('configuracaoModal').style.display = 'none';
}

function verificarSenha() {
    const senha = document.getElementById('senha').value;
    if (senha === 'casadomar@105') { // Substitua por sua senha real
        document.getElementById('configuracaoArea').style.display = 'none';
        document.getElementById('areaProtegida').style.display = 'block';
    } else {
        alert('Senha incorreta!');
    }
}


// Função para carregar configurações
function carregarConfiguracao() {
    document.getElementById('valorDiariaConfig').value = configuracoes.valorDiaria;
    document.getElementById('hospedeExtraConfig').value = configuracoes.hospedeExtra;
    document.getElementById('taxaLimpezaConfig').value = configuracoes.taxaLimpeza;
}

// Função para salvar configurações
function salvarConfiguracao() {
    configuracoes.valorDiaria = parseFloat(document.getElementById('valorDiariaConfig').value);
    configuracoes.hospedeExtra = parseFloat(document.getElementById('hospedeExtraConfig').value);
    configuracoes.taxaLimpeza = parseFloat(document.getElementById('taxaLimpezaConfig').value);

    document.getElementById('valorDiaria').value = configuracoes.valorDiaria;
    document.getElementById('taxaLimpeza').value = configuracoes.taxaLimpeza;
    alert('Configurações salvas com sucesso!');
}

// Chama a função ao alterar o valor do campo 'Hóspedes'
document.getElementById('hospedes').addEventListener('change', atualizarDiaria);

// Chama a função ao carregar a página
atualizarDiaria();


 // Gerar PDF

function gerarPDF() {   
  // Crie um objeto com os dados da reserva   
  const dadosReserva = {   
   nomeHospede: document.getElementById('nomeHospede').value,   
   nascimentoHospede: document.getElementById('nascimentoHospede').value,   
   cpfHospede: document.getElementById('cpfHospede').value,   
   enderecoHospede: document.getElementById('enderecoHospede').value,   
   complementoHospede: document.getElementById('complementoHospede').value,   
   cepHospede: document.getElementById('cepHospede').value,   
   bairroHospede: document.getElementById('bairroHospede').value,   
   cidadeHospede: document.getElementById('cidadeHospede').value,   
   estadoHospede: document.getElementById('estadoHospede').value,   
   paisHospede: document.getElementById('paisHospede').value,   
   telefoneHospede: document.getElementById('telefoneHospede').value,   
   emailHospede: document.getElementById('emailHospede').value,   
   checkin: document.getElementById('checkin').value,   
   checkout: document.getElementById('checkout').value,   
   numNoites: document.getElementById('numNoites').value,   
   numHospedes: document.getElementById('hospedes').value,   
   numCriancas: document.getElementById('criancas').value,   
   valorDiaria: document.getElementById('valorDiaria').value,   
   taxaLimpeza: document.getElementById('taxaLimpeza').value,   
   desconto: document.getElementById('desconto').value,   
   total: document.getElementById('valorTotal').value,   
   formaPagamento: document.querySelector('input[name="pagamento"]:checked').value,   
   numParcelas: document.getElementById('numParcelas').value,   
   valorParcela: document.getElementById('valorParcela').value   
  };   
   
  // Crie o conteúdo do PDF   
  const conteudoPDF = `   
   <h1>Reserva - Casa do Mar</h1>   
   <h2>Dados do Hóspede</h2>   
   <p>Nome: ${dadosReserva.nomeHospede}</p>   
   <p>Data de Nascimento: ${dadosReserva.nascimentoHospede}</p>   
   <p>CPF: ${dadosReserva.cpfHospede}</p>   
   <p>Endereço: ${dadosReserva.enderecoHospede}</p>   
   <p>Complemento: ${dadosReserva.complementoHospede}</p>   
   <p>CEP: ${dadosReserva.cepHospede}</p>   
   <p>Bairro: ${dadosReserva.bairroHospede}</p>   
   <p>Cidade: ${dadosReserva.cidadeHospede}</p>   
   <p>Estado: ${dadosReserva.estadoHospede}</p>   
   <p>País: ${dadosReserva.paisHospede}</p>   
   <p>Telefone: ${dadosReserva.telefoneHospede}</p>   
   <p>E-mail: ${dadosReserva.emailHospede}</p>   
   <h2>Dados da Locação</h2>   
   <p>Check-in: ${dadosReserva.checkin}</p>   
   <p>Check-out: ${dadosReserva.checkout}</p>   
   <p>Número de Noites: ${dadosReserva.numNoites}</p>   
   <p>Número de Hóspedes: ${dadosReserva.numHospedes}</p>   
   <p>Número de Crianças: ${dadosReserva.numCriancas}</p>   
   <p>Valor da Diária: ${dadosReserva.valorDiaria}</p>   
   <p>Taxa de Limpeza: ${dadosReserva.taxaLimpeza}</p>   
   <p>Desconto: ${dadosReserva.desconto}%</p>   
   <p>Total: ${dadosReserva.total}</p>   
   <h2>Forma de Pagamento</h2>   
   <p>Forma de Pagamento: ${dadosReserva.formaPagamento}</p>   
   <p>Número de Parcelas: ${dadosReserva.numParcelas}</p>   
   <p>Valor da Parcela: ${dadosReserva.valorParcela}</p>   
  `;   
   
  // Crie o PDF   
  const pdf = new jsPDF();   
  pdf.fromHTML(conteudoPDF);   
  pdf.save('reserva.pdf');   
}


 // Salvar JSON

function salvarJSON() {  
  const dadosReserva = {  
        nomeHospede: document.getElementById('nomeHospede').value,
        nascimentoHospede: document.getElementById('nascimentoHospede').value,
        cpfHospede: document.getElementById('cpfHospede').value,
        enderecoHospede: document.getElementById('enderecoHospede').value,
        complementoHospede: document.getElementById('complementoHospede').value,
        cepHospede: document.getElementById('cepHospede').value,
        bairroHospede: document.getElementById('bairroHospede').value,
        cidadeHospede: document.getElementById('cidadeHospede').value,
        estadoHospede: document.getElementById('estadoHospede').value,
        paisHospede: document.getElementById('paisHospede').value,
        telefoneHospede: document.getElementById('telefoneHospede').value,
        emailHospede: document.getElementById('emailHospede').value,
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        numNoites: document.getElementById('numNoites').value,
        numHospedes: document.getElementById('hospedes').value,
        numCriancas: document.getElementById('criancas').value,
        valorDiaria: document.getElementById('valorDiaria').value,
        taxaLimpeza: document.getElementById('taxaLimpeza').value,
        desconto: document.getElementById('desconto').value,
        total: document.getElementById('valorTotal').value,
        formaPagamento: document.querySelector('input[name="pagamento"]:checked').value,
        numParcelas: document.getElementById('numParcelas').value,
        valorParcela: document.getElementById('valorParcela').value
    };
  
  const json = JSON.stringify(dadosReserva);  
  const blob = new Blob([json], { type: 'application/json' });  
  const url = URL.createObjectURL(blob);  
  const a = document.createElement('a');  
  a.href = url;  
  a.download = 'reserva.json';  
  a.click();  
}


 // Carregar JSON

function carregarJSON() {
    const input = document.getElementById('arquivoJSON');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const json = event.target.result;
        const dadosReserva = JSON.parse(json); // Corrigir aqui: Parse o JSON

        document.getElementById('nomeHospede').value = dadosReserva.nomeHospede;
        document.getElementById('nascimentoHospede').value = dadosReserva.nascimentoHospede;
        document.getElementById('cpfHospede').value = dadosReserva.cpfHospede;
        document.getElementById('enderecoHospede').value = dadosReserva.enderecoHospede;
        document.getElementById('complementoHospede').value = dadosReserva.complementoHospede;
        document.getElementById('cepHospede').value = dadosReserva.cepHospede;
        document.getElementById('bairroHospede').value = dadosReserva.bairroHospede;
        document.getElementById('cidadeHospede').value = dadosReserva.cidadeHospede;
        document.getElementById('estadoHospede').value = dadosReserva.estadoHospede;
        document.getElementById('paisHospede').value = dadosReserva.paisHospede;
        document.getElementById('telefoneHospede').value = dadosReserva.telefoneHospede;
        document.getElementById('emailHospede').value = dadosReserva.emailHospede;
        document.getElementById('checkin').value = dadosReserva.checkin;
        document.getElementById('checkout').value = dadosReserva.checkout;
        document.getElementById('numNoites').value = dadosReserva.numNoites;
        document.getElementById('hospedes').value = dadosReserva.numHospedes;
        document.getElementById('criancas').value = dadosReserva.numCriancas;
        document.getElementById('valorDiaria').value = dadosReserva.valorDiaria;
        document.getElementById('taxaLimpeza').value = dadosReserva.taxaLimpeza;
        document.getElementById('desconto').value = dadosReserva.desconto;
        document.getElementById('valorTotal').value = dadosReserva.total;
        document.querySelector(`input[name="pagamento"][value="${dadosReserva.formaPagamento}"]`).checked = true;
        document.getElementById('numParcelas').value = dadosReserva.numParcelas;
        document.getElementById('valorParcela').value = dadosReserva.valorParcela;
    };

    reader.readAsText(file);
}


// Salvar XLSX (Planilha Excel)

function salvarExcel() {
            const dadosReserva = {
                nomeHospede: document.getElementById('nomeHospede').value,
                nascimentoHospede: document.getElementById('nascimentoHospede').value,
                cpfHospede: document.getElementById('cpfHospede').value,
                enderecoHospede: document.getElementById('enderecoHospede').value,
                complementoHospede: document.getElementById('complementoHospede').value,
                cepHospede: document.getElementById('cepHospede').value,
                bairroHospede: document.getElementById('bairroHospede').value,
                cidadeHospede: document.getElementById('cidadeHospede').value,
                estadoHospede: document.getElementById('estadoHospede').value,
                paisHospede: document.getElementById('paisHospede').value,
                telefoneHospede: document.getElementById('telefoneHospede').value,
                emailHospede: document.getElementById('emailHospede').value,
                checkin: document.getElementById('checkin').value,
                checkout: document.getElementById('checkout').value,
                numNoites: document.getElementById('numNoites').value,
                numHospedes: document.getElementById('hospedes').value,
                numCriancas: document.getElementById('criancas').value,
                valorDiaria: document.getElementById('valorDiaria').value,
                taxaLimpeza: document.getElementById('taxaLimpeza').value,
                desconto: document.getElementById('desconto').value,
                total: document.getElementById('valorTotal').value,
                formaPagamento: document.querySelector('input[name="pagamento"]:checked').value,
                numParcelas: document.getElementById('numParcelas').value,
                valorParcela: document.getElementById('valorParcela').value
            };

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet([dadosReserva]);
            XLSX.utils.book_append_sheet(wb, ws, "Reserva");

            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

            const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reserva.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            function s2ab(s) {
                const buf = new ArrayBuffer(s.length);
                const view = new Uint8Array(buf);
                for (let i = 0; i < s.length; i++) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                }
                return buf;
            }
        }




</script>
