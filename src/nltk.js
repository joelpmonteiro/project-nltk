const Nltk = require('natural');
const { removeStopwords } = require('stopword')

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

console.log()


module.exports = { removeStopWordsLib, tokenize }