import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, output, ViewChild} from "@angular/core";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search',
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchService = inject(SearchService);
  private elRef = inject(ElementRef);
  toggleSearch = output<boolean>();

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.toggleSearch.emit(false);
    }
  };
}