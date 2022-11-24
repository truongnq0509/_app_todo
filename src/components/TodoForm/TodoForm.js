import { useState, useRef } from 'react'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import classNames from "classnames/bind";
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import { addJob } from "../../store/reducers/todoSlice";

import styles from './TodoForm.module.css';

const cx = classNames.bind(styles)

function TodoForm({ theme }) {
	const [title, setTitle] = useState('')
	const inputRef = useRef()
	const dispatch = useDispatch()

	const options = {
		style: {
			fontSize: '1.6rem'
		},
		autoClose: 1200,
	}


	const handleAddJob = e => {
		e.preventDefault();

		if (title.trim() !== '') {
			const newJob = {
				id: nanoid(),
				title,
				completed: false
			}
			const action = addJob(newJob)
			dispatch(action)
			toast.success('Thanh cong !!!', options);
			setTitle('')
			inputRef.current.focus()
		} else {
			toast.error('Ko duoc de trong !!!', options);
		}

	}

	return (
		<form className={cx('wrapper', {
			[theme]: true
		})}>
			<input
				value={title}
				ref={inputRef}
				type="text"
				placeholder="Enter ..."
				className={cx('input')}
				onChange={e => setTitle(e.target.value)}
				onKeyUp={e => e.keyCode === 13 && handleAddJob}
			/>
			<button
				className={cx('button')}
				onClick={handleAddJob}
			>
				<FontAwesomeIcon icon={faPlus} />
			</button>
			<ToastContainer />
		</form>
	);
}

export default TodoForm;