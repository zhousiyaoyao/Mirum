package com.example.demo.dao;

import com.example.demo.entity.Article;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
public class ArticleDaoTest {

    @Autowired
    private ArticleDao articleDao;

    @Test
    public void queryArticleById() {
        Article article = articleDao.queryArticleById(1);
        assertEquals("../../../image/shanghai.jpg", article.getUrl());
    }
}