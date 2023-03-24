const { removeStopWordsLib, tokenize, create_query_select, create_query_select_two_table } = require('./src/nltk');

const newTokenizeString = tokenize("qual é o nome das disciplinas que o nome do professor é igual a alex ?");
const newString = removeStopWordsLib(newTokenizeString)
console.log(newString);
//===========================
const newTokenizeString2 = tokenize("qual é o nome do professor que o cpf é igual a 02509362160?")
const newString2 = removeStopWordsLib(newTokenizeString2)

const query = create_query_select_two_table(newString);
const query2 = create_query_select(newString2)
console.log(query)
console.log(query2)
//  Select |    atributo select   |  where | condição pesquisa | FROM
//[ "Qual",  "nome", "disciplina",  "que",   "nome",             "professor", "disciplina", "igual", "alex"]

// Select | atributo select |  from - table |  where | where -condição pesquisa |   from - table | where -condição pesquisa | value = ?
//['qual',      'nome',      'disciplinas',    'que',         'nome',               'professor',    'igual',                'alex']
