import { useState } from "react";
// import { InputForm } from "../../atoms/InputForm";
import { AddTodo } from "../../organisms/AddTodo";
import { TodoList } from "../../organisms/TodoList";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data.js";
import styles from "./styles.module.css";

export const TodoTemplate = () => {
  // データ定義TodoList
  const [ originTodoList, setOriginTodoList ] = useState(INIT_TODO_LIST);

  // 入力したタイトルを追加
  const [ addInputValue, setAddInputValue ] = useState("");

  // Todo採番ID
  const [ uniqueId, setUniqueId ] = useState(INIT_UNIQUE_ID);

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

  // addInputValueの変更処理(onChangeAddInputValue)
  const onChangeAddInputValue = (e) => setAddInputValue(e.target.value);

  // Todo新規登録処理(handleAddTodo)
  const handleAddTodo = (e) => {
    // Enterキーが押された時にTodoを追加
    if (e.key === "Enter" && addInputValue !== "") { // [条件] Enterキーを押すイベントが発生した時 + 入力値が空でない場合
      const nextUniqueId = uniqueId + 1 // nextUniqueId = 元の配列の要素数 + 1
      // Todo追加処理: 元の配列を破壊しないように配列のコピーを作成して、その値でstateを更新する
      // スプレッド構文を使用する
      const newTodoList = [
        ...originTodoList, // 元の配列を展開
        {
          id: nextUniqueId, // 元の配列に新規登録するTodoを足したid
          title: addInputValue, // 入力値がそのままタイトルになる
        },
      ];
      setOriginTodoList(newTodoList); // 新規登録によって追加したTodoを含めたものを新たな配列として生成する
    }
  };

  // Todo削除処理
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
        <AddTodo
          addInputValue={addInputValue}
          onChangeTodo={onChangeAddInputValue}
          handleAddTodo={handleAddTodo}
        />
      </section>
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
