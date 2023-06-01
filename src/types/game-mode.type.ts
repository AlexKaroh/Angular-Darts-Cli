import { GameMode } from "src/enums/game-mode";

export type GamemodeType = typeof GameMode[keyof typeof GameMode];