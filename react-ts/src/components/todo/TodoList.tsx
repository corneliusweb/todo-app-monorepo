import type { ITodo } from '../../types/index';
import TodoItem from './TodoItem';

type List = {
	todos: ITodo[];
};

const TodoList: React.FC<List> = ({ todos }) => {
	return (
		<div className='my-0 mx-auto'>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
};

export default TodoList;
