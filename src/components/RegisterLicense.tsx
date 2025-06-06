"use client";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY!);

const RegisterLicense = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <>{children}</>;
};

export default RegisterLicense;
