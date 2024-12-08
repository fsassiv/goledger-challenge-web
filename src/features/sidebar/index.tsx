import { NavBar } from './components/navbar';

export const SideBar = () => {
  return (
    <aside className="rounded-md bg-neutral-800 p-5 w-[20vw] sticky top-0">
      <h1 className="text-center  text-lg mb-6 text-orange-500">
        GoLedger - OnMusic
      </h1>
      <NavBar />
    </aside>
  );
};
