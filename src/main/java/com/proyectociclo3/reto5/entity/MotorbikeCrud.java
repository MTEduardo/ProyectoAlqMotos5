package com.proyectociclo3.reto5.entity;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotorbikeCrud extends CrudRepository<Motorbike, Integer> {
    
    @Query("SELECT m.category, Count(m.category) AS Cantidad FROM Motorbike AS m GROUP BY m.category ORDER BY Count(m.category) DESC")
    public List<Object[]> totalMotoByCat();
}
