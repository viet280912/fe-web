import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    FaUtensils,
    FaWifi,
    FaTv,
    FaWineGlassAlt,
    FaParking,
    FaCar,
    FaTshirt
} from "react-icons/fa";
import { getComment, getRoomById, postComment } from "../utils/ApiFunctions";
import RoomCarousel from "../common/RoomCarousel";
import RequireAuth from "../auth/RequireAuth";
import moment from 'moment';

const RoomInfo = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { roomId } = useParams();
    const userId = localStorage.getItem("userId");
    comments.sort((a, b) => new Date(b.time) - new Date(a.time));

    useEffect(() => {
        const fetchRoomAndComments = async () => {
            try {
                const roomResponse = await getRoomById(roomId);
                setRoomInfo(roomResponse);
                setIsLoading(false);

                const commentResponse = await getComment(roomId);
                setComments(commentResponse);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchRoomAndComments();
    }, [roomId]);

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (comment !== "") {
            postComment(userId, roomId, comment);
            setTimeout(() => {
                getComment(roomId)
                    .then((response) => {
                        setComments(response);
                    });
            }, 500);
            setComment('');
        }
    };

    const convertDateTime = (dateTimeString) => {
        return moment(dateTimeString).format("DD [tháng] MM, YYYY [lúc] HH:mm");
    };

    return (
        <div>
            <section className="container">
                <h1 style={{ textAlign: "center" }} className="mt-2">Room information</h1>
                <div style={{ display: "flex" }}>
                    <div className="justify-content-center" style={{ width: "100%" }}>
                        <div className="col-md-4 mt-2 mb-5" style={{ width: "100%" }}>
                            {isLoading ? (
                                <p>Loading room information...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <div className="room-info">
                                    <img
                                        src={`data:image/png;base64,${roomInfo.photo}`}
                                        alt="Room photo"
                                        style={{ width: "100%", height: "200px", objectFit: "contain" }}
                                    />
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Room Type:</th>
                                                <td>{roomInfo.roomType}</td>
                                            </tr>
                                            <tr>
                                                <th>Price per night:</th>
                                                <td>${roomInfo.roomPrice}</td>
                                            </tr>
                                            <tr>
                                                <th>Room Service:</th>
                                                <td>
                                                    <ul className="list-unstyled">
                                                        <li><FaWifi /> Wifi</li>
                                                        <li><FaTv /> Netflix Premium</li>
                                                        <li><FaUtensils /> Breakfast</li>
                                                        <li><FaWineGlassAlt /> Mini bar refreshment</li>
                                                        <li><FaCar /> Car Service</li>
                                                        <li><FaParking /> Parking Space</li>
                                                        <li><FaTshirt /> Laundry</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link to={`/book-room/${roomId}`} className="btn btn-hotel btn-sm">Book Now</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="justify-content-center" style={{ width: "100%" }}>
                        <div className="col-md-4 mt-2 mb-5" style={{ width: "100%" }}>
                            <h2 className="comment-title">Comments</h2>
                            {isLoading ? (
                                <p>Loading comments...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <div className="comment-section">
                                    <div className="new-comment">
                                        <input
                                            type="text"
                                            placeholder="Enter your comment..."
                                            value={comment}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <button className="btn-hotel" onClick={handleSubmit}>Send</button>
                                    </div>
                                    <br></br>
                                    <div className="comment-container">
                                        {comments.map((comment, index) => (
                                            <div key={index} className="comment">
                                                <div className="comment-header">
                                                    <h4 className="hotel-color">{comment.user.firstName} {comment.user.lastName}</h4>
                                                    <p className="comment-time">{convertDateTime(comment.time)}</p>
                                                </div>
                                                <p className="comment-content">{comment.content}</p>
                                                <p className="comment-text">{comment.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <RoomCarousel />
            </div>
        </div>
    );
};

export default RoomInfo;
