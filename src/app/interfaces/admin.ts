export interface Admin extends Document {
    image?: string; 
    fullName: string;
    email: string;
    password: string; 
    role: string; 
}