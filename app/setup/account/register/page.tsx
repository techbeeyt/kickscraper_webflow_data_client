import RegisterForm from "@/components/RegisterForm";

export default function Page() {
  return (
    <main className="lg:h-screen p-6">
      <div className="flex flex-col lg:justify-between h-full">
        <div className="flex overflow-auto justify-center items-center py-4">
          <div className="w-[360px]">
            <div className="text-left pt-8 mb-6">
              <h4 className="text-[#101828] text-3xl font-semibold">Sign up</h4>
              <p className="text-[#475467]">Start your 30-day free trial.</p>
            </div>
            <RegisterForm />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center p-6 lg:p-0 gap-2 text-sm">
          <p>&copy; KickScrapper {new Date().getFullYear()}</p>
          <a
            href="mailto:help@kickscrapper.com"
            className="flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            help@kickscrapper.com
          </a>
        </div>
      </div>
    </main>
  );
}
