import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <div>
          <Link href={"/"} style={{ marginRight: "10px" }}>
            Home
          </Link>
          <Link href={"/posts"}>Posts</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
