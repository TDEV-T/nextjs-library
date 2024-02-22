// To parse this data:
//
//   import { Convert, MemberModel } from "./file";
//
//   const memberModel = Convert.toMemberModel(json);

export type MemberModel = {
    data?: Datum[];
}

export type Datum = {
    m_user?:  string;
    m_name?:  string;
    m_pass?:  string;
    m_phone?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMemberModel(json: string): MemberModel {
        return JSON.parse(json);
    }

    public static memberModelToJson(value: MemberModel): string {
        return JSON.stringify(value);
    }
}
