// To parse this data:
//
//   import { Convert, BorrowModel } from "./file";
//
//   const borrowModel = Convert.toBorrowModel(json);

export type BorrowModel = {
  data?: Datum[];
  status?: boolean;
  message?: string;
};

export type Datum = {
  br_date_br?: string;
  br_date_rt?: string;
  m_user?: string;
  b_id?: string;
  br_fine?: number;
  user?: User;
  book?: Book;
};

export type Book = {
  b_id?: string;
  b_name?: string;
  b_writer?: string;
  b_category?: number;
  b_price?: number;
};

export type User = {
  m_user?: string;
  m_name?: string;
  m_pass?: string;
  m_phone?: string;
};

// Converts JSON strings to/from your types
export class Convert {
  public static toBorrowModel(json: string): BorrowModel {
    return JSON.parse(json);
  }

  public static borrowModelToJson(value: BorrowModel): string {
    return JSON.stringify(value);
  }
}
