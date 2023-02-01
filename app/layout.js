import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <div>
          <div>
            <Link href={"/"} style={{ marginRight: "10px" }}>
              Home
            </Link>
            <Link href={"/posts"} style={{ marginRight: "10px" }}>
              Posts
            </Link>
            <Link href={"/all-data"} style={{ marginRight: "10px" }}>
              All Data
            </Link>
            <Link href={"/profile"}>Profile</Link>
          </div>
          <div>{children}</div>
          <div>Footer</div>
        </div>
      </body>
    </html>
  );
}
