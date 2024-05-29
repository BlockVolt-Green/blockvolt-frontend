import { isLoggedInAtom } from "@/atoms/auth";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();
  const [isLoggedin,] = useAtom(isLoggedInAtom);

  const handleSubmit = () => {

    if (isLoggedin) {
      navigate("/dashboard");
    } 
    else {
      navigate("/login");
    }

  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <section
        id="hero"
        className="relative flex flex-col text-center flex-auto justify-center items-center gap-16 h-screen w-screen"
      >
        <div className="overlay absolute z-10 top-0 bottom-0 left-0 right-0 h-full w-full bg-black"></div>

        <div className="flex flex-row gap-4">
          <SocialLink href="#">
            <Icons.fileIcon className="h-4 w-4" fill="white" color="white" />
            Carbon Tokens
          </SocialLink>

          <SocialLink href="#">
            <Icons.gitHub className="h-4 w-4" />
            Carbon Credits
          </SocialLink>
        </div>

        <h1 className="text-6xl capitalize z-20">
          Carbon Emission Tokenization
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Blockvolt
          </span>
        </h1>

        <p className="text-gray-400 text-2xl capitalize z-20">
          An platform to track people's carbon emission with power and security
          of blockchain.
        </p>
        <Button onClick={handleSubmit} className="z-10">
          Continue <Icons.arrowRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}

function SocialLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className="rounded-2xl bg-black hover:bg-white/20 text-white border border-[#4C4C4C] px-4 py-1.5 text-sm font-medium z-20 flex flex-row gap-2 items-center"
      href={href}
      target="_blank"
      rel="noreferer"
    >
      {children}
    </a>
  );
}
