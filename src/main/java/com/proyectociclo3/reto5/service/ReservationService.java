package com.proyectociclo3.reto5.service;

import com.proyectociclo3.reto5.dao.ReservationRepository;
import com.proyectociclo3.reto5.entity.Client;
import com.proyectociclo3.reto5.entity.Motorbike;
import com.proyectociclo3.reto5.entity.Reservation;
import com.proyectociclo3.reto5.reports.ReservationAmount;
import com.proyectociclo3.reto5.reports.ReservationClient;
import com.proyectociclo3.reto5.reports.ReservationStatus;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return reservationRepository.save(reservation);
        } else {
            Optional<Reservation> co = reservationRepository.getReservation(reservation.getIdReservation());
            if (co.isEmpty()) {
                return reservationRepository.save(reservation);
            } else {
                return reservation;
            }
        }
    }

    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> e = reservationRepository.getReservation(reservation.getIdReservation());
            if (!e.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    e.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getClient() != null) {
                    e.get().setClient(reservation.getClient());
                }
                if (reservation.getMotorbike() != null) {
                    e.get().setMotorbike(reservation.getMotorbike());
                }
                reservationRepository.save(e.get());
                return e.get();
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }

    public boolean deleteReservation(int id) {
        Optional<Reservation> reservation = reservationRepository.getReservation(id);
        if (reservation.isEmpty()) {
            return false;
        } else {
            reservationRepository.delete(reservation.get());
            return false;
        }
    }

    public Date ParseFecha(String fecha) {
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");
        Date fechaDate = null;
        try {
            fechaDate = (Date) formato.parse(fecha);
        } catch (ParseException ex) {
            System.out.println(ex);
        }
        return fechaDate;
    }

    public List<ReservationAmount> getTotalReservationByDateService(String date1, String date2) {
        Date nuevoDate1 = ParseFecha(date1);
        Date nuevoDate2 = ParseFecha(date2);
        java.util.Date miNuevoDate1 = new java.util.Date(nuevoDate1.getTime());
        java.util.Date miNuevoDate2 = new java.util.Date(nuevoDate2.getTime());
        List<Object[]> report = reservationRepository.getTotalReservationByDate(miNuevoDate1, miNuevoDate2);
        List<ReservationAmount> res = new ArrayList<>();
        for (int i = 0; i < report.size(); i++) {
            res.add(new ReservationAmount((Integer) report.get(i)[0], (Date) report.get(i)[1], (Date) report.get(i)[2], (String) report.get(i)[3], (Motorbike) report.get(i)[4], (Client) report.get(i)[5], (String) report.get(i)[6]));
        }
        return res;
    }

    public static Map<String, Long> sortByValue(final Map<String, Long> myCount) {
        return myCount.entrySet()
                .stream()
                .sorted((Map.Entry.<String, Long>comparingByValue().reversed()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
    }

    public Map<String, Long> getTotalReservationByStatusService() {
        List<Object[]> report = reservationRepository.getTotalReservationByStatus();
        List<ReservationStatus> res = new ArrayList<>();
        for (int i = 0; i < report.size(); i++) {
            if (report.get(i)[0].equals("completed")) {
                res.add(new ReservationStatus((String) report.get(i)[0], (Long) report.get(i)[1], 0L));
            } else {
                res.add(new ReservationStatus((String) report.get(i)[0], 0L, (Long) report.get(i)[1]));
            }
        }

        HashMap<String, Long> miLista = new HashMap<>();

        for (int i = 0; i < res.size(); i++) {
            if (res.get(i).getStatus().equals("completed")) {
                miLista.put(res.get(i).getStatus(), res.get(i).getCompleted());
            } else {
                miLista.put(res.get(i).getStatus(), res.get(i).getCancelled());
            }
        }

        final Map<String, Long> miListaOrdenada = sortByValue(miLista);

        return miListaOrdenada;
    }
    
public List<ReservationClient> getTotalClientByTopService(){
        List<Object[]> report=reservationRepository.getTotalClientByTop();
        List<ReservationClient> res = new ArrayList<>();
        for (int i = 0; i < report.size(); i++) {
            res.add(new ReservationClient((Long) report.get(i)[0], (Client) report.get(i)[1]));
        }
        return res;
    }

}
