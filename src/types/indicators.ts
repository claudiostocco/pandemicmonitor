export type Indicator = {
    _id?: string;
    date: string;
    contaminated: number;
    cured: number;
    deaths: number;
};

export type Indicators = Indicator[];