import FormAuth from "@/components/FormAuth/FormAuth";
import Languages from "@/components/Languages/Languages";
import Theming from "@/components/Theming/Theming";

const Home = () => {
  return (
    <main className="h-full">
      <div className="flex items-center justify-center gap-4 py-5">
        <Theming />
        <Languages />
      </div>
      <div className="flex items-center justify-center gap-4 my-5 px-4">
        <FormAuth />
      </div>
    </main>
  );
};

export default Home;
