import { Component, Input } from '@angular/core';
import { ParticleData } from '../particle-data';

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-particle]',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.css'],
})
export class ParticleComponent {
  constructor() {
  }

  @Input() particle: ParticleData = null;
}
