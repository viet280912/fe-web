import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../common/Header"
import payment from '../../assets/images/payment.svg'
import Paypal from '../common/Paypal'

const BookingSuccess = () => {
	const location = useLocation()
	const message = location.state?.message
	const error = location.state?.error
	const amount = location.state?.amount;
	return (
		<div className="container py-8">
			<Header title="Booking Success" />
			<div className="mt-5">
				{message ? (
					<div>
						<h3 className="text-success"> Booking Success!</h3>
						<p className="text-success">{message}</p>
					</div>
				) : (
					<div>
						<h3 className="text-danger"> Error Booking Room!</h3>
						<p className="text-danger">{error}</p>
						
					</div>
				)}
			</div>
			<div className="row">
				<div className="col-lg-4">
					<img src={payment} alt="payment" className="w-100" />
				</div>
				<div className="col-lg-8 d-flex align-items-start justify-content-center">
					<div className="text-center">
						<h2 className="text-2xl font-bold">Check out your booking</h2>
						<div className="mb-3">Your payment: <div className="text-danger">${amount}</div></div>
						<div>
							{amount && <Paypal amount={amount}/>}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookingSuccess
