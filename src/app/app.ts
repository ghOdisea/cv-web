import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './layout/header/header';
import { About } from './sections/about/about';
import { Hero } from './sections/hero/hero';
import { Path } from './sections/path/path';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, Path],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
