const Nltk = require('natural');
const { removeStopwords } = require('stopword')

const dbaCommand = {
    select: ['quem', 'qual', 'quanto'],
    where: ['que', 'qual'],
    sinal: ['igual']

}

const iaTrainingTable = ['cursos', 'curso', 'disciplina', 'disciplinas', 'aluno', 'alunos', 'professor', 'sala'];
const iaTrainingTable1 = [];
const iaAtributes = []
//(SELECT, FROM, WHERE, AND, =

//instancia a classe NLTK
const nltk_token = new Nltk.WordTokenizer();

//removendo stopwords - palavra chaves
function removeStopWordsLib(item) {
    const newString_nltk = removeStopwords(item, ['é', 'o', 'das', 'do', 'a']);
    return newString_nltk
}

function tokenize(item) {
    return nltk_token.tokenize(item)
}

function create_query_select_two_table(item) {
    let t = '';
    let nameTable = [];
    let atributoTable = [];
    let s, f, table, sinal;
    let valueWhere = "";

    if (item.length > 0) {
        valueWhere = item.at(-1)
    }

    const x = item.reduce((acc = '', value, item) => {

        let tt = ""
        if (dbaCommand.select.includes(value)) {
            s = 'SELECT'
        } else {
            if (!dbaCommand.where.includes(value) && !dbaCommand.sinal.includes(value)) {
                if (item != 2 && item != 5) {
                    if (!iaAtributes.includes(value))
                        iaAtributes.push(value)
                } else {
                    iaTrainingTable1.push(value)
                }

                if (iaTrainingTable1.length >= 2) {

                    tt = iaAtributes.reduce((acc, curr, value) => {
                        return `${iaTrainingTable1.reduce((acc, curr, value) => acc)}.${acc} FROM ${iaTrainingTable1.toString()}`
                    })
                    table = iaTrainingTable1.reduce((acc = "", curr, index) => {
                        return `${acc}.id_professor|${curr}.id AND ${curr}.${iaAtributes.reduce((acc, curr, value) => acc)}|`
                    })
                    table = table.replaceAll("|", " = ")

                }

            }

        }

        if (dbaCommand.sinal.includes(value)) {
            sinal = ' = '
        }

        if (dbaCommand.where.includes(value)) {
            f = 'WHERE'
        } else {

        }
        return `${s} ${tt} ${f} ${table}${valueWhere}`;
    }, {})

    return x

}

function create_query_select(item) {
    let t = '';
    let nameTable = [];
    let attribute = [];
    let s, f, where, table = "", atributoTable = "", sinal;
    let valueWhere = "";

    if (item.length > 0) {
        valueWhere = item.at(-1)
    }

    const x = item.reduce((acc = '', value, index) => {

        let tt = ""
        if (dbaCommand.select.includes(value)) {
            s = 'SELECT'

        } else if (iaTrainingTable.includes(value)) {
            table += value
        } else if (dbaCommand.where.includes(value)) {
            where = 'Where'
        } else if (dbaCommand.sinal.includes(value)) {
            sinal = ' ='
        } else if (value != valueWhere) {
            attribute.push(value);
            if (attribute.length > 0) {
                atributoTable = attribute.reduce((acc = '', curr, index) => curr);
            }
        }

        return `${s} ${table}.${atributoTable} FROM ${table} ${where} ${attribute.reduce((acc = '', curr, index) => curr, {})} ${sinal} ${valueWhere}`;
    }, {})
    return x;
}


module.exports = { removeStopWordsLib, tokenize, create_query_select, create_query_select_two_table }