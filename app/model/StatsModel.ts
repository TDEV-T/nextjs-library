// To parse this data:
//
//   import { Convert, StatsModel } from "./file";
//
//   const statsModel = Convert.toStatsModel(json);

export type StatsModel = {
    book?:               number;
    member?:             number;
    borrow?:             number;
    borrowNotCompelete?: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStatsModel(json: string): StatsModel {
        return JSON.parse(json);
    }

    public static statsModelToJson(value: StatsModel): string {
        return JSON.stringify(value);
    }
}
