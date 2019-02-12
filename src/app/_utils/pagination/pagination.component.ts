import { Component, Input, ChangeDetectionStrategy  } from '@angular/core';

@Component({
	selector: 'app-pagination',
	template: ``,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
	@Input('data') meals: string[] = [];
    page: number = 1;  

    onChanhePageLoadJs(){}  

    loadScript(url: string, id: string) {

	        let body = <HTMLDivElement> document.body;
            let script = document.createElement('script');
            script.setAttribute("id", id);
            script.innerHTML = '';
            script.src = url;
            script.async = true;
            script.defer = true;
            body.appendChild(script);
	 }

    unLoadScript( id: string ){
	 	var elem = document.getElementById(id);
    	return elem.parentNode.removeChild(elem);
	}
}