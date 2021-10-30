package com.proyectociclo3.reto5.reports;

public class ReservationStatus {
    String Status;
    Long completed;
    Long cancelled;

    public ReservationStatus(String Status, Long completed, Long cancelled) {
        this.Status = Status;
        this.completed = completed;
        this.cancelled = cancelled;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String Status) {
        this.Status = Status;
    }

    public Long getCompleted() {
        return completed;
    }

    public void setCompleted(Long completed) {
        this.completed = completed;
    }

    public Long getCancelled() {
        return cancelled;
    }

    public void setCancelled(Long cancelled) {
        this.cancelled = cancelled;
    }

}
