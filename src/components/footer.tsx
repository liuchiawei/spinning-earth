export default function Footer({ name }: { name: string }) {
  return (
    <footer className="text-center bg-linear-to-b from-accent to-amber-500 text-white py-12 flex flex-col justify-center items-center gap-2">
      © {new Date().getFullYear()} {name} <br /> All rights reserved
    </footer>
  );

}
