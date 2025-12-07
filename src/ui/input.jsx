import React from "react";

export default function Input({
	label,
	type = "text",
	value,
	onChange,
	options = [],
	name,
	placeholder,
	required,
	disabled,
	className = "",
}) {
	switch (type) {
		case "textarea":
			return (
				<div className='mb-3'>
					{label && <label>{label}</label>}
					<textarea
						value={value}
						onChange={e => onChange(e.target.value)}
						placeholder={placeholder || label}
						disabled={disabled}
						required={required}
						className={`form-control ${className}`}
					/>
				</div>
			);
		case "select":
			return (
				<div className='mb-3'>
					{label && <label>{label}</label>}
					<select
						value={value}
						onChange={e => onChange(e.target.value)}
						disabled={disabled}
						required={required}
						className={`form-control ${className}`}
					>
						<option value=''>{placeholder || `Select ${label}`}</option>
						{options.map((opt, i) => (
							<option key={i} value={opt.value || opt}>
								{opt.label || opt}
							</option>
						))}
					</select>
				</div>
			);

		case "checkbox":
			return (
				<div className='form-check mb-2'>
					<input
						type='checkbox'
						checked={value}
						onChange={e => onChange(e.target.checked)}
						className={`form-check-input ${className}`}
						disabled={disabled}
					/>
					<label className='form-check-label'>{label}</label>
				</div>
			);

		case "radio":
			return (
				<div className='mb-2'>
					{label && <strong>{label}</strong>}
					{options.map((opt, i) => (
						<div className='form-check' key={i}>
							<input
								className='form-check-input'
								type='radio'
								name={name}
								value={opt}
								checked={value === opt}
								onChange={() => onChange(opt)}
								disabled={disabled}
							/>
							<label className='form-check-label'>{opt}</label>
						</div>
					))}
				</div>
			);
		case "file":
			return (
				<div className='mb-3'>
					{label && <label>{label}</label>}
					<input
						type='file'
						onChange={e => onChange(e.target.files[0])} // ✔ FILE OBJECT KETADI
						disabled={disabled}
						required={required}
						className={`form-control ${className}`}
					/>
				</div>
			);

		default:
			return (
				<div>
					{label && <label>{label}</label>}
					<input
						type={type}
						value={value}
						onChange={e => onChange(e.target.value)}
						placeholder={placeholder || label}
						disabled={disabled}
						required={required}
						className={`form-control ${className}`}
					/>
				</div>
			);
	}
}
