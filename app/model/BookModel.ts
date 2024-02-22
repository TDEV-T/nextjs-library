// To parse this data:
//
//   import { Convert, BookData } from "./file";
//
//   const bookData = Convert.toBookData(json);

export type BookData = {
    data?: Datum[];
}

export type Datum = {
    b_id?: string;
    b_name?: string;
    b_writer?: string;
    b_category?: number;
    b_price?: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBookData(json: string): BookData {
        return JSON.parse(json);
    }

    public static bookDataToJson(value: BookData): string {
        return JSON.stringify(value);
    }
}
