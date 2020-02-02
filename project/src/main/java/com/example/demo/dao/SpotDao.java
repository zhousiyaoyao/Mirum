package com.example.demo.dao;

import com.example.demo.entity.Spot;

import java.util.List;

public interface SpotDao {
    List<Spot> querySpot();
    Spot querySpotById(int Spot);
    Spot querySpotByName(String Spot);
    int insertSpot(Spot spot);
    int updateSpot(Spot spot);
    int deleteSpot(int spot);
}
