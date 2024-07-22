"use client"
const Page = (props): any => {
  const { children } = props;
  return (
    <div>
      <main className="main">
          {children}
      </main>
    </div>
  );
}

export default Page;