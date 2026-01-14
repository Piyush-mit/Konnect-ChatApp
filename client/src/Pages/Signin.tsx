import { loginUser } from "@/actions/user.actions";
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
import { Spinner } from "@/components/ui/spinner";
import { setAuth } from "@/redux/slices/user.slice";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const usernameInput = usernameRef.current?.value;
    const passwordInput = passwordRef.current?.value;

    if (!usernameInput || !passwordInput) {
      toast.error("All feilds required!");
      return;
    }

    try {
      setLoading(true);
      const { fullname, username, userId, profilePicture, message } = await loginUser({ usernameInput, passwordInput });
      toast.success(message);
      dispatch(setAuth({ fullname, username, userId, profilePicture }));
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
          <CardTitle className="text-center">Login to existing account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-3">
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
            {loading ? <Spinner /> : "Login"}
          </Button>
          <div className="flex justify-center items-center gap-1">
            <div className="text-muted-foreground text-sm">
              Don't have an account ?
            </div>
            <Link to={'/signup'} className="flex">
              <Button variant="link" className="p-0" >Sign up</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
