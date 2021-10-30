package com.proyectociclo3.reto5.reports;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proyectociclo3.reto5.entity.Category;

public class CategoryAmount {
    @JsonIgnore
    Category category;
    Long amountCategory;

    public CategoryAmount(Category category, Long amountCategory) {
        this.category = category;
        this.amountCategory = amountCategory;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getAmountCategory() {
        return amountCategory;
    }

    public void setAmountCategory(Long amountCategory) {
        this.amountCategory = amountCategory;
    }

}
