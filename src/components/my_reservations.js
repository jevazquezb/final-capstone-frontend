import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchReservationsFromServer, removeReservations } from '../redux/reservations/reservations';
import { fetchModelsAsync } from '../redux/models/models';
import '../styles/my_reservations.css';

function MyReservations() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.current_user.user);
  useEffect(() => {
    dispatch(fetchReservationsFromServer(user.id));
    dispatch(fetchModelsAsync());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations.reservations);
  const bikes = useSelector((state) => state.models);
  const handleDelete = (id) => {
    dispatch(removeReservations({ id, user_id: user.id }));
  };
  console.log(reservations);

  return (
    <div className="res-container">
      <div className="title"><h1>My Reservations</h1></div>

      {reservations.length !== 0 ? reservations.map((reservation) => {
        const bike = bikes.find((bike) => bike.id === reservation.bike_id);
        return (
          <div className="card" key={reservation.id}>
            <div className="bike-info">
              <h2>
                City:
                <span>{' '}</span>
                {reservation.location}
              </h2>
              {bike
                ? (
                  <h2>
                    Bike Model:
                    <span>{' '}</span>
                    {bike.model}
                  </h2>
                )
                : <p /> }
              <h2>
                Start Date:
                <span>{' '}</span>
                {moment(reservation.start_date).utc().format('YYYY-MM-DD')}
              </h2>
              <h2>
                End Date:
                <span>{' '}</span>
                {moment(reservation.end_date).utc().format('YYYY-MM-DD')}
              </h2>
              <div className="delete-reservation">
                <button className="delete-btn" type="button" onClick={() => handleDelete(reservation.id)}>Delete</button>
              </div>
            </div>
            <div className="bike-cont">
              {bike
                ? (
                  <img
                    src={bike.photo}
                    alt="model"
                    className="bike-photo"
                  />
                )
                : <p /> }
            </div>
          </div>
        );
      })
        : <h2>No reservations</h2>}
    </div>
  );
}

export default MyReservations;
