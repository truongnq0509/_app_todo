import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { markComplete, deleteJob, editJob } from '../../store/reducers/todoSlice';
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import classNames from "classnames/bind";

import styles from './TodoItem.module.css'

const cx = classNames.bind(styles)
const options = {
	style: {
		fontSize: '1.6rem'
	},
	autoClose: 1200,
}

function TodoItem({ todos, theme, type }) {
	const [title, setTitle] = useState('')
	const [indexEdit, setIndexEdit] = useState('')
	const inputRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	const handleCompleted = id => {
		const action = markComplete(id)
		dispatch(action)
	}

	const handleDeleteJob = id => {
		const action = deleteJob(id)
		dispatch(action)
		toast.success('Xoa thanh cong', options)
	}

	const showEditForm = (e, id) => {
		e.target.classList.add('active')
		const job = todos.find(todo => todo.id === id)
		setTitle(job.title)
		setIndexEdit(id)
	}

	switch (type) {
		case 'active':
			todos = todos.filter(todo => !todo.completed)
			break;
		case 'completed':
			todos = todos.filter(todo => todo.completed)
			break;
		default:
			break;
	}

	const handleEditJob = id => {
		const job = todos.find(todo => todo.id === id)
		if (title.trim() !== '') {
			const newJob = {
				...job,
				id,
				title
			}
			const action = editJob(newJob)
			dispatch(action)
			setIndexEdit('')
			toast.success('Sua thanh cong !!!', options)
		} else {
			toast.error('Ko duoc de trong !!!', options)
		}
	}

	return (
		<>
			{todos.length > 0 ? todos.map(todo => (
				<div className={cx('todo-item', {
					[theme]: true
				})} key={todo.id}>
					<div className={cx('content')}>
						<input
							type="checkbox"
							checked={todo.completed}
							className={cx('check')}
							onChange={() => handleCompleted(todo.id)}
						/>
						<span
							className={cx('title', {
								'completed': true,
								'active': indexEdit === todo.id
							})}
							onDoubleClick={e => showEditForm(e, todo.id)}
						>
							{todo.title}
						</span>
						<input
							value={title}
							ref={inputRef}
							onChange={e => setTitle(e.target.value)}
							onBlur={() => handleEditJob(todo.id)}
							type="text"
							className={cx('edit')}
						/>
					</div>
					<div className={cx('action')}>
						<FontAwesomeIcon
							icon={faDeleteLeft}
							className={cx('icon')}
							onClick={() => handleDeleteJob(todo.id)}
						/>
					</div>
				</div>
			)) : (<h1 style={{ color: theme === 'dark' ? '#fff' : '#1E1F25' }}> Nothing </h1>)}

		</>
	);
}

TodoItem.propTypes = {
	theme: PropTypes.string.isRequired,
}

export default TodoItem;