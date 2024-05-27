import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm_password: z.string().min(6, 'Confirm password must be at least 6 characters long'),
}).refine((values) => {
    return values.password === values.confirm_password;
},
{
    message: "Passwords must match!",
    path: ["confirmPassword"],
}
);

  export type SignupForm = z.infer<typeof signupSchema>;
