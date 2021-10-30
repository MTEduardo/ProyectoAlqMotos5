package com.proyectociclo3.reto5.entity;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationCrud extends CrudRepository<Reservation, Integer> {

    @Query("SELECT r.idReservation, r.startDate, r.devolutionDate, r.status, r.motorbike, r.client, r.score FROM Reservation As r WHERE r.startDate Between :date1 And :date2")
    public List<Object[]> totalReservationByDate(Date date1, Date date2);
    
    @Query("SELECT r.status, Count(r.status) As completed FROM Reservation As r GROUP BY r.status ORDER BY Count(r.status) DESC")
    public List<Object[]> totalReservationByStatus();
    
    @Query("SELECT Count(r.client), r.client AS total FROM Reservation As r GROUP BY r.client")
    public List<Object[]> totalClientByTop();

}
