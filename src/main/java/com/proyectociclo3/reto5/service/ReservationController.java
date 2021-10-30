package com.proyectociclo3.reto5.service;

import com.proyectociclo3.reto5.entity.Reservation;
import com.proyectociclo3.reto5.reports.ReservationAmount;
import com.proyectociclo3.reto5.reports.ReservationClient;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/Reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservation() {
        return reservationService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int reservationId) {
        return reservationService.getReservation(reservationId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation) {
        return reservationService.save(reservation);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation) {
        return reservationService.update(reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") int reservationId) {
        reservationService.deleteReservation(reservationId);
    }

    @GetMapping("/report-dates/{date1}/{date2}")
    public List<ReservationAmount> getReportReservation(@PathVariable("date1") String date1, @PathVariable("date2") String date2) {
        return reservationService.getTotalReservationByDateService(date1, date2);
    }

    @GetMapping("/report-status")
    public Map<String, Long> getReportReservationStatus() {
        return reservationService.getTotalReservationByStatusService();
    }

    @GetMapping("/report-clients")
    public List<ReservationClient> getReportClient() {
        return reservationService.getTotalClientByTopService();
    }

}
