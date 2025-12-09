import React, { useEffect, useState } from "react";
import { Basic, Button, Image, Input } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { userAuthFail, userAuthSeccess, userAuthStart } from "../../slice/auth";
import AuthService from "../../service/auth.service";
import { useNavigate } from "react-router-dom";

function Profile() {
	const { isLogin, user, error, isLoading } = useSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		username: user?.username || "",
		email: user?.email || "",
		phone: user?.phone || "",
		bio: user?.bio || "",
		// password: "",
		picture: null,
	});

	const handleChange = (field, value) => {
		setForm(prev => ({ ...prev, [field]: value }));
	};

	useEffect(() => {
		if (!isLogin) navigate("/login");
	}, [isLogin, navigate]);

	const submitHandler = async e => {
		e.preventDefault();
		dispatch(userAuthStart());

		try {
			const formData = new FormData();
			// Object.keys(form).forEach(key => {
			// 	if (form[key]) formData.append(key, form[key]);
			// });
			for (const [key, value] of Object.entries(form)) {
				if (key === "picture") {
					formData.append("picture", value);
				} else {
					formData.append(key, value);
				}
			}
			const response = await AuthService.putUser(formData);
			dispatch(userAuthSeccess(response));
		} catch (error) {
			dispatch(userAuthFail(error.response?.data || error.message));
		}
	};

	return (
		<Basic name='Profile' title='Your setting'>
			<form className='row' onSubmit={submitHandler}>
				<div className='col-12 mb-2 text-center'>
					<Image circle url={user?.pictureUrl} />
					<h3 className='text-warning pb-3 text-dark'>Profile</h3>
					{error && (
						<p className='text-danger'>
							Error:{" "}
							{typeof error === "string"
								? error
								: error.message || JSON.stringify(error)}
						</p>
					)}
				</div>

				<div className='col-lg-6 col-md-12'>
					<Input
						label='User name'
						value={form.username}
						required
						onChange={v => handleChange("username", v)}
					/>
				</div>

				<div className='col-lg-6 col-md-12'>
					<Input
						label='Email'
						value={form.email}
						required
						onChange={v => handleChange("email", v)}
					/>
				</div>

				<div className='col-lg-6 col-md-12'>
					<Input
						label='Phone'
						value={form.phone}
						required
						onChange={v => handleChange("phone", v)}
					/>
				</div>

				<div className='col-lg-6 col-md-12'>
					<Input
						disabled={true}
						label='Password'
						type='text'
						value={'for change password use "Forgot password" option'}
						onChange={v => handleChange("password", v)}
					/>
				</div>
				<div className='col-lg-6 col-md-12'>
					<Input
						label='Bio'
						value={form.bio}
						onChange={v => handleChange("bio", v)}
					/>
				</div>

				<div className='col-lg-6 col-md-12'>
					<Input
						type='file'
						label='Profile Image'
						required={false}
						onChange={file => handleChange("picture", file)}
					/>
				</div>

				<div className='col-12 mt-3 d-flex justify-content-center'>
					<Button
						type='submit'
						className='btn btn-dark w-25 btn-outline-light border border-dark'
						disabled={isLoading}
					>
						{isLoading ? "Saving..." : "Save"}
					</Button>
				</div>
			</form>
		</Basic>
	);
}

export default Profile;
