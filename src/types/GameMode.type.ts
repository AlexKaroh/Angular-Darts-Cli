import { GameMode } from "src/enums/GameMode.enum";

export type GamemodeType = typeof GameMode[keyof typeof GameMode];