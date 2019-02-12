import { Component } from '@angular/core';

import * as jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';  


@Component({
  selector: 'app-pdf-generator',
  template: ``,
  styleUrls: ['./pdf-generator.component.css'],
})
export class PdfGeneratorComponent  {

	public generatePDF(){  

		var data = document.getElementById('contentToConvert');  

		html2canvas(data).then(canvas => {  

			var imgWidth = 208;   
			var pageHeight = 295;    
			var imgHeight = canvas.height * imgWidth / canvas.width;  
			var heightLeft = imgHeight;  

			const contentDataURL = canvas.toDataURL('image/png')  
			// let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF  
			let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  

			pdf.setFontSize(12); 
			pdf.text("AAAAAAAAAAAAA", 10, 10);
			pdf.text("BBBBBBBBBBBBBBBBBB", 10, 10);
			pdf.text("BBBBBBBBBBBBBBBBBB", 80, 80);
			pdf.text("Invoice No", 30, 160);
			pdf.setFontSize(30); 
			pdf.text("Мартин Славов", 30, 190);
			var position = 30;  

			pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
			pdf.save('Invoice-1.pdf'); // Generated PDF   
		});  
	}  
}	