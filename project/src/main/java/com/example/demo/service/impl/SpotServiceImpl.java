package com.example.demo.service.impl;

import com.example.demo.dao.SpotDao;
import com.example.demo.entity.Spot;
import com.example.demo.service.SpotService;
import com.sun.javafx.scene.control.skin.VirtualFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
public class SpotServiceImpl implements SpotService {

    @Autowired
    private SpotDao spotDao;

    @Override
    public List<Spot> getSpotList() {
        return spotDao.querySpot();
    }

    @Override
    public Spot getSpotById(int spotId) {
        return spotDao.querySpotById(spotId);
    }

    @Override
    public List<Spot> getSpotByName(String[] spotName) {
        List<Spot> spots = new ArrayList<>();
        for(int i=0; i<spotName.length;i++){
            String reg = "[^\u4e00-\u9fa5]";
            spotName[i] = spotName[i].replaceAll(reg, "");
            Spot spot = spotDao.querySpotByName(spotName[i]);
            spots.add(spot);
        }
        return spots;
    }

    @Transactional
    @Override
    public boolean addSpot(Spot spot) {
        if(spot.getSpotName() != null && !"".equals(spot.getSpotName())){
            try{
                int effectedNum = spotDao.insertSpot(spot);
                if(effectedNum > 0){
                    return true;
                }else{
                    throw new RuntimeException("failed");
                }
            }catch (Exception e){
                throw new RuntimeException("falied:" + e.getMessage());
            }
        }else{
            throw new RuntimeException("can not be empty");
        }
    }

    @Transactional
    @Override
    public boolean modifySpot(Spot spot) {
        if(spot.getID() != null && spot.getID() > 0){
            try{
                int effectedNum = spotDao.updateSpot(spot);
                if(effectedNum > 0){
                    return true;
                }else {
                    throw new RuntimeException("update failed!");
                }
            }catch (Exception e){
                throw new RuntimeException("update failed:" + e.toString());
            }
        }else{
            throw new RuntimeException("can not be empty");
        }
    }

    @Transactional
    @Override
    public boolean deleteArea(int spotId) {
        if(spotId > 0){
            try{
                int effectedNum = spotDao.deleteSpot(spotId);
                if(effectedNum > 0){
                    return true;
                }else{
                    throw new RuntimeException("删除地点失败！");
                }
            }catch (Exception e){
                throw new RuntimeException("删除地点失败：" + e.toString());
            }
        }else{
            throw new RuntimeException("地点ID不能为空！");
        }

    }
}
