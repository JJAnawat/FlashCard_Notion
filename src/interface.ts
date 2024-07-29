export interface FlashCardProperties {
    example: string;
    meaning: string;
    pos: string;
    status: string;
    word: string;
}

export interface FlashCardData {
    id: string;
    properties: FlashCardProperties
}

export type MissCountsType = Record<string,number>;