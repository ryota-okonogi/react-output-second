import { useState } from "react";
import { INIT_TODO_LIST } from "../../../constants/data.js";
import { TodoList } from "../../organisms/TodoList";
import styles from "./styles.module.css";

export const TodoTemplate = () => {
  // const [ todos, setTodos ] = useState(INIT_TODO_LIST);

  // データ定義TodoList
  const [ originTodoList, setOriginTodoList ] = useState(INIT_TODO_LIST);

  // 検索キーワード
  const [ searchKeyword, setSearchKeyword ] = useState("");

  // 表示用TodoList
  const [ showTodoList, setShowTodoList ] = useState(INIT_TODO_LIST);


  // 表示用Todoリスト更新処理
  // const updateShowTodoList = (newTodoList, keyword) => {
  //   setShowTodoList(
  //     /*
  //     keyword が空文字でない時
  //      = searchTodoに(newTodoList, keyword)を渡した処理結果を表示する
  //     そうでない場合 = newTodoListを表示する
  //     */
  //     keyword !== "" ? searchTodo(newTodoList, keyword) : newTodoList
  //   );
  // };

  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId);
      setOriginTodoList(newTodoList);

      // updateShowTodoList(newTodoList, searchKeyword);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        {showTodoList.length > 0 && (
          <TodoList
          todoList={showTodoList}
          handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </section>
    </div>
  );
};

/**
 * @表示
 * h1 = OK, <INIT_TODO_LIST /> = NG
 */

// <section> showTodoListの要素の数が「0」以上 かつ TodoListコンポーネントが実行された場合

/*

＜削除＞

  const handleDeleteTodo = (id) => {
    const newTodos = showTodoList.filter((todo) => {
      return todo.id !== id;
    });

    setShowTodoList(newTodos);
    setShowTodoList(newTodos);
  }

*/
