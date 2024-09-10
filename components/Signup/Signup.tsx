"use client";
import { useTranslations } from "next-intl";
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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { DOMAIN } from "@/constants/domain";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<any>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const t = useTranslations("SignUp");
  const router = useRouter();
  const { toast } = useToast();
  const langPath = document.cookie.split("=")[1];

  const uploadProfilePic = async () => {
    setUploadLoading(true);
    const file = new FormData();
    file.append("profilePic", profilePic);

    try {
      const response = await axios.post(
        `${DOMAIN}/api/upload/profile-pic`,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadLoading(false);
      toast({
        title: t("toaster.titleSuccess"),
        description: t("toaster.messageUpload"),
        variant: "default",
        duration: 3000,
      });
      return response.data.imageUrl;
    } catch (error) {
      setUploadLoading(false);
      toast({
        title: t("toaster.titleError"),
        description: t("toaster.messageUpload"),
        variant: "destructive",
        duration: 3000,
      });
      return null;
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: t("toaster.titleError"),
        description: t("toaster.messageEmptyFields"),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: t("toaster.titleError"),
        description: t("toaster.messageConfirmPassword"),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    try {
      await axios.post(`${DOMAIN}/api/user/signup`, {
        username,
        email,
        password,
        profileUrl: profilePicUrl ? profilePicUrl : undefined,
      });
      setLoading(false);
      toast({
        title: t("toaster.titleSuccess"),
        description: t("toaster.messageSignUp"),
        variant: "default",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: t("toaster.titleError"),
        description: t("toaster.messageUploadError"),
        variant: "destructive",
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
              {t("username")}
            </Label>
            <Input
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("usernamePlaceholder")}
              className={`${pathname === "/ar" ? "text-right" : ""}`}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="email"
              className={`${pathname === "/ar" ? "text-right" : ""}`}
            >
              {t("email")}
            </Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={`${pathname === "/ar" ? "text-right" : ""}`}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("passwordPlaceholder")}
              className={`${pathname === "/ar" ? "text-right" : ""}`}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="confirmPassword"
              className={`${pathname === "/ar" ? "text-right" : ""}`}
            >
              {t("confirmPassword")}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("confirmPasswordPlaceholder")}
              className={`${pathname === "/ar" ? "text-right" : ""}`}
            />
          </div>
          <div
            className={`${
              pathname === "/ar" ? "text-right" : ""
            } flex items-end gap-4`}
            dir={pathname === "/ar" ? "rtl" : "ltr"}
          >
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="profilePicture"
                className={`${pathname === "/ar" ? "text-right" : ""}`}
              >
                {t("profilePic")}
              </Label>
              <Input
                id="profilePicture"
                onChange={(e) => setProfilePic(e.target.files![0])}
                type="file"
                className={`${pathname === "/ar" ? "text-right" : ""}`}
              />
            </div>
            <div className="flex flex-1">
              <Button
                disabled={uploadLoading || !profilePic}
                dir={pathname === "/ar" ? "rtl" : "ltr"}
                className="w-full flex items-center justify-center"
                onClick={() => {
                  uploadProfilePic().then((url) => {
                    setProfilePicUrl(url);
                  });
                }}
              >
                {uploadLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
                {t("uploadButton")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          dir={pathname === "/ar" ? "rtl" : "ltr"}
          disabled={loading}
          onClick={() => {
            handleSignup().then(() => router.replace(`${langPath}/chats`));
          }}
          className="w-full"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
          {t("button")}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Signup;
