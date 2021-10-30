package com.proyectociclo3.reto5.reports;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.proyectociclo3.reto5.entity.Client;
import com.proyectociclo3.reto5.entity.Motorbike;
import java.util.Date;

public class ReservationAmount {

    Integer idReservation;
    Date startDate;
    Date devolutionDate;
    String status;
    @JsonIgnoreProperties("reservations")
    Motorbike motorbike;
    @JsonIgnoreProperties({"messages", "reservations"})
    Client client;
    private String score;

    public ReservationAmount(Integer idReservation, Date startDate, Date devolutionDate, String status, Motorbike motorbike, Client client, String score) {
        this.idReservation = idReservation;
        this.startDate = startDate;
        this.devolutionDate = devolutionDate;
        this.status = status;
        this.motorbike = motorbike;
        this.client = client;
        this.score = score;
    }

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Motorbike getMotorbike() {
        return motorbike;
    }

    public void setMotorbike(Motorbike motorbike) {
        this.motorbike = motorbike;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

}
