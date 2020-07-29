import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomButtonComponent } from './bottom-button/bottom-button.component';


@NgModule({
    declarations: [
        BottomButtonComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
    ],
    exports: [
        BottomButtonComponent
    ]
})
export class ComponentesModule { }