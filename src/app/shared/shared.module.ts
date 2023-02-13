import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';

const MATERIAL = [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
]

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL
    ],
    exports: [
        ...MATERIAL
    ]
})
export class SharedModule { }

