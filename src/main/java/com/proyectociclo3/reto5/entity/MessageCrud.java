package com.proyectociclo3.reto5.entity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageCrud extends CrudRepository<Message, Integer> {
    
}
