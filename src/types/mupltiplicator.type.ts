import { Mupltiplicator } from "src/enums/Mupltiplicator.enum";

export type MupltiplicatorType = typeof Mupltiplicator[keyof typeof Mupltiplicator];