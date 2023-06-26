/**
 * TodoLogic
 * @package logic
 */

/**
 * 検索処理
 * 部分一致で検索する
 * @param {*} todoList
 * @param {*} keyword
 * @returns
 */

export const searchTodo = (todoList, keyword) => {
  todoList.filter((todo) => { // propsのtodoListからtodo配列を生成し、そこから条件を付けてfilterする
    const regexp = new RegExp("^" + keyword, "i"); // Regexpメソッドの引数に前方一致検索の条件を渡す
    return todo.title.match(regexp); // todoのタイトルが前方一致検索の条件と一致するか照合する
  });
}
