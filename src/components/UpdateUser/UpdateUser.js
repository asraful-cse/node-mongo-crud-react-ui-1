import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

const UpdateUser = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});

	useEffect(() => {
		const url = `http://localhost:5000/users/${id}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, []);

	const handleNameChange = (e) => {
		const updateName = e.target.value;
		const userUpdate = { name: updateName, email: user.email };
		setUser(userUpdate);
	};
	const handleEmailChange = (e) => {
		const updateEmail = e.target.value;
		// const updateUser = { ...user };
		// updateUser.email = updateEmail;
		const updateUser = { email: updateEmail, name: user.name };
		setUser(updateUser);
	};
	const handleUpdateUser = (e) => {
		const url = `http://localhost:5000/users/${id}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					alert("updated Successfully.");
					setUser({}); // form ke clear korar jonno
				}
			});

		e.preventDefault();
	};
	return (
		<div>
			<h2>Update :: {user.name}</h2>
			<small>{id}</small>
			<br /> <br />
			<form onSubmit={handleUpdateUser}>
				<input
					type="text"
					name=""
					onChange={handleNameChange}
					value={user.name || ""}
					id=""
				/>
				<input
					type="email"
					name=""
					onChange={handleEmailChange}
					value={user.email || ""}
					id=""
				/>
				<input type="submit" value="updated" />
			</form>
		</div>
	);
};

export default UpdateUser;
