import { createUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { setAuth } from "@/redux/slices/user.slice";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);

  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const fullname = fullNameRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!fullname || !username || !password) {
      toast.error("All feilds required!");
      return;
    }

    try {
      setLoading(true);
      const userdata = await createUser({ fullname, username, password, gender });
      toast.success(userdata.message);
      dispatch(setAuth({ 
        fullname : userdata.fullname ,
        userId : userdata.userId ,
        username : userdata.username ,
        profilePicture : userdata.profilePicture
      }));
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="flex w-screen h-[calc(100dvh-60px)] justify-center items-center">
      <Card className="w-full max-w-sm relative bottom-8">
        <CardHeader className="w-full flex flex-col items-center">
          <CardTitle className="text-center">Create new account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Full name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="focus-visible:border focus-visible:ring-0"
                  ref={fullNameRef}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  className="focus-visible:border focus-visible:ring-0"
                  ref={usernameRef}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required className="focus-visible:border focus-visible:ring-0"
                  ref={passwordRef}
                />
              </div>
              <div className="grid gap-2">
                <RadioGroup value={gender} onValueChange={(value) => setGender(value)}>
                  <div className="flex items-center">
                    <Label htmlFor="password">Gender</Label>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="option-one" />
                      <Label htmlFor="option-one">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="option-two" />
                      <Label htmlFor="option-two">Female</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <Spinner /> : "Create Account"}
          </Button>
          <div className="flex justify-center items-center gap-1">
            <div className="text-muted-foreground text-sm">
              Already have an account ?
            </div>
            <Link to={'/signin'} className="flex">
              <Button variant="link" className="p-0" >Sign In</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
