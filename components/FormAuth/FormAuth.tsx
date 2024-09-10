"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";

const FormAuth = () => {
  const t = useTranslations("FormAuth");
  return (
    <Tabs defaultValue="signup" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">{t("signUpTab")}</TabsTrigger>
        <TabsTrigger value="signin">{t("signInTab")}</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Signup />
      </TabsContent>
      <TabsContent value="signin">
        <Signin />
      </TabsContent>
    </Tabs>
  );
};

export default FormAuth;
