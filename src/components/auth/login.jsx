import React, { useEffect, useState } from "react";
import { Input, Image, Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuthFail, userAuthSeccess, userAuthStart } from "../../slice/auth";
import AuthService from "../../service/auth.service";

function Login() {
	const [email, setEmail] = useState("alex1@gmail.com");
	const [password, setPassword] = useState("123456");
	const [visible, setVisible] = useState(false);

	const { isLoading, isLogin, error } = useSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const SubmitData = async e => {
		e.preventDefault();
		dispatch(userAuthStart());
		const user = { email, password };
		console.log(user);
		try {
			const response = await AuthService.userLogin(user);
			console.log(response);

			dispatch(userAuthSeccess(response));
		} catch (error) {
			dispatch(userAuthFail(error.response.data));
		}
	};
	if (isLogin) navigate("/");
	return (
		<div
			style={{ height: "100vh" }}
			className='d-flex random_Image align-items-center text-center'
		>
			<div className='shadow rounded p-3 bg-light mx-auto w-25'>
				<form onSubmit={SubmitData} className='row'>
					<div className='col-12'>
						<Image circle />
						<h3 className='text-warning pb-3 text-dark text-center'>Sign In</h3>
						{error && (
							<p className='text-danger'>
								Error:{" "}
								{typeof error === "string"
									? error
									: error.message || JSON.stringify(error)}
							</p>
						)}
					</div>
					<div className='col-12'>
						<Input
							label='Email'
							value={email}
							onChange={v => setEmail(v)}
							required={true}
						/>
					</div>
					<div className='col-12'>
						<Input
							label='Password'
							type={visible ? "text" : "password"}
							required={true}
							value={password}
							onChange={v => setPassword(v)}
						/>
						<Input
							type='checkbox'
							style={{ cursor: "pointer" }}
							onChange={() => setVisible(!visible)}
						/>
					</div>
					<div className='col-12 mt-3 justify-content-around d-flex'>
						<Link
							className='btn btn-warning btn-outline-light border border-white-50 w-25'
							to={"/register"}
						>
							Register
						</Link>
						<Button
							className='btn btn-dark btn-outline-light border border-dark w-25'
							disabled={isLoading}
						>
							{isLoading ? "Login..." : "Login"}
						</Button>
					</div>{" "}
				</form>
			</div>
		</div>
	);
}

export default Login;
