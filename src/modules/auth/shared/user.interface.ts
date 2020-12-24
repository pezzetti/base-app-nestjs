export type UserAuth = {
    email: string;
    userId: string;
};

export type AuthenticatedUser = {
    id: string;
    email: string;
};

export type TokenPayload = {
    sub: string;
    email: string;
};
