module.exports = function check(str, bracketsConfig) {

    if (str === undefined) {
        return true;
    }
    if (str.length == 0) {
        return false;
    }

    let brackets = {}
    bracketsConfig.forEach((item, i) => { brackets[item[1]] = item[0]; }) // заполняем объект brackets шаблона
    let templBreckets = Object.keys(brackets) // массив ключей (закр скобок)

    // массив скобок одинаковых откр. и закр.
    let identicalBrackets = templBreckets.filter((item) => { return item == brackets[item]; })
    
    if (brackets == {}) { // объект шаблон
        return true;
    }

    const st = [];
    for (let i = 0; i < str.length; i++) {

      // одинаковые скобки, откр. и закр.
      let identBr  = isIdenticalBracket(brackets[str[i]], identicalBrackets);
      if ( identBr > -1 ) { // скобка входит в перечень одинаковых, откр. и закр.
          if (st[st.length - 1] != identicalBrackets[identBr]) { // если скобка открывающая (отсутствует в стеке)
              st.push(str[i]); // добавить ее в стек
              continue;
          }
      }

      // разные скобки, откр. и закр.
      if (isClosedBracket(str[i], templBreckets)) { // скобка закрывающая
        if (brackets[str[i]] !== st.pop()) return false; // для текущей закрывающей скобки, в стеке нет открывающей скобки
      } else {                                      // скобка открывающая
          st.push(str[i]); // добавить в стек открывающую скобку
      }
    }    
    return st.length === 0;

    function isClosedBracket(ch, templ) {
        return templ.indexOf(ch) > -1;
    }

    function isIdenticalBracket(ch, templ) {
        return templ.indexOf(ch);
    }
}

