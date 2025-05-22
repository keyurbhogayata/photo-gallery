
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Image } from '../modals/image';
import { IMAGES } from '../data/IMAGES';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let images = IMAGES;
    return {images};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(images: Image[]): number {
    return images.length > 0 ? Math.max(...images.map(image => image.id)) + 1 : 1;
  }
}