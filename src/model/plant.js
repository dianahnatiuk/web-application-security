/*
 * Project:     web-application-security
 * File:        plant.js
 * Author:      Діана Гнатюк
 * Created:     30.09.2026
 * Description: Модель кімнатної рослини
 */

'use strict';

class Plant {
  constructor({
                id, name, description, wateringIntervalDays, lightLevel,
                createdDate, createdBy, lastModifiedDate, lastModifiedBy, version,
              }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.wateringIntervalDays = wateringIntervalDays;
    this.lightLevel = lightLevel;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
    this.version = version;
  }
}

module.exports = Plant;