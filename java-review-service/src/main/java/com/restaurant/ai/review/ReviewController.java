package com.restaurant.ai.review;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
public class ReviewController {
    
    @GetMapping("/api/reviews")
    public List<Review> getReviews() {
        return Arrays.asList(
            new Review("John Doe", 2, "The food took 45 minutes to arrive and was cold. Terrible service."),
            new Review("Jane Smith", 5, "Amazing experience! The steak was cooked perfectly and the waiter was very attentive."),
            new Review("Alice Johnson", 3, "Decent pizza, but the restaurant was way too noisy and crowded.")
        );
    }
}
