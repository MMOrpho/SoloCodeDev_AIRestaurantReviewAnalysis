package com.restaurant.ai.review;

public class Review {
    private String reviewerName;
    private int rating;
    private String comments;

    public Review(String reviewerName, int rating, String comments) {
        this.reviewerName = reviewerName;
        this.rating = rating;
        this.comments = comments;
    }

    // Getters and Setters
    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String name) { this.reviewerName = name; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
}
