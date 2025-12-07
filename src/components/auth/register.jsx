import { Input, Image, Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userAuthFail, userAuthSeccess, userAuthStart } from "../../slice/auth";
import AuthService from "../../service/auth.service";
import { validatePhoneNumber } from "../../helpers/validatePhoneNumber";
function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, isLogin, error } = useSelector(state => state.auth);
	const [visible, setVisible] = useState(false);
	// 📌 Universal form state
	const [form, setForm] = useState({
		username: "John Doe",
		email: "alex@gmail.com",
		phone: "+99892 333 45 67",
		password: "123456",
	});
	// 📌 Submit funktsiya
	const handleChange = (field, value) =>
		setForm(prev => ({ ...prev, [field]: value }));

	// 📌 Submit funktsiya
	const submitHandler = async e => {
		e.preventDefault();
		if (!validatePhoneNumber(form.phone)) {
			alert("Phone number is invalid");
			return;
		}
		const formData = new FormData();
		for (const [key, value] of Object.entries(form)) {
			if (key === "picture") {
				formData.append("picture", value);
			} else {
				formData.append(key, value);
			}
		}
		dispatch(userAuthStart());
		try {
			const data = await AuthService.userRegister(formData);
			dispatch(userAuthSeccess(data));
		} catch (error) {
			dispatch(userAuthFail(error.response?.data));
		}
	};

	useEffect(() => {
		if (isLogin) navigate("/");
	}, [isLogin]);

	return (
		<div
			style={{ height: "100vh" }}
			className='d-flex random_Image align-items-center text-center'
		>
			<div className='shadow rounded p-3 bg-light mx-auto w-50'>
				<form onSubmit={submitHandler} className='row'>
					<div className='col-12 mb-2'>
						<Image circle />
						<h3 className='text-warning pb-3 text-dark text-center'>Sign Up</h3>
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
							required={true}
							name='username'
							value={form.username}
							onChange={v => handleChange("username", v)}
						/>
					</div>

					<div className='col-lg-6 col-md-12'>
						<Input
							label='Email'
							value={form.email}
							onChange={v => handleChange("email", v)}
							required={true}
						/>
					</div>

					<div className='col-lg-6 col-md-12'>
						<Input
							label='Phone'
							value={form.phone}
							onChange={v => handleChange("phone", v)}
							required={true}
						/>
					</div>
					<div className='col-lg-5 col-md-12 '>
						<Input
							label='Password'
							type={visible ? "text" : "password"}
							value={form.password}
							onChange={v => handleChange("password", v)}
							required={true}
						/>
					</div>
					<div className='col-lg-1 col md-1 d-flex align-items-center'>
						<Input
							type='checkbox'
							style={{ cursor: "pointer" }}
							onChange={() => setVisible(!visible)}
						/>
					</div>
					<div className='col-12'>
						<Input
							type='file'
							label='Profile Image'
							onChange={file => handleChange("picture", file)}
						/>
					</div>
					<div className='col-12 mt-3 justify-content-around d-flex'>
						<Link
							className='btn btn-warning btn-outline-light border border-white-50 w-25'
							to={"/login"}
						>
							Login
						</Link>
						<Button
							className='btn btn-dark btn-outline-light border border-dark w-25'
							disabled={isLoading}
						>
							{isLoading ? "Registering..." : "Register"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
