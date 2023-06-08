import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/services/players.service';

export const gameGuard = () => {
  const playerService = inject(PlayerService);
  const router = inject(Router);
  const players$ = playerService.players$;

  players$.subscribe((players) => {
    if (players.length < 2) {
      router.navigate(['/error']);
      return false;
    }
    return true;
  });
};
