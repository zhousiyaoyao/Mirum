package com.example.demo.service;

import com.example.demo.entity.Spot;

import java.util.List;

public interface SpotService {
    List<Spot> getSpotList();
    Spot getSpotById(int spotId);
    List<Spot> getSpotByName(String[] spotName);
    boolean addSpot(Spot spot);
    boolean modifySpot(Spot spot);
    boolean deleteArea(int spotId);
}
