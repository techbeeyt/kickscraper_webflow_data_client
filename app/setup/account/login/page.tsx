import LoginForm from "@/components/ui/forms/login";
import { getAccessToken } from "@/lib/webflow_utils";

export default async function Login({ params, searchParams }: any) {
  const code = searchParams?.code;
  let access_token;
  if (code) {
    access_token = await getAccessToken(code);
  }
  return (
    <main className="h-screen p-6 bg-contain bg-top bg-no-repeat bg-[url('/images/backgrounds/login-page-pattern.png')]">
      <div className="flex flex-col justify-between h-full">
        <div></div>
        <div className="flex justify-center items-center w-full">
          <div className="lg:w-[360px]">
            <div className="text-center mb-6">
              <h4 className="text-[#101828] text-3xl font-semibold">
                Welcome back
              </h4>
              <p className="text-[#475467]">
                Welcome back! Please enter your details.
              </p>
            </div>
            <LoginForm access_token={access_token as string} />
          </div>
        </div>
        <p className="mt-6 p-6 lg:p-0 text-center lg:text-left text-sm">
          &copy; KickScrapper {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
