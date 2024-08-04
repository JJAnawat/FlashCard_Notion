export interface FlashCardProperties {
    example: string;
    meaning: string;
    pos: string;
    status: string;
    word: string;
    score: number;
}

export interface FlashCardData {
    id: string;
    properties: FlashCardProperties
}

export type MissCountsType = Record<string,number>;

export type ScoreCountsType = Record<string,number>;