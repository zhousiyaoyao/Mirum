package com.example.demo.service.impl;

import com.example.demo.dao.ArticleDao;
import com.example.demo.entity.Article;
import com.example.demo.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Component
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleDao articleDao;

    @Override
    public Article getArticleById(int ArticleId) {
        return articleDao.queryArticleById(ArticleId);
    }
}
