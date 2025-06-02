
import BoxingGame from "../components/BoxingGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-yellow-400 mb-4 text-shadow-lg">
            BOXING CHAMPION
          </h1>
          <p className="text-xl text-white mb-8">
            Fight your way to victory in this intense 2D boxing showdown!
          </p>
        </div>
        <BoxingGame />
      </div>
    </div>
  );
};

export default Index;
