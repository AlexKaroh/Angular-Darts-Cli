import { inject } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { PlayerService } from 'src/services/players.service';

export const playersResolver = () => {
  const playerService = inject(PlayerService);
  const players$ = playerService.players$;

  return players$.pipe(
    map((players) => {
      return players;
    })
  );
};
