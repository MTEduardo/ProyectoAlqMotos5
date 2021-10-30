package com.proyectociclo3.reto5.reports;

import com.proyectociclo3.reto5.entity.Client;

public class ReservationClient {
    Long total;
    Client client;

    public ReservationClient(Long total, Client client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

}
