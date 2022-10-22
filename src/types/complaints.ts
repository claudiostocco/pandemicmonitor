export type Complaint = {
    _id?: string;
    email: string;
    name: string;
    title: string;
    description: string;
};

export type Complaints = Complaint[];