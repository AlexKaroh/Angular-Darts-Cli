import { inject } from '@angular/core';
import { Player } from 'src/interfaces/players-data';
import { PlayerService } from 'src/services/players.service';

export const playersResolver = () => {

  const playerService = inject(PlayerService);
  const players$ = playerService.players$;
  let players: Player[] = [];
  players$.subscribe((playersData) => {
    players = playersData;
  })

  return players;
};
