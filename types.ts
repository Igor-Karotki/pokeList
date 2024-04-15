export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: any;
}
export interface Pokemon {
  item: {
    name: string;
    url: string;
  }
}