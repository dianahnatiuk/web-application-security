/*
 * Project:     web-application-security
 * File:        plantService.js
 * Author:      Діана Гнатюк
 * Created:     30.09.2026
 * Description: Сервіс з CRUD-логікою над списком рослин у пам'яті
 */

'use strict';

const Plant = require('../model/plant');

const plants = [];
let idCounter = 3;

plants.push(new Plant({
  id: '1',
  name: 'Monstera',
  description: 'Тропічна ліана з великим різьбленим листям',
  wateringIntervalDays: 7,
  lightLevel: 'Розсіяне світло',
}));
plants.push(new Plant({
  id: '2',
  name: 'Sansevieria',
  description: 'Невибаглива рослина, яка переносить посуху',
  wateringIntervalDays: 14,
  lightLevel: 'Півтінь',
}));
plants.push(new Plant({
  id: '3',
  name: 'Ficus Benjamina',
  description: 'Декоративне деревце з дрібним глянцевим листям',
  wateringIntervalDays: 5,
  lightLevel: 'Яскраве світло',
}));

function create(data) {
  idCounter += 1;
  const plant = new Plant({ ...data, id: String(idCounter) });
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
  return plant;
}

function remove(id) {
  const index = plants.findIndex((p) => p.id === id);
  if (index === -1) return false;
  plants.splice(index, 1);
  return true;
}

module.exports = { create, getAll, getById, update, remove };
