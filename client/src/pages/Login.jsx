import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const Login = () => {
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [registerUser, { data, isError, isSuccess, isLoading }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, isError: loginError, isSuccess: loginSuccess, isLoading: loginLoading }] = useLoginUserMutation();

    // Handle input changes
    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setRegisterForm((prev) => ({ ...prev, [name]: value }));
        } else if (type === "login") {
            setLoginForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle form submission
    const fromSubmit = async (type) => {
        const formData = type === "signup" ? registerForm : loginForm;
        const action = type === 'signup' ? registerUser : loginUser;
        await action(formData);
    };

    return (
        <div className="pt-40 h-full flex items-center justify-center flex-col">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>Create Your Account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={registerForm.name}
                                    onChange={(e) => handleChange(e, "signup")}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={registerForm.email}
                                    onChange={(e) => handleChange(e, "signup")}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={registerForm.password}
                                    onChange={(e) => handleChange(e, "signup")}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => fromSubmit("signup")}>
                                {
                                    isLoading ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" />Please Wait..</> : "Register"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Login With Your Account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={loginForm.email}
                                    onChange={(e) => handleChange(e, "login")}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={loginForm.password}
                                    onChange={(e) => handleChange(e, "login")}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginLoading} onClick={() => fromSubmit("login")}>
                                {
                                    loginLoading ? <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </> : 'Login'
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Login;
