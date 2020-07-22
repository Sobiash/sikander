import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><span i18n="@@copyrights">Copyrights protected</span>
      <b> <a href="https://www.azolver.com" target="_blank"> Azolver &trade;</a> </b> 2020</span>
    <div class="socials">
      <a href="https://github.com/Azolver" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/azolvercompany" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/search?q=%23azolver" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/azolver/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
