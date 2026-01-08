import React, { useState } from 'react';
import './RegistrationForm.sass';
import registrationSchema from '../schemas/registrationSchema';
import z from 'zod';

export default function RegistrationForm() {
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);
		const formDataObject = Object.fromEntries(formData.entries());

		const result = registrationSchema.safeParse(formDataObject);

		if (result.success) {
			setErrors({});
			alert('New user successfully created');
		} else {
			const seeErrors = z.treeifyError(result.error);
			console.log(seeErrors.properties);

			setErrors(seeErrors.properties);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="registration-form">
			<fieldset className="registration-form__fieldset">
				<legend className="registration-form__legend"></legend>
				<label className="registration-form__label">
					<span className="registration-form__text">Username</span>
					<input
						type="text"
						name="userName"
						className="registration-form__input"
						autoComplete="username"
					/>
					<ul className="registration-form__error-list">
						{errors.userName?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">First name</span>
					<input
						type="text"
						name="firstName"
						className="registration-form__input"
						autoComplete="given-name"
					/>
					<ul className="registration-form__error-list">
						{errors.firstName?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Last name</span>
					<input
						type="text"
						name="lastName"
						className="registration-form__input"
						autoComplete="family-name"
					/>
					<ul className="registration-form__error-list">
						{errors.lastName?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">E-mail</span>
					<input
						type="email"
						name="email"
						className="registration-form__input"
						autoComplete="email"
					/>
					<ul className="registration-form__error-list">
						{errors.email?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Password</span>
					<input
						type="password"
						name="password"
						className="registration-form__input"
						autoComplete="new-password"
					/>
					<ul className="registration-form__error-list">
						{errors.password?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Confirm password</span>
					<input
						type="password"
						name="confirmPassword"
						className="registration-form__input"
						autoComplete="new-password"
					/>
					<ul className="registration-form__error-list">
						{errors.confirmPassword?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Date of birth</span>
					<input
						type="date"
						name="birthday"
						className="registration-form__input"
						autoComplete="bday"
					/>
					<ul className="registration-form__error-list">
						{errors.birthday?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">
						Phone number (Optional)
					</span>
					<input
						type="tel"
						name="phone"
						className="registration-form__input"
						autoComplete="tel"
					/>
					<ul className="registration-form__error-list">
						{errors.phone?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Address</span>
					<input
						type="text"
						name="address"
						className="registration-form__input"
						autoComplete="street-address"
					/>
					<ul className="registration-form__error-list">
						{errors.address?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Zip code</span>
					<input
						type="number"
						name="zip"
						className="registration-form__input"
						autoComplete="postal-code"
					/>
					<ul className="registration-form__error-list">
						{errors.zip?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Country</span>
					<input
						type="text"
						name="country"
						className="registration-form__input"
						autoComplete="country"
					/>
					<ul className="registration-form__error-list">
						{errors.country?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label-newsletter">
					<span className="registration-form__text">Newsletter</span>
					<input
						type="checkbox"
						name="newsletter"
						className="registration-form__checkbox"
					/>
					<ul className="registration-form__error-list">
						{errors.newsletter?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
				<label className="registration-form__label">
					<span className="registration-form__text">Profile text</span>
					<textarea
						className="registration-form__textarea"
						name="profileText"
					/>
					<ul className="registration-form__error-list">
						{errors.profileText?.errors.map((message, index) => (
							<li key={index}>{message}</li>
						))}
					</ul>
				</label>
			</fieldset>
			<button className="registration-form__button">Sign up</button>
		</form>
	);
}
