/*
 * Project:     web-application-security
 * File:        plantController.js
 * Author:      Діана Гнатюк
 * Created:     30.09.2026
 * Description: REST-контролер: 5 CRUD-роутів для рослин
 */

'use strict';

const express = require('express');
const plantService = require('../service/plantService');

const router = express.Router();

// GET /api/v1/plants - усі об'єкти
router.get('/', (req, res) => {
  res.json(plantService.getAll());
});

// GET /api/v1/plants/:id - один об'єкт
router.get('/:id', (req, res) => {
  const plant = plantService.getById(req.params.id);
  if (!plant) return res.status(404).end();
  res.json(plant);
});

// POST /api/v1/plants - створити
router.post('/', (req, res) => {
  res.status(201).json(plantService.create(req.body));
});

// PUT /api/v1/plants/:id - оновити
router.put('/:id', (req, res) => {
  const plant = plantService.update(req.params.id, req.body);
  if (!plant) return res.status(404).end();
  res.json(plant);
});

// DELETE /api/v1/plants/:id - видалити
router.delete('/:id', (req, res) => {
  if (!plantService.remove(req.params.id)) return res.status(404).end();
  res.status(204).end();
});

module.exports = router;
