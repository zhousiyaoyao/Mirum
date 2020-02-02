package com.example.demo.dao;

import com.example.demo.entity.Spot;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpotDaoTest {
    @Autowired
    private SpotDao spotDao;

    @Test
    public void querySpot() {
        List<Spot> spotList = spotDao.querySpot();
        assertEquals(2,spotList.size());
    }

    @Test
    public void querySpotById() {
        Spot spot = spotDao.querySpotById(1);
        assertEquals("上海", spot.getSpotName());
    }

    @Test
    public void querySpotByName() {
        List<Spot> spots = new ArrayList<>();
        String[] spotName = {"上海", "武汉", "海口"};
        for(int i=0; i<spotName.length;i++){
            Spot spot = spotDao.querySpotByName(spotName[i]);
            spots.add(spot);
        }
        assertEquals(3, spots.size());
    }

    @Test
    public void insertSpot() {
        Spot spot = new Spot();
        spot.setSpotName("南昌");
        spot.setLatitude(2);
        spot.setLongitude(3);
        spot.setID(3);
        int num = spotDao.insertSpot(spot);
        assertEquals(1,num);
    }

    @Test
    public void updateSpot() {
        Spot spot = new Spot();
        spot.setSpotName("樟树");
        spot.setID(3);
        int num = spotDao.updateSpot(spot);
        assertEquals(1,num);
    }

    @Test
    public void deleteSpot() {
        int num = spotDao.deleteSpot(3);
        assertEquals(1,num);
    }
}