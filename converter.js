// Mapeamento de consoantes e vogais
const mapaConsoantes = {
  'b':'ㅂ','c':'ㅋ','d':'ㄷ','f':'ㅍ','g':'ㄱ','h':'ㅎ',
  'j':'ㅈ','k':'ㅋ','l':'ㄹ','m':'ㅁ','n':'ㄴ','p':'ㅍ',
  'q':'ㅋ','r':'ㄹ','s':'ㅅ','t':'ㅌ','v':'ㅂ','x':'ㅅ','z':'ㅈ'
};

const mapaVogais = {
  'a':'ㅏ','e':'ㅔ','i':'ㅣ','o':'ㅗ','u':'ㅜ','y':'ㅛ','w':'ㅝ'
};

// Função para substituir acentos por equivalentes
function normalizarPortugues(texto) {
  return texto
    .replace(/ã/g, 'a').replace(/Ã/g, 'A')
    .replace(/õ/g, 'o').replace(/Õ/g, 'O')
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
    .replace(/á/g, 'a').replace(/Á/g, 'A')
    .replace(/é/g, 'e').replace(/É/g, 'E')
    .replace(/í/g, 'i').replace(/Í/g, 'I')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ú/g, 'u').replace(/Ú/g, 'U')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove outros acentos
}

// Função que agrupa CVC
function converterParaHangul(texto) {
  texto = normalizarPortugues(texto); // normaliza antes de converter
  let resultado = "";
  let i = 0;

  while (i < texto.length) {
    const c = texto[i]?.toLowerCase();
    const v = texto[i+1]?.toLowerCase();
    const cf = texto[i+2]?.toLowerCase();

    if (mapaConsoantes[c] && mapaVogais[v] && mapaConsoantes[cf]) {
      // Consoante + Vogal + Consoante final → bloco completo
      resultado += Hangul.assemble([mapaConsoantes[c], mapaVogais[v], mapaConsoantes[cf]]);
      i += 3;
    } else if (mapaConsoantes[c] && mapaVogais[v]) {
      // Consoante + Vogal → bloco CV
      resultado += Hangul.assemble([mapaConsoantes[c], mapaVogais[v]]);
      i += 2;
    } else if (mapaConsoantes[c]) {
      // Consoante isolada → usa vogal neutra ㅡ
      resultado += Hangul.assemble([mapaConsoantes[c], 'ㅡ']);
      i++;
    } else if (mapaVogais[c]) {
      // Vogal isolada → usa ㅇ inicial
      resultado += Hangul.assemble(['ㅇ', mapaVogais[c]]);
      i++;
    } else {
      // Mantém espaços e pontuação
      resultado += texto[i];
      i++;
    }
  }

  return resultado;
}

function percorrer(elemento) {
  if (elemento.nodeType === Node.TEXT_NODE) {
    elemento.textContent = converterParaHangul(elemento.textContent);
  } else {
    elemento.childNodes.forEach(percorrer);
  }
}

percorrer(document.body);
