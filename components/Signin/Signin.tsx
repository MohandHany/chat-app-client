"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { DOMAIN } from "@/constants/domain";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pathname = usePathname();
  const t = useTranslations("SignIn");
  const router = useRouter();
  const { toast } = useToast();
  const langPath = document.cookie.split("=")[1];

  const handleSignin = async () => {
    setLoading(true);
    if ((!username && !email) || !password) {
      toast({
        title: t("toaster.titleError"),
        description: t("toaster.messageEmptyFields"),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${DOMAIN}/api/user/signin`, {
        username: username ? username : undefined,
        email: email ? email : undefined,
        password,
      });
      setLoading(false);
      toast({
        title: t("toaster.titleSuccess"),
        description: t("toaster.messageSignIn"),
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: t("toaster.titleError"),
        description: t("toaster.messageError"),
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${pathname === "/ar" ? "text-right" : ""}`}>
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="username"
              className={`${pathname === "/ar" ? "text-right" : ""}`}
            >
              {t("username")} / {t("email")}
            </Label>
            <Input
              id="username"
              placeholder={t("inputPlaceholder")}
              className={`${pathname === "/ar" ? "text-right" : ""}`}
              onChange={(e) => {
                if (e.target.value.includes("@")) {
                  setEmail(e.target.value);
                  setUsername("");
                } else if (!e.target.value.includes("@")) {
                  setUsername(e.target.value);
                  setEmail("");
                }
              }}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="password"
              className={`${pathname === "/ar" ? "text-right" : ""}`}
            >
              {t("password")}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              className={`${pathname === "/ar" ? "text-right" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          dir={pathname === "/ar" ? "rtl" : "ltr"}
          disabled={loading}
          className="w-full"
          onClick={() => {
            handleSignin().then(() => router.replace(`${langPath}/chats`));
          }}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {t("button")}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Signin;
