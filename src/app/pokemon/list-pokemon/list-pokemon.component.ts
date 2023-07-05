import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss'],
})
export class ListPokemonComponent implements OnInit {
  pokemonsList: Pokemon[];
  constructor(private router: Router, private pokemonService: PokemonService) {}

  pokemonSelected: Pokemon | undefined;

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemonList =>this.pokemonsList= pokemonList ) 
  }
  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemons', pokemon.id]);
  }
}
