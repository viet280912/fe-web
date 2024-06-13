import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"

const Registration = () => {
	const [registration, setRegistration] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ firstName: "", lastName: "", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<div className="login">
			<div className="wrapper">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			{successMessage && <p className="alert alert-success">{successMessage}</p>}
				<form onSubmit={handleRegistration}>
					<h1>Register</h1>
					<div className="input-box">
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={registration.firstName}
							onChange={handleInputChange}
							placeholder="First Name" />
					</div>
					<div className="input-box">
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={registration.lastName}
							onChange={handleInputChange}
							placeholder="Last Name" />
					</div>
					<div className="input-box">
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
							placeholder="Email" />
					</div>
					<div className="input-box">
						<input
							id="password"
							name="password"
							type="Password"
							placeholder="Password"
							value={registration.password}
							onChange={handleInputChange}
							required 
							/>
					</div>
					<button className="btn" type="submit">Register</button>
					<div className="register-link">Already have an account? <Link to={'/login'}>Login</Link></div>
				</form>
			</div>
		</div>
	)
}

export default Registration
