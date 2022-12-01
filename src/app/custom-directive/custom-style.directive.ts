import { Directive, ElementRef, HostListener } from "@angular/core";
@Directive({
    selector: '[app-Custom-Style]'
})
export class CustomStyleDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.style.color = 'gray';
    }

    @HostListener('click') myClick() {
        console.log('clicked')
    }
}