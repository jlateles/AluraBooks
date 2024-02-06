import { ConsultaCepService } from './../service/consulta-cep.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Directive({
  selector: '[ValidadorCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidandoCepDirective,
    multi: true
  }]
})

export class ValidandoCepDirective implements AsyncValidator {

  constructor( private consultacepService: ConsultaCepService) { }
  validate(control: AbstractControl):
  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const cep = control.value;

    return this.consultacepService.getConsultaCep(cep).pipe(
    map((resultado: any) => resultado.erro ? {'ValidadorCep' : true} : null
    ))
  }

}
