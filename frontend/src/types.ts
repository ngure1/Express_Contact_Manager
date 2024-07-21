export interface User {
	firstName: string;
	lastName: string;
	username?: string;
	email: string;
}
export interface Contact {
	owner?: Partial<User>;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email?: string;
}
