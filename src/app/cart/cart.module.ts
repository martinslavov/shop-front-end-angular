import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';

import { PipesModule } from '../_pipes/pipes.module'

const publicApi = [CartComponent];

@NgModule({
	imports: [CommonModule, PipesModule],
	declarations: [publicApi],
	exports: [publicApi],
})
export class CartModule {}
