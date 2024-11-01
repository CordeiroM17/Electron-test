import { Link } from "react-router-dom";

const Shooter = () => {
  return (
    <div>
      <h1>Shooter</h1>
      <Link to={`/`}>
        <button>Go Welcome</button>
      </Link>
    </div>
  );
};

export default Shooter;
