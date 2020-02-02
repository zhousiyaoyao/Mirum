package com.example.demo.web;

import com.example.demo.entity.Spot;
import com.example.demo.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/superadmin")
public class SpotController {
    @Autowired
    private SpotService spotService;

    @RequestMapping(value = "/listspot", method = RequestMethod.GET)
    private Map<String, Object> listSpot(){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Spot> list = spotService.getSpotList();
        modelMap.put("spotList", list);
        return modelMap;
    }

    @RequestMapping(value = "/getareabyid", method = RequestMethod.GET)
    private Map<String, Object> getSpotById(Integer ID){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Spot spot = spotService.getSpotById(ID);
        modelMap.put("spot", spot);
        return modelMap;
    }

    @RequestMapping(value = "/getareabyname", method = RequestMethod.GET)
    private Map<String, Object> getSpotByName(String[] name){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Spot> list = spotService.getSpotByName(name);
        modelMap.put("spot", list);
        return modelMap;
    }

    @RequestMapping(value = "/addspot", method = RequestMethod.POST)
    private Map<String, Object> addSpot(@RequestBody Spot spot){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", spotService.addSpot(spot));
        return modelMap;
    }

    @RequestMapping(value = "/modifyspot", method = RequestMethod.POST)
    private Map<String, Object> modifySpot(@RequestBody Spot spot){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", spotService.modifySpot(spot));
        return modelMap;
    }

    @RequestMapping(value = "/removespot", method = RequestMethod.GET)
    private Map<String, Object> removeSpot(Integer ID){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", spotService.deleteArea(ID));
        return modelMap;
    }
}
