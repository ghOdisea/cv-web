import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
