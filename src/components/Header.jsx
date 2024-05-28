import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full h-16 bg-secondary flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/logo.png"}
          alt="logo"
          width={80}
          height={80}
          className="rounded-lg"
        />
        {/* <p className="text-lg text-primary">MAC</p> */}
      </div>
    </header>
  );
};

export { Header };
