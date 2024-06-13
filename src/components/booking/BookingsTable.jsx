import { parseISO } from "date-fns"
import React, { useState, useEffect } from "react"
import DateSlider from "../common/DateSlider"
import * as XLSX from 'xlsx'
import { getAllBookings } from "../utils/ApiFunctions"
import moment from 'moment'

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
	const [filteredBookings, setFilteredBookings] = useState(bookingInfo)
	const [searchValue, setSearchValue] = useState("")

	const filterBookings = (startDate, endDate) => {
		let filtered = [...bookingInfo];

		if (startDate && endDate) {
			filtered = bookingInfo.filter((booking) => {
				const bookingStarDate = parseISO(booking.checkInDate)
				const bookingEndDate = parseISO(booking.checkOutDate)
				return (
					bookingStarDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
				)
			})
		}
		setFilteredBookings(filtered)
		console.log(bookingInfo)
	}


	useEffect(() => {
		setFilteredBookings(bookingInfo)
	}, [bookingInfo])

	useEffect(() => {
		const sortedBookings = [...filteredBookings].sort((a, b) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);
			return dateB - dateA;
		});
		setFilteredBookings(sortedBookings);
	}, [filteredBookings]);

	const confirmCancellation = (bookingId) => {
		const confirmed = window.confirm("Are you sure you want to cancel this booking?");
		if (confirmed) {
			handleBookingCancellation(bookingId);
		}
	};

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value)
	}

	useEffect(() => {
		setFilteredBookings(bookingInfo.filter((booking) =>
			booking.guestName.toLowerCase().includes(searchValue.toLowerCase()) ||
			booking.bookingConfirmationCode.toLowerCase().includes(searchValue.toLowerCase())
		))
	}, [searchValue, bookingInfo])


	const exportToExcel = (data, fileName) => {
		const ws = XLSX.utils.json_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
		XLSX.writeFile(wb, `${fileName}.xlsx`);
	};

	const handleOnClickExport = async () => {
		try {
			const res = await getAllBookings({
				type: 'BOOKINGS',
				limit: '',
				offset: '',
				keyword: '',
			});
			if (res && res.errCode === 0) {
				exportToExcel(res.data, 'listbookings');
			} else {
				console.error('Error exporting data');
			}
		} catch (error) {
			console.error('Error exporting data:', error);
		}
	};


	return (
		<section className="p-4">
			<DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
			{/* <button className="btn btn-primary" onClick={handleOnClickExport}>Export to Excel</button> */}
			<div className="mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Search by Guest Name or Confirmation Code"
					value={searchValue}
					onChange={handleSearchChange}
				/>
			</div>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Created At</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check-In Date</th>
						<th>Check-Out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guest</th>
						<th>Confirmation Code</th>
						<th>Total Price</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking, index) => (
						<tr key={booking.id}>
							<td>{index + 1}</td>
							<td>{booking.createdAt ? moment(booking.createdAt).format('DD/MM/YYYY HH:mm') : 'null'}</td>
							<td>{booking.id}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{booking.checkInDate}</td>
							<td>{booking.checkOutDate}</td>
							<td>{booking.guestName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.totalNumOfGuests}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td>${booking.totalPrice ? booking.totalPrice.toString() : 'N/A'}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => confirmCancellation(booking.id)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filterBookings.length === 0 && <p> No booking found for the selected dates</p>}
		</section>
	)
}

export default BookingsTable
