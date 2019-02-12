import { Component } from '@angular/core';
import { Options, ChangeContext, PointerType  } from 'ng5-slider';


@Component({
	selector: 'app-filter-slider',
	templateUrl: './filter-slider.component.html',
	styleUrls: ['./filter-slider.component.css']
})
export class FilterSliderComponent {
	minValue: number = 0;
	maxValue: number = 1000;
	logText: string = '';
	
	options: Options = {
		getSelectionBarColor: (value: number): string => {
			if (value <= 500)
				return 'orange';
		          
			return '#dc3545';
		},
		getPointerColor: (value: number): string => {
			return '#dc3545';
		},
		floor: 0,
		ceil: 10000,
		translate: (value: number): string => {
		  return '€' + value;
		},
		combineLabels: (minValue: string, maxValue: string): string => {
		  return 'from ' + minValue + ' up to ' + maxValue;
		}
	};

	onUserChange(changeContext: ChangeContext): void {
		this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
	}

	getChangeContextString(changeContext: ChangeContext): string {
		return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
		   `value: ${changeContext.value}, ` +
		   `highValue: ${changeContext.highValue}}`;
	}
}