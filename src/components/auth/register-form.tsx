import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { register as userRegister } from "@/apis";
import { useToast } from "../ui/use-toast";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {

  const nameRef = React.useRef<HTMLInputElement>();
  const pubKeyRef = React.useRef<HTMLInputElement>();
  const emailRef = React.useRef<HTMLInputElement>();
  const passwordRef = React.useRef<HTMLInputElement>();

  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const submit = async () => {
    const resp = await userRegister(
      nameRef?.current?.value,
      pubKeyRef?.current?.value,
      emailRef?.current?.value,
      passwordRef?.current?.value
    );

    if (resp === 201) {
      toast.toast({title:"User Created"});
      navigate("/login");
    } else if (resp === 400) {
      toast.toast({title:"Info", description: "User already exists"});
    } else {
      toast.toast({title:"Info", description: "Something went wrong"});
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>

            <Input
              id="name"
              placeholder="Jhon"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              ref={nameRef}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Wallet Public Key
            </Label>

            <Input
              id="publickey"
              placeholder="0x...."
              type="text"
              autoCapitalize="none"
              autoComplete="publickey"
              autoCorrect="off"
              disabled={isLoading}
              ref={pubKeyRef}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              placeholder="jhon@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              ref={emailRef}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              ref={passwordRef}
            />
          </div>

          <Button disabled={isLoading} onClick={submit}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading && false}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
