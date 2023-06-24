export const TodoList = (props) => {
  /*
    props(↓)は TodoTemplate(src/components/templates/TodoTemplate/index.jsx)から渡ってくる
    todoList={showTodoList}
    handleDeleteTodo={handleDeleteTodo}
  */

  // ↓propsであることを定義
  const { todoList } = props;

  return (
    <ul className={styles.list}>
      {todoList.map((todo) => (
        <li key={todo.id} className={styles.todo}>
          <span className={styles.task} >{todo.title}</span>
        </li>
      ))}
    </ul>
  )
}
