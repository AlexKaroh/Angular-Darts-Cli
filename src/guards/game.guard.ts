import { inject } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { PlayerService } from 'src/services/players.service';

export const gameGuard = () => {
  const playerService = inject(PlayerService);
  const players$ = playerService.players$;

  return players$.pipe(
    map((players) => {
      if (players.length < 2) {
        return false;
      }
      return true;
    })
  );
};
