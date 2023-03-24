const Nltk = require('natural');
const { removeStopwords } = require('stopword')

const dbaCommand = {
    select: ['quem', 'qual', 'quanto'],
    where: ['que', 'qual'],
    sinal: ['igual']

}

const iaTrainingTable = ['cursos', 'curso', 'disciplina', 'disciplinas', 'aluno', 'alunos', 'professor', 'sala'];
//const iaTrainingTable = [];
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

function create_query_select_one_table(item) {
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
    // for (let i = 0; i < item.length; i++) {
    //     if (dbaCommand.select.includes(item[i])) {
    //         t += 'SELECT '
    //     }
    //     else {
    //         if (dbaCommand.where.includes(item[i])) {
    //             t += 'WHERE';
    //         } else if (dbaCommand.sinal.includes(item[i])) {
    //             t = t + ` = `;
    //         }

    //         console.log(t)
    //         if (i === 1) {
    //             iaAtributes.push(item[i]);
    //             t += item[i] + ` `
    //         }
    //         if (i === 2) {
    //             nameTable = item[i]
    //             iaTrainingTable.push(nameTable)
    //             t += `from ${nameTable} `
    //         }
    //         if (i === 7) {
    //             iaAtributes.push(item[i]);
    //             t += item[i]
    //         }

    //         // if (i === 5) {
    //         //     iaTrainingTable.push(nameTable)
    //         //     nameTable = item[i]
    //         //     t += nameTable;
    //         // }

    //     }


    //     // if (dbaCommand.where.includes(item[i])) {
    //     //     t += 'WHERE ';
    //     // } else if (dbaCommand.sinal.includes(item[i])) {
    //     //     t = t + ` = `;

    //     // } 

    //     // else {
    //     //     atributoTable = item[i];
    //     //     console.log(item[i], i);

    //     //     t += item[i]
    //     // }




    //     // if (dbaCommand.where.includes(item[i])) {
    //     //     console.log('2:', item[i])
    //     // }
    // }
    console.log(x)

}

function create_query_select(item) {
    const x = item.reduce((acc = '', value, index) => {
        if (dbaCommand.select.includes(value)) {
            s = 'SELECT '
        }
        if (!dbaCommand.where.includes(value) && !dbaCommand.sinal.includes(value)) {
            if (item != 2 && item != 5) {
                if (!iaAtributes.includes(value))
                    iaAtributes.push(value)
            } else {
                iaTrainingTable.push(value)
            }

            if (iaTrainingTable.length >= 2) {

                tt = iaAtributes.reduce((acc, curr, value) => {
                    return `${iaTrainingTable.reduce((acc, curr, value) => acc)}.${acc} FROM ${iaTrainingTable.toString()}`
                })
                table = iaTrainingTable.reduce((acc = "", curr, index) => {
                    return `${acc}.id_professor|${curr}.id AND ${curr}.${iaAtributes.reduce((acc, curr, value) => acc)}|`
                })
                table = table.replaceAll("|", " = ")

            }

        }
        if (dbaCommand.sinal.includes(value)) {
            sinal = ' = '
        }

        if (dbaCommand.where.includes(value)) {
            f = 'WHERE'
        } else {

        }
        return `${s} ${table}.${atributoTable} FROM ${table} ${where} ${attribute.reduce((acc = '', curr, index) => curr, {})} ${sinal} ${valueWhere}`;

    }, {})

    console.log(x)
}

module.exports = { removeStopWordsLib, tokenize, create_query_select }