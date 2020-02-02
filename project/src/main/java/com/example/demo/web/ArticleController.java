package com.example.demo.web;

import com.example.demo.entity.Article;
import com.example.demo.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/superadmin")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping(value = "/getarticlebyid", method = RequestMethod.GET)
    private Map<String, Object> getArticleById(Integer ID){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Article article = articleService.getArticleById(ID);
        modelMap.put("article", article);
        return modelMap;
    }
}
