package com.proyectociclo3.reto5.dao;

import com.proyectociclo3.reto5.entity.Reservation;
import com.proyectociclo3.reto5.entity.ReservationCrud;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepository {

    @Autowired
    private ReservationCrud reservationCrudRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation reservation) {
        return reservationCrudRepository.save(reservation);
    }

    public void delete(Reservation reservation) {
        reservationCrudRepository.delete(reservation);
    }

    public List<Object[]> getTotalReservationByDate(Date date1, Date date2) {
        return reservationCrudRepository.totalReservationByDate(date1, date2);
    }

    public List<Object[]> getTotalReservationByStatus() {
        return reservationCrudRepository.totalReservationByStatus();
    }

    public List<Object[]> getTotalClientByTop() {
        return reservationCrudRepository.totalClientByTop();
    }

}
