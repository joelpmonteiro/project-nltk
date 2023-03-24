const { removeStopWordsLib, tokenize } = require('./src/nltk');

const newTokenizeString = tokenize("qual é o nome das disciplinas que o nome do professor é igual a alex ?")
const newString = removeStopWordsLib(newTokenizeString)
console.log(newString)

//  Select |    atributo select   |  where | condição pesquisa | FROM
//[ "Qual",  "nome", "disciplina",  "que",   "nome",             "professor", "disciplina", "igual", "alex"]


