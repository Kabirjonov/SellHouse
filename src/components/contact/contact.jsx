import React, { useState } from "react";
import { Basic, Button, Input } from "../../ui";
import { Head } from "../home";
import { toast } from "react-toastify";
function Contact() {
	const [loading, setLoading] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		// email send logic
		setLoading(false);
	};
	return (
		<>
			<Basic name='Contact Us' title='Get Help & Friendly Support'>
				<form className='px-2' onSubmit={handleSubmit}>
					<Head title='Fill up the form' classNameDiv='text-center' />
					<div className='row'>
						<div className='col-lg-6 col-sm-12 p-1'>
							<Input
								label='First Name'
								onChange={v => setFirstName(v)}
								value={firstName}
							/>
						</div>
						<div className='col-lg-6 col-sm-12 p-1'>
							<Input
								label='Last Name'
								onChange={v => setLastName(v)}
								value={lastName}
							/>
						</div>
						<div className='col-12 form-group p-1'>
							<Input
								label='Email address'
								type='email'
								onChange={v => setEmail(v)}
								value={email}
							/>
						</div>
						<div className='col-12 form-group p-1'>
							<Input
								label='Message'
								type='textarea'
								onChange={v => setMessage(v)}
								value={message}
							/>
						</div>
					</div>
					<Button disabled={loading}>{loading ? "Sending..." : "Send"}</Button>
				</form>
			</Basic>
		</>
	);
}

export default Contact;
