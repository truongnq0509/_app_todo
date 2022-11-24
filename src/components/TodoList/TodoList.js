import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import styles from './TodoList.module.css'
import { TodoForm } from '../TodoForm';
import { TodoItem } from '../TodoItem';
import { clearCompleted } from '../../store/reducers/todoSlice';

const cx = classNames.bind(styles)

const filters = ['all', 'active', 'completed']
const options = {
	style: {
		fontSize: '1.6rem'
	},
	autoClose: 1200,
}

function Todos() {
	const [type, setType] = useState(filters[0])
	const [theme, setTheme] = useState(() => {
		const themeStorage = JSON.parse(localStorage.getItem('theme'))
		return themeStorage || 'light'
	})
	const dispatch = useDispatch()
	const todos = useSelector(state => state.todos)

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme))
	}, [theme])


	const handleTheme = () => {
		if (theme === 'dark') {
			setTheme('light')
		} else {
			setTheme('dark')
		}
	}

	let length = null
	if (type === 'active') {
		length = todos.filter(todo => !todo.completed).length
	} else if (type === 'completed') {
		length = todos.filter(todo => todo.completed).length
	} else {
		length = todos.length
	}

	const handleClearCompleted = () => {
		const action = clearCompleted()
		dispatch(action)
		toast.success('Xoa thanh cong !!!', options)
	}

	return (
		<div className={cx('wrapper', {
			[theme]: true
		})}>
			<div className={cx('header')}>
				<h1 className={cx('title')}>Todo List</h1>
				<div
					className={cx('theme')}
					onClick={handleTheme}
				>
					{theme === 'light' && <FontAwesomeIcon icon={faMoon} className={cx('icon')} />}
					{theme === 'dark' && <FontAwesomeIcon icon={faLightbulb} className={cx('icon')} />}
				</div>
			</div>

			<TodoForm theme={theme} />

			<div className={cx('scroll')}>
				<TodoItem
					theme={theme}
					todos={todos}
					type={type}
				/>
			</div>

			{/* Filter */}
			<div className={cx('filters')}>
				<div className={cx('total')}>
					<strong>
						{length}
					</strong> items left
				</div>
				<div>
					{filters.map((item, index) => (
						<span
							className={cx('filter', {
								'active': type === item
							})}
							onClick={() => setType(item)}
							key={index}
						>
							{item[0].toUpperCase() + item.slice(1)}
						</span>
					))}
				</div>
				<div
					className={cx('clear')}
					onClick={handleClearCompleted}
				>
					Clear Completed
				</div>
			</div>
		</div>
	);
}

export default Todos;