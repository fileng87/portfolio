import Gravatar from "@/components/gravatar";

export default function Home() {
  return (
    <div className="w-full grid grid-cols-10 grid-rows-7 gap-4">
      <div className="col-span-3 row-span-3 col-start-2 row-start-3 flex justify-center items-center">
        <Gravatar className="w-48 h-48" />
      </div>
    </div>
  );
}
