import React, { useRef } from "react";

const AddUser = () => {
	const nameRef = useRef();
	const emailRef = useRef();
	const handleUserAdded = (e) => {
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const newUser = { name, email };
		fetch("http://localhost:5000/users", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					alert("success full added the user");
					e.target.reset(); // form ke clear rakhar jonno...
				}
			});

		e.preventDefault();
	};
	return (
		<div>
			<h2> Add User</h2>
			<form onSubmit={handleUserAdded}>
				<input type="text" name="name" ref={nameRef} placeholder="name" id="" />
				<input
					type="email"
					name="email"
					ref={emailRef}
					placeholder="email"
					id=""
				/>
				<input type="submit" value="add now" />
			</form>
		</div>
	);
};

export default AddUser;
