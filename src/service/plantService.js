/*
 * Project:     web-application-security
 * File:        plantService.js
 * Author:      Діана Гнатюк
 * Created:     30.09.2026
 * Description: Сервіс з CRUD-логікою над списком рослин у пам'яті
 */

'use strict';

const Plant = require('../model/plant');

const CURRENT_USER = 'admin';

const plants = [];
let idCounter = 3;

function now() {
  return new Date().toISOString();
}

function seed(data) {
  const date = now();
  plants.push(new Plant({
    ...data,
    createdDate: date,
    createdBy: CURRENT_USER,
    lastModifiedDate: date,
    lastModifiedBy: CURRENT_USER,
    version: 0,
  }));
}

seed({
  id: '1',
  name: 'Monstera',
  description: 'Тропічна ліана з великим різьбленим листям',
  wateringIntervalDays: 7,
  lightLevel: 'Розсіяне світло',
});
seed({
  id: '2',
  name: 'Sansevieria',
  description: 'Невибаглива рослина, яка переносить посуху',
  wateringIntervalDays: 14,
  lightLevel: 'Півтінь',
});
seed({
  id: '3',
  name: 'Ficus Benjamina',
  description: 'Декоративне деревце з дрібним глянцевим листям',
  wateringIntervalDays: 5,
  lightLevel: 'Яскраве світло',
});

function create(data) {
  idCounter += 1;
  const date = now();
  const plant = new Plant({
    ...data,
    id: String(idCounter),
    createdDate: date,
    createdBy: CURRENT_USER,
    lastModifiedDate: date,
    lastModifiedBy: CURRENT_USER,
    version: 0,
  });
  plants.push(plant);
  return plant;
}

function getAll() {
  return plants;
}

function getById(id) {
  return plants.find((p) => p.id === id);
}

function update(id, data) {
  const plant = getById(id);
  if (!plant) return undefined;
  plant.name = data.name;
  plant.description = data.description;
  plant.wateringIntervalDays = data.wateringIntervalDays;
  plant.lightLevel = data.lightLevel;
  plant.lastModifiedDate = now();
  plant.lastModifiedBy = CURRENT_USER;
  plant.version += 1;
  return plant;
}

function remove(id) {
  const index = plants.findIndex((p) => p.id === id);
  if (index === -1) return false;
  plants.splice(index, 1);
  return true;
}

module.exports = { create, getAll, getById, update, remove };