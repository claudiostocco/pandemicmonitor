export type CollectionPlace = {
    _id?: string;
    address: string;
    neighborhood: string;
    time: string;
    obs?: string;
    latitude?: string;
    longitude?: string;
};

export type CollectionPlaces = CollectionPlace[];