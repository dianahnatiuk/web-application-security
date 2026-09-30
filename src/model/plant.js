/*
 * Project:     web-application-security
 * File:        plant.js
 * Author:      Діана Гнатюк
 * Created:     30.09.2026
 * Description: Модель кімнатної рослини
 */

'use strict';

class Plant {
  constructor({ id, name, description, wateringIntervalDays, lightLevel }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.wateringIntervalDays = wateringIntervalDays;
    this.lightLevel = lightLevel;
  }
}

module.exports = Plant;
