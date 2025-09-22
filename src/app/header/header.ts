import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  searchQuery: string = '';

    constructor(private router: Router) {}

    onSearch() {
      if (this.searchQuery.trim()) {
        this.router.navigate(['/buscar'], {
          queryParams: { query: this.searchQuery.trim() }
        });
      }
    }
}
