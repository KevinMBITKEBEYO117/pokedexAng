import { Pokemon } from '../pokemon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {

  searchTerms = new Subject<string>() //pour stocker les recherches succéssive de l'utilisateur
  pokemons$:Observable<Pokemon[]>

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(1),
      distinctUntilChanged(),
      switchMap((term)=>this.pokemonService.searchPokemonList(term))
    )
  }

  search(term:string){
    this.searchTerms.next(term)
  }

  goToDetail(pokemon:Pokemon){
    const link  = ['/pokemons', pokemon.id]
    this.router.navigate(link)
  }

}
