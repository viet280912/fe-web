import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
			window.location.reload()
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<div className="login">
			<div className="wrapper">
				<form onSubmit={handleSubmit}>
					<h1>Login</h1>
					<div className="input-box">
						<input
							id="email"
							name="email"
							type="text"
							value={login.email}
							onChange={handleInputChange}
							placeholder="Email"
							required />
					</div>
					<div className="input-box">
						<input
							id="password"
							name="password"
							type="Password"
							placeholder="Password"
							value={login.password}
							onChange={handleInputChange}
							required />
					</div>
					<div className="remember-forgot">
						<label for="#"><input type="checkbox" />Remember me</label>
						<a href="#">Forgot password?</a>
					</div>
					<button className="btn" type="submit">Login</button>
					<div className="register-link">Don't have an account? <Link to={'/register'}>Register</Link></div>
				</form>
			</div>
		</div>
	)
}

export default Login
